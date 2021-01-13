---
layout: post
title:  "Bermain dengan jQuery Scrolling Effect"
author: puji
categories: [ Javascript, JQuery ]
image: assets/images/post/jquery_scroll.png
tags: [webdevelopment]
opening: بسم الله الرحمن الرحيم
---

# Assalamualaikum  

Lanjut lagi mengenai jquery, banyak sebetulnya fungsi dan kegunaan jquery itu yang mungkin belum gout explore lebih jauh lagi. Sekarang ini mungkin sudah sangat tertinggal yah teknologi dari jquery ini tapi untuk bidang web development gout rasa masih di perlukan jquery, yah memang secara tidak langsung dengan kita menggunakan jquery, sebetulnya jquery ini kan hanyalah sebuah library dari javascript dan saat kita menggunakan fungsi fungsi jquery, si jquery nya ini meload library javascript jadi sebetulnya proses ini lah yang bisa memakan waktu, menurut para pakar development, kalo gout sendiri hanya seorang pengguna, dan gout rasa kecepatan dan device para pengguna teknologi sudah sangat mumpuni jadi menurut gout masih layak lah menggunakan jquery di era sekarang ini. heheheh ini hanya prespektif kacamata gout ajah.  

dan di artikel kali ini gout mau membuat effect scroll dengan jquery, gout mau membuat sebuah transition background untuk bagian navigasi, ok langsung ajah kita ke codingan nya.  

di ilustrasi ini, pada bagian navigasi yang memiliki background hitam ( bg-dark ) sebuah class dari bootstrap.  

![jquery_scroll_1]({{site.url}}/assets/images/post/scroll_bg_dark.gif)  

nah gout bermaksud untuk membuat navigasi di bagian atas atau pada saat scrollTop backgroundnya transparent, baru pada saat scroll di turunkan backgroundnya berubah dari transparent ke transisi transparent, kemudian berubah menjadi solid hitam. bagaimana melakukannya, ok langsung ajah kita ke script code nya. 

ini script code navigasi sebelumnya:  

> ***Oh iya script code dalam artikel ini merupakan project kerjaan gout yang menggunakan wordpress, dalam project tersebut tugas gout adalah membuat sebuah child theme yang di customisasi.***  

```
<nav class="navbar navbar-expand-lg navbar-light sticky-top bg-dark">
    <div class="container">
        <a class="navbar-brand" href="<?php echo home_url(); ?>"><?=strtoupper(bloginfo('title'));?></a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
            <?php
                wp_nav_menu( array(
                    'theme_location'    => 'primary',
                    'depth'             => 2,
                    'container'         => 'div',
                    'container_class'   => 'collapse navbar-collapse',
                    'container_id'      => 'navbarNavAltMarkup',
                    'menu_class'        => 'navbar-nav ml-auto',
                    'fallback_cb'       => 'WP_Bootstrap_Navwalker::fallback',
                    'walker'            => new WP_Bootstrap_Navwalker(),
                ) );
            ?>
    </div>
</nav>
``` 
pada navbar tersebut terdapat class ```bg-dark``` yaitu class dari bootstrap, untuk membuatnya transparent kita hapus class ```bg-dark``` nya, sehingga menjadi seperti ini : 

```
<!-- class bg-dark telah di hapus -->
<nav class="navbar navbar-expand-lg navbar-light sticky-top">
    <div class="container">
        <a class="navbar-brand" href="<?php echo home_url(); ?>"><?=strtoupper(bloginfo('title'));?></a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
            <?php
                wp_nav_menu( array(
                    'theme_location'    => 'primary',
                    'depth'             => 2,
                    'container'         => 'div',
                    'container_class'   => 'collapse navbar-collapse',
                    'container_id'      => 'navbarNavAltMarkup',
                    'menu_class'        => 'navbar-nav ml-auto',
                    'fallback_cb'       => 'WP_Bootstrap_Navwalker::fallback',
                    'walker'            => new WP_Bootstrap_Navwalker(),
                ) );
            ?>
    </div>
</nav>
```  
kemudian kita bisa bikin css untuk transparentnya, seperti ini code css untuk transparent navbar nya :

