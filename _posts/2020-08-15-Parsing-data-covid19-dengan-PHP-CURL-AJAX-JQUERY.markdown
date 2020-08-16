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
3. processProcess.php (file berfungsi untuk mengambil alih prosess dari ajax saat mengirim data dari input)
4. script.js (file jquery yang akan melakukan pengiriman dan pengambilan data dari server)
5. jquery.min.js ( bisa di download di link berikut : <a href="https://raw.githubusercontent.com/codesyariah122/Learn-WebDev/master/updateCovid19_Indonesia/jquery.min.js">jquery</a>)  

setelah menyiapkan semua file yang ada di daftar tersebut. 

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
		background: rgba(255, 0, 0, 0.3);
		color:#f000ee;
		padding: .8rem;
	}
	td{
		text-align: center;
		color: #fff;
		font-weight: bold;
		padding: .8rem;
		background: rgba(255, 0, 0, 0.7);
	}
	td:hover{
		background: coral;
	}
	select{
		margin-top: .9rem;
		margin-bottom: -1.9rem;
	}
</style>
</head>
<body>

<?php  $data = curl('https://indonesia-covid-19.mathdro.id/api/provinsi/')['data'];?>
<?php //var_dump($data); die; ?>
<h1>Update Covid 19 Indonesia</h1>
<select>
	<option>-Pilih Provinsi-</option>
<?php  $i=0; do{ ?>	
	<option value="<?=$i?>"><?=$data[$i]['provinsi']?></option>
<?php $i++; }while($i <= count($data)-1); ?>	
</select>

	<table>
		<tr>
			<th>Provinsi</th>
			<th>Terkonfirmasi Postif</th>
			<th>Terkonfirmasi Sembuh</th>
			<th>Terkonfirmasi Meninggal</th>
		</tr>
		<tr id="result">
			
		</tr>
	</table>

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
			
		})
	})
```  
fungsi ```$.ajax({})``` ini akan melakukan pengiriman data dari input select yang di pilih dan click user kemudian mengirimkan informasi data (value) ke file ```dataProcess.php``` 

### file dataProcess.php  
buka file dataProcess.php, file ini yang akan menangkap informasi data yang dikirim oleh fungsi ```$ajax({})``` diatas, yang merupakan data(value) dari input yang di click atau dipilih oleh user.

setelah semua code sudah disalin, coba buka di browser ```localhost/testAPI```, dan hasil akhirnya sepert ini 


![CURL_PHP]({{site.url}}/assets/images/post/curl_php_covid19.gif)  



akhirnya gout cukupkan sampai disini artikel ini, nanti mungkin di lanjut mengenai ```CURL_PHP```, ```JQUERY AJAX``` , ok sekian dulu artikel kali ini, akhir kata gout ucapkan terima kasih, semoga coders semua selalu diberikan nikmat, sehat, dan nikmat waktu luang. jangan lupa jaga stabilitas kesehatan diri kita. ok sekian.

waasalamm....

***puji ermanto***  

