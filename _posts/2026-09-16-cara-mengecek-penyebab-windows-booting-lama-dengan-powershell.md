---
layout: post
title: "Cara Mengecek Penyebab Windows Booting Lama dengan PowerShell"
author: "puji"
categories: [Windows, Troubleshooting]
image: assets/images/post/windows-booting-lama-powershell/cover-og.jpg
hero_image: assets/images/post/windows-booting-lama-powershell/cover.png
og_image_width: 1200
og_image_height: 630
og_image_type: image/jpeg
tags: [windows, powershell, troubleshooting, booting, performance, event-viewer]
opening: بسم الله الرحمن الرحيم
---

{{ page.opening }}

Windows yang membutuhkan waktu lama untuk masuk ke desktop tidak selalu berarti harus langsung di-install ulang.

Booting lambat bisa disebabkan oleh banyak hal, seperti aplikasi startup, service Windows, driver, perangkat penyimpanan, atau proses lain yang berjalan ketika Windows mulai digunakan.

Daripada langsung menebak penyebabnya, kita bisa melakukan diagnosis terlebih dahulu menggunakan tool bawaan Windows.

Pada artikel ini kita akan menggunakan **PowerShell dan Event Viewer** untuk melihat informasi performa boot Windows.

Targetnya adalah mengetahui:

```text
Berapa lama Windows melakukan boot?
        ↓
Bagian mana yang membutuhkan waktu lama?
        ↓
Apakah ada aplikasi atau service yang memperlambat startup?
        ↓
Apakah perlu melakukan pemeriksaan lebih lanjut?
```

Semua pemeriksaan pada artikel ini dapat dilakukan tanpa menginstall aplikasi tambahan.

---

## Apa yang Akan Kita Periksa?

Windows mempunyai event log khusus yang mencatat informasi performa startup dan shutdown.

Salah satu lokasi yang berguna adalah:

```text
Applications and Services Logs
        │
        ▼
Microsoft
        │
        ▼
Windows
        │
        ▼
Diagnostics-Performance
        │
        ▼
Operational
```

Dari sana kita bisa menemukan beberapa event yang berkaitan dengan proses startup Windows.

Beberapa Event ID yang akan kita gunakan:

```text
Event ID 100
│
└── Informasi performa boot Windows

Event ID 101
│
└── Aplikasi yang mengalami degradasi saat startup

Event ID 102
│
└── Driver yang mengalami degradasi saat startup

Event ID 103
│
└── Service yang mengalami degradasi saat startup
```

Dengan informasi tersebut kita bisa melakukan troubleshooting berdasarkan data, bukan hanya perkiraan.

---

## 1. Membuka PowerShell sebagai Administrator

Pertama buka **Windows PowerShell** sebagai Administrator.

Caranya:

```text
Start
  ↓
Cari "PowerShell"
  ↓
Klik kanan Windows PowerShell
  ↓
Run as administrator
```

Jika muncul User Account Control, pilih:

```text
Yes
```

### Membuka PowerShell sebagai Administrator

![Membuka Windows PowerShell sebagai Administrator]({{ site.url }}/assets/images/post/windows-booting-lama-powershell/01-powershell-administrator.png)

*Gambar 1. Membuka Windows PowerShell menggunakan opsi Run as administrator.*

Setelah PowerShell terbuka, prompt biasanya terlihat seperti:

```powershell
PS C:\Windows\system32>
```

Hak Administrator berguna karena beberapa log dan command troubleshooting membutuhkan permission yang lebih tinggi.

---

## 2. Mengecek Event Boot Terakhir

Windows menyimpan informasi performa boot pada Event ID `100`.

Jalankan:

```powershell
Get-WinEvent -FilterHashtable @{
    LogName='Microsoft-Windows-Diagnostics-Performance/Operational'
    Id=100
} -MaxEvents 1
```

Command tersebut berarti:

```text
Get-WinEvent
│
└── membaca Windows Event Log

LogName
│
└── Diagnostics-Performance/Operational

Id=100
│
└── mencari event performa boot

-MaxEvents 1
│
└── hanya mengambil event terbaru
```

Jika berhasil, PowerShell akan menampilkan event terakhir yang berkaitan dengan performa boot Windows.

---

## 3. Mengambil Detail Waktu Boot dengan PowerShell

