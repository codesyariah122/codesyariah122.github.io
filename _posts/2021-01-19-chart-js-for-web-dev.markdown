---
layout: post
title:  "Membuat grafik data dengan chart js"
author: puji
categories: [ Javascript, ChartJS, JQuery ]
image: assets/images/post/chartjs/chartjs.png
tags: [webdevelopment]
opening: بسم الله الرحمن الرحيم
---  

{{page.opening}}  

![laravel-auth]({{site.url}}assets/images/post/chartjs/chartjs-tutsplus.jpg)    

Hallo bro-bro semuanya, semoga dalam keadaan sehat-sehat bro. Sekali lagi gout pribadi sebagai generasi milenial yang kaleng-kaleng, turut berduka pada saudara-saudara gout yang mengalami musibah di daerah-daerah Indonesia, Semoga kalian semua saudara-saudara gout diberikan kelapangan hati, ketabahan, kekuatan fisik dan pikiran untuk melewati cobaan dari Allah Subhanaahu Wataa Allaa. Selalu ada hikmah di balik bencana, Allah tidak diam dan Allah akan memberi rezeki pada siapapun yang ia kehendaki, dan hidayah adalah sebaik-baik rezeki.  

### Membuat grafik data Chart.js  

Fokus lagi ke artikel, kali ini gout mau membahas seputar Chart.js, dari mulai instalasi sampai ke penggunaan basic. Mudah2an kalian semua suka dengan artikel ini.  

Chart.js sendiri merupakan tool graphic data untuk pengembangan web lebih khususnya, mungkin jika ada yang pernah mengembangkannya di mobile development, ayoo bagi-bagi ilmunya sertakan link ilmiahnyadi kolom komentar.  

Tujuan pembuatan grafik data kali ini adalah gout khususkan sebagai media dalam memvisualisasikan data dari hasil fetching sebuah api data, dalam artikel ini gout menggunakan data api untuk updata perkembangan Covid 19 di Indonesia dalam skala provinsi.  

Sebagai contoh saja tentunya dan sekalian biar kita tetap update perkembangan terbaru dari Covid 19 di Indonesia, melalui api gratis yang di sediakan oleh salah seorang programmer milenial yang sedang viral di Indonesia yaitu MathDroid, kalian bisa kunjungi repositori dari MathDroid.  

### Praktek  
Ok tanpa berlama-lama lagi langsung ajah gout tulis beberapa bagian codingannya, dalam artikel kali ini susunan direktori nya adalah seperti ini :  
```bash
root@debian:/var/www/html/dataCovid# ls -l
total 12
drwxr-xr-x 6 puji122 puji122 4096 Jan 19 06:45 assets
drwxr-xr-x 2 puji122 puji122 4096 Jan 19 17:22 components
-rw-r--r-- 1 puji122 puji122 2323 Jan 19 21:29 index.html
root@debian:/var/www/html/dataCovid# 

```  
ada beberapa bagian dalam direktori ```dataCovid```, dan kali ini gout tidak menggunakan backend programming melainkan pure ```html, javascript(jquery)``` diantaranya :  
- file index.html  
	Seperti index pada umumnya ini merupakan file utama yang menjalankan aplikasi program.
- direktori assets :  
	direktori ini merupakan bagian dari assets untuk menyimpan modul css, javascript dan juga image
- direktori component :  
	direktori ini adalah berisi file file component yang akan di load ke dalam file utama aplikasi kita yaitu di file ```index.html```  

#### Start The Game  

OK langsung kita mulai coding, buka code editor, dan siapkan beberapa file dan direktori seperti di listing direktori di atas :  

1. buat direktori utama (dataCovid) kalian bebas mau pakai nama apapun dan buka direktori tersebut di code editor.  

