---
layout: post
title:  "Membuat aplikasi NodeJS pertama"
author: puji
categories: [ NodeJS, Javascript ]
image: assets/images/post/repl-node.jpe
tags: [fullstack_developer]
opening: بسم الله الرحمن الرحيم
---  

![nodeJS_webserver]({{site.url}}/assets/images/post/repl-node.jpe)  

### Membuat aplikasi Node.js  
Meskipun terminal ```REPL``` membantu kita dalam menguji perintah-perintah JavaScript, tapi aplikasi Node.js selalu ditulis dalam bentuk file. Selanjutnya, file tersebut dieksekusi oleh Node.js.  
Sebagai contoh, tulis kode di bawah ini lalu simpan dengan nama ```hello.js```  :  
```javascript
console.log("hello world")
```  

untuk mengeksekusi file diatas, gunakan perintah berikut : 

```
root@codesyariah:/home/puji122/nodeJS_basic# node hello.js
Hallo NodeJS
root@codesyariah:/home/puji122/nodeJS_basic# 
```  
Cara lain mengeksekusi file ```hello.js``` di atas adalah dengan menambahkan mode ```execute``` ke dalam file tersebut, kemudian eksekusi dilakukan menggunakan perintah ```./hello.js```. untuk menggunakan cara ini, kita perlu menyertakan ```interpreter``` Node.js pada baris pertama kode, seperti berikut :  

```
#!/usr/local/bin/node
console.log("Hello World")
```  

tambahkan mode ```execute``` ke dalam file ```hello.js``` menggunakan perintah berikut :  

```
root@codesyariah:/home/puji122/nodeJS_basic# chmod +x hello.js
```  
untuk mengeksekusi file ```hello.js```, gunakan perintah berikut ini :  

```
root@codesyariah:/home/puji122/nodeJS_basic# ./hello.js
Hallo NodeJS
root@codesyariah:/home/puji122/nodeJS_basic#
```  

pada bagian ```#!/usr/local/bin/node``` baris tersebut menunjukan lokasi dari interpreter NodeJs(node) yang berada di direktori ```/usr/local/bin/node``` sebenarnya hanya merupakan file yang berperan sebagai ```symbolic link``` dan menunjuk ke file ```/usr/local/nodejs/bin/node```. Dengan demikian, coders semua bisa saja mengganti kode diatas menjadi seperti berikut :  

```
#!/usr/local/nodejs/bin/node
```  

### Mengenal program npm  
{program} ```npm``` merupakan progam ```package manager``` standart di dalam javascript, yang memiliki cara kerja seperti ```pip``` di ```python```, ```gem``` di ```ruby``` maupun ```composer``` di ```PHP```. Dengan npm, kita dapat melakukan instalasi suatu ```paket/modul``` atau pustaka (library) tertentu dengan mudah. jika modul yang kita pasang memiliki ketergantungan dengan modul-modul lain, maka npm secara otomatis akan memasang juga modul-modul yang dibutuhkan. Contoh penggunaan npm untuk melakukan instalasi modul ```Express JS``` ( Framework untuk Node JS) adalah sebagai berikut :  

```
npm install express
```  
untuk menjalankan program npm, kita memerlukan koneksi internet.

### Mengenal program nodemon  
Pada saat pembuatan aplikasi berlangsung kita akan banyak melakukan perubahan terhadap kode program. Untuk menguji hasil dari perubahan tersebut kita perlu menjalankan ulang aplikasi agar server tersebut dapat membaca kode terbaru. Jika anda coders! tirak terlalu nyaman dengan pekerjaan sepert ini, maka coders dapat menggunakan program <a href="https://nodemon.io">NodeMon</a>. program ini akan memonitor perubahan yang terjadi secara pada kode dan menjalankan ulang aplikasi secara otomatis. Dengan demikian, coders tidak perlu menjalankan dan mengentikan aplikasi secara berulang-ulang.  

installasi program nodemon dapat dilakukan dengan mudah menggunakan ```npm```, yaitu dengan menulis perintah di bawah ini ke dalam terminal(linux shell) atau ```command prompt``` jika anda bekerja dengan windows.  

```
npm install -g nodemon
```  

karena kita memasang Node.js di dalam direktori ```/usr/local/nodejs```, maka nodemon perlu dipanggil menggunakan perintah ```/usr/local/nodejs/bin/nodemon```. Agar proses pemanggilannya lebih sederhana, kita perlu membuat ```symbolic link``` di dalam direktori ```/usr/bin``` menggunakan perintah berikut :  

```
ln -s /usr/local/nodejs/bin/nodemon /usr/bind/nodemon
```  

Selanjutnya, untuk menjalankan aplikasi ( misalnya: hello.js ) yang tadi telah kita buat bersama-sama, gunakan perintah ```nodemon```, bukan ```node```, seperti berikut :  

```
nodemon hello.js
```  

