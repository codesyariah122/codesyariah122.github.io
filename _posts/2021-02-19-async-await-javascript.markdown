---
layout: post
title:  "async await javascript"
author: puji
categories: [ Javascript, VanillaJS ]
image: assets/images/post/async-await/async-javascript.jpg
tags: [webdevelopment]
opening: بسم الله الرحمن الرحيم
---  

{{page.opening}}  

![async-await]({{site.url}}/assets/images/post/async-await/async-await.png)    

Dalam judul ini gout akan membahas sedikit mengenai paradigma asynchronous javascript, yah boleh dibilang javascript ini merupkan bahasa pemrograman tingkat tinggi yang mempunyai karakter yang unik.  

Pada umumnya javascript secara natural menjalankan program secara **Synchronous** atau blocking dimana code program dibaca dan di eksekusi berurutan dari atas kebawah.  

```javascript
console.log("Program pertama")
console.log("Program kedua")
console.log("Program ketiga")
```  
outputnya :  
```shell
root@debian:/home/puji122/MyNodeApp/lat-js/async-await# node index.js
Program pertama
Program kedua
Program ketiga
```  
bisa terlihat dari contoh diatas javascript akan secara berurutan membaca alur program yang kita tulis dari baris pertama, kemudian baris kedua dan terakhir baris ketiga, ini lah yang dinamakan proses **Synchronous** atau blocking.  
meskipun secara alami javascript berjalan secara synchronous, namun ada saat-saat dimana javascript tidak menjalankan alur program secara synchronous, yakni apabila ada sebuah alur program menjalankan suatu proses tertentu yang sedikit memakan lebih banyak waktu.  

```javascript
setTimeout(() => console.log("Program pertama"), 2500)

setTimeout(() => console.log("Program kedua"), 1500)
setTimeout(() => console.log("Program ketiga"), 1000)
```  

output :  

```shell
root@debian:/home/puji122/MyNodeApp/lat-js/async-await# node .
Program ketiga
Program kedua
Program pertama
```  
Pada kode program diatas gout menambahkan interval waktu untuk mensimulasikan proses asynchronous nya. baris pertama akan berjalan dalam 2,5 detik, kemudian baris kedua akan berjalan dalam 1,5 detik dan terakhir baris ketiga dalam 1 detik. Dengan menambahkan interval waktu tersebut dimana javascript keluar dari sisi alaminya yang synchronous, saat menjalankan alur program dengan interval tertentu javascript menjalankan proses asynchronous atau non-blocking, atau dengan kata lain kode program dijalankan berdasarkan proses tertentu.  
Lalu bagaimana memperlakukan proses asynchronous ini dalam javascript, telah disindir dalam artikel sebelumnya mengenai callback dan promise. Yup betul sekali, dalam menangani proses asynchronous pada javascript kita bisa menggunakan dua metode diatas yaitu **callback** dan **promise**.  
Seperti yang telah kita ketahui bahwasanya callback mempunya kekurangan ketika alur program sudah begitu kompleks maka kode akan sulit untuk di maintenance dan javascript mempunyai satu metode lagi yang digunakan sebagai pengganti callback yaitu ***promise*** yahh kita telah bahas promise dan penerapannya dalam artikel sebelumnya. Saya telah menjelaskan nya sedikit di artikel tersebut mengenai promise dengan contoh sederhananya. Tapi promise sendiri juga masih belum terlalu manusiawi untuk di maintenance ketika alur program semakin kompleks, maka untuk mengatasi hal tersebut javascript mempunyai satu metode lagi untuk menangani promise yaitu **async await**.  

### Async-Await  
Meskipun ada promise yang digunakan dalam menjalankan alur proses asynchronous pada javascript, kita harus tau bahwasanya promise digunakan sebagai alternative callback, itu berarti ada saatnya kita menggunakan promise dan kapan kita menggunakan callback dalam perencanaan alur program kita. Dalam artikel sebelumnya kita sudah mencoba menjalankan sebuah promise.  
Dan kita tahu promise belum terlalu rapih dari segi maintenance kode, sekarang kita akan mencoba mensimulasikan promise menggunakan async-await :  

 ```javascript
function dataUser(username, email){
  console.log(`
    Username: ${username} \n
    Email : ${email}
  `)
}

console.log("Start")
const getUser = async(user, email) => {
  const userdata = await dataUser(user, email)
  setTimeout(()=>{
    return userdata
  }, 500)
}
console.log("Finish")

const user = {
  username: "amel22", 
  email: "amel22_@mail.com"
} 

getUser(user.username, user.email)
 ```
outputnya :  

```shell
root@debian:/home/puji122/MyNodeApp/lat-js/async-await# node .
Start
Finish

    Username: amel22 

    Email : amel22_@mail.com
```  

contoh penggunaan dengan library fetch untuk menjalankan request ajax :  

```javascript
import fetch from 'node-fetch'

const getUser = async(url) => {
  let req = await fetch(url)
  return req
}

getUser('http://localhost:5000/api/users')
.then(res => res.json())
.then(res => {
  console.log(res)
})
.catch(err => console.log(err))
```  
outputnya :  
```shell
root@debian:/home/puji122/MyNodeApp/lat-js/async-await# node .
{
  data: [
    {
      fullname: 'amelia wijayanti',
      email: 'amel_@mail.com',
      id: '602de79c25fad930c50268d6'
    },
    {
      fullname: 'd supardi',
      email: 'd_@mail.com',
      id: '602de7ce25fad930c50268d7'
    },
    {
      email: 'idris_@mail.com',
      fullname: 'idris maman',
      id: '602dee493217aa3265e7e4c3'
    },
    {
      fullname: 'rachel goswel',
      email: 'rachel_@mail.com',
      id: '602deefb3217aa3265e7e4c4'
    },
    {
      email: 'ton_@mail.com',
      fullname: 'anton jetnov',
      id: '602def403217aa3265e7e4c5'
    },
    {
      fullname: 's mariton',
      email: 'marit_@mail.com',
      id: '602df0403217aa3265e7e4c9'
    }
  ]
}
```  

Mudah-mudahan bermanfaat dari artikel gout ini yah.

ok sekian dulu dari saya untuk artikel kali ini, nanti kita lanjutkan lagi artikel mengenai tips and trick seputar pemrogramman khususnya web programming  
... see the next articles 

bye :) 


***Salam***

**Puji Ermanto**
