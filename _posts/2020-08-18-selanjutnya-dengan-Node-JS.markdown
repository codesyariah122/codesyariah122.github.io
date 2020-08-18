---
layout: post
title:  "Selanjutnya dengan Node JS"
author: puji
categories: [ NodeJS, Javascript ]
image: assets/images/post/nodejs-part2.png
tags: [fullstack_developer]
opening: بسم الله الرحمن الرحيم
---  

![nodeJS_webserver]({{site.url}}/assets/images/post/nodejs-part2.png)  

setelah di artikel mengenai node js sebelumnya yaitu installasi node js di desktop kita, dan mencoba program awal node js menggunakan ```REPL```, pada artikel di link ini : <a href="https://codesyariah122.github.io/nodejs/javascript/install-nodeJS-on-linux-debian9-stretch/">Node JS artikel</a> dalam artikel tersebut gout menggunakan desktop linux debian 9 stretch, pada dasarnya penggunaan untuk nodejs sendiri sama saja ko, baik itu di platform linux maupun windows.  

### melanjutkan ...  
dalam artikel kali ini gout bermaksud melanjutkan pembahasan mengenai node js dan mengenal ```REPL``` lebih dalam. 

#### Menjalankan perintah yang terdiri dari beberapa baris  

Terminal ```REPL``` juga mendukung perintah yang terdiri dari beberapa baris, misalnya untuk membuat objek pemilihan dan pengulangan.

contoh : 

```shell
> let a =10
undefined
>if(a > 0){
... console.log(a + " adalah bilangan positif")
... } else {
... console.log(a + " bukan bilangan positif")
... }
10 adalah bilangan positif
undefined
> let i = 1
undefined
> while(i <= 3){
... console.log("Baris ke - "+i)
... i++
... }
Baris ke - 1
Baris ke - 2 
Baris ke - 3
3
>
```  

Tanda titik yang ditulis (...) tiga kali menandakan bahwa baris tersebut merupakan baris perintah lanjutan dari baris sebelumnya.  

#### Membuat fungsi  

Selain ekspresi dan blok perintah sederhana, kita juga dapat mendefinisikan fungsi pada saat bekerja di dalam terminal ```REPL```. Contoh kode berikut akan menunjukan hal tersebut :  

```shell
> function tambah(x, y){
... return x + y
... }
> // memanggil fungsi
undefined
> hasil = tambah(3, 15)
18
> hasil
18
> tambah(2, 3)
5
>
```  

#### Membuat objek  
Terminal ```REPL``` juga mendukung pembuatan objek, seperti yang ditunjukan oleh contoh kode di bawah ini :  

```shell
> let obj = new Object()
undefined
> obj.alas = 3
3
> obj.tinggi = 5
5
> obj.luas = function() { return (obj.alas * obj.tinggi)/2 }
[function]
>
> // memanggil method luas()
undefined
> obj.luas()
7.5
>
```  
Pada contoh di atas kita membuat objek dengan nama obj yang merepresentasikan objek segitiga. Objek tersebut memiliki dua properti ( alas dan tinggi ) dan satu metode ( luas() ).

### Perintah-perintah dalam terminal REPL  
Beberapa perintah tambahan yang dapat digunakan ketika bekerja dengan terminal ```repl``` dapat dilihat pada tabel dibawah ini.

<table border="1">
	
	<tr>
		<th>Perintah</th>
		<th>Keterangan</th>
	</tr>

	<tr>
		<td>Ctrl + C</td>
		<td>Keluar dari perintah yang sedang aktif</td>
	</tr>

	<tr>
		<td>Ctrl + C (dua kali)</td>
		<td>Keluar dari Terminal ```repl```</td>
	</tr>

	<tr>
		<td>Ctrl + D </td>
		<td>Keluar dari Terminal ```repl```</td>
	</tr>

	<tr>
		<td>Tombol panah atas bawah </td>
		<td>Menampilkan perintah sebelumnya atau sesudahnya</td>
	</tr>

	<tr>
		<td>Tombol <b>tab</b> </td>
		<td>Melengkapi perintah yang ditulis secara otomatis </td>
	</tr>
		<td>.help </td>
		<td>Menampilkan bantuan dari daftar perintah yang ada</td>
	</tr>

	<tr>
		<td>.break </td>
		<td>keluar dari perintah yang terdiri dari beberapa baris </td>
	</tr>

	<tr>
		<td>.clear</td>
		<td>Sama dengan .break</td>
	</tr>

	<tr>
		<td>.save NamaFile </td>
		<td>menyimpan perintah di dalam terminal REPL ke file</td>
	</tr>

	<tr>
		<td>.load NamaFile</td>
		<td>Memuat perintah dari file ke dalam terminal REPL</td>
	</tr>

</table>

#### Menghentikan Terminal REPL  

seperti yang telah disebutkan diatas untuk menghentikan terminal ```REPL```, kita dapat menggunakan tombol ```Ctrl + C``` dua kali. 

```shell
root@codesyariah:/home/puji122# node
> a = 3
3
> b = 4
4
> a + b
7
> 2 * (a + b)
14
> 
(To exit, press ^C again or type .exit)
> 
root@codesyariah:/home/puji122# 

```  
selain tombol ```Ctrl + C``` yang ditekan dua kali, kita juga dapat menggunakan tombol ```Ctrl + D``` untuk keluar dari terminal ```REPL```, yah sobah coders bisa eksplore sendiri lah perintah-perintah di terminal ```repl``` dari table diatas atau bisa mencari perintah-perintah lain dari internet. 

ok cukup sekian mengenai lanjutan artikel nodeJS kali ini, mudah-mudahan bermanfaat. 

akhir kata gout ucapkan ... 

wassalaam  

***Puji Ermanto***






