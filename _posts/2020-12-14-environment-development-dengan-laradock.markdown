---
layout: post
title:  "Environment Development Laravel With Laradock"
author: puji
categories: [ PHP, Laravel, Composer, Git, Docker ]
image: assets/images/post/laradock.jpg
tags: [fullstack_developer, BeckEnd]
opening: بسم الله الرحمن الرحيم
---  

![laradock]({{site.url}}/assets/images/post/laradock2.png)  

### Lingkungan development dengan Laradock  
Sekarang ini sudah semakin mudah para developer dalam membangun aplikasi nya, berbagai macam tools yang semakin memudahkan para developer dalam berkarya dan bekerja. salah satunya adalah yang akan kita bahas di artikel kali ini yaitu **Laradock** Sepertinya bagi kalangan developer sudah tidak terdengar asing yah, seperti gabungan dari kata **laravel** dan **docker**. 
kali ini gout akan mencoba mengembangkan aplikasi dalam lingkungan kerja **laradock** ini, apa saja syaratnya (bagi pengguna linux): 
1. sudah terinstall composer
2. sudah terinstall git  
diasumsikan kalian pun sudah menginstall kedua tools andalan diatas. sehingga selanjutnya gout akan melanjutkan membahas mengenai proses install dockernya.  

### Instalasi Docker  
Docker memiliki dua versi yaitu Community Edition (CE) dan Enterprise Edition (EE). Kita akan menggunakan
versi Community Edition.
- Untuk Mac https://store.docker.com/editions/community/docker-ce-desktop-mac  
- Untuk Ubuntu https://store.docker.com/editions/community/docker-ce-server-ubuntu  
- Petunjuk detail instalasi di ubuntu https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-using-the-repository  
- Untuk OS lainnya silahkan lihat langsung di https://www.docker.com/community-edition.  

#### Install Docker Compose  
karena disini kita sebagai pengguna linux maka diperlukan untuk menginstall tools yang satu ini yaitu **Docker Compose**  
```
$ curl -L https://github.com/docker/compose/releases/download/1.21.2/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
```  
<blockquote>
Gunakan versi terbaru, contoh di atas menggunakan versi 1.21.2, kamu juga boleh mengecek versi
terbaru yang tersedia di link ini https://github.com/docker/compose/releases
</blockquote>  

Selanjutnya buat permision untuk mengijinkan docker-compose tadi menjadi executable  
```
$ chmod +x /usr/local/bin/docker-compose
```  
cek apakah installasi docker-compose sudah berhasil  
```
$ docker-compose --version
```
```
$ docker-compose version 1.21.2, build 1719ceb
```  

#### Menyiapkan lingkungan kerja Laradock  
Nah karena sekarang Docker dan Git sudah terinstal di sistem kita, selanjutnya kita siap menggunakan
Laradock.  
Oke langsung saja kita eksekusi, seperti biasa buka dulu senjata andalan kita yaitu terminal (CMD) atau (Command Prompt) heheheh.  
buat direktori baru dengan nama **laravel-projects**  

```
$ mkdir -p laravel-projects
```  
direktori ini akan kita gunakan untuk menaruh setiap project yang akan kita bangun dalam lingkungan laradock ini terkhusus yang menggunakan framework laravel, karena fitur laradock ini lengkap, paket lengkap seperti lamp hanya saja dalam kerangka yang modern.  

***Lanjut ...***  
ok lanjut kita akses direktori yang tadi kita buat 
```
$ cd laravel-projects/
```
jika sudah ada di direktori project kita selanjutnya kita clone package laradock nya dari github  
```
$ git clone https://github.com/Laradock/laradock.git
```  
setelah proses ***cloning*** selesai akses direktori ***laradock***

```
$ chmod -R 755 laradock/.*
$ cd laradock/
```

ubah env-example menjadi .env
```
$ cp env-example .env
```  

Kemudian selanjutnya mengaktifkan container untuk laradock  

```
$ docker-compose up -d nginx mysql phpmyadmin redis workspace
```  
dan untuk selanjutnya setiap kali kita akan memulai development kita gunakan perintah diatas untuk mengaktifkan container laradock, Minimal kita perlu menyalakan service nginx, mysql, phpmyadmin dan redis karena kita akan memerlukan ke empat service tersebut.  

Lanjut buka file .env, lalu tambahkan kode berikut ini :  

```
DB_HOST=mysql
REDIS_HOST=redis
QUEUE_HOST=beanstalkd
```  

sampai disini proses instalasi laradock nampaknya sudah selesai, untuk mengeceknya kalian bisa buka di browser dengan mengetikan alamat di address bar ke http://localhost. 
laradockmu telah siap! Jika kamu melihat halaman 404 not found, jangan takut! Justru itu menandakan docker telah berhasil menjalankan web server nginx. Lanjutkan. Error 404 tersebut dikarenakan kita belum membuat project atau file apapun. 

Untuk membuka phpmyadmin, klik http://localhost:8080, masukan mysql sebagai host, root sebagai
username dan password.

