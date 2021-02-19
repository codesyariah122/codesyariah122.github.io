---
layout: post
title:  "Javascript Promise"
author: puji
categories: [ Javascript, VanillaJS ]
image: assets/images/post/promise/promise2.png
tags: [webdevelopment]
opening: بسم الله الرحمن الرحيم
---  

{{page.opening}}  

![promise]({{site.url}}/assets/images/post/promise/promise.png)    


Assalamuallaaikum,  
Hallo sobat-sobat coders semua, apa kabarnya ? semoga kalian semua dalam keadaan sehat-sehat dan selalu diberikan dan di tunjukan kebaikan dalam segala hal dalam kehidupan kalian.  

Dalam judul kali ini gout akan membahas mengenai promise pada javascript !  
hmmmmm apa yah promise itu ?  
Dalam pengertian harfiah promise adalah **janji**, yupp betul bro, yang namanya janji itu harus diusahakan untuk ditepati. eiittss tunggu dulu ini bukan tentang janji dalam dunia nyata ko bro, ini hanya terjadi dalam lingkup informasi data, dan akrab dengan bidang programming, hehehehe.  

Ok lanjut jadi apa itu promise ...  
Sooo jadi promise adalah Sebuah mekanisme baru pada fitur javascript / ES6 yang merepresentasikan sebuah object request pengolahan data yang dilakukan secara asynchronous seperti ajax, dan promise ini mewakili sebuah operasi yang belum selesai, tetapi diharapkan di masa mendatang.  
Contoh nya , misalkan kalian membuat janji untuk bertemu dengan teman atau saudara, tiba-tiba teman tersebut bertanya pada kalian, bro lu udah dimana ?  
ada tiga kemungkinan dalam kasus ini : dalam perjalanan, sudah sampai atau janji ketemuan dibatalkan. Seperti itulah analogi dari promise ini, ketika melakukan sebuah request asynchronous seperti ajax, maka ada 3 kemungkinan state :  
- Pending (sedang dalam proses)
- Fulfilled ( terpenuhi )
- Rejected ( dibatalkan / gagal)  

Ok gout akan menjelaskannya melalui contoh code dibawah ini : 
buat file javascript baru dengan nama ```index.js```  
```javascript
let promise = false;

const Promises = new Promise((resolve, reject) => {
	if(promise){
		resolve('promises has been kept')
	}else{
		reject('promise not kept')
	}
})

Promises
.then(res => console.log(`Ok ${res} !`))
.catch(res => console.log(`Its Ok ! ${res}`))
```


Outputnya :  

```shell
root@debian:/home/puji122/MyNodeApp/lat-js/promise# ls
index.js
root@debian:/home/puji122/MyNodeApp/lat-js/promise# node .
Its Ok ! promise not kept
root@debian:/home/puji122/MyNodeApp/lat-js/promise# 
```  
Promise pada umumnya digunakan sebagai pengganti alternative callback. Karena disaat menggunakan callback maka kita akan ada kemungkinan dihadapkan pada callbackhell, dari penamaan ajah udah serem bro, secara panggilan neraka.

### Sekilas tentang callback  

Callback sebenarnya adalah function bedanya dengan function pada umumnya adalah di cara eksekusinya. Jika function pada umumnya di eksekusi berurutan dari atas ke bawah maka callback di eksekusi pada point tertentu, itu sebabnya di sebut callback.

Callback disebut juga dengan high-order function. Callback sebenarnya adalah function, bedanya dengan function pada umumnya adalah di cara eksekusinya. Jika function pada umumnya di eksekusi secara langsung sedangkan callback di eksekusi dalam function lain melalui parameter.  

contoh penggunaan callback :  
```javascript
function Start(user, email, callBack){
	console.log(`
		username : ${user} \n
		email : ${email}
	`)

	callBack()
}

function getCallback() {
	console.log('Memanggil method callback')
}

const data = {
	user: "amel2",
	email: "amel_@mail.com",
	method: getCallback
}

Start(data.user, data.email, data.method)
```  
di javascript method itu sendiri merupakan bagian dari object, sehingga kita bisa melakukan pemanggilan method dari sebuah object.  

```shell
root@debian:/home/puji122/MyNodeApp/lat-js/promise# node .

		username : amel2 

		email : amel_@mail.com
	
Memanggil method callback

```  
itulah sekilas tentang callback pada penggunannya dalam proses asynchronous seperti request ajax.  

#### Kembali ke promise  
Di dalam promise biasa juga digunakan saat penggunaan metode request data seperti ajax, penggunaan fetch lebih mudah dibaca dibandingkan dengan ajax di vanilla javascript.  

```javascript
const getUsers = function(url) {
  return 
    new Promise(function(resolve, reject) {
    let req = new XMLHttpRequest()
    req.open('GET', url)

    req.onload = () => {
      if(req.readyState === 4){
        if(req.status === 200){
          resolve(JSON.parse(req.response))
        }else if(req.status === 404){
          reject(Error(req.status))
        }
      }
    }

    req.onerror = () =>{
      reject(Error("Network error"))
    }

    req.send()
  })
} 


getUsers('http://localhost:5000/api/users')
.then((response) => {
  console.log(response)
}, (err) => console.log('Fetch data error : ',err))

```  
Berikut penggunaan ajax request dengan library fetch lebih simple dibandingkan dengan ajax biasa :  
```javascript
import fetch from 'node-fetch'

const Users = new Promise( resolve => {
	resolve(
		fetch('http://localhost:5000/api/users')
	)
})

let loading = ''
Users
.finally(() => {
	setTimeout(() => {
		loading = 'loading ...'
		console.log(loading)
	}, 1500)
})
.then(res => res.json())
.then(users => {
	setTimeout(() => {
		loading = ''
		console.log(loading)
		console.log(users)
	}, 2500)
})
.catch(err => console.log(err))
```  

Output nya :  

```shell
root@debian:/home/puji122/MyNodeApp/lat-js/promise# node index.mjs
loading ...

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
### Menggunakan promise all  
Disatu kala kita bisa saja mempunyai banyak pemrosesan data di aplikasi kita dari pada kita mengulang proses promise berulang kali kita bisa menggunakan promise all untuk menjalankan semua pemrosesan tersebut dalam waktu bersamaan :  

```javascript
import fetch from 'node-fetch'

const Product = new Promise ( resolve => {
  const data = [
      {name: "VueJS Hoodie", price: "150000"},
      {name: "ReactJS tshirt", price: "120000"}
    ]
  resolve(
    data
  )
})

const Users = new Promise( resolve => {
  resolve(
    fetch('http://localhost:5000/api/users')
  )
})

Users
.then(res => res.json())
.then(res => {
  console.log(res)
})

Product
.then(res => {
  console.log(res)
})
```  
Dari kode diatas kita punya dua promise berbeda dan kita akan berulang kali menjalankan promise tersebut, dengan adanya promise all kita bisa menjalankan sekaligus kedua promise tersebut :  

```javascript
Promise.all([Product, Users])
.then(res => {
  const [Product, Users] = res
  console.log(Product)
  console.log(Users)
})
```

Mudah-mudahan bermanfaat dari artikel gout ini yah.

ok sekian dulu dari saya untuk artikel kali ini, nanti kita lanjutkan lagi artikel mengenai tips and trick seputar pemrogramman khususnya web programming  
... see the next articles 

bye :) 


***Salam***

**Puji Ermanto**