Output Event ID 100 mempunyai banyak data.

Supaya lebih mudah dibaca, kita bisa mengambil field yang kita perlukan.

Jalankan:

```powershell
$e = Get-WinEvent -FilterHashtable @{
    LogName='Microsoft-Windows-Diagnostics-Performance/Operational'
    Id=100
} -MaxEvents 1

[xml]$xml = $e.ToXml()

$data = @{}

foreach ($item in $xml.Event.EventData.Data) {
    $data[$item.Name] = $item.'#text'
}

[PSCustomObject]@{
    TimeCreated       = $e.TimeCreated
    BootTimeSec       = [math]::Round([int]$data.BootTime / 1000, 1)
    MainPathBootSec   = [math]::Round([int]$data.MainPathBootTime / 1000, 1)
    PostBootSec       = [math]::Round([int]$data.BootPostBootTime / 1000, 1)
    PNPInitSec        = [math]::Round([int]$data.BootPNPInitTime / 1000, 1)
    ExplorerInitSec   = [math]::Round([int]$data.BootExplorerInitTime / 1000, 1)
}
```

Contoh output:

```text
TimeCreated      : 9/13/2026 9:22:14 AM
BootTimeSec      : 114.6
MainPathBootSec  : 32.5
PostBootSec      : 82.1
PNPInitSec       : 2.5
ExplorerInitSec  : 10.0
```

### Contoh Output Event ID 100

![Contoh hasil Event ID 100 Windows melalui PowerShell]({{ site.url }}/assets/images/post/windows-booting-lama-powershell/02-event-id-100-output.png)

*Gambar 2. Contoh hasil pembacaan informasi performa boot Windows dari Event ID 100 menggunakan PowerShell.*

Angka pada komputer Anda tentu bisa berbeda.

Yang penting bukan mendapatkan angka yang sama, tetapi memahami bagian mana yang membutuhkan waktu paling besar.

---

## 4. Memahami `BootTimeSec`

Field:

```text
BootTimeSec
```

menunjukkan gambaran total durasi proses boot yang dicatat Windows pada event tersebut.

Misalnya:

```text
BootTimeSec : 114.6
```

berarti event mencatat durasi sekitar:

```text
114.6 detik
```

Tetapi angka total saja belum cukup untuk menentukan penyebab.

Kita perlu melihat komponen lainnya.

Secara sederhana:

```text
Boot Windows
     │
     ├── Main Path
     │
     └── Post Boot
```

Karena itu selanjutnya kita melihat `MainPathBootSec` dan `PostBootSec`.

---

## 5. Memahami `MainPathBootSec`

Field:

```text
MainPathBootSec
```

menggambarkan waktu pada jalur utama proses boot sebelum Windows masuk ke fase setelah desktop/login tersedia.

Pada fase ini Windows melakukan berbagai pekerjaan seperti:

```text
Windows Boot
     │
     ├── kernel
     ├── driver
     ├── device initialization
     ├── system service
     └── proses startup inti
```

Contoh:

```text
MainPathBootSec : 32.5
```

Jika bagian ini sangat tinggi, kita bisa melanjutkan pemeriksaan terhadap:

```text
Driver
Device
Storage
Service
Windows component
```

Jangan langsung menyimpulkan hard disk atau SSD rusak hanya berdasarkan satu angka.

Data ini sebaiknya digunakan sebagai petunjuk untuk menentukan pemeriksaan berikutnya.

---

## 6. Memahami `PostBootSec`

Berikutnya:

```text
PostBootSec
```

Bagian ini berkaitan dengan aktivitas Windows setelah fase boot utama selesai dan sistem masih melakukan berbagai pekerjaan setelah login.

Contohnya:

```text
PostBootSec : 82.1
```

Post-boot dapat dipengaruhi oleh aktivitas seperti:

```text
Startup application
        │
        ├── browser
        ├── updater
        ├── launcher
        ├── cloud sync
        └── aplikasi lainnya

Windows service
        │
        └── background process

Antivirus
        │
        └── startup scan

Disk activity
        │
        └── banyak proses membaca/menulis disk
```

Jika `PostBootSec` tinggi tetapi proses boot utama relatif normal, aplikasi atau service setelah login layak diperiksa lebih lanjut.

---

## 7. Memahami `PNPInitSec`

Field:

```text
PNPInitSec
```

