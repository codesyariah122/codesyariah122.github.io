---
layout: post
title: "Monitoring PPPoE Online / Offline dari Laravel"
author: "puji"
categories: [Laravel, MikroTik, Networking]
image: assets/images/post/laravel-mikrotik-pppoe-monitoring/cover-social.jpg
hero_image: assets/images/post/laravel-mikrotik-pppoe-monitoring/cover.png
og_image_width: 1200
og_image_height: 630
og_image_type: image/jpeg
tags: [laravel, mikrotik, routeros, pppoe, monitoring, isp, billing, routeros-api]
opening: بسم الله الرحمن الرحيم
---

Pada Part sebelumnya saya sudah mencoba membuat proses provisioning PPPoE dari Laravel ke MikroTik RouterOS.

Laravel tidak lagi hanya membaca data dari router, tetapi sudah dapat membuat PPP Secret berdasarkan data pelanggan yang tersimpan pada aplikasi billing.

Setelah proses provisioning tersebut berhasil, muncul pertanyaan berikutnya:

> Apakah pelanggan yang sudah memiliki PPP Secret benar-benar sedang terkoneksi ke jaringan?

Di RouterOS kita dapat melihat informasi tersebut melalui:

```routeros
/ppp active print
```

Tetapi untuk aplikasi billing, saya tidak ingin dashboard harus membuka koneksi ke router setiap kali halaman dimuat.

Saya ingin Laravel memiliki salinan status koneksi terakhir yang sudah disinkronkan dari MikroTik.

Kurang lebih alurnya menjadi:

```text
MikroTik RouterOS
        │
        │ /ppp active
        ▼
Laravel
        │
        │ sinkronisasi
        ▼
Database
        │
        ▼
Dashboard

● Online
○ Offline
```

Pada tulisan ini saya akan mencatat bagaimana saya menyusun proses monitoring PPPoE online dan offline dari RouterOS ke aplikasi Laravel.

> Tulisan ini merupakan catatan dari proses saya membangun dan menguji aplikasi billing ISP menggunakan Laravel dan MikroTik CHR. Konfigurasi disederhanakan untuk kebutuhan lab, tetapi alur dan masalah yang dibahas berasal dari proses implementasi yang saya kerjakan.

---

## Seri Laravel + MikroTik ISP Billing

Tulisan ini merupakan **Part 5** dari seri Laravel + MikroTik yang sedang saya kerjakan.

1. [Cara Membuat PPPoE Server MikroTik CHR di VirtualBox](/cara-membuat-pppoe-server-mikrotik-chr-di-virtualbox/)
2. [Membangun Web App Billing MikroTik dengan Laravel](/membangun-web-app-billing-mikrotik-dengan-laravel/)
3. [Cara Menghubungkan Laravel ke MikroTik RouterOS API](/cara-menghubungkan-laravel-ke-mikrotik-routeros-api/)
4. [Provisioning PPPoE Otomatis dari Laravel ke MikroTik RouterOS](/provisioning-pppoe-otomatis-laravel-mikrotik/)
5. **Monitoring PPPoE Online / Offline dari Laravel**
6. Suspend dan Reactivate Pelanggan
7. Monitoring Traffic PPPoE
8. Invoice dan Pembayaran
9. Notifikasi WhatsApp
10. Persiapan Production

Pada Part 4 kita berhenti pada kondisi:

```text
Laravel
   │
   │ Provisioning
   ▼
RouterOS API
   │
   ▼
/ppp secret
   │
   ▼
PPPoE Account tersedia
```

Sekarang kita akan melanjutkannya menjadi:

```text
/ppp secret
     │
     │ client melakukan authentication
     ▼
/ppp active
     │
     │ monitoring
     ▼
Laravel Database
     │
     ▼
Dashboard
```

Artinya kita mulai memisahkan antara **akun yang tersedia di router** dan **pelanggan yang benar-benar sedang terkoneksi**.

---

## Target Part 5

Target implementasi pada bagian ini adalah:

- Laravel dapat membaca session PPPoE aktif dari RouterOS
- session dicocokkan berdasarkan username PPPoE
- pelanggan aktif diberi status `online`
- pelanggan yang tidak memiliki session aktif diberi status `offline`
- IP address pelanggan dapat disimpan
- uptime session dapat ditampilkan
- waktu terakhir pelanggan terlihat online dapat disimpan
- sinkronisasi tidak bergantung pada browser
- proses dapat dijalankan melalui Laravel Scheduler
- monitoring tidak langsung menganggap pelanggan offline ketika router gagal dihubungi
- struktur monitoring siap digunakan untuk lebih dari satu router

