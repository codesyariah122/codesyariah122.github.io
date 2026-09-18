---
layout: post
title: "Provisioning PPPoE Otomatis dari Laravel ke MikroTik RouterOS"
author: "puji"
categories: [Laravel, MikroTik, Networking]
image: assets/images/post/laravel-mikrotik-pppoe-provisioning/cover-social.jpg
hero_image: assets/images/post/laravel-mikrotik-pppoe-provisioning/cover.png
og_image_width: 1200
og_image_height: 630
og_image_type: image/jpeg
tags: [laravel, mikrotik, routeros, pppoe, provisioning, isp, billing, routeros-api]
opening: بسم الله الرحمن الرحيم
---

Pada tulisan sebelumnya saya sudah mencoba menghubungkan aplikasi Laravel ke MikroTik RouterOS melalui API.

Laravel sudah dapat melakukan test connection, membaca informasi router, dan mengambil daftar PPP session yang sedang aktif.

Tahap berikutnya adalah bagian yang lebih menarik.

Aplikasi tidak lagi hanya **membaca data dari MikroTik**, tetapi mulai melakukan perubahan konfigurasi pada router.

Dalam project billing ISP yang sedang saya kerjakan, salah satu kebutuhan utamanya adalah ketika pelanggan memiliki layanan internet, akun PPPoE pelanggan tersebut dapat dibuat dari aplikasi Laravel tanpa harus membuka WinBox dan membuat PPP Secret secara manual.

Proses seperti ini biasa disebut **provisioning**.

Pada tulisan ini saya akan mencatat bagaimana saya menyusun alur provisioning PPPoE dari Laravel ke MikroTik RouterOS.

> Tulisan ini merupakan catatan dari proses saya membangun dan menguji aplikasi billing ISP menggunakan Laravel dan MikroTik CHR. Konfigurasi disederhanakan untuk kebutuhan lab, tetapi alur dan masalah yang dibahas berasal dari proses implementasi yang saya kerjakan.

---

## Seri Laravel + MikroTik ISP Billing

Tulisan ini merupakan **Part 4** dari seri Laravel + MikroTik yang sedang saya kerjakan.

1. [Cara Membuat PPPoE Server MikroTik CHR di VirtualBox](/cara-membuat-pppoe-server-mikrotik-chr-di-virtualbox/)
2. [Membangun Web App Billing MikroTik dengan Laravel](/membangun-web-app-billing-mikrotik-dengan-laravel/)
3. [Cara Menghubungkan Laravel ke MikroTik RouterOS API](/cara-menghubungkan-laravel-ke-mikrotik-routeros-api/)
4. **Provisioning PPPoE Otomatis dari Laravel ke MikroTik RouterOS**
5. Monitoring PPPoE Online / Offline dari Laravel
6. Suspend dan Reactivate Pelanggan
7. Monitoring Traffic PPPoE
8. Invoice dan Pembayaran
9. Notifikasi WhatsApp
10. Persiapan Production

Pada Part 3 kita berhenti pada kondisi:

```text
Laravel
   │
   │ RouterOS API
   ▼
MikroTik CHR
   │
   ├── membaca /system resource
   └── membaca /ppp active
```

Sekarang alurnya berkembang menjadi:

```text
Database Laravel
       │
       │ data pelanggan
       ▼
PPPoE Provisioning Service
       │
       │ RouterOS API
       ▼
MikroTik CHR
       │
       ▼
/ppp secret
```

Artinya aplikasi Laravel mulai menjadi bagian dari proses operasional jaringan.

---

## Target Part 4

Target implementasi kali ini adalah:

- data pelanggan tetap disimpan di database Laravel
- paket internet memiliki mapping ke PPP Profile MikroTik
- Laravel dapat membuat PPP Secret melalui RouterOS API
- provisioning memiliki status yang jelas
- provisioning yang gagal tidak dianggap berhasil
- error dari router disimpan untuk debugging
- proses yang sama tidak membuat PPP Secret berulang kali
- aplikasi dapat menyimpan referensi akun yang sudah dibuat di router

Saya sengaja belum memasukkan suspend, reconnect, traffic monitoring, dan invoice pada tahap ini.

Masing-masing akan dibahas pada bagian berikutnya.

---

## Topologi Lab

