---
layout: post
title:  "Belajar namespace PHP - OOP"
author: puji
categories: [ PHP, OOP, namespace ]
image: assets/images/post/namespace-php.jpg
tags: [webdevelopment]
opening: بسم الله الرحمن الرحيم
---  
![php_namespace]({{site.url}}/assets/images/post/php-namespace.jpg)  

## Perkenalan dengan NameSPace  

Halo gaess apa kabarnya kalian semua ? Semoga baik-baik selalu yah gaes.  
Artikel kali ini adalah artikel pertama saya tentang PHP, sebuah bahasa BackEnd yang telah lama diandalkan para web developer di bumi ini.  
dalam artikel ini saya akan membahas salah satu fitur di PHP yaitu **NameSpace**. Yuk langsung ajah kita simak

#### namespace  
Namespaces adalah kualifikasi yang menyelesaikan dua masalah berbeda:  

- Memungkinkan pengorganisasian yang lebih baik dengan mengelompokkan kelas-kelas yang bekerja sama untuk melakukan tugas  
- Memungkinkan nama yang sama digunakan untuk lebih dari satu kelas

Misalnya, Kalian mungkin memiliki satu set kelas yang mendeskripsikan tabel HTML, seperti Tabel, Baris dan Sel, sementara juga memiliki satu set kelas lain untuk mendeskripsikan furnitur, seperti Meja, Kursi dan Tempat Tidur. Namespaces dapat digunakan untuk mengatur kelas menjadi dua kelompok yang berbeda dan juga  dapat mencegah dua kelas agar tidak tercampur.  

### Deklarasi NameSPace  

Untuk menggunakan namespace dalam project kita, kita bisa lakukan seperti ini :  

```php
<?php 
namespace NamaNameSPace;
// alur program
```  

dalam artikel ini gout akan praktekan langsung dari script nya saja yah gaes, ok Langsung disimak aja :  

Buat direktori baru dengan nama **namespace/**, lanjut akses direktori ```namespace/```, lanjut lagi buat satu file baru di direktori tersebut ```touch index.php```, kemudian buat direktori baru didalam direktori ```namespace/``` dengan nama ```app/```. Selanjutnya kita buka direktori ```namespace/``` di code editor kesayangan kita.  

dalam artikel ini saya akan membuat sebuah fungsi aritmatika sederhana dengan php dengan metode OOP dan kita akan memanfaatkan fitur namespace untuk membundle setiap method yang akan kita deklarasikan.  

selanjutnya buat beberapa direktori baru, diantaranya :  

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
seperti itu yah susunan direktori untuk belajar namespace di artikel kali ini. Edit tiap-tiap file di code editor kita :  
pertama-tama kita akan edit file untuk ```BaseClass/``` : 
***file: BaseClass.php*** :  

```php
<?php
/*
file : app/BaseClass/BaseClass.php
pujiermanto(codesyariah - 2019)
*/
namespace app\BaseClass;

  class BaseClass{

  private $result;

   public static function sayHallo(){

   return
   "<style>
     .hasil{
      color:salmon;
      font-size:25px;
      font-weight:bold;
           }
      .hasil-ganjil{
       color:orange;
       font-size:25px;
       font-weight:bold,italic;
           }

      .hasil-genap{
       color:salmon;
       font-size:25px;
       font-weight:bold;
           }

      .hasil-err{
       color:#CC0000;
       font-size:25px;
       font-weight:bold,italic;
           }

      .persen{
       color:orange;
       font-size:25px;
       font-weight:bold;
           }
    </style>

    <h1>Selamat Datang...</h1>
     <br/>
  <h4> Anda sedang berada di :<span class='hasil'> ".BaseClass::class."</span></h4>
  ";

   }

}

```  
selanjutnya file : ```Add.php``` atau pertambahan  

```php
<?php
/*
file : app/Add/Add.php
pujiermanto(codesyariah - 2019)
*/
namespace app\Add;

class Add extends \app\BaseClass\BaseClass{

  //Setup calculator method
  public function getAdd($a,$b){

    $this->result=$a + $b;

    echo "Sum of {$a} and {$b}
    is
    <span class='hasil'>
    {$this->result}</span>
    <br>\n";
  }

}
```  

Lanjut lagi file selanjutnya yaitu : ```Substract.php``` atau pengurangan  

```php
<?php
/*
file : app/Substract/Substract.php
pujiermanto(codesyariah - 2019)
*/
namespace app\Substract;

class Substract extends \app\BaseClass\BaseClass{

  //Setup calculator method
  public function getSub($a,$b){

    $this->result=$a - $b;
    
    echo "Substract of {$a} and {$b}
    is
    <span class='hasil'>
    {$this->result}</span>
    <br>\n";
  }

}
```  

Lanjut adalah file : ```Multiply.php``` atau pembagian  

```php
<?php
/*
file : app/Multiply/Multiply.php
pujiermanto(codesyariah - 2019)
*/

