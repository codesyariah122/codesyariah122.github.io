---
layout: post
title:  "Templating Views di Codeigniter menggunakan file library"
author: puji
categories: [PHP, MVC, Codeigniter]
image: assets/images/post/codeigniter3.jpg
tags: [codeigniter]
opening: بسم الله الرحمن الرحيم
---  
![ci3]({{site.url}}/assets/images/post/architecture-codeigniter.png)  

### Templating Views in Codeiginiter  
Codeigniter menganut MVC konsep yang memberikan fasilitas kemudahan yang mempercepat process development.  
Dalam artikel kali ini saya akan membagi sedikit tips dalam pembuatan views di codeigniter, yang rule data nya menggunakan library. Ok bro kita langsung praktek saja.  

dari artikel mengenai codeigniter beberapa waktu lalu, tentang Pretty Url kita sudah membuat config awal untuk Codeigniter, tapi tak ada salahnya kita ulangi langkah tersebut di artikel ini.  

Buka file ```config/config.php``` di direktori ```application/```, kemudian edit bagian bagian ini :  

```
$config['base_url'] = '';
```  

ubah menjadi :  

```
$config['base_url'] = 'http://localhost/Codeigniter';
```  
kemudian bagian :  

```
$config['index_page'] = 'index.php';
```  

ubah menjadi :  

```
$config['index_page'] = '';
```  

Selanjutnya buka file ```autoload.php``` yang masih terletak di direktori ```config/``` :  

cari bagian ini dan sesuaikan :  

```
$autoload['libraries'] = array('Template');
$autoload['helper'] = array('url', 'file');
```  

setelah itu buat file baru di direktori ```libraries/``` dengan nama ```Template.php``` , kemudian copy code berikut :  
```php
<?php 

class Template {
    protected $ci_;

    function __construct()
    {
        $this->ci_ =&get_instance();
    }

    function viewnya($content, $data=null)
    {
        $data['header'] = $this->ci_->load->view('template/header', $data, TRUE);

        $data['content'] = $this->ci_->load->view($content, $data, TRUE);
        
        $data['footer'] = $this->ci_->load->view('template/footer', $data, TRUE);

        $this->ci_->load->view('template/index', $data);

    }
}
```  

**Sedikit Penjelasan** :  
> Class template ini akan menjadi jalur baru diluar mvc dalam penggunaanya harus diload di controller, tapi di versi codeigniter3 keatas kita bisa melakukannya dari file ```config/autoload.php``` sebelumnya kita sudah mengedit file tersebut dan kita membuat autoload untuk class ```Template```.  

>Kemudian pada class Template tersebut terdapat property ```protected $ci_``` ini ditujukan untuk membuat ```instance``` di codeigniter atau dengan kata lain kita akan menggunakan jalur diluar MVC Codeigniter menggunakan method dari Codeigniter sendiri yaitu method ```get_instance()```. sehingga kita dapat lebih leluasa mengembangkan aplikasi di Codeigniter.  

> selanjutnya terdapat method ```viewnya()``` => method ```viewnya()``` ini lah yang akan mengisi ```get_instance()``` sebagai alur program kedua diluar MVC, method ```viewnya()``` sendiri memiliki parameter ```($content, $data)```, yang nantinya akan di gunakan untuk mendefiniskan view yang akan di ```load``` menggunakan fungsi ```view()``` bawaan dari codeigniter di jalur controller.  

Selanjutnya kita buat satu file baru lagi sebagai controller di direktori ```controllers/``` save dengan nama ```Main.php```, kemudian isi code berikut untuk Controller ```Main``` :  

```php

<?php
defined('BASEPATH') OR exit ('No direct script access allowed');

class Main extends CI_Controller {
    
    public function index()
    {
        $data = [
            'web_name' => 'MyArtisan wEb',
            'brand'=> 'MyArtisan WEb',
            'banner' => 'first <span> serve </span> <br/> first <span> come </span>',
            'method' => $this->router->fetch_method(),
            'uri' => $this->uri->segment(1),
            'title' => 'MyArtisan Website'
        ];
        $this->template->view('contents/home', $data);
    }

    public function about()
    {
        $data = [
            'web_name' => 'MyArtisan wEb',
            'brand'=> 'MyArtisan WEb',
            'banner' => 'Your <span> life </span> <br/> your <span> passion </span>',
            'method' => $this->router->fetch_method(),
            'uri' => $this->uri->segment(1),
            'title' => 'AboutMe Page'
        ];

        $this->template->view('contents/about', $data);
    }

    public function blog()
    {
        $data = [
            'web_name' => 'MyArtisan wEb',
            'brand'=> 'MyArtisan WEb',
            'banner' => 'Archived <span> story </span> <br/> Saved <span> dream </span>',
            'method' => $this->router->fetch_method(),
            'uri' => $this->uri->segment(1),
            'title' => 'MyBlog Page'
        ];

        $this->template->view('contents/blog', $data);
    }

    public function contact()
    {
        $data = [
            'web_name' => 'MyArtisan wEb',
            'brand'=> 'MyArtisan WEb',
            'banner' => 'First <span> commit </span> <br/> First <span> moment </span>',
            'method' => $this->router->fetch_method(),
            'uri' => $this->uri->segment(1),
            'title' => 'MyContact Page'
        ];
        $this->template->view('contents/contact', $data);
    }

}
```  
**Sedikit Penjelasan :**  

