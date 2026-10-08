---
layout: post
title: "Suspend, Isolir, Konfirmasi Pembayaran, dan Reactivate Pelanggan PPPoE dari Laravel ke MikroTik"
author: "puji"
categories: [Laravel, MikroTik, Networking]
image: assets/images/post/laravel-mikrotik-pppoe-suspend/cover-social.jpg
hero_image: assets/images/post/laravel-mikrotik-pppoe-suspend/cover.jpeg
og_image_width: 1200
og_image_height: 630
og_image_type: image/jpeg
tags: [laravel, mikrotik, routeros, pppoe, suspend, isolir, reactivate, billing, subscription, invoice]
opening: بسم الله الرحمن الرحيم
summary: "Melanjutkan seri Laravel MikroTik Billing: memahami suspend dan isolir PPPoE melalui RouterOS API, konfirmasi pembayaran, reactivate, pengujian client, dan penanganan kegagalan sinkronisasi."
---

Pada [Part 5 — Monitoring PPPoE Online / Offline dari Laravel](/monitoring-pppoe-online-offline-dari-laravel/), saya membahas bagaimana Laravel membaca session PPPoE dari MikroTik RouterOS, menyimpan status koneksi terakhir, dan menampilkan informasi tersebut pada dashboard.

Setelah mengetahui pelanggan yang sedang online atau offline, muncul kebutuhan operasional berikutnya: **bagaimana menghentikan akses internet pelanggan sementara waktu, lalu mengaktifkannya kembali setelah ada konfirmasi yang sah?**

Dalam pengembangan **GNET Billing**, saya mulai menguji alur ini menggunakan aplikasi Laravel, MikroTik RouterOS, serta client Windows pada VirtualBox. Bahan pengujian yang saya miliki mencakup dialog isolir subscription, Billing Monitor, dan pengujian konektivitas dari sisi client. Tidak semua tahapan pemulihan otomatis setelah pembayaran dapat disimpulkan dari bahan tersebut, sehingga saya akan membedakan **alur yang terlihat dalam pengujian** dari **rancangan implementasi yang perlu diverifikasi**.

> Tulisan ini merupakan catatan pengembangan aplikasi billing ISP menggunakan Laravel dan MikroTik. Contoh kode disederhanakan untuk menjelaskan arsitektur, bukan salinan lengkap kode production atau jaminan bahwa setiap flow sudah teruji end-to-end.

---

## Seri Laravel + MikroTik ISP Billing

Tulisan ini adalah **Part 6** dari seri pengembangan aplikasi billing ISP.

1. [Cara Membuat PPPoE Server MikroTik CHR di VirtualBox](/cara-membuat-pppoe-server-mikrotik-chr-di-virtualbox/)
2. [Membangun Web App Billing MikroTik dengan Laravel](/membangun-web-app-billing-mikrotik-dengan-laravel/)
3. [Cara Menghubungkan Laravel ke MikroTik RouterOS API](/cara-menghubungkan-laravel-ke-mikrotik-routeros-api/)
4. [Provisioning PPPoE Otomatis dari Laravel ke MikroTik RouterOS](/provisioning-pppoe-otomatis-laravel-mikrotik/)
5. [Monitoring PPPoE Online / Offline dari Laravel](/monitoring-pppoe-online-offline-dari-laravel/)
6. **Suspend, Isolir, Konfirmasi Pembayaran, dan Reactivate Pelanggan PPPoE**
7. Monitoring Traffic dan Bandwidth PPPoE
8. Invoice dan Pembayaran Pelanggan
9. Otomatisasi Isolir Berdasarkan Jatuh Tempo
10. Notifikasi WhatsApp dan Pengingat Tagihan
11. Subscription, Paket Layanan, dan Sinkronisasi RouterOS
12. Deployment Production Laravel Billing di Railway

Pembahasan deployment Railway dan pengelolaan paket subscription yang lebih lengkap saya pisahkan ke artikel tersendiri agar Part 6 tetap fokus pada **lifecycle akses pelanggan PPPoE**.

---

## Target Part 6

Target yang ingin dicapai adalah:

