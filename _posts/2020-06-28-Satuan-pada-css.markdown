---
layout: post
title:  "Satuan Pada Css"
author: puji
categories: [ css, webdev ]
image: assets/images/post/css.png
tags: [webdevelopment]
opening: بسم الله الرحمن الرحيم
---  

![css]({{site.url}}/assets/images/post/css.png)  

# Bedah Satuan CSS  
Jika pada praktek sehari-hari kita hanya menggunakan satuan % dan px, namun kali ini saya akan membahas penggunaan berbagai satuan yang tepat yang mungkin belum diketahui.  

### Satuan (%) (Persentase)  

Persentase adalah satuan yang tidak menghitung berdasarkan ukuran elemen itu sendiri namun perbandingan dengan induk elemennya.

Biasanya digunakan dalam hal penentuan ukuran kolom (Grid System), mari kita intip Grid System dari beberapa Framework CSS:  

#### Semantic UI  

{% highlight css %}
	.ui[class*="six column"].grid > .row > .column,
  	.ui[class*="six column"].grid > .column:not(.row) {
    width: 16.66666667%;
  }
{% endhighlight %}  

#### Bootstrap  

{% highlight css %}
  .col-xs-6 {
    width: 50%;
  }
{% endhighlight %}  

Namun satuan ini juga baik digunakan dalam penentuan ukuran header atau h1, h2, h3, dst. dalam beberapa kasus, seperti ingin mempermudah pengerjaan situs yang responsif.  

### Satuan px(pixel)  

ni adalah satuan yang sering digunakan oleh mayoritas programmer, namun tahukah? bahwa satuan ini hanya cocok digunakan oleh elemen yang berukuran akurat, tidak terpengaruh oleh elemen disekitarnya atau induknya.  

### Satuan rem dan em  

Satuan rem dan em bisa dikatakan 16 kali dari satuan px, jadi 1rem/em = 16px, namun pada satuan em bisa bergantung pada font-size, misalnya induk elemen memiliki property font-size 14px dan anaknya memiliki property font-size: 1.6em, maka hasil yang akan ditampilkan adalah 14px * 1.6em = 22.4px.

Salah satu contoh kasus yang satuan em terasa sangat bermanfaat adalah pada padding untuk elemen yang font-sizenya mudah berubah-ubah, contoh seperti :  

{% highlight css %}
  .button{
    font-size: 1em;
    padding: 5em 10em;
  }
{% endhighlight %}  

Dikarenakan induk yang mempunyai property font-size dari element .button tidak ada, maka property font-size bernilai 1em = 16px, namun pada padding 5em dan 10em terpengaruh oleh nilai dari font-size, jadi 5em 16px = 80px, dan 10em 16px = 160px.

Tapi tidak dengan satuan rem, rem satuan yang tidak terpengaruh oleh font-size, em bisa dikatakan pewaris dari rem yang berarti "r" adalah "root".  

### Satuan vw dan vh  

Satuan ini disebut viewport, satuan ini adalah cara terbaik untuk membuat elemen responsif, kenapa bisa?

Hampir sama dengan % atau persentase, namun persen tidak bisa menentukan height, beda dengan vw dan vh, vw artinya viewport width dan vh artinya viewport height.

Satuan ini bergantung pada induk elemennya, jika induk elemen mempunyai ukuran 300px x 400px maka 1vh darinya adalah 400 * 1/100 = 4px dan jika 100vh artinya adalah height yang kita tentukan 100% dari height induknya.

Jika induk dari element adalah 100% atau tak terhingga, maka 100vh bergantung pada ukuran layar.  

{% highlight css %}
  body{
    height: 100%;
  }
  body .screen.cover{
    height: 100vh;
  }
{% endhighlight %}  

Teknik ini sangat bermanfaat jika kita ingin membuat fullscreen elemen, dan saya sangat sering menggunakannya terutama membuat cover untuk front page.  

### Satuan vmin dan vmax  

Satuan ini mirip dengan vw dan vh, bedanya jika kita menentukan 100vmin satuan ini akan bergantung pada induk dengan ukuran terendah, bingung?

Misalnya induk elemen memiliki ukuran 1000px x 1200px, jika anak elemen memakai :  

{% highlight css %}
  .anak{
    height: 100vmin;
    width: 100vmin;
  }
{% endhighlight %}  

Maka hasil yang akan ditampilkan seperti :  

{% highlight css %}
  .anak{
    height: 1000px;
    width: 1000px;
  }
{% endhighlight %}  

Begitu juga sebaliknya.  

### Satuan ex dan ch  

Satuan ini mirip dengan rem dan em, bedanya 1ex/ch = 8px, namun satuan ini tidak hanya bergantung pada font-size tapi juga bergantung pada font-family agar ukurannya lebih spesifik.  

#### Kesimpulan : 

~ Bahwa mengetahui detil dari setiap satuan pada css sangat penting demi kualitas produk yang kita buat, semoga bermanfaat! ~