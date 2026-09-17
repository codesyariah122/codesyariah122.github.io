---
layout: post
title: "Cara Menghubungkan Laravel ke MikroTik RouterOS API"
author: "puji"
categories: [Laravel, MikroTik, Networking]
image: assets/images/post/laravel-routeros-api/cover-social.jpg
hero_image: assets/images/post/laravel-routeros-api/cover.png
og_image_width: 1200
og_image_height: 630
og_image_type: image/jpeg
tags: [laravel, mikrotik, routeros, routeros-api, pppoe, isp, billing]
opening: بسم الله الرحمن الرحيم
---

{{ page.opening }}

Pada catatan sebelumnya saya mulai membangun fondasi **web app billing ISP menggunakan Laravel dan MikroTik**.

Kita sudah memisahkan data bisnis seperti pelanggan, paket internet, akun PPPoE, dan invoice dari konfigurasi jaringan yang berada di MikroTik.

Sekarang kita masuk ke bagian yang menurut saya mulai menarik dari eksperimen ini:

**membuat aplikasi Laravel benar-benar berkomunikasi dengan MikroTik RouterOS.**

Artikel ini merupakan **Part 3** dari catatan eksperimen Laravel + MikroTik untuk ISP Billing.

```text
Part 1
PPPoE Server MikroTik CHR

        ↓

Part 2
Fondasi Web App Billing Laravel

        ↓

Part 3
Laravel ↔ RouterOS API
        ↑
    kita di sini
```

> Catatan: konfigurasi pada artikel ini berasal dari environment lab yang saya gunakan ketika mengembangkan aplikasi billing MikroTik. IP address, username, password, dan data lainnya disederhanakan untuk kebutuhan artikel. Jangan menyalin credential lab langsung ke environment production.

---

## Target Part 3

Pada tahap ini kita belum membuat provisioning PPPoE secara otomatis.

Target kita lebih sederhana:

```text
Laravel
   │
   │ RouterOS API
   ▼
MikroTik CHR
   │
   ├── menerima koneksi
   ├── memberikan informasi router
   └── memberikan data PPP
```

Kita ingin membuktikan beberapa hal:

```text
✓ RouterOS API aktif

✓ Laravel dapat membuka koneksi ke MikroTik

✓ Credential disimpan melalui environment configuration

✓ Logic RouterOS tidak diletakkan langsung di controller

✓ Laravel dapat membaca informasi dari router

✓ Error koneksi dapat ditangani

✓ Fondasi siap digunakan untuk provisioning PPPoE
```

Kalau semua ini berhasil, pada Part berikutnya Laravel sudah mempunyai jalur komunikasi yang dapat digunakan untuk membuat dan mengelola PPP Secret.

---

## Environment Lab yang Saya Gunakan

Untuk eksperimen ini saya menggunakan MikroTik CHR sebagai router virtual.

Secara sederhana environment-nya seperti ini:

```text
┌──────────────────────────┐
│      Laravel Web App     │
│                          │
│ ISP Billing Application  │
└─────────────┬────────────┘
              │
              │ RouterOS API
              │
              ▼
┌──────────────────────────┐
│    MikroTik CHR Server   │
│                          │
│ API        : 8728        │
│ PPPoE      : aktif       │
│ PPP Secret : tersedia    │
└─────────────┬────────────┘
              │
              │ PPPoE
              ▼
┌──────────────────────────┐
│    MikroTik CHR Client   │
│                          │
│     testclient           │
└──────────────────────────┘
```

Pada Part 1 sebelumnya kita sudah membuktikan bahwa client `testclient` dapat terhubung ke PPPoE Server.

Sekarang Laravel akan berbicara dengan **CHR Server**, bukan dengan PPPoE Client.

---

## Gambaran Hasil yang Ingin Kita Capai

Pada aplikasi billing, saya ingin mempunyai indikator sederhana untuk mengetahui apakah router dapat dijangkau oleh aplikasi.

![Preview test connection Laravel ke MikroTik RouterOS API]({{ site.url }}/assets/images/post/laravel-routeros-api/01-router-connection-preview.png)

*Gambar 1. Ilustrasi preview halaman test connection Laravel ke MikroTik RouterOS API. Data pada gambar merupakan contoh environment lab.*

Secara sederhana flow-nya:

```text
Operator
   │
   │ klik Test Connection
   ▼
Laravel
   │
   │ RouterOS API
   ▼
MikroTik CHR
   │
   ├── berhasil
   │      ↓
   │   Connected
   │
   └── gagal
          ↓
       Error / Timeout
```

Test connection seperti ini sangat membantu sebelum kita mulai melakukan operasi yang lebih berisiko seperti membuat, men-disable, atau menghapus PPP Secret.

---

## Pastikan RouterOS API Aktif

Sebelum Laravel dapat terhubung, kita perlu memastikan service API RouterOS tersedia.

Login ke MikroTik CHR Server melalui Winbox atau terminal, kemudian jalankan:

```routeros
/ip service print
```

Cari service:

```text
api
```

Contoh:

```text
Flags: X - disabled

 #   NAME     PORT
 0   telnet   23
 1   ftp      21
 2   www      80
 3   ssh      22
 4   www-ssl  443
 5   api      8728
 6   winbox   8291
 7   api-ssl  8729
```

Untuk lab, kita dapat menggunakan API pada port:

```text
8728
```

Pastikan service `api` tidak dalam kondisi disabled.

Jika memang disabled pada environment lab:

```routeros
/ip service enable api
```

Kemudian periksa lagi:

```routeros
/ip service print
```

![Ilustrasi RouterOS API service aktif pada MikroTik CHR]({{ site.url }}/assets/images/post/laravel-routeros-api/02-routeros-api-service.png)

*Gambar 2. Ilustrasi pengecekan service RouterOS API pada CHR Server.*

---

## Jangan Gunakan User Admin untuk Aplikasi

Ketika pertama kali melakukan eksperimen, memang paling mudah menggunakan akun administrator.

Tetapi kebiasaan tersebut sebaiknya tidak diteruskan.

Saya lebih memilih membuat akun khusus untuk aplikasi billing.

Secara konsep:

```text
admin
────────────────────
Digunakan administrator

api-billing
────────────────────
Digunakan Laravel
```

Tujuannya supaya credential aplikasi dapat dipisahkan dari credential administrator router.

Untuk environment sebenarnya, policy/group user juga harus dibatasi hanya pada permission yang memang dibutuhkan aplikasi.

Prinsipnya:

```text
Laravel tidak membutuhkan
hak akses lebih banyak
daripada pekerjaannya.
```

Ini menjadi semakin penting ketika aplikasi nantinya dapat melakukan:

```text
create PPP Secret
disable PPP Secret
enable PPP Secret
read PPP Active
read interface
read traffic
```

---

## Simpan Credential Router di `.env`

Jangan menulis konfigurasi router langsung di controller.

Contoh yang sebaiknya dihindari:

```php
$client = new Client([
    'host' => '192.168.1.7',
    'user' => 'admin',
    'pass' => 'password-router',
]);
```

Masalahnya bukan hanya kode terlihat berantakan.

Kalau repository dipublikasikan ke GitHub, credential dapat ikut ter-push.

Gunakan `.env`.

```dotenv
ROUTEROS_HOST=192.168.1.7
ROUTEROS_PORT=8728
ROUTEROS_USERNAME=api-billing
ROUTEROS_PASSWORD=ganti-dengan-password-lab
ROUTEROS_TIMEOUT=10
```

Kemudian tambahkan konfigurasi aplikasi.

Misalnya:

```text
config/routeros.php
```

Isinya:

```php
<?php

return [

    'host' => env('ROUTEROS_HOST'),

    'port' => (int) env('ROUTEROS_PORT', 8728),

    'username' => env('ROUTEROS_USERNAME'),

    'password' => env('ROUTEROS_PASSWORD'),

    'timeout' => (int) env('ROUTEROS_TIMEOUT', 10),

];
```

Dengan begitu aplikasi cukup menggunakan:

```php
config('routeros.host');
config('routeros.port');
config('routeros.username');
```

tanpa mengetahui dari mana credential sebenarnya berasal.

---

## Jangan Commit `.env`

Pastikan `.env` masuk `.gitignore`.

```gitignore
.env
.env.*
!.env.example
```

Untuk repository, kita cukup menyediakan `.env.example`.

Misalnya:

```dotenv
ROUTEROS_HOST=
ROUTEROS_PORT=8728
ROUTEROS_USERNAME=
ROUTEROS_PASSWORD=
ROUTEROS_TIMEOUT=10
```

Jangan pernah menaruh password sebenarnya di:

```text
GitHub
GitLab
screenshot
artikel
log publik
JavaScript frontend
```

Kalau credential pernah terlanjur dipublikasikan, anggap credential tersebut sudah tidak aman dan lakukan rotasi.

---

## Membuat RouterOS Client Service

Saya tidak ingin setiap controller membuat koneksi MikroTik sendiri.

Daripada seperti ini:

```text
CustomerController
    ↓
RouterOS

InvoiceController
    ↓
RouterOS

PppoeController
    ↓
RouterOS
```

lebih baik kita mempunyai satu abstraction:

```text
Controller
    ↓
Service
    ↓
RouterosClient
    ↓
MikroTik
```

Struktur sederhananya:

```text
app/

├── Http/
│   └── Controllers/
│
├── Services/
│   └── MikroTik/
│       ├── RouterosClient.php
│       ├── PppoeProvisioningService.php
│       └── PppoeMonitoringService.php
│
└── Jobs/
    └── SyncPppoeSessions.php
```

Pada Part 3 ini kita fokus pada:

```text
RouterosClient.php
```

Service inilah yang nantinya menjadi pintu komunikasi aplikasi dengan RouterOS.

---

## Contoh RouterosClient

Implementasi persisnya bergantung pada RouterOS client/library yang digunakan.

Secara konsep saya ingin service tersebut mempunyai kemampuan seperti:

```php
class RouterosClient
{
    public function testConnection(): bool
    {
        // membuka koneksi ke RouterOS
        // menjalankan query ringan
        // return true jika berhasil
    }

    public function getSystemResource(): array
    {
        // membaca /system/resource
    }

    public function getActivePppoeSessions(): array
    {
        // membaca /ppp/active
    }
}
```

Controller tidak perlu mengetahui detail protocol RouterOS.

Controller cukup melakukan:

```php
$router->testConnection();
```

atau:

```php
$router->getActivePppoeSessions();
```

Ini membuat integrasi lebih mudah dirawat ketika suatu saat library RouterOS yang digunakan berubah.

---

## Membuat Test Connection

Sebelum provisioning, saya membuat fungsi sederhana untuk memastikan koneksi benar-benar bekerja.

Misalnya:

```php
public function testConnection()
{
    try {

        $connected = $this->routeros->testConnection();

        return response()->json([
            'success' => $connected,
            'message' => $connected
                ? 'RouterOS connected'
                : 'RouterOS connection failed',
        ]);

    } catch (\Throwable $e) {

        report($e);

        return response()->json([
            'success' => false,
            'message' => 'Unable to connect to RouterOS',
        ], 503);
    }
}
```

Untuk debugging internal, detail error dapat masuk ke log.

Namun saya tidak ingin response production mengembalikan:

```text
password
credential
stack trace
internal network detail
```

kepada browser.

---

## Preview Test Connection

Saat koneksi berhasil, dashboard dapat menampilkan informasi sederhana.

![Preview Laravel berhasil terhubung dengan MikroTik RouterOS]({{ site.url }}/assets/images/post/laravel-routeros-api/03-connection-success.png)

*Gambar 3. Ilustrasi kondisi ketika Laravel berhasil membuka koneksi ke MikroTik CHR Server.*

Misalnya:

```text
Router

Name       : chr-lab-01
Host       : 192.168.1.x
API Port   : 8728
Status     : CONNECTED
Last Seen  : just now
```

Yang penting bukan tampilannya.

Yang penting adalah Laravel sudah berhasil melakukan komunikasi dua arah dengan RouterOS.

---

## Mengambil `/system resource`

Setelah koneksi berhasil, jangan langsung membuat PPP Secret.

Saya lebih suka mencoba query read-only terlebih dahulu.

Salah satunya:

```routeros
/system resource print
```

Informasi yang biasanya dapat diperoleh antara lain:

```text
uptime
version
build-time
free-memory
total-memory
cpu
cpu-count
cpu-frequency
cpu-load
free-hdd-space
total-hdd-space
architecture-name
board-name
platform
```

Dari Laravel kita dapat mengubah response tersebut menjadi struktur aplikasi.

Misalnya:

```json
{
    "status": "connected",
    "router": {
        "platform": "MikroTik",
        "board": "CHR",
        "version": "RouterOS",
        "uptime": "1h20m"
    }
}
```

![Preview informasi RouterOS yang dibaca oleh Laravel]({{ site.url }}/assets/images/post/laravel-routeros-api/04-router-resource-preview.png)