Saya belum membahas traffic RX/TX pada bagian ini.

Monitoring bandwidth akan saya pisahkan pada Part 7.

---

## PPP Secret dan PPP Active Bukan Hal yang Sama

Pada Part 4 saya sudah menyinggung perbedaan ini.

PPP Secret merupakan credential yang digunakan pelanggan untuk authentication.

Contohnya:

```routeros
/ppp secret print
```

Kita mungkin memiliki:

```text
name="ahmad-fauzi"
service=pppoe
profile=PAKET-10M
```

Tetapi keberadaan secret tersebut tidak berarti pelanggan sedang online.

Session yang benar-benar sedang terkoneksi dapat dilihat melalui:

```routeros
/ppp active print
```

Secara sederhana:

```text
PPP Secret
    │
    │ username + password
    ▼
Authentication
    │
    ▼
PPP Active
```

Karena itu pada database saya memisahkan:

```text
provision_status
```

dan:

```text
connection_status
```

Contohnya:

```text
provision_status  = active
connection_status = offline
```

Kondisi tersebut valid.

Artinya akun pelanggan tersedia di MikroTik tetapi pelanggan sedang tidak terkoneksi.

---

## Melihat PPP Active dari RouterOS

Pada MikroTik kita dapat menjalankan:

```routeros
/ppp active print
```

Contoh hasil sederhananya:

```text
# NAME          SERVICE  ADDRESS       UPTIME
0 ahmad-fauzi   pppoe    10.10.10.10  00:15:23
1 budi-toko     pppoe    10.10.10.11  01:42:08
```

Dari data tersebut kita sudah mendapatkan informasi penting:

```text
username
service
ip address
uptime
```

RouterOS juga dapat memberikan informasi lain tergantung jenis session dan versi RouterOS yang digunakan.

Untuk kebutuhan monitoring dasar kali ini saya fokus pada:

```text
name
address
uptime
```

---

## Data yang Ingin Saya Simpan

Pada Part 4 tabel `pppoe_accounts` sudah memiliki:

```text
provision_status
connection_status
```

Sekarang saya menambahkan informasi monitoring seperti:

```text
ip_address
uptime
last_seen_at
last_synced_at
```

Secara sederhana:

```text
pppoe_accounts

id
customer_id
router_id
username

provision_status
connection_status

ip_address
uptime

last_seen_at
last_synced_at

created_at
updated_at
```

Contoh:

```text
Customer          : Ahmad Fauzi
Username          : ahmad-fauzi
Router            : chr-lab-01

Provision Status  : active
Connection Status : online

IP Address        : 10.10.10.10
Uptime            : 00:15:23

Last Seen         : 2026-09-22 01:40:00
Last Synced       : 2026-09-22 01:40:00
```

`last_seen_at` dan `last_synced_at` memiliki arti berbeda.

`last_seen_at`:

> Kapan terakhir kali username tersebut terlihat pada PPP Active?

Sedangkan `last_synced_at`:

> Kapan terakhir kali aplikasi berhasil melakukan sinkronisasi status account tersebut?

Perbedaan kecil seperti ini akan berguna ketika router sedang bermasalah.

---

## Menambahkan Field Monitoring

Secara konsep migration-nya dapat dibuat seperti:

```php
Schema::table('pppoe_accounts', function (Blueprint $table) {
    $table->string('connection_status')
        ->default('offline');

    $table->string('ip_address')
        ->nullable();

    $table->string('uptime')
        ->nullable();

    $table->timestamp('last_seen_at')
        ->nullable();

    $table->timestamp('last_synced_at')
        ->nullable();
});
```

Saya sengaja menggunakan struktur sederhana terlebih dahulu.

Nantinya jika kebutuhan monitoring berkembang, data session dapat dipisahkan ke tabel tersendiri.

Misalnya:

```text
pppoe_sessions
```

untuk menyimpan history koneksi pelanggan.

Tetapi pada tahap ini saya ingin menyelesaikan monitoring status terkini terlebih dahulu.

---

## Router Juga Perlu Memiliki Status Monitoring

Monitoring pelanggan tidak hanya membutuhkan status pelanggan.

Kita juga harus mengetahui apakah router berhasil dihubungi.

Misalnya tabel `routers` memiliki informasi:

```text
name
host
api_port
status
last_seen_at
last_sync_at
last_sync_error
```

Contohnya:

```text
Router

Name            : chr-lab-01
Host            : 192.168.1.7
Status          : online
Last Seen       : 2026-09-22 01:40:00
Last Sync       : 2026-09-22 01:40:00
Last Sync Error : null
```

