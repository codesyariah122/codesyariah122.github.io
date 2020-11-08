---
layout: post
title:  "Menggunakan module import - export ecmascript6 di Node.js"
author: puji
categories: [ NodeJS, Javascript ]
image: assets/images/post/import-export.png
tags: [fullstack_developer]
opening: بسم الله الرحمن الرحيم
---  

![es6-1]({{site.url}}/assets/images/post/es6.png)  
### EcmaScript 6  
Dalam judul kali ini gout berbagi kisah keluh dan kesah, mengenai ecma script, terkhusus dalam judul kali ini yakni mengenai penggunaan module ecmascript6 di nodejs.  
pertama tama gout akan mengucapkan selamat datang bagi para pembaca gout dari alam lain. entah itu alam gaib atau alam sutra ataupun alam semesta. baiklah gout langsung bahas ke topik utama kali ini.

#### menggunakan module esm dan mjs  
Menarik sekali bagi gout membahas mengenai ecmascript6 yang sedang di gandrungi oleh para developer, dalam artikel ini gout hanya membahas dari sisi pengguna saja.  
sebelum menggunakan module import-export ini, kita install dulu package ecmascript6 nya. nama packagenya adalah ```esm``` dan ```mjs```, supaya nanti kita bisa menggunakan module dari ecmascript6 ini. package ```mjs``` ini mungkin akan disertakan bagi yang menggunakan Node.js versi 12 sedangkan versi terakhirnya yaitu versi 14 gout rasa tidak perlu package ```mjs``` ini yah. ok langsung saja kita buka code editor kita.  
***Install package***  
buka code editor nya dulu, dalam artikel kali ini gout menggunakan ```visual studio code``` kita buat direktori baru, misalnya disini gout memberi nama direktori ```ES6Module/```, langsung ajah kita drag ke code editor kita.  
seperti ini susunan direktori nya :  
![es6-2]({{site.url}}/assets/images/post/dir-ES6.png)  
pertama-tama kita lakukan initialisasi package nya terlebih dahulu. dengan execute di terminal VSCODE : 
```
npm init
### Kemudian isikan beberapa opsi yang tersedia
```  
sehingga menghasilkan satu buah file baru di direktori project ES6 kita, dengan nama ```package.json```.
kemudian selanjutnya kita kembali ke terminal lagi, untuk menginstall package yang diperlukan :  
```
npm install --save-dev esm mjs
```  
sekarang di ```package.json``` ada nama package baru yang terinstall :  
![es6-3]({{site.url}}/assets/images/post/package-ES6.png)  
sekarang berarti package ```ecmascript6``` nya bisa kita gunakan di file project kita, buat sebuah direktori baru dengan nama ```lib/``` di direktori lib ini kita buat satu buah file baru dengan nama ```module.mjs``` formatnya(ekstensinya) adalah ```.mjs```. file ini nanti akan kita gunakan untuk menyimpan beberapa module yang akan kita eksport ke file lain. kemduian di root direktori nya kita buat file baru dengan nama : ```app.js```. berikut script dari file ```lib/module.mjs``` dan file ```app.mjs``` : 
```
# file : lib/module.mjs
// export function add(a, b) {
//     let n = a + b
//     return `${a} + ${b} = ${n}`
// }
// export function dist(a, b) {
//     let n = a - b
//     return `${a} - ${b} = ${n}`
// }
const sayHai = (string) => {
    console.log(`halo, ${string}`)
}
const agogo = (string) => {
    console.log(string)
}
const halo = (user) => {
    return user
}
export { sayHai, agogo, halo }
```  
kalian bisa coba bagian yang gout beri comment itu, untuk membedakan opsi penggunaan module export di ecmascript6 ini. dan kemduian file selanjutnya :  
```
# file : app.mjs
// import { add, dist } from './lib/module'

// console.log(add(19, 12))

// console.log(dist(18, 7))

import * as MyModule from './lib/module.mjs'
MyModule.sayHai('Lagi apa bro ? ')
MyModule.agogo('Lagi nyalip bis di tikungan arcamanik ! ')
const user = MyModule.halo('Puji122')
const span = document.querySelector('span')
span.addEventListener('mouseenter', () => {
    span.innerHTML = MyModule.halo('Puji122')
    span.style.color = "rgb(211, 0.1, 111)"
})
span.addEventListener('mouseleave', () => {
    span.innerHTML = 'EcmaScript6'
    span.style.color = 'crimson'
})
```  
begitu juga di file ```app.mjs``` kalian bisa mencupa opsi yang gout beri komentar.  
selanjutnya untuk menjalankannya, seperti biasa kita menggunakan perintah ```node``` tetap dengan penambahan beberapa opsi seperti berikut:  
```
# terminal
node -r esm app.mjs
```  
seperti ini hasilnya :  
![es6-4]({{site.url}}/assets/images/post/module-es6-run.png)  
kemudian kita coba di opsi yang di comment: 

file ```app.mjs```  
![es6-5]({{site.url}}/assets/images/post/module-es6-run2.png)  

file ```lib/module.mjs```  
![es6-6]({{site.url}}/assets/images/post/module-es6-run3.png)  

#### Penggunaan package mjs di script HTML  
Nah bagaimana mengenai penggunaan module ```.mjs``` ini di tag script html:  
caranya sama ajah, seperti html biasa html:5 kemudian kita panggil module nya dengan tag ```<script></script>```, tapi kali ini ada perubahan di element ```type``` nya, sehinggai file html kita menjadi seperti ini, perbedaanya di bagian tag ```<script>``` kita menggunakan element type dengan nilai ```module``` :  

```
# file : index.html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test Module</title>
</head>

<body>

    <h1>Halo I'm Using <span>EcmaScript6</span></h1>

    <script type="module" src="app.mjs"></script>
</body>

</html>
```  
file diatas hanya html sederhana biasa, hanya sebagai contoh penggunaan module ecmascript6. 
untuk sourcecode nya ada di link berikut:  
<a href="https://github.com/codesyariah122/NodeJS_basic/tree/master/modernJS/ES6">ES6 Module</a>

ok cukup sekian dulu mengenai ```Module esm dam mjs``` di artikel ini, di lain waktu kita explore yang baru-baru lagi dari ecmascript6 ini.

akhir kata gout ucapkan ... 

wassalaam  

***Puji Ermanto***