berhubungan dengan proses Plug and Play ketika Windows menginisialisasi perangkat.

Contohnya:

```text
PNPInitSec : 2.5
```

Jika nilai ini jauh lebih tinggi dari biasanya, salah satu area yang layak diperiksa adalah perangkat dan driver.

Contohnya:

```text
USB device
Storage controller
Network adapter
GPU
Audio device
External disk
Driver tertentu
```

Untuk melihat perangkat yang bermasalah, kita juga dapat membuka:

```text
Device Manager
```

dengan:

```text
Win + R
```

kemudian:

```text
devmgmt.msc
```

Cari perangkat yang mempunyai warning seperti tanda seru berwarna kuning.

---

## 8. Memahami `ExplorerInitSec`

Field:

```text
ExplorerInitSec
```

berhubungan dengan proses inisialisasi Windows Explorer/shell pada saat login.

Contohnya:

```text
ExplorerInitSec : 10.0
```

Jika bagian ini membutuhkan waktu sangat lama, beberapa hal yang dapat diperiksa antara lain:

```text
Startup applications
Shell extensions
Network drive
Desktop contents
Explorer integration
Background application
```

Sekali lagi, nilai tinggi bukan diagnosis final.

Tujuan kita adalah mempersempit area yang perlu diperiksa.

---

## 9. Cara Membaca Hasil Secara Keseluruhan

Misalnya kita mendapatkan:

```text
BootTimeSec      : 114.6
MainPathBootSec  : 32.5
PostBootSec      : 82.1
PNPInitSec        : 2.5
ExplorerInitSec  : 10.0
```

### Analisis Performa Boot Windows

![Analisis waktu boot Windows dari hasil PowerShell]({{ site.url }}/assets/images/post/windows-booting-lama-powershell/04-boot-performance-analysis.png)

*Gambar 3. Contoh analisis BootTime, MainPath, PostBoot, PNP, dan Explorer untuk mempersempit penyebab Windows booting lama.*

Kita bisa mulai membuat peta pemeriksaan:

```text
Boot total tinggi
        │
        ▼
Periksa komponennya
        │
        ├── MainPath tinggi?
        │      │
        │      ├── driver
        │      ├── storage
        │      ├── device
        │      └── service
        │
        ├── PNP tinggi?
        │      │
        │      └── device / driver
        │
        ├── Explorer tinggi?
        │      │
        │      └── shell / startup
        │
        └── PostBoot tinggi?
               │
               ├── startup apps
               ├── services
               └── background process
```

Pendekatan ini lebih baik daripada langsung:

```text
Windows lemot
     ↓
Install ulang
```

karena kita mencoba mengetahui penyebabnya terlebih dahulu.

---

## 10. Mengecek Aplikasi, Driver, dan Service yang Lambat Saat Startup

Selain Event ID `100`, Windows juga dapat mencatat event degradasi startup.

Kita bisa mencari Event ID:

```text
101
102
103
```

Jalankan:

```powershell
Get-WinEvent -FilterHashtable @{
    LogName='Microsoft-Windows-Diagnostics-Performance/Operational'
    Id=101,102,103
} |
Select-Object -First 20 TimeCreated, Id, Message |
Format-List
```

Contoh output Event ID `101`:

```text
TimeCreated : 9/13/2026 9:22:22 AM
Id          : 101

Message:

This application took longer than usual to start up,
resulting in a performance degradation in the
system startup process.

File Name        : powershell.exe
Friendly Name    : Windows PowerShell
Total Time       : 12240ms
Degradation Time : 7240ms
```

### Contoh Event ID 101

![Contoh Event ID 101 aplikasi startup Windows]({{ site.url }}/assets/images/post/windows-booting-lama-powershell/05-startup-event-101.png)

*Gambar 4. Contoh Event ID 101 yang mencatat aplikasi yang membutuhkan waktu lebih lama selama periode startup Windows.*

Dari sini kita mendapatkan informasi tambahan mengenai proses yang dianggap Windows membutuhkan waktu lebih lama saat startup.

Namun ada hal penting.

**Jangan langsung menganggap semua aplikasi yang muncul pada Event ID 101 sebagai penyebab utama Windows lambat.**

Kita perlu melihat konteks.

Misalnya PowerShell dibuka sendiri sesaat setelah login, aktivitas tersebut bisa ikut tercatat pada periode startup/post-boot.

