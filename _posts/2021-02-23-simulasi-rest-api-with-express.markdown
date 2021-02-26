---
layout: post
title:  "Simulasi Rest Api menggunakan ExpressJS"
author: puji
categories: [ Javascript, NodeJS, ExpressJS ]
image: assets/images/post/express.jpg
tags: [webdevelopment]
opening: بسم الله الرحمن الرحيم
---  

{{page.opening}}  

Assalamualaikum, sobat digital dimanapun berada, salam baca. Semoga kalian semua selalu dalam keadaan sehat selalu, kali ini gout mau sedikit berbagi, yaitu berupa tips trick dan tutorial, kali ini gout akan membahas mengenai proses pembuatan rest api menggunakan framework express js.  

Seperti yang telah ketahui bahwasanya NodeJS telah mengalami perkembangan yang pesat, telah banyak framework yang sudah dibangun dan dikembangkan menggunakan NodeJS ini, salah satu yang paling populer adalah framework ExpressJS, dan kali ini gout akan sedikit mengilustrasikan mengenai membuat rest api di framework express, 
<blockquote>
	Sebagai catatan dalam artikel kali ini gout belum menggunakan database maupun localstorage sebagai sumber data rest-server gout, data ini masih bersifat uji coba menggunakan dummy data.
</blockquote>  

Baiklah ... yuk langsung disimak.  

#### Persiapan rest-server  
Dalam artikel sebelumnya gout telah membahas mengenai framework ExpressJS ini, dalam artikel tersebut masih pembahasan basic, artikel ini merupkan kelanjutan dari series framework expressJS di Blog gout ini. baiklah kita mulai menyiapkan project direktori rest-api kita, kalian bisa menggunakan package manager ```npm``` atau juga ```yarn```, kali ini gout akan mencoba menggunakan ```yarn```, buka terminal atau console kalian : 

kemudian jalankan perintah berikut di terminal :  
1. Buat direktori project
```bash
root@debian:/home/puji122# mkdir -p rest-api
root@debian:/home/puji122# cd rest-api/
```  
Lanjut buka direktori project kalian di code editor kesayangan kalian (cie ... ciee ... kesayangan ! )  

2. Initialisasi package NodeJS  
Untuk menginisialisasi package kalian bisa menggunakan ```npm init``` atau ```npm init -y```, jika menggunakan yarn : ```yarn init``` dan ```yarn init -y```, jika menambahkan option -y berarti kalian melakukan initialisasi package default dari NodeJS, tanpa mengisi option-optionnya sendiri. pastikan koneksi internet kalian On
```bash
root@debian:/home/puji122/rest-api# yarn init
question name (rest-api): 
question version (1.0.0): 
question description: 
question entry point (index.js): app.js
question repository url: 
question author: 
question license (MIT): 
question private: 
success Saved package.json
Done in 139.53s.
```  
Jika sudah maka akan terbentuk file baru di direktori project kalian bernama ```package.json```, yahh file tersebut adalah file yang akan menyimpan konfigurasi dan informasi dari aplikasi yang kalian buat di NodeJS. 

3. Buat file utama project  
Lanjut buat satu file utama untuk membuat konfigurasi dan menjalankan project express kita.  
```bash
root@debian:/home/puji122/rest-api# touch app.js
root@debian:/home/puji122/rest-api# 
```  
4. Insall module-module yang diperlukan  
Selanjutnya adalah menginstall module yang akan kita gunakan untuk membangun sample rest-api ini, masih di terminal kemudian jalankan perintah berikut untuk menginstall package atau module :  
```bash
root@debian:/home/puji122/rest-api#  yarn add express nodemon cors body-parser dotenv
```  
Berikut file ```package.json``` :  
```json
{
  "name": "rest-api",
  "version": "1.0.0",
  "main": "app.js",
  "license": "MIT",
  "type": "module",
  "scripts": {
    "start": "nodemon --experimental-json-modules app.js"
  },
  "dependencies": {
    "body-parser": "^1.19.0",
    "cors": "^2.8.5",
    "dotenv": "^8.2.0",
    "express": "^4.17.1",
    "nodemon": "^2.0.7"
  }
}
```
Buat file ```.env``` file ini bersifat hidden dan berisi baris variable dengan type konstanta, yang di peuntukan menyimpan informasi mengenai konfigurasi data-data bersifat rentan atau rahasia, seperti konfigurasi Database(Host, username, password), dalam artikel kali ini kita belum menggunakan database.  
```bash
root@debian:/home/puji122/rest-api# touch .env
```
5. Buka file .env  
Buka file ```.env``` kemudian berikut isi file ```.env``` gout :  