Environment yang saya gunakan masih melanjutkan lab sebelumnya.

```text
┌──────────────────────────────┐
│ Laravel ISP Billing          │
│                              │
│ Customer                     │
│ Service Plan                 │
│ PPPoE Account                │
└──────────────┬───────────────┘
               │
               │ RouterOS API
               │ Port 8728
               ▼
┌──────────────────────────────┐
│ MikroTik CHR Server          │
│                              │
│ PPPoE Server                 │
│ PPP Profile                  │
│ PPP Secret                   │
└──────────────┬───────────────┘
               │
               │ PPPoE
               ▼
┌──────────────────────────────┐
│ MikroTik CHR Client          │
│                              │
│ PPPoE Client                 │
└──────────────────────────────┘
```

Untuk lab ini saya masih menggunakan RouterOS API pada port:

```text
8728
```

Pada environment production tentu pendekatannya harus lebih ketat. API tidak seharusnya diekspos secara bebas ke internet. Akses sebaiknya dibatasi melalui private network, VPN, firewall, atau mekanisme lain yang sesuai dengan arsitektur jaringan.

---

## Kenapa Provisioning Perlu Diotomatisasi?

Tanpa provisioning dari aplikasi, proses aktivasi pelanggan kira-kira seperti ini:

```text
Admin membuat pelanggan
        ↓
Admin membuka WinBox
        ↓
Masuk menu PPP
        ↓
Membuat PPP Secret
        ↓
Memilih profile
        ↓
Mengisi password
        ↓
Kembali ke aplikasi billing
        ↓
Mengubah status pelanggan
```

Untuk beberapa pelanggan mungkin belum terasa merepotkan.

Tetapi jika jumlah pelanggan terus bertambah, proses manual seperti ini mulai memiliki beberapa risiko:

- username salah ketik
- profile salah dipilih
- password berbeda dengan database
- akun sudah dibuat tetapi status aplikasi belum berubah
- admin lupa membuat akun di router
- akun dibuat dua kali
- sulit mengetahui siapa yang melakukan provisioning

Karena itu saya ingin alurnya menjadi:

```text
Admin membuat layanan pelanggan
        ↓
Klik Provision PPPoE
        ↓
Laravel melakukan validasi
        ↓
Laravel menghubungi RouterOS
        ↓
PPP Secret dibuat
        ↓
Laravel menyimpan hasil provisioning
```

Dengan demikian aplikasi menjadi pusat proses administrasi, sedangkan MikroTik menjadi sistem yang menjalankan konfigurasi jaringan.

---

## Data Pelanggan dan Akun PPPoE Harus Dipisahkan

Salah satu keputusan struktur data yang saya gunakan adalah tidak menaruh semua informasi jaringan langsung pada tabel `customers`.

Pelanggan dan akun PPPoE merupakan dua hal yang berbeda.

Contohnya:

```text
Customer
└── Ahmad Fauzi
    ├── Phone
    ├── Address
    └── Status

PPPoE Account
└── ahmad-fauzi
    ├── Router
    ├── Service Plan
    ├── PPP Profile
    ├── Provision Status
    └── Connection Status
```

Dengan struktur ini, satu pelanggan nantinya juga memungkinkan memiliki lebih dari satu layanan.

Contohnya:

```text
Customer
└── Ahmad Fauzi
    ├── Rumah
    │   └── ahmad-rumah
    │
    └── Toko
        └── ahmad-toko
```

Struktur seperti ini lebih fleksibel dibanding menganggap satu customer selalu sama dengan satu PPPoE username.

---

## Struktur Tabel PPPoE Account

Secara sederhana, tabel `pppoe_accounts` dapat memiliki informasi seperti berikut:

```text
id
customer_id
service_plan_id
router_id
username
password
router_profile
routeros_secret_id
provision_status
connection_status
last_provisioned_at
last_error
created_at
updated_at
```

Contoh datanya:

```text
Customer            : Ahmad Fauzi
Username            : ahmad-fauzi
Service Plan        : Home 10 Mbps
Router              : chr-lab-01
Router Profile      : PAKET-10M
Provision Status    : pending
Connection Status   : offline
```

`provision_status` dan `connection_status` sengaja saya pisahkan.

Karena `provision_status` menjawab pertanyaan:

> Apakah konfigurasi akun ini sudah berhasil dibuat di router?

Sedangkan `connection_status` menjawab:

> Apakah pelanggan sedang terkoneksi ke PPPoE?

Keduanya tidak boleh dianggap sama.

---

## Status Provisioning

Saya menggunakan alur status sederhana:

```text
pending
   ↓
processing
   ↓
active
```

Jika terjadi error:

```text
pending
   ↓
processing
   ↓
failed
```

Sehingga status yang mungkin adalah:

```text
pending
processing
active
failed
```

Kenapa perlu `processing`?

Karena proses provisioning melibatkan sistem eksternal.

Laravel bisa saja sudah mengirim request tetapi RouterOS:

- timeout
- tidak dapat dijangkau
- menolak authentication
- username sudah ada
- profile tidak ditemukan
- mengalami error lainnya

Jadi kita tidak boleh langsung mengubah status menjadi `active` sebelum RouterOS benar-benar memberikan hasil yang sesuai.

---

## Mapping Paket Internet ke PPP Profile

Pada aplikasi billing, paket internet biasanya memiliki informasi bisnis seperti:

```text
Home 10 Mbps
Rp150.000 / bulan
10 Mbps download
10 Mbps upload
```

Sedangkan MikroTik bekerja menggunakan PPP Profile.

Contohnya:

```text
PAKET-10M
```

Karena itu service plan perlu memiliki mapping ke profile router.

Contoh data pada `service_plans`:

```text
name              : Home 10 Mbps
price             : 150000
download_mbps     : 10
upload_mbps       : 10
router_profile    : PAKET-10M
```

Sehingga ketika pelanggan memilih:

```text
Home 10 Mbps
```

Laravel mengetahui bahwa RouterOS harus menggunakan:

```text
PAKET-10M
```

---

## Pastikan PPP Profile Sudah Ada

Sebelum membuat secret, kita perlu memastikan profile tersedia di MikroTik.

Pada lab sebelumnya saya menggunakan profile:

```text
PAKET-10M
```

Kita bisa mengeceknya menggunakan:

```routeros
/ppp profile print
```

Contoh hasilnya:

```text
0 name="default"

1 name="PAKET-10M"
  local-address=10.10.10.1
  remote-address=pppoe-pool
  rate-limit=10M/10M
```

Jika profile belum ada, contoh konfigurasi lab:

```routeros
/ppp profile add \
    name=PAKET-10M \
    local-address=10.10.10.1 \
    remote-address=pppoe-pool \
    rate-limit=10M/10M
```

Untuk project production, profile tentu sebaiknya dikelola lebih terstruktur.

Misalnya:

```text
PAKET-10M
PAKET-20M
PAKET-30M
PAKET-50M
```

---

## Jangan Membuat RouterOS Logic di Controller

Sama seperti Part 3, saya tidak ingin controller Laravel mengetahui detail command RouterOS.

Saya menggunakan struktur kurang lebih seperti:

```text
app/
├── Http/
│   └── Controllers/
│       └── PppoeAccountController.php
│
├── Services/
│   └── MikroTik/
│       ├── RouterosClient.php
│       ├── PppoeProvisioningService.php
│       └── PppoeMonitoringService.php
│
└── Jobs/
    └── ProvisionPppoeAccount.php
```

Controller bertanggung jawab menerima request.

Service menangani business logic.

Router client menangani komunikasi dengan MikroTik.

Job digunakan ketika proses ingin dijalankan melalui queue.

Secara sederhana:

```text
Controller
    ↓
Provisioning Service
    ↓
RouterOS Client
    ↓
MikroTik
```

Dengan struktur ini, jika suatu saat cara berkomunikasi dengan RouterOS berubah, logic tersebut tidak perlu tersebar ke banyak controller.

---

## Menambahkan Method PPP Secret pada RouterosClient

Pada Part 3 kita sudah memiliki konsep `RouterosClient`.

Sekarang kita tambahkan kemampuan untuk mengelola PPP Secret.

Contohnya:

```php
class RouterosClient
{
    public function testConnection(): bool
    {
        // Test RouterOS connection.
    }

    public function getSystemResource(): array
    {
        // /system/resource/print
    }

    public function getActivePppoeSessions(): array
    {
        // /ppp/active/print
    }

    public function findPppSecret(string $username): ?array
    {
        // /ppp/secret/print
    }

    public function createPppSecret(array $payload): array
    {
        // /ppp/secret/add
    }
}
```

Dengan demikian `PppoeProvisioningService` tidak perlu mengetahui detail implementasi library RouterOS yang digunakan.

Service cukup mengatakan:

```php
$router->findPppSecret($username);
```

atau:

```php
$router->createPppSecret($payload);
```

Detail komunikasi dengan RouterOS tetap berada di satu tempat.

---

## Payload PPP Secret

Data dasar yang kita perlukan untuk membuat akun PPPoE pada lab ini adalah:

```text
name
password
service
profile
```

Contohnya:

```php
$payload = [
    'name' => 'ahmad-fauzi',
    'password' => 'password-yang-dibuat-aplikasi',
    'service' => 'pppoe',
    'profile' => 'PAKET-10M',
];
```

Secara konsep, konfigurasi RouterOS yang ingin kita hasilkan setara dengan:

```routeros
/ppp secret add \
    name=ahmad-fauzi \
    password=******** \
    service=pppoe \
    profile=PAKET-10M
```

Password sengaja tidak saya tampilkan.

Credential pelanggan maupun RouterOS tidak seharusnya muncul secara terbuka di screenshot, repository, log, maupun artikel.

---

## Membuat PppoeProvisioningService

Business logic provisioning saya tempatkan pada service terpisah.

Contoh sederhananya:

```php
namespace App\Services\MikroTik;

use App\Models\PppoeAccount;
use Throwable;

class PppoeProvisioningService
{
    public function __construct(
        protected RouterosClient $router
    ) {
    }

    public function provision(PppoeAccount $account): void
    {
        $account->update([
            'provision_status' => 'processing',
            'last_error' => null,
        ]);

        try {
            $existing = $this->router->findPppSecret(
                $account->username
            );

            if ($existing) {
                $account->update([
                    'routeros_secret_id' => $existing['.id'] ?? null,
                    'provision_status' => 'active',
                    'last_provisioned_at' => now(),
                ]);

                return;
            }

            $result = $this->router->createPppSecret([
                'name' => $account->username,
                'password' => $account->password,
                'service' => 'pppoe',
                'profile' => $account->router_profile,
            ]);

            $account->update([
                'routeros_secret_id' => $result['.id'] ?? null,
                'provision_status' => 'active',
                'last_provisioned_at' => now(),
                'last_error' => null,
            ]);
        } catch (Throwable $e) {
            report($e);

            $account->update([
                'provision_status' => 'failed',
                'last_error' => $e->getMessage(),
            ]);

            throw $e;
        }
    }
}
```

Contoh di atas masih disederhanakan.

Implementasi sebenarnya akan bergantung pada library RouterOS API yang digunakan pada project.

Yang paling penting di sini adalah alurnya:

```text
account
   ↓
processing
   ↓
cek existing PPP Secret
   ↓
create jika belum ada
   ↓
simpan hasil
   ↓
active
```

Jika terjadi exception:

```text
processing
   ↓
failed
```

---

## Kenapa Harus Mengecek Username Sebelum Create?

Ini salah satu bagian yang menurut saya cukup penting ketika menghubungkan aplikasi dengan perangkat jaringan.

Misalnya admin menekan tombol:

```text
Provision PPPoE
```

Laravel berhasil mengirim request dan RouterOS berhasil membuat:

```text
ahmad-fauzi
```

Tetapi response dari aplikasi timeout sebelum browser menerima informasi bahwa proses berhasil.

Admin melihat proses seolah gagal kemudian menekan tombol Provision lagi.

Jika aplikasi langsung menjalankan:

```text
/ppp secret add
```

tanpa melakukan pengecekan terlebih dahulu, aplikasi akan mencoba membuat resource yang sebenarnya sudah ada.

Karena itu sebelum create saya melakukan:

```text
Find PPP Secret
        │
        ▼
Username sudah ada?
     ┌──┴──┐
    Ya    Tidak
     │       │
     ▼       ▼
   Sync    Create
     │       │
     └───┬───┘
         ▼
       Active
```

Prinsip seperti ini membuat provisioning lebih **idempotent**.

