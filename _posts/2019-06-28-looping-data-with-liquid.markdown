---
layout: post
title:  "Looping data with liquid jekyll"
author: puji
categories: [ Jekyll, ruby ]
image: assets/images/post/jekyll-liquid.png
tags: [jekyll]
opening: بسم الله الرحمن الرحيم
---  

{{page.opening}}  

### Liquid template formating  

apa itu liquid ?  
Liquid adalah sebuah template formating, yang disediakan jekyll saat pertama kita melakukan installasi jekyll sebagai static site generator.  
Ada bermacam-macam template formating yang mendunia diantaranya :  

ada ```jade atau pug``` untuk pengguna node.js ada ```blade``` untuk pengguna laravel, dan salah satunya yang akan kita bahas di artikel ini adalah ```liquid```. Sebuah template formating sangat bermanfaat untuk kemudahan dalam proses developing dan building sebuah aplikasi, dalam hal ini yang akan saya bahas mengenai template formating di static site jekyll.  

### Example liquid  

Daalam artikel kali ini saya akan membahas penggunaan liquid dalam skala basic, cukup mudah ko dan liquid ini sudah bisa langsung kita gunakan dalam skala basic sebuah static site di jekyll.  

contoh kita akan menggunakan data dari file configuration jekyll kita ```_config.yml```  

misalkan untuk data yang telah di assignment di ```_config.yml``` :  

example ```_config.yml``` :  

```yml
---
author: Puji Ermanto
email: pujiermanto@gmail.com
jobdesk: Web Developer
```  

Saya mau menggunakan data tersebut di dalam page, sebagai contoh kita gunakan layout default yaitu file yang menjadi layout utama aplikasi jekyll kita.  

file : ```_layout/home.html```  
> Dari artikel sebelumnya isi dari file ```home.html``` sudah kita dapatkan dan disana pun sudah terdapat format liquid di bagian &#123;% include home.html %&#125; yang bertindak untuk memanggil file lain dari direktori ```_includes/```.  

Sekarang akan kita manfaatkan untuk mencetak dati dari file ```_config.yml``` dan kita akan menambahkan data baru di ```front matter``` file ```home.html``` , dan kita bisa lakukan nya seperti ini :  

<a href="http://rouge.jneen.net/v3.26.0/markdown/LS0tCmxheW91dDogaW5kZXgKbmFtYTogUHVqaSBFcm1hbnRvCmVtYWlsOiBwdWppMTIyX2JhbmR1bmdAZ21haWwuY29tCmpvYmRlc2s6IEZyb250ZW5kIERldmVsb3BlcgotLS0KeyUgaW5jbHVkZSBob21lLmh0bWwgJX0KCjxoND4gRGF0YSBkYXJpIGZpbGUgX2NvbmZpZy55bWwgOiA8L2g0Pgo8dWw-Cgk8bGk-TmFtYSA6IHt7c2l0ZS5hdXRob3J9fSA8L2xpPgoJPGxpPkVtYWlsIDoge3tzaXRlLmVtYWlsfX0gPC9saT4KCTxsaT5Kb2JkZXNrIDoge3tzaXRlLmpvYmRlc2t9fSA8L2xpPgo8L3VsPgoKPGg1PkRhbiBpbmkgZGF0YSBkYXJpIHBhZ2UgaG9tZS5odG1sKGZpbGUgaW5pIHNlbmRpcmkpPC9oNT4KPHVsPgoJPGxpPk5hbWEgOiB7e3BhZ2UuYXV0aG9yfX0gPC9saT4KCTxsaT5FbWFpbCA6IHt7cGFnZS5lbWFpbH19IDwvbGk-Cgk8bGk-Sm9iZGVzayA6IHt7cGFnZS5qb2JkZXNrfX0gPC9saT4KPC91bD4">home.html</a>  


Terlihat sedikit perbedaannya bukan, untuk mencetak sebuah data dari file lain seperti file ```_config.yml``` kita membutuhkan sebuah key &#123;&#123; site &#125;&#125; sedangkan untuk mencetak data dari page itu sendiri kita tinggal menggunakan key &#123;&#123; page &#125;&#125;. Mudah bukan menggunakan liquid ini, simple yah mudah di fahami sekalipun oleh awam seperti saya.  

**Contoh lagi :**  

Misalkan kita punya sebuah data baru yang kita simpan di direktori ```_data/```, misalnya kita buat sebuah data baru untuk navigasi, bisa menggunakan ```yml``` ataupun ```json``` disini saya gunakan dulu untuk ```yml``` :  

file: ```_data/menus.yml```  

```yml
- label: "Home"
  link: "/"

- label: "Projects"
  link: "/project"

- label: "Myrooms"
  link: "/myrooms"

- label: "Authors"
  link: "/authors"

- label: "Contact"
  link: "/contact"
```  
file tersebut berisi beberapa deskripsi data untuk membuat sebuah navigasi bar atau menu, dan kita akan gunakan di file page yang sama yaitu file ```_includes/home.html``` kita bisa menggunakannya seperti ini :  

file : ```_includes/home.html```  

<a href="http://rouge.jneen.net/v3.26.0/markdown/LS0tCmxheW91dDogaW5kZXgKbmFtYTogUHVqaSBFcm1hbnRvCmVtYWlsOiBwdWppMTIyX2JhbmR1bmdAZ21haWwuY29tCmpvYmRlc2s6IEZyb250ZW5kIERldmVsb3BlcgotLS0gIAoKeyUgaW5jbHVkZSBob21lLmh0bWwgJX0KCgp7JSBhc3NpZ24gbWVudXMgPSBzaXRlLmRhdGEubWVudXMgJX0KCjx1bD4KCXslIGZvciBtZW51IGluIG1lbnVzICV9Cgk8bGk-PGEgaHJlZj0ie3ttZW51Lmxpbmt9fSI-e3ttZW51LmxhYmVsfX08L2E-PC9saT4KCXslIGVuZGZvciAlfQo8L3VsPg">home.html</a>  

Dari file diatas akan saya jelaskan sedikit, di file tersebut terdapat tag &#123% assign %&#125 tag ini disediakan jekyl sebagai sarana menampung sebuah nilai jika dalam javascript sama dengan ```let```, ```const``` atau ```var``` key tersebut berguna untuk menampung sebuah nilai baru.  
kemudian selanjutnya liquid juga menyediakan tag untuk looping sebuah data kita bisa melakukannya untuk sebuah perulangan data yang lebih efisiensi dalam pengembangan sebuah aplikasi. Tag tersebut bisa kita lihat di bagian &#123;% for %&#125; &#123;% endfor %&#125;. 
Berikut adalah link documentation liquid jekyll : <a href="https://jekyllrb.com/docs/liquid/">Liquid Docs</a>.  

Ok lah saya akhiri saja artikel kali ini, mohon maaf jika ada kekurangan dan kesalahan kata.  

**wassalaam**  

***Puji Ermanto***




