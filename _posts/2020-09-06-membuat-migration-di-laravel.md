---
layout: post
title:  "Membuat Migration di Laravel"
author: puji
categories: [ PHP, Laravel, MVC, OOP ]
image: assets/images/post/laravel-migration.jpg
tags: [webdevelopment]
opening: بسم الله الرحمن الرحيم
--- 

Melanjutkan seri mengenai laravel sebelumnya, kali ini di artikel ini gout mau membahas  seputar migration di laravel. sebelumnya, apa kabarnya nih para coders ? mudah2an selalu di berkahi nikmat sehat dan nikmat waktu luang.

### Migration Laravel  
Seperti yang sudah kita ketahui, bahwasanya laravel mempunya banyak sekali magic tools, dan salah satu dari magic tools tersebut akan gout bahas di artikel kali ini. Ok langsung ajah ke prakteknya.  


#### Memulai migration  

Berdasarkan tutorial laravel sebelumnya yaitu di artikel ini <a href="https://codesyariah122.github.io/php/laravel/composer/git/docker/environment-development-dengan-laradock/" target="_blank">Deployment laravel application with Laradock</a>  

<blcokquote> jadi artikel ini developmentnya melanjutkan seri artikel di link tersebut yah </blcokquote>  

Ok tanpa banyak basa basi, kita buka code editor kesayangan kita , bagi yang menggunakan visual studio code tidak perlu lagi membuka terminal CLI yah, berhubung kali ini gout pakai sublime jadi terpaksa harus buka terminal.  

#### Aktifkan laradock  
Buka terminal kemudian akses direktori project **laradock** nya.  
Masuk ke direktori project.
```bash
root@debian:/home/puji122/laravel-projects# 
```  
Kemudian pindah ke direktori **laradock** :  

```bash
root@debian:/home/puji122/laravel-projects# ls -l
total 16
drwxrwxrwx 74 root    root    4096 Jan  8 07:02 laradock
drwxrwxrwx 12 root    root    4096 Jan 10 12:11 projectku
-rw-r--r--  1 puji122 puji122 3403 Jan 11 21:46 README.md
-rwxrwxrwx  1 root    root     305 Dec 18 13:00 test_api.php
root@debian:/home/puji122/laravel-projects# cd laradock/
root@debian:/home/puji122/laravel-projects/laradock# 
```  
perhatikan bagian ***root@debian:/home/puji122/laravel-projects/laradock#*** yup ... kita sudah masuk ke direktori laradock kita.  
kemudian kita jalankan container laradocknya :  

```bash
docker-compose up -d nginx mysql phpmyadmin redis workspace
```  
tunggu prosess nya sampai ***done***.  

```
root@debian:/home/puji122/laravel-projects/laradock# docker-compose up -d nginx mysql phpmyadmin redis workspace
laradock_docker-in-docker_1 is up-to-date
laradock_mysql_1 is up-to-date
laradock_redis_1 is up-to-date
Creating laradock_workspace_1  ... done
Creating laradock_phpmyadmin_1 ... done
Creating laradock_php-fpm_1    ... done
Creating laradock_nginx_1      ... done
root@debian:/home/puji122/laravel-projects/laradock# 
```  
Jika sudah aktif kita lanjutkan...  
kali ini kita aktifkan service ***workspace*** dari laradock dengan perintah berikut :  

```bash
docker-compose exec workspace bash
```  

```
root@debian:/home/puji122/laravel-projects/laradock# docker-compose exec workspace bash
npm notice 
npm notice New minor version of npm available! 7.0.15 -> 7.4.0
npm notice Changelog: https://github.com/npm/cli/releases/tag/v7.4.0
npm notice Run npm install -g npm@7.4.0 to update!
npm notice 
root@2687293dc36b:/var/www#
```  
sudah terlihat yah kita sudah berada di workspace laradock kita bisa dilihat kan : ```root@2687293dc36b:/var/www#```, menandakan kita ada di direktori workspace kita.  
sekarang kita mulai menginstall laravel nya yah. jika kalian sudah menginstall dari artikel sebelumnya maka tidak perlu menginstall nya lagi. tapi kalau mau sama kalian boleh mengulang installasi laravelnya disini :  

