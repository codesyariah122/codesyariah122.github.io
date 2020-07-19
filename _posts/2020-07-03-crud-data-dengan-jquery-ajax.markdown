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

![crudAjax](https://raw.githubusercontent.com/codesyariah122/crud-data-with-php-PDO-Jquery-ajax/master/assets/crudAjax.gif)  


#### ajax rule 
setiap request ke database dari client side di redirect ke ajax sebelum di kembalikan ke clientside :  
contoh penerapan ajaxnya :  

```javascript
//ketika tombol add di click maka client akan merequest data ke server disini ajax jadi mengambil alih server side
$('#add').click(function(){
	//Swal.fire("Hallo world");
	$('#cruddata').hide('slow').fadeOut(1000);
	$('#animasi').load('contents/animated.php').fadeIn(1500);
	setTimeout(function(){
		$('#cruddata').hide().load('contents/add.php').fadeIn(1000);
		$('#animasi').hide('slow').slideUp(1000);
	}, 2500);
	
});

$('#cruddata').on('click', '#close', function(){
	$('#animasi').load("contents/animated2.php").fadeIn(2500);
	$('#cruddata').hide('slow').slideUp(1000);
	setTimeout(function(){
		$('#animasi').hide('slow').slideUp(1000);
	}, 3000);
});

$(document).ready(function(){
	// load view data 
	$('#viewdata').load('contents/view.php').fadeIn(1000);

	$('#cruddata').on('click', '#add', function(){
		const productCode = $('#productcode').val();
		const productName = $('#productname').val();
		const productPrice = $('#productprice').val();

		if(productCode == '' || productName == '' || productPrice == ''){
			alert("Form data is empty, please try again");
		}else{
			$.ajax({
				url: 'contents/add.php?page=add',
				type: 'post',
				data: 'productcode='+productCode+'&productname='+productName+'&productprice='+productPrice,
				success: function(response){
					if(response == 'success'){
						Swal.fire({
						  title: 'New product added',
						  text: "You product will be saved, product name : "+productName,
						  icon: 'success',
						  showCancelButton: false,
						  confirmButtonColor: '#808fe6',
						  cancelButtonColor: '#d33',
						  confirmButtonText: 'View Data Product'
						}).then((result) => {
						  if (result.value) {
						  	$('#cruddata').hide('slow').fadeOut(1000);
						  	Swal.fire(
						      'New product Saved : '+productCode,
						      'Your product data has been saved.',
						      'success'
						    );
							$('#animasi').load('contents/animated.php').fadeIn(2500);
							setTimeout(function(){
								$('#viewdata').load('contents/view.php').fadeIn(100);
								$('#animasi').hide('slow').slideUp(1000);
							}, 3000);
						  }
						});


					}else{
						alert("Failed add new product");
					}
				}
			});
		}
	});

	$('#viewdata').on('click', '.edit', function(){
		//ambil attribute id dari table data
		const id = $(this).attr('id');

		$.ajax({
			url: 'contents/edit.php',
			type: 'post',
			data: 'id='+id,
			success: function(response){
				$('#cruddata').hide().fadeIn(1000).html(response);
			}
		});
	});

	//proses edit 
	$('#cruddata').on('click', '#edit', function(){
		const productCode = $('#productcode').val();
		const productName = $('#productname').val();
		const productPrice = $('#productprice').val();
		const productId = $('#productid').val();

		if(productCode == '' || productName == '' || productPrice == ''){
			alert('No update !');
			$('#cruddata').hide('slow').fadeOut(1000);
		}else{
			$.ajax({
				url: 'contents/edit.php?page=edit',
				type: 'post',
				data: 'productcode='+productCode+'&productname='+productName+'&productprice='+productPrice+'&productid='+productId,
				success: function(response){
					if(response == 'success'){
						$('#cruddata').hide('slow').fadeOut(1000);
						$('#animasi').load('contents/animated2.php').fadeIn(1500);
						setTimeout(function(){
							$('#viewdata').load('contents/view.php').fadeIn(1000);
							$('#animasi').hide('slow').slideUp(1000);
						}, 3000);
						
					}else{
						alert('Failed update');
					}
				}
			});
		}

	});

	$('#viewdata').on('click', '.del', function(){
		const id = $(this).attr('id');
		Swal.fire({
		  title: 'Are you sure?',
		  text: "You won't be able to revert this!",
		  icon: 'warning',
		  showCancelButton: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: 'Yes, delete it!'
		}).then((result) => {
		  if (result.value) {
		  	$.ajax({
				url: 'contents/delete.php?page=del',
				type: 'post',
				data: 'id='+id,
				success: function(response){
					if(response){
						$('#cruddata').hide('slow').fadeOut(1000);
							Swal.fire(
						      'Deleted! product data with id : '+id,
						      'Your data has been deleted.',
						      'success'
						    );
						$('#animasi').load('contents/animated.php').fadeIn(1000);
						setTimeout(function(){
							$('#animasi').hide('slow').slideUp(1000);
							$('#viewdata').load('contents/view.php').fadeIn(1000);
						}, 2500);   

					}else{
						alert('Failed deleted data');
					}
				}
			});

		  }
		});


	});
});
```  

code diatas adalah api ajax untuk meredirect request data dari client side. masih banyak metode yang bisa di lakukan javascript dalam menangani request method dari client side, tapi dalam dokumentasi kali ini penulis hanya menjabarkan sedikit basicnya saja, mungkin di lain kesempatan, akan penulis ulas kembali secara keseluruhan. 
ok sekian dulu dirasa penulis cukupkan dokumentasi crud data dengan pdo yang ditangani oleh ajax jquery. terima kasih. 
salam .
untuk source code lengkap bisa di download di link berikut : [Source Code => CrudAjax](https://github.com/codesyariah122/crud-data-with-php-PDO-Jquery-ajax/tree/master/assets "Crud data sederhana dengan ajax jquery")