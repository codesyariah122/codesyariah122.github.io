---
layout: post
title:  "Fetch data Quran Menggunakan library ajax di jQuerY"
author: puji
categories: [ Javascript, ChartJS, JQuery ]
image: assets/images/post/quran-online/JQ-AJAX.jpg
tags: [webdevelopment]
opening: بسم الله الرحمن الرحيم
---  

{{page.opening}}  

![quran]({{site.url}}/assets/images/post/quran-online/quran-online.png)    


Assalamuallaaikum,  
Hallo sobat-sobat coders semua, apa kabarnya ? semoga kalian semua dalam keadaan sehat-sehat dan selalu diberikan dan di tunjukan kebaikan dalam segala hal dalam kehidupan kalian.  

Artikel kali ini akan membahas seputar tools yang telah lama digunakan oleh para pengembang web, yaitu jQuerY Dan Ajax, setiap pengembang web pasti kenal library tools javascript yang satu ini.  

Kali ini gout akan membagi seputar tips and trick pengolahan data yang bersumber dari api server, atau dengan kata lain mengambil konten data dari sumber yang telah di tentukan.  

Sumber data kali ini datang dari :  
Seorang programmer mudah Indonesia :  
<a href="https://github.com/sutanlab/quran-api" target="_blank">Sutanlab / quran-api</a>  
beliau menyediakan server data yang bisa kita manfaatkan di aplikasi kita, bagi kalian yang ingin berbagi donasi untuk pengembangan data beliau, dan juga sebagai sarana support bagi programmer keren di Indonesia, kalian bisa langsung check di link tersebut.  

#### Fetchin data quran-api  
Kita akan menggunakan data tersebut untuk membuat ```quran-online``` sederhana di aplikasi web yang akan kita kembangkan di artikel ini, langsung yuk kita ke codingannya.  

***Susunan Direktori***  
kurang lebih susunan direktori dari aplikasi ini adalah sebagai berikut :  
di direktori rootnya ```/var/www/html/quran/```  

```bash
root@debian:/var/www/html/quran# ls -l
total 8
drwxr-xr-x 5 puji122 puji122 4096 Jan 21 22:06 assets
-rw-r--r-- 1 puji122 puji122 3681 Jan 23 07:17 index.html
root@debian:/var/www/html/quran# 
```  
kemudian di direktori ```/var/www/quran/assets/``` :  
```bash
root@debian:/var/www/html/quran/assets# ls -l
total 12
drwxr-xr-x 2 puji122 puji122 4096 Jan 21 21:10 css
drwxr-xr-x 2 puji122 puji122 4096 Jan 22 10:36 img
drwxr-xr-x 2 puji122 puji122 4096 Jan 21 21:17 js
root@debian:/var/www/html/quran/assets# 

```  
kemudian di direktori ```/var/www/html/quran/assets/css/```:  

```bash
root@debian:/var/www/html/quran/assets/css# ls -l
total 4
-rw-r--r-- 1 puji122 puji122 334 Jan 23 06:46 app.css
root@debian:/var/www/html/quran/assets/css# 

```  

kemudian di direktori ```/var/www/html/quran/assets/img/``` :  

```bash
root@debian:/var/www/html/quran/assets/img# ls -l
total 96
-rw-r--r-- 1 puji122 puji122 25124 Jan 19 17:18 loader.gif
-rw-r--r-- 1 puji122 puji122 67640 Jan 22 10:35 loading2.gif
root@debian:/var/www/html/quran/assets/im
```  
Untuk file di direktori ```img/``` kalian bisa download sendiri atau kalian bisa akses link berikut :  
<a href="https://github.com/codesyariah122/Learn-WebDev/tree/master/quran/assets/img" target="_blank">assets/img/</a>  

Selanjutnya di direktori ```/var/www/html/quran/assets/js/``` :  

```bash
root@debian:/var/www/html/quran/assets/js# ls -l
total 16
-rw-r--r-- 1 puji122 puji122 4275 Jan 23 07:24 app.js
-rw-r--r-- 1 puji122 puji122  507 Jan 23 06:10 Obj.js
-rw-r--r-- 1 puji122 puji122 1395 Jan 23 06:40 quran.js
root@debian:/var/www/html/quran/assets/js# 

```  

Ok kalian bisa langsung membuat file-file tersebut satu persatu sesuai listing directory di atas.  

#### Praktek  
Cusss ... langsung buka code editor kalian, kemudian buka file ```index.html``` copy code berikut :  