Kenapa informasi ini penting?

Karena:

```text
pelanggan offline
```

dan:

```text
router tidak dapat dihubungi
```

adalah dua kondisi yang berbeda.

---

## Jangan Query Router Setiap Kali Dashboard Dibuka

Pendekatan paling sederhana sebenarnya adalah:

```text
Browser membuka dashboard
        ↓
Laravel connect ke MikroTik
        ↓
/ppp active print
        ↓
return ke browser
```

Tetapi saya tidak ingin menggunakan pendekatan tersebut sebagai mekanisme utama.

Karena jika ada banyak administrator membuka dashboard:

```text
Admin A ──┐
Admin B ──┼──> RouterOS
Admin C ──┤
Admin D ──┘
```

setiap request dashboard dapat membuat koneksi baru ke router.

Selain itu jika router sedang lambat:

```text
Router timeout
     ↓
Dashboard ikut lambat
```

Karena itu saya lebih memilih:

```text
RouterOS
    │
    │ scheduler
    ▼
Laravel Worker
    │
    ▼
Database
    │
    ▼
Dashboard
```

Dashboard cukup membaca database.

---

## RouterosClient yang Sudah Kita Punya

Pada Part sebelumnya kita sudah memiliki konsep `RouterosClient`.

Salah satu method yang sudah disiapkan adalah:

```php
public function getActivePppoeSessions(): array
{
    // /ppp/active/print
}
```

Implementasi detailnya akan bergantung pada library RouterOS API yang digunakan.

Yang saya inginkan dari method ini adalah hasil yang sudah cukup sederhana untuk digunakan service.

Contohnya:

```php
[
    [
        'name' => 'ahmad-fauzi',
        'address' => '10.10.10.10',
        'uptime' => '00:15:23',
    ],
    [
        'name' => 'budi-toko',
        'address' => '10.10.10.11',
        'uptime' => '01:42:08',
    ],
]
```

Dengan demikian layer monitoring tidak perlu mengetahui bagaimana library RouterOS melakukan query.

---

## Membuat PppoeMonitoringService

Saya kemudian membuat service khusus untuk monitoring.

Strukturnya:

```text
app/
├── Services/
│   └── MikroTik/
│       ├── RouterosClient.php
│       ├── PppoeProvisioningService.php
│       └── PppoeMonitoringService.php
│
└── Jobs/
    ├── ProvisionPppoeAccount.php
    └── SyncPppoeSessions.php
```

Secara sederhana:

```php
namespace App\Services\MikroTik;

use App\Models\Router;
use Illuminate\Support\Collection;
use Throwable;

class PppoeMonitoringService
{
    public function sync(Router $router): void
    {
        try {
            $sessions = $this->getRouterClient($router)
                ->getActivePppoeSessions();

            $this->syncSessions(
                $router,
                collect($sessions)
            );

            $router->update([
                'status' => 'online',
                'last_seen_at' => now(),
                'last_sync_at' => now(),
                'last_sync_error' => null,
            ]);
        } catch (Throwable $e) {
            $router->update([
                'status' => 'unreachable',
                'last_sync_error' => $e->getMessage(),
            ]);

            report($e);

            throw $e;
        }
    }
}
```

Contoh tersebut masih disederhanakan.

Hal yang paling penting justru berada pada bagian error.

Jika router gagal dihubungi, saya **tidak langsung mengubah semua pelanggan menjadi offline**.

---

## Mencocokkan Username

Misalnya RouterOS mengembalikan:

```php
$sessions = [
    [
        'name' => 'ahmad-fauzi',
        'address' => '10.10.10.10',
        'uptime' => '00:15:23',
    ],
    [
        'name' => 'budi-toko',
        'address' => '10.10.10.11',
        'uptime' => '01:42:08',
    ],
];
```

Kita dapat membuat index berdasarkan username:

```php
$activeSessions = collect($sessions)
    ->keyBy('name');
```

Hasil konseptualnya:

```text
ahmad-fauzi
    address = 10.10.10.10
    uptime  = 00:15:23

budi-toko
    address = 10.10.10.11
    uptime  = 01:42:08
```

Kemudian account yang berada pada router tersebut dapat dibandingkan.

---

## Update Pelanggan Online

Misalnya:

```php
$accounts = $router->pppoeAccounts()
    ->where('provision_status', 'active')
    ->get();
```

Kemudian:

```php
foreach ($accounts as $account) {
    $session = $activeSessions->get(
        $account->username
    );

    if ($session) {
        $account->update([
            'connection_status' => 'online',
            'ip_address' => $session['address'] ?? null,
            'uptime' => $session['uptime'] ?? null,
            'last_seen_at' => now(),
            'last_synced_at' => now(),
        ]);

        continue;
    }

    $account->update([
        'connection_status' => 'offline',
        'ip_address' => null,
        'uptime' => null,
        'last_synced_at' => now(),
    ]);
}
```

Secara sederhana:

```text
username ada pada PPP Active?

        │
    ┌───┴───┐
    │       │
   Ya      Tidak
    │       │
    ▼       ▼
 Online   Offline
```

---

## Jangan Menghapus Last Seen Ketika Offline

Saat pelanggan berubah menjadi offline, saya tidak menghapus:

```text
last_seen_at
```

Misalnya sebelumnya:

```text
connection_status = online
last_seen_at       = 2026-09-22 01:40:00
```

Kemudian pada sinkronisasi berikutnya pelanggan tidak lagi berada di `/ppp active`.

Status menjadi:

```text
connection_status = offline
last_seen_at       = 2026-09-22 01:40:00
```

Dengan demikian dashboard dapat mengatakan:

```text
Deni Irawan

○ Offline

Terakhir terlihat:
22 September 2026 01:40
```

Kalau `last_seen_at` langsung dihapus ketika pelanggan offline, kita kehilangan informasi tersebut.

---

## Bagaimana Menentukan Pelanggan Offline?

Untuk satu hasil `/ppp active`, logikanya terlihat sederhana.

Jika username ditemukan:

```text
online
```

Jika tidak ditemukan:

```text
offline
```

Tetapi ada syarat penting:

> Kita hanya boleh mengambil kesimpulan tersebut jika pembacaan `/ppp active` berhasil.

Misalnya RouterOS memberikan response yang valid:

```text
ahmad-fauzi
budi-toko
```

Kemudian account:

```text
rina-rumah
```

tidak ditemukan.

Barulah kita dapat mengatakan:

```text
rina-rumah = offline
```

Tetapi jika RouterOS timeout, kita tidak memiliki data yang cukup untuk mengambil kesimpulan.

---

## Kesalahan yang Harus Dihindari: Router Timeout = Semua Offline

Ini salah satu bagian yang menurut saya paling penting dari monitoring ini.

Bayangkan router memiliki 500 pelanggan aktif.

Kemudian scheduler berjalan:

```text
01:40:00
```

Tetapi RouterOS API timeout.

Jika code kita melakukan:

```text
catch exception
    ↓
set semua pelanggan offline
```

maka dashboard tiba-tiba menampilkan:

```text
Online  : 0
Offline : 500
```

Padahal jaringan pelanggan mungkin tetap normal.

Yang gagal hanyalah:

```text
Laravel → RouterOS API
```

Karena itu saya membedakan:

```text
Connection Status Pelanggan
```

dengan:

```text
Monitoring Status Router
```

Jika router tidak dapat dihubungi:

```text
Router
status = unreachable
```

tetapi status pelanggan terakhir tetap dipertahankan.

---

## Kondisi Monitoring Ketika Router Tidak Dapat Dihubungi

Flow yang saya gunakan secara konsep:

```text
Scheduler
    │
    ▼
Connect RouterOS
    │
    ├── berhasil
    │      │
    │      ▼
    │   /ppp active
    │      │
    │      ▼
    │   sync account
    │
    └── gagal
           │
           ▼
     router = unreachable
           │
           ▼
     simpan error
           │
           ▼
     jangan ubah status pelanggan
```

Dengan begitu dashboard dapat menampilkan:

```text
Router chr-lab-01

⚠ Monitoring unavailable

Last successful sync:
01:40:00
```

Ini jauh lebih informatif dibanding mengubah semua account menjadi offline.

---

## Status Stale

Ada kondisi lain yang mulai menarik ketika monitoring dijalankan berkala.

Misalnya:

```text
last successful sync
01:40
```

tetapi sekarang:

```text
02:10
```

Berarti data connection status sudah berumur 30 menit.

Walaupun database mengatakan:

```text
online
```

kita sebenarnya tidak tahu apakah status tersebut masih benar.

Karena itu pada UI nantinya kita dapat memiliki konsep:

```text
Online
Offline
Unknown / Stale
```

Saya tidak harus langsung menambahkan status baru ke database.

UI dapat menghitungnya dari:

```text
last_synced_at
```

Contohnya:

```text
connection_status = online

tetapi

last_synced_at > 5 menit
```

Dashboard dapat menampilkan warning:

```text
Status monitoring mungkin sudah tidak terbaru.
```

Dengan demikian kita tidak memberikan kesan bahwa data selalu realtime jika sinkronisasi sebenarnya sedang bermasalah.

---

## Membuat Job SyncPppoeSessions

Seperti provisioning, saya juga memisahkan monitoring ke job.

Contohnya:

```php
namespace App\Jobs;

use App\Models\Router;
use App\Services\MikroTik\PppoeMonitoringService;

class SyncPppoeSessions
{
    public function __construct(
        public int $routerId
    ) {
    }

    public function handle(
        PppoeMonitoringService $service
    ): void {
        $router = Router::findOrFail(
            $this->routerId
        );

        $service->sync($router);
    }
}
```

Kemudian job dapat dijalankan:

```php
SyncPppoeSessions::dispatch(
    $router->id
);
```

Keuntungannya sama seperti provisioning:

- proses tidak bergantung pada browser
- kegagalan dapat dicatat
- retry dapat dikontrol
- masing-masing router dapat memiliki job sendiri
- monitoring dapat dipindahkan ke worker
- proses lebih mudah diskalakan

---

## Menjalankan Monitoring Menggunakan Laravel Scheduler

Setelah job tersedia, monitoring dapat dijalankan secara berkala.

Konsepnya:

```text
Laravel Scheduler
       │
       │ setiap beberapa menit
       ▼
Dispatch Sync Job
       │
       ▼
Queue Worker
       │
       ▼
RouterOS
       │
       ▼
Database
```

Contoh sederhananya:

```php
use App\Jobs\SyncPppoeSessions;
use App\Models\Router;
use Illuminate\Support\Facades\Schedule;

Schedule::call(function () {
    Router::query()
        ->where('is_active', true)
        ->each(function (Router $router) {
            SyncPppoeSessions::dispatch(
                $router->id
            );
        });
})->everyMinute();
```

Interval tersebut hanya contoh.

Frekuensi sebenarnya perlu disesuaikan dengan:

```text
jumlah router
jumlah pelanggan
kapasitas server
latency jaringan
kebutuhan monitoring
beban RouterOS
```

Saya tidak ingin melakukan polling terlalu agresif hanya agar dashboard terlihat "realtime".

---

## Scheduler Bukan Berarti Browser Realtime

Ada perbedaan antara:

```text
realtime
```

dan:

```text
near realtime
```

Jika scheduler berjalan setiap satu menit, maka dashboard sebenarnya menampilkan status yang terakhir disinkronkan.

Misalnya:

```text
01:40:00 → sync
01:40:25 → pelanggan disconnect
01:41:00 → sync berikutnya
```

Selama sekitar 35 detik database masih mungkin mengatakan pelanggan online.

Untuk kebutuhan dashboard billing, keterlambatan seperti ini biasanya masih dapat diterima tergantung kebutuhan operasional.

Karena itu saya lebih nyaman menyebut mekanisme ini:

```text
periodic monitoring
```

atau:

```text
near realtime monitoring
```

daripada mengklaim bahwa status selalu realtime.

---

## Menampilkan Last Sync di Dashboard

Karena data berasal dari scheduler, saya ingin dashboard transparan mengenai kapan data terakhir diperbarui.

Contohnya:

```text
PPPoE Monitoring

Router:
chr-lab-01

Status:
● Online

Last Sync:
beberapa detik lalu
```

Kemudian daftar pelanggan:

```text
Customer        Username        IP            Uptime      Status

Ahmad Fauzi     ahmad-fauzi     10.10.10.10   00:15:23    ● Online
Budi Santoso    budi-toko       10.10.10.11   01:42:08    ● Online
Deni Irawan     deni            -             -           ○ Offline
```

Informasi `Last Sync` menurut saya penting.

Tanpa informasi tersebut admin dapat mengira data berasal langsung dari router pada detik yang sama.

---

## Manual Sync dari Dashboard

Walaupun scheduler berjalan otomatis, saya juga dapat menyediakan tombol:

```text
Sync Sekarang
```

Flow-nya bukan:

```text
browser → langsung query router
```

melainkan:

```text
Browser
   │
   ▼
POST /routers/{router}/sync
   │
   ▼
Laravel
   │
   ▼
Dispatch SyncPppoeSessions
   │
   ▼
Queue
```

API cukup memberikan response:

```json
{
    "success": true,
    "message": "PPPoE synchronization has been queued."
}
```

Dashboard kemudian dapat melakukan refresh status beberapa saat kemudian.

Dengan demikian manual sync tetap menggunakan pipeline yang sama dengan scheduler.

