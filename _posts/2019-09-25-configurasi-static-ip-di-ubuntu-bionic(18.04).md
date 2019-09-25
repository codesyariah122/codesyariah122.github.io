---
layout: post
title:  "Configurasi Static IP Ubuntu Bionic(18.04)"
author: puji
categories: [ Technologies, Server  ]
image: assets/images/post/bionic/bionic.jpg
tags: [ServerAdministrator]
opening: بسم الله الرحمن الرحيم
---
konfigurasi static ip ubuntu server Bionic(18.04)  kini sudah berbeda dibandingkan dengan Ubuntu Server 16.04 ke bawah.  
Versi Ubuntu sebelumnya, konfigurasi dilakukan dengan memodifikasi file /etc/network/interfaces.  
Di Ubuntu 18.04 file konfigurasi IP address di direktori /etc/netplan/ secara default file konfigurasi ubuntu server saya adalah 01-netcfg.yaml coba teman-teman list dengan perintah ls di ubuntu kalian.  
![untitled1]({{ site.url }}/assets/images/post/bionic/Untitled1.jpg)  
ls  
![untitled2]({{ site.url }}/assets/images/post/bionic/Untitled2.jpg)  
kemudian teman-teman buka file 01-netcfg.yaml dengan editor favorit kalian, secara default sudah ada konfigurasinya seperti ini  
![untitled3]({{ site.url }}/assets/images/post/bionic/Untitled3.jpg)  
kemudian teman teman insert dengan menggunakan keywoard **(i)** karena disini saya menggunakan editor *(vi)* lalu set konfigurasi default tadi sesuai jaringan di local network teman-teman  
![untitled4]({{ site.url }}/assets/images/post/bionic/Untitled4.jpg)  
![untitled5]({{ site.url }}/assets/images/post/bionic/Untitled5.jpg)  

**Keterangan:**

    - enp0s3: nama network interface, cara mengecek namanya pakai perintah ip addr.
    - addresses: IP address yang diberikan dengan subnet /24 (255.255.255.0).
    - nameservers – addresess: IP address untuk dns resolver, di sini memakai DNS dari Google.
    - dhcp4: diisi dengan no jika tidak memakai DHCP. Jika memakai DHCP, semua IP address tidak usah dimasukkan.

kemudian keluar editor dan save Mengaktifkan konfigurasi IP address yang baru saja dibuat dengan mengetikan perintah **netplan apply**.  sesuaikan dengan network card dan jaringan lokal teman-teman.  
![untitled8]({{ site.url }}/assets/images/post/bionic/Untitled8.jpg)  
![untitled6]({{ site.url }}/assets/images/post/bionic/Untitled6.jpg)  
aktifkan opsi debug dengan perintah **netplan --debug apply**  
![untitled7]({{ site.url }}/assets/images/post/bionic/Untitled7.jpg)  

