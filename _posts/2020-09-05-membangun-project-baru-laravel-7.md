---
layout: post
title:  "Membangun project baru laravel 7"
author: puji
categories: [ PHP, Laravel, MVC, OOP ]
image: assets/images/post/laravel7_0.jpg
tags: [webdevelopment]
opening: بسم الله الرحمن الرحيم
---
![laravel1]({{site.url}}/assets/images/post/laravel.webp)  

Halo coders semua, apa kabarnya ? **Semoga Pada Sehat Semuanya**.  
dalam artikel kali ini gout mau membahas mengenai laravel, installasi laravel dan membangun project dengan laravel. ok kita langsung ajah memulai untuk menginstall laravel dalam pembahasan berikut :  

#### Install laravel  
untuk installasi laravel sendiri masih sama dengan versi laravel sebelumnya, di versi 7 ini pun masih menggunakan composer sebagai package manager untuk menginstall laravel di project kita.  
jika belum ada composer silahkan ikuti cara install composer di artikel berikut ini :
<a href="http://localhost:4000/php/composer/install-composer-on-debian9-stretch/">Install Composer</a> di artikel tersebut gout menjalankan installasi composer di pc linux debian, mungkin step nya sama juga untuk distro yang lain. setelah menginstall composer kita bisa langsung melakukan proses installasi laravel.  

**buka terminal :**  
oh iya sebelumnya, gout mau ngasih sedikit info, untuk prosess installasi sendiri kita tidak harus menginstallnya di htdoc dalam artikel kali ini gout menginstall laravel di direktori home distro debian gout. yaitu di direktori ```/home/puji122/```,  direktori project laravel gout :  
![laravel2]({{site.url}}/assets/images/post/laravel.webp)

```
# jika kalian ingin menginstall laravel secara global
cd /home/puji122/

# kemudian buat direktori untuk project laravel, gout membuat direktori project laravel ini dengan nama (project)
# kemudian akses direktori project yang baru kita buat, jadi seperti ini direktori project laravel gout. dibawah ini direktori aktif dari project yang akan gout install laravel di dalamnya

root@codesyariah:/home/puji122/project#

# lanjut installasi di direktori aktif tersebut
root@codesyariah:/home/puji122/project# composer global require laravel/installer

# setelah installasi selesai, jika kalian menginstall secara global kalian bisa langsung membuat project laravel baru
root@codesyariah:/home/puji122/project# laravel new projectku

# jika terdapat error : laravel command not found, lakukan step berikut
root@codesyariah:/home/puji122/project# export PATH="~/.config/composer/vendor/bin:$PATH"
root@codesyariah:/home/puji122/project# source ~/.bashrc

# kemudian ulangi step sebelumnya
root@codesyariah:/home/puji122/project# laravel new projectku

```  
Jika kalian tidak menginstall laravel secara global, kalian bisa menginstall laravel langsung dari repository laravel menggunakan command berikut :  
```
composer create-project --prefer-dist laravel/laravel projectku
```  
setelah proses pembuatan project laravel selesai, kalian bisa langsung akses direktori ```projectku/```, kemudian buka di code editor kesayangan kalian. selanjutnya kita akses ```projectku/``` di terminal. untuk menjalankan server project laravel kita. menggunakan ```php artisan```. jadi ```php artisan``` adalah command line bawaan dari laravel, untuk melakukan instruksi ke project laravel kita. dalam artikel ini gout mau menjalankan ```local server``` bawaan nya dari laravel, dan php artisan ini memudahkan kita dalam mendevelope sebuah project dengan laravel. 

```
# buka terminal, akses direktori project laravel kita kemudian kita jalankan local server dengan command berikut
root@codesyariah:/home/puji122/project/projectku# php artisan serve
```  
![laravel2]({{site.url}}/assets/images/post/laravel_3.png)  

kemudian kita buka di browser  
![laravel2]({{site.url}}/assets/images/post/laravel_4.png)  

project laravel kita sudah berjalan di local server dan secara default ``` php artisan serve``` ini menggunakan port 8000, kita bisa menjalankannya di port yang lain, sesuai yang kita inginkan. misalnya disini :  
```
# pertama kita bisa check list port yang tersedia di system kita dengan perintah berikut 
root@codesyariah:/home/puji122/project/projectku# netstat
```  
![laravel2]({{site.url}}/assets/images/post/laravel_5.png)  

kemudian kalian bisa menjalankan kembali dengan menambahkan config ```--port=""```  

```
# dari hasil netstat diatas tadi sepertinya gout akan menggunakan port 10000 untuk menjalankan local server laravel ini
root@codesyariah:/home/puji122/project/projectku# php artisan serve --port=10000
```  
![laravel2]({{site.url}}/assets/images/post/laravel_6.png)  

buka kembali browser dan ubah akses port ke port yang tadi kita tambahkan.  
![laravel2]({{site.url}}/assets/images/post/laravel_7.png)  

#### Sekedar Info  
sebetulnya di dalam php itu sendiri sudah tersedia package untuk menjalankan local server dan hampir sama fungsinya dengan ```php artisan serve```, yah memang laravel itu kan ```php```. di php sendiri kita bisa menggunakan local server dengan menjalankan command berikut

```
root@codesyariah:/home/puji122/system_polling# php -S localhost:10000
```  
![laravel2]({{site.url}}/assets/images/post/laravel_8.png)  
dan sekarang ```http://localhost:10000``` sudah tidak lagi dengan laravel jika kita buka di browser maka.  

![laravel2]({{site.url}}/assets/images/post/laravel_9.png)  

karena tadi gout mengaktifkan local server php di direktori project yang lain yaitu direktori : ```/home/puji122/system_polling#```.  

***sehingga !*** dengan begitu kita tidak perlu lagi menyimpan project kita di htdoc bawaan web server kita, karena ```PHP``` sudah menyediakan package localserver.  

***Selanjutnya :*** gout mungkin akan membahas beberapa konfigurasi, routing dan blade templating di laravel, tapi di artikel selanjutnya yah ! heheheh

ok sekian dulu dari saya.


***Salam***

**Puji Ermanto**