---

## Jangan Menjalankan Dua Sync pada Router yang Sama Bersamaan

Ketika scheduler dan tombol manual sync tersedia, muncul kemungkinan:

```text
Scheduler
    │
    ├── Sync chr-lab-01
    │
Manual Sync
    │
    └── Sync chr-lab-01
```

berjalan pada waktu yang sama.

Untuk lab mungkin belum terasa.

Tetapi pada production saya ingin mencegah overlapping job untuk router yang sama.

Secara konsep:

```text
router:chr-lab-01:pppoe-sync
```

dapat memiliki lock.

Sehingga:

```text
Sync A sedang berjalan
        │
        ▼
Sync B mencoba berjalan
        │
        ▼
skip / retry kemudian
```

Tujuannya bukan hanya mengurangi beban router.

Kita juga menghindari dua proses menulis status monitoring pada waktu hampir bersamaan.

---

## Bagaimana Jika Username Ada di Router tetapi Tidak Ada di Database?

Ada kemungkinan `/ppp active` mengembalikan:

```text
legacy-user
```

tetapi database Laravel tidak mengenal username tersebut.

Artinya:

```text
RouterOS
legacy-user

        ≠

Laravel
tidak ditemukan
```

Saya tidak ingin aplikasi otomatis membuat customer berdasarkan data tersebut.

Lebih aman mencatatnya sebagai:

```text
Unmanaged PPP Session
```

atau:

```text
Unknown Session
```

Kemudian administrator dapat memeriksanya.

Ini juga membantu menemukan akun lama yang dibuat secara manual melalui WinBox sebelum aplikasi billing digunakan.

---

## Bagaimana Jika Satu Username Muncul Tidak Sesuai Router?

Karena setiap PPPoE account memiliki:

```text
router_id
```

sinkronisasi harus dilakukan dalam scope router tersebut.

Jangan hanya mencari:

```php
PppoeAccount::where(
    'username',
    $username
)->first();
```

tanpa memperhatikan router.

Lebih aman secara konsep:

```php
PppoeAccount::where(
    'router_id',
    $router->id
)
->where(
    'username',
    $username
)
->first();
```

Karena ketika sistem berkembang menjadi multi-router, username yang sama mungkin saja muncul pada konteks router yang berbeda.

---

## Multi-Router Monitoring

Pada awal lab saya hanya menggunakan:

```text
chr-lab-01
```

Tetapi struktur monitoring sebaiknya tidak menganggap hanya akan ada satu router.

Contohnya nanti:

```text
Laravel
   │
   ├── chr-bandung-01
   ├── chr-bandung-02
   ├── router-jakarta-01
   └── router-surabaya-01
```

Masing-masing router memiliki:

```text
status
last_seen_at
last_sync_at
last_sync_error
```

Kemudian masing-masing memiliki job:

```text
SyncPppoeSessions(router-1)
SyncPppoeSessions(router-2)
SyncPppoeSessions(router-3)
```

Dengan struktur ini kegagalan satu router tidak menghentikan monitoring router lainnya.

---

## Jangan Polling Semua Router dalam Satu Request Panjang

Saya menghindari flow:

```text
Sync command
    │
    ├── router 1
    ├── router 2
    ├── router 3
    ├── router 4
    ├── router 5
    └── router 6
```

secara sequential dalam satu proses panjang.

Jika router kedua timeout, proses menjadi lambat.

Saya lebih memilih:

```text
Scheduler
    │
    ├── Job Router 1
    ├── Job Router 2
    ├── Job Router 3
    ├── Job Router 4
    ├── Job Router 5
    └── Job Router 6
```

Sehingga masing-masing router memiliki lifecycle job sendiri.

---

## Logging Monitoring

Sama seperti provisioning, proses monitoring juga perlu log.

Contoh informasi:

```text
timestamp
router_id
action
active_sessions
matched_accounts
unknown_sessions
duration
status
error
```

Contoh berhasil:

```text
2026-09-22 01:40:00

router           : chr-lab-01
action           : sync_pppoe
active_sessions  : 12
matched_accounts : 11
unknown_sessions : 1
status           : success
duration         : 310ms
```

Contoh gagal:

```text
2026-09-22 01:41:00

router : chr-lab-01
action : sync_pppoe
status : failed
error  : connection timeout
```

Informasi ini akan sangat membantu ketika admin mengatakan:

> Kok pelanggan terlihat offline padahal internetnya jalan?

Kita dapat memeriksa apakah masalahnya berada pada pelanggan atau pada proses monitoring.

---

## Jangan Simpan Credential pada Log Monitoring

