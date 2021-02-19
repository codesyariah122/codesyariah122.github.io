---
layout: post
title:  "Ajax Request Menggunakan Fetch"
author: puji
categories: [ Javascript, VanillaJS ]
image: assets/images/post/fetch.png
tags: [webdevelopment]
opening: بسم الله الرحمن الرحيم
---  

{{page.opening}}  

### Ajax request menggunaka fetch  
Seperti yang telah kita singgung didalam proses promise kita bisa melakukan request ajax didalamnya, dan Penggunaan fetch jadi mempersingkat penulisan code dalam menjalankan ajax request, fetch merupakan sebuah librari dari javascript untuk menjalankan request ajax bandingkan dengan menggunakan vanilla javascript, kalo kalian akrab dengan penggunaan ajax di jquery, kurang lebih ringkasnya sama dengan jquery, dan di artikel-artikel gout sebelumnya gout banyak menggunakan jquery sebagai library javascript, karena tuntutan pekerjaan yang mengharuskan proses development dengan cepat.  

Kalian bisa menambahkan finally untuk menambahkan proses visual pada proses fetch data.  
seperti itulah penggunaan promise dalam menangani request ajax menggunakan fetch.  

bisa dibandingkan dengan proses ajax di vanilla javascript, seperti ini :  

```javascript
import XMLHttpRequest from 'xhr2'

const getUsers = (url, success, error) => {
	let req = new XMLHttpRequest()
	req.open('GET', url)

	req.onload = () => {
		if(req.readyState === 4){
			if(req.status === 200){
				success(req.response)
			}else if(req.status === 404){
				error()
			}
		}
	}

	req.onerror = (err) =>{
		console.log(err)
	}

	req.send()
}

getUsers('http://localhost:5000/api/users', res => {
	const data = JSON.parse(res)
	console.log(data)
}, (err) => console.log(err))
```  

Outputnya kurang lebih sama :  

```shell
root@debian:/home/puji122/MyNodeApp/lat-js/promise# node index.mjs
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
Bisa dibandingkan menggunakan ajax seperti diatas sedikit lebih panjang dalam proses penulisan kode. dibandingkan menggunakan library ```fetch()```.  

```javascript
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
```  
Outputnya masih sama, namun dari segi penulisan kode yang mudah dalam proses maintenance dalam perkembangan yang lebih kompleks lagi.