```bash
root@04f8fe1a3732:/var/www# composer create-project laravel/laravel=6.0 projectku --prefer-dist
```  
kemudian kita akses direktori project laravel kita disini saya menamakan direktori nya dengan nama ***project/***  
```bash
root@04f8fe1a3732:/var/www# cd projectku/
```  

### Setting Environment  
Selanjutnya adalah setting file ***.env*** di direktori root project kita, buka file .env di code editor kita, kira-kira seperti ini setup .env gout :  

```
DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=projectku
DB_USERNAME=root
DB_PASSWORD=root
```  
disesuaikan yah dengan settingan database kalian.  

kembali ke terminal lagi kemudian kita buat migration nya :  
```bash
root@04f8fe1a3732:/var/www/projectku# php artisan make:migration create_employees_table 
```  
disini gout mau buat table untuk menampung data karyawan dengan nama table ***employees***, buka file migration yang baru dibuat tadi yang berada di direktori : ***database/migrations/***. Kurang lebih seperti ini codingannya, otomatis laravel membuatkan 2 buah method yaitu **up()** dan **down()**, fungsi up adalah untuk meregenerate config dalam membuat sebuah table baru di database kita sementara fungsi down untuk mendestroy atau menghapus proses migration yang telah dilakukan yaitu menggunakan tools ***rollback***.  

```
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEmployeesTable extends Migration
{
    protected $field=[];

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('employees', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('employees');
    }
}
```  
jika file migrasi diatas kita eksekusi dengan perintah berikut : 
buka terminal kembali :  
```bash
root@04f8fe1a3732:/var/www/projectku# php artisan migrate
```  
setelah migrasi di eksekusi dengan perintah diatas, makan akan terbentuk sebuah struktur table baru di database kita, dimana di artikel ini nama database gout adalah database **projectku**. Coba kalian cek dengan phpmyadmin atau menggunakan mysql CLI di terminal. Sudah terlihat akan ada table baru dengan nama ***employee***.  

#### Selanjutnya ...  
Selanjutnya adalah edit table kita, asumsinya kita ingin menambahkan field atau column baru di table tersebut maka kita bisa mengubah code di file migration kita menjadi seperti ini :  

```
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEmployeesTable extends Migration
{
    protected $field=[];

    public function new($tableName, $field)
    {
        $this->field = $field;
        Schema::table($tableName, function(Blueprint $table){
            foreach($this->field as $dataField):
                $table->string($dataField);
            endforeach;
        });
    }
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('employees', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->timestamps();
        });

         if(!Schema::hasColumn('employees', 'name') && !Schema::hasColumn('employees', 'email') && !Schema::hasColumn('employees', 'jobdesk')){
            $tableName = 'employees';
            $dataField = [
                "name",
                "email",
                "jobdesk"
            ];
            $this->new($tableName, $dataField);
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('employees');
    }
}

```  
bisa di lihat dari code tersebut, gout menambahkan method baru yaitu method ***new()*** , dimana nanti fungis dari method ***new()*** ini akan melakukan refresh migration dengan menambahkan beberapa field atau column baru.  
Lanjut kita lakukan fresh migration dengan perintah berikut di terminal :  

```bash
root@04f8fe1a3732:/var/www/projectku# php artisan migrate:fresh
```  
coba lihat kembali database kita, sudah terlihat kan ada susunan field baru di table ***employees*** :  
```bash
root@debian:/home/puji122/laravel-projects/laradock# docker-compose exec mysql bash
root@c9bf0fb0acac:/# mysql -u root -p
```  

```bash
Enter password: 
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 2
Server version: 5.7.32 MySQL Community Server (GPL)

Copyright (c) 2000, 2020, Oracle and/or its affiliates. All rights reserved.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql> 

```  

```bash
mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| default            |
| mysql              |
| performance_schema |
| projectku          |
| sys                |
+--------------------+
6 rows in set (0.50 sec)

mysql> use projectku;
Reading table information for completion of table and column names
You can turn off this feature to get a quicker startup with -A

Database changed
mysql> 
```  

```bash
mysql> show tables;
+---------------------+
| Tables_in_projectku |
+---------------------+
| books               |
| employees           |
| migrations          |
| products            |
+---------------------+
4 rows in set (0.00 sec)

mysql> describe employees;
+------------+---------------------+------+-----+---------+----------------+
| Field      | Type                | Null | Key | Default | Extra          |
+------------+---------------------+------+-----+---------+----------------+
| id         | bigint(20) unsigned | NO   | PRI | NULL    | auto_increment |
| created_at | timestamp           | YES  |     | NULL    |                |
| updated_at | timestamp           | YES  |     | NULL    |                |
| name       | varchar(255)        | NO   |     | NULL    |                |
| email      | varchar(255)        | NO   |     | NULL    |                |
| jobdesk    | varchar(255)        | NO   |     | NULL    |                |
+------------+---------------------+------+-----+---------+----------------+
6 rows in set (0.19 sec)

mysql>
```  

#### Spesific migrate table  
selain cara diatas adalagi cara, jika kita sudah melakukan beberapa migration sehingga file migration kita sudah banyak, ada baiknya sih tiap migration berada dalam folder atau direktori berbeda untuk tiap-tiap migrationnya.  
untuk spesifik table tertentu kita bisa melakukan migrate dengan perintah berikut :  

```bash
root@04f8fe1a3732:/var/www/projectku# php artisan migrate --path=/database/migrations/2021_01_11_123821_create_employees_table.php
```  
dengan menambahkan command ***--path*** kemudian di isi dengan letak file migration yang akan di eksekusi.

ok sekian dulu dari saya untuk artikel kali ini, nanti kita lanjutkan lagi artikel mengenai laravel di artikel selanjutnya.... see the next articles 

bye :) 


***Salam***

**Puji Ermanto**