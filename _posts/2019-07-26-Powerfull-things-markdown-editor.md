---
layout: post
title:  "Hal-hal keren yang dapat kalian lakukan dengan editor Markdown"
author: puji
categories: [ Jekyll, Blog, tutorial ]
image: assets/images/post/photo-1.jpeg
tags: [featured , Blog]
---

Ada banyak hal keren yang dapat Kalian lakukan dengan editor Markdown. Jika Kalian sudah cukup terbiasa dengan menulis di Markdown, maka Kalian dapat menikmati beberapa tips lebih lanjut tentang jenis hal yang dapat Kalian lakukan dengan Markdown!

Seperti halnya postingan terakhir {{site.authors.puji.name}} (penulis), Kalian bisa mengedit postingan ini saat Kalian membacanya sehingga Kalian dapat melihat semua kode markdown yang penulis gunakan.


## Special formatting

Selain huruf tebal dan miring, Kalian juga dapat menggunakan beberapa pemformatan khusus lainnya di Markdown saat diperlukan, misalnya:

+ ~~strike through~~
+ ==highlight==
+ \*escaped characters\*


## Menulis Baris Code

Ada dua jenis elemen kode yang dapat dimasukkan dalam markdown, 
yang pertama adalah inline, dan yang lainnya adalah blok. penulisan script code ditulis di dalam blok kode &#123; ... &#125; seperti berikut :

<pre>
&#123;
code kalian
&#125;
</pre>

Contoh kode yang dapat ditampilkan di beberapa baris menggunakan simbol 
Seperti ini ( &#96;&#96;&#96; ), pada keyboard komputer atau laptop berada di atas esc tekan tombol ctrl kemudian (&#96;&#96;&#96;).  
berikut script lengkapnya :

<pre>

&#96;&#96;&#96;

.my-link &#123;
    text-decoration: underline;
&#125;

&#96;&#96;&#96;

</pre>

Atau jika kalian ingin keliatan lebih keren biar kaya hacker gitu, Kalian dapat menambahkan highlight sintaks menggunakan Rouge.

<pre>

&#33;&#91;walking&#93; &#40;&#123;&#123;site.url &#125;&#125;/assets/images/post/8.jpg&#41;
</pre>  

hasilnya seperti ini :  

![walking]({{site.url}}/assets/images/post/8.jpg)  

atau bisa dengan syntax highlighter yaitu sebuah plugin dari jekyll  
contoh penggunaan syntax highlighter :  
<code>
&#123;&percnt;  
highlight bahasa_program  
&percnt;&#125;  
script_code disini ...  
&#123;&percnt; endhighlight; &percnt;&#125;
</code>  

## Daftar Referensi

Cara lain untuk menyisipkan tautan dalam markdown adalah menggunakan daftar referensi. Kalian mungkin ingin menggunakan code link seperti diatas untuk mengutip sumber link referensi dari Wikipedia atau tautan situs lain.  
Semua link tercantum di akhir dokumen, sehingga Kalian dapat memisahakan antara konten dan sumber atau rujukannya.

## Full HTML

Mungkin bagian terbaik dari markdown ini adalah Kalian tidak dibatasi hanya pada markdown saja. Kalian dapat menulis HTML langsung di editor Markdown dan itu hanya akan berfungsi seperti HTML biasanya. Tanpa batas! Berikut adalah kode link YouTube standar sebagai contoh:

<pre>
 &lt;p &gt; &lt; iframe style="width:100%;" height="315" src="https://www.youtube.com/embed/Cniqsc9QfDo?rel=0&amp;showinfo=0" frameborder="0" allowfullscreen &gt; &lt;&#47;iframe &gt; &lt;&#47;p&gt;
</pre>  

Maka hasilnya seperti ini :  

<p><iframe style="width:100%;" height="315" src="https://www.youtube.com/embed/Cniqsc9QfDo?rel=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe></p>

Sama bukan hasilnya jika.kalian coba dengan markdown, ok sekian tulisan saya, salam {{site.authors.puji.name}}
