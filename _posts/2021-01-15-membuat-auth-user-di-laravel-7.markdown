---
layout: post
title:  "Mudahnya membuat user authentication di laravel"
author: puji
categories: [ PHP, Laravel, MVC, OOP ]
image: assets/images/post/laravel-auth/laravel-vue-auth.png
tags: [webdevelopment]
opening: بسم الله الرحمن الرحيم
---  

{{page.opening}}  

![laravel-auth]({{site.url}}/assets/images/post/laravel-auth/laravel-auth.jpg)    

Halo brothers' masih tentang laravel, diartikel kali ini gout mau memberikan tips seputar membuat authentication user di laravel.  

Sebelumnya saya ingin mengucapkan kepada masyarakat di ```Sumedang - Jabar```,  ```Sulawesi Barat``` dan ```Kalimantan Selatan``` yang dilanda musibah fenomena alam, mudah-mudahan allah memberikan perlindungan dan keselamatan pada kita semua penduduk ```Indonesia```, semoga saudara saudara kita yang tertimpa musibah di daerah-daerah tersebut di berikan ketabahan, keselamatan dan kesabaran. Aamiin.  

Lanjut yuk ....  

Pertama saya akan sedikit jelaskan mengenai judul artikel ini.  

# User Authentication  
Authentication berasal dari kata authentic, yang berarti asli, original. Secara istilah maksudnya adalah proses
untuk memastikan keaslian atau kebenaran. Sehingga user authentication dapat diartikan sebagai proses
untuk memastikan keaslian atau kebenaran pengguna yang mengakses aplikasi. Sederhananya, proses ini
sering kamu jumpai dalam bentuk pengecekan menggunakan user dan password. Ini merupakan bentuk user
authentication yang lazim dipakai saat ini terutama untuk aplikasi berbasis web. Apapun caranya, tujuannya
adalah sama yaitu memastikan keaslian atau kebenaran pengguna yang mengakses aplikasi.
Dalam sebuah aplikasi, user authentication merupakan bagian yang harus selalu ada. Terlebih aplikasi yang
membutuhkan pembatasan akses terhadap fitur-fiturnya. user authentication juga merupakan syarat bisa
dilakukan otorisasi pengguna. Proses ini seringkali memakan waktu, padahal hal-hal ini seharusnya tidak
terlalu menyita waktu developer dalam membuat aplikasi. Bayangkan jika setiap membuat aplikasi baru kita
harus menghabiskan waktu dan energi untuk membuat sistem Authentication? Kabar baiknya, dengan
Laravel kamu tidak perlu menghabiskan banyak waktu hanya untuk mempersiapkan sistem user
authentication.
Dengan laravel, kamu cukup jalankan beberapa command dan aplikasi Laravelmu langsung siap untuk
melakukan user authentication, lengkap dengan registrasi, login, forgot password.  

### User Authentication di Laravel  
##### Scaffolding  

Di artikel ini gout akan membuat sebuah authentication user untuk project aplikasi laravel gout menggunakan fitur dari laravel. Langsung aja yah ...  

Pertama buka terminal :  

- Create project laravel  

```bash
root@37f6eac55aba:/var/www/larashop# composer create-project --prefer-dist laravel/laravel=7.0 larashop
```  

<div class="embed-responsive embed-responsive-21by9">
  <iframe class="embed-responsive-item" src="{{site.url}}/assets/images/post/laravel-auth/create.mp4"></iframe>
</div>  

Lanjut kita edit file ```.env``` di root directory project laravel kita :  

> jika kalian belum mendapatkan key untuk file environment nya jalankan perintah berikut di terminal :  

```bash
root@37f6eac55aba:/var/www/larashop# php artisan key:generate
```  

Ubah pada bagian database di file ```env``` :  

```
DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=larashop
DB_USERNAME=root
DB_PASSWORD=root
```  
- Install Laravel/UI  

Selanjutnya install package laravel/ui untuk view front end project laravel kita.  

>package Mulai Laravel versi 6.0, semua authentication assets dijadikan terpisah dari
core Laravel. Kita harus menginstallnya dengan perintah berikut:

```bash
root@37f6eac55aba:/var/www/larashop# composer require laravel/ui "^2.0"
```  
Sertakan dan sesuaikan versi nya gout menggunakan versi ```2.0```.  