- Administrator dapat melihat subscription dan status layanan pelanggan.
- Administrator dapat meminta isolir melalui dashboard Laravel.
- Laravel dapat mengubah PPP Profile pelanggan pada router yang tepat.
- Sistem dapat menangani session PPPoE yang masih aktif.
- Status aplikasi dan konfigurasi router dapat diverifikasi.
- Pembayaran atau konfirmasi administrator dapat menjadi dasar evaluasi reactivate.
- Pelanggan dapat dikembalikan ke profile paket semula.
- Kegagalan sebagian dapat dicatat, diulang, dan direkonsiliasi.

Ada tiga konsep yang perlu dipisahkan sejak awal:

```text
subscription_status = suspended
provision_status    = active
connection_status   = online
```

Kondisi tersebut **bisa saja terjadi**. Subscription sedang disuspend, PPP Secret masih tersedia, tetapi session lama belum berakhir. Artinya, status online bukan bukti bahwa pelanggan masih memiliki akses internet normal.

---

## Apa Perbedaan Suspend, Isolir, dan Reactivate?

**Suspend** adalah keputusan pada tingkat layanan atau billing: pelanggan sementara tidak berhak menggunakan paket normal.

**Isolir** adalah penerapan keputusan tersebut di jaringan, misalnya dengan memindahkan PPP Secret ke profile khusus yang dibatasi oleh kebijakan firewall dan routing.

**Reactivate** adalah pemulihan hak akses setelah syarat bisnis terpenuhi dan konfigurasi jaringan berhasil dikembalikan.

Secara konseptual:

```text
Invoice / Keputusan Admin
           |
           v
Subscription Lifecycle
           |
           v
Laravel Service / Job
           |
           v
MikroTik RouterOS API
           |
           v
PPP Secret + Session + Network Policy
           |
           v
Verifikasi Hasil
```

Saya tidak ingin menganggap perubahan `status` pada database saja sudah cukup untuk memutus atau memulihkan internet pelanggan.

---

## Melihat Alur Isolir di GNET Billing

Pada bahan video pengujian, terlihat dialog **“Isolir Subscription?”** di halaman detail pelanggan. Dialog tersebut menjelaskan bahwa akses pelanggan akan dipindahkan ke profile isolir pada MikroTik.

Alur yang ingin saya jaga adalah:

```text
Admin membuka detail pelanggan
                |
                v
           Klik Isolir
                |
                v
         Dialog Konfirmasi
                |
                v
        Validasi Subscription
                |
                v
        Jalankan Job Isolir
                |
                v
        Ubah Profile RouterOS
                |
                v
        Tangani Session Aktif
                |
                v
       Verifikasi dan Catat Hasil
```

![Dialog konfirmasi isolir subscription pada aplikasi GNET Billing]({{ '/assets/images/post/laravel-mikrotik-pppoe-suspend/01-konfirmasi-isolir.png' | relative_url }})

*Gambar 1. Tempatkan screenshot asli dialog konfirmasi isolir dari video pengujian. Jangan menggunakan ilustrasi sebagai bukti perubahan router.*

Dialog konfirmasi penting karena tindakan ini dapat mengganggu konektivitas pelanggan. Endpoint-nya juga harus dilindungi authorization; menyembunyikan tombol pada frontend saja tidak cukup.

---

## Dua Pendekatan Suspend pada MikroTik

Secara teknis, salah satu pendekatan adalah menonaktifkan PPP Secret:

```routeros
/ppp secret disable [find where name="router-cimaung"]
```

Perintah tersebut mencegah autentikasi baru menggunakan secret yang dinonaktifkan, tetapi session yang sudah aktif perlu diperiksa secara terpisah.

Pendekatan lain adalah **profile-based isolation**, yaitu mempertahankan secret tetapi mengubah profile-nya:

```text
Sebelum isolir : PAKET-10M
Saat isolir    : ISOLIR
```

Contoh perintah pada router lab:

```routeros
/ppp secret set [find where name="router-cimaung"] profile=ISOLIR
```

**Penting:** profile bernama `ISOLIR` tidak otomatis memblokir internet. Profile tersebut harus terhubung dengan address pool, firewall, routing, atau kebijakan akses lain yang memang membatasi koneksi. Nama profile hanyalah label konfigurasi.

