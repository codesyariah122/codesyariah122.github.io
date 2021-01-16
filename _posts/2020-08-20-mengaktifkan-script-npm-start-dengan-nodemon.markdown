---
layout: post
title:  "Mengaktifkan script npm start dengan nodemon"
author: puji
categories: [ NodeJS, Javascript ]
image: assets/images/post/nodemon.png
tags: [fullstack_developer]
opening: بسم الله الرحمن الرحيم
---  

![nodeJS_webserver]({{site.url}}/assets/images/post/nodejs-part2.png)  

Hallo Coders !  

apa kabarnya. dalam artikel kali ini gout mau berbagi sedikit tips, mengenai script untuk menjalankan server nodejs. sebelumnya kita mungkin menjalankan aplikasi server dengan command script  
```bash
node server.js
````  
dengan command diatas aplikasi kita sudah jalan di port yang kita setting di code berikut :  

```javascript
// file server.js di direktori root
let http = require('http');

let server = http.createServer(function (req, res){
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write('Hello <b>World</b>');
	res.end();
});

server.listen(8999);
```  
tapi dengan script ```node server.js```. jika kita melakukan perubahan code tidak secara langsung merubah keseluruhan view server, kita tetap harus menonaktifkan terlebih dahulu script server kita. kemudian menjalankan ulang dengan comman ```node server.js```.  
ada cara lain seperti tadi di awal artikel ini dijelaskan, kita bisa menambahkan field script di file ```package.json``` supaya server melakukan update ketika kita melakukan perubahan pada code kita, kita bisa menggunakan ```nodemon``` untuk eksekusi aplikasi kita. 

```bash
npm install nodemon --save
```  
dengan ```nodemon``` status server menjadi monitoring, dan akan secara langsung melakukan perubahan ketika ada perubahan di struktur code kita.  
dan untuk lebih flexibel lagi kita tambahkan ini ke field scripts di file ```package.json```, buka file ```package.json``` kemudian copy baris code berikut :  

```json
  "scripts": {
    "start": "nodemon server.js", //tambahkan bagian ini
    "test": "echo \"Error: no test specified\" && exit 1"
  },  
```  
untuk menjalankan kembali server kita kita bisa menggunakan comman ```npm start```, coba lakukan perubahan di file ```server.js``` kemudian lihat di browser server akan terus merespon setiap perubahan di code kita.

ok cukup sekian mengenai lanjutan artikel nodeJS kali ini, mudah-mudahan bermanfaat. 

akhir kata gout ucapkan ... 

wassalaam  

***Puji Ermanto***