<div class="embed-responsive embed-responsive-21by9">
  <iframe class="embed-responsive-item" src="{{site.url}}/assets/images/post/laravel-auth/install-laravel-ui.mp4"></iframe>
</div>  

- Buat Authentication Fitur / auth scaffold  

```bash
root@37f6eac55aba:/var/www/larashop# php artisan ui vue --auth
```  

- Compile file Assets / Javascript  

```bash
root@37f6eac55aba:/var/www/larashop# npm install && npm run dev
```  
Dengan menjalankan perintah-perintah di atas maka file-file yang diperlukan untuk Authentication termasuk
halaman login akan digenerate.  
Selanjutnya kalian bisa langsung menjalankan migration yang sudah disediakan default oleh laravel semenjak pertama kali install laravel. Migration ini untuk menampung data user : login, register dan forgot password, untuk proses authentication user di aplikasi laravel kita.  

> Apabila kamu menggunakan laradock, ikuti langkah-langkah berikut:  
1. buka file .env yang ada di folder laradock (bukan folder project laravel nya)
2. cari dan ubah nilai WORKSPACE_INSTALL_NODE menjadi true, lalu simpan file .env tersebut.
3. build ulang container workspace dengan perintah docker-compose build workspace  

- Jalankan migration  

Selanjutnya kita cukup jalankan perintah artisan migrate yang akan menjalaknkan dua file migrations
yang terkait dengan Authentication yaitu file yang berakhiran dengan nama create_users_table.php
dan create_password_resets_table.php. File ini sudah ada sejak pertama kali kita membuat project
Laravel baru.
Langsung saja kita jalankan migration yang akan mengeksekusi dua file tadi. Kembali buka terminal / cmd mu
lalu ketik :  

```bash
root@37f6eac55aba:/var/www/larashop# npm install && npm run dev
```  

<div class="embed-responsive embed-responsive-21by9">
  <iframe class="embed-responsive-item" src="{{site.url}}/assets/images/post/laravel-auth/create-auth.mp4"></iframe>
</div>  

Setelah selesai buat auth, compile javascript dan terakhir migration table user auth, coba kalian cek di database ```MariaDB``` kalian atau di ```phpmyadmin```, sudah terbentuk table baru hasil dari proses migration laravel. dan cek di browser kalian, coba akses link project aplikasi laravel kalian di : https://localhost/larasop.  

sudah terbentuk tampilan baru bukan, terdapat link ```login``` dan ```register``` untuk kebutuhan user authentication di aplikasi laravel kalian. Begitu mudahnya membangun aplikasi di laravel ini.  

#### Membuat halaman auth menjadi halaman awal  
Kita bisa mengubah halaman auth ini untuk menjadi halaman awal aplikasi laravel kita menggunakan fungsi route laravel, caranya seperti ini :  
buka file ```routes/web.php``` :  

```php
// Route::get('/', function () {
//     return view('welcome');
// });

Route::get('/', function(){
	return view('auth.login');
});
```  
Mengubah view welcome menjadi view auth.  

<div class="embed-responsive embed-responsive-21by9">
  <iframe class="embed-responsive-item" src="{{site.url}}/assets/images/post/laravel-auth/larashop-auth.mp4"></iframe>
</div>  

Aplikasi laravel gout dalam video diatas di akses melalui link http://larashop.com, karena sebelumnya gout sudah membuat virtual host untuk aplikasi laravel gout, mengenai pembuatan virtual host pernah gout bahas di artikel sebelumnya yaitu di link berikut :  
<a href="https://codesyariah122.github.io/menggunakan-virtual-host-untuk-project-laravel/" target="_blank">Virtualisasi Host di nginx/laradock</a>  

Gout cukupkan sampai disini artikel kali ini, dirasa semua sudah cukup step-stepnya, jika ada pertanyaan silahkan tinggalkan di kolom komentar yang tersedia di bawah.  

Mudah-mudahan bermanfaat dari artikel gout ini yah.

ok sekian dulu dari saya untuk artikel kali ini, nanti kita lanjutkan lagi artikel mengenai laravel di artikel selanjutnya.... see the next articles 

bye :) 


***Salam***

**Puji Ermanto**