Sebelum menjalankan perubahan, periksa target secret:

```routeros
/ppp secret print detail where name="router-cimaung"
```

Jika username tidak unik lintas router, pencarian harus selalu dilakukan pada **router yang benar**, bukan sekadar berdasarkan nama pengguna secara global.

---

## Simpan Paket Normal sebagai Sumber Pemulihan

Ketika pelanggan dipindahkan ke profile isolir, aplikasi tetap harus mengetahui paket normalnya.

Contoh:

```text
Subscription      : Home 10 Mbps
Normal PPP Profile: PAKET-10M
Current PPP Profile: ISOLIR
```

Sumber informasi profile normal sebaiknya berasal dari relasi subscription dan service plan, bukan hanya dari `profile` saat ini pada PPP Secret. Jika aplikasi membaca profile saat ini setelah isolir, yang ditemukan justru `ISOLIR`.

Pada sistem dengan beberapa router, mapping paket juga dapat berbeda antar-router. Karena itu, pemilihan profile perlu mempertimbangkan `router_id`, paket pelanggan, dan konfigurasi profile yang tersedia pada router tersebut.

---

## Session PPPoE yang Sudah Aktif

Mengubah PPP Secret tidak selalu langsung mengubah session yang sudah berjalan. Untuk menerapkan kebijakan baru, sistem mungkin perlu memutus session secara terkontrol agar perangkat pelanggan melakukan autentikasi ulang.

Periksa session terlebih dahulu:

```routeros
/ppp active print detail where name="router-cimaung"
```

Jika sesuai kebijakan operasional dan identitas session sudah diverifikasi, session dapat diputus:

```routeros
/ppp active remove [find where name="router-cimaung"]
```

Perintah tersebut **memutus koneksi aktif**. Jalankan hanya pada akun uji atau pelanggan yang memang berwenang untuk diisolir, dan pastikan tidak ada session lain dengan username sama yang ikut terkena.

Setelah reconnect, verifikasi kembali session, IP address, dan pembatasan akses yang diterapkan.

---

## Struktur Laravel untuk Suspend dan Reactivate

Seperti Part 4 dan Part 5, saya lebih memilih memisahkan controller, service, dan job.

```text
app/
├── Http/Controllers/
│   └── SubscriptionController.php
├── Services/MikroTik/
│   ├── RouterosClient.php
│   ├── PppoeProvisioningService.php
│   ├── PppoeMonitoringService.php
│   └── PppoeSuspensionService.php
└── Jobs/
    ├── SuspendPppoeSubscription.php
    └── ReactivatePppoeSubscription.php
```

Contoh kontrak service:

```php
interface PppoeAccessManager
{
    public function suspend(int $subscriptionId): void;

    public function reactivate(int $subscriptionId): void;
}
```

Pada `RouterosClient`, saya ingin menyediakan operasi terpisah:

```php
public function findPppSecret(string $username): ?array;

public function setPppSecretProfile(
    string $username,
    string $profile
): void;

public function disconnectPppoeSession(string $username): void;
```

Signature di atas merupakan **rancangan interface**, bukan method bawaan Laravel atau RouterOS library. Implementasinya bergantung pada library RouterOS API yang digunakan.

---

## Rancangan Service Suspend

Alur service secara sederhana:

```php
public function suspend(Subscription $subscription): void
{
    $account = $subscription->pppoeAccount;
    $client = $this->clientFor($account->router);

    // Pastikan target dan profile isolir valid.
    $this->assertCanSuspend($subscription, $account);

    $client->setPppSecretProfile(
        $account->username,
        'ISOLIR'
    );

    // Terapkan perubahan pada sesi sesuai kebijakan.
    $client->disconnectPppoeSession($account->username);

    // Baca ulang konfigurasi aktual pada router.
    $this->verifyProfile($client, $account, 'ISOLIR');

    $subscription->update([
        'status' => 'suspended',
        'suspended_at' => now(),
    ]);
}
```

