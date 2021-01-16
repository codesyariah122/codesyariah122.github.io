---
layout: post
title:  "Warning Message: Module already loaded"
author: puji
categories: [ php, codeigniter ]
image: assets/images/post/error_php_codeigniter.png
tags: [webdeveloper]
opening: بسم الله الرحمن الرحيم
---  


### Warning Message: Module already loaded  
![error_php_codeigniter]({{site.url}}/assets/images/post/error_php_codeigniter.gif)  

Ketika mengembangkan sebuah aplikasi menggunakan CodeIgniter pada localhost, peringatan error atau warning tidak akan muncul jika kita telah menulis kode dengan benar.

Namun biasanya ketika kita upload pada hosting muncul sebuah pesan warning seperti ini:  

```bash
A PHP Error was encountered
Severity: Core Warning
Message: Module 'pdo_mysql' already loaded 
Filename: Unknown 
Line Number: 0 
Backtrace:  
```  
Pesan di atas menginformasikan bahwa kita mencoba meload sebuah modul yang sudah termuat sebelumnya atau ada modul yang belum tersedia namun coba dimuat.

Atau bisa juga muncul karena terdapat perbedaan modul pada localhost dan hosting. Alhasil, muncullah peringatan warning tersebut.

Munculnya pesan tersebut tidak berarti aplikasi kita error, akan tetapi membuat aplikasi kita "terlihat error" dan tidak profesional.

Untuk menyembunyikan peringatan tersebut, kita harus mengubah environment aplikasi yang sedang kita kembangkan. Berikut tata caranya:  

- Silahkan edit file index.php di direktori root codeigniter
- kemudian cari kode berikut :  

```  php
define('ENVIRONMENT', isset($_SERVER['CI_ENV']) ? $_SERVER['CI_ENV'] : 'development');
```  
- kemudian ganti menjadi seperti ini : 
```php
define('ENVIRONMENT', isset($_SERVER['CI_ENV']) ? $_SERVER['CI_ENV'] : 'production');
```  
- simpan dan refresh halaman web  

Dengan cara di atas maka pesan warning module already loaded akan hilang.  

Development environment CodeIgniter ada 3, diantaranya:  

1. ```development``` merupakan konfigurasi default environment CodeIgniter dalam tahap pengembangan. Pada tahap ini apabila terjadi error atau warning akan tampil pada browser.  
2. ```testing``` merupakan konfigurasi pada tahap pengujian aplikasi. Error atau warning pada tahap ini tidak akan tampil.  
3. ```production``` merupakan konfigurasi pada aplikasi yang siap untuk digunakan oleh end user. Pada tahap produksi error atau warning tidak akan tampil.  
