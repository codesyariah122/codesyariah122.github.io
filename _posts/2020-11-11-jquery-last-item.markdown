---
layout: post
title:  "Penggunaan jQuery last untuk mengambil element terakhir"
author: puji
categories: [ Javascript, JQuery ]
image: assets/images/post/jquery_last1.png
tags: [webdevelopment]
opening: بسم الله الرحمن الرحيم
---  

{{page.opening}}


# Assalamualaikum  

Halo apa kabar para coders ? sudah lama tidak posting, hampir 2 bulan lamanya dan sekarang alhamdulillah bisa nulis lagi di blog ini. Biasa lah gaess, sibuk sama kerjaan jadwal padat 😁 .  
di postingan kali ini gout mau sedikit berbagi pengalaman mengenai penggunaan jquery, seperti yang sudah di ketahui sejak lama jquery merupakan sebuah library javascript yang banyak kegunaannya, kalau kata lagu mah ( cucunya segudang ) 😁, tapi di artikel ini gout tidak akan membahas lagunya, ( ya udah sihhh !!! ).  

walaupun sebetulnya dihari ini jquery sudah kalah pamornya oleh library javascript lainnya, tapi buat gout jquery masih tetap di pakai dan gout selalu gagal move on dari jquery. 
dalam artikel ini gout mau membahas salah satu method dari jquery yakni ```last()```, penggunaan last ini sendiri adalah untuk mengambil sebuah nilai di akhir sebuah element array, singkat nya kita mau ambil nilai terakhir dari sebuah element di dalam array.  

dalam studi kasus ini gout punya sebuah template yang mempunyai navbar, jadi template nya ini adalah sebuah theme wordpress, karena di wordpress untuk menambahkan sebuah menu itu ada di bagian beckend adminnya, nah gimana kalau kita memerlukan tambahan menu baru di luar menu yang sudah kita atur di beckend admin nya. maka dari itu kita memerlukan jquery untuk melakukan dom object element. dengan memasukan element baru, ke dalam element yang sudah ada.  

ini gambar dari website yang bagian menu di navigasi nya akan gout manipulasi dengan menambahkan satu object element baru di luar navigasi menu nya. 

![jquery_last]({{site.url}}/assets/images/post/jquery_last2.png)  

nah dari gambar itu ada bagian menu yang menu terakhirnya yaitu *contact*, setelah menu *contact* itu gout mau menambahkan sebuah button ( tombol ), yah gout harus menggunakan jquery untuk menyisipkan element baru di akhir element menu itu. 

jadi gout menambahkan script baru dengan code seperti berikut, sebelumnya kita seleksi dulu class di bagian menu, dari navigasi di template tersebut di dapati class untuk menu nya adalah ```menu-item``` sebuah class navbar milik bootstrap. 
jadi di dalam script code nya seperti ini 

```javascript 
// assignment ke dalam sebuah object
// pakai variable biasa juga bisa, kebetulan disini gout pakai object karena gout bisa menambahkan element-element lainnya

const object = {
	'menuItem' : $('.menu-item'),
};

// lakukan proses dom object baru ke dalam navigasi menu yang class nya sudah kita seleksi
// menggunakan method last() untuk mendeteksi element terakhir, kemudian dom element terakhir setelahnya dengan method after()
object.menuItem.last().after(
    `
            <a href="#" class="menu-item btn btn-success tombol">join us</a>
    `
);

```  
maka hasilnya seperti ini :  

![jquery_last]({{site.url}}/assets/images/post/jquery_last1.png)  

terlihat bertambah satu buat element baru setelah menu terakhir *Contact*, dan itu hasil dari dom element dengan jquery.   

semoga tulisan gout kali ini bermanfaat, akhir kata gout ucapkan terima kasih.  

*Waassallaam*