```
.transparent-nav{
    background : rgba(255,255,240, 0.3);
    margin-top: .5rem;
}
```  
sehingga menjadi seperti ini penampakan navbar dengan background transparent  

![scroll_transparent]({{site.url}}/assets/images/post/scroll_bg_transparent.gif)  

css untuk transparent navbar sudah di buat dengan nama class ```transparent-nav```, sekarang kita lanjut ke javascript nya, menggunakan jquery, berikut code nya :  
jadi code jquery berikut menggunakan fitur scroll, karena kita akan membuat effect peralihan untuk bacgkround di navigasi dari transparent ke solid hitam.  

Pertama kita buat dulu sebuah object javascript baru untuke lebih memudahkan, melakukan query selector untuk tiap class atau id yang akan di gunakan :  

```
const object = {
    'menuItem' : $('.menu-item'),
    'navBrand' : $('.navbar-brand'),
    'navLink' : $('.nav-link'),
    'fixedTop' : $('.sticky-top'),
};
```  

Lanjut itu lakukan query selector dari class yang telah di definisikan di atas.  

``` 
    $(window).on('scroll', function(){
        let isDesktop = window.matchMedia('only screen and (min-width: 992px)').matches;
        if(!isDesktop){
            if($(window).scrollTop() > 400){
                const scrollTop = $(this).scrollTop();
                console.log("Scroll from Top: " + scrollTop.toString());
                console.log("this is mobile");
                object.fixedTop.removeClass('transparent-nav');
                object.fixedTop.addClass('bg-white');
            }else{
                object.fixedTop.removeClass('bg-white');
                object.fixedTop.addClass('transparent-nav');
            }
        }else{
            if($(window).scrollTop() > 150){
                const scrollTop = $(this).scrollTop();
                console.log("Scroll from Top: " + scrollTop.toString());
                console.log("Ok On Desktop");
                object.fixedTop.addClass('transparent-nav');
                // object.fixedTop.addClass('bg-dark');
                if($(window).scrollTop() > 400){
                    const scrollTop = $(this).scrollTop();
                    console.log("Scroll from Top: " + scrollTop.toString());
                    object.fixedTop.addClass('bg-dark');
                }else{
                    object.fixedTop.removeClass('bg-dark');
                    object.fixedTop.addClass('transparent-nav');
                }
            }else{
                object.fixedTop.removeClass('bg-dark');
                object.fixedTop.removeClass('transparent-nav');
            }
        }
    });
```  

**sedikit penjelasan** :  

dari script diatas gout coba mengaktifkan event ```scroll```, kemudian kita melakukan penambahaan fungsi baru untuk event ```scroll``` ini. setelah event ```scroll``` nya aktif kita assignment sebuah fungsi untuk mendeteksi device yang kita assignment kedalam variable berikut  

```
let isDesktop = window.matchMedia('only screen and (min-width: 992px)').matches;
```  
setelah itu kita lakukan beberapa seleksi diataranya untuk mendeteksi event ```scroll``` nya :  

```
if($(window).scrollTop() > 400)
```  

kita cek ketika scroll nya melebihi nilai yang di validasi : seperti ini output di console nya  
ini output console saat di scroll pada tampilan mobile :  

![jquery_scroll_mobile]({{site.url}}/assets/images/post/scroll_top_mobile.png)  

ini output console saat di scroll pada tampilan desktop :  

![jquery_scroll_mobile]({{site.url}}/assets/images/post/scroll_top_desktop.png)  

karena kita tadi melakukan assignment untuk event scroll nya : 

```
const scrollTop = $(this).scrollTop();
console.log("Scroll from Top: " + scrollTop.toString());
```  
sehingga hasil akhirnya adalah sepert ini :  

![jquery_scroll_2]({{site.url}}/assets/images/post/scrolling_effect_transparent.gif)  

ketika scroll nya di gulir ke bawah maka akan ada sebuah transisi untuk warna background di bagian navigasi bar.  

Ok sekian dulu artikel gout kali ini, nanti kita lanjutkan kembali artikel lainnya yang menarik dari penggunaan jquery. akhir kata gout ucapkan terima kasih dan **Waasallaam** 