Secara sederhana:

> Menjalankan proses yang sama kembali sebisa mungkin tidak menghasilkan resource duplikat atau kondisi yang berbeda secara tidak sengaja.

Ini menjadi penting ketika nantinya provisioning dijalankan menggunakan queue dan memiliki mekanisme retry.

---

## Jangan Hanya Percaya Status Database

Ada kasus sebaliknya.

Misalnya database Laravel menyimpan:

```text
provision_status = active
```

Tetapi seseorang masuk ke WinBox dan menghapus PPP Secret secara manual.

Sekarang kondisi sistem menjadi:

```text
Laravel Database

ahmad-fauzi
provision_status = active

          ≠

MikroTik RouterOS

ahmad-fauzi
tidak ditemukan
```

Artinya database dan router sudah tidak sinkron.

Karena itu aplikasi sebaiknya memiliki mekanisme untuk melakukan pengecekan atau reconciliation.

Contohnya:

```text
Laravel
   │
   │ daftar account active
   ▼
RouterOS
   │
   │ cek PPP Secret
   ▼
Bandingkan
   │
   ├── ditemukan → synchronized
   │
   └── tidak ditemukan → out_of_sync
```

Jika akun hilang dari router, administrator dapat diberi warning.

Contohnya:

```text
Provision Status
Out of Sync

PPP Secret tidak ditemukan pada chr-lab-01.
```

Mekanisme seperti ini akan semakin penting ketika aplikasi menangani banyak pelanggan dan lebih dari satu router.

---

## Menjalankan Provisioning Menggunakan Job

Provisioning sebenarnya dapat dilakukan langsung dari controller.

Tetapi saya lebih memilih memisahkannya melalui job.

Contoh:

```php
namespace App\Jobs;

use App\Models\PppoeAccount;
use App\Services\MikroTik\PppoeProvisioningService;

class ProvisionPppoeAccount
{
    public function __construct(
        public int $accountId
    ) {
    }

    public function handle(
        PppoeProvisioningService $service
    ): void {
        $account = PppoeAccount::findOrFail(
            $this->accountId
        );

        $service->provision($account);
    }
}
```

Kemudian controller cukup melakukan:

```php
ProvisionPppoeAccount::dispatch($account->id);
```

Keuntungannya:

- HTTP request tidak perlu menunggu router terlalu lama
- provisioning dapat di-retry
- failure lebih mudah dicatat
- proses dapat dipantau melalui queue
- controller tetap sederhana
- aplikasi lebih siap jika jumlah router bertambah

Alurnya menjadi:

```text
Browser
   │
   ▼
Laravel Controller
   │
   ▼
Queue
   │
   ▼
ProvisionPppoeAccount
   │
   ▼
PppoeProvisioningService
   │
   ▼
RouterosClient
   │
   ▼
MikroTik
```

---

## Flow Provisioning dari Dashboard

Dari sisi aplikasi, flow yang saya inginkan kurang lebih seperti ini:

```text
Pelanggan
   ↓
Detail Pelanggan
   ↓
Layanan Internet
   ↓
PPPoE Account
   ↓
Provision PPPoE
```

Sebelum provisioning:

```text
Customer
Ahmad Fauzi

Username
ahmad-fauzi

Package
Home 10 Mbps

Router
chr-lab-01

PPP Profile
PAKET-10M

Provision Status
Pending
```

Admin kemudian menekan:

```text
Provision PPPoE
```

Status berubah:

```text
Pending
   ↓
Processing
```

Laravel kemudian menghubungi RouterOS.

Jika berhasil:

```text
Processing
   ↓
Active
```

Jika gagal:

```text
Processing
   ↓
Failed
```

Dan aplikasi menampilkan informasi error yang aman untuk administrator.

---

## Contoh Response Berhasil

Misalnya provisioning berhasil.

API aplikasi dapat mengembalikan response seperti:

```json
{
    "success": true,
    "message": "PPPoE account provisioned successfully.",
    "data": {
        "username": "ahmad-fauzi",
        "router": "chr-lab-01",
        "profile": "PAKET-10M",
        "provision_status": "active"
    }
}
```

Password tidak perlu dikembalikan.

Apalagi ditampilkan pada log.

---