namespace app\Multiply;

class Multiply extends \app\BaseClass\BaseClass{

  public function getMult($a,$b){

    $this->result=$a * $b;

    echo "Multiply of {$a} and {$b}
    is
    <span class='hasil'>
    {$this->result}
    </span>
    <br>\n";

  }


}
```  
Lanjut lagi untuk file : ```Divide.php``` atau pembagian  

```php
<?php
/*
file : app/Devide/Devide.php
pujiermanto(codesyariah - 2019)
*/

namespace app\Divide;

class Divide extends \app\BaseClass\BaseClass{

  public function getDiv($a,$b){

    $this->result=$a / $b;

    echo "Divide of {$a} and {$b}
    is
    <span class='hasil'>
    {$this->result}
    </span>
    <br>\n";
  }


}
```  

Selanjutnya lagi adalah file : ```Modulus.php``` atau sisa bagi  

```php
<?php
/*
file : app/Modulus/Modulus.php
pujiermanto(codesyariah - 2019)
*/
namespace app\Modulus;
class Modulus extends \app\BaseClass\BaseClass{

  public function getMod($a,$b){
    $this->result=$a % $b;

    echo "Modulus of {$a} and {$b} is <span class='hasil'> {$this->result} </span><br>".PHP_EOL;

  }
}
```  
Dan terakhir kita buka file : ```GanjilGenap.php``` Untuk menentukan type suatu bilangan  

```php
<?php
/*
file : app/GanjilGenap/GanjilGenap.php
pujiermanto(codesyariah - 2019)
*/
namespace app\GanjilGenap;

class GanjilGenap extends \app\BaseClass\BaseClass{

  public function getGanjilGenap($n=11){
    $this->result=$n;
    if($this->result % 2===0 && is_integer($this->result)):

    echo "<span class='hasil-genap'>{$this->result}</span> adalah sebuah integer Bilangan Genap";

    elseif($this->result%2===1 && is_integer($this->result)):

    echo "<span class='hasil-ganjil'>{$this->result}</span> adalah sebuah integer Bilangan Ganjil";

    else:

    echo "<span class='hasil-err'>{$this->result}</span> is string (Bukan Integer)";
    endif;
  }
}
```  
Setelah semua file di direktori ```app/``` sebagai direktori utama untuk menyimpan class aplikasi sederhana kita, lanjut kita buka satu file baru yaitu file : ```init.php``` yang dimana fungsi init ini adalah sebagai jalur untuk memanggil tiap tiap class yang ada di direktori ```app/```.  

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

Kemudian terakhir kita buka file ```index.php``` di direktori utama kita yaitu direktori ```namespace/```.  

```php
<?php
/*
file : index.php (di root folder)
pujiermanto(codesyariah - 2019)
*/

require_once(dirname(__FILE__)) .'/app/init.php';


echo $base::sayHallo();

//yuk Bayar zakat
// $zakat->setZakat(3000000,2000000);
// $zakat->getZakat();

$add->getAdd(5,4);

$sub->getSub(10,5);

$mult->getMult(100.55,45.01);

$div->getDiv(100.5,2500.4);

$mod->getMod(10,2);

$x->getGanjilGenap(19);
```  

### Kesimpulan  

Ok saatnya menjabarkan, disini saya akan bahas dari file ```init.php``` di root direktori ```app/```, file ini berfungsi untuk memanggil tiap tiap class yang akan kita gunakan di file ```index.php``` di root direktori aplikasi kita, selanjutnya file ```init.php``` ini juga menginstansiasi sejak awal dari tiap-tiap class yang akan di deklarasikan nanti di file index. 

selanjutnya tiap-tiap class sebagai contoh misalnya saya akan jabarkan class ```app\BaseClass``` : class ini adalah class utama kita coba perhatikan pada bagian namespacenya ```namespace  app\BaseClass```, namespace tersebut adalah penggunaan namespace dengan indikasi ```nama_direktori\nama_class``` nya, kalian bebas untuk membuat namespace apapun tidak perlu sama dengan yang saya buat, yang penting faham bagaimana algoritma dari fitur namespace ini.  

Ok yahh ... mudah difahami kan, kalian harus mencobanya langsung di web server kalian, sesuai dengan prinsip pemrogramman yaitu **amati, tiru dan modifikasi**. Mungkin selanjutnya kita akan membahas ```Autoloader PSR``` untuk memudahkan dalam mengelola tiap file yang akan digunakan. Ok ! Sekian dari saya.


saya harap tulisan ini dapat bermanfaat untuk kalian. 

Implementasi namespace serupa ada di repository berikut : 

<a href="https://github.com/codesyariah122/Learn-WebDev/tree/master/Project" target="_blank">Learn WebDev</a>
**salam** 

***Puji Ermanto***




