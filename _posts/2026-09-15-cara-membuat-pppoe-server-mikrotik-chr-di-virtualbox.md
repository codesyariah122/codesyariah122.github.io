---
layout: post
title: "Cara Membuat PPPoE Server MikroTik CHR di VirtualBox"
author: "puji"
categories: [MikroTik, Networking]
image: assets/images/post/mikrotik-pppoe-server/cover.png
tags: [mikrotik, routeros, pppoe, chr, virtualbox, networking]
opening: بسم الله الرحمن الرحيم
---

{{ page.opening }}

Setelah cukup lama tidak menulis di CodeSyariah, kali ini saya kembali membuat catatan dari eksperimen dan project yang sedang saya kerjakan.

Pada artikel ini kita akan membuat **PPPoE Server menggunakan MikroTik CHR (Cloud Hosted Router) di VirtualBox**.

Artikel ini merupakan bagian pertama dari seri eksperimen **MikroTik + Laravel untuk ISP Billing**.

Target akhirnya bukan hanya membuat PPPoE Server. Pada artikel-artikel berikutnya kita akan membuat MikroTik CHR kedua sebagai simulasi pelanggan, menghubungkan Laravel dengan RouterOS API, melakukan provisioning akun PPPoE dari aplikasi, hingga membaca status pelanggan online dan offline.

Tetapi sebelum masuk ke Laravel, kita perlu memastikan pondasi jaringannya bekerja terlebih dahulu.

---

## Seri MikroTik + Laravel ISP Billing

Rencana eksperimen yang akan kita bangun:

```text
Part 1
PPPoE Server MikroTik CHR
        ↓
Part 2
PPPoE Client MikroTik CHR
        ↓
Part 3
Laravel + RouterOS API
        ↓
Part 4
Provisioning PPPoE dari Laravel
        ↓
Part 5
Monitoring PPPoE Online / Offline
        ↓
Part 6
Dashboard Billing ISP
```

Artikel yang sedang Anda baca adalah **Part 1 — PPPoE Server MikroTik CHR**.

---

## Apa yang Akan Kita Buat?

Pada tahap pertama, topologi lab kita:

```text
                   macOS
                     │
                VirtualBox
                     │
                     ▼
          ┌─────────────────────┐
          │                     │
          │    MikroTik CHR     │
          │                     │
          │    PPPoE Server     │
          │    192.168.1.7      │
          │                     │
          └──────────┬──────────┘
                     │
                     │ PPPoE
                     │
                     ▼
                PPPoE Client
              (untuk testing)
```

Komponen yang akan kita konfigurasi pada CHR Server:

```text
MikroTik CHR Server
       │
       ├── Interface
       ├── IP Address
       ├── IP Pool
       ├── PPP Profile
       ├── PPPoE Server
       └── PPP Secret
```

Setelah selesai, kita akan melakukan pengujian menggunakan CHR kedua sebagai PPPoE Client.

Konfigurasi lengkap client akan dibahas pada **Part 2**.

---

## Apa Itu PPPoE?

**PPPoE (Point-to-Point Protocol over Ethernet)** adalah metode untuk menjalankan protokol PPP melalui jaringan Ethernet.

Dalam jaringan ISP, PPPoE sering digunakan untuk melakukan autentikasi pelanggan menggunakan username dan password.

Secara sederhana:

```text
Pelanggan / CPE
       │
       │ username + password
       ▼
┌─────────────────┐
│  PPPoE Server   │
└────────┬────────┘
         │
         ├── autentikasi pelanggan
         │
         ├── memberikan IP address
         │
         └── membuat PPP session
```

Di MikroTik, akun pelanggan dapat disimpan sebagai **PPP Secret**.

Sedangkan pelanggan yang sedang terkoneksi dapat dilihat melalui:

```routeros
/ppp active print
```

Dua bagian ini nantinya menjadi sangat penting ketika MikroTik mulai kita integrasikan dengan aplikasi billing.

---

## Apa Itu MikroTik CHR?

**MikroTik CHR (Cloud Hosted Router)** adalah RouterOS yang dirancang untuk berjalan sebagai virtual machine.

