---
layout: post
title:  "Parsing data covid 19 dengan PHP CURL, Ajax Jquery"
author: puji
categories: [ php, ajax, jquery ]
image: assets/images/post/covid.png
tags: [webdeveloper]
opening: بسم الله الرحمن الرحيم
---  


### Parsing data JSON upadte data covid19 dengan PHP CURL  

Hai gaes, halo para coders, happy weekend. semoga sehat-sehat terus sampai week end kali ini. salam jumpa di artikel terbaru gout.  
kali ini gout mau membahas mengenai ```pandemi``` yang masih terus berlangsung, semoga cepat berakhir dan semoga tidak bertambah lagi suspek-suspek lainnya. Aamiin.  

***parsing data JSON with CURL***
apa itu curl ? 
*Curl* adalah sebuah program dan library untuk mengirim dan mengambil data melalui URL.

Curl adalah sebuah program:

Aritnya curl adalah sebuah program atau tools yang digunakan pada command line (CMD).  

```shell
curl https://codesyariah122.github.io
```  
***Curl adalah sebuah libarary:***  

Artinya sekumpulan fungsi-fungsi curl yang dibungkus dalam paket libcurl dan bisa digunakan dalam berbagai macam bahasa pemrograman.  

## CURL di PHP  
dalam artikel ini gout hanya membahas penggunaan library curl di bahasa pemrograman PHP dan berbasi web. dalam studi kasusnya yaitu mengambil sebuah data dari informasi mengenai covid19 untuk wilayah indonesia, format data sumber adalah ```JSON```.  mungkin tanpa berpanjang-panjang langsung ajah ke prakteknya. 

dalam hal ini gout bikin direktori baru di root webserver ```/var/www/html``` gout buat direktori dengan nama ```testAPI``` di webserver ```apache2```. kemudian buka direktori ```testAPI``` di code editor. 

buat beberapa file , diantaranya adalah : 
1. index.php (ini file utama nya)
2. curl.php (file ini berisi fungsi untuk menjalankan fungsi curl di php)
3. dataProcess.php (file berfungsi untuk mengambil alih prosess dari ajax saat mengirim data dari input)
4. detail.php (file ini bertugas menampilkan detail data keseluruhan yang tidak masuk ke table)
5. script.js (file jquery yang akan melakukan pengiriman dan pengambilan data dari server)
6. detail.js (file jquery juga file ini akan mengambil sebuah id=key di tag <td>)
7. jquery.min.js ( bisa di download di link berikut : <a href="https://raw.githubusercontent.com/codesyariah122/Learn-WebDev/master/updateCovid19_Indonesia/jquery.min.js">jquery</a>)  

setelah menyiapkan semua file yang ada di daftar tersebut. 

***dalam artikel kali ini : *** source data ```API``` dari link berikut : <a href="https://data.covid19.go.id/public/api/prov.json">Update data covid19 per provinsi</a>  

### file curl.php
buka file curl.php kemudian copy baris code berikut , isinya adalah fungsi untuk menjalankan curl di php : 

```php
<?php  
function curl($url){
	$curl = curl_init();
	curl_setopt($curl, CURLOPT_URL, $url);
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
	$result = curl_exec($curl);

	curl_close($curl);

	return json_decode($result, 1);
}
?>
``` 
file ```curl.php``` ini mengembalikan json_decode yaitu menerjemahkan string data berformat JSON, ```json_decode``` ini adalah sebuah fungsi ```php``` untuk menterjemahkan string JSON agar bisa di assignment ke dalam suatu variable. 

### file index.php
selanjutnya buka file index.php yang merupakan file utama di root direktori aplikasi kita, copykan code dibawah ini : 

