---
layout: post
title:  "Build Node.js app with Heroku"
author: puji
categories: [ NodeJS, Javascript ]
image: assets/images/post/heroku.png
tags: [fullstack_developer]
opening: بسم الله الرحمن الرحيم
---  

![heroku1]({{site.url}}/assets/images/post/heroku2.png) 

## Sekilas Heroku  
Heroku adalah platform cloud sebagai layanan (PaaS) yang mendukung beberapa bahasa pemrograman . Salah satu platform cloud pertama, Heroku telah dikembangkan sejak Juni 2007, saat itu hanya mendukung bahasa pemrograman Ruby , tetapi sekarang mendukung Java , Node.js , Scala , Clojure , Python , PHP , dan Go . [1] [2] Karena alasan ini, Heroku dikatakan sebagai platform poliglot karena memiliki fitur bagi pengembang untuk membangun, menjalankan, dan menskalakan aplikasi dengan cara yang sama di sebagian besar bahasa. Heroku diakuisisi oleh Salesforce.com pada tahun 2010 seharga $ 212 juta. (sumber wiki)
### Sejarah  
Heroku awalnya dikembangkan oleh James Lindenbaum , [4] Adam Wiggins, [5] dan Orion Henry [6] untuk mendukung proyek-proyek yang kompatibel dengan platform pemrograman Ruby yang dikenal sebagai Rack . [7] Pengembangan prototipe memakan waktu sekitar enam bulan. Belakangan, Heroku menghadapi kekurangan karena kurangnya pelanggan pasar yang tepat karena banyak pengembang aplikasi menggunakan alat dan lingkungan mereka sendiri. [ Rujukan? ] Pada bulan Januari 2009, platform baru diluncurkan yang dibangun hampir dari awal setelah upaya tiga bulan. Pada Oktober 2009, Byron Sebastian bergabung dengan Heroku sebagai CEO. [8] Pada 8 Desember 2010, Salesforce.com mengakuisisi Heroku sebagai anak perusahaan yang sepenuhnya dimiliki oleh Salesforce.com. Pada 12 Juli 2011, Yukihiro "Matz" Matsumoto , kepala desainer bahasa pemrograman Ruby , bergabung dengan perusahaan sebagai Kepala Arsitek, Ruby. [9] Di bulan yang sama, Heroku menambahkan dukungan untuk Node.js dan Clojure . Pada 15 September 2011, Heroku dan Facebook memperkenalkan Heroku untuk Facebook. [10] Saat ini Heroku mendukung database Redis [11] [12] selain PostgreSQL standarnya. [13]  

seperti itulah mengenai heroku dalam intisari singkat diatas. Heroku adalah sebuah PasS(Platform as a Service).
#### Deploy aplikasi Node.js with Heroku
**Assalamuallaikumm**...  
Apa kabarnya sobat coders semua ? semoga selalu dalam keadaan sehat-sehat semuanya.  
kali ini gout mau berbagi tips ataupun trick mengenai Node.js salah satu programming language yang sedang berkembang pesat dijagat developer.  
buat kalian yang baru pertama belajar Node.js, sama seperti gout yang mengalami kebingungan dikala ingin menghosting aplikasi yang sudah kita buat dalam masa pembelajaran Node.js ini.  
kalian tidak perlu risaw kawan, hehehe. karena sekarang ini tidak ada yang tidak mungkin, semua pertanyaan ada jawabannya, semua kesulitan pasti ada jalan keluar :) .  

**tenangkan pikiran** fokus kedepan kita melangkah (halahhhh apaan sih, to the point aje brooo).  
Ok kita langsung cuuuusss praktek, kita akan mempublish karya kita yang berupa aplikasi sederhana yang berbasis Node.js sebagai programming language nya. yoiiii cuuss langsung aksess ke link berikut:  
<a href="https://www.heroku.com/">Heroku </a> langsung klik ajah,  
lanjut sobat bisa buat free account dengan signup terlebih dahulu, untuk bisa mendapatkan layanan akses dari heroku yang berupa server virtual machine. sama kaya aws gitu atau layanan serupa lainnya kaya netlify.  

#### Selanjutnya  
setelah membuat akun langsung akses dashboard heroku sobat, seperti ini tampilan dashboard nya :  
![heroku_node1_]({{site.url}}/assets/images/post/heroku/heroku1.png)
![heroku_node1_]({{site.url}}/assets/images/post/heroku/heroku2.png) 
pilih salah satu virtual machine yang tersedia sepertinya semua lokasi server nya sama, jadi sobat bebas pilih vm yang manapun bisa sobat sesuaikan, setelah memilih vm, kalian bisa ubah nama vm nya agar lebih mudah dalam maintenance kedepannya.