2. buat file baru di root direktori tersebut, dengan nama ```index.html``` , berikut codingan dari file ```index.html``` :  
```php
<!DOCTYPE html>
<html>
<head>
 	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
 	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title id="title"></title>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="assets/css/style.css">
	<script src="https://cdn.jsdelivr.net/npm/chart.js@2.9.4/dist/Chart.min.js"></script>
</head>
<body>

	<div class="container">

		<div class="row">
			<div class="col-md-6 mt-5 select-data">
				<h1>Update Data Covid / Provinsi</h1>

				<div class="select"></div>

				<div class="result-error mt-2">
					<div class="alert alert-danger" role="alert">
					 Pilih provinsi yang tersedia. Terlebih dahulu !
					</div>
				</div>

				  	<div class="row">
		                <div class="col-md-12 col-xs-12 col-sm-12 mt-3 mb-3">
		                	<div id="loading"></div>
		                	<!-- chart line -->
							<canvas id="chart-line"></canvas>
						</div>
					</div>

					<div class="row">
						<div class="col-md-4">
							<div class="card mb-5" style="width: 18rem;">
							  <div class="card-body"></div>
							</div>
						</div>

						<div class="col-md-8 ml-auto">
							<!-- chart pie -->
							<canvas id="chart-pie-gender"></canvas>
							<canvas id="chart-pie-age"></canvas>
						</div>
					</div>
			</div>

			<div class="col-md-4 mt-2">
				<img src="assets/img/covid1.jpg" class="img-responsive">
			</div>
		</div>
	</div>

<!-- jQuery library -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<!-- Popper JS -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
<!-- Latest compiled JavaScript -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
<script type="text/javascript" src="assets/js/MyScript.js"></script>
<script type="text/javascript" src="assets/js/MyObj.js"></script>
<script type="text/javascript" src="assets/js/chart-line.js"></script>
<script type="text/javascript" src="assets/js/gender-chart.js"></script>
<script type="text/javascript" src="assets/js/age-chart.js"></script>
<script type="text/javascript" src="assets/js/MyChart.js"></script>
</body>
</html>
```  
Dari file diatas terlihat bahwa aplikasi kita di artikel kali ini menggunakan framework front end ```bootstrap-4.5```. Kemudian juga tentunya link sumber untuk tools ```chart.js``` nya.  

3. Lanjut buat direktori baru dengan nama ```components/```, buat kembali beberapa file baru di direktori ```component/```. antara lain :  

```php
//file: components/select-data.html

 <div class="input-group">
  <select class="custom-select" id="select-provinsi" aria-label="Example select with button addon">
    <!-- select akan di load di jquery -->
  </select>
  <div class="input-group-append">
      <button id="pilih-provinsi" class="btn btn-dark">Check</button>  
  </div>
</div>
```  

```php
// file: components/loading-html

<img src="assets/img/loader.gif" class="img-responsive" width="500" height="150">
```  

4. Lanjut buat direktori ```assets/``` kemudian buat kembali beberapa direktori di dalam direktori ```assets/``` antara lain :  

direktori ```img/``` berikut link untuk image yang dibutuhkan : <a href="https://github.com/codesyariah122/Learn-WebDev/tree/master/dataCovidChartjs/assets/img" target="_blank">img</a>  

kemudian buat kembali direktori ```csss/``` buat satu file baru di direktori ini :  

```css
/* file: assets/css/style.css*/
.select-data h1{
	margin-top: 1rem;
}
#loading{
	margin-top: -4rem;
	margin-left: -4rem;
}
```  

5. Lanjut lagi sebagai penentu kita buat direktori ```js/``` dan buat beberapa file diantaranya :  

```javascript
// file : assets/js/MyObj.js
const ObjData = {
	'select': $('.select'),
	'gender': $('#gender'),
	'errors': $('.result-error'),
	'loading': $('#loading'),
	'result': $('.data'),
	'card': $('.card'),
	'cardBody': $('.card-body'),
	'chartLine': $('#chart-line'),
	'chartGender': $('#chart-pie-gender'),
	'chartAge': $('#chart-pie-age'),
	'pilihProv': $('#pilih-provinsi'),
	'dataCovid': 'prov.json',

	'api': {
		'proxy' : "https://cors-anywhere.herokuapp.com/",
    	'covid' : "https://data.covid19.go.id/public/api/",
	},
}
```  

