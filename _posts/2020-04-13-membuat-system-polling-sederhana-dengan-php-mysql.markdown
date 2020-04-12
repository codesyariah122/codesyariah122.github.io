---
layout: post
title:  "membuat system polling sederhana dengan PHP"
author: puji
categories: [ php, mysql ]
image: assets/images/post/tutor.jpg
tags: [webdev]
opening: بسم الله الرحمن الرحيم
---  
![polling_php]({{ site.url }}/assets/images/post/tutor.jpg)  

hai coders!...  
bagaimana keadaanya semua, ditengah **pandemi** yang sedang melanda ini,  
semoga kita semua selalu dalam lindungan allah, dan selalu di berikan nikmat sehat dan nikmat waktu luang untuk menjaga kesehatan.  

baiklah, kali ini saya mau iseng-iseng sedikit (.."iseng ko sedikit") ... lanjut.  
iseng-iseng saya kali ini adalah membuat system polling sederhana yang sangat simple dan sederhana dengan php dan database mysql.  

langsung ajah yuk , kita mulai coding ....
#pertama  
kita siapkan dulu database untuk menampung value pollingnya...  
masuk ke terminal atau cmd di windows, akses root ke aplikasi database nya disini saya menggunakan mysql
*terminal*
```
mysql -u root -p
#masukan password root login anda
#lanjut buat database

create database polling;
use polling;

create table polling ( id int(11) primary key auto_increment, framework varchar(100) not null, value int(11) yes null );
describe polling;
```
![polling_php]({{ site.url }}/assets/images/post/tutor_mysql.jpg)  
databse telah selesai dibuat, lanjut coding program nya yuk ah ....  