```html
<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="assets/css/app.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script type="text/javascript" src="assets/js/quran.js"></script>
    <title>Quran Online</title>
  </head>
  <body>

    <div class="container">
        <div class="row">

            <div class="col-md-12">
                <h1>Baca Quran Online</h1>
                <hr>    
                
                <div class="row">
                    <div class="col-md-4">
                        <div class="input-group mb-3">
                          <select class="custom-select" id="select-surah" name="surah">
                              <!-- <option selected>Choose...</option> -->                       
                          </select>
                            <div class="input-group-append">
                                <button id="pilih-surah" class="btn btn-dark">Enter</button>
                            </div>
                        </div>
                    </div>

                    <!-- <div class="col-md-8">
                        <div class="form-inline">
                          <input class="form-control mr-sm-2" type="number" placeholder="Number Ayat ..." aria-label="Search" id="number" autocomplete="off">
                          <button class="btn btn-outline-success my-2 my-sm-0" type="button" id="cari">Search</button>
                        </div>   
                    </div>
                </div> -->

            </div>

            <div class="col-md-12">
                <div class="loader">
                    <img src="assets/img/loader.gif">
                </div>
                
                <div class="hasil"></div>

                <div class="error"></div>

                <div class="loader2">
                    <img src="assets/img/loading2.gif">
                </div>

                <div class="view-ayat"></div>

                <nav aria-label="Page navigation example">
                    <ul class="pagination"></ul>
                </nav>

            </div>

        </div>
    </div>

    <!-- Optional JavaScript; choose one of the two! -->

    <!-- Option 1: jQuery and Bootstrap Bundle (includes Popper) -->

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx" crossorigin="anonymous"></script>

    <!-- Option 2: jQuery, Popper.js, and Bootstrap JS
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.min.js" integrity="sha384-w1Q4orYjBQndcko6MimVbzY0tgp4pWB4lZ7lr30WKz0vr/aWKhXdBNmNb5D92v7s" crossorigin="anonymous"></script>
    -->
    <script type="text/javascript" src="assets/js/Obj.js"></script>
    <script type="text/javascript" src="assets/js/app.js"></script>
  </body>
</html>
```  

Kemudian buka file css di direktori ```assets/css/app.css``` copy code berikut :  

```css
input{
	width: 20% !important;
}

.loader{
	margin-top: -3rem;
	margin-left: -9rem;
}
.loader img{
	width: 400px;
	height: 250px;
}

.loader2{
	margin-top: 3rem;
	margin-left: 3rem;	
}

.loader2 img{
	width: 80px;
	height: 50px;
}

.pagination{
	margin-top: -2rem;
}

.disabled{
	cursor: crosshair;
}

.page-item{
	cursor: pointer;
}

```  

Kemudian kita buka file javascript di direktori ```assets/js/``` pertama kita buka file ```Obj.js``` sebagai file yang bertugas menyeleksi class yang dibutuhkan di aplikasi web ini :  

```javascript
//file : /assets/js/Obj.js
const ObjData = {
	'hasil': $('.hasil'),
	'ViewAyat': $('.view-ayat'),
	'cari': $('#cari'),
	'selectSurah': $('#select-surah'),
	'pilihSurah': $('#pilih-surah'),
	'loader': $('.loader'),
	'loaderDua': $('.loader2'),
	'Error': $('.error'),
	'Pagination': $('.pagination'),
	'Next': $('#next'),
	'Prev': $('#prev'),
	'api': {
		'proxy': 'https://cors-anywhere.herokuapp.com/',
		'quran': 'https://api.quran.sutanlab.id/surah/',
		'ayat': 'https://api.quran.sutanlab.id/surah/',
		'quranSelect': 'https://api.quran.sutanlab.id',
	}
}
```  
Lanjut masih di direktori ```/assets/js/``` buka file ```app.js``` dan kita akan menyiapkan beberapa method yang berfungsi untuk menjalankan library ajax untuk fetching data api, copy code berikut :  

