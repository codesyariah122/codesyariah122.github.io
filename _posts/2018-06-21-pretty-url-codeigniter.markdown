---
layout: post
title:  "Pretty Url Di Codeigniter"
author: puji
categories: [PHP, MVC, Codeigniter]
image: assets/images/post/prety-url.jpg
tags: [codeigniter]
opening: بسم الله الرحمن الرحيم
---  

{{page.opening}}  

### Pretty Url  
Apa itu Pretty Url ?  
*Pretty Url* adalah Sebuah metodologi dalam sebuah pemrogramman yang bertujuan untuk meningkatkan jangkauan akses sehingga memudahkan proses bisnis selanjutnya dalam memenuhi kebutuhan marketing dan advertising.  
Pretty Url adalah cara yang khas yang memudahkan user mencari product yang kita pasarkan melalui aplikasi web yang kita bangun di sebuah server hosting.  

### Penggunaan Pretty Url Di Codeigniter  

Untuk membuat *Pretty Url* di codeigniter cukup mudah baik itu untuk seorang yang awam sekalipun saya rasa cukup mudah untuk di adaptasi.  
Setelah kalian mendownload zip framework codeigniter di www.codeigniter.com, kemudian kalian mengekstrak lalu memindahkan nya ke root directory web server kalian, bisa di asumsikan kalau Codeigniter sudah berjalan di web server kalian.  

#### Selanjutnya ...  
Setelah itu kita buka terminal untuk mengaktifkan mode rewrite ( khusus web server apache ) bisa di sesuaikan dengan kondisi di tempat kalian.  

buka terminal :  

```bash
root@pujiermanto# a2enmod rewrite
```  
setelah perintah di atas dieksekusi lanjut kita buka codeigniter di code editor kita :  
buat satu buah file baru di root directory Codeigniter dengan nama ```.htaccess```, kemudian copy code berikut :  

```
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ index.php/$1 [L] 
</IfModule>

```  
Selanjutnya buka file ```application/config/config.php```, cari bagian ini :  

```
$config['base_url'] = '';
```  
ganti menjadi :  
```
$config['base_url'] = 'http://localhost/Codeigniter';
```  

kemudian cari lagi bagian ini :  

```
$config['index_page'] = 'index.php';
```  
Ubah menjadi :  

```
$config['index_page'] = '';
```  

Jika sudah sekarang kalian bisa akses codegniter kalian tanpa ```http://localhost/index.php/welcome```, menjadi :  

```http://localhost/welcome```, begitu juga untuk pengaksesan Controoler lainnya yang kalian buat.  

Ok Selanjutnya kita akan bahas lagi seputar codeigniter di artikel selanjutnya lagi.  

**Wassalaamm**