> Di file Controller kita sudah memiliki 4 method setiap method akan memanggil view nya masing masing, dan mengisi parameter ```$content``` dari class ```Template``` di file ```Template.php``` yang sebelumnya sudah kita buat.  

Sebagai optional saya sendiri membuat ```routes``` untuk setiap method di controllernya, buka file ```config/routes.php``` :  

```php
<?php
defined('BASEPATH') OR exit('No direct script access allowed');

$route['default_controller'] = 'main';
$route['about'] = 'main/about';
$route['blog'] = 'main/blog';
$route['contact'] = 'main/contact';
$route['404_override'] = '';
$route['translate_uri_dashes'] = FALSE;

```

#### Membuat view  
Dan yang terakhir adalah kita membuat masing-masing file view di direktori ```views/``` sesuai dengan nama view yang telah di definisikan di Controller ```Main```, berikut file-file yang harus dibuat di direktori ```views/```  

masing-masing file untuk view yang harus kalian buat :  

```
views/
    template/
        index.php
        header.php
        footer.php

    contents/
        home.php
        about.php
        blog.php
        contact.php
```  

buka masing-masing file tersebut dan sesuaikan :  

file ```template/index.php```

```php
<!DOCTYPE html>
<html>
<head>
    <title><?=$title?></title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
</head>
<body>

<?=$header?>
    <div class="container">
        <?=$content?>

        <?=$footer?>
    </div>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.min.js" integrity="sha384-w1Q4orYjBQndcko6MimVbzY0tgp4pWB4lZ7lr30WKz0vr/aWKhXdBNmNb5D92v7s" crossorigin="anonymous"></script>
</body>
</html>
```  

file ```template/header.php``` :  

```php
<nav class="navbar navbar-expand-lg navbar-light sticky-top">
    <div class="container">
      <a class="navbar-brand" href="<?=base_url()?>/"><?=$web_name?></a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="<?=base_url()?>about">About</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="<?=base_url()?>blog">Blog</a>
          </li>
        </ul>
      </div>
    </div>
</nav>

<!-- jumbotron -->
    <div class="jumbotron jumbotron-fluid" style=" background-image: url(<?=base_url($jumbotron)?>);">
    <div class="container">
        <div class="row">
            <div class="col-md-5">
                <h1 class="display-4">
                    <?=$banner?>
                </h1>
                <a href="" class="btn btn-primary tombol">Our Work</a>
            </div>
        </div>
    </div>
    </div>
```  

untuk file assets gambar silahkan download disini :  

<a href="https://github.com/codesyariah122/Learn-WebDev/tree/master/Codeigniter/assets/images" target="_blank">Download Asset Images</a>  

> Kemudian simpan ke direktori yang sesuai dengan data di controllernya.  

selanjutnya file ```template/footer.php``` :  