Karena itu hasil Event Viewer harus dianalisis bersama kondisi penggunaan komputer pada saat pengukuran.

---

## 11. Melakukan Pengukuran Boot yang Lebih Bersih

Untuk mendapatkan hasil yang lebih mudah dianalisis, lakukan pengujian boot dalam kondisi relatif bersih.

Restart komputer.

Setelah desktop muncul:

```text
Jangan langsung buka browser
Jangan langsung buka PowerShell
Jangan buka aplikasi berat
Jangan menjalankan update

Tunggu sekitar 2–3 menit
```

Setelah sistem relatif idle, baru buka PowerShell sebagai Administrator.

Kemudian jalankan kembali:

```powershell
$e = Get-WinEvent -FilterHashtable @{
    LogName='Microsoft-Windows-Diagnostics-Performance/Operational'
    Id=100
} -MaxEvents 1

[xml]$xml = $e.ToXml()

$data = @{}

foreach ($item in $xml.Event.EventData.Data) {
    $data[$item.Name] = $item.'#text'
}

[PSCustomObject]@{
    TimeCreated       = $e.TimeCreated
    BootTimeSec       = [math]::Round([int]$data.BootTime / 1000, 1)
    MainPathBootSec   = [math]::Round([int]$data.MainPathBootTime / 1000, 1)
    PostBootSec       = [math]::Round([int]$data.BootPostBootTime / 1000, 1)
    PNPInitSec        = [math]::Round([int]$data.BootPNPInitTime / 1000, 1)
    ExplorerInitSec   = [math]::Round([int]$data.BootExplorerInitTime / 1000, 1)
}
```

Dengan metode ini kita mengurangi aktivitas tambahan yang dapat memengaruhi periode pengukuran setelah login.

---

## 12. Membuka Diagnostics-Performance dari Event Viewer

Jika tidak ingin selalu menggunakan PowerShell, data yang sama juga dapat diperiksa melalui Event Viewer.

Tekan:

```text
Win + R
```

kemudian:

```text
eventvwr.msc
```

Buka:

```text
Event Viewer
    │
    ▼
Applications and Services Logs
    │
    ▼
Microsoft
    │
    ▼
Windows
    │
    ▼
Diagnostics-Performance
    │
    ▼
Operational
```

### Diagnostics-Performance di Event Viewer

![Diagnostics Performance Operational pada Windows Event Viewer]({{ site.url }}/assets/images/post/windows-booting-lama-powershell/03-event-viewer-diagnostics-performance.png)

*Gambar 5. Lokasi Diagnostics-Performance → Operational pada Windows Event Viewer untuk melihat event performa startup.*

Di sini kita bisa melihat event seperti:

```text
100
101
102
103
```

Event Viewer berguna ketika kita ingin membaca detail sebuah event secara visual tanpa harus memprosesnya menggunakan PowerShell.

---

## 13. Mengecek Startup Apps

Jika hasil pemeriksaan mengarah ke fase setelah login, periksa aplikasi startup.

Cara paling mudah:

```text
Ctrl + Shift + Esc
```

Buka:

```text
Task Manager
    │
    ▼
Startup
```

atau pada versi Windows yang lebih baru:

```text
Task Manager
    │
    ▼
Startup apps
```

Periksa aplikasi yang otomatis berjalan ketika Windows login.

Contohnya bisa berupa:

```text
Game launcher
Cloud storage
Updater
Chat application
Adobe service
Vendor utility
Browser helper
```

Jangan men-disable semua aplikasi secara sembarangan.

Nonaktifkan hanya aplikasi yang memang Anda pahami dan tidak perlu berjalan otomatis.

---

## 14. Mengecek Event Disk yang Berkaitan dengan Storage

Booting lambat juga bisa berhubungan dengan storage.

Salah satu pemeriksaan awal yang dapat dilakukan adalah mencari event disk tertentu.

Contohnya:

```powershell
Get-WinEvent -FilterHashtable @{
    LogName='System'
    Id=129,153
} -MaxEvents 20 |
Select-Object TimeCreated, Id, ProviderName, Message |
Format-List
```

Event ID `129` dan `153` dapat muncul pada kondisi tertentu ketika terjadi timeout/reset atau retry operasi storage.

