---
layout: post
title:  "Upgrade Debian 8 Jessie ke Debian 9 stretch"
author: puji
categories: [ linux, server, debian ]
image: assets/images/post/debian9/Screenshot from 2020-02-24 19-20-15.png
tags: [webdevelopment]
opening: بسم الله الرحمن الرحيم
---
Sebelum melakukan proses upgrade ke Debian 9 Stretch, disarankan untuk memperbarui perangkat lunak Debian 8 Jessie sehingga dalam kondisi up to date (stable version). Buka terminal Debian lalu masuk sebagai root (ketik su lalu masukan password root).  
Setelah itu ketik perintah di bawah ini :  
{%highlight shell%}
apt update  
apt upgrade  
{%endhighlight%}  
Jika proses upgrade software sudah selesai, lanjutkan ke tahap selanjutnya.  
#Ubah Sumber Perangkat Lunak Dari Jessie ke Stretch  
Untuk dapat melakukan upgrade Debian, ubah sumber perangkat lunak dari Debian 8 Jessie ke Debian 9 Stretch. Sebelumnya kita dapat melakukan backup sumber perangkat lunak Debian 8 Jessie dengan melakukan copy & paste atau bisa juga melalui terminal dengan mengetikan perintah teks di bawah ini:  
```
 cp /etc/apt/sources.list /etc/apt/backupsources.list
```  
Selanjutnya ganti sumber perangkat lunak (repository) Debian 8 Jessie dengan Debian 9 Stretch. Cara ini bisa dilakukan secara manual menggunakan penyunting teks (gedit, pluma, leafpad atau yang lainnya) atau secara otomatis dengan mengetikan perintah teks di bawah ini di terminal Debian (masuk sebagai root) :  

```
 sed -i 's/jessie/stretch/g' /etc/apt/sources.list  
```  
Bila ingin menggati sumber perangkat lunak secara manual, silahkan ketik perintah teks di bawah ini di terminal Debian :  

```
 gksu gedit /etc/apt/sources.list
```  

#Update & Upgrade Dari Debian 8 Jessie Ke Debian 9 Stretch  
Gunakan perintah apt-get untuk melakukan update dan upgrade dari Debian 8 Jessie ke Debian 9 Stretch. Buka terminal Debian (masuk sebagai root) lalu ketik perintah teks di bawah ini :  
```
 apt-get update  
 apt-get upgrade
```  
Setelah itu, ketik perintah di bawah ini untuk memperbarui ke versi terbaru semua paket aplikasi yang terinstall di dalam sistem Linux Debian :  
```
apt-get dist-upgrade
```  
#Hapus Paket Aplikasi Yang Tidak Terpakai  
Setelah proses upgrade Debian 8 Jessie ke Debian 9 Stretch selesai, selanjutnya hapus paket aplikasi yang tidak terpakai di dalam sistem Linux Debian. Masih dalam terminal Debian, ketik perintah teks di bawah ini :  
```
apt-get autoremove
```  
#Reboot Komputer  
Setelah semua proses upgrade selesai, Reboot komputer dan setelah itu kita dapat melihat versi Linux Debian dengan mengetikan perintah teks di bawah ini :  
```  
lsb_release -a
uname -a
```  

Sekarang bandingkan hasil cek versi Linux Debian setelah di upgrade dengan sebelum di upgrade, tentu sudah berbeda dan sekarang sistem Linux Debian sudah berhasil diperbarui ke versi 9 Stretch.  

<fieldset><legend>Kesimpulan</legend>
  <blockquote>
    Sesuai dengan slogan Debian yaitu “Universal Operating System”, Debian memang merupakan distro Linux yang stabil dan bisa digunakan pada komputer desktop, laptop hingga server dan telepon. Upgrade sistem operasi diperlukan untuk mendapatkan fiture terbaru dari sistem operasi tersebut. Gunakan Debian stable version bila ingin mendapatkan sistem operasi komputer yang stabil, namun bila anda ingin menggunakan aplikasi dengan versi terbaru, bisa menggunakan Debian testing atau unstable version. Demikian cara upgrade Debian 8 Jessie ke Debian 9 Stretch.  
  </blockquote>
  </fieldset>
  

 



