---
layout: post
title:  "Memasang Plugins Input Telepon International"
author: puji
categories: [ PHP, intlTelponinput ]
image: assets/images/post/intl2.jpg
tags: [webdevelopment]
opening: بسم الله الرحمن الرحيم
---  
![maps1]({{ site.url }}/assets/images/post/intl3.png)  

Dunia internet sangatlah luas dan tidak terbatas termasuk dunia website tidak akan pernah ada habis nya jika kita mau upgrade skill untuk membuat sesuatu yang baru dan membuat website kita lebih bagus dan inovasi baru. Banyak design website sekarang ini selalu mencari apa yang baru untuk tampilan yang gimik, di dorong dari hal baru lah semua orang banyak mencari – cari agar website tidak mirip dengan yang lainnya dan kinerja website lebih cepat dan tidak ada load sama sekali. Jquery ataupun Javascript merupakan bahasa yang tidak dapat di pisahkan dengan HTML/CSS karena Jquery/Javascript merupakan pendukung kinerja website menggunakan plugins ataun native. Di artikel kali ini saya akan memberikan tips dan trik tentang Cara Menggunakan Plugins Input Telepon International dimana kita akan menggunakan plugins Jquery yang memang sudah di sediakan. Tinggal kita copy saja script untuk kita tempat di dalam website kita, tentu nya hasil yang di dapatkan sangatlah bagus. Selain bagus website yang kita berikan beberapa plugins tentunya memiliki kelas tersendiri. Kali ini saya akan mencoba membuat input nomor telepon internasional, dimana ketika kita pilih suatu negara maka form akan memberitahukan user kode telepon sesuai negaranya. Di bawah ini adalah screnn shoot nya yang nanti kita akan buat.  


![maps1]({{ site.url }}/assets/images/post/intl2.jpg)  

Nah seperti yang teman – teman lihat pada gambar di atas ini, ketika di klik pada salah satu bendera negara maka di dalam input akan memberitahukan kode negaranya ini semua memakai plugins Jquery nya, kita akan menggunakannya untuk menghasilkan seperti gambar di atas ini. Baik, sekarnag kita implementasikan Cara Menggunakan Plugins Input Telepon International pertama – tama kalian download terlebih dahulu plugins nya atau bisa 
***klik <a href="https://www.dropbox.com/s/y2mriu2o0cao8d3/PLUGINS.rar?dl=0">link</a> ini***, kemudian extract pada folder nya. Berikutnya buka text editornya dan copy script html nya di bawah ini.  

```
<!DOCTYPE html>
<html>
<head>
	<title>Input telepon dengan code negara</title>
	   <link rel="stylesheet" href="PLUGINS/css/intlTelInput.css">
       <link rel="stylesheet" href="PLUGINS/css/demo.css"> 
</head>
<body>

<form action="" method="post">
<label for="phone">Phone : </label>
<input type="tel" name="phone" id="phone">
<button type="submit" name="submit">Submit</button>
</form>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<script src="PLUGINS/js/intlTelInput.js"></script>
 <script>
    $("#phone").intlTelInput({
      utilsScript: "PLUGINS/js/utils.js"
    });  
</script>
</body>
</html>
```  
jika sudak dicopy save dengan nama terserah kalian, dan coba lihat ada icon bendera muncul disamping kiri input telpon nya.  
ok sekian dulu yah coders. 
**Salam**  
