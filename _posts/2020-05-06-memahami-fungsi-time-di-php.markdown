---
layout: post
title:  "Memahami fungsi time di php"
author: puji
categories: [ PHP, Date And Time ]
image: assets/images/post/php_time.jpg
tags: [webdevelopment]
opening: بسم الله الرحمن الرحيم
---  
![php_time2]({{ site.url }}/assets/images/post/php_time2.png)  
Halo para coders semuanya !  
selamat menjalankan ibadah puasanya, semoga berkah ibadah di bulan ramadhan tahun ini.  
postingan kali akan berhubungan dengan fungsi date dan time di php.  
#  Fungsi Time Pada PHP
Fungsi time() digunakan untuk mengambil waktu sekarang pada komputer server dalam format timestamp. Fungsi ini tidak memiliki argumen.
Timestamp yang dihasilkan oleh fungsi time() selalu pada waktu UTC (GMT +  0), meskipun konfigurasi zone waktu berubah ubah. Lebih jauh tentang timezone, penetapan format timezone pada PHP bisa dilakukan dengan code berikut 
```
date_default_timezone_set("Asia/Jakarta");

```  
dikarenakan zona waktu saya ada di indonesia. Mungkin nanti dalam artikel tips and trick di new post mendatang saya akan ulas mengenai zona waktu.  
### menggunakan fungsi time()  
fungsi time secara defaultnya menghasilkan nilai 1 januari 1970 berdasarkan unix timestamp / EPOCH time .  
contoh penggunaan fungsi time yang di gabungkan dengan fungsi date().  
```
echo $date=date('d F Y, H:i:s', time());
```  
code diatas menghasilkan output seperti ini  : ``` 05 May 2020, 07:45:46 ```  
Fungsi time() ini bermanfaat untuk mendapatkan waktu kedepan atau kebelakang sejak waktu saat ini, misal:  
contoh lain penggunaan fungsi date dan time :  
```
echo 'Waktu sekarang: ' . date('Y-m-d H:i:s') . '<br/>';
echo '1 menit kedepan: ' . date('Y-m-d H:i:s', time() + 60) . '<br/>';
echo '1 jam kedepan: ' . date('Y-m-d H:i:s', time() + (60 * 60)) . '<br/>';
echo '1 hari kedepan: ' . date('Y-m-d H:i:s', time() + (60 * 60 * 24)) . '<br/>';
echo '7 hari kedepan: ' . date('Y-m-d H:i:s', time() + (60 * 60 * 24 * 7)) . '<br/>';
```  
maka outputnya seperti ini :  
<pre>
Waktu sekarang: 2017-01-17 15:48:34
1 menit kedepan: 2017-01-17 15:49:34
1 jam kedepan: 2017-01-17 16:48:34
1 hari kedepan: 2017-01-18 15:48:34
7 hari kedepan: 2017-01-24 15:48:34
</pre>
Meskipun dapat mengkalkulasi waktu kedepan dan kebelakang, fungsi ini maksimal hanya dapat menghitung waktu dalam detik, tidak bisa menghitung 1 minggu kedepan atau 1 bulan kedepan. Untuk mengatasi hal tersebut, kita dapat menggunakan fungsi strtotime().

# Manipulasi fungsi time menghitung waktu maju dan mundur  
**menghitung maju 100 hari kedepan**
```
echo "hari ini  = ".date("l", time())."<br/>";
echo "100 Hari kedepan hari = ".date("l", time()+60*60*24*100);
```  
outputnya seperti ini :  
![php_time3]({{ site.url }}/assets/images/post/php_time3.png)  

**mengetahui hari lahir kita**  
untuk mengetahui hari lahir kita, yaitu kita melakukan penghitungan waktu mundur.  
kita bisa menggunakan fungsi mktime untuk membuat waktu kita sendiri. kayanya kalau menggunakan fungsi time() tidak memungkinkan karena fungsi ini bersifat relatif mau maju atau mundur berdasarkan EPOCH / timestamp, dan itu berarti kita harus menghitung dari awal waktu EPOCH yaitu dari 1 januari 1970 sampai tahun kelahiran kita. maka dari itu saya menggunakan fungsi ```mktime()`` , mktime() adalah fungsi untuk membuat waktu sendiri.  
berikut contoh penggunaan fungsi mktime :  
```
/**
* @use format penulisannya berisi 6 attribute yaitu : jam, menit, detik, bulan, tanggal, tahun
*contoh nya :
*/
echo mktime(0,0,0,3,19,1987);
```  

code diatas menghasilkan output sepert ini  

```
543085200
```  
dengan itu berarti kita telah mendapatkan nilai : jam, menit, detik nya, nah supaya kita bisa tahu hari nya hari apa. kita tinggal menambahkan fungsi date("l") untuk mendapatkan nama hari.  
```
echo "hari lahi = ". date("l", mktime(0,0,0,3,19,1987));
```
maka outputnya seperti ini :   
![php_time4]({{ site.url }}/assets/images/post/php_time5.png)  

hal diatas juga bisa dilakukan menggunakan fungsi dari date lainnya yaitu fungsi ```strtotime()```  , pada strtotime kita hanya perlu menambahkan format tanggal yang berupa string, contoh :  

```
echo "hari lahir = ".date("l", strtotime("19 march 1987"));
```  
maka outputnya sepert ini :  

![php_time5]({{ site.url }}/assets/images/post/php_time5.png)  



