---
layout: post
title:  "Menggunakan autoload untuk meregenerate class di PHP7"
author: puji
categories: [ PHP, OOP, namespace, autoload ]
image: assets/images/post/php-autoload.png
tags: [webdevelopment]
opening: بسم الله الرحمن الرحيم
---  
![php_namespace]({{site.url}}/assets/images/post/autoload-php.jpg)  

{{page.opening}}  

## Mengenal fitur Autoload PHP  

Halo gaess apa kabarnya kalian semua ? Semoga baik-baik selalu yah gaes.  
Di artikel kali ini saya akan melanjutkan, artikel sebelumnya yaitu mengenai **namespace** di PHP7.  
dari artikel sebelumnya itu kita sudah mempunyai kerangka program sederhana menggunakan OOP konsep dan menggunakan fitur namespace, ya diartikel ini saya akan melanjutkan code script yang sama dengan menambahkan sebuah fitur magic dari laravel untuk mempersingkat proses pengembangan aplikasi atau program yang kita bangun menggunakan konsep OOP PHP.

diartikel sebelumnya kurang lebih susunan direktori untuk aplikasi sederhana saya masih seperti ini belum ada penambahan yah :  

```
--------------------------------
 namespace/					
--------------------------------	
	app/					 	
		BaseClass/			 	
			BaseClass.php    	
		Add/				 	
			Add.php          	
		Substract/			 	
			Substract.php    	
		Multiply/			 	
			Multiply.php     	
		Devide/				 	
			Devide.php       
		Modulus/			 	
			Modulus.php      
		GanjilGenap/		 	
			GanjilGenap.php  	

		init.php             
---------------------------------

index.php

```  
dari susunan  direktori tersebut terdapat sebuah file yang difungsikan sebagai tunnel atau jalur yang akan menghubungkan kita dengan tiap-tiap class yang berada di direktori aplikasi kita yaitu direktori ```app/``` :  

berikut isi file ```app/init.php``` :  

```php
<?php 
/*
file : app/init.php
pujiermanto(codesyariah - 2019)
*/

require_once 'BaseClass/BaseClass.php';
require_once 'Add/Add.php';
require_once 'Substract/Substract.php';
require_once 'Multiply/Multiply.php';
require_once 'Divide/Divide.php';
require_once 'Modulus/Modulus.php';
require_once 'GanjilGenap/GanjilGenap.php';

use \app\BaseClass\BaseClass;
use \app\Add\Add;
use \app\Substract\Substract;
use \app\Multiply\Multiply;
use \app\Divide\Divide;
use \app\Modulus\Modulus;
use \app\GanjilGenap\GanjilGenap;

$base = new BaseClass;

$add = new Add;

$sub = new Substract;

$mult = new Multiply;

$div = new Divide;

$mod = new Modulus;

$x = new GanjilGenap;

```  

Terdapat fungsi ```require_once``` yang berulang-ulang kali di lakukan di file ```init.php``` tersebut, sangat menyita waktu kan jika kita mempunya class yang lebih banyak lagi, maka dari itu kita gunakan salah satu magic tools php yang sangat keren fungsinya yaitu ```autoload``` ```spl_autoload_register()```.  

#### Membuat autoload  
Itulah kegunaan dari autoload di PHP ini, keren kan PHP, hehehe.  
Ok langsung ajah, kita kembali lagi ke codeeditor kesayangan kita, kemudian buka file ```app/init.php```.  
Kemudian ubah code nya menjadi seperti ini :  

```php
<?php
/*
file : app/init.php
pujiermanto(codesyariah - 2019)
*/

spl_autoload_register(function($class){

  $class=explode('\\',$class);

  // echo "<pre>";
  // var_dump($class);
  // echo "</pre>";

  $class=end($class);

  if($class){
      require_once $class.'/'.$class.'.php';
  }else{
      echo "<h1>Sory class tidak tersedia</h1>";
  }

});


use \app\BaseClass\BaseClass;
use \app\Add\Add;
use \app\Substract\Substract;
use \app\Multiply\Multiply;
use \app\Divide\Divide;
use \app\Modulus\Modulus;
use \app\GanjilGenap\GanjilGenap;

$base = new BaseClass;

$add = new Add;

$sub = new Substract;

$mult = new Multiply;

$div = new Divide;

$mod = new Modulus;

$x = new GanjilGenap;

```  
Silahkan dicoba di web browser kalian masing-mas
ing, jika ada kesalahan jangan malu untuk bertanya, inshaallah saya akan senang hati membantu.

Ok yahh ... mudah difahami kan, kalian harus mencobanya langsung di web server kalian, sesuai dengan prinsip pemrogramman yaitu **amati, tiru dan modifikasi**.  
Ok ! Sekian dari saya.


saya harap tulisan ini dapat bermanfaat untuk kalian. 

Implementasi namespace serupa ada di repository berikut : 

<a href="https://github.com/codesyariah122/Learn-WebDev/tree/master/Project" target="_blank">Learn WebDev</a>
**salam** 

***Puji Ermanto***