```javascript
// file : assets/js/MyScript.js
$(document).ready(function(){
	document.querySelector('#title').append('Belajar ChartJS | ');
	ObjData.select.load('components/select-data.html');	
	ObjData.errors.hide();
	ObjData.card.hide();
	ObjData.loading.hide();

	const data = ObjData.dataCovid;
	
	$.ajax({
		url: `${ObjData.api.proxy}${ObjData.api.covid}${data}`,
		type: 'get',
		dataType: 'json',
		data: data,
		success: function(res){
			const dataProvinsi = res.list_data;
			const result = Object.keys(dataProvinsi).map((key) => [dataProvinsi[key].key]);

			$('#select-provinsi').append(`
				<option selected>Choose...</option>
			`);
			result.map((data, key) => (
				$('#select-provinsi').append(`
					<option value="${key}">${data}</option>
				`)
			));
		}
	});

});
```  

```javascript
// file : assets/js/MyChart.js
const covidChart = (last_date, labels, label, dataCovid) => {
    const ctx = document.getElementById('chart-line').getContext('2d');
    if(window.bar != undefined) 
    window.bar.destroy(); 
	
	ctx.height=500;

    window.bar  = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: `# ${label} | Update : ${last_date}`,
                data: dataCovid,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132,1)',
                borderWidth: 1
            }]
        },
        options: {
            // responsive: true,
            // maintainAspectRatio: false,
	        tooltips: {
	            mode: 'index'
	        }
	    }
    });
}

const genderChart = (labels, dataChartGender) => {
    const ctx2 = document.getElementById('chart-pie-gender').getContext('2d');
    if(window.pie != undefined) 
    window.pie.destroy(); 
    window.pie =  new Chart(ctx2, {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [{
            backgroundColor: [
              "#2ecc71",
              "#3498db",
              "#95a5a6",
              "#9b59b6",
              "#f1c40f",
              "#e74c3c",
              "#34495e"
            ],
            data: dataChartGender
          }]
        }

      });
}