Namun kemunculan event tersebut **tidak boleh langsung diterjemahkan sebagai "hard disk pasti rusak."**

Kita masih perlu melihat:

```text
Provider event
Pesan lengkap event
Jenis storage
Driver/controller
Kondisi SMART
Kabel atau koneksi
Pola error
Gejala komputer
```

Pemeriksaan storage akan kita bahas lebih detail pada artikel terpisah.

---

## 15. Mengecek Status Disk dengan PowerShell

Sebagai pemeriksaan awal, kita juga bisa melihat disk yang dikenali Windows.

Jalankan:

```powershell
Get-Disk |
Select-Object Number, FriendlyName, SerialNumber, HealthStatus, OperationalStatus, Size
```

Contoh:

```text
Number            : 0
FriendlyName      : WDC WD5000AZLX
HealthStatus      : Healthy
OperationalStatus : Online
```

Perlu diperhatikan bahwa:

```text
HealthStatus = Healthy
```

tidak selalu berarti disk pasti bebas dari semua masalah.

Untuk diagnosis storage yang lebih lengkap, kita perlu menggabungkan beberapa sumber informasi.

Misalnya:

```text
Windows Event Log
        +
SMART / reliability counter
        +
gejala fisik
        +
benchmark jika diperlukan
        +
pemeriksaan filesystem
```

---

## 16. Jangan Langsung Menjalankan CHKDSK `/f` atau `/r`

Ketika komputer lambat, salah satu saran yang sering muncul di internet adalah:

```cmd
chkdsk C: /f
```

atau:

```cmd
chkdsk C: /r
```

Tetapi saya lebih memilih melakukan diagnosis terlebih dahulu.

Kita dapat memulai dengan pemeriksaan yang tidak langsung meminta perbaikan filesystem:

```cmd
chkdsk C:
```

Kemudian lihat hasilnya.

Untuk drive sistem, penggunaan `/f` biasanya membutuhkan proses perbaikan filesystem dan dapat meminta pemeriksaan pada restart.

Sedangkan `/r` melakukan pemeriksaan yang lebih berat karena juga mencari bad sector dan mencoba membaca data yang masih dapat dibaca.

Jika storage dicurigai mengalami kerusakan fisik dan terdapat data penting, **backup atau recovery data harus menjadi pertimbangan utama sebelum menjalankan operasi berat pada disk**.

Topik CHKDSK akan lebih aman jika dibahas pada artikel tersendiri.

---

## 17. Jangan Mengubah Banyak Hal Sekaligus

Saat troubleshooting Windows, hindari pola seperti:

```text
Windows lambat
     ↓
Disable 15 services
     ↓
Uninstall banyak aplikasi
     ↓
Update semua driver
     ↓
Jalankan registry cleaner
     ↓
CHKDSK /r
     ↓
Masih lambat
     ↓
Tidak tahu perubahan mana yang berpengaruh
```

Lebih baik:

```text
Ukur kondisi awal
      │
      ▼
Temukan indikasi
      │
      ▼
Ubah satu hal
      │
      ▼
Restart
      │
      ▼
Ukur kembali
      │
      ▼
Bandingkan
```

Dengan cara tersebut kita bisa mengetahui apakah perubahan benar-benar memberikan efek.

---

## 18. Contoh Alur Troubleshooting Windows Booting Lama

Secara keseluruhan, workflow yang bisa digunakan:

```text
Windows booting lama
        │
        ▼
Ambil Event ID 100
        │
        ▼
Lihat BootTime
        │
        ├───────────────┐
        ▼               ▼
 MainPath tinggi?    PostBoot tinggi?
        │               │
        ▼               ▼
 Driver/device       Startup apps
 Storage             Services
 Service             Background process
        │               │
        └───────┬───────┘
                ▼
        Event 101/102/103
                │
                ▼
        Periksa event System
                │
                ▼
         Event 129/153?
                │
                ▼
         Periksa storage
                │
                ▼
        Lakukan satu perubahan
                │
                ▼
             Restart
                │
                ▼
         Ukur Event ID 100
                │
                ▼
         Bandingkan hasil
```

Dengan workflow seperti ini troubleshooting menjadi lebih terstruktur.

---

## 19. Command Ringkas untuk Troubleshooting

Berikut beberapa command yang digunakan pada artikel ini.