Dengan CHR kita bisa membuat lab MikroTik tanpa harus mempunyai beberapa RouterBOARD fisik.

Pada eksperimen ini saya menggunakan:

```text
Host        : macOS
Hypervisor  : VirtualBox
Router      : MikroTik CHR
Role        : PPPoE Server
Management  : WinBox / Terminal
```

Untuk environment lab saya, CHR Server menggunakan IP management:

```text
192.168.1.7
```

IP tersebut hanya digunakan pada lab saya.

Silakan sesuaikan IP address, interface, dan network dengan environment masing-masing.

---

# 1. Menyiapkan MikroTik CHR di VirtualBox

Pertama pastikan MikroTik CHR sudah berhasil dijalankan melalui VirtualBox.

Saya membuat sebuah VM yang berperan khusus sebagai:

```text
CHR Server
```

Router inilah yang akan menjadi PPPoE concentrator/server.

### CHR Server di VirtualBox

![MikroTik CHR Server berjalan di VirtualBox]({{ site.url }}/assets/images/post/mikrotik-pppoe-server/01-chr-server-virtualbox.png)

*Gambar 1. MikroTik CHR Server yang digunakan sebagai PPPoE Server pada VirtualBox.*

Konfigurasi CPU, RAM, dan network adapter tidak harus sama persis dengan lab ini.

Yang paling penting adalah CHR dapat berjalan dan mempunyai interface yang akan digunakan untuk management serta jaringan PPPoE.

---

# 2. Memeriksa Interface MikroTik

Setelah CHR berhasil boot, login ke RouterOS melalui terminal atau WinBox.

Periksa interface:

```routeros
/interface print
```

Contoh:

```text
Flags: R - RUNNING

 #    NAME      TYPE
 0 R  ether1    ether
 1 R  ether2    ether
```

Dalam lab seperti ini kita bisa menggunakan satu interface untuk management dan interface lainnya sebagai jalur antara PPPoE Server dan client.

### Interface dan IP CHR Server

![Interface dan IP MikroTik CHR Server]({{ site.url }}/assets/images/post/mikrotik-pppoe-server/02-interface-ip-chr-server.png)

*Gambar 2. Interface dan IP address yang digunakan oleh MikroTik CHR Server.*

Menentukan interface yang benar penting karena PPPoE Server harus berjalan pada interface yang terhubung dengan jaringan client.

---

# 3. Mengatur IP Management CHR Server

Agar router dapat diakses dari komputer host dan nantinya dari aplikasi Laravel, CHR Server membutuhkan IP management.

Pada lab saya:

```text
192.168.1.7
```

Periksa konfigurasi IP:

```routeros
/ip address print
```

Jika IP belum tersedia, contoh konfigurasinya:

```routeros
/ip address add address=192.168.1.7/24 interface=ether1
```

Sesuaikan `ether1` dengan interface management masing-masing.

Periksa kembali:

```routeros
/ip address print
```

IP management ini nantinya juga akan kita gunakan ketika Laravel mulai berkomunikasi dengan RouterOS API.

---

# 4. Membuat IP Pool PPPoE

Setelah interface dan IP management siap, berikutnya kita menyediakan range IP untuk PPPoE Client.

Pada lab ini kita menggunakan network:

```text
10.10.10.0/24
```

Buat IP Pool:

```routeros
/ip pool add \
name=pppoe-pool \
ranges=10.10.10.2-10.10.10.254
```

Kemudian periksa:

```routeros
/ip pool print
```

Hasilnya kurang lebih:

```text
NAME         RANGES
pppoe-pool   10.10.10.2-10.10.10.254
```

Ketika client berhasil melakukan autentikasi, MikroTik dapat memberikan IP dari pool tersebut.

Secara sederhana:

```text
pppoe-pool
      │
      ├── 10.10.10.2
      ├── 10.10.10.3
      ├── 10.10.10.4
      ├── ...
      └── 10.10.10.254
```

---

# 5. Membuat PPP Profile

Selanjutnya kita membuat PPP Profile.

PPP Profile menentukan konfigurasi yang akan digunakan oleh akun PPPoE.

Jalankan:

```routeros
/ppp profile add \
name=pppoe-profile \
local-address=10.10.10.1 \
remote-address=pppoe-pool
```

Kemudian:

```routeros
/ppp profile print
```

Konfigurasi kita:

```text
Local Address  : 10.10.10.1
Remote Address : pppoe-pool
```

`local-address` merupakan alamat pada sisi router untuk koneksi PPP.

Sedangkan `remote-address` menentukan sumber IP yang diberikan kepada client.

Hubungannya:

```text
PPP Profile
     │
     ├── Local Address
     │      └── 10.10.10.1
     │
     └── Remote Address
            └── pppoe-pool
                   │
                   └── 10.10.10.2 - 10.10.10.254
```

---

# 6. Membuat PPPoE Server

Sekarang masuk ke bagian utama.

Kita membuat PPPoE Server pada interface yang mengarah ke client.

Misalnya interface tersebut:

```text
ether2
```

Jalankan:

```routeros
/interface pppoe-server server add \
interface=ether2 \
service-name=pppoe-service \
default-profile=pppoe-profile \
disabled=no
```

Kemudian:

```routeros
/interface pppoe-server server print
```

Pastikan service tidak dalam kondisi disabled.

Hubungan konfigurasinya sekarang:

```text
ether2
   │
   ▼
PPPoE Server
   │
   ▼
pppoe-profile
   │
   ▼
pppoe-pool
```

### PPPoE Server Aktif

![Konfigurasi PPPoE Server MikroTik CHR]({{ site.url }}/assets/images/post/mikrotik-pppoe-server/03-pppoe-server-config.png)

*Gambar 3. PPPoE Server yang berjalan pada MikroTik CHR Server.*

Sampai tahap ini CHR sudah dapat bertindak sebagai PPPoE concentrator.

Tetapi kita masih membutuhkan akun untuk melakukan autentikasi.

---

# 7. Membuat PPP Secret

Untuk lab sederhana, akun PPPoE dapat dibuat melalui **PPP Secret**.

Kita membuat akun pengujian:

```text
Username : testclient
Password : 123456
```

Tambahkan:

```routeros
/ppp secret add \
name=testclient \
password=123456 \
service=pppoe \
profile=pppoe-profile
```

Kemudian periksa:

```routeros
/ppp secret print
```

Kurang lebih akan terlihat:

```text
NAME        SERVICE   PROFILE
testclient  pppoe     pppoe-profile
```

### PPP Secret `testclient`

![PPP Secret testclient MikroTik]({{ site.url }}/assets/images/post/mikrotik-pppoe-server/04-ppp-secret-testclient.png)

*Gambar 4. Akun PPPoE `testclient` yang digunakan untuk pengujian.*

Credential tersebut hanya digunakan untuk **lab lokal**.

Jangan gunakan credential sederhana seperti ini untuk jaringan production.

---

# 8. PPP Secret dan PPP Active Itu Berbeda

Ini merupakan konsep penting sebelum melakukan pengujian.

Command:

```routeros
/ppp secret print
```

menampilkan akun PPP yang **terdaftar**.

Sedangkan:

```routeros
/ppp active print
```

menampilkan session PPP yang **sedang aktif**.

Jadi:

```text
PPP SECRET
───────────────
Siapa yang BOLEH login

          │
          ▼

PPPoE Authentication

          │
          ▼

PPP ACTIVE
───────────────
Siapa yang SEDANG login
```

Mempunyai akun `testclient` di `/ppp secret` tidak otomatis berarti pelanggan sedang online.

Sebelum ada client yang melakukan autentikasi:

```routeros
/ppp active print
```

belum akan menampilkan session `testclient`.

---

# 9. Menguji PPPoE Server dengan CHR Client

Konfigurasi server sebenarnya sudah selesai.

Tetapi saya tidak ingin berhenti hanya dengan melihat konfigurasi.

Kita perlu membuktikan bahwa PPPoE Server benar-benar dapat menerima autentikasi dari client.

Untuk pengujian saya menggunakan **MikroTik CHR kedua** yang bertindak sebagai simulasi CPE atau perangkat pelanggan.

Topologi sekarang:

```text
                  VirtualBox

        ┌──────────────────────┐
        │      CHR SERVER      │
        │                      │
        │ PPPoE Server         │
        │ PPP Secret           │
        │ testclient           │
        └──────────┬───────────┘
                   │
                   │ PPPoE
                   │
        ┌──────────▼───────────┐
        │      CHR CLIENT      │
        │                      │
        │ pppoe-out1           │
        │ user: testclient     │
        └──────────────────────┘
```

Konfigurasi CHR Client secara lengkap **tidak dibahas pada artikel ini**.

Itu akan menjadi pembahasan **Part 2**.

Pada bagian ini CHR Client hanya digunakan untuk membuktikan bahwa konfigurasi server yang baru kita buat benar-benar bekerja.

---

# 10. PPPoE Client Berhasil Terkoneksi

Setelah interface PPPoE pada CHR Client dikonfigurasi menggunakan akun:

```text
testclient
```

client berhasil melakukan autentikasi ke CHR Server.

### CHR Client Connected

![PPPoE Client MikroTik CHR berhasil terkoneksi]({{ site.url }}/assets/images/post/mikrotik-pppoe-server/05-chr-client-connected.png)

*Gambar 5. MikroTik CHR Client berhasil melakukan koneksi ke PPPoE Server menggunakan akun `testclient`.*

Ini sudah membuktikan bahwa proses:

```text
CHR Client
     │
     │ username + password
     ▼
PPPoE Server
     │
     ▼
PPP Secret
     │
     ▼
Authentication
```

berhasil.

Tetapi kita masih bisa membuktikannya dari sisi server.

---

# 11. Membuktikan Session dari CHR Server

Kembali ke CHR Server.

Jalankan:

```routeros
/ppp active print
```

Setelah client berhasil terkoneksi, `testclient` akan muncul sebagai session PPP aktif.

### `testclient` Muncul di PPP Active

![PPP Active menampilkan testclient pada MikroTik CHR Server]({{ site.url }}/assets/images/post/mikrotik-pppoe-server/06-ppp-active-testclient.png)

*Gambar 6. Session `testclient` terlihat pada `/ppp active` setelah CHR Client berhasil melakukan autentikasi.*

Pada session aktif, RouterOS dapat memberikan informasi seperti:

```text
name
service
caller-id
address
uptime
```

Secara konsep sekarang kita sudah membuktikan:

```text
PPP Secret
     │
     │ testclient terdaftar
     ▼
PPPoE Server
     │
     │ authentication success
     ▼
CHR Client
     │
     │ CONNECTED
     ▼
PPP Active
     │
     └── testclient ONLINE
```

Dengan demikian PPPoE Server yang kita buat benar-benar berfungsi.

---

# 12. Kenapa `/ppp active` Penting untuk Aplikasi Billing?

Nah, bagian ini yang nantinya akan menghubungkan eksperimen networking dengan development.

Bayangkan aplikasi billing mempunyai pelanggan:

```text
Database Laravel
────────────────────
testclient
customer02
customer03
customer04
```

Sedangkan MikroTik memberikan:

```text
/ppp active
────────────────────
testclient
customer03
```

Aplikasi dapat menerjemahkannya menjadi:

```text
testclient   ONLINE
customer02   OFFLINE
customer03   ONLINE
customer04   OFFLINE
```

Arsitekturnya nanti:

```text
MikroTik CHR Server
        │
        │
        │ /ppp active
        ▼
   RouterOS API
        │
        ▼
      Laravel
        │
        ▼
┌─────────────────────┐
│ ISP Billing         │
│                     │
│ Online       25     │
│ Offline      10     │
│ Customer     35     │
└─────────────────────┘
```

Informasi session seperti:

```text
name
service
caller-id
address
uptime
```

dapat dinormalisasi oleh backend dan digunakan pada dashboard monitoring.

Itulah alasan `/ppp active` akan menjadi salah satu bagian penting pada artikel integrasi Laravel nanti.

---

# 13. Command Troubleshooting

Jika konfigurasi tidak bekerja sesuai harapan, periksa satu per satu.

### Interface

```routeros
/interface print
```

### IP Address

```routeros
/ip address print
```

### IP Pool

```routeros
/ip pool print
```