Monitoring tidak membutuhkan password pelanggan.

Jadi log tidak perlu berisi:

```text
PPPoE password
RouterOS password
API credential
```

Data yang dibutuhkan cukup:

```text
username
router
status
address
uptime
timestamp
```

Credential tetap berada pada layer konfigurasi yang memang membutuhkannya.

---

## Monitoring Dashboard

Setelah data tersimpan di database, dashboard tidak perlu berkomunikasi langsung dengan MikroTik.

Dashboard cukup membaca:

```text
pppoe_accounts
routers
```

Contoh summary:

```text
PPPoE Monitoring

Total Accounts
125

Online
97

Offline
28

Router Unreachable
0
```

Kemudian table:

```text
Customer       Username       Router       IP Address      Status

Ahmad Fauzi    ahmad-fauzi    chr-lab-01   10.10.10.10    ● Online
Budi Santoso   budi-toko      chr-lab-01   10.10.10.11    ● Online
Deni Irawan    deni           chr-lab-01   -              ○ Offline
```

Dari sisi aplikasi, ini jauh lebih sederhana daripada meminta browser melakukan query langsung ke setiap router.

---

## Endpoint Monitoring

Jika frontend terpisah dari backend, endpoint monitoring dapat memberikan data seperti:

```json
{
    "success": true,
    "data": {
        "router": {
            "name": "chr-lab-01",
            "status": "online",
            "last_sync_at": "2026-09-22T01:40:00+07:00"
        },
        "summary": {
            "total": 3,
            "online": 2,
            "offline": 1
        },
        "accounts": [
            {
                "username": "ahmad-fauzi",
                "connection_status": "online",
                "ip_address": "10.10.10.10",
                "uptime": "00:15:23",
                "last_seen_at": "2026-09-22T01:40:00+07:00"
            },
            {
                "username": "deni",
                "connection_status": "offline",
                "ip_address": null,
                "uptime": null,
                "last_seen_at": "2026-09-22T01:32:00+07:00"
            }
        ]
    }
}
```

Frontend tidak perlu mengetahui credential router ataupun cara RouterOS API bekerja.

---

## Flow Monitoring Lengkap

Setelah seluruh bagian digabungkan, flow Part 5 menjadi:

```text
Laravel Scheduler
        │
        ▼
Dispatch SyncPppoeSessions
        │
        ▼
Queue Worker
        │
        ▼
PppoeMonitoringService
        │
        ▼
RouterosClient
        │
        ▼
MikroTik RouterOS
        │
        │
        └── /ppp active print
                │
                ▼
        Active Sessions
                │
                ▼
        Match by Username
                │
        ┌───────┴────────┐
        │                │
     ditemukan       tidak ditemukan
        │                │
        ▼                ▼
      Online           Offline
        │                │
        └───────┬────────┘
                ▼
          Laravel Database
                │
                ▼
             Dashboard
```

Jika router gagal:

```text
RouterOS Timeout
       │
       ▼
Sync Failed
       │
       ▼
Router = Unreachable
       │
       ▼
Status pelanggan terakhir
TIDAK diubah
```

Bagian terakhir ini menurut saya merupakan salah satu aturan paling penting dalam monitoring.

---

## Dari Online / Offline ke Last Seen

Dengan monitoring berkala, kita sekarang dapat mulai menjawab:

```text
Apakah pelanggan online?
```

dan:

```text
Kapan terakhir pelanggan terlihat online?
```

Misalnya:

```text
Ahmad Fauzi
● Online

IP
10.10.10.10

Uptime
00:15:23

Last Seen
beberapa detik lalu
```

Sedangkan:

```text
Deni Irawan
○ Offline

Last Seen
18 menit lalu
```

Informasi seperti ini nantinya juga berguna untuk troubleshooting customer support.

---

## Apa yang Belum Dilakukan?

Sampai tahap ini monitoring baru menjawab:

```text
siapa yang online?
siapa yang offline?
IP apa yang digunakan?
berapa uptime session?
kapan terakhir terlihat?
```

Kita belum menjawab:

```text
berapa traffic RX?
berapa traffic TX?
berapa bandwidth saat ini?
berapa total pemakaian?
```

Saya sengaja belum memasukkan hal tersebut.

Karena monitoring status koneksi dan monitoring traffic memiliki karakteristik polling yang berbeda.

Traffic monitoring akan dibahas tersendiri pada Part 7.

---

## Hasil Part 5

Sampai tahap ini flow aplikasi berkembang menjadi:

```text
✓ Laravel terhubung RouterOS

✓ Laravel membaca system resource

✓ Laravel membaca PPP Active

✓ Laravel membuat PPP Secret

✓ provisioning memiliki status

✓ PPP Secret dan PPP Active dipisahkan

✓ session aktif disinkronkan ke database

✓ account dapat memiliki status online / offline

✓ IP address dapat disimpan

✓ uptime dapat ditampilkan

✓ last seen dapat disimpan

✓ monitoring berjalan melalui scheduler

✓ proses dapat dijalankan melalui queue

✓ router timeout tidak langsung membuat semua pelanggan offline

✓ status router dapat dimonitor

✓ struktur siap untuk multi-router
```

Jika Part 4 membuat Laravel mulai melakukan:

```text
WRITE
```

ke MikroTik, maka Part 5 mulai membuat aplikasi memiliki:

```text
OBSERVABILITY
```

terhadap koneksi pelanggan.

---

## Selanjutnya: Suspend dan Reactivate Pelanggan

Setelah kita mengetahui:

```text
pelanggan memiliki PPP Secret
```

dan:

```text
pelanggan sedang online atau offline
```

pertanyaan berikutnya adalah:

> Bagaimana jika pelanggan harus dihentikan sementara karena layanan disuspend?

Pada **Part 6** saya akan melanjutkan ke proses suspend dan reactivate pelanggan.

Flow yang ingin dicapai:

```text
Laravel Billing
       │
       │ suspend
       ▼
PPPoE Account
       │
       ▼
MikroTik RouterOS
       │
       ▼
Pelanggan tidak dapat menggunakan layanan
```

Kemudian setelah layanan diaktifkan kembali:

```text
Payment / Admin
       │
       ▼
Reactivate
       │
       ▼
RouterOS
       │
       ▼
Pelanggan dapat terkoneksi kembali
```

Bagian tersebut mulai menghubungkan lifecycle layanan pelanggan dengan konfigurasi jaringan.

---

## Catatan dari Implementasi

Dari proses monitoring ini saya kembali menemukan bahwa integrasi aplikasi dengan perangkat jaringan tidak cukup hanya memikirkan:

```text
online
```

dan:

```text
offline
```

Kita juga harus mempertimbangkan:

```text
router tidak dapat dihubungi

data monitoring sudah stale

scheduler tidak berjalan

queue worker berhenti

session ada tetapi account tidak dikenal

account ada tetapi session tidak ditemukan

dua sync berjalan bersamaan

satu router gagal tetapi router lain normal
```

Jika semua kondisi tersebut hanya diterjemahkan menjadi:

```text
offline
```

dashboard justru dapat memberikan informasi yang menyesatkan.

Karena itu saya lebih memilih memisahkan:

```text
status pelanggan
status router
status sinkronisasi
```

sebisa mungkin.

Dengan demikian ketika terjadi masalah, kita mempunyai informasi yang lebih jelas mengenai bagian mana yang sebenarnya gagal.

---

## Penutup

Pada Part 4 saya mulai mengendalikan konfigurasi pelanggan dengan membuat PPP Secret dari Laravel.

Pada Part 5 ini arah komunikasinya kembali dari MikroTik menuju aplikasi.

```text
Part 4

Laravel
   │
   │ WRITE
   ▼
MikroTik
```

Sekarang:

```text
Part 5

MikroTik
   │
   │ SESSION STATE
   ▼
Laravel
```

Keduanya kemudian membentuk siklus:

```text
Laravel
   │
   │ Provision
   ▼
MikroTik
   │
   │ Monitor
   ▼
Laravel
```

Menurut saya di titik ini aplikasi billing mulai terasa lebih hidup.

Kita tidak lagi hanya mengetahui bahwa pelanggan terdaftar, tetapi juga mulai mengetahui kondisi koneksi pelanggan dari router.

Pada Part berikutnya saya akan melanjutkan ke **suspend dan reactivate pelanggan**, sehingga aplikasi mulai dapat mengendalikan apakah layanan pelanggan boleh digunakan atau tidak.

---

## Lanjut ke Part Berikutnya

Seri berikutnya:

**Part 6 — Suspend dan Reactivate Pelanggan PPPoE dari Laravel**

Pada bagian tersebut saya akan mencoba menyusun flow suspend dan reactivate dengan tetap memperhatikan sinkronisasi database, kondisi RouterOS, kegagalan request, dan kemungkinan pelanggan masih memiliki session aktif.

File pendukung dan resource lengkap untuk seri ini akan saya kumpulkan pada **Part 10** setelah seluruh implementasi selesai.

Wallahu a'lam.