### Melihat boot event terbaru

```powershell
Get-WinEvent -FilterHashtable @{
    LogName='Microsoft-Windows-Diagnostics-Performance/Operational'
    Id=100
} -MaxEvents 1
```

### Melihat event degradasi startup

```powershell
Get-WinEvent -FilterHashtable @{
    LogName='Microsoft-Windows-Diagnostics-Performance/Operational'
    Id=101,102,103
} |
Select-Object -First 20 TimeCreated, Id, Message |
Format-List
```

### Melihat event storage 129 dan 153

```powershell
Get-WinEvent -FilterHashtable @{
    LogName='System'
    Id=129,153
} -MaxEvents 20 |
Select-Object TimeCreated, Id, ProviderName, Message |
Format-List
```

### Melihat disk

```powershell
Get-Disk |
Select-Object Number, FriendlyName, SerialNumber, HealthStatus, OperationalStatus, Size
```

### Membuka Event Viewer

```cmd
eventvwr.msc
```

### Membuka Device Manager

```cmd
devmgmt.msc
```

### Pemeriksaan filesystem dasar

```cmd
chkdsk C:
```

---

## 20. Catatan Keamanan

Command pada artikel ini sebagian besar digunakan untuk **membaca informasi dan melakukan diagnosis**.

Tetapi tetap perhatikan command yang ditemukan dari internet sebelum menjalankannya sebagai Administrator.

Jangan menjalankan command yang tidak dipahami, terutama command yang:

```text
menghapus file
mengubah registry
mematikan service
mengubah permission
memformat drive
mengubah partition
memodifikasi boot configuration
```

Untuk troubleshooting, prinsip yang saya gunakan adalah:

```text
Read
 ↓
Understand
 ↓
Diagnose
 ↓
Backup jika diperlukan
 ↓
Change
 ↓
Measure again
```

Bukan:

```text
Copy command dari internet
        ↓
Paste sebagai Administrator
        ↓
Enter
```

---

## Kesimpulan

Windows booting lama tidak selalu harus diselesaikan dengan install ulang.

Windows sendiri menyediakan informasi yang cukup berguna melalui **Diagnostics-Performance Event Log**.

Dengan PowerShell kita bisa mengambil beberapa parameter seperti:

```text
BootTime
MainPathBootTime
BootPostBootTime
BootPNPInitTime
BootExplorerInitTime
```

Kemudian kita dapat mempersempit kemungkinan penyebab:

```text
Main Path tinggi
     │
     └── periksa driver, device, storage, service

PNP tinggi
     │
     └── periksa perangkat dan driver

Explorer tinggi
     │
     └── periksa shell dan startup

PostBoot tinggi
     │
     └── periksa aplikasi dan background process
```

Jika ditemukan indikasi masalah storage, pemeriksaan dapat dilanjutkan menggunakan Event Viewer, PowerShell, SMART, dan tool diagnosis lainnya.

Yang paling penting adalah **mengukur kondisi sebelum dan sesudah melakukan perubahan**.

Dengan begitu kita tidak hanya membuat Windows terasa lebih cepat, tetapi juga memahami bagian mana yang sebenarnya menyebabkan masalah.

---

## Artikel Selanjutnya

Artikel ini akan menjadi bagian dari seri **Windows Troubleshooting CodeSyariah**.

Beberapa pembahasan berikutnya yang akan kita buat:

```text
Part 1
Cara Mengecek Penyebab Windows Booting Lama dengan PowerShell
        ↓
Part 2
Cara Membaca Event ID 129 dan 153 pada Windows
        ↓
Part 3
Cara Mengecek Kesehatan HDD dan SSD dengan PowerShell
        ↓
Part 4
Cara Menggunakan CHKDSK dengan Aman
        ↓
Part 5
Cara Mengetahui Aplikasi yang Memperlambat Startup Windows
```

Pada artikel berikutnya kita akan membahas lebih dalam mengenai:

### Event ID 129 dan 153 Windows: Penyebab Disk Retry dan Cara Mengeceknya

Kita akan melihat bagaimana Windows mencatat masalah pada storage, bagaimana membaca pesan event dengan benar, serta bagaimana membedakan indikasi masalah driver, controller, filesystem, dan kemungkinan masalah fisik pada disk.

Sampai jumpa di catatan CodeSyariah berikutnya.