```php
<hr class="mt-5">
<footer class="bg-white">
     <div class="container py-5">
         <div class="row py-3">
             <div class="col-lg-2 col-md-6 mb-4 mb-lg-0">
                 <h6 class="text-uppercase font-weight-bold mb-4">About</h6>
                 <ul class="list-unstyled mb-0">
                     <li class="mb-2"><a href="#" class="text-muted">Contact Us</a></li>
                     <li class="mb-2"><a href="#" class="text-muted">About Us</a></li>
                     <li class="mb-2"><a href="#" class="text-muted">Stories</a></li>
                     <li class="mb-2"><a href="#" class="text-muted">Press</a></li>
                 </ul>
             </div>
             <div class="col-lg-2 col-md-6 mb-4 mb-lg-0">
                 <h6 class="text-uppercase font-weight-bold mb-4">Help</h6>
                 <ul class="list-unstyled mb-0">
                     <li class="mb-2"><a href="#" class="text-muted">Payments</a></li>
                     <li class="mb-2"><a href="#" class="text-muted">Shipping</a></li>
                     <li class="mb-2"><a href="#" class="text-muted">Cancellation</a></li>
                     <li class="mb-2"><a href="#" class="text-muted">Returns</a></li>
                 </ul>
             </div>
             <div class="col-lg-2 col-md-6 mb-4 mb-lg-0">
                 <h6 class="text-uppercase font-weight-bold mb-4">Policy</h6>
                 <ul class="list-unstyled mb-0">
                     <li class="mb-2"><a href="#" class="text-muted">Return Policy</a></li>
                     <li class="mb-2"><a href="#" class="text-muted">Terms Of Use</a></li>
                     <li class="mb-2"><a href="#" class="text-muted">Security</a></li>
                     <li class="mb-2"><a href="#" class="text-muted">Privacy</a></li>
                 </ul>
             </div>
             <div class="col-lg-2 col-md-6 mb-4 mb-lg-0">
                 <h6 class="text-uppercase font-weight-bold mb-4">Company</h6>
                 <ul class="list-unstyled mb-0">
                     <li class="mb-2"><a href="#" class="text-muted">Login</a></li>
                     <li class="mb-2"><a href="#" class="text-muted">Register</a></li>
                     <li class="mb-2"><a href="#" class="text-muted">Sitemap</a></li>
                     <li class="mb-2"><a href="#" class="text-muted">Our Products</a></li>
                 </ul>
             </div>
             <div class="col-lg-4 col-md-6 mb-lg-0">
                 <h6 class="text-uppercase font-weight-bold mb-4">Registered Office Address</h6>
                 <p class="text-muted mb-4">Here , write the complete address of the Registered office address along with telephone number.</p>
                 <ul class="list-inline mt-4">
                     <li class="list-inline-item"><a href="#" target="_blank" title="twitter"><i class="fab fa-2x fa-twitter"></i></a></li>
                     <li class="list-inline-item"><a href="#" target="_blank" title="facebook"><i class="fab fa-2x fa-facebook-f"></i></a></li>
                     <li class="list-inline-item"><a href="#" target="_blank" title="instagram"><i class="fab fa-2x fa-instagram"></i></a></li>
                     <li class="list-inline-item"><a href="#" target="_blank" title="pinterest"><i class="fab fa-2x fa-youtube"></i></a></li>
                     <li class="list-inline-item"><a href="#" target="_blank" title="vimeo"><i class="fab fa-2x fa-google"></i></a></li>
                 </ul>
             </div>
         </div>
     </div>

     <hr class="p-0 m-0 b-0">
     
     <div class="bg-light py-2">
         <div class="container text-center">
             <p class="text-muted mb-0 py-2">
             &copy; <?php echo date("Y"); ?> <a href="<?php echo base_url(); ?>" class="text-primary"><span class="font-weight-bold"><?=$title; ?></span></a> 

             </p>
         </div>
     </div>
 </footer>
```  

Sekarang pindah ke direktori content, sesuaikan isi dari tiap-tiap file di direktori content ini :  

Pertama file ```contents/home.php``` :  

```php
<div class="row justify-content-center">
    <div class="col-md-12 col-xs-12 col-sm-12">
        <h1>Home Page</h1>
            <p>
               Lorem ipsum dolor sit amet.
               Lorem ipsum dolor sit amet.
               Lorem ipsum dolor sit amet.
            </p>
    </div>
</div>
```  

kemudian file ```contents/about.php``` :  

```php
<div class="row justify-content-center">
    <div class="col-md-12 col-xs-12 col-sm-12">
        <h3 class="text-primary">About Page</h3>
            <p>
               Lorem ipsum dolor sit amet.
               Lorem ipsum dolor sit amet.
               Lorem ipsum dolor sit amet.
               Lorem ipsum dolor sit amet.
               Lorem ipsum dolor sit amet.
            </p>
    </div>
</div>
```  

selanjutnya file ```contents/blog.php``` :  

```php
<div class="row justify-content-center">
    <div class="col-md-12 col-xs-12 col-sm-12">
        <h4>MyBlog</h4>
            <p>
               Lorem ipsum dolor sit amet.
               Lorem ipsum dolor sit amet.
               Lorem ipsum dolor sit amet.
               Lorem ipsum dolor sit amet.
               Lorem ipsum dolor sit amet.
               Lorem ipsum dolor sit amet.
               Lorem ipsum dolor sit amet.
               Lorem ipsum dolor sit amet.
            </p>
    </div>
</div>
```  

terakhir untuk file ```contents/contact.php``` :  

```php
<div class="row justify-content-center">
    <div class="col-md-12 col-xs-12 col-sm-12">
        <h6 class="text-success">Contact Me</h4>
            <p>
               Lorem ipsum dolor sit amet.
               Lorem ipsum dolor sit amet.
            </p>
    </div>
</div>
```  

Sebagai bonus tambahkan file javascript berikut yang isinya adalah library jQuerY, di antaranya sebagai berikut :  

simpan di direktori ```assets/js/``` :  