```php
<!-- 
source-code : 	https://github.com/codesyariah122/Learn-WebDev/blob/master/updateCovid19_Indonesia/readme.md
author  : Puji Eramnto
update : aug-2020
Semoga lekas sembuh semuanya
 -->
<?php require_once 'curl.php'; ?>
<!DOCTYPE html>
<html>
<head>
	<title>Update Covid19 Indonesia</title>
<style type="text/css">
	table{
		margin-top: 5rem;
		border-collapse: collapse;
		border: 0px solid black;
	}
	th{
		background: rgb(50, 115, 220);
		color: hsla(185, 49%, 89%, 1);
		padding: .8rem;
	}
	td{
		text-align: center;
		color: #fff;
		font-weight: bold;
		padding: .8rem;
		background: hsla(212, 68%, 6%, 1);
	}
	td:hover{
		background: coral;
	}
	select{
		margin-top: .9rem;
		margin-bottom: -1.9rem;
	}
	.detail{
		color: #fff;
		background: hsla(355, 90%, 57%, 1);
		cursor: pointer;
	}
	.detail:hover{
		background:hsla(290, 62%, 37%, 1);
		color:#fff;
	}
	#detail{
		margin-top: 2rem;
		width: 50%;
	}
</style>
</head>
<body>

<?php  
$data = curl('https://data.covid19.go.id/public/api/prov.json')['list_data'];
$lastUpdate = curl('https://data.covid19.go.id/public/api/prov.json')['last_date'];
?>
<?php //var_dump($data); die; ?>

<h1>Update Covid 19 Indonesia </h1>
<h3>Last Update : <?=$lastUpdate?></h3>
<select>
	<option>-Pilih Provinsi-</option>
<?php  $i=0; do{ ?>	
	<option value="<?=$i?>"><?=$data[$i]['key']?></option>
<?php $i++; }while($i <= count($data)-1); ?>	
</select>

	<table>
		<tr>
			<th>Provinsi</th>
			<th>Jumlah Kasus</th>
			<th>Sembuh</th>
			<th>Meninggal</th>
			<th>Dirawat</th>
			<th>Aksi</th>
		</tr>
		<tr id="result">
		</tr>
	</table>


	<div id="detail"></div>

<script type="text/javascript" src="jquery.min.js"></script>
<script type="text/javascript" src="script.js"></script>

</body>
</html>
```  
file ```index.php``` ini berisi input berupa select, option untuk memilih provinsi yang akan di kirim ke server.

### file script.js
kemudian selanjutnya, buka file script.js, yang akan menjalankan api ajax dengan jquery, copykan code berikut : 
```javascript
	$(document).ready(function(){
		$('select').on('change', function(e){
			let provinsi = $(this).val();

			if(provinsi == "-Pilih Provinsi-"){
				alert("Pilih provinsi terlebih dahulu");
				$('select').val('');
			}else{
				$.ajax({
					url: 'dataProcess.php?provinsi='+provinsi,
					method: 'post',
					data: 'provinsi='+provinsi,
					success: function(response){
						if(response){
							$('select').val("-Pilih Provinsi-");
							console.log(response);
							$('#result').html(response);
						}
					}
				})
			}
			
		});

	});
```  
fungsi ```$.ajax({})``` ini akan melakukan pengiriman data dari input select yang di pilih dan click user kemudian mengirimkan informasi data (value) ke file ```dataProcess.php``` 

### file dataProcess.php  
buka file dataProcess.php, file ini yang akan menangkap informasi data yang dikirim oleh fungsi ```$ajax({})``` diatas, yang merupakan data(value) dari input yang di click atau dipilih oleh user.

```php
// file dataProcess.php
<?php
session_start();
require_once 'curl.php';

if( is_numeric(@$_GET['provinsi']) ){
	$provinsi = @$_POST['provinsi'];
	$_SESSION['key'] = $provinsi;
	$data = curl('https://data.covid19.go.id/public/api/prov.json')['list_data'][$provinsi];
	// echo count($data); die;
?>
	<td id="key" data-key="<?=$_SESSION['key']?>"><?=$data['key']?></td>
	<td><?=number_format($data['jumlah_kasus'], 0)?></td>
	<td><?=number_format($data['jumlah_sembuh'], 0)?></td>
	<td><?=number_format($data['jumlah_meninggal'], 0)?></td>
	<td><?=number_format($data['jumlah_dirawat'], 0)?></td>
	<td><button class="detail" id="<?=$data['key']?>">Detail Lainnya</button></td>

<?php }?>

<script type="text/javascript" src="detail.js"></script>

```
difile ```dataProcess.php``` tersebut gout menangkap ```session``` dari field data yang dikirim oleh ajax kemudian di assignment kedalam variable global session.  

