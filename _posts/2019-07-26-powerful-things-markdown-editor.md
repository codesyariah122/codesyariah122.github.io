---
layout: post
title:  "Hal-hal keren yang dapat kalian lakukan dengan editor Markdown"
author: sal
categories: [ Jekyll, Blog, tutorial ]
image: assets/images/4.jpg
tags: [featured , Blog]
---

Ada banyak hal keren yang dapat Kalian lakukan dengan editor Markdown. Jika Kalian sudah cukup terbiasa dengan menulis di Markdown, maka Kalian dapat menikmati beberapa tips lebih lanjut tentang jenis hal yang dapat Kalian lakukan dengan Markdown!

Seperti halnya postingan terakhir {{site.authors.puji.name}}(penulis), Kalian bisa mengedit postingan ini saat Kalian membacanya sehingga Kalian dapat melihat semua kode markdown yang penulis gunakan.


## Special formatting

Selain huruf tebal dan miring, Kalian juga dapat menggunakan beberapa pemformatan khusus lainnya di Markdown saat diperlukan, misalnya:

+ ~~strike through~~
+ ==highlight==
+ \*escaped characters\*


## Menulis Baris Code

Ada dua jenis elemen kode yang dapat dimasukkan dalam markdown, yang pertama adalah inline, dan yang lainnya adalah blok. Kode sebaris diformat dengan menambahkan kata apa saja atau kata-kata di dalam simbol

<pre>
&#123;
code kalian
&#125;
</pre>

seperti ini ,. Contoh kode yang dapat ditampilkan di beberapa baris menggunakan &#180; :

<pre>

&#96;

.my-link &#123;
    text-decoration: underline;
&#125;

&#96;

</pre>

Atau jika kalian ingin keliatan lebih keren biar kaya hacker gitu, Kalian dapat menambahkan highlight sintaks menggunakan Rouge.

<pre>

&#33;&#91;walking&#93; &#40;&#123;&#123;site.baseurl &#125;&#125;/assets/images/3.jpg&#41;

## Daftar Referensi

Cara lain untuk menyisipkan tautan dalam markdown adalah menggunakan daftar referensi. Kalian mungkin ingin menggunakan gaya link seperti berikut untuk mengutip bahan referensi dari Wikipedia. Semua link tercantum di akhir dokumen, sehingga Kalian dapat mempertahankan pemisahan penuh antara konten dan sumber atau rujukannya.

## Full HTML

Mungkin bagian terbaik dari markdown ini adalah bahwa Kalian tidak dinatasi hanya pada markdown saja. Kalian dapat menulis HTML langsung di editor Markdown dan itu hanya akan berfungsi seperti HTML biasanya. Tanpa batas! Berikut adalah kode link YouTube standar sebagai contoh:

<pre>
 &lt;p &gt; &lt; iframe style="width:100%;" height="315" src="https://www.youtube.com/embed/Cniqsc9QfDo?rel=0&amp;showinfo=0" frameborder="0" allowfullscreen &gt; &lt;&#47;iframe &gt; &lt;&#47;p&gt;
</pre>