#### Jalankan Heroku  
Setelah mesin virtual dipilih dan telah disesuaikan nama dan settingan lainnya dengan keinginan
![heroku_node1_]({{site.url}}/assets/images/post/heroku/heroku3.png)  
sobat, sobat bisa langsung configurasi repo baru untuk applikasi yang akan kita bangun di vm heroku. buka terminal kemudian jalankan :  
```
heroku login
```  
![heroku_node1_]({{site.url}}/assets/images/post/heroku/heroku4.png)
setelah itu autentikasikan login anda ada berupa link url dibawahnya kemudian klik kanan open link
![heroku_node1_]({{site.url}}/assets/images/post/heroku/heroku5.png) 
kemudian buka dibrowser kalian  
![heroku_node1_]({{site.url}}/assets/images/post/heroku/heroku6.png)  
klik login, untuk melanjutkan autentikasi heroku kalian.  
![heroku_node1_]({{site.url}}/assets/images/post/heroku/heroku7.png)  

#### Selanjutnya  
Selanjutnya adalah membuat direktori project baru di mesin lokal atau di desktop kalian  
```
$ mkdir -p jhony-thunder
$ chmod -R 777 jhony-thunder/.*
$ cd jhony-thunder/
```
<small style="color:crimson;">(Nama project gout adalah **jhony-thunder**)</small>  
kemudian lakukan initialisasi dan remote untuk repo aplikasi heroku kalian  

```
root@debian:/home/puji122/jhony-thunder/# git init
root@debian:/home/puji122/jhony-thunder/# heroku git:remote -a jhony-thunder
```  
![heroku_node1_]({{site.url}}/assets/images/post/heroku/heroku10.png)  

setelah itu buat sebuah file baru
```
root@debian:/home/puji122/jhony-thunder/# touch app.js 
```
kemudian kita initialisasi package aplikasi Node.js kita
```
root@debian:/home/puji122/jhony-thunder/# npm init 
```  
isi beberapa opsi yang tersedia, lanjut install nodemon sebagai interpreter untuk menjalankan aplikasi Node.js kita.
```
root@debian:/home/puji122/jhony-thunder/# npm install nodemon --save
```  
ok sekarang kalian bisa build aplikasi Node.js seperti biasanya. karena environment developing nya sudah kita siapkan.  
sebagai contoh kita akan membuat request http sederhana di Node.js, buka code editor visual code, kemudian mulai coding untuk aplikasi sederhana kita.
```
const server = require('http')
const PORT = process.env.PORT || 3000
const app = server.createServer((req, res) => {
    res.write(`<h1>Hallo World</h1>`)
    res.end()
}).listen(PORT, () => {
    console.log(`app is running on port ${PORT}`)
})
```  
![heroku_node1_]({{site.url}}/assets/images/post/heroku/heroku10.png)  
untuk uji coba kita bisa buka terminal di **vscode** dengan menekan shortcutkey (ctrl+`), kemudian jalankan kembali command heroku :  

```
root@debian:/home/puji122/jhony-thunder# heroku local web 
```  
![heroku_node1_]({{site.url}}/assets/images/post/heroku/heroku13.png)  
kemudian akses browser kalian sesuai port yang diberikan (localhost:5000) biasanya.  
![heroku_node1_]({{site.url}}/assets/images/post/heroku/heroku14.png)  

## Publish ke heroku  
Ok setelah berjalan di mesin lokal kita, sekarang waktunya mempublish aplikasi kita, langsung saja buka terminal lagi 
```
root@debian:/home/puji122/jhony-thunder# git add .
root@debian:/home/puji122/jhony-thunder# git commit -am "My Application With Heroku"
root@debian:/home/puji122/jhony-thunder# git push heroku master 
```  
![heroku_node1_]({{site.url}}/assets/images/post/heroku/heroku16.png)  

**Proses Deployment Success**
Aplikasi kita sudah di deploy ke publish server virtual machine heroku kita, kalian sudah bisa mengakses url aplikasi kalian sekarang .
![heroku_node1_]({{site.url}}/assets/images/post/heroku/heroku17.png)  

Ok sekian dulu tips and trick gout kali ini, mohon maaf jika ada kekurangan, dan semoga bermanfaat.
akhir kata gout ucapkan.  

***Wassalaam***