---
layout: post
title:  "crud data dengan jquery ajax"
author: puji
categories: [ php, pdo, ajax, jquery ]
image: assets/images/post/ajax.jpeg
tags: [webdeveloper]
opening: بسم الله الرحمن الرحيم
---  


### crud dengan php ekstensi pdo dengan pemanfaatan api jquery ajax  

pada dokumentasi kali ini saya membuat dokumentasi crud data dengan php menggunakan ekstensi pdo dan menggunakan fitur apijquery ajax http request.  
crud adalah program pengolahan data paling basic yang harus di pelajari dalam pemrogramman. ok langsung saja disimak...
selamat menyimak :  

<video width="320" height="240" controls>
  <source src="{{site.url}}assets/imagespost/crud_pdo.mp4" type="video/mp4">
  <source src="{{site.url}}assets/imagespost/crud_pdo.ogg" type="video/ogg">
  Your browser does not support the video tag.
</video>  

#### ajax rule 
setiap request ke database dari client side di redirect ke ajax sebelum di kembalikan ke clientside :  
contoh penerapan ajaxnya :  

```javascript
//ketika tombol add di click maka client akan merequest data ke server disini ajax jadi mengambil alih server side
$('#cruddata').on('click', '#add', function(){
	//ambil value dari html input
	const productCode = $('#productcode').val(); //value dari inputan
	const productName = $('#productname').val();
	const productPrice = $('#productprice').val();

	//validasi inputan yang direquest client diambil alih ajax
	if(productCode == '' || productName == '' || productPrice == ''){
		alert("Form data is empty, please try again");
	}else{
		//menggunakan metode http request dari apijquery
		$.ajax({
			url: 'contents/add.php?page=add', //url untuk mentrigger data ke database server
			type: 'post', //metode yang akan digunakan untk mentrigger data
			//kemudian deligasikan format datanya 
			data: 'productcode='+productCode+'&productname='+productName+'&productprice='+productPrice,
			//kembalikan response dari server ke client side
			success: function(response){
				if(response == 'success'){
					//load kembali view data dari server ke client
					$('#viewdata').load('contents/view.php?page=add').fadeIn(100);
					//reload html inputannya 
					$('#cruddata').hide('slow').fadeOut(1000);
					//kembali lakukan reload halaman keseluruhan untuk menghindari url yang ambigu
					location.reload();
				}else{
					alert("Failed add new product");
				}
			}
		});
	}
});
```  

code diatas adalah api ajax untuk meredirect request data dari client side. masih banyak metode yang bisa di lakukan javascript dalam menangani request method dari client side, tapi dalam dokumentasi kali ini penulis hanya menjabarkan sedikit basicnya saja, mungkin di lain kesempatan, akan penulis ulas kembali secara keseluruhan. 
ok sekian dulu dirasa penulis cukupkan dokumentasi crud data dengan pdo yang ditangani oleh ajax jquery. terima kasih. 
salam .