## Verifikasi dari MikroTik

Setelah provisioning berhasil, saya tetap melakukan pengecekan dari RouterOS.

Gunakan:

```routeros
/ppp secret print
```

Kita seharusnya melihat akun:

```text
name="ahmad-fauzi"
service=pppoe
profile=PAKET-10M
```

Jika ingin mencari username tertentu:

```routeros
/ppp secret print where name="ahmad-fauzi"
```

Dengan demikian kita memiliki dua bukti:

```text
Laravel
provision_status = active

        +

MikroTik
PPP Secret = tersedia
```

Ini jauh lebih aman dibanding hanya menganggap provisioning berhasil karena tombol di dashboard sudah ditekan.

---

## Dari PPP Secret ke PPP Active

Ada satu perbedaan yang juga penting.

Setelah PPP Secret berhasil dibuat, belum tentu pelanggan langsung muncul pada:

```routeros
/ppp active print
```

Karena `PPP Secret` adalah akun yang **boleh melakukan authentication**.

Sedangkan `PPP Active` adalah session pelanggan yang **sedang terkoneksi**.

Flow-nya:

```text
PPP Secret dibuat
       ↓
Client PPPoE mencoba login
       ↓
RouterOS melakukan authentication
       ↓
Username + Password valid
       ↓
Session PPPoE terbentuk
       ↓
PPP Active
```

Jadi:

```text
provision_status = active
```

tidak otomatis berarti:

```text
connection_status = online
```

Inilah alasan saya memisahkan kedua status tersebut di database.

Contohnya pelanggan bisa saja:

```text
Provision Status
Active

Connection Status
Offline
```

dan itu merupakan kondisi yang valid.

Akun tersedia di router, tetapi perangkat pelanggan sedang tidak terkoneksi.

---

## Contoh Flow Lengkap

Setelah semua bagian digabungkan, flow provisioning menjadi:

```text
Admin
  │
  ▼
Laravel Dashboard
  │
  ▼
PppoeAccountController
  │
  ▼
ProvisionPppoeAccount Job
  │
  ▼
PppoeProvisioningService
  │
  ├── validasi account
  ├── validasi router
  ├── validasi profile
  │
  ▼
RouterosClient
  │
  ├── cari PPP Secret
  │
  ├── jika ada → sync
  │
  └── jika belum ada → create
  │
  ▼
MikroTik RouterOS
  │
  ▼
PPP Secret
  │
  ▼
Laravel menyimpan hasil
  │
  ▼
Provision Status = Active
```

Dengan alur ini controller tetap tipis dan logic RouterOS tidak tersebar ke banyak bagian aplikasi.

---

## Error yang Perlu Ditangani

Ketika mulai menulis konfigurasi ke router, error handling menjadi jauh lebih penting dibanding hanya membaca data.

Ada beberapa kondisi yang perlu diantisipasi.

### Router Tidak Dapat Dijangkau

Contohnya:

```text
Connection timed out
```

Status provisioning harus berubah menjadi:

```text
failed
```

Database tidak boleh menganggap provisioning berhasil.

---

### Authentication RouterOS Gagal

Misalnya credential pada `.env` salah.

```text
Authentication failed
```

Aplikasi boleh menyimpan informasi error yang diperlukan untuk debugging, tetapi jangan menampilkan password RouterOS.

---

### PPP Profile Tidak Ditemukan

Misalnya service plan mengarah ke:

```text
PAKET-10M
```

tetapi profile tersebut belum tersedia pada router.

Aplikasi sebaiknya berhenti sebelum membuat secret dengan konfigurasi yang salah.

Flow-nya:

```text
Provision
   ↓
Check Profile
   ↓
Tidak ditemukan
   ↓
Failed
```

Administrator kemudian dapat memperbaiki mapping service plan atau konfigurasi router.

---

### Username Sudah Tersedia

Jangan langsung menganggap kondisi ini sebagai error fatal.

Kita perlu mengetahui apakah username tersebut memang merupakan resource yang sebelumnya dibuat untuk account yang sama.

Jika iya:

```text
existing PPP Secret
        ↓
sync
        ↓
active
```

Jika username tersebut ternyata milik account lain:

```text
username conflict
        ↓
failed
        ↓
administrator review
```

