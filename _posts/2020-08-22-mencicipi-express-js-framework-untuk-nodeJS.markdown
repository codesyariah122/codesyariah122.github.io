---
layout: post
title:  "Mencicipi Express Framework untuk NodeJS"
author: puji
categories: [ NodeJS, Javascript ]
image: assets/images/post/express.jpg
tags: [fullstack_developer]
opening: بسم الله الرحمن الرحيم
---  

![express-demo-1]({{site.url}}/assets/images/post/express-demo1.png)  
  

### Express: Framework untuk NodeJS  

Meskipun proses pembuatan web menggunakan NodeJS dapat dilakukan secara manual tanpa ***framework***, tapi untuk mempercepat dan mempermudah proses tersebut kita dapat menggunakan salah satu ***framework*** yang dirancang secara khusus untuke Node.js.  
Beberapa ***framework*** yang sering digunakan oleh pengguna Node.js adalah :  
- Express  
- Sails  
- Koa  
- Meteor  
meskipun sebenarnya masih banyak lagi pilihan lain. Dalam artikel kali ini gout hanya akan membahas tentang dasar-dasar penggunaan ***Express***.

#### Sekilas tentang Express  
```Express.js``` atau lebih dikenal dengan sebutan singkat, ***Express***, adalah ```web framework``` untuk Node.js. Express merupakan framework minimalis yang awalnya dibuat oleh ***TJ Holowaychuk***.  Express dirilis pertama kali pada 16 November 2010. Menurut pembuatnya, pembentukan Express terinspirasi oleh sinatra, yaitu ***web framework*** minimalis untuk bahasa pemrograman ***Ruby***.  

kata **Minimalis** di sini bukan berarti Express tidak dapat digunakan untuk membuat aplikasi web berskala besar, tapi lebih mengarah ke isi dari Express itu sendiri. Express hanya berisi modul-modul inti untuk memudahkan pengguna ***Node.js*** dalam membuat aplikasi web.  
Express masih mengizinkan kita untuk memasang modul-modul tambahan sesuai kebutuhan.  

#### Instalasi Express  
Express perlu dipasang secara manual menggunakan command berikut : 

```bash
npm install express
```  
Cara diatas akan memasang Express secara global. Cara lain yang sering digunakan untuk melakukan instalasi Express adalah pada saat membuat aplikasi menggunakan command berikut :  
```bash
npm install express --save
```  
perintah diatas perlu ditulis dari direktori aplikasi yang sudah disiapkan sebelumnya. Instalasi Express menggunakan cara kedua bersifat lokal. Artinya, modul Express hanya akan dikenal oleh aplikasi yang sedang dibuat. jika anda ingin membuat aplikasi baru ( didalam direktori lain ), maka installasi Express perlu di lakukan lagi untuk aplikasi bersangkutan.  

setelah Express terpasang, kita dapat mengimport modul tersebut kedalam aplikasi yang kita buat melalui perintah berikut :  

```bash
const express = require('express')
```  

#### Membuat aplikasi sederhana dengan Express  
untuk membuat aplikasi dengan framework Express, ikuti langkah-langkah berikut:  
1. Aktifkan direktori kerja anda, misalnya seperti berikut  
```
root@codesyariah:/home/puji122# 
```  
2. Buat sub-direktori baru di dalam direktori kerja untuk menempatkan aplikasi, misalnya dengan nama ***MyApp***  
```
root@codesyariah:/home/puji122# mkdir MyApp
```  
3. Aktifkan sub-direktori ***MyApp***, lalu buat file ***package.json*** dengan menjalankan command berikut:  
```
root@codesyariah:/home/puji122#cd MyApp
root@codesyariah:/home/puji122/MyApp# npm init
```  
4. Isi beberapa data untuk field data file **package.json**  
5. Jika anda tidak memasang Express secara global, lakukan instalasi Express pada tahap ini dengan command berikut:  
```
root@codesyariah:/home/puji122/MyApp# npm install express --save
```  
6. Buat file baru disini gout membuat file dengan nama ```index.js``` dan tempatkan file tersebut di dalam root direktori ***MyApp/***. kode untuk file tersebut dapat dilihat di script code dibawah ini :  

```javascript
// file : index.js
const express = require('express')
const app = express()

app.get('/', (req, res) => {
	res.send('<h1>Hello World</h2>');
}).listen(5000, () => {
	console.log("Server running on port 5000")
})
```  
dari artikel sebelumnya kita sudah menambahkan ```scripts``` seperti berikut : 

```json
  "scripts": {
    "start": "nodemon server.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```  
jadi kita bisa menjalankan aplikasi kita dengan command :  
```bash
root@codesyariah:/home/puji122/MyApp# npm start
```  
kemudian buka browser kita (google chrome, firefox) kemudian akses aplikasi express kita di url :  

http://localhost:5000 

seperti ini ketika aplikasi Express kita running :  

![express-demo-1]({{site.url}}/assets/images/post/express-demo-1.gif)  

perhatikan code berikut :  

```javascript
const express = require('express')
```  
Baris code diatas berfungsi untuk mengimpor modul Express di Node.js.  

```javascript
const app = express()
```  
***Fungsi express()*** merupakan fungsi global di dalam Express yang berguna untuk membuat objek aplikasi. Dalam Express, objek aplikasi dapat melakukan pekerjaan-pekerjaan berikut:  

- Menangani permintaan berdasarkan metode ```HTTP``` dan rute ```URL``` yang dikirim oleh komputer client.  
- Menentukan konfigurasi ```middleware```  
- Menghasilkan ```render``` tampilan ***HTML***  
- Mendaftarkan mesin pembuat ```template (***template engine***)```.  

```javascript
app.get('/', (req, res) => {
	res.send('<h1>Hello World</h1>')
})
```  
Kode diatas digunakan untuk menangani permintaan rute ```URL```. tersebut yang dikirim melalui method ```GET```. ketika permintaan terjadi, aplikasi akan menjalankan fungsi ***callback***. Fungsi ***callback*** memiliki dua parameter. yaitu object ```request(req) dan response(res)```. Didalam fungsi tersebut, kita mengirim respon(berupa text, (```'<h1>Hello World</h1>'```) ke browser atau client melalui pemanggilan method ```send()``` dari object request.  

```javascript
listen(5000, () => {
	console.log("Server running on port 5000")
})
```  
Baris kode diatas menyatakan bahwa aplikasi menerima permintaan yang datang melalui port **5000**.  




ok cukup sekian mengenai lanjutan artikel nodeJS kali ini, mudah-mudahan bermanfaat. nanti di artikel berikut nya gout akan membahas ```routing``` di Express.js.

akhir kata gout ucapkan ... 

wassalaam  

***Puji Ermanto***