#### Docker: Mengatasi Bug Pada MySQL
Terdapat bug terkait mysql versi 8.0, selengkapnya silakan baca pada tautan
berikut: https://github.com/laradock/laradock/issues/1392, maka sebaiknya kita downgrade versi dari mysql
yang sebelumnya latest menjadi versi 5.7. Untuk melakukannya, edit file .env.

```
file: .env
// ubah bagian ini
# MYSQL_VERSION=latest
MYSQL_VERSION=5.7
```  

Kemudian, masih pada file .env, ubah lokasi di mana data mysql disimpan, dari ~/.laradock/data
menjadi misalnya: ~/.laradock/data2.  

```
file: .env
// cari baris berikut
# DATA_PATH_HOST=~/.laradock/data
DATA_PATH_HOST=~/.laradock/data2
```  

Pada terminal folder laradock jalankan perintah 
``` docker-compose down```  

untuk memastikan semua
container tidak sedang berjalan.  

Lalu build ulang container mysql dengan menjalankan perintah berikut.

```
docker-compose build mysql
```  
Solusi yang lain adalah dengan menggunakan fitur upgrade dari mysql untuk mengatasi masalah ini.
Caranya, masuk ke container mysql 
```
$ docker exec -it mysql bash

mysql -u root -p
mysql> SET GLOBAL innodb_fast_shutdown = 1;
mysql_upgrade -u root -p
```

Dan silakan dicoba login lagi.

<blockquote>
Catatan: bagian ini tidak perlu kamu lakukan jika memang pada saat kamu instalasi laradock secara
normal kamu sudah bisa login ke phpmyadmin. Mungkin perlu saya koreksi, bahwa permasalahan ini
terjadi salah satunya karena perbedaan penggunaan plugin authentication password dimana pada
versi 5.7 ke bawah secara default mysql menggunakan mysql_native_password sedangkan pada versi
8.0 ke atas yang digunakan adalah caching_sha2_password
</blockquote>

## Membuat project Laravel Baru  
Dan sekarang kita masuk ke inti dari artikel ini, yaitu memulai project baru dengan laravel di dalam lingkungan kerja laradock.  
seperti biasa kita buka terminal terlebih dahulu atau jika menggunakan visual studio code bisa gunakan terminal di vscode.  

- Masuk ke folder(direktori) Laradock
```
$ cd laravel-project/laradock
```

- Lalu aktifkan mode workspace laradock  

```
$ docker-compose exec --user=laradock workspace bash
```  

setiap kita ingin membuat project pastikan kita ada didalam workspae laradock jika kita ingin menggunakan laradock sebagai environment development, seperti ini penampakan workspace laradock.

![laradock2]({{site.url}}/assets/images/post/laradock_ss.png)  

sampai disini sebetulnya kita sudah bisa mengembangkan aplikasi didalam laradock, berhubung di artikel ini gout mau membangun project dengan laravel maka gout akan sertakan juga proses installasi laravelnya.  

Buat Project Menggunakan Installer Laravel ~3
Laravel memanfaatkan Composer untuk mengelola dependency. Dan di bahasan sebelumnya kita telah
menginstall Composer dan tool lain yang kita butuhkan.
Download Laravel installer menggunakan composer, caranya ketik di terminal perintah berikut.  


```
$ composer global require "laravel/installer"
```  
Setelah berhasil menjankan perintah di atas, perintah laravel bisa kita gunakan. Untuk membuat aplikasi laravel baru dengan nama aplikasi-laravelku, jalankan perintah berikut di terminal.  

```
$ laravel new aplikasi-laravelku
```  

Setelah berhasil masuk ke direktori aplikasi yang baru saja kita install menggunakan terminal / cmder. Lalu ketik perintah berikut untuk menginstall dependency project kita: 

```
$ composer install
```  

Buat Project dengan Composer create-project ~3
Alternatif lain adalah dengan menggunakan perintah composer create-project di terminal, seperti berikut (ini adalah salah satu cara yang gout biasa pakai ):  


```
$ composer create-project laravel/laravel=6.* toko-online --prefer-dist
```  

Dan aplikasi laravel kita telah berhasil di install, kita bisa mengeceknya dengan mengakses localhost di browser kita.
http://localhost/aplikasi-laravelku/public  

Seharusnya kamu akan melihat homepage seperti ini 

![laradock2]({{site.url}}/assets/images/post/laradock_ss2.png) 

<blockquote>
Jika http://localhost/aplikasi-laravelku/public ternyata tetap 404 not found padahal kamu sudah buat project. exit dahulu dari **workspace** kemudian buka direktori berikut
Maka buka file **/laradock/nginx/sites/default.conf** dan pastikan agar root nya
bernilai /var/www; misalnya seperti ini:
</blockquote>  

```
root /var/www
```  
jangan lupa restart nginx nya :  

```
$ docker-compose stop nginx

$ docker-compose up -d nginx
```

***Wassallaam***
