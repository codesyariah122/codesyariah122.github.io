---
layout: post
title:  "Membuat fitur live search engine dengan ajax jquery"
author: puji
categories: [ php, ajax, jquery ]
image: assets/images/post/crud_ajax_live_search.gif
tags: [webdeveloper]
opening: بسم الله الرحمن الرحيم
---  


### Fitur live search dengan ajax jquery  
 
![live_search_ajax]({{site.url}}/assets/images/post/live_search.png)  

halo coders semuanya ....  
ini masih melanjutkan edisi crud data dengan ajax jquery dengan menggunakan metode php pdo ekstension sebagai sql universal interfacenya.  dalam artikel kali ini gout mau menerapkan sebuah fitur live search ala-ala google atau live search lain dimedia atau aplikasi berbasis web maupun mobile lainnya, masih dengan php disisi beckend nya. apa daya cuma itu yang baru gout bisa.  
ok tan[p]a berlama lama kita langsung ajah ke codingan nya :  

***menyambung dari artikel crud data ajax jquery, di artikel sebelumnya***  

[Crud data ajax jquery](https://github.com/codesyariah122/crud-data-with-php-PDO-Jquery-ajax/tree/master/assets "Crud data sederhana dengan ajax jquery")  

dari code-code sebelumnya gout hanya menambahkan satu fungsi baru sebagai sebuah metode untuk menjalankan program live search.  
didalam file function.php, tambahkan fungsi baru di baris paling bawah, kemudian copy code dibawah ini:  

```php
function searchData($keyword){
	$query = "SELECT * FROM `product` WHERE 
				`product_code` LIKE '%$keyword%' OR
				`product_name` LIKE '%$keyword%' OR
				`product_price` LIKE '%$keyword%'
				ORDER BY `id` DESC
	";
	return view($query);
}
```  
dari fungsi diatas terdapat baris code berikut :  ```return view()``` code ini adalah fungsi callback yang merupakan bagian reusable program dari aplikasi cruddata sederhana ini, atau bahasa manusianya memanggil fungsi dari sebuah fungsi yang sebelumnya sudah dibuat, karena di code sebelumnya di dalam file ```functions.php``` tersebut terdapat fungsi ```view``` yakni sebuah fungsi untuk melakukan query (mengambil data) dari database untuk disajikan ke view frontend.  

***selanjutnya ...***  

berikutnya kita buka file ```view.php``` di direktori ```contents/``` : kemudian ubah semua baris code tersebut menjadi seperti ini :  

```php
<style>
  .loader{
    width:150px;
    position:absolute;
    top:-2rem;
    margin-left: -2rem;
    z-index:-1;
    display:none;
  }
  </style>

<h1 class="text-primary text-center mt-4 pt-4">Product Table</h1>
    
    <div class="form-group">
      <div class="row">
        <div class="col-xs-12">
          <input type="text" class="form-control" id="keyword" name="keyword" placeholder="Type keywords to search the product ... " autocomplete="off">
        </div>
        <div class="col-md-4">
          <img src="assets/img/animated.gif" class="loader">
        </div>  
      </div>
    </div>

<table class="table table-hover">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Product Code</th>
      <th scope="col">Product Name</th>
      <th scope="col">Product Price</th>
      <th scope="col">Operation Table</th>
    </tr>
  </thead>
  <tbody id="product-data">
  </tbody>
</table>

<script type="text/javascript">
  
  $('#product-data').load('contents/product_data.php').fadeIn(1000);

</script>

```  
dari code diatas saya ubah semua struktur content viewnya, untuk memodularisasikan data request dari frontend ke database server. dalam file ```view.php``` tersebut seluruh data di table data dibagian ```<tbody></tbody>``` saya pindahkan ke file lain 'masih di direktori yang sama direktori contents/' yaitu file ```product_data.php``` kemudian ```<tbody>``` nya saya jadikan selector untuk jquery sebagai reverse data dari file ```product_data.php``` dibagian akhir file ```view.php``` terdapat tag ```<script>``` baru, script tersebut fungsinya untuk meload data difile ```product_data.php``` dengan kata lain ini menggantikan fungsi require ataupun include, supaya codingan kita tertata lebih rapi dan mudah untuk di maintenance di lain waktu. fungsi file view ini hanya sebagai reverse dari file product_data.php. di file view.php ini kita tambahkan sebuah inputan baru untuk mengirim input dari keyword yang di ketikan oleh client disisi frontend.

***kemudian ...***  

difile lainya yakni file ```product_data.php``` jika belum ada buat file baru di direktori yang sama dengan file view.php yaitu direktori contents/, buat file baru dengan nama ```product_data.php``` kemudian copy code berikut :  

```php
<?php  
require_once '../functions.php';
if(@$_GET['keyword'] == @$_POST['keyword']):
    if(searchData(@$_POST['keyword'])):
      usleep(700000);
      $viewData = searchData(@$_POST['keyword']);
    endif;
endif;
?>


<?php if(empty($viewData)): ?>
  <tr>
    <td colspan="3">No data on this table product</td>
  </tr>
<?php endif; ?>

 <?php $no=1; foreach($viewData as $view): ?>
    <tr>
      <th scope="row"><?=$no?></th>
      <td><?=$view['product_code']?></td>
      <td><?=$view['product_name']?></td>
      <td><?=$view['product_price']?></td>
      <td>
        <button id="<?=$view['id']?>" class="edit btn btn-danger btn-sm"><i class='fas fa-edit'></i></button>
        <button id="<?=$view['id']?>" class="del btn btn-info btn-sm"><i class='fas fa-eraser'></i></button>
      </td>
    </tr>
<?php $no++; endforeach; ?>
```  
dari file diatas inilah setiap data yang direquest akan ditampung, diambil nilainya yang berupa method ```@$_GET``` dan ```@$_POST```, setiap data yang direquest di tampung ke dalam sebuah variable global php, dan kemudian bisa disimpan kedalam variabel baru, dan variabel baru ini diberinama ```$viewData``` yakni variabel yang berisi sebuah fungsi yakni fungsi baru yang dibuat di file ```functions.php``` yaitu fungsi ```searchData()``` dan fungsi searchData sendiri memiliki nilai parameter, kemudian nilai parameternya itu kita isi dari sebuah input di file ```view.php``` yaitu dibagian ini :  
```php
<input type="text" class="form-control" id="keyword" name="keyword" placeholder="Type keywords to search the product ... " autocomplete="off">
```  
input tersebut akan mengirim data menggunakan sebuah method dalam program ini yaitu method ```post``` sedangkan method ```get``` digunakan ketika data ditangani oleh ajax dalam parameter fungsi nya. 
jadi setiap inputan tersebut akan dikelola terlebih dahulu oleh ajax di file javascript, sebelum dikirim ke server di sisi beckend. dan seperti inilah fungsi ajax yang menangani setiap request data dari inputan tersebut :  

```javascript
$('#viewdata').on('keyup', '#keyword', function(){
	$('.loader').show();
	//variable untuk menampung nilai input dari keyword
	const keyword = $('#keyword').val();

	$.ajax({
		url: 'contents/product_data.php?keyword='+keyword,
		type: 'post',
		data: 'keyword='+keyword,
		success: function(response){
			if(response){
				$('.loader').hide('slow').fadeOut(1000);
				$('#product-data').html(response);
			}else{
				Swal.fire("Data no found");
			}
		}
	});
});
```  

dari file tersebutlah inputan dari keyword akan dikelola dan dikirim keserver dalam sebuah parameter global variable php yaitu 
1. ```@$_GET``` -> untuk menangani request url  
2. ```@$_POST``` -> untuk mengirim data yang berasal dari input keyword.  

![live_search_ajax]({{site.url}}/assets/images/post/crud_ajax_live_search.gif) 

keseluruhan struktur direktori dan source code bisa disimak dan diteliti lebih lanjut pada link berikut :  
[Crud data ajax jquery](https://github.com/codesyariah122/crud-data-with-php-PDO-Jquery-ajax/tree/master/assets "Crud data sederhana dengan ajax jquery") 

***akhir kata ...*** 
semoga bisa bermanfaat, sampai bertemu diartikel selanjutnya dan selanjutnya...
salam 


puji ermanto / webdeveloper ourcitrus / PT. Gemilang Citrus Berjaya