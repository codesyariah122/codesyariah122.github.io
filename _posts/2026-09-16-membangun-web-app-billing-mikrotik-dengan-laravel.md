---
layout: post
title: "Membangun Web App Billing MikroTik dengan Laravel"
author: "puji"
categories: [Laravel, MikroTik, Networking]
image: assets/images/post/mikrotik-isp-billing/dashboard-preview.png
tags: [laravel, mikrotik, routeros, pppoe, isp, billing, dashboard]
opening: بسم الله الرحمن الرحيم
---

{{ page.opening }}

Pada catatan sebelumnya kita sudah menyiapkan **PPPoE Server MikroTik CHR** dan membuktikan bahwa akun `testclient` dapat muncul di `/ppp active`.

Sekarang kita mulai menyusun lapisan aplikasinya: sebuah **web app billing ISP berbasis Laravel**. Fokusnya belum membuat billing production yang lengkap, melainkan membangun fondasi yang rapi agar data pelanggan, paket internet, tagihan, dan status koneksi MikroTik dapat dikelola dari satu tempat.

Artikel ini adalah **Part 2** dari eksperimen MikroTik + Laravel untuk ISP Billing.

> Catatan: gambar dashboard dalam artikel ini adalah **preview visual lab**, bukan data pelanggan atau sistem production.

---

## Target Part 2

Di akhir artikel ini, kita memiliki gambaran aplikasi yang mampu menyimpan data inti billing dan siap dihubungkan ke RouterOS API pada tahap berikutnya.

```text
Laravel Web App
      │
      ├── Pelanggan
      ├── Paket internet
      ├── Akun PPPoE
      ├── Tagihan
      └── Status perangkat
              │
              ▼
      MikroTik CHR Server
```

Fitur yang kita siapkan:

```text
✓ Dashboard ringkas operasional
✓ Master data pelanggan
✓ Paket layanan internet
✓ Data akun PPPoE
✓ Status billing pelanggan
✓ Pondasi monitoring online/offline
✓ Batas yang jelas antara aplikasi dan RouterOS
```

---

## Kenapa Tidak Langsung Membuat API MikroTik?

MikroTik memang dapat diakses melalui RouterOS API. Namun aplikasi billing tidak sebaiknya langsung menjadikan data dari router sebagai satu-satunya sumber data.

Ada informasi bisnis yang tidak seharusnya berada di MikroTik, misalnya:

```text
nama pelanggan
nomor WhatsApp
alamat pemasangan
paket langganan
periode tagihan
status pembayaran
riwayat invoice
catatan teknisi
```

Karena itu perannya dibagi seperti ini:

```text
Laravel Database
────────────────────────────
Sumber data bisnis

MikroTik RouterOS
────────────────────────────
Sumber data jaringan

Laravel + RouterOS API
────────────────────────────
Lapisan sinkronisasi dan provisioning
```

Dengan pembagian ini, kita tidak perlu mencampur data pelanggan dengan konfigurasi router secara sembarangan.

---

## Gambaran Dashboard Billing

Dashboard sebaiknya menjawab kebutuhan operasional dalam beberapa detik, bukan hanya menampilkan angka.

![Preview dashboard web app ISP Billing MikroTik]({{ site.url }}/assets/images/post/mikrotik-isp-billing/dashboard-preview.png)

*Gambar 1. Preview visual dashboard untuk lab ISP Billing. Angka dan data pada gambar hanya ilustrasi.*

Komponen penting yang nantinya dapat tampil di dashboard:

```text
Pelanggan aktif
PPPoE online
PPPoE offline
Tagihan jatuh tempo
Invoice belum dibayar
Status koneksi RouterOS
```

Saat ada masalah, operator dapat membedakan dua kondisi yang sering tercampur:

```text
Pelanggan belum membayar
        ≠
Pelanggan sedang offline
```

Pelanggan dapat lunas tetapi perangkatnya offline. Sebaliknya, perangkat dapat online tetapi status tagihannya bermasalah. Aplikasi perlu menyimpan dua status tersebut secara terpisah.

---

## Arsitektur Lab

Untuk tahap awal, arsitektur kita cukup sederhana.

```text
                 ┌─────────────────────┐
                 │   Browser Operator  │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │   Laravel Web App   │
                 │                     │
                 │ Customer · Billing  │
                 │ PPPoE · Monitoring  │
                 └──────────┬──────────┘
                            │
               database     │ RouterOS API
                            │
           ┌────────────────┴────────────────┐
           ▼                                 ▼
┌─────────────────────┐           ┌─────────────────────┐
│      MySQL          │           │ MikroTik CHR Server │
│                     │           │                     │
│ customer            │           │ PPP Secret          │
│ service_plans       │           │ PPP Active          │
│ pppoe_accounts      │           │ PPPoE Server        │
│ invoices            │           └─────────────────────┘
└─────────────────────┘
```

