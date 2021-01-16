---
layout: post
title:  "Solved Error Install laravel/ui"
author: puji
categories: [ PHP, Laravel, MVC, OOP ]
image: assets/images/post/larvel-ui-vue.jpg
tags: [webdevelopment]
opening: بسم الله الرحمن الرحيم
---  
{{page.opening}}  

Hallo bro ... artikel kali bertema tentang framework laravel, ini hanya sedikit pengalaman gout dalam melakukan pengembangan aplikasi web dengan framework laravel dengan Environment developmentnya menggunakan **laradock**.  
Dalam proses development kali ini gout menjumpai sebuah masalah yang lumayan sedikit mengganggu, mungkin untuk yang baru pertama kali menggunakan laravel dan Vue sebagai frontendnya.

### Install Laravel/ui  
Problemnya dimulai disini saat menjalankan installasi  
```bash	
root@04f8fe1a3732:/var/www/projectku# composer require laravel/ui
```  
Kemudian muncul Error notice seperti ini :  

```bash
    Problem 1- laravel/ui[v3.2.0, ..., 3.x-dev] require illuminate/console ^8.0 -> found illuminate/console[v8.0.0, ..., 8.x-dev] but these were not loaded, likely because it conflicts with another require.- Root composer.json requires laravel/ui ^3.2 -> satisfiable by laravel/ui[v3.2.0, 3.x-dev].Installation failed, reverting ./composer.json and ./composer.lock to their original content.
```  
Dari notice diatas mungkin kalian bisa mulai menerka dimana permasalahannya.  
Ya sepertinya permasalahannya berada pada veri yang belum terupdate berhubung dalam project laravel ini gout menggunakan laravel-6.0, mungkin di laravel yang terupdate tidak akan mengalami masalah seperti ini.  

setelah mencari-cari di google, akhirnya gout menemukan jalan keluar untuk memecahkan permasalahan ini :  

- Update Composer & clear cache  
```bash
root@04f8fe1a3732:/var/www/projectku# composer update 
root@04f8fe1a3732:/var/www/projectku# composer clearcache
root@04f8fe1a3732:/var/www/projectku# composer selfupdate
root@04f8fe1a3732:/var/www/projectku# composer dumpautoload
```  
kemudian ulangi installasi laravel/ui :  

```bash
root@04f8fe1a3732:/var/www/projectku# composer require laravel/ui
```  

Jika masih menemukan Error seperti diatas, coba turunkan versi untuk laravel/ui seperti berikut :  

```bash
root@04f8fe1a3732:/var/www/projectku# composer require laravel/ui "^1.0"
```  
Mudah-mudahan solved yah, jika masih error juga, terpaksa upgrade laravelnya. hehehe

ok sekian dulu dari saya untuk artikel kali ini, nanti kita lanjutkan lagi artikel mengenai laravel di artikel selanjutnya.... see the next articles 

bye :) 


***Salam***

**Puji Ermanto**