### PPP Profile

```routeros
/ppp profile print
```

### PPPoE Server

```routeros
/interface pppoe-server server print
```

### PPP Secret

```routeros
/ppp secret print
```

### PPP Active

```routeros
/ppp active print
```

### RouterOS Log

```routeros
/log print
```

Saya lebih suka melakukan troubleshooting secara bertahap seperti ini daripada langsung mengubah banyak konfigurasi sekaligus.

Dengan begitu lebih mudah mengetahui layer mana yang sebenarnya bermasalah:

```text
Interface?
    ↓
IP?
    ↓
PPPoE Server?
    ↓
PPP Profile?
    ↓
PPP Secret?
    ↓
Authentication?
    ↓
PPP Active?
```

---

# 14. Kondisi Akhir Lab

Sampai tahap ini lab kita sudah menjadi:

```text
                    macOS
                      │
                 VirtualBox
                      │
          ┌───────────┴───────────┐
          │                       │
          ▼                       ▼
┌───────────────────┐   ┌───────────────────┐
│    CHR SERVER     │   │    CHR CLIENT     │
│                   │   │                   │
│ 192.168.1.7       │   │ pppoe-out1        │
│ PPPoE Server      │◄──│ testclient        │
│ PPP Secret        │   │                   │
│ PPP Active        │   │ CONNECTED         │
└───────────────────┘   └───────────────────┘
          │
          │
          ▼
  testclient ONLINE
```

Jadi kita tidak hanya berhasil membuat konfigurasi server.

Kita juga sudah membuktikan koneksi secara **end-to-end**.

---

# 15. Catatan Keamanan

Karena artikel ini menggunakan environment lab, beberapa konfigurasi sengaja dibuat sederhana agar mudah dipahami.

Untuk jaringan production, jangan menggunakan credential contoh dari tutorial.

Hindari membuka service management MikroTik seperti:

```text
WinBox
SSH
RouterOS API
API-SSL
```

langsung ke internet tanpa pembatasan akses.

Jika nantinya RouterOS API digunakan oleh Laravel, simpan credential pada environment configuration dan jangan memasukkannya ke repository publik.

Ketika membuat screenshot untuk dokumentasi, periksa apakah gambar memperlihatkan:

```text
password
API token
credential production
public IP sensitif
data pelanggan
```

Informasi seperti itu sebaiknya disensor sebelum dipublikasikan.

---

# Kesimpulan

Pada eksperimen ini kita berhasil membuat **PPPoE Server menggunakan MikroTik CHR di VirtualBox**.

Konfigurasi yang berhasil dibuat:

```text
✓ MikroTik CHR Server
✓ IP Management
✓ IP Pool PPPoE
✓ PPP Profile
✓ PPPoE Server
✓ PPP Secret
✓ PPPoE Client berhasil autentikasi
✓ testclient muncul pada PPP Active
```

Yang paling penting, eksperimen tidak berhenti pada konfigurasi.

Kita sudah melakukan pengujian:

```text
CHR Server
     │
     │ PPPoE
     ▼
CHR Client
     │
     │ testclient
     ▼
CONNECTED
     │
     ▼
/ppp active
     │
     └── testclient
```

Artinya pondasi jaringan untuk eksperimen berikutnya sudah tersedia.

---

# Artikel Selanjutnya

Pada **Part 2** kita akan membahas:

## Cara Membuat PPPoE Client MikroTik CHR di VirtualBox untuk Simulasi Pelanggan

Di sana kita akan membahas secara detail bagaimana CHR kedua dikonfigurasi hingga mempunyai:

```text
pppoe-out1
      │
      ├── service
      ├── username
      ├── password
      └── status connected
```

Kemudian setelah sisi server dan client selesai, pada **Part 3** kita mulai masuk ke development:

```text
Laravel
   │
   ▼
RouterOS API
   │
   ▼
MikroTik CHR Server
```

Targetnya adalah membuat aplikasi Laravel dapat berkomunikasi langsung dengan MikroTik.

Setelah itu barulah kita masuk ke provisioning PPPoE dan monitoring pelanggan online/offline.

Sampai jumpa di catatan CodeSyariah berikutnya.