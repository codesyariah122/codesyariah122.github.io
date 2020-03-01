---
layout: post
title:  "sorry that didn't work login root debian 9 gnome"
author: puji
categories: [ linux, server ]
image: assets/images/post/debian9/IMG_20200201_005454.jpg
tags: [sysadmin]
opening: بسم الله الرحمن الرحيم
---  
![gnome-login]({{ site.url }}/assets/images/post/debian9/IMG_20200201_005436.jpg)  

permasalahan login menggunakan user root di debian 9 stretch, ini adalah masalah autentikasi login di gdm-password, gdm adalah gnome display manager  
karena disini saya menggunakan lingkungan desktop gnome. dan permasalahan nya terdapat pada configurasi gdm-password, yang terletak di direktori  
```
/etc/pam.d/
```  
![gdm-password]({{ site.url }}/assets/images/post/sublime/gdm-password.png)  
dari script yang saya highlight itulah masalah ini terjadi, sehingga saya tidak bisa login menggunakan user root. dimana user ini merupakan user dengan  
tingkat level paling atas. dan untuk mengatasi ini saya coba uncomment (#) script yang saya highlight di gambar di file ``` /etc/pam.d/gdm-password```  
![gdm-password]({{ site.url }}/assets/images/post/sublime/gdm-password_2.png)  

```
#auth   required        pam_succeed_if.so user != root quiet_success
```  
setelah itu saya coba kembali untuk login dengan user root dan akhirnya bisa ....
oke fix trouble kali ini .
salam...
pujiermanto