Dengan demikian aplikasi tidak mengambil alih resource yang bukan miliknya secara diam-diam.

---

### Router Berhasil tetapi Database Gagal

Ini kasus yang lebih sulit.

Contohnya:

```text
RouterOS
PPP Secret berhasil dibuat

        ↓

Laravel
gagal update database
```

Sekarang resource ada di router tetapi database menganggap proses belum berhasil.

Jika job kemudian melakukan retry dan langsung menjalankan:

```text
/ppp secret add
```

kita akan mencoba membuat resource yang sudah ada.

Karena itu retry harus melakukan:

```text
find first
```

bukan:

```text
create first
```

Ini salah satu alasan idempotency sangat penting dalam provisioning.

---

## Logging Provisioning

Saya juga ingin setiap aktivitas provisioning memiliki log.

Contoh informasi yang berguna:

```text
timestamp
account_id
username
router_id
action
status
duration
error
```

Contoh:

```text
2026-09-18 10:20:01

username : ahmad-fauzi
router   : chr-lab-01
action   : provision
status   : success
duration : 420ms
```

Jika gagal:

```text
2026-09-18 10:21:14

username : ahmad-fauzi
router   : chr-lab-01
action   : provision
status   : failed
error    : router connection timeout
```

Yang tidak boleh dicatat:

```text
password pelanggan
password RouterOS
API credential
```

Logging bukan hanya berguna ketika mencari error.

Nantinya informasi ini juga dapat digunakan sebagai audit trail.

Misalnya kita ingin mengetahui:

> Kapan account pelanggan diprovision?

> Router mana yang digunakan?

> Apakah pernah gagal?

> Berapa kali retry dilakukan?

---

## Jangan Mengirim Password ke Frontend Jika Tidak Diperlukan

Untuk dashboard admin, saya berusaha memperlakukan credential sebagai data sensitif.

Jika password tidak perlu ditampilkan, response API cukup mengembalikan:

```json
{
    "username": "ahmad-fauzi",
    "profile": "PAKET-10M",
    "provision_status": "active"
}
```

Tidak perlu mengembalikan password.

Semakin sedikit tempat credential berpindah, semakin kecil kemungkinan credential bocor melalui:

- browser
- network log
- screenshot
- error tracker
- console
- API response
- log aplikasi

Hal yang sama berlaku untuk credential RouterOS.

Credential koneksi router tetap disimpan pada konfigurasi server dan tidak dikirim ke browser.

---

## Jangan Ekspos RouterOS API ke Internet Secara Bebas

Pada lab lokal saya menggunakan alamat private:

```text
192.168.1.7:8728
```

Tetapi konfigurasi lab seperti ini tidak boleh diterjemahkan begitu saja menjadi:

```text
PUBLIC_IP:8728
```

yang dapat diakses dari seluruh internet.

Untuk production, arsitektur yang lebih aman dapat berupa:

```text
Internet
   │
   ▼
Laravel Server
   │
   │ Private Network / VPN
   ▼
MikroTik Router
```

Kemudian akses API dibatasi hanya dari sumber yang memang membutuhkan.

Selain itu:

- gunakan account RouterOS khusus aplikasi
- gunakan hak akses minimum yang diperlukan
- batasi sumber koneksi menggunakan firewall
- jangan menggunakan credential administrator utama
- rotasi credential jika diperlukan
- jangan commit `.env`
- gunakan koneksi terenkripsi bila arsitektur memungkinkan
- catat dan monitor kegagalan authentication

Pada tahap lab saya memang lebih fokus memastikan flow aplikasi bekerja.

Tetapi ketika menuju production, bagian keamanan ini tidak boleh dilewati.

---

## Provisioning Bukan Berarti Billing Sudah Selesai

Setelah Part 4 ini, aplikasi baru memiliki kemampuan:

```text
Customer
   ↓
Service Plan
   ↓
PPPoE Account
   ↓
Provision
   ↓
PPP Secret
```

Tetapi sistem billing ISP masih membutuhkan banyak bagian lain.

Contohnya:

```text
Apakah pelanggan sedang online?

Berapa lama pelanggan terkoneksi?

IP apa yang sedang digunakan?

Kapan terakhir kali pelanggan terlihat online?

Bagaimana jika pelanggan menunggak?

Bagaimana cara suspend?

Bagaimana mengaktifkan kembali setelah pembayaran?

Bagaimana monitoring traffic?

Bagaimana membuat invoice?

Bagaimana mengirim notifikasi?
```