const ageChart = (labels, dataChartAge) => {

    const ctx3 = document.getElementById('chart-pie-age').getContext('2d');
    if(window.pie != undefined) 
        window.pie.destroy(); 
    window.pie =  new Chart(ctx3, {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [{
            backgroundColor: [
              "#2ecc71",
              "#3498db",
              "#95a5a6",
              "#9b59b6",
              "#f1c40f",
              "#e74c3c",
              "#34495e"
            ],
            data: dataChartAge
          }]
        }
    });
}
```  

```javascript
// file : assets/js/chart-line.js
$(document).ready(function(){
		// pilih provinsi lewat select input
	ObjData.select.on('click', '#pilih-provinsi', function(){
		const dataProv = $('#select-provinsi').val();

		if(dataProv === null || dataProv === 'Choose...'){
			ObjData.errors.show('slow').fadeIn(1000);
			$('.card-body').html('');
			ObjData.chartLine.hide();
			ObjData.chartGender.hide();
			ObjData.chartAge.hide();
		}else{
			$('.card-body').html('');			
			$('#select-provinsi').val('Choose...');

			ObjData.errors.hide('slow').slideUp(1000);
			ObjData.card.hide('slow').slideUp(1000);
			ObjData.loading.show('slow').load('components/loading.html').fadeIn(1000);

			$.ajax({
				url: `${ObjData.api.proxy}${ObjData.api.covid}${ObjData.dataCovid}`,
				type: 'get',
				dataType: 'json',
				data: dataProv,
				success: (res)=> {
					genderChart('', '');
					ageChart('', '');
					ObjData.loading.hide('slow').slideUp(1000);
					ObjData.card.show('slow').fadeIn(1000);

					const last_date = res.last_date;
					const setFirst = res.list_data[dataProv];
					const provName = setFirst.key;

					document.querySelector('#title').append(provName);

					 const resData = {
                        'Kasus': setFirst.jumlah_kasus,
                        'Dirawat': setFirst.jumlah_dirawat,
                        'Meninggal': setFirst.jumlah_meninggal, 
                        'Sembuh': setFirst.jumlah_sembuh
                    };

                    const dataCovid = Object.keys(resData).map((key)=>resData[key]);

                    // const labels = Object.keys(resData).map((key)=>key);

                    const labels = [
                    	`Kasus : ${setFirst.jumlah_kasus}`, 
                    	`Dirawat : ${setFirst.jumlah_dirawat}`, 
                    	`Meninggal : ${setFirst.jumlah_meninggal}`, 
                    	`Sembuh : ${setFirst.jumlah_sembuh}`
                    ];
                    
					const objData = Object.entries(resData);
					
					ObjData.cardBody.append(`
						<h5 class="card-title">${provName}</h5>
						<small class="text-success">Update terakhir : ${last_date}</small>
						<ul style="list-style:none;width:100%;">
							${objData.map((data) => (
								`<li>${data}</li>`
							)).join('')}
							<li class="mt-2"> <b>Lihat Berdasarkan : </b><br/>
								<button class="mt-2 btn btn-primary btn-sm" data-id="${dataProv}" id="gender">Gender</button> <button class="mt-2 btn btn-danger btn-sm" data-id="${dataProv}" id="age">Usia</button></li>
							</li>
						</ul>
					`)

					covidChart(last_date, labels, provName, dataCovid);

				}
			});

		}

	});
});
```  

```javascript
// file : assets/js/gender-chart.js
$(document).ready(function(){
	ObjData.cardBody.on('click', '#gender', function(){
		ObjData.chartAge.hide();
		const dataGender = $('#gender').data('id');

		$.ajax({
			url: `${ObjData.api.proxy}${ObjData.api.covid}${ObjData.dataCovid}`,
			type: 'get',
			dataType: 'json',
			data: dataGender,
			success: function(res){
				const setFirst = res.list_data[dataGender].jenis_kelamin;
				const gender = Object.keys(setFirst).map((key) => [key, setFirst[key]]);
				const count = Object.keys(setFirst).map((key) => [key, setFirst[key]]);

				
				const genderData = [
					gender[0][1].key,
					gender[1][1].key
				];
				const genderCount = [
					count[0][1].doc_count,
					count[1][1].doc_count,
				];
				
				genderChart(genderData, genderCount);

			}
		})

	});
});
```  

```javascript
// file : assets/js/age-chart.js
$(document).ready(function(){

	ObjData.cardBody.on('click', '#age', function(){
		const dataAge = $('#age').data('id');
		ObjData.chartGender.hide();

		$.ajax({
			url: `${ObjData.api.proxy}${ObjData.api.covid}${ObjData.dataCovid}`,
			type: 'get',
			dataType: 'json',
			data: dataAge,
			success: function(res){
				const setFirst = res.list_data[dataAge].kelompok_umur;
				const age = Object.keys(setFirst).map((key) => [key, setFirst[key]]);
				const count = Object.keys(setFirst).map((key) => [key, setFirst[key]]);

				const ageData = [
					age[0][1].key,
					age[1][1].key,
					age[2][1].key,
					age[3][1].key,
					age[4][1].key,
					age[5][1].key
				];
				const ageCount = [
					age[0][1].doc_count,
					age[1][1].doc_count,
					age[2][1].doc_count,
					age[3][1].doc_count,
					age[4][1].doc_count,
					age[5][1].doc_count
				];

				ageChart(ageData, ageCount);
			}
		})

	});

});
```  
Ok jika sudah semua, kita langsung uji coba di browser akses web server kita dan direktori aplikasi http://localhost/dataCovid/. Jika berjalan seperti ini :  

<div class="embed-responsive embed-responsive-21by9">
  <iframe class="embed-responsive-item" src="{{site.url}}/assets/images/post/chartjs/chart-js.mp4"></iframe>
</div>   

Jika ada kesulitan silahkan bedah dikolom komentar bro-bro. Gout cukupkan sampai disini artikel kali ini, mohon maaf jika ada kekurangan, jangan lupa ingat terus pesan ibu, jaga kesehatan kalian semua bro-bro, semoga Allah mengangkat segala kesulitan pada bangsa ini, semoga di redakan dari segala bencana yang melanda ini, jangan lupa bertawakal bro-bro.

Mudah-mudahan bermanfaat dari artikel gout ini yah.

ok sekian dulu dari saya untuk artikel kali ini, nanti kita lanjutkan lagi artikel mengenai tips and trick seputar pemrogramman khususnya web programming  
... see the next articles 

bye :) 


***Salam***

**Puji Ermanto**