```text
PORT=8081
ORIGIN='http://localhost:3000'
```  
Origin diatas akan digunakan untuk module ```cors()```, dimana module cors ini akan menghandle akses request dari rest client ke server kita, untuk melihat penggunaan cors kita bisa melihatnya di bagian network coba inspect element :  
```bash
Access-Control-Allow-Origin	http://localhost:3000
```  

6. Buat direktori baru di direktori project rest-api  
Kita bisa saja mengkonfigurasi aplikasi kita dalam satu file saya tapi dalam artikel kali ini gout akan membagi-bagi setiap fungsi sehingga manajemen kode lebih modular, dengan maksud supaya lebih rapih dan mudah dalam memaintenance project kita :  
```bash
root@debian:/home/puji122/rest-api# mkdir -p src/
```  
Di direktori ```src``` tersebut nanti kita menyimpan konfigurasi servernya.  

7. Siapkan file-file di direktori ```src/```  
Berikut file file yang akan kita siapkan di direktori ```src/``` :  

```bash
root@debian:/home/puji122/rest-api/src# ls -l
total 24
-rw-r--r-- 1 puji122 puji122 656 Feb 26 08:40 controller.js
-rw-r--r-- 1 puji122 puji122 656 Feb 26 08:40 index.js
-rw-r--r-- 1 puji122 puji122 185 Feb 26 08:37 listen.js
-rw-r--r-- 1 puji122 puji122 322 Feb 26 08:42 middleware.js
-rw-r--r-- 1 puji122 puji122 648 Feb 26 08:40 model.js
-rw-r--r-- 1 puji122 puji122 258 Feb 26 08:43 router.js
-rw-r--r-- 1 puji122 puji122 159 Feb 26 08:42 server.js
root@debian:/home/puji122/the-rest/src# 
```   
Siapkan file-file dari list file diatas.

#### Lanjut Coding   
Buka kembali code editor kalian, dan buka file yang tadi telah kalian buat, dalam hal ini gout membuat file utama project dengan nama ```app.js```.  
berikut isi file app.js :  
1. file ```app.js```  

```javascript
import dotenv from 'dotenv'
import {Server} from './src/index.js'

dotenv.config()
const port = process.env.PORT

Server(port)
```  
selanjutnya kita buka file-file yang berada di direktori ```src/``` :  
pertama-tama kita buka file ```src/index.js``` :  

```javascript
import Server from './server.js'

export {Server}
```  
setelah itu kita configurasi file file lain di direktori ```src/```  

2. file ```src/server.js```  
Berikut isi file server.js :  
```javascript
import {Listen} from './listen.js'

const Server = (port) => {
	Listen(port, () => {
		console.log(`Halo server sudah berjalan di port : ${port}`)
	})
}
export default Server
```  
3. file ```src/listen.js```  
Berikut isi file nya :  

```javascript
import express from 'express'
import {middleware} from './middleware.js'

export const Listen = (port, next) => {

	const app = express()
	
	middleware(app)

	app.listen(port, next())
}
```  

4. file ```src/middleware.js```  
Di file kita akan menjalankan middleware untuk rest-server kita, diantaranya middleware untuk cors yaitu sebuah modul yang akan menangani akses proxy dari rest-client  

```javascript
import cors from 'cors'
import bodyParser from 'body-parser'
import router from './router.js'

export const middleware = (app) => {
	const corsOption = {
		origin: process.env.ORIGIN
	}
	app.use(cors(corsOption))
	app.use(bodyParser.json())
	app.use(bodyParser.urlencoded({extended: true}))
	app.use('/api/data', router)
}
```  
5. file ```src/router.js``` :  

