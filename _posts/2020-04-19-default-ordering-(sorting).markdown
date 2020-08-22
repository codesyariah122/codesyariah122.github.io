---
layout: post
title:  "Default ordering (sorting) datatables not working"
author: puji
categories: [ nativephp, vanilla javascript ]
image: assets/images/post/Untitled2.jpg
tags: [webdevelopment]
opening: بسم الله الرحمن الرحيم
---  
![default order datatables]({{site.url}}/assets/images/post/Untitled2.jpg)  

Assalamualaikum, coders...  
datatables adalah sebuah plugin untuk memudahkan para developer web dalam mengelola data, banyak sekali manfaat dari plugin ini.  
kita tidak perlu membuat sebuah struktur html baru untuk table data kita, hanya cukup menginstall plugin nya saja.  
pada dasarnya penginstallan nya sama seperti memasang source untuk javascript kita hanya perlu memanggil link dari data tables nya saja.  
```
        <script src="https://cdn.datatables.net/1.10.20/js/jquery.dataTables.min.js" crossorigin="anonymous"></script>
        <script src="https://cdn.datatables.net/1.10.20/js/dataTables.bootstrap4.min.js" crossorigin="anonymous"></script>
```  

atau kalian bisa langsung download source nya di website nya databales langsung.  
<a href="https://datatables.net/">Data tables</a>  

pada kesempatan ini saya ingin berbagi mengenai default sorting dari datatables yang tidak berjalan, jadi ceritanya saya ingin menampilkan data  
yang saya kelola dari database, dan saya ingin menampilkan nya secara descending atau mengurut dari sebuah id yang terbesar. 
query database saya seperti ini : 
```
            $tampilUser = tampilUser("SELECT * FROM user ORDER BY id DESC");
```  

seharusnya table data yang disorting adalah mulai dari yang terbesar berada di row teratas, tapi bila kita menggunakan datatables secara default tidak berjalan  
karena secara default plugin datatables menset sorting secara ascending atau dimulai dari 0 atau yang terkecil id atau uniqid nya.  

secara basic mudah untuk merubah defaultnya karena jika kita mendownload secara keseluruhan plugin datatables kita akan menemukan konfigurasi defaultnya, dan di konfigurasi default itulah kita kasih perubahan.  
kita tambahkan code berikut di code default datatables nya, nama filenya datatables-demo.js  

```
"order": [[ 3, "desc" ]]
```  
keseluruhan scriptnya adalah seperti ini :  


```
$(document).ready(function() {
  $('#dataTable').DataTable(
  		{
			"order": [[ 3, "desc" ]]  		
		}
  	);
});
```

ok akhirnya data di tables sudah terurut secara descending sesuai query yang saya inginkan dari database. 
sekian dulu gansss...