```javascript
//file: /assets/js/app.js
const quran = (req, data) => {
	ObjData.loader.show('slow').fadeIn(1000);
	ObjData.hasil.html('');
	ObjData.Error.html('');
	ObjData.ViewAyat.html('');
	ObjData.Pagination.html('');

	$.ajax({
		url: `${req}${data}`,
		type: 'get',
		dataType: 'json',
		data: data,
		success: function(res){
			ObjData.selectSurah.val('choose');

			const namaArb = res.data.name.long;
			const namaId = res.data.name.transliteration.id;
			const tafsir = res.data.tafsir.id;

			ObjData.hasil.append(`
				<h2>${namaArb} | ${namaId}</h2>
				<blockquote>${tafsir}</blockquote>
				<button id="view-ayat" class="btn btn-outline-primary" data-id=${data}>View Ayat</button>
				</div>
			`)
		},
		complete: function(){
			ObjData.loader.hide('slow').slideUp(1000);
		}
	});
}

const viewAyat = (req, numberSurah) => {
	ObjData.loaderDua.show('slow').fadeIn(1000);

	$.ajax({
		url: `${req}${numberSurah}`,
		type: 'get',
		dataType: 'json',
		data: numberSurah,
		success: function(res){
			const SetFirst = res.data.verses[0];
			const SetTotal = SetFirst.numberOfVerses;
			const disable = (SetFirst.number.inSurah == 1) ? 'disabled' : '';
			const disableTab = (SetFirst.number.inSurah == 1) ? 'tabindex="-1" aria-disabled="true"' : '';

			// console.log(SetFirst);

			ObjData.Pagination.append(`
				<li class="page-item ${disable}">
			      <a class="page-link" ${disableTab} id="prev">Previous</a>
			    </li>
			`);

			ObjData.ViewAyat.append(`
				<h4>${SetFirst.text.arab} . <span class="number-ayat">${SetFirst.number.inSurah}</span></h4>
				<p>${SetFirst.text.transliteration.en}</p>
					<audio controls>
						<source src="${SetFirst.audio.primary}" type="audio/mp3">
					</audio>
				<blockquote class="mb-5">${SetFirst.translation.id}</blockquote>
			`)
				

			ObjData.Pagination.append(`
				<li class="page-item">
					<a class="page-link" data-total="${SetTotal}" data-surah="${numberSurah}" data-ayat="${SetFirst.number.inSurah + 1}" id="next">Next</a>
				</li>
			`);

		},
		complete: function(){
			ObjData.loaderDua.hide('slow').fadeOut(1000);
		}
	});
}

const ReadAyat = (res, totalAyat, numberSurah, ayat) => {
	const data = {
		'surah': numberSurah,
		'ayat': ayat
	}

	// alert(data.ayat);

	ObjData.ViewAyat.html('');
	ObjData.Pagination.html('');
	ObjData.loaderDua.show('slow').fadeIn(1000);

	$.ajax({
		url: `${ObjData.api.quran}${data.surah}/${data.ayat}`,
		type: 'get',
		dataType: 'json',
		data: data,
		success: function(res){
			const SetFirst = res.data;
			const disabled = (SetFirst.number.inSurah == 1) ? 'disabled' : '';
			const disableTab = (SetFirst.number.inSurah == 1) ? 'tabindex="-1" aria-disabled="true"' : '';
			const SetTotal = SetFirst.surah.numberOfVerses;
			const NextData = (SetFirst.number.inSurah >= SetTotal) ? 1 : SetFirst.number.inSurah + 1;
			const DisableNext = (SetFirst.number.inSurah >= SetTotal) ? 'disabled' : '';
			const PrevData = (SetFirst.number.inSurah != 1) ? SetFirst.number.inSurah - 1 : '';

			// console.log(SetFirst);

			ObjData.Pagination.append(`
				<li class="page-item ${disabled}">
			      <a class="page-link" ${disableTab} id="prev" data-total="${SetTotal}" data-surah="${numberSurah}" data-ayat="${PrevData}">Previous</a>
			    </li>
			`);

			ObjData.ViewAyat.append(`
				<h4>${SetFirst.text.arab} . <span class="number-ayat">${SetFirst.number.inSurah}</span></h4>
				<p>${SetFirst.text.transliteration.en}</p>
					<audio controls>
						<source src="${SetFirst.audio.secondary[0]}" type="audio/mp3">
					</audio>
				<blockquote class="mb-5">${SetFirst.translation.id}</blockquote>
			`)

			ObjData.Pagination.append(`
				<li class="page-item ${DisableNext}">
					<a class="page-link" data-total="${SetTotal}" data-surah="${numberSurah}" data-ayat="${NextData}" id="next">Next</a>
				</li>
			`)

		}, 
		complete: function(){
			ObjData.loaderDua.hide('slow').fadeOut(1000);
		}
	})
}


const SelectSurah = (req, data) => {
	$.ajax({
		url: `${req}/${data}`,
		type: 'get',
		dataType: 'json',
		data: data,
		success: function(res){
			
			const DataSurah = res.data;

			ObjData.selectSurah.append(`
				<option value="choose" selected>Choose...</option>
			`)

			DataSurah.map(key =>{
				ObjData.selectSurah.append(`
					<option id="pilih" value="${key.number}">${key.name.transliteration.id}</option>
				`)
			})
		}
	})
}

```  
**Sedikit penjelasan**  
Dari file ```app.js``` tersebut kita menjalankan library ajax untuk mengambil sebuah data yang telah ditentukan di dalam parameter tiap-tiap methodnya, dan kita akan melakukan DOM(Document Object Model) untuk menyeleksi dan memanipulasi beberapa element html di file ```index.html``` beberapa ```DOM``` tersebut diantaranya :  

