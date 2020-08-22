---
layout: post
title:  "Membuat Marker untuk Menandai Lokasi Google Maps API"
author: amel
categories: [ javascript, API ]
image: assets/images/post/googlemaps2.jpg
tags: [Webdevelopment]
opening: بسم الله الرحمن الرحيم
---  
![maps1]({{ site.url }}/assets/images/post/googlemaps2.jpg)  

# menentukan titik google maps  
Marker sering digunakan untuk menandai sebuah lokasi. Biasanya sering digunakan dalam membuat aplikasi Geolocation.

Pada kesempatan ini, kita akan belajar membuat marker di Google Maps dan melakukan beberapa modifikasi.

Kamu bisa menggunakan contoh kode sebelumnya untuk uji coba.

Sudah siap?

Mari kita mulai…  

# Mengenal Objek Marker

Marker merupakan sebuah objek yang bisa kita buat dengan kode berikut:  

```
var marker = new google.maps.Marker({
    position: new google.maps.LatLng(-8.5830695,116.3202515),
    map: peta
});
```
Terdapat dua properti penting yang harus diberikan ke marker:

  1. **position** adalah posisi koordinat latitude dan longitude marker pada peta.
  2. **map** objek dari peta (Google Map).  

dalam Contoh kali ini saya akan menyambung dari blog saya sebelumnya mengenai menentukan lokasi berdasarkan ip address : <a href="https://codesyariah122.github.io/php/ip_location2/Menentukan-koordinat-dengan-ip-address/">Di mari</a>  

nah dari script itu seperti berikut 
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
dari script diatas saya kembangkan, saya menggunakan script diatas dengan asumsi data lokasi yang akan saya ambil untuk di kirim ke **database**, mungkin algoritma teman-teman lain lagi.  

table database saya seperti ini, dalam contoh ini saya menamakan table nya dengan nama table user  

![maps2]({{ site.url }}/assets/images/post/googlemaps1.jpg)  

saya akan mengirimkan nilai latitude dan longitude untuk dimanfaatkan dalam pembuatan API googlemaps kali ini.  
jadi script lengkapnya menjadi seperti ini :  
dan didalam database nya type data untuk nilai latitude dan longitude nya adalah type **FLOAT** , seperti berikut struktur type data nya.  
![maps3]({{ site.url }}/assets/images/post/googlemaps3.jpg)  
![maps4]({{ site.url }}/assets/images/post/googlemaps4.jpg)  


```

<?php
//script ini untuk pemanfaatan session jika tidak menggunakan session harap di sesuaikan

if(isset($_SESSION['login'])):
//jika dalam penggunaan query silahkan disesuaikan dengan kebutuhan
//untuk query insertnya disesuaikan

$data=query("SELECT * FROM user INNER JOIN profile ON user.id_profile=profile.id_profile WHERE username = '$username'");

endif;
$nologin=query("SELECT * FROM user, profile WHERE user.id_profile=profile.id_profile AND username = '$userOwner'"); 

?>

<script src="http://maps.googleapis.com/maps/api/js"></script> <!-- api dari google maps -->
<script>
function initialize() {
  var propertiPeta = {
    center:new google.maps.LatLng(<?php if(isset($_SESSION['login'])):echo $data[0]['lat'].",".$data[0]['lng']; else: echo $nologin[0]['lat'].",".$nologin[0]['lng']; endif;?> ),
    zoom:9,
    mapTypeId:google.maps.MapTypeId.ROADMAP
  };
  
  var peta = new google.maps.Map(document.getElementById("googleMap"), propertiPeta);
  
  // membuat Marker
  var marker=new google.maps.Marker({
      position: new google.maps.LatLng(<?php if(isset($_SESSION['login'])):echo $data[0]['lat'].",".$data[0]['lng']; else: echo $nologin[0]['lat'].",".$nologin[0]['lng']; endif;?> ),
      map: peta
  });

}

// event jendela di-load  
google.maps.event.addDomListener(window, 'load', initialize);
</script>

  <h1>Titik lokasi google maps anda : </h1>

  <div class="map">
        <div id="googleMap" style="width:100%;height:380px;"></div>
  </div>
```  
ok sobat coders untuk script diatas disesuaikan saja dengan kondisi, struktur dan algoritma teman teman coders semuanya. dirasa cukup tips kali ini, selamat menjalankan ibadah puasa ramadhan. 
**salam**