Contoh ini sengaja disederhanakan. Implementasi yang aman memerlukan lock per subscription, audit log, otorisasi, validasi router, penanganan timeout, dan status operasi tersendiri. Kegagalan pemutusan session juga perlu ditangani, bukan dianggap otomatis berhasil.

**Jangan membungkus perubahan database dan RouterOS seolah-olah satu transaksi atomik.** Database transaction Laravel tidak dapat melakukan rollback atas konfigurasi yang telanjur berubah di MikroTik.

---

## Status Operasi Harus Terlihat

Saya ingin memisahkan status subscription dari status eksekusi jaringan.

```text
subscription_status : active | suspended
operation_status    : pending | processing | succeeded | failed
```

Misalnya:

```text
Subscription       : suspended
Router Operation   : failed
Last Error         : RouterOS API timeout
```

Artinya keputusan isolir sudah diminta, tetapi penerapannya pada router belum berhasil diverifikasi. Dashboard tidak boleh mengklaim pelanggan sudah terisolir hanya berdasarkan permintaan tersebut.

Untuk kasus konflik atau hasil yang tidak pasti, operasi juga dapat ditandai `needs_reconciliation` agar konfigurasi router dibaca ulang sebelum tindakan berikutnya.

---

## Pengujian dengan Billing Monitor

Dari bahan pengujian yang tersedia, Billing Monitor menampilkan session PPPoE client `router-cimaung` dengan alamat IP `10.10.10.254` dan uptime. Informasi ini membantu mencatat keadaan session sebelum atau sesudah tindakan isolir.

![Monitoring session PPPoE pada GNET Billing]({{ '/assets/images/post/laravel-mikrotik-pppoe-suspend/02-billing-monitor.png' | relative_url }})

*Gambar 2. Tempatkan screenshot asli Billing Monitor yang memperlihatkan session uji.*

Untuk membuktikan isolir, saya perlu membandingkan beberapa kondisi:

1. Profile PPP Secret sebelum isolir.
2. Profile PPP Secret setelah isolir.
3. Session aktif sebelum dan sesudah reconnect.
4. Hasil akses internet dari client.
5. Status operasi yang tercatat di aplikasi.

Satu screenshot status `online` saja belum membuktikan pelanggan mendapat akses internet normal atau sedang terisolir.

---

## Pengujian Konektivitas Client Windows

Pada bahan video lainnya, terlihat client Windows di VirtualBox menjalankan:

```cmd
ping google.com -t
```

Perintah ini dapat membantu mengamati perubahan konektivitas selama pengujian. Namun hasil ping saja tidak cukup untuk menyimpulkan semua aturan isolir sudah bekerja.

![Pengujian konektivitas client Windows pada VirtualBox]({{ '/assets/images/post/laravel-mikrotik-pppoe-suspend/03-client-windows-ping.png' | relative_url }})

*Gambar 3. Tempatkan frame asli dari video pengujian client Windows.*

Idealnya pengujian mencakup DNS, ping ke IP publik, akses HTTP/HTTPS, dan akses ke halaman pemberitahuan isolir jika memang disediakan.

Contoh checklist:

| Tahap | Yang diverifikasi |
| --- | --- |
| Sebelum isolir | PPPoE tersambung dan internet normal |
| Setelah perubahan profile | Secret menggunakan profile isolir |
| Setelah reconnect | Kebijakan isolir benar-benar berlaku |
| Setelah reactivate | Profile kembali ke paket asli |
| Setelah reconnect berikutnya | Akses normal kembali |

Hasil aktual setiap tahap perlu dicatat dari pengujian, bukan diasumsikan dari tombol yang berhasil diklik.

---

## Konfirmasi Pembayaran dan Reactivate

Ketika pelanggan sudah membayar, aplikasi perlu menentukan apakah layanan boleh dipulihkan.

Saya membedakan **pembayaran yang dikirim pelanggan** dari **pembayaran yang sudah terverifikasi**.

```text
Pelanggan Mengirim Pembayaran
              |
              v
      Verifikasi Pembayaran
              |
              v
      Evaluasi Invoice Terkait
              |
              v
    Evaluasi Kelayakan Reactivate
              |
              v
        Restore PPP Profile
              |
              v
       Verifikasi RouterOS
              |
              v
       Subscription Active
```

