---
layout: post
title:  "Install Driver iwlwifi di debian 9 stretch"
author: puji
categories: [ linux, server, debian ]
image: assets/images/post/debian9/install-driver-wifi-debian-thinkpad-iwlwifi-linux.jpg
tags: [sysadmin]
opening: بسم الله الرحمن الرحيم
---
![iwlwifi_missing]({{ site.url }}assets/images/post/debian9/iwlwifi.jpeg)  

Notification diatas saya dapatkan di os debian 9 saya ketika awal penginstallan, biasanya hal ini terjadi akibat kita tidak menyertakanannya dalam media bootable  
saat proses penginstallan debian 9 server ini saya menggunakan media USB Bootable sebagai media installasinya.  
setelah proses installasi selesai kita harus menyambungkan device kita ke internet satu-satunya cara melalui media LAN, yah mau gimana lagi harus siap sedia kabel LAN.  
setelah login ke os kita, langsung saja eksekusi command dibawah ini :  
masuk terlebih dahulu ke direktori repository debian 9 di ```/etc/apt/```
{%highlight shell%}
root@debian: cd /etc/apt
root@debian: echo 'deb http://httpredir.debian.org/debian/ stretch main contrib non-free' >> /etc/apt/sources.list
root@debian: apt update && apt install firmware-iwlwifi
root@debian: modprobe -r iwlwifi ; modprobe iwlwifi
root@debian: reboot
{%endhightlight%}