### file detail.php  
selanjutnya file ```detail.php``` file ini bertugas untuk menyajikan data secara keseluruhan yang tidak dimuat di table. maka code ```detail.php``` adalah sebagai berikut :  

```php
<?php 
session_start();
require_once 'curl.php'; 
if(is_numeric(@$_GET['key'])):
	$key = @$_POST['key'];
	$data = curl('https://data.covid19.go.id/public/api/prov.json')['list_data'][$key];
	unset($_SESSION['key']);
	session_destroy();
?>

<fieldset>
	<legend>Detail data <b><?=$data['key']?></b></legend>
	<h3>Penambahan kasus : </h3>
	<ul>
		<li>Positif : <?=$data['penambahan']['positif']?></li>
		<li>Sembuh : <?=$data['penambahan']['sembuh']?></li>
		<li>Meninggal : <?=$data['penambahan']['meninggal']?></li>
	</ul>

	<h3>Detail berdasarkan jenis kelamin : </h3>
	<ul>
		<li>Laki-laki : <?=$data['jenis_kelamin'][0]['doc_count']?></li>
		<li>Perempuan : <?=$data['jenis_kelamin'][1]['doc_count']?></li>
	</ul>

	<h3>Detail berdasarkan kelompok umur : </h3>
	<ul>
		<li><?=$data['kelompok_umur'][0]['key']?> Tahun : <?=$data['kelompok_umur'][0]['doc_count']?></li>
		<li><?=$data['kelompok_umur'][1]['key']?> Tahun : <?=$data['kelompok_umur'][1]['doc_count']?></li>
		<li><?=$data['kelompok_umur'][2]['key']?> Tahun : <?=$data['kelompok_umur'][2]['doc_count']?></li>
		<li><?=$data['kelompok_umur'][3]['key']?> Tahun : <?=$data['kelompok_umur'][3]['doc_count']?></li>
		<li><?=$data['kelompok_umur'][4]['key']?> Tahun : <?=$data['kelompok_umur'][4]['doc_count']?></li>
		<li><?=$data['kelompok_umur'][5]['key']?> Tahun : <?=$data['kelompok_umur'][5]['doc_count']?></li>
	</ul>
</fieldset>

<?php endif; ?>
```  

### file detail.js
file ```detail.js``` ini sama seperti file jquery sebelumnya yaitu file ```script.js``` yaitu untuk menjalankan fungsi ajax, menangkap data dari input select kemudian di kirim ke file yang akan menangkap dalam bagian ini adalah file ```detail.php``` yang akan menangkap data ajax dari file fungsi ```$.ajax(){}```, di file ```detail.js```, berikut isi coding dari file ```detail.js``` :  

```javascript
$('.detail').on('click', function(){
	$('#detail').load('detail.php').fadeIn(1000);
	let key = $('#key').data('key');
	// alert(key);
	$.ajax({
		url:'detail.php?key='+key,
		type: 'post',
		data: 'key='+key,
		success: function(data){
			if(data){
				$('#detail').html(data).fadeIn(1000);
			}
		}
	})	
})
```
sepertinya semua code telah di salin ke dalam susunan algorithma di aplikasi fetching data covid19 ini, jika ada file yang kurang , silahkan buka di repo berikut : 
<a href="https://github.com/codesyariah122/Learn-WebDev/tree/master/updateCovid19_Indonesia">updateCovid19_Indonesia</a>  

setelah semua code sudah disalin, coba buka di browser ```localhost/testAPI```, dan hasil akhirnya sepert ini 


![CURL_PHP]({{site.url}}/assets/images/post/curl_php_covid19.gif)  



akhirnya gout cukupkan sampai disini artikel ini, nanti mungkin di lanjut mengenai ```CURL_PHP```, ```JQUERY AJAX``` , ok sekian dulu artikel kali ini, akhir kata gout ucapkan terima kasih, semoga coders semua selalu diberikan nikmat, sehat, dan nikmat waktu luang. jangan lupa jaga stabilitas kesehatan diri kita. ok sekian.

waasalamm....

***puji ermanto***  

