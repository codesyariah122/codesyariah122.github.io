---
layout: post
title:  "Memulai SASS di NodeJS"
author: puji
categories: [ NodeJS, SASS ]
image: assets/images/post/sass.png
tags: [fullstack_developer]
opening: بسم الله الرحمن الرحيم
---  

![SASS-1]({{site.url}}/assets/images/post/sass-vs-css.webp)  
  

### Styling web dengan SASS  
Hai Coders ! Apa kabarnya ? 
Semoga sehat-sehat selalu. 
Dalam artikel kali ini gout mau bahas mengenai sass, sass adalah tools atau library yang melengkapi kebutuhan dalam kerangka design. melengkapi kinerja css (cascading stylesheet) yaitu format scripting untuk menambahkan styling bagi keperluan web design dalam hal ini juga bisa di sematkan kepada front end web developer. SASS menjadi tools pelengkap para developer web era milenial. 

#### Apa itu SASS ?
SASS merupakan singkatan dari Syntactically Awesome Style Sheets. SASS adalah sebuah bahasa pra-prosesor (preprocessor) untuk CSS.

SASS bukanlah bahasa pemrograman, SASS tools library , scripting untuk melengkapi kerangka design dari css.  
so untuk developer web dengan skala yang besar dan design yang kompleks mungkin sass bisa sangat bermanfaat. gout sendiri baru baru ini mulai tertarik menggunakan SASS, dan itu terasa memudahkan sekali dalam proses mendesign sebuah project khususnya web development.  

### Memulai SASS 
dalam project artikel kali ini gout masih menggunakan ```Node.js``` untuk membuat project web. dalam project kali ini gout mencoba menambahkan module untuk SASS di ```Node.js``` yaitu ```node-sass```.  

```
install sass
npm install node-sass --savev
```  
kemudian buat direktori baru di root direktori project kita dengan nama ```sass```
```
mkdir -p sass
chmod 777 sass/.*
touch sass/index.scss
touch sass/_layout.scss
touch sass/_color.scss
```  
mungkin untuk sebagian orang SASS adalah hal baru, sama seperti gout waktu pertama mengenal SASS, dilihat dari format ekstensi file nya yaitu ```.scss``` .  
#### Kenapa SCSS  
Menurut penjelasan <a href="https://thesassway.com/editorial/sass-vs-scss-which-syntax-is-better">thesassway</a>, awalnya syntax SASS cukup sulit difahami. karena sangat berbeda jauh dengan ```css``` biasa.  seperti berikut ini perbedaan dari syntax SASS dan SCSS :  

![SASS-2]({{site.url}}/assets/images/post/sass-vs-scss.png)  

terlihat perbedaannya bukan, SCSS akan lebih mudah dibaca dan dipahami bagi yang sudah terbiasa menggunakan syntax ```CSS``` untuk melakukan styling web.  
sedangkan ```SASS``` tidak familiar, butuh adaptasi lebih lagi dalam mempelajari ```SASS``` bagi awam seperti gout.  

#### Selanjutnya  
setelah membuat direktori ```sass/``` dari diatas, kemudian kita membuat direktori untuk ```css``` gout menyimpan nya di ```assets/css/```
```
mkdir -p assets/css/
chmod 777 assets/css/.*
touch assets/css/styles.css
```  
di SASS kalian tinggal buka satu file saja sebagai target styling, disini gout menggunakan file ```SASS``` di ```sass/_layout.scss```.  sebelumnya buka file ```sass/index.scss```, kemudian import tiap file sass yang akan di configurasi sebagai base styling.
```
//file index.scss
@import '_color.scss';
@import '_layout.scss';
```  
kemudian buka file ```sass/_layout.scss```, dan untuk memulai configurasi sass kalian, di sass ada fungsi ```--watch``` , kalian bisa lihat di dokumentasi sass <a href="https://sass-lang.com/guide">Doc(guide) SASS</a>. kita bisa menggunakan ```--watch``` ini untuk memonitor target untuk file ```css``` nya dimana dalam artikel ini file css gout ada di direktori ```assets/css/styles.css```.  
buka terminal kembali :  
```
sass --watch sass/index.scss:assets/css/styles.css
```  
![SASS-3]({{site.url}}/assets/images/post/sass-watch.png)  

kemudian kita buka file ```sass/_color.scss``` dimana file ini kita fungsikan sebagai tempat menyimpan variable karena di ```SASS``` ini kalian bisa menambahkan variable untuk memudahkan format styling kita.  
```
$heading1: firebrick;
$heading2: crimson;
```  
setelah itu buka file ```sass/_layout.scss``` sekarang kita bisa gunakan ```variable($)``` dari file ```sass/_color.scss```.  
```
h1, h2, h3{
	color: $heading1;
}  
h3, h4{
	color: $heading2;
}
```  
dalam project kali ini gout menggunakan ```Node.js```, di ```Node.js``` sepert ini konfigurasi ```Node.js``` gout :  gout menggunakan file ```server.js```  

```
//file = server.js
const http = require('http');
const fs = require('fs');
const path = require('path');

http.createServer(function (request, response) {
    console.log('request ', request.url);

    let filePath = '.' + request.url;

    if (filePath == './') {
        filePath = './views/index.html';
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.wasm': 'application/wasm'
    };

    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, function(error, content) {
        if (error) {
            if(error.code == 'ENOENT') {
                fs.readFile('./404.html', function(error, content) {
                    response.writeHead(404, { 'Content-Type': 'text/html' });

                    response.end(content, 'utf-8');
                });
            }
            else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });

}).listen(5151);
console.log('Server running at http://127.0.0.1:5151/');
```  

kemudian di file ```views/index.html```, berikut isi file script html gout :  

```
<!DOCTYPE html>
<html>
<head>
	<title>Testing SASS</title>
	<link rel="stylesheet" type="text/css" href="./assets/css/styles.css">
</head>
<body>

	<h1>I'm Using SASS in Node.js</h1>
	<h4>Hello World SASS is Awesome</h4>
</body>
</html>
```  
![SASS-4]({{site.url}}/assets/images/post/sass-test-2.png)  

kurang lebih begini ketika dilakukan ```--watch``` pada file index.scss  
![SASS-5]({{site.url}}/assets/images/post/sass-test-1.png)  

#### kesimpulan !  
Bahwa dengan **SASS** ini kalian bisa melakukan apa yang tidak bisa dilakukan ***CSS*** seperti penggunaan **$variable**, kemudian **Nested (bersarang)** struktur di css.  

![SASS-5]({{site.url}}/assets/images/post/sass-test-2-1.png)  
![SASS-6]({{site.url}}/assets/images/post/sass-test-3.png)  
![SASS-7]({{site.url}}/assets/images/post/sass-test-4.png)

```
// nested sass  
header{
	display:flex;
	align-content:center;
	margin-left:13rem;
h1{
		color:$heading1;
	}
}

h4{
	color:$heading2;
}
```  
begitulah kelebihan menggunakan **SASS**, untuk selanjutnya kalian bisa eksplore juga, bisa lihat langsung ke documentasi resmi dari sass ini .

ok cukup sekian mengenai lanjutan artikel nodeJS kali ini, mudah-mudahan bermanfaat. nanti di artikel berikut nya gout akan membahas yang lain lagi mengenai Node.js.

akhir kata gout ucapkan ... 

wassalaam  

***Puji Ermanto***






