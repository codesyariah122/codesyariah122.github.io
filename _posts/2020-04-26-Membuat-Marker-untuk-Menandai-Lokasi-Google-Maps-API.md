---
layout: post
title: "Cara Membuat Marker dan Menandai Lokasi di Google Maps JavaScript API"
author: "amel"
categories: [Javascript, API]
image: assets/images/social/membuat-marker-untuk-menandai-lokasi-google-maps-api-share.jpg
hero_image: assets/images/post/googlemaps2.jpg
og_image_width: 1200
og_image_height: 630
og_image_type: image/jpeg
tags: [google-maps, google-maps-api, javascript, marker, latitude, longitude, geolocation]
opening: بسم الله الرحمن الرحيم
summary: "Tutorial membuat marker untuk menandai titik lokasi berdasarkan latitude dan longitude menggunakan Google Maps JavaScript API."
---

![maps1]({{ site.url }}/assets/images/post/googlemaps2.jpg)  

{{ page.opening }}

## Cara Membuat Marker dan Menandai Lokasi di Google Maps JavaScript API

Marker atau penanda lokasi merupakan salah satu fitur yang paling sering digunakan ketika membuat aplikasi berbasis peta.

Contohnya untuk menampilkan:

- lokasi kantor,
- alamat pelanggan,
- lokasi toko,
- posisi properti,
- titik pengiriman,
- lokasi pengguna,
- atau koordinat yang tersimpan di database.

Pada tutorial ini kita akan membuat **marker di Google Maps menggunakan JavaScript** berdasarkan nilai **latitude dan longitude**.

Alur sederhananya:

```text
Latitude + Longitude
        ↓
Google Maps JavaScript API
        ↓
Membuat Map
        ↓
Membuat Marker
        ↓
Menampilkan Titik Lokasi
```

> Artikel ini merupakan pembaruan dari tutorial lama di blog ini. Implementasi Google Maps JavaScript API terus berkembang, sehingga contoh lama diperbarui agar konsep dan strukturnya lebih mudah diterapkan pada project modern.

---

## Apa Itu Marker di Google Maps?

**Marker** adalah penanda visual yang ditempatkan pada koordinat tertentu di dalam peta.

Misalnya kita mempunyai koordinat:

```text
Latitude  : -6.9175
Longitude : 107.6191
```

Koordinat tersebut dapat digunakan untuk menentukan posisi pada Google Maps.

Secara konsep:

```text
latitude + longitude
        ↓
      position
        ↓
      marker
        ↓
   tampil di map
```

Jadi untuk membuat sebuah marker, minimal kita membutuhkan **latitude**, **longitude**, dan objek peta tempat marker tersebut ditampilkan.

---

## Latitude dan Longitude

Sebelum membuat marker, kita perlu memahami dua nilai utama yang digunakan untuk menentukan posisi.

### Latitude

Latitude atau garis lintang menentukan posisi utara dan selatan.

Contoh:

```javascript
const latitude = -6.9175;
```

### Longitude

Longitude atau garis bujur menentukan posisi timur dan barat.

Contoh:

```javascript
const longitude = 107.6191;
```

Kemudian keduanya dapat digabungkan menjadi objek koordinat:

```javascript
const position = {
    lat: -6.9175,
    lng: 107.6191
};
```

Objek `position` inilah yang nantinya digunakan untuk menentukan pusat peta dan posisi marker.

---

## Persiapan Google Maps JavaScript API

Untuk menggunakan Google Maps JavaScript API pada aplikasi web, kita membutuhkan **API key** dari Google Maps Platform.

Secara umum prosesnya adalah:

1. Membuat atau memilih project di Google Cloud.
2. Mengaktifkan Maps JavaScript API.
3. Membuat API key.
4. Membatasi penggunaan API key sesuai website yang menggunakannya.
5. Memuat Google Maps JavaScript API pada halaman aplikasi.

Jangan menaruh API key yang tidak dibatasi pada repository publik.

Untuk aplikasi website, sebaiknya batasi key menggunakan **HTTP referrer restrictions** dan hanya izinkan domain yang memang membutuhkan Google Maps.

---

## Menyiapkan Container Google Maps

Pertama buat elemen HTML yang akan digunakan sebagai tempat menampilkan peta.

```html
<div id="map"></div>
```

Kemudian berikan tinggi pada container tersebut:

```html
<style>
    #map {
        width: 100%;
        height: 450px;
    }
</style>
```

Tanpa tinggi yang jelas, container peta dapat terlihat kosong meskipun JavaScript sudah berjalan.

---

## Membuat Google Maps

Sekarang kita buat fungsi untuk menginisialisasi peta.

```javascript
async function initMap() {
    const position = {
        lat: -6.9175,
        lng: 107.6191
    };

    const { Map } = await google.maps.importLibrary("maps");

    const map = new Map(document.getElementById("map"), {
        center: position,
        zoom: 15,
        mapId: "DEMO_MAP_ID"
    });
}
```

