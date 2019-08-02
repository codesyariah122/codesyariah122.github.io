---
layout: myrooms
title: "Static Site Dengan Jekyll" 
author: puji
date: "2019-08-01"
img_path: "/assets/images/myroom/jekyll.jpeg"
modal: StaticSiteDenganJekyll
---  

Jekyll dapat digunakan dengan Halaman GitHub untuk Membuat website yang simpel, sadar blog, statis. Video ini akan menunjukkanmu bagaimana mengatur inti struktur file Jekyll dalam 60 detik!

Setelah kamu siap dan membutuhkan inspirasi, periksa apa yang ada di sekitar [theme jekyll](https://themeforest.net/category/static-site-generators/jekyll "theme Jekyll pada Envato Market.")  

<p><a href="https://webdesign.tutsplus.com/id/tutorials/setting-up-jekyll-for-github-pages-in-60-seconds--cms-27256?wvideo=tay1wevbho">
<img src="https://embedwistia-a.akamaihd.net/deliveries/ab11c87cf0cda4aa20a2510aaa6b14c8b6e6ef6d.jpg?image_play_button_size=2x&amp;image_crop_resized=960x600&amp;image_play_button=1&amp;image_play_button_color=4cc1bee0" width="400" height="250" style="width: 400px; height: 250px;"></a>
</p>  

Jika kamu lebih memilih penjelasa tertulis, berikut adalah keseluruhan proses yang dijabarkan dalam langkah yang jelas:  

#### Project Baru  

Pertama, buat sebuah folder dalam sistemmu untuk sebuah repo baru. Lakukan ini dengan menggunakan terminal untuk mengarahkan dimana kamu ingin folder baru itu berada, lalu masukkan: ```mkdir mysite.``` Situs folder baru kita bernama "mysite", namun kamu dapat menamainya sesukamu.

Ganti direktori ke folder baru ini dengan memasukkan ``` cd mysite–``` setelah itu buat sebuah file konfigurasi dengan memasukkan perintah ```vim _config.yml.``` Jendela terminal akan menunjukkan isi file ini, jadi tekan i untuk memasuki insert mode, lalu tambahkan konten di bawah ini:  

{% highlight bash %}
title: My Site
{% endhighlight %}
