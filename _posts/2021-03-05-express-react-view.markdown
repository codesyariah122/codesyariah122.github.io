---
layout: post
title:  "Template Engine Express React Views"
author: puji
categories: [ Javascript, NodeJS, ExpressJS ]
image: assets/images/post/react.png
tags: [webdevelopment]
opening: بسم الله الرحمن الرحيم
---  

{{page.opening}}  

Assalamualaikum, sobat digital dimanapun berada, salam baca. Semoga kalian semua selalu dalam keadaan sehat selalu, pembahasa artikel kali ini masih seputar javascript. Gout akan sedikit membahas mengenai salah satu template engine untuk framework NodeJS diartikel ini gout akan sedikit mengupas mengenai template engine ```express-react-views```.   

ini merupakan solusi menggunakan ReactJS sebagai template engine, Ok tanpa terlalu berteori di artikel ini, kita langsung saja mencoba template engine react ini di framework express kita.  

Sebelumnya pastikan terlebih dahulu bahwa kalian menggunakan framework express dan express kalian sudah berjalan dari sisi server.  
selanjutnya kita akan install package nya :  

```bash
# yarn add express-react-view @babel/preset-env @babel/preset-react history react react-dom react-router-dom
```  

Kemudian di file utama atau di bagian middleware kalian tambahkan beberapa konfigurasi untuk menyiapkan template engine ReactJS ini.  

***Bagian middleware : ***  

```javascript
import express from 'express'
import path, {dirname} from 'path'
import {fileURLToPath} from 'url'
import React from 'express-react-view'


const __dirname = dirname(fileURLToPath(import.meta.url))

const reactOption = {
	beautify: true,
		babel: {
			presets: [
				'@babel/preset-react', 
				[ '@babel/preset-env', 
					{'targets': 
						{
							'node': 'current'
						}
					}
				]
			]
		}
	}

app.use(express.static('public'))

app.engine('jsx', React.createEngine(reactOption))
app.set('view engine', 'jsx')
app.set('views', path.join(__dirname, 'views'))
```  

Setelah itu kita bisa menggunakan ```jsx``` untuk file views express kita.  

***bagian views : ***  

file : ```views/index.jsx```  

```javascript
import React, {Fragment} from 'react'
import {OtherComponents} from './DirComponent'

const Home = props => {
	return (
		<h2>{props.title}</h2>
	)
}

export default Home
```  

Kita bisa menggunakan props, dan props ini sifatnya dynamic bisa berupa data dari api ataupun dari controllers di express framework kita.



ok sekian dulu dari saya untuk artikel kali ini, nanti kita lanjutkan lagi artikel mengenai tips and trick seputar pemrogramman khususnya web programming  
... see the next articles 

bye :) 


***Salam***

**Puji Ermanto**
