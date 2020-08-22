---
layout: post
title:  "Mendapatkan koordinat google melalui ip address"
author: puji
categories: [ PHP, ip_location2 ]
image: assets/images/post/ip-location.png
tags: [webdevelopment]
opening: بسم الله الرحمن الرحيم
---  

# Menentukan lokasi, koordinat berdasarkan ip address 

Hallo para coders ! ....  
Banyak cara yang dapat dilakukan untuk mendapatkan posisi koordinat khususnya latitude dan longitude Google dengan menggunakan IP. Beberapa diantaranya berbayar seperti IPStack dan juga IP2Location. Apakah ada yang gratis?

Saya pernah membandingkan IPStack dan IP2Location, sayangnya database lokasi yang dimiliki keduanya masih kurang valid, saya cek IP komputer saya di Sumatra Utara IP menunjukan di Bandung, walaupun masih sama-sama milik PT. Telekomunikasi di Indonesia. Terakhir saya menggunakan layanan dari keycdn.com. Gratis dan lokasinya lebih valid. Caranya seperti berikut.  

```
<?php
if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
    $ip = $_SERVER['HTTP_CLIENT_IP'];
    
} elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
    $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
} else {
    $ip = $_SERVER['REMOTE_ADDR'];
}
echo password_hash($ip, PASSWORD_DEFAULT)."<br/>";
//Kemudian
$url = "https://tools.keycdn.com/geo.json?host=$ip";
$dt = file_get_contents($url);
$dt = json_decode($dt, true);
$lat = $dt['data']['geo']['latitude'];
$lng = $dt['data']['geo']['longitude'];
$regional = $dt['data']['geo']['region_name'];
$city_name = $dt['data']['geo']['city'];

$location = $city_name ."-". $regional;

echo "<h1>".$location."</h1>";
```  

Koordinatnya telah kita dapatkan yaitu :  

```
$lat = $dt['data']['geo']['latitude'];
$lng = $dt['data']['geo']['longitude'];
```  

berikut hasil lokasi, sory ip saya saya encrypt sementara demi keamanan. dan kordinatnya sesuai dengan lokasi ipnya.

![lokasi]({{site.url}}/assets/images/post/ss_lokasi.jpg)  
  

![vs_code]({{site.url}}/assets/images/post/5.jpg) 


ok sekial dulu coders, **salam**