Pada lab ini, Laravel dan MikroTik dapat berada di network management yang sama. Untuk production, API router sebaiknya hanya dapat diakses dari server aplikasi atau jaringan VPN internal.

---

## Model Data yang Perlu Disiapkan

Supaya aplikasi tidak sulit dikembangkan di kemudian hari, data dipisah menurut tanggung jawabnya.

```text
customers
├── nama
├── nomor_telepon
├── alamat
└── status

service_plans
├── nama_paket
├── harga
├── bandwidth_download
└── bandwidth_upload

pppoe_accounts
├── customer_id
├── service_plan_id
├── username
├── router_name
├── routeros_secret_id
└── connection_status

invoices
├── customer_id
├── periode
├── total
├── jatuh_tempo
└── payment_status
```

Satu pelanggan dapat mempunyai satu atau beberapa layanan. Karena itu akun PPPoE tidak diletakkan langsung pada tabel pelanggan.

```text
Customer
   │
   ├── Invoice
   │
   └── PPPoE Account
            │
            └── Service Plan
```

Pola ini membantu ketika suatu saat satu pelanggan mempunyai lebih dari satu lokasi, lebih dari satu koneksi, atau berganti paket.

---

## Membuat Master Paket Layanan

Paket internet adalah data bisnis. Jangan langsung menulis nama paket atau harga di konfigurasi MikroTik.

Contoh data paket:

```text
Nama Paket     Download     Upload      Harga
------------------------------------------------
Home 10 Mbps   10 Mbps      5 Mbps      Rp150.000
Home 20 Mbps   20 Mbps      10 Mbps     Rp250.000
Office 50 Mbps 50 Mbps      25 Mbps     Rp600.000
```

Di Laravel, data ini dapat menjadi dasar untuk memilih profile RouterOS saat akun PPPoE dibuat.

Contoh migration sederhana:

```php
Schema::create('service_plans', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->unsignedInteger('download_mbps');
    $table->unsignedInteger('upload_mbps');
    $table->unsignedBigInteger('price');
    $table->boolean('is_active')->default(true);
    $table->timestamps();
});
```

Nilai bandwidth pada tabel tidak otomatis mengubah limit di MikroTik. Integrasi itu akan dilakukan oleh service khusus, bukan oleh controller secara langsung.

---

## Data Pelanggan dan Akun PPPoE

Saat operator menambah pelanggan, aplikasi belum perlu langsung mengirim perintah ke router. Data bisnis dapat disimpan lebih dahulu, kemudian provisioning dilakukan melalui proses yang terkontrol.

Contoh data di aplikasi:

```text
Customer
──────────────
Nama      : Ahmad Fauzi
WhatsApp  : 08xx-xxxx-xxxx
Paket     : Home 20 Mbps

PPPoE Account
──────────────
Username  : ahmad-fauzi
Router    : chr-lab-01
Profile   : home-20m
Status    : pending provisioning
```

Status `pending provisioning` berguna untuk menghindari situasi ketika data sudah tersimpan di database tetapi perintah ke RouterOS gagal di tengah proses.

Alurnya dapat dirancang seperti ini:

```text
Operator simpan pelanggan
        │
        ▼
Laravel membuat akun berstatus pending
        │
        ▼
Service provisioning dipanggil
        │
        ├── sukses → status active
        │
        └── gagal  → status failed + log error
```

Dengan begitu operator dapat melihat bahwa sebuah akun belum selesai diproses, bukan mengira pelanggan sudah aktif padahal secret belum pernah dibuat di MikroTik.

---

## Jangan Menaruh Logic RouterOS di Controller

Salah satu keputusan penting adalah memisahkan komunikasi RouterOS dari controller.

Struktur sederhananya:

```text
app/
├── Http/Controllers/
│   └── PppoeAccountController.php
│
├── Services/
│   ├── RouterosClient.php
│   ├── PppoeProvisioningService.php
│   └── PppoeMonitoringService.php
│
└── Jobs/
    └── SyncPppoeSessions.php
```

Controller cukup menerima input, melakukan validasi, lalu memanggil service.

