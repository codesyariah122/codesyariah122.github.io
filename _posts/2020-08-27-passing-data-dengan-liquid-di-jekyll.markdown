---
layout: post
title:  "Passing data di jekyll dengan liquid dan yaml"
author: puji
categories: [ Jekyll, ruby ]
image: assets/images/post/jekyll-data.jpeg
tags: [jekyll]
opening: بسم الله الرحمن الرحيم
---  

### Liquid data in jekyll  

Hai coders ! apa kabarnya semoga selalu dalam keadaan sehat-sehat selalu.  
dalam artikel kali ini gout mau berbagi sebuat tips mengenai pengolahan data di static site generator jekyll ruby.  
dalam artikel ini gout buat sebuah studi kasus dalam mengelola data static di jekyll, kasus nya dimana gout mau membuat templating untuk navigation di layout static website gout. seperti yang kita tau bahwasanya navigation ini berfungsi sebagai link untuk mengarahkan halaman kita ke sebuah page yang kita klik, dan kemudian mesin browser kita akan mengarahkannya pada view yang telah kita arul polarisasinya.  

##### liquid operasional data  

hal pertama adalah gout membuat sebuah file baru di direktori ```_data/```, biasanya struktur  direktori di jekyll itu seperti ini ...  

```

├── _config.yml
├── _data
│   └── members.yml
	└── navigation.yml
├── _drafts
│   ├── begin-with-the-crazy-ideas.md
│   └── on-simplicity-in-technology.md
├── _includes
│   ├── footer.html
│   └── header.html
├── _layouts
│   ├── default.html
│   └── post.html
├── _posts
│   ├── 2007-10-29-why-every-programmer-should-play-nethack.md
│   └── 2009-04-26-barcamp-boston-4-roundup.md
├── _sass
│   ├── _base.scss
│   └── _layout.scss
├── _site
├── .jekyll-metadata
└── index.html # can also be an 'index.md' with valid front matter
```  
seperti terlihat di struktur data di atas ada direktori ```_data```, di direktori tersebut gout membuat sebauh file baru untuk menyimpan data yang akan di olah nantinya ```_data/navigation.yml```, dengan format YAML. 

* YAML :  
***YAML*** adalah sebuah format serialisasi data yang mengambil konsep dari bahasa-bahasa seperti ```XML, C, PYTHON, perl``` serta format surat elektronik seperti yang tercantum dalam RFC 2822. YAML pertama kali diusulkan oleh Clark Evans pada tahun 2001 [1] yang merancang format ini bersama dengan Ingy döt Net dan Oren Ben-Kiki. YAML tersedia bagi beberapa bahasa dan skrip pemrograman.

Pada awal pengembangannya, YAML dimaksudkan sebagai singkatan dari "Yet Another Markup Language" [2]. Dalam perkembangannya, untuk menegaskan tujuannya yang terfokus pada data dan bukan markah dokumen, YAML diubah menjadi singkatan rekursif dari "YAML Ain't a Markup Language.".  
....begitulah sedikit wiki dari ```YAML``` format.  

* Lanjut lagi  

lanjut lagi ke judul artikel kita mengenai passing data di jekyll menggunakan YAML format. setelah sebelumnya gout membuat sebuah file di ```_data/navigation.yml```, dan isi dari file navigation ini adalah sepert berikut :  

```
- name: Home
  url: /

- name: About
  url: /about/

- name: Project
  url: /project/
```  
file ```navigation.yml``` ini nanti akan kita gunakan di template kita, di sini gout mau pasing data ```navigation.yml``` ini di template utama, yaitu template ```home.html```.  
layout ```_layouts/home.html``` ini akan meng include file di ```_includes/header.html```, seperti ini code dari file ```home.html``` ***yang gout tidak sertakan script langsung disini dikarenakan plugin rouge untuk syntax highlighter gout error*** kalian bisa langsung klik setiap link mengenai script di artikel berikut ke link sumber yang telah gout siapkan sebelumny (silahkan di klik linknya):  

<a href="https://raw.githubusercontent.com/codesyariah122/pujiermanto.netlify.app/with_jekyll/_layouts/home.html">
home.html ( click disini gaes ) 
</a>

* Kemudian isi file ```_includes/header.html``` :  

<a href="https://raw.githubusercontent.com/codesyariah122/pujiermanto.netlify.app/with_jekyll/_includes/header.html">
header.html ( click disini gaes )
</a>

pada dasarnya isi file dari ```header.html``` tersebut adalah file html lengkap untuk polarisasi layouting di aplikasi jekyll gout. dan di file ```header.html``` tersebut terdapat script ***liquid*** yaitu di ```include navbar.html```, script include file navbar ini lah yang menjadi fokus utama di artikel kali ini.

* lanjut lagi ...  
dan selanjutnya kita buka file yang masih berada satu file dengan file ```header.html``` yaitu direktori ```_includes``` kita buka file ```_includes/navbar.html```, berikut isi file ```navbar.html``` :  
<a href="https://raw.githubusercontent.com/codesyariah122/pujiermanto.netlify.app/with_jekyll/_includes/navbar.html">
navbar.html ( click disini gaes )
</a>
 
di file tersebut gout melakukan ```passing data``` dari file yang ada di direktori ```_data/``` yaitu file ```navigation.html``` script liquid berikut yang gout gunakan untuk looping data dari file ```_data/navigation.yml```. dibagian ini lah fokus utama kita di artikel kali ini :  
script ini di beri ```comment (<!-- -->)``` dikarenakan ```syntax highlighter``` gout error, kebetulan gout pakai ```rouge``` mungkin ada kesalahan di settingan plugin gout. intinya fokus utama dari studi kasus di artikel ini terdapat pada syntax liquid seperti di bawah ini:  

<a href="https://raw.githubusercontent.com/codesyariah122/pujiermanto.netlify.app/with_jekyll/_includes/liquid_format.txt">Liquid format for passing data jekyll (click disini gaes)</a>

Ok sekian dulu artikel mengenai jekyll data ini, akhir kata gout ucapkan terima kasih, jangan lupa jaga selalu kesehatan kita. Salam sukses selalu.


By. Puji Ermanto



