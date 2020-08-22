---
layout: post
title:  "Install fonts di linux"
author: puji
categories: [ Linux, debian ]
image: assets/images/post/font1.jpg
tags: [server]
opening: بسم الله الرحمن الرحيم
---  

hai sobat coders, bagaimana kabarnya ? semoga baik baik selalu. 
kali ini saya akan berbagi tips, cara install font di os linux, kebetulan distro linux yang saya gunakan adalah debian versi 9 dengan nama distribusi debian 9 stretch.  

ok langsung saja kita eksekusi, karena ada keperluan dalam penambahan font untuk sedikit project yang saya kerjakan dan dengan itu saya harus menginstall font-font yang saya perlukan. 

pertama download dulu font yang kalian butuhkan, saya biasanya download dari google fonts, atau font.google, setelah font nya di download lanjut di ekstract, kemudian buat folder baru di direktori ```/home``` saya menamakan direktori nya ```.font/``` .font ini adalah direktori yang bersifat hidden, jadi tidak terlihat di direktori aslinya. untuk membuka direktori atau file yang di hidden tekan ```ctrl+h``` atau klik kanan pada direktori dan pilih show hidden file. 

setelah direktori .font/ dibuat lanjut, lanjut dengan mencopy atau memindahkan semua file font yang tadi kita ekstract format font ```.ttf``` biasanya yang saya gunakan. 
![maps1]({{ site.url }}/assets/images/post/font2.jpg)  
kemudian masuk ke direktori .font/, lihat hasil copy atau moving file font yang tadi kita lakukan. 
![maps1]({{ site.url }}/assets/images/post/font3.jpg)  

![maps1]({{ site.url }}/assets/images/post/font4.jpg)  

lanjut eksekusi command berikut 
```
fc-cache -f -v
```  
secara otomatis system akan melakukan installasi font ke system linux kita.

![maps1]({{ site.url }}/assets/images/post/font5.jpg)  

  

