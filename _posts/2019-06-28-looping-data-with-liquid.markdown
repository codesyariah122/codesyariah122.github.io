---
layout: post
title:  "Create pagination on jekyll posts list and post single page"
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
> Dari artikel sebelumnya isi dari file ```home.html``` sudah kita dapatkan dan disana pun sudah terdapat format liquid di bagian ```{% include home.html %}``` yang bertindak untuk memanggil file lain dari direktori ```_includes/```.  

Sekarang akan kita manfaatkan untuk mencetak dati dari file ```_config.yml``` dan kita akan menambahkan data baru di ```front matter``` file ```home.html``` , dan kita bisa lakukan nya seperti ini :  

<pre>
```html
---
layout: index
nama: Puji Ermanto
email: puji122_bandung@gmail.com
jobdesk: Frontend Developer
---
{% include home.html %}

<h4> Data dari file _config.yml : </h4>
<ul>
	<li>Nama : {{site.author}} </li>
	<li>Email : {{site.email}} </li>
	<li>Jobdesk : {{site.jobdesk}} </li>
</ul>

<h5>Dan ini data dari page home.html(file ini sendiri)</h5>
<ul>
	<li>Nama : {{page.author}} </li>
	<li>Email : {{page.email}} </li>
	<li>Jobdesk : {{page.jobdesk}} </li>
</ul>
```  
</pre>

terlihat sedikit perbedaannya bukan, untuk mencetak sebuah data dari file lain seperti file ```_config.yml``` kita membutuhkan sebuah key ```{{site}}``` sedangkan untuk mencetak data dari page itu sendiri kita tinggal menggunakan key ```{{page}}```. Mudah bukan menggunakan liquid ini, simple yah mudah di fahami sekalipun oleh awam seperti saya.  

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

<pre>
```html
---
layout: index
nama: Puji Ermanto
email: puji122_bandung@gmail.com
jobdesk: Frontend Developer
---  

{% include home.html %}


{% assign menus = site.data.menus %}

<ul>
	{% for menu in menus %}
	<li><a href="{{menu.link}}">{{menu.label}}</a></li>
	{% endfor %}
</ul>

```  
</pre>

Dari file diatas akan saya jelaskan sedikit, di file tersebut terdapat tag ```{% assign %}``` tag ini disediakan jekyl sebagai sarana menampung sebuah nilai jika dalam javascript sama dengan ```let```, ```const``` atau ```var``` key tersebut berguna untuk menampung sebuah nilai baru.  
kemudian selanjutnya liquid juga menyediakan tag untuk looping sebuah data kita bisa melakukannya untuk sebuah perulangan data yang lebih efisiensi dalam pengembangan sebuah aplikasi. Tag tersebut bisa kita lihat di bagian ```{% for %} {% endfor %}```. 
Berikut adalah link documentation liquid jekyll : <a href="https://jekyllrb.com/docs/liquid/">Liquid Docs</a>.  

Ok lah saya akhiri saja artikel kali ini, mohon maaf jika ada kekurangan dan kesalahan kata.  

**wassalaam**  

***Puji Ermanto***




