---
layout: post
title:  "Menambahkan package plugin emojis di gatsby"
author: puji
categories: [ GatsbyJS, React, Javascript ]
image: assets/images/post/gatsby-remark-emojis.png
tags: [fullstack_developer]
opening: بسم الله الرحمن الرحيم
---  


### Menggunakan package emojis dari gatsby react  
dalam artikel ini sebetulnya pembahasan nya bukan sesuatu yang serius, pembahasan kali ini hanya sekedar sebuah hal sederhana, simple dan mungkin tidak begitu penting juga buat para coders semua. hehehe  

#### Gatsby Remark Emojis  
langsung ajah buka terminal baru atau jika menggunakan ```visual studio code``` bisa langsung aktifkan terminal editornya.  
langsung kita install package emoji nya : 
```shell
npm install --save gatsby-transformer-remark
npm install --save gatsby-remark-emojis 
```   
cek file ```package.json``` di bagian ```"dependencies"``` jika ada bagian ini ```"gatsby-remark-emojis": "^0.4.3,"``` dan ```"gatsby-transformer-remark": "^2.3.8",```, berarti package *Gatsby Remark Emojis* sudah berhasil terinstall, kita tinggal melanjutkan dari sisi configurasi dan kemudian menggunakan nya di state yang kita inginkan.  
***buka file ```gatsby-config.js```* kemudian tambahkan configurasi untuk dependencies ***Gatsby Remark Emojis*** dibawah , seperti ini :  

```
 {
	    	resolve: 'gatsby-transformer-remark',
	    	options: {
	    		plugins: [{
	    			resolve: 'gatsby-remark-emojis',
			        options: {
			          // Deactivate the plugin globally (default: true)
			          active : true,
			          // Add a custom css class
			          class  : 'emoji-icon',
			          // In order to avoid pattern mismatch you can specify
			          // an escape character which will be prepended to the
			          // actual pattern (e.g. `#:poop:`).
			          escapeCharacter : '#', // (default: '')
			          // Select the size (available size: 16, 24, 32, 64)
			          size   : 64,
			          // Add custom styles
			          styles : {
			            display      : 'inline',
			            margin       : '0',
			            'margin-top' : '1px',
			            position     : 'relative',
			            top          : '5px',
			            width        : '25px'
			          }
			        }
	    		}]
	    	}	
	    }
```  
***selanjutnya!*** kita bisa gunakan di state page kita yang berada di direktori ```src/```, buka file page kita disini gout akan menggunakan nya di halaman ```index.js```.  

*buat file baru untuk menangkap nilai emojis ```src/emoji.js* :  

```javascript
// file emoji.js : 
import React from 'react'

const Emoji = props => (
	<span 
		className="emoji" role="img" aria-label={props.label ? props.label : ""} aria-hidden={props.label ? "false" : "true"}>
		{props.symbol}
	</span>
)

export default Emoji
```  
*Kemudian buka file ```index.js```:*  
```javascript
import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'

import Emoji from './emoji.js'


const IndexPage = () => {
	return (
		<Layout>
			<h1>Welcome in my <Emoji symbol="🏡"/> </h1>
			<h2>I'am Puji Ermanto .... Just ! <br/>
			<Emoji symbol="🏗"/> a full-stack developer</h2>
			<p>Are you need a developer ?  <Link to="/contact">Contact Me</Link></p>
		</Layout>
		)
}

export default IndexPage
```  
dari file ```index.js``` highlight bagian ```<Emoji symbol=" "/>``` ini adalah tag untuk menyimpan nilai emoji, kalian bisa costum sesuai keinginan emoji apa yang kalian sukai, atau bisa lihat link di bawah ini :  

* <a href="https://github.com/matchilling/gatsby-remark-emojis/blob/master/emoji.md">Gatsby Remark Emojis</a>
* <a href="https://www.w3schools.com/charsets/ref_emoji.asp">W3 School Emoji icon</a>  

Ok sekian dulu artikel kali ini, akhir kata gout ucapkan terima kasih, semoga coders semua selalu diberikan nikmat, sehat, dan nikmat waktu luang. jangan lupa jaga stabilitas kesehatan diri kita. ok sekian.

waasalamm....

***puji ermanto***  