Bukti transfer yang diunggah pelanggan tidak boleh langsung dianggap sebagai konfirmasi pembayaran. Untuk pembayaran manual, diperlukan verifikasi administrator berwenang. Untuk payment gateway, diperlukan verifikasi webhook, status transaksi, nominal, invoice, dan penanganan notifikasi berulang.

Dari bahan yang tersedia, saya **belum dapat memastikan** bahwa GNET Billing otomatis melakukan reactivate segera setelah pembayaran dikonfirmasi. Karena itu, alur di atas merupakan rancangan integrasi yang harus diuji sebelum diklaim sebagai fitur otomatis yang sudah selesai.

---

## Mengembalikan Profile PPPoE Normal

Misalnya pelanggan sebelumnya menggunakan profile `PAKET-10M`, kemudian diisolir menggunakan `ISOLIR`.

Setelah memenuhi syarat reactivate, aplikasi dapat mengembalikan profile aslinya:

```routeros
/ppp secret set [find where name="router-cimaung"] profile=PAKET-10M
```

Kemudian lakukan verifikasi:

```routeros
/ppp secret print detail where name="router-cimaung"
```

Jika diperlukan, session aktif ditangani agar kebijakan profile normal diterapkan pada koneksi baru. Langkah ini tidak boleh dilakukan secara sembarangan karena dapat menyebabkan gangguan koneksi sementara.

Contoh rancangan service:

```php
public function reactivate(Subscription $subscription): void
{
    $account = $subscription->pppoeAccount;
    $client = $this->clientFor($account->router);

    $this->assertEligibleForReactivation($subscription);

    $normalProfile = $this->resolveNormalProfile($subscription);

    $client->setPppSecretProfile(
        $account->username,
        $normalProfile
    );

    $this->verifyProfile($client, $account, $normalProfile);

    // Rekoneksi session dan verifikasi akses ditangani
    // sesuai kebijakan jaringan yang berlaku.

    $subscription->update([
        'status' => 'active',
        'suspended_at' => null,
    ]);
}
```

Kode ini **belum mencakup verifikasi konektivitas end-to-end**. Karena itu, status berhasil mengubah profile perlu dibedakan dari status pelanggan yang sudah benar-benar mendapatkan akses internet normal.

---

## Bagaimana Jika Pelanggan Masih Memiliki Invoice Overdue?

Satu pembayaran berhasil tidak selalu berarti seluruh kewajiban yang menghalangi layanan sudah selesai.

Contoh:

```text
Invoice September : paid
Invoice Oktober   : overdue
```

Keputusan reactivate harus mengikuti kebijakan billing yang ditetapkan. Service tidak boleh langsung mengaktifkan layanan hanya karena menemukan satu invoice berstatus `paid`.

Aturan jatuh tempo, grace period, dan otomatisasi isolir akan dibahas tersendiri pada Part 8 dan Part 9.

---

## Ketika RouterOS Berhasil tetapi Database Gagal

Salah satu masalah integrasi adalah kegagalan sebagian:

```text
Laravel meminta Reactivate
             |
             v
RouterOS berhasil mengubah profile
             |
             v
Database gagal menyimpan status
```

Kondisi sebaliknya juga mungkin terjadi:

```text
Database menandai layanan aktif
             |
             v
RouterOS API timeout
             |
             v
Profile aktual masih ISOLIR
```

Karena itu saya ingin menyimpan operasi secara eksplisit dan membaca ulang kondisi aktual pada router ketika hasilnya tidak pasti.

Contoh status:

```text
pending
processing
succeeded
failed
needs_reconciliation
```

Ketika operasi diulang, service perlu memeriksa apakah profile target sebenarnya sudah diterapkan. Ini membantu membuat proses **idempotent**, sehingga retry tidak menimbulkan perubahan berulang yang tidak diperlukan.

---

## Hindari Suspend dan Reactivate Berjalan Bersamaan

Bayangkan dua permintaan masuk hampir bersamaan:

```text
Job A: Suspend pelanggan
Job B: Reactivate pelanggan
```