*Gambar 4. Ilustrasi data RouterOS yang berhasil dibaca aplikasi Laravel.*

Kalau `/system resource` sudah berhasil dibaca, kita mempunyai bukti yang jauh lebih kuat dibanding sekadar berhasil membuka socket.

---

## Mengambil Data PPP Active

Langkah berikutnya adalah membaca session PPP yang sedang aktif.

Di MikroTik:

```routeros
/ppp active print
```

Contohnya:

```text
NAME         SERVICE   ADDRESS
testclient   pppoe     10.10.10.10
```

Data ini nantinya sangat berguna untuk monitoring.

Laravel dapat mengubahnya menjadi:

```json
[
    {
        "username": "testclient",
        "service": "pppoe",
        "address": "10.10.10.10",
        "status": "online"
    }
]
```

![Preview PPP Active MikroTik yang dibaca aplikasi Laravel]({{ site.url }}/assets/images/post/laravel-routeros-api/05-ppp-active-preview.png)

*Gambar 5. Ilustrasi aplikasi membaca session PPPoE aktif dari MikroTik.*

Di sinilah eksperimen kita mulai menyambung dengan Part 1.

Pada Part 1:

```text
testclient
     ↓
PPPoE Server
     ↓
/ppp active
```

Sekarang:

```text
testclient
     ↓
PPPoE Server
     ↓
/ppp active
     ↓
RouterOS API
     ↓
Laravel
     ↓
Dashboard
```

---

## Jangan Jadikan Router sebagai Database Utama

Walaupun Laravel sekarang dapat membaca RouterOS, saya tetap tidak menjadikan MikroTik sebagai sumber seluruh data pelanggan.

Misalnya RouterOS mempunyai:

```text
testclient
```

Laravel dapat mempunyai:

```text
Customer

Nama
Nomor WhatsApp
Alamat
Paket
Tanggal pemasangan
Status billing
```

Kemudian:

```text
PPPoE Account

customer_id
username
router
profile
provisioning_status
connection_status
last_seen_at
```

Router hanya bertanggung jawab pada kondisi jaringan.

Database Laravel tetap bertanggung jawab pada data bisnis.

---

## Status Router Sebaiknya Disimpan

Pada aplikasi billing yang saya kerjakan, status router tidak cukup hanya:

```text
online
offline
```

Saya juga ingin mengetahui kapan terakhir kali aplikasi berhasil berkomunikasi dengannya.

Contoh:

```text
routers

name
host
status
last_seen_at
last_error
```

Ketika komunikasi berhasil:

```text
status       = online
last_seen_at = now()
last_error   = null
```

Ketika gagal:

```text
status       = offline
last_error   = Connection timed out
```

Dengan begitu dashboard dapat menampilkan:

```text
MikroTik CHR Server

● Online

Last seen:
10 seconds ago
```

daripada sekadar mengandalkan operator membuka Winbox.

---

## Menangani Timeout

Router adalah perangkat jaringan.

Artinya kita harus menganggap koneksi dapat gagal kapan saja.

Misalnya:

```text
Router mati

Network terputus

Firewall berubah

API service disabled

Credential berubah

Port salah

Router sedang reboot
```

Karena itu jangan membuat request tanpa timeout.

Contoh konfigurasi:

```dotenv
ROUTEROS_TIMEOUT=10
```

Flow aplikasi:

```text
Laravel
   │
   │ connect
   ▼
RouterOS
   │
   ├── response
   │      ↓
   │   continue
   │
   └── timeout
          ↓
       catch error
          ↓
       tulis log
          ↓
       status offline
```

Tanpa timeout, request operator dapat menggantung terlalu lama ketika router tidak dapat dijangkau.

---

## Jangan Menampilkan Error Mentah ke User

Misalnya koneksi gagal dengan error internal:

```text
Connection refused to 192.168.x.x:8728
```

atau exception library yang panjang.

Jangan langsung mengembalikan semuanya ke frontend.

User cukup menerima:

```json
{
    "success": false,
    "message": "Tidak dapat terhubung ke router."
}
```

Sedangkan log aplikasi menyimpan informasi teknis:

```text
router
host
exception
timestamp
operation
```

Dengan begitu operator mendapatkan pesan yang mudah dipahami, sementara developer masih mempunyai informasi debugging.

---

## Hindari Memanggil Router pada Setiap Page Load

Ini bagian yang menurut saya penting.

Setelah berhasil menghubungkan Laravel ke MikroTik, godaan berikutnya adalah melakukan query router setiap kali dashboard dibuka.

Misalnya:

```text
GET /dashboard
     ↓
query router
     ↓
query PPP active
     ↓
query interfaces
     ↓
query traffic
     ↓
render dashboard
```

Untuk aplikasi kecil mungkin terasa baik-baik saja.

Tetapi ketika jumlah router dan pelanggan bertambah, pola tersebut dapat menjadi masalah.

Lebih baik pisahkan proses sinkronisasi.

```text
Scheduler / Queue
       │
       ▼
RouterOS API
       │
       ▼
Laravel Database
       │
       ▼
Dashboard
```

Dashboard membaca data terakhir dari database.

Job di background bertugas memperbaruinya.

Contoh:

```text
SyncPppoeSessions
SyncRouterStatus
SyncInterfaceTraffic
```

Ini juga membuat dashboard tetap dapat dibuka ketika salah satu router sedang offline.

---

## Contoh Job Monitoring

Secara sederhana:

```php
class SyncPppoeSessions implements ShouldQueue
{
    public function handle(
        RouterosClient $router
    ): void {
        $sessions = $router->getActivePppoeSessions();

        foreach ($sessions as $session) {

            PppoeAccount::query()
                ->where('username', $session['username'])
                ->update([
                    'connection_status' => 'online',
                    'last_seen_at' => now(),
                ]);
        }
    }
}
```

Contoh tersebut masih sederhana.

Pada implementasi sebenarnya kita juga harus menangani akun yang sebelumnya online tetapi sudah tidak ditemukan dalam `/ppp active`.

Konsepnya:

```text
Database
─────────────────
A
B
C

PPP Active
─────────────────
A
C

Hasil
─────────────────
A → ONLINE
B → OFFLINE
C → ONLINE
```

Bagian tersebut akan kita bahas lebih dalam pada Part monitoring.

---

## Keamanan RouterOS API

Untuk environment production, saya tidak ingin API MikroTik terbuka bebas ke internet.

Idealnya:

```text
Internet
   │
   X
   │
RouterOS API
```

Akses API hanya diperbolehkan dari:

```text
Laravel Server
      │
      │ private network / VPN
      ▼
MikroTik Router
```

Beberapa hal yang perlu dipertimbangkan:

```text
✓ firewall source address

✓ VPN / private network

✓ user API khusus

✓ least privilege

✓ credential rotation

✓ logging

✓ timeout

✓ encrypted transport jika tersedia dan sesuai environment

✓ jangan expose API management sembarangan
```

Untuk lab lokal, konfigurasi tentu dapat lebih sederhana.

Tetapi kita perlu memahami perbedaannya sejak awal.

---

## Debugging Ketika Laravel Tidak Bisa Connect

Dalam proses integrasi, koneksi tidak selalu langsung berhasil.

Saya biasanya memeriksa dari lapisan paling bawah.

### 1. Apakah Laravel server dapat menjangkau router?

```bash
ping 192.168.1.7
```

Jika environment atau firewall memang tidak mengizinkan ICMP, kegagalan ping saja belum cukup untuk menyimpulkan API tidak dapat diakses.

Lanjutkan dengan pengecekan port.

### 2. Apakah port RouterOS API dapat dijangkau?

Contoh dari Linux/macOS:

```bash
nc -vz 192.168.1.7 8728
```

Jika berhasil:

```text
Connection to 192.168.1.7 port 8728 succeeded
```

### 3. Apakah API aktif?

Di RouterOS:

```routeros
/ip service print
```

### 4. Apakah credential benar?

Periksa:

```text
ROUTEROS_USERNAME
ROUTEROS_PASSWORD
```

Jangan print password ke log.

### 5. Apakah firewall mengizinkan koneksi?

Periksa:

```routeros
/ip firewall filter print
```

### 6. Apakah Laravel masih menggunakan config cache lama?

Jika `.env` baru diubah:

```bash
php artisan config:clear
```

Pada environment production yang menggunakan config cache, rebuild sesuai deployment workflow:

```bash
php artisan config:cache
```

---

## Flow Debugging yang Saya Gunakan

Supaya tidak menebak-nebak:

```text
Laravel gagal connect
        │
        ▼
Host reachable?
        │
    ┌───┴───┐
    │       │
   NO      YES
    │       │
Network     ▼
problem   Port 8728?
            │
        ┌───┴───┐
        │       │
       NO      YES
        │       │
    Firewall    ▼
    / API     Credential?
                │
            ┌───┴───┐
            │       │
           NO      YES
            │       │
        Fix user    ▼
                  Query
              /system resource
                    │
                    ▼
                 SUCCESS
```

Cara seperti ini lebih cepat daripada mengubah banyak konfigurasi sekaligus tanpa mengetahui sumber masalahnya.

---

## Hasil Part 3

Setelah tahap ini selesai, arsitektur kita berubah dari:

```text
Laravel

MikroTik
```

menjadi:

```text
Laravel
   │
   │ RouterOS API
   ▼
MikroTik
```

Dan Laravel sekarang mempunyai kemampuan dasar:

```text
✓ test connection

✓ membaca resource router

✓ membaca PPP Active

✓ mendeteksi kegagalan koneksi

✓ mencatat last seen router

✓ menjalankan komunikasi melalui service layer
```

Tetapi kita **belum mengubah konfigurasi PPPoE dari Laravel**.

Itu disengaja.

Saya ingin memastikan jalur komunikasinya stabil terlebih dahulu sebelum aplikasi diberikan kemampuan mengubah konfigurasi router.

---

## Batas Part 3

Posisi kita sekarang:

```text
Part 1
PPPoE Server MikroTik CHR             ✓

Part 2
Fondasi Web App Billing Laravel       ✓

Part 3
Laravel ↔ RouterOS API                ✓

Part 4
Provisioning PPPoE Otomatis           berikutnya

Part 5
Monitoring PPPoE Online / Offline     berikutnya
```

Pada Part 4 kita mulai melakukan operasi yang lebih nyata.

Laravel akan menerima data pelanggan:

```text
Customer
+
Service Plan
+
PPPoE Account
```

kemudian melakukan provisioning ke MikroTik:

```text
Laravel
   │
   │ create PPP Secret
   ▼
RouterOS
   │
   ▼
/ppp secret
```

Di sana kita juga akan membahas apa yang terjadi ketika:

```text
database berhasil
router gagal

router berhasil
database gagal

username sudah ada

router offline

provisioning timeout
```

Karena menurut saya bagian sulit dari integrasi bukan sekadar menjalankan command MikroTik.

Bagian sulitnya adalah **menjaga database aplikasi dan kondisi router tetap konsisten ketika salah satu proses gagal.**

---

## Checklist Part 3

Sebelum melanjutkan:

```text
□ RouterOS API sudah aktif

□ Laravel dapat menjangkau router

□ Credential tidak ditulis di source code

□ Akun khusus aplikasi digunakan

□ RouterosClient dipisahkan dari controller

□ Test connection berhasil

□ /system resource dapat dibaca

□ /ppp active dapat dibaca

□ Timeout sudah ditentukan

□ Error tidak membocorkan credential

□ API RouterOS tidak diekspos sembarangan
```

Kalau checklist ini sudah aman, kita mempunyai fondasi yang cukup untuk masuk ke provisioning.

---

## Kesimpulan

Menghubungkan Laravel dengan MikroTik ternyata bukan hanya persoalan membuat koneksi API berhasil.

Ada beberapa keputusan yang menurut saya lebih penting:

```text
Laravel
────────────────────────────
menyimpan data bisnis

RouterOS
────────────────────────────
mengelola kondisi jaringan

RouterosClient
────────────────────────────
menjadi pintu komunikasi

Queue / Scheduler
────────────────────────────
melakukan sinkronisasi

Database
────────────────────────────
menyimpan kondisi terakhir
```

Dengan pemisahan seperti ini, aplikasi tidak terlalu bergantung pada kondisi router ketika operator membuka dashboard.

Dan ketika koneksi MikroTik sedang bermasalah, kita mempunyai tempat yang jelas untuk melakukan debugging.

Pada catatan berikutnya kita akan masuk ke bagian yang lebih menarik:

**membuat provisioning PPPoE otomatis dari Laravel ke MikroTik RouterOS.**

Kita akan mencoba membuat PPP Secret berdasarkan pelanggan dan paket internet dari aplikasi, sekaligus memikirkan bagaimana menangani provisioning yang gagal di tengah proses.

Sampai jumpa di catatan CodeSyariah berikutnya.

Wallahu a'lam.