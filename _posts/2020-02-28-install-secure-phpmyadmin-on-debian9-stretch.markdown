---
layout: post
title:  "install secure phpmyadmin on debian9 stretch"
author: puji
categories: [ linux, server ]
image: assets/images/post/phpmyadmin/login.png
tags: [sysadmin]
opening: بسم الله الرحمن الرحيم
---  

![err_phpmyadmin]({{ site.url }}/assets/images/post/phpmyadmin/Screenshot from 2020-02-28 07-00-00.png)  
__Step 1 — Installing phpMyAdmin__  

pertama-tama kita update distro linux kita dilanjutkan langsung install phpmyadmin nya  
  
```
apt update && apt upgrade -y  
apt install phpmyadmin  
```  
Selama proses instalasi, Anda akan diminta untuk memilih server web (baik Apache atau Lighthttp) untuk dikonfigurasi.  
karena kami menggunakan Nginx sebagai server web, kami tidak boleh membuat pilihan di sini. Tekan tab lalu OK untuk melanjutkan ke langkah berikutnya.  
selanjutnya, Anda akan diminta untuk menggunakan dbconfig-common untuk mengonfigurasi basis data aplikasi.  
Pilih (Yes/Y) untuk mengatur basis data internal dan pengguna administratif untuk phpMyAdmin. Anda akan diminta menentukan kata sandi baru untuk pengguna MySQL phpmyadmin.   
Anda juga dapat membiarkannya kosong dan membiarkan phpMyAdmin membuat kata sandi secara acak. dan Instalasi phpmyadmin pun selesai.  
Agar web server Nginx kita menemukan direktori web file phpMyAdmin dengan benar, kita perlu membuat tautan simbolis dari file instalasi ke direktori root dokumen Nginx:  

```  
ln -s /usr/share/phpmyadmin /var/www/html/phpmyadmin
```  
Instalasi phpMyAdmin Anda telah selesan dan bisa diakses. Untuk mengakses antarmuka, buka nama domain server Anda atau alamat IP diikuti oleh (http://localhost/phpmyadmin)  
di browser web Anda:  
![err_phpmyadmin]({{ site.url }}/assets/images/post/phpmyadmin/login.png)  

**Step 2 — Menentukan lokasi direktori phpmyadmin**  

Salah satu cara paling mendasar untuk melindungi instalasi phpMyAdmin Anda adalah dengan membuatnya lebih sulit ditemukan.  
Bot akan memindai jalur umum, seperti phpmyadmin, pma, admin, mysql dan semacamnya. Mengubah URL antarmuka dari / phpmyadmin menjadi sesuatu yang tidak standar akan mempersulit  
skrip otomatis untuk menemukan instalasi phpMyAdmin Anda dan mencoba serangan brute-force.  
Dari proses installasi kita tadi, kita telah membuat tautan simbolis untuk root direktori phpmyadmin kita dari /usr/share/phpmyadmin, direktori root default dari phpmyadmin.  
Untuk mengubah URL phpMyAdmin kita, kita akan mengganti nama tautan simbolis sebelumnya.  
```
cd /var/www/html/
ls -l

Output
total 8
-rw-r--r-- 1 root root 612 Apr  8 13:30 index.nginx-debian.html
lrwxrwxrwx 1 root root  21 Apr  8 15:36 phpmyadmin -> /usr/share/phpmyadmin
```  

Outputnya menunjukkan bahwa kita memiliki tautan simbolik yang disebut phpmyadmin dalam direktori ini.  
Kita dapat mengubah nama tautan ini menjadi apa pun yang kita suka.  
Ini untuk mengubah URL akses phpMyAdmin kita, yang dapat membantu mengaburkan titik akhir dari root dikodekan untuk mencari nama titik akhir yang umum.  
Pertama, mari kita bernavigasi ke direktori root dokumen Nginx dan lihat daftar file yang ada didalamnya untuk memahami perubahan yang akan kita buat:  

```
cd /var/www/html
mv phpmyadmin nothingtosee
ls -l

output  
total 28
drwxr-xr-x 4 root     root     4096 Feb 24 17:04 belajar_php
drwxr-xr-x 3 root     root     4096 Feb 26 13:30 CodeIgniter
-rw-r--r-- 1 www-data www-data  612 Feb 24 08:07 index.nginx-debian.html
-rw-r--r-- 1 www-data www-data   19 Feb 24 08:17 info.php
drwxr-xr-x 5 root     root     4096 Feb 24 13:13 myweb
drwxr-xr-x 7 root     root     4096 Feb 27 02:29 new_ourcitrus
lrwxrwxrwx 1 www-data www-data   21 Feb 24 08:26 nothingtosee -> /usr/share/phpmyadmin
drwxr-xr-x 6 www-data www-data 4096 Feb 26 10:35 ourcitrus
```  
Sekarang, jika Anda membuka URL lama, Anda akan mendapatkan kesalahan 404  
![err_phpmyadmin]({{ site.url }}/assets/images/post/phpmyadmin/nginx_notfound.png)  
Antarmuka phpMyAdmin Anda sekarang akan tersedia di URL baru yang baru saja kita konfigurasikan tadi:  
<font color="red">http://server_domain_or_IP/nothingtosee</font>  
![err_phpmyadmin]({{ site.url }}/assets/images/post/phpmyadmin/login.png)  

Dengan mengaburkan lokasi asli phpMyAdmin di server, Anda telah mengamankan antarmuka terhadap pemindaian otomatis dan upaya brute-force manual.  