```javascript
import Router from 'express'
import {getData, getDataById, getDataByPenulis} from './controller.js'

const router = Router()

router.get('/', getData)
router.get('/id/:id', getDataById)
router.get('/penulis/:penulis', getDataByPenulis)

export default router
```  

6. file ```src/controller.js``` :  

```javascript
import { AllData, DataById, DataByPenulis } from './model.js'

export const getData = async(req, res) => {
	try{
		res.status(200).json({
			data: await AllData()
		})
	}catch(err){
		res.status(404).json({
			message: err.message
		})
	}
}

export const getDataById = async(req, res) => {
	const id = req.params.id
	try{
		res.status(200).json({
			data: await DataById(id)
		})
	}catch(err){
		res.status(404).json({
			message: err.message
		})
	}
}

export const getDataByPenulis = async(req, res) => {
	const penulis = req.params.penulis
	try{
		res.status(200).json({
			data: await DataByPenulis(penulis)
		})
	}catch(err){
		res.status(404).json({
			message: err.message
		})
	}
}
```  

7. file ```src/model.js``` :  

```javascript
export const AllData = () => {
	const DataSample = [
		{id: 1, judul: 'Bumi Manusia', genre: 'Roman', penulis: 'Pramoedya Ananta Toer', penerbit: 'Hasta Mitra'},
		{id: 2, judul: 'Tenggelamnya Kapal Van Der Wicjk', genre: 'Roman', penulis: 'Hamka', penerbit: 'Laskar Pustaka'}
	]

	return DataSample
}

export const DataById = (id) => {
	const row = AllData().find(d => d.id == id)
	return (!row) ? [{message: `product with id : ${id} data not found`}] : row
}

export const DataByPenulis = (penulis) => {
	const row = AllData().find(d => d.penulis == penulis)
	return (!row) ? [{message: `Buku dengan penulis : ${penulis} belum ada data`}] : row
}
```  

Sepertinya semua code telah kita buat, di tiap-tiap file, saatnya melakukan uji coba rest-api kita, buka terminal kembali kemudian jalankan project kita :  

```bash
root@debian:/home/puji122/rest-api# yarn start
yarn run v1.22.5
$ nodemon --experimental-json-modules app.js
[nodemon] 2.0.7
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node --experimental-json-modules app.js`
Halo server sudah berjalan di port : 8081

```  
Rest api kita sudah bisa digunakan, untuk melihatnya kita bisa buka di browser kita :  

![rest-api]({{site.url}}/assets/images/post/rest-api-express.png)  

atau kalian bisa mencoba menggunakan postman ataupun curl :  

```bash
root@debian:/home/puji122/rest-api# curl  -H GET http://localhost:8081/api/data
{"data":[{"id":1,"judul":"Bumi Manusia","genre":"Roman","penulis":"Pramoedya Ananta Toer","penerbit":"Hasta Mitra"},{"id":2,"judul":"Tenggelamnya Kapal Van Der Wicjk","genre":"Roman","penulis":"Hamka","penerbit":"Laskar Pustaka"}]}root@debian:/home/puji122/rest-api#
```  

By Id : 
```bash
root@debian:/home/puji122/the-rest# curl  -H GET http://localhost:8081/api/data/id/2
{"data":{"id":2,"judul":"Tenggelamnya Kapal Van Der Wicjk","genre":"Roman","penulis":"Hamka","penerbit":"Laskar Pustaka"}}root@debian:/home/puji122/rest-api# 
```  

By Penulis :  

```bash
root@debian:/home/puji122/rest-api# curl -X GET http://localhost:8081/api/data/penulis/Pramoedya%20Ananta%20Toer
{"data":{"id":1,"judul":"Bumi Manusia","genre":"Roman","penulis":"Pramoedya Ananta Toer","penerbit":"Hasta Mitra"}}root@debian:/home/puji122/rest-api# 
```

ok sekian dulu dari saya untuk artikel kali ini, nanti kita lanjutkan lagi artikel mengenai tips and trick seputar pemrogramman khususnya web programming  
... see the next articles 

bye :) 


***Salam***

**Puji Ermanto**
