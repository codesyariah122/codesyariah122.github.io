---
layout: post
title:  "Error Phpmyadmin Warning in ./libraries/sql.lib.php#613 count(): Parameter must be an array or an object that implements Countable"
author: puji
categories: [ mysql-server, phpmyadmin ]
image: assets/images/post/visual_code1.png
tags: [webdevelopment]
opening: بسم الله الرحمن الرحيم
---  
![vs_code]({{ site.url }}/assets/images/post/visual_studio_code.png)  

# install visual studio code di debian 9 stretch  

Visual Studio Code adalah editor kode lintas-platform gratis dan open-source yang dikembangkan oleh Microsoft. Memiliki dukungan debugging bawaan, kontrol Git, penyorotan sintaksis, penyelesaian kode, terminal terintegrasi, refactoring kode dan snippet. Fungsionalitas Kode Visual Studio dapat diperpanjang menggunakan ekstensi.

Dalam tutorial kali ini saya akan menginstal visual studio code di distro linux debian 9 stretch saya. ok kita mulai aja langsung.  
pertama-tama update dulu debian 9 nya  

```
apt update
apt install software-properties-common apt-transport-https curl
```  
kemudian import GPG key microsofnya menggunakan command curl  

```
curl -sSL https://packages.microsoft.com/keys/microsoft.asc | sudo apt-key add -
```
kemudian tambahkan source visual studio code ke dalam repository debian 9 stretch  
```
add-apt-repository "deb [arch=amd64] https://packages.microsoft.com/repos/vscode stable main"
```  
setelah source repository visual studio ditambahkan, kemudian kita install visual studio code nya dan ambil updatean terbaru.  
```
apt update
apt install code
```  
ok sekarang visual studio sudah terinstall, kita bisa membukanya di icon Activities debian 9 ```Activities -> Visual Studio Code``` .  

Activities -> Visual Studio Code

![vs_code]({{ site.url }}/assets/images/post/debian-virtual-studio-code.jpg)  
