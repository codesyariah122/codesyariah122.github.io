---
layout: post
title:  "Error #1698 Access denied for user 'root'@'localhost di phpMyAdmin"
author: puji
categories: [ linux, server ]
image: assets/images/post/nginx/err.png
tags: [sysadmin]
opening: بسم الله الرحمن الرحيم
---
Assalamualaikum wr. wb

Pada kesempatan kali ini saya akan berbagi tentang bagaimana cara mengatasi error pada phpMyAdmin  

Pada saat saya akan login ke phpMyAdmin saya menemukan error seperti berikut :  
![err_phpmyadmin]({{ site.url }}/assets/images/post/nginx/err.png)  
Pertama bukalah terminal dan masuk sebagai user root

Kemudian,ketikkan ```mysql -u root``` lalu tekan enter  
![err_phpmyadmin]({{ site.url }}/assets/images/post/nginx/1.png)  
Apabila sudah masuk ke dalam servis mariadb,ketik ```use mysql``` dan tekan enter untuk melanjutkan  
![err_phpmyadmin]({{ site.url }}/assets/images/post/nginx/2.png)  
Kita perbaiki dengan menggunakan perintah seperti ini   
```update user set plugin=''where User='root';```  
dan tekan enter  
![err_phpmyadmin]({{ site.url }}/assets/images/post/nginx/3.png)  
Selanjutnya,keikkan ```flush privileges;``` dan tekan enter  
![err_phpmyadmin]({{ site.url }}/assets/images/post/nginx/4.png)  
Bila sudah dikonfigurasi,ketikkan ```exit``` untuk keluar  
![err_phpmyadmin]({{ site.url }}/assets/images/post/nginx/5.png)  
Sekarang,masuk ke phpMyAdmin dan isikan username dan password lalu log in maka telah berhasil  
![err_phpmyadmin]({{ site.url }}/assets/images/post/nginx/6.png)  

<fieldset><legend>Kesimpulan</legend>
<blockquote>
masalah diatas berhubungan dengan hak akses user untuk mengakses database server kita. 
</blockquote>
</fieldset>