```php
public function store(StorePppoeAccountRequest $request)
{
    $account = $this->pppoeAccounts->create($request->validated());

    ProvisionPppoeAccount::dispatch($account);

    return redirect()
        ->route('pppoe-accounts.index')
        ->with('success', 'Akun PPPoE masuk ke antrean provisioning.');
}
```

Keuntungannya:

```text
✓ Controller tetap ringkas
✓ Error RouterOS dapat dicatat dengan jelas
✓ Proses dapat dijalankan ulang
✓ Tidak membuat halaman operator menunggu koneksi router
✓ Lebih mudah diuji
```

---

## Menyimpan Konfigurasi Router dengan Aman

Jangan menyimpan alamat IP router, username API, atau password API langsung di source code.

Gunakan environment configuration.

```dotenv
ROUTEROS_HOST=192.168.1.7
ROUTEROS_PORT=8728
ROUTEROS_USERNAME=api-billing
ROUTEROS_PASSWORD=ganti-dengan-password-kuat
ROUTEROS_TIMEOUT=10
```

Kemudian akses lewat file konfigurasi Laravel.

```php
return [
    'host' => env('ROUTEROS_HOST'),
    'port' => env('ROUTEROS_PORT', 8728),
    'username' => env('ROUTEROS_USERNAME'),
    'password' => env('ROUTEROS_PASSWORD'),
    'timeout' => env('ROUTEROS_TIMEOUT', 10),
];
```

File `.env` tidak boleh dimasukkan ke repository publik. Buat akun RouterOS khusus aplikasi dengan hak akses minimum yang diperlukan; jangan gunakan akun administrator penuh hanya demi integrasi billing.

---

## Status Online dan Status Billing

Nantinya data dari `/ppp active` dapat dipadankan dengan username yang ada di tabel `pppoe_accounts`.

```text
RouterOS: /ppp active
──────────────────────
ahmad-fauzi
testclient

Laravel: pppoe_accounts
──────────────────────
ahmad-fauzi
budi-office
testclient
```

Hasil monitoring:

```text
Username       Session
────────────────────────
ahmad-fauzi    ONLINE
budi-office    OFFLINE
testclient     ONLINE
```

Namun tabel invoice tetap memiliki status sendiri.

```text
Username       Session     Billing
──────────────────────────────────
ahmad-fauzi    ONLINE      LUNAS
budi-office    OFFLINE     MENUNGGAK
testclient     ONLINE      LAB
```

Pemisahan ini membuat aplikasi lebih jujur terhadap kondisi di lapangan dan memudahkan operator mengambil tindakan yang tepat.

---

## Batas Part 2

Pada tahap ini kita belum menjalankan perintah create, disable, atau remove PPP Secret dari Laravel. Kita baru menyiapkan rancangan aplikasi agar data bisnisnya siap dan komunikasi ke MikroTik tidak dibuat secara tergesa-gesa.

```text
Part 1
PPPoE Server lab                    ✓

Part 2
Fondasi web app billing             ✓

Part 3
Laravel terhubung RouterOS API      berikutnya

Part 4
Provisioning PPP Secret             berikutnya

Part 5
Sinkronisasi PPP Active             berikutnya
```

---

## Checklist Sebelum Masuk RouterOS API

Sebelum mulai integrasi, pastikan beberapa hal berikut sudah jelas.

```text
□ Laravel dapat membaca konfigurasi router dari .env
□ Router hanya dapat dijangkau dari network yang diizinkan
□ Akun API khusus aplikasi sudah dibuat
□ Password production tidak ada di screenshot atau repository
□ Tabel pelanggan dan akun PPPoE sudah memiliki relasi yang jelas
□ Log error dan status provisioning disiapkan
□ Ada environment lab untuk pengujian
```

Jangan menguji integrasi pertama kali langsung pada router production dan akun pelanggan aktif.

---

## Kesimpulan

Web app billing bukan hanya halaman dashboard. Ia adalah tempat untuk menyatukan data bisnis dengan data jaringan tanpa membuat keduanya saling merusak.

Pada Part 2 ini kita sudah menyusun fondasi:

```text
✓ Dashboard operasional
✓ Data pelanggan
✓ Paket layanan
✓ Akun PPPoE
✓ Invoice dan status billing
✓ Batas service Laravel dan RouterOS
✓ Konfigurasi yang tidak menyimpan secret di source code
```

Pada artikel berikutnya kita mulai langkah yang lebih teknis: membuat Laravel berkomunikasi dengan **RouterOS API**, memeriksa koneksi, dan mengambil data awal dari MikroTik CHR Server.

Sampai jumpa di catatan CodeSyariah berikutnya.