file ```assets/js/Obj.js``` :  

```javascript
const object = {
    'menuItem' : $('.menu-item'),
    'navBrand' : $('.navbar-brand'),
    'navLink' : $('.nav-link'),
    'fixedTop' : $('.sticky-top'),
    'baseUrl' : 'http://localhost/Codeigniter/',
};

```  

Kemudian file ```assets/js/MyScript.js``` :  

```javascript
$(document).ready(function(){
// untuk background transition di bagian navigasi 
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

    // adding new element button
    // alert(object.menuItem.length);
    object.menuItem.last().after(
        `
            <a href="${object.baseUrl}contact" class="menu-item btn btn-success tombol">join us</a>
        `
    );

});
```  

kemudian buat direktori baru di ```assets/``` buat direktori ```css/``` dan di direktori ```css/``` buat satu file baru dengan nama ```style.css``` kemudian isi dengan code berikut untuk css nya .  

file ```assets/css/style.css``` :  

```css
@font-face {
    font-family: 'SpringSakura';
    font-style: normal;
    font-weight: normal;
    src: local('SpringSakura'), url('https://github.com/codesyariah122/kerjaan-syoobe/blob/main/for_page/fonts/SpringSakura-3z1m8.otf') format('otf');
}

@font-face {
    font-family: 'Reey Regular';
    font-style: normal;
    font-weight: normal;
    src: local('Reey Regular'), url('https://github.com/codesyariah122/kerjaan-syoobe/blob/main/for_page/fonts/Reey-Regular.woff') format('woff');
}

@font-face {
    font-family: 'Lemon/Milk Regular';
    font-style: normal;
    font-weight: normal;
    src: local('https://github.com/codesyariah122/kerjaan-syoobe/blob/main/for_page/fonts/Lemon__Milk%20400.otf') format('otf');
}

.navbar{
    position: relative;
    z-index:1;
}

.navbar-brand{
    font-family: Viga;
    font-size: 32px;
    text-transform: capitalize;
}

.transparent-nav{
    background : rgba(255,255,240, 0.3);
    margin-top: .5rem;
}

.tombol {
    text-transform: uppercase;
    border-radius: 40px !important;
    font-family:'Lemon/Milk Regular';
    font-weight:normal;
    font-size:42px;
}

/* jumbotron */
.jumbotron {
    /* background-size: cover;
    height: 540px; */
    text-align: center;
    position: relative;
    
    background-color: #17234E;
    margin-top:0rem;
    margin-bottom: 0;
    min-height: 100vh;
    width :100%;
    background-repeat: no-repeat;
    background-position: center;
    -webkit-background-size: cover;
    background-size: cover;
    position: relative;
}

.jumbotron .container{
    z-index: 1;
    position: relative;
}

.jumbotron::after{
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0));
    position: absolute;
    bottom:0;
}

.jumbotron .display-4 {
    color: white;
    margin-top: 150px;
    font-weight: 200;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
    margin-bottom: 30px;
    font-family:'Lemon/Milk Regular'; 
}

.jumbotron .display-4 span {
    font-weight: 500;
    color:tomato;
}

/* DESKTOP VERSION */
@media (min-width: 992px) { 
    /* navbar */
    .navbar-brand, .nav-link {
        color: white !important;
        text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.7);
    }
    .nav-link{
        text-transform: uppercase;
        margin-right: 30px;
    }
    .nav-link:hover::after{
        content:'';
        display: block;
        border-bottom: 3px solid #0B63DC;
        width: 50%;
        margin:auto;
        padding-bottom: 5px;
        margin-bottom: -8px;
    }

    .active {
       /* content:'';
        display: inline-block;
        border-bottom: 2px solid #EEE8AA;
        width: 25%;
        margin:auto;
        padding-bottom: 1px;
        margin-bottom: -1px;*/
        font-style: italic;
        font-weight: 800;
        color: #EEE8AA !important;
    }

    .transparent-nav{
        background : rgba(0, 0, 0, 0.3);
        margin-top: .5rem;
    }
    /* jumbotron */
    .jumbotron{
        margin-top: -75px;
        height: 640px;
    }
    .jumbotron .display-4{
        text-transform: capitalize;
    }
}
```

Untuk source code lengkapnya jika diperlukan atau dipelajari lebih lanjut silahkan meluncur ke link berikut :  

<a href="https://github.com/codesyariah122/Learn-WebDev/tree/master/Codeigniter" target="_blank">Source Code</a>  

Dirasa cukup sampai disini bahasan artikel tentang templating di codeigniter menggunakan library. Mohon maaf jika ada kekurangan dan salah kata.


Selanjutnya kita akan bahas lagi seputar codeigniter di artikel selanjutnya lagi.  

**Wassalaamm**