- Select Input  
	kita akan melakukan manupulasi untuk tag ```<option>``` di tag ```<select>``` tersebut dan mengirimkan data hasil dari ajax.  

- class hasil (```<div class="hasil">```)  
	Kemudian kita juga melakukan DOM untuk manipulasi class hasil dan akan mengirimkan data dari hasil input select yang dipilih user kemudian input select tersebut menjalankan method ```quran(parameter)```  

- class error (```<div class="error">```)  
	class ini akan di manipulasi ketika validasi dari input select berisi nilai ```null``` atau nilai defaultnya di input select ini adalah ```choose```.  

- class view-ayat(```<div class="view-ayat">```)  
	Seperti class hasil class ini juga akan melakukan DOM untuk manipulasi dan mengirimkan data dari tombol ```View Ayat``` yang terdapat dalam sebuah button hasil manipulasi awal dari select input yaitu ```<button id="view-ayat">``` tombol tersebut di manipulasi saat proses awal di bagian select input dikirim bersama data dari method ```quran(parameter)```

- class pagination (```<ul class="pagination"></ul>```)  
	Seperti class-class sebelumnya DOM di class ini juga merupakan manipulasi yang akan mengirimkan data dari object-object baru yang telah di seleksi ke dalam sebuah pagination (navigation page)  


#### Eksekusi method  
Selanjutnya kita akan menjalankan method-method tersebut untuk memanipulasi class-class html yang telah kita tentukan di awal, buka file ```/assets/js/quran.js```, copy code berikut :  

```javascript
//file: /assets/js/quran.js
$(document).ready(function(){
	ObjData.loader.hide();
	ObjData.loaderDua.hide();
	
	SelectSurah(ObjData.api.quranSelect, 'surah');
	
	ObjData.pilihSurah.on('click', function(){
		const surahData = ObjData.selectSurah.val();

		if(surahData == 'choose' || surahData == ''){
			ObjData.hasil.html('');
			ObjData.ViewAyat.html('');
			ObjData.Pagination.html('');
			
			ObjData.Error.append(`
				<div class="alert alert-warning" role="alert">
				  Pilih Nama Surah Terlebih Dahulu
				</div>
			`).fadeIn(1000);
		}else{
			quran(ObjData.api.quran, surahData);				
		}
	});



	ObjData.cari.on('click', function(){
		const surah = $('#number').val();

		if(surah == null || surah == ''){
			alert('Number surah belum di isi');
		}else{
			$('#number').val('');
			quran(ObjData.api.quran, surah);
		}		
	});

	ObjData.hasil.on('click', '#view-ayat', function(){
		const numberSurah = $(this).data('id');
		$(this).hide('slow').fadeOut(1000);
		viewAyat(ObjData.api.quran, numberSurah);
	});

	ObjData.Pagination.on('click', '#next', function(){
		const surah = $(this).data('surah');
		const ayat = $(this).data('ayat');
		const TotalAyat = $(this).data('total');

		ReadAyat(ObjData.api.quran, TotalAyat, surah, ayat);
	});

	ObjData.Pagination.on('click', '#prev', function(){
		const surah = $(this).data('surah');
		const ayat = $(this).data('ayat');
		const TotalAyat = $(this).data('total');

		ReadAyat(ObjData.api.quran, TotalAyat, surah, ayat)

	})
});
```  
Setelah code diatas di save, sekarang waktunya untuk menguji coba aplikasi kita di web browser akses link http://localhost/quran.    

<div class="embed-responsive embed-responsive-21by9">
  <iframe class="embed-responsive-item" src="{{site.url}}/assets/images/post/quran-online/quran-online.mp4"></iframe>
</div>   

Jika terdapat error coba periksa kembali tiap-tiap file yang telah kita coding sebelumnya, atau kalian bisa langsung akses keseluruhan file di repository gout di link berikut :  

<a href="https://github.com/codesyariah122/Learn-WebDev/tree/master/quran" target="_blank">quran online repo</a>  

Jika ada kesulitan silahkan bedah dikolom komentar bro-bro. Gout cukupkan sampai disini artikel kali ini, mohon maaf jika ada kekurangan, jangan lupa ingat terus pesan ibu, jaga kesehatan kalian semua bro-bro, semoga Allah mengangkat segala kesulitan pada bangsa ini, semoga di redakan dari segala bencana yang melanda ini, jangan lupa bertawakal bro-bro.

Mudah-mudahan bermanfaat dari artikel gout ini yah.

ok sekian dulu dari saya untuk artikel kali ini, nanti kita lanjutkan lagi artikel mengenai tips and trick seputar pemrogramman khususnya web programming  
... see the next articles 

bye :) 


***Salam***

**Puji Ermanto**