Pada contoh tersebut:

```javascript
center: position
```

menentukan titik tengah peta.

Sedangkan:

```javascript
zoom: 15
```

menentukan tingkat pembesaran peta.

Semakin besar nilai `zoom`, semakin dekat tampilan peta terhadap lokasi.

---

## Membuat Marker Google Maps

Setelah map tersedia, kita dapat menambahkan marker.

Pada implementasi Google Maps JavaScript API modern, kita dapat menggunakan **AdvancedMarkerElement**.

Contohnya:

```javascript
async function initMap() {
    const position = {
        lat: -6.9175,
        lng: 107.6191
    };

    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } =
        await google.maps.importLibrary("marker");

    const map = new Map(document.getElementById("map"), {
        center: position,
        zoom: 15,
        mapId: "DEMO_MAP_ID"
    });

    const marker = new AdvancedMarkerElement({
        map: map,
        position: position,
        title: "Lokasi Saya"
    });
}
```

Bagian terpentingnya adalah:

```javascript
position: position
```

yang menentukan koordinat marker.

Sedangkan:

```javascript
map: map
```

menentukan bahwa marker tersebut akan ditampilkan pada objek Google Maps yang baru saja kita buat.

---

## Contoh Lengkap Google Maps dengan Marker

Berikut contoh sederhana dalam satu halaman HTML:

```html
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">

    <title>Google Maps Marker</title>

    <style>
        #map {
            width: 100%;
            height: 450px;
        }
    </style>
</head>

<body>

    <h1>Lokasi pada Google Maps</h1>

    <div id="map"></div>

    <script>
        async function initMap() {
            const position = {
                lat: -6.9175,
                lng: 107.6191
            };

            const { Map } =
                await google.maps.importLibrary("maps");

            const { AdvancedMarkerElement } =
                await google.maps.importLibrary("marker");

            const map = new Map(
                document.getElementById("map"),
                {
                    center: position,
                    zoom: 15,
                    mapId: "DEMO_MAP_ID"
                }
            );

            new AdvancedMarkerElement({
                map: map,
                position: position,
                title: "Lokasi Saya"
            });
        }
    </script>

    <script
        async
        src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&loading=async&callback=initMap">
    </script>

</body>
</html>
```

Ganti:

```text
YOUR_API_KEY
```

dengan API key Google Maps milik project yang digunakan.

---

## Mengambil Latitude dan Longitude dari Database

Pada aplikasi sebenarnya, koordinat biasanya tidak ditulis langsung di JavaScript.

Data dapat berasal dari database.

Misalnya tabel `users` mempunyai:

```text
id
name
latitude
longitude
```

Contoh datanya:

```text
1 | User A | -6.9175 | 107.6191
```

Data tersebut kemudian diambil dari backend dan dikirim ke halaman.

Contoh sederhana menggunakan PHP:

```php
<?php

$latitude = (float) $user['latitude'];
$longitude = (float) $user['longitude'];

?>
```

Kemudian nilainya dapat digunakan pada JavaScript:

```javascript
const position = {
    lat: <?= json_encode($latitude) ?>,
    lng: <?= json_encode($longitude) ?>
};
```

Dengan demikian marker akan mengikuti koordinat yang tersimpan di database.

---

## Jangan Masukkan Data Database Langsung Tanpa Validasi

Pada implementasi nyata, nilai latitude dan longitude harus divalidasi terlebih dahulu.

Latitude berada pada rentang:

```text
-90 sampai 90
```

sedangkan longitude:

```text
-180 sampai 180
```

Contoh sederhana:

```php
$latitude = filter_var(
    $user['latitude'],
    FILTER_VALIDATE_FLOAT
);

$longitude = filter_var(
    $user['longitude'],
    FILTER_VALIDATE_FLOAT
);
```

Selain validasi format, aplikasi juga perlu memastikan koordinat memang berasal dari record yang boleh dilihat oleh pengguna tersebut.

---

## Tipe Data Latitude dan Longitude di Database

Pada artikel lama saya menggunakan tipe `FLOAT`.

Untuk aplikasi yang membutuhkan penyimpanan koordinat secara lebih konsisten, kita dapat mempertimbangkan tipe **DECIMAL**.

Contohnya:

```sql
latitude  DECIMAL(10, 7)
longitude DECIMAL(10, 7)
```

Contoh data:

```text
-6.9175000
107.6191000
```

Pada Laravel migration, misalnya:

```php
$table->decimal('latitude', 10, 7);
$table->decimal('longitude', 10, 7);
```

Pemilihan tipe data tetap perlu disesuaikan dengan kebutuhan dan database yang digunakan.

---

## Menampilkan Banyak Marker

Kita juga dapat menampilkan lebih dari satu lokasi.

Misalnya kita mempunyai:

```javascript
const locations = [
    {
        name: "Lokasi A",
        lat: -6.9175,
        lng: 107.6191
    },
    {
        name: "Lokasi B",
        lat: -6.9147,
        lng: 107.6098
    },
    {
        name: "Lokasi C",
        lat: -6.9218,
        lng: 107.6041
    }
];
```

Kemudian lakukan looping:

```javascript
locations.forEach((location) => {
    new AdvancedMarkerElement({
        map: map,
        position: {
            lat: location.lat,
            lng: location.lng
        },
        title: location.name
    });
});
```

Sekarang setiap koordinat mempunyai marker masing-masing.

Konsep ini dapat digunakan untuk aplikasi seperti:

```text
Lokasi cabang
Lokasi pelanggan
Lokasi teknisi
Lokasi properti
Lokasi pengiriman
Lokasi perangkat
```

---

## Menampilkan Nama Lokasi pada Marker

Properti:

```javascript
title: "Lokasi Saya"
```

dapat digunakan untuk memberikan informasi dasar pada marker.

Untuk informasi yang lebih lengkap, Google Maps juga menyediakan mekanisme untuk membuat konten interaktif seperti info window.

Contohnya, marker dapat dikembangkan agar menampilkan:

```text
Nama lokasi
Alamat
Nomor telepon
Status
Informasi lainnya
```

ketika pengguna berinteraksi dengan titik tersebut.

---

## Bagaimana Jika Koordinat Berasal dari IP Address?

Pada versi lama artikel ini saya menggunakan informasi IP address sebagai salah satu cara memperoleh perkiraan lokasi.

Hal tersebut perlu dipahami dengan benar.

**Lokasi berdasarkan IP bukan lokasi GPS yang presisi.**

IP geolocation biasanya hanya memberikan perkiraan wilayah berdasarkan jaringan yang digunakan.

Karena itu, jika aplikasi membutuhkan posisi perangkat yang lebih akurat, pertimbangkan menggunakan **Geolocation API browser** dengan izin pengguna.

Contoh:

```javascript
navigator.geolocation.getCurrentPosition(
    (position) => {
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);
    },
    (error) => {
        console.error(error);
    }
);
```

Browser akan meminta izin pengguna sebelum memberikan lokasi.

---

## Marker Tidak Muncul? Cek Beberapa Hal Ini

Jika peta tampil tetapi marker tidak terlihat, periksa:

### 1. Latitude dan longitude

Pastikan nilainya berupa angka:

```javascript
console.log(position);
```

### 2. Maps JavaScript API

Pastikan API yang diperlukan sudah aktif pada Google Cloud project.

### 3. API key

Periksa apakah API key valid dan restriction-nya sesuai domain yang digunakan.

### 4. Container peta

Pastikan elemen:

```html
<div id="map"></div>
```

mempunyai tinggi.

Contohnya:

```css
#map {
    height: 450px;
}
```

### 5. Browser console

Buka Developer Tools dan periksa Console untuk melihat error dari Google Maps JavaScript API atau JavaScript aplikasi.

---

## Marker Lama dan Advanced Marker

Jika menemukan tutorial Google Maps lama, kita sering melihat kode seperti:

```javascript
new google.maps.Marker({
    position: position,
    map: map
});
```

Kode tersebut banyak digunakan pada implementasi Google Maps sebelumnya.

Pada dokumentasi Google Maps JavaScript API yang lebih baru, Google menyediakan **Advanced Markers** untuk implementasi marker modern.

Karena itu, ketika membuat project baru sebaiknya periksa dokumentasi Google Maps terbaru dan gunakan API yang direkomendasikan untuk versi yang digunakan project.

---

## Kesimpulan

Untuk menandai sebuah lokasi di Google Maps, konsep dasarnya sebenarnya sederhana:

```text
Koordinat
(latitude + longitude)
        ↓
Google Maps
        ↓
Marker
        ↓
Lokasi tampil pada peta
```

Pada aplikasi nyata, koordinat tersebut dapat berasal dari database, API, input pengguna, GPS browser, atau sumber data lainnya.

Yang penting adalah memahami bahwa marker membutuhkan **posisi koordinat yang valid** dan objek Google Maps tempat marker ditampilkan.

Dengan konsep dasar tersebut kita dapat mengembangkan fitur yang lebih kompleks seperti:

- banyak marker,
- info window,
- lokasi pelanggan,
- pencarian lokasi,
- tracking perangkat,
- lokasi cabang,
- integrasi database,
- hingga aplikasi geolocation.

Semoga tutorial ini membantu memahami cara **membuat marker dan menentukan titik lokasi menggunakan Google Maps JavaScript API**.

---

*Artikel ini merupakan pembaruan dari tutorial lama mengenai Google Maps API. Contoh diperbarui karena implementasi Google Maps JavaScript API telah berkembang sejak artikel pertama diterbitkan.*

