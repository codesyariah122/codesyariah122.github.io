---
layout: post
title:  "Menggunakan plugin tailwind css dan plugin postcss untuk styling di gatsbyJS"
author: puji
categories: [ GatsbyJS, React, Javascript, tailwindcss ]
image: assets/images/post/tailwindcss.png
tags: [fullstack_developer]
opening: بسم الله الرحمن الرحيم
---  


### Menggunakan tailwind css di gatsby  
salam jumpa lagi para coders ! semoga selalu sehat, udah mulai musim penghujan sepertinya, jangan lupa jaga kesehatan. jangan banyak begadang yah coders ! .... hehehehe.  

dalam artikel kali gout berkesempatan untuk membahas tailwind css, apa itu tailwind ? 

dalam hal ini gout asumsikan para coders sudah mengenal basic css (cascading stylesheet) standart, contohnya : 

```
<!DOCTYPE html>
<html>
<head>
	<title></title>

<!-- ini contoh penulisan css internal -->
<style>
	h1{
		color: coral;
	}
</style>

<!-- dan ini contoh css external ( dipisah di file lain ) -->
<link href="style.css" type="text/css" rel="stylesheet"/>

</head>

<body>

	<!-- ini contoh penulisan css inline didalam sebuah tag html -->
	<h1 style="color:coral;">Ini Warna Merah</h1>

</body>
</html>
```
```
<!-- ini file css external nya -->
h1{
	color: coral;
}
```  
code diatas menghasilkan efek yang sama jika dijalankan di browser, itu adalah basic standart css, tentunya tidak cuma hanya mengganti warna dari text saja, namun banyak element-element yang bisa dimanipulasi dengan css ini. diartikel ini gout tidak akan membahas secara detail, silahkan coders explore sendiri.  

***tailwind css***  
dalam artikel ini gout akan langsung saja membahas penggunaan tailwind di gatsbyJS, melanjutkan artikel mengenai gatsby yang sebelumnya. ok langsung aja kita eksekusi di instruksi berikut : 

pertama kita install dulu plugin tailwindcss di gatsby : 
```
npm install tailwindcss --save-dev
```  
setelah terinstall coba coders check file ```package.json``` cek apakah tailwindcss sudah terinstall .

seperti ini file package.json jika tailwindcss berhasil di install.
```
"devDependencies": {
	"tailwindcss": "^1.6.2",
}
```  
*selanjutnya* kita eksekusi code berikut untuk mengaktifkan package tailwind
```
npx tailwindcss init
```  

***kemudian*** install package postCSS plugin gatsby : 
```
npm install --save gatsby-plugin-postcss
```  

setelah itu buka file ```gatsby-config.js``` dan tambahkan package plugin postcss yang tadi telah diinstall  dengan configurasi sebagai berikut : 

```
{
	resolve: 'gatsby-plugin-postcss',
		options: {
		postCssPlugins: [
			require("tailwindcss"),
			require("autoprefixer"),
			require("./tailwind.config.js"),
		],
	},
},
```  
selanjutnya perhatikan directory root, jika ada file  ```postcss-config.js``` , buka file tersebut kemudian tambahkan configurasi berikut ini :  
```
module.exports = () => {
	plugins: [require("tailwindcss")],
}
```  
selanjutnya perintah ini untuk menambahkan librari css di javascript yang sudah di install : 

```
npm install -D twin.macro @emotion/core @emotion/styled gatsby-plugin-emotion
```  
import tailwindcss ke component style : 
buat file baru di direktori root dengan nama ```gatsby-browser.js``` kemudian import css tailwind : 

```
import "./src/styles/globals.css"
```  
aktifkan gatsby emotion plugin di file ```gatsby-config.js``` :  
```
'gatsby-plugin-emotion',
```  
selanjutnya untuk mengaktifkan component styling gunakan ```twin.macro``` :  

contohnya sepert ini : 
```
const IndexPage = ({ data }) => {

	let Button = styled.button`${tw`bg-blue-500 hover:bg-blue-800 text-white p-2 rounded`}` 

	return (
		<Layout>
			<h1>Welcome in my <Emoji symbol="🏕"/> </h1>
				<Img className={indexStyles.imgHeader} fixed={data.file.childImageSharp.fixed} alt="" />
					<h2>I'am Puji Ermanto <br/>Just ! .... <br/> 
					<Emoji symbol="🏗"/> a full-stack developer</h2>
				<p>Are you need a developer ? <Link class="text-red-400" to="/contact"><Button>Contact Me</Button></Link></p>

		</Layout>
	)
}
```  
![tailwind-gatsby]({{site.url}}/assets/images/post/gatsby-tailwind.gif)  

coders semua bisa lihat dokumentasi mengenai <a href="https://github.com/ben-rogerson/twin.macro/blob/master/docs/emotion/gatsby.md"/>Twin + Gatsby + Emotion installation guide</a>, untuk melihat detaik informasi mengenai penggunaan twin.macro gatsby.  

**berikutnya** ***menggunakan sass di gatsby***  
Install the Gatsby SCSS plugin : 

```
npm install --save node-sass gatsby-plugin-sass
```  
untuk dapat menggunakan class tailwind di css kita, tambahkan paket tailwindcss ke dalam parameter postCSS plugins di file ```gatsby-config.js```  : 

```
{
	resolve: 'gatsby-plugin-postcss',
		options: {
			postCssPlugins: [
				require("tailwindcss"),
				require("autoprefixer"),
				require("./tailwind.config.js"),
			],
	},
},
```  
*Note:* Secara opsional, Anda dapat menambahkan file konfigurasi yang sesuai (secara default adalah tailwind.config.js). Jika Anda menambahkan konfigurasi khusus, Anda harus memuatnya setelah tailwindcss.  

***selanjutnya tambahkan parameter tailwind***  
kita bisa mengkostumisasi class class tailwind dengan class yang kita inginkan, untuk dapat menggunakan tailwind import tailwind ke css yang kita gunakan : 
buat file baru jika belum ada, di artikel ini gout menggunakan file dengan nama ```globals.scss``` : 

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```  
sekarang kita bisa menggunakan class tailwindcss secara langsung di tag html dalam state kita. atau coders bisa menambahkan class baru di file ```globals.scss``` : 
```
@import popup.css body {
  @apply bg-purple-200;
}
```  
kemudian buat file baru di root jika belum ada file ```gatsby-browser.js```, import rule css dari file globals.scss :  

```
import "./src/css/index.css"
```  
ok coders kalian, bisa explore tailwindcss. 


akhirnya gout cukupkan sampai disini artikel ini, nanti mungkin di lanjut mengenai ```purgecss```, ok sekian dulu artikel kali ini, akhir kata gout ucapkan terima kasih, semoga coders semua selalu diberikan nikmat, sehat, dan nikmat waktu luang. jangan lupa jaga stabilitas kesehatan diri kita. ok sekian.

waasalamm....

***puji ermanto***  

