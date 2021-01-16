---
layout: post
title:  "Error Phpmyadmin Warning in ./libraries/sql.lib.php#613 count(): Parameter must be an array or an object that implements Countable"
author: puji
categories: [ mysql-server, phpmyadmin ]
image: assets/images/post/phpmyadmin/a.png
tags: [webdevelopment]
opening: بسم الله الرحمن الرحيم
---  
![phpmyadmin]({{ site.url }}/assets/images/post/phpmyadmin/b.png)  

Halo coders ! .... bertemu lagi dengan tulisan saya.  
kali ini seperti biasanya saya akan berbagi tentang troubleshooting di server saya.  
lagi-lagi masalah, sepertinya masalah tidak pernah bisa lepas dari para pengguna linux.  
ok! cukup curhat nya.  

kali ini permasalahan saya terdapat pada phpmyadmin, error yang kudapati seperti ini adanya  
![phpmyadmin]({{ site.url }}/assets/images/post/phpmyadmin/b.png)  
setiap kali saya melakukan query ke database mariaDB selalu muncul notif itu ketika mengakses front end dari mariaDB yaitu phpmyadmin.  

sontak saya pun kebingungan dibuatnya alhasil saya mencoba untuk mencari akar dari permasalahan ini, karena membuat malam saya terganggu, dipenuhi racun kegelisahan.  

![phpmyadmin]({{ site.url }}/assets/images/post/phpmyadmin/b.png)  


ok sobat coders, trick nya cukup simple saja. pertama saya buka file configurasi sql library yang berada di direktori berikut.  

```/usr/share/phpmyadmin/libraries/sql.lib.php``` ok sekarang kita buka dengan code editor andalan kita, apapun itu saya sederhana saja hanya menggunakan nano editor. ok langsung kita mulai.  

```bash 
nano /usr/share/phpmyadmin/libraries/sql.lib.php
```  

 kemudian cari code berikut
 yang terdapat pada line 613

**(count($analyzed_sql_results['select_expr'] == 1)**  

kemudian ubah menjadi seperti ini :  

```php
 <?php 


 ((count($analyzed_sql_results['select_expr']) == 1)
 
 ```

simple kan hanya sedikit penambahan tanda kurung diawal dan menutupnya sebelum value kondisi programnya. kemudian kita restart webserver nya. 
kali ini saya menggunakan apache2 , back to basic, malas untuk konfigurasi macem-macem karena kondisi dompet sedang menipis. hehehe biasa tengah bulan

```bash
systemctl restart apache2.service
```  

setelah itu coba aksesk kembali phpmyadmin di browser. mudah-mudahan bisa yah.