Tanpa pengendalian, Job A dapat menulis `ISOLIR` setelah Job B memulihkan `PAKET-10M`, atau sebaliknya. Hasil akhir menjadi sulit diprediksi.

Saya ingin memastikan satu subscription hanya memiliki satu operasi perubahan akses yang berjalan pada satu waktu. Lock dan pengecekan ulang status sebelum eksekusi akan membantu mencegah konflik ini.

---

## Audit Log untuk Setiap Perubahan

Perubahan akses pelanggan harus dapat ditelusuri.

```text
timestamp
subscription_id
customer_id
router_id
pppoe_username
action
previous_profile
target_profile
requested_by
reason
operation_status
error
```

Contoh:

```text
Action           : suspend
Username         : router-cimaung
Previous Profile : PAKET-10M
Target Profile   : ISOLIR
Result           : succeeded
```

Ketika pelanggan menghubungi customer support, administrator dapat mengetahui siapa yang melakukan perubahan, kapan perubahan diminta, dan apakah RouterOS benar-benar menerima konfigurasi yang diharapkan.

Password PPPoE, password router, token API, dan rahasia pembayaran tidak perlu masuk ke audit log.

---

## Checklist Verifikasi End-to-End

Sebelum saya menyebut flow suspend dan reactivate selesai, ada beberapa hal yang perlu diuji:

- [ ] Subscription dan PPPoE account mengarah ke router yang benar.
- [ ] Profile normal pelanggan tersimpan dengan benar.
- [ ] Profile isolir benar-benar membatasi akses jaringan.
- [ ] Isolir mengubah profile secret sesuai target.
- [ ] Session aktif ditangani dengan aman.
- [ ] Pengujian client membuktikan akses telah dibatasi.
- [ ] Pembayaran dikonfirmasi melalui proses yang sah.
- [ ] Kelayakan reactivate dievaluasi berdasarkan invoice dan kebijakan billing.
- [ ] Reactivate mengembalikan profile normal.
- [ ] Client dapat kembali mengakses internet.
- [ ] Retry dan timeout tidak membuat status aplikasi menyesatkan.
- [ ] Audit log mencatat hasil operasi.

Checklist ini merupakan **kriteria pengujian**, bukan pernyataan bahwa seluruh butir sudah lolos pada aplikasi production.

---

## Hasil Part 6

Setelah Part 4 membahas **provisioning** dan Part 5 membahas **monitoring**, Part 6 memperkenalkan konsep **access control** berdasarkan lifecycle layanan pelanggan.

```text
Part 4: Provisioning
Laravel  ---> MikroTik

Part 5: Monitoring
MikroTik ---> Laravel

Part 6: Access Control
Billing Decision ---> Laravel ---> MikroTik
```

Hal yang saya anggap paling penting bukan sekadar tombol Isolir atau Reactivate, melainkan konsistensi antara keputusan billing, konfigurasi router, session PPPoE, dan kondisi internet yang dialami pelanggan.

---

## Selanjutnya: Monitoring Traffic dan Bandwidth PPPoE

Pada **Part 7** saya akan melanjutkan ke monitoring traffic dan bandwidth pelanggan.

Kita akan membedakan status koneksi dengan pemakaian jaringan, serta membahas bagaimana data RX/TX dapat ditampilkan tanpa membuat aplikasi terus-menerus membebani RouterOS.

Pembahasan invoice, otomatisasi jatuh tempo, subscription, dan deployment production di Railway akan tetap mendapat bagian tersendiri dalam seri ini.

---

## Penutup

Dari pengembangan aplikasi billing ini, saya belajar bahwa suspend tidak cukup hanya mengubah `status = suspended` pada database. Demikian pula, reactivate tidak cukup hanya mengganti `status = active`.

Aplikasi harus memastikan keputusan tersebut diterapkan pada router yang tepat, perubahan dapat diverifikasi, dan kegagalan tidak disembunyikan dari administrator.

Dengan pendekatan ini, Laravel bukan hanya menjadi tempat menyimpan data pelanggan dan tagihan, tetapi juga mulai menghubungkan proses administrasi ISP dengan pengendalian akses jaringan secara terukur.

Wallahu a'lam.
