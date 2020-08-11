---
layout: post
title:  "Install NodeJS debian 9 stretch linux"
author: puji
categories: [ NodeJS, Javascript ]
image: assets/images/post/Node-js-Logo.png
tags: [fullstack_developer]
opening: بسم الله الرحمن الرحيم
---  

![composer]({{site.url}}/assets/images/post/Node-js-Logo.png)  

# About node js  
Node.js adalah platform perangkat lunak pada sisi server dan aplikasi jaringan. Ditulis dengan bahasa JavaScript dan dijalankan pada Windows, Mac OS X, dan Linux tanpa perubahan kode program.  

jadi pada intinya NodeJS dimanfaatkan sebagai bahasa ```beckend```, sama halnya seperti bahasa-bahasa beckend lainnya, hanya saja NodeJS ini di bangun diatas platform javascript, yang dalam dekade terakhir ini memegang laju perkembangan teknologi, sudah banyak raksa2 teknologi mendevelope programm dan aplikasi-aplikasi mereka menggunakan NodeJS ini.  


#### installasi nodeJS
dalam artikel ini gout akan menjalankan installasi node js di operating system linux, kebetulan disto linux yang sedang gout gunakan adalah ```Debian GNU/Linux 9.13 (stretch)```. Ok langsung ajah kita buka terminal linux :  

```shell
cd /home/user/
# wget https://nodejs.org/dist/v12.18.3/node-v12.18.3-linux-x64.tar.xz
# tar -xf node-v12.18.3.linux-x64.tar.xz
# mkdir /usr/local/nodejs
# mv node-v12.18.3-linux-x64.* /usr/local/nodejs/
// perintah diatas berguna untuk memasang Node.JS di dalam direktori /usr/local/nodejs
```  

**Buat symbolic link**  
buat ```symbolic link``` untuk node di direktori /usr/bin agar program node (interpreter Node.js) dapat dipanggil dari direktori mana saja.  

```
# ln -s /usr/local/nodejs/bin/node /usr/bin/node
```  
buat lagi ```symbolic link``` untuk npm di ```usr/bin``` agar program npm (node package manager) dapat dipanggil dari direktori mana saja.

```
# ln -s /usr/local/nodejs/bin/npm /usr/bin/npm
```  
Untuk mengecek instalasi Node.js sudah dijalankan dengan benar atau belum tuliskan command ```node -v``` dan ```npm -v``` di terminal linux kita. seperti berikut :  

```shell
root@codesyariah:/home/puji122/pujiermanto.github.io# node -v
v10.22.0
root@codesyariah:/home/puji122/pujiermanto.github.io# npm -v
6.14.6
root@codesyariah:/home/puji122/pujiermanto.github.io# 
// diatas adalah terminal linux distro debian gout.
```  
***Ok installasi sudah berhasil*** kita bisa menggunakan node js untuk membuat aplikasi atau programm kita dan memanfaatkan node js sebagai beckend programming.  

### Menggunakan node js secara interactive
Node JS dilengkapi dengan node interaktif. Mode ini disebut terminal ```REPL```, yang merupakan singkaran dari ```Read-Eval-Print-Loop```.  
* Read ~ Membaca masukan (input) yang ditulis oleh pengguna dan mengurainya kedalam kode javascript.  
* Eval ~ mengevaluasi kode yang telah dibaca.  
* Print ~ mencetak atau menampilkan hasil evaluasi ke layar terminal.  
* Loop ~ mengulang tiga langkah di atas sampai pengguna menekan tombol ```ctrl+c``` dua kali (ctr+D) untuk menghentikan terminal ```REPL```  

## Menjalankan terminal REPL  
untuk menggunakan Node.ks secara interactive, tulis node ke dalam terminal. 
```shell
# node
> 1 + 1
2
> console.log("Hello World")
Hello World
> 3 * 5
15
> var x = 5
undefined
> var i
undefined
for(i=0; i<x; i++){
	... console.log(i)
... }
0
1
2
3
4
undefined
```  

```undefined``` yang ditampilkan di Terminal ```REPL``` diatas menunjukan bahwa perintah yang dieksekusi tidak mengembalikan nilai. pada dasarnya ```Node.JS``` adalah javascript coders semua bisa mengeksplore nya dengan script script javascript yang coders sudah pelajari pastinya.

## selanjutnya akan dibahas di artikel selanjutnya dengan tagline ```#NodeJS```.



