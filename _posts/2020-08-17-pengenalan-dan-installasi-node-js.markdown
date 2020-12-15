---
layout: post
title:  "Pengenalan dan installasi Node.js sebagai beckend di javascript"
author: puji
categories: [ NodeJS, Javascript ]
image: assets/images/post/nodejs-part2.png
tags: [fullstack_developer]
opening: بسم الله الرحمن الرحيم
---  

![nodeJS_webserver]({{site.url}}/assets/images/post/Node-js-Logo.png)  

### Berkenalan dengan Node.js
Node.js atau terkadang juga disebut (Node) adalah lingkungan atau platform untuk mengeksekusi kode-kode yang ditulis didalam javascript, yang dikenal dengan sebutan Javascript runtime environment. Dalam melaksanakan tugasnya, Node.js menggunakan V8, yaitu mesin JavaScript yang diproduksi oleh Google. V8 itu sendiri bertugas untuk mengubah kode JavaScript ke dalam bentuk bytecode. File ***bytecode*** inilah yang nantinya akan dieksekusi oleh Node.js. Proses eksekusi terhadap ***bytecode*** dapat berjalan lebih cepat dibandingkan dengan eksekusi terhadap kode JavaScript secara langsung. Untuk melihat bytecode yang dihasilkan, kita dapat menggunakan opsi **--print-bytecode** pada saat mengeksekusi aplikasi yang dibuat menggunakan Node.js, misalnya seperti berikut.  

```
$ node --print-bytecode app.js
```  
V8 sendiri ditulis menggunakan bahasa C++ dan digunakan oleh Google dalam mengembangkan web browser Google Chrome. Masing-masing aplikasi web browser memiliki mesin JavaScript yang berbeda. Mozilla Firefox menggunakan Spidermonkey, Apple Safari mengguanakan JavaScriptCore, dan Google Chrome menggunakan V8. Mesin V8 inilah yang digunakan juga oleh Node.js.  

**singkatnya**  
Dengan adanya Node.js kita bisa gunakan javascript sebagai bahasa BeckEnd dan membuat berbagai macam jenis program aplikasi dan untuk project berskala apapun, JavaScript telah mengalami kemajuan yang pesat dalam dekade akhir-akhir ini, dari berbagai macam jenis aplikasi bisa dibuat dengan JavaScript. Begitulah sedikit pengenalan mengenai Node.js

#### Installasi Node.js  di linux ( Debian / Ubuntu )
Sebelum kita melanjutkan proses installasi Node.js, kita tambahkan dulu beberapa opsi Kita tambahkan PPA ke system repository kita. 
Kita juga perlu menginstal paket software-properties-common jika belum diinstal. Anda dapat memilih untuk menginstal versi Node.js terbaru atau versi LTS.  

```
apt-get install curl software-properties-common

curl -sL https://deb.nodesource.com/setup_12.x | bash -

```  

**Lanjut ...**  
Setelah menambahkan file PPA yang diperlukan, mari instal paket Nodejs. NPM juga akan diinstal dengan node.js. Perintah ini juga akan menginstal banyak paket dependen lainnya di sistem Anda.  

```
apt install nodejs
```  
sebagai tambahan install **yarn**  
**Yarn**
adalah perangkat lunak manajemen paket canggih untuk aplikasi Node.js. Ini adalah alternatif yang cepat, aman, dan andal dibandingkan pengelola paket Nodejs lainnya. Setelah proses menginstal Node.js terbaru di sistem Ubuntu dan Debian.

```
npm install yarn -g
```

#### Check version Node.js  
Setelah proses installasi selesai semua, kita bisa mengecek apakah proses instalasi Node.js kita berhasil atau tidak dengan mengetikan perintah berikut :  

```
node -v
# v14.11.0
```  
```
npm -v
6.14.8
```  

Okay proses installasi Node.js berhasil dan Node.js sudah siap digunakan sebagai beckend programming languange untuk aplikasi javascript anda. Kita lanjut ke artikel tentang Node.js lainnya di artikel berikutnya, akhir kata gout ucapkan ...  

***Wassallaam***
