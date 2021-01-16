---
layout: post
title:  "Routing dan blade templating laravel 7"
author: puji
categories: [ PHP, Laravel, MVC, OOP ]
image: assets/images/post/blade_laravel/laravel-logo.png
tags: [webdevelopment]
opening: بسم الله الرحمن الرحيم
---  

{{page.opening}}

![laravel1]({{site.url}}/assets/images/post/blade_laravel/laravel7.jpg)  

Melanjutkan seri mengenai laravel sebelumnya, kali ini di artikel ini gout mau membahas  seputar routing dan blade templating di laravel7. sebelumnya, apa kabarnya nih para coders ? mudah2an selalu di berkahi nikmat sehat dan nikmat waktu luang.  
### Routing di laravel7  
Dalam perkembangan framework-framework modern dengan konsep, MVC sudah sangat tidak asing lagi membahas perihal routing management di sebuah framework modern, termasuk laravel, yang menurut gout sih masih menjadi framework web terbaik dari bahasa php.  
Routing ini lah sebagai rule yang menentukan alur proces templating di applikasi yang kita bangun dengan sebuah framework dalam artikel ini yang gout khususkan hanyalah framework laravel.  
dengan routing ini kita bisa menentukan sendiri view mana yang akan digunakan saat user merequest sebuah halaman di web application kita.  
dari artikel sebelumnya kita sudah menginstall laravel, dan kemudian menjalankan local server laravel dengan ```php artisan serve```.  
![laravel1]({{site.url}}/assets/images/post/blade_laravel/blade-template1.gif)
![laravel1]({{site.url}}/assets/images/post/blade_laravel/blade-template2.gif)
setelah proses pembuatan project dibuat dan local server laravel bisa berjalan dengan baik, maka kita lanjutkan ke langkah selanjutnya mengenai:  

# Membuat routing ...  
di laravel sendiri module untuk menjalankan route ada di file ```routes/web.php``` di file ini lah kita akan menggunakan method get untuk melakukan routing. buka file ```web.php``` :  
ini adalah route bawaan laravel, default route nya, menggunakan method get dan kemudian mengarahkan view ke view welcome yang ada di file ```resources/views/welcome.blade.php```.
```php
Route::get('/', function () {
    return view('welcome', ['title'=>'Home Tutorialku']);
});
```  
kita bisa menambahkan route baru, contohnya :  
```php
Route::get('/home', function () {
    return view('home', ['title'=>'Homepage Tutorialku']);
});
Route::get('/about', function () {
    return view('about', ['title'=>'Aboutpage Tutorialku']);
});
```  
buat juga views nya untuk route diatas, buka direktori ```resource/``` kemudian masuk ke direktori ```views/``` buat dua file baru antara lain : 
- home.blade.php
- about.blade.php  
berikut isi file ```home.blade.php``` :  

```html
<h2>Homepage Tutorialku</h2>
```  

selanjutnya file ```about.blade.php``` :

```html
<h4>Aboutpage Tutorialku</h4>
```  

file diatas baru berupa html sederhana biasa hanya untuk melihat perubahannya saja, kemudian buka kembali di browser dan akses route tersebut :  
![laravel1]({{site.url}}/assets/images/post/blade_laravel/blade-template3.gif)  

#### Membuat controller untuk menentukan routing dari controller  
Selanjutnya adalah mengenai pembuatan controller, di laravel dalam sebuah controller itu kita bisa melakukan passing data dari database, tidak perlu menggunakan model seperti di codeigniter. dalam tutorial kali ini, gout tidak akan membahas mengenai passing data, gout hanya membahas mengenai pembuatan routing, dengan controller di laravel 7 ini.  
selanjutnya kita ke terminal kembali :  
```bash
php artisan make:controller ControllerTutorialku
```  
***penamaan controller menggunakan ```camel case```***, dari script diatas kita sudah berhasil membuat sebuah controller baru.  
![laravel1]({{site.url}}/assets/images/post/blade_laravel/blade-template4.gif)  
file controller dapat kita akses di direktori ```app/Http/Controllers/``` kemudian buka file : ```ControllerTutorialku.php```, berikut isi code file ```ControllerTutorialku.php``` :  
```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ControllerTutorialku extends Controller
{
    //
    public function home(){
        return view('home');
    }

    public function about(){
        return view('about');
    }

}
```  
Pada script tersebut gout membuat sebuah method baru untuk tiap page yang akan kita routing, di file ```web.php```. kemudian kita akses kembali file ```routes/web.php```, kemudian kita akan merubah nya menjadi seperti ini :  
```php
<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome', ['title'=>'Home Tutorialku']);
});

Route::get('/home', 'ControllerTutorialku@home');
Route::get('/about', 'ControllerTutorialku@about');
```  
terlihat perbedaan dari script ```web.php``` di pembahasan sebelumnya, kali ini kita menggunakan controller untuk merouting template kita.
#### Membuat master template  
selanjutnya kita akan membuat master template, untuk itu kita perlu membuat satu direktori baru di views kita, kita buat direktori baru di : ```resources/views/``` buat direktori untuk file master template kita gout memberi nama direktorinya dengan nama ```layout```, kemduian di direktroi layout tersebut gout akan buat satu file baru dengan nama ```app.blade.php``` nantinya file ini akan kita jadikan master templatenya, kemudian buka file ```app.blade.php``` copy kan code berikut ini :  
```php
<!DOCTYPE html>
<html lang="en">
<head>
  <title>@yield('header_title')</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
</head>
<body>


 <div class="container">
   <div class="row">
     <div class="col mt-3">
        @yield('header_title')
     </div>
   </div>
  
   <div class="row">
     <div class="col">
        @yield('content')
     </div>
   </div>
 </div>
  
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
  </body>
  </html>
  ```  
  gout menggunakan bootstrap4 sebagai template master ini, di file tersebut kita melakukan modularisasi template, untuk memudahkan dalam memaintenance aplikasi kita dari sisi frontend. file selanjutnya adalah file :  
  - home.blade.php
  - about.blade.php  
  berikut file ```home.blade.php``` :  

```php
@extends('layout/app')

@section('header_title', 'Home Page Tutorialku')

@section('content')
<h1>HomePage Tutorialku</h1>
@endsection
```  
dan selanjutnya file ```about.blade.php``` :  
```
@extends('layout/app')

@section('header_title', 'About Tutorialku')

@section('content')
<h2>About Tutorialku</h2>
@endsection
```  
![laravel1]({{site.url}}/assets/images/post/blade_laravel/blade-template6.gif)  

ada beberapa bagian dari template file diatas,
- ```@extends()```
    extends ini maksudnya kita mengambil bagian dari master template kita yang ada di file ```layout/app.blade.php```.
- ```@section()```
    ini juga merupakan bagian dari blade template engine dari laravel, karena di file ```layout/app.blade.php``` ini kita melakukan blade templating di bagian ini ```@yield('header_title')``` sehingga pada file selanjutnya kita bisa menggunakan blade ```@section```.
untuk lebih jelasnya mengenai blade templating bisa di akses di link dibawah ini :  
<a href="https://laravel.com/docs/7.x/blade">Laravel 7 Blade Template Engine</a>  

***di artikel Selanjutnya :*** gout mungkin akan membahas beberapa konfigurasi, mengenai migration dan query builder di laravel7 ini.  

ok sekian dulu dari saya.


***Salam***

**Puji Ermanto**