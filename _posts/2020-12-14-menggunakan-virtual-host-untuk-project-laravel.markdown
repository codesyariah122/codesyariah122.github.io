---
layout: post
title:  "Membuat virtual host dalam pengembangan project laravel"
author: puji
categories: [ PHP, Laravel ]
image: assets/images/post/nginx.jpeg
tags: [fullstack_developer, BeckEnd]
opening: بسم الله الرحمن الرحيم
---  

![laradock]({{site.url}}/assets/images/post/laravel-nginx.webp)  

### Setup lingkungan kerja project laravel  
Melanjutkan dari artikel sebelumnya masih membahas mengenai, lingkungan kerja dalam pengembangan project aplikasi menggunakan laravel.  
diartikel kali ini gout akan sedikit menjelaskan mengenai seting virtualhost **nginx** di laradock yang sebelumnya telah kita jalankan 

```
$ docker-compose up -d nginx mysql phpmyadmin redis workspace
```  
1. Setting hosts ( pengguna linux )  
langsung aja ketahap pertama yaitu setting host di mesin linux  
```
$ nano /etc/hosts/
```
Lalu tambahkan virtual domain yang akan kita pakai, misalnya untuk project aplikasi-laravelku yang sebelumnya telah gout persiapkan di artikel sebelumnya, kemudian kita akan assign domain **aplikasi-laravelku.test** maka tambahkan kode ini  
```
127.0.0.1 aplikasi-laravelku.test
```  

2. Buat file konfigurasi nginx baru
    1. Masuk folder laradock/nginx/sites
    2. copy laravel.conf.example menjadi aplikasi-laravelku.conf  

```
cp laravel.conf.example aplikasi-laravelku.conf
```  
3. Edit file aplikasi-laravelku.conf tersebut
    Ubah kode ini  
```
server_name laravel.test;
root /var/www/laravel/public;
```
***Menjadi***  
```
server_name aplikasi-laravelku.test;
root /var/www/aplikasi-laravelku/public;
```  
4. Restart laradock container kita
Masuk ke folder laradock lalu jalankan perintah ini  
```
$ docker-compose restart nginx
```  

Dengan begitu setelah ini kamu cukup mengakses di browser dengan alamat http://aplikasi-aravelku.test tidak perlu lagi menggunakan http://localhost/aplikasi-laravelku/public.  


> Ketika membuat virtual domain, sebaiknya gunakan akhiran ```.test```. Hindari penggunaan ```.dev``` karena
sudah tidak didukung.

## Varible Lingkungan  
Umumnya kita memerluan konfigurasi berbeda pada tahap pengembangan aplikasi dengan pada tahap
produksi. Misalnya kita menggunakan driver cache yang berbeda antara server lokal dengan server produksi.
Untuk memudahkan pengelolaan konfigurasi lingkungan, Laravel memanfaatkan DotEnv, sebuah pustaka
PHP karya Vance Lucas. Pada saat pertama kali kita membuat proyek Laravel baru, di direktori root aplikasi
kita terdapat file .env.example. Jika kita menginstall menggunakan composer, file ini otomatis diubah nama
menjadi .env. Jika belum, kita harus mengubah namanya secara manual. .... Bersambung!

***Wassallaam***