Karena itu provisioning hanyalah salah satu bagian dari sistem.

---

## Hasil Part 4

Sampai tahap ini kita sudah memiliki konsep:

```text
✓ Laravel terhubung RouterOS
✓ membaca system resource
✓ membaca PPP Active
✓ customer dan PPPoE account terpisah
✓ service plan memiliki mapping PPP profile
✓ provisioning memiliki status
✓ pengecekan PPP Secret sebelum create
✓ PPP Secret dapat dibuat dari aplikasi
✓ error provisioning dicatat
✓ proses dapat dijalankan melalui queue
✓ hasil provisioning disimpan kembali ke database
```

Perubahan terbesarnya dibanding Part 3 adalah:

```text
Part 3

Laravel ───── READ ─────> MikroTik
```

sekarang menjadi:

```text
Part 4

Laravel ───── READ ─────> MikroTik
Laravel ───── WRITE ────> MikroTik
```

Aplikasi sudah mulai mengendalikan lifecycle konfigurasi pelanggan.

---

## Selanjutnya: Monitoring PPPoE Online / Offline

Setelah PPP Secret berhasil dibuat, pertanyaan berikutnya adalah:

> Bagaimana aplikasi Laravel mengetahui apakah pelanggan benar-benar sedang online?

Pada MikroTik kita sebenarnya sudah memiliki:

```routeros
/ppp active print
```

Tetapi membaca command tersebut setiap kali dashboard dibuka bukan pendekatan yang ideal.

Pada **Part 5** saya akan membahas bagaimana saya menyusun proses sinkronisasi PPP Active dari MikroTik ke database Laravel.

Targetnya:

```text
MikroTik
    │
    │ /ppp active
    ▼
Laravel Scheduler / Queue
    │
    ▼
Database
    │
    ▼
Dashboard
```

Sehingga dashboard dapat menampilkan informasi seperti:

```text
ahmad-fauzi
● Online

IP Address
10.10.10.10

Uptime
00:15:23

Last Seen
beberapa detik lalu
```

tanpa membuat browser harus terus-menerus melakukan query langsung ke router.

---

## Catatan dari Implementasi

Dari proses ini saya mulai melihat bahwa integrasi Laravel dengan MikroTik bukan hanya persoalan:

```text
bisa connect atau tidak
```

Ketika aplikasi mulai melakukan write ke RouterOS, kita harus mulai memikirkan kondisi-kondisi seperti:

```text
request berhasil tetapi response timeout

router berhasil tetapi database gagal

database active tetapi resource router hilang

job dijalankan dua kali

username ternyata sudah digunakan

profile router berubah

router sedang offline
```

Hal-hal seperti ini mungkin tidak terlihat ketika pertama kali mencoba RouterOS API.

Tetapi justru bagian tersebut yang menjadi penting ketika integrasi mulai digunakan sebagai bagian dari aplikasi billing.

---

## Penutup

Pada awal project, membuat PPPoE user melalui WinBox terasa cukup sederhana.

Tetapi ketika proses tersebut dipindahkan ke aplikasi billing, ternyata masalahnya bukan sekadar menjalankan:

```routeros
/ppp secret add
```

Kita juga harus memikirkan:

```text
status
retry
duplicate
timeout
synchronization
logging
security
konsistensi data
```

Di sinilah aplikasi billing mulai berubah dari sekadar dashboard CRUD menjadi sistem yang benar-benar berinteraksi dengan infrastruktur jaringan.

Pada Part berikutnya saya akan melanjutkan ke **monitoring PPPoE online dan offline dari Laravel**, menggunakan data `/ppp active` yang sebelumnya sudah berhasil kita baca dari RouterOS API.

---

## Lanjut ke Part Berikutnya

Seri berikutnya:

**Part 5 — Monitoring PPPoE Online / Offline dari Laravel**

Pada bagian tersebut kita akan mulai menyinkronkan session PPPoE dari RouterOS ke database aplikasi sehingga status pelanggan dapat dipantau dari dashboard Laravel.

Wallahu a'lam.