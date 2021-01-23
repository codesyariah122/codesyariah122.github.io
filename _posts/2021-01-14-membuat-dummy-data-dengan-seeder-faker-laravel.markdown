---
layout: post
title:  "Insert Data dengan Seeder dan Membuat Dummy Data menggunakan Faker di Laravel"
author: puji
categories: [ PHP, Laravel, MVC, OOP ]
image: assets/images/post/laravel-seeder.jpg
tags: [webdevelopment]
opening: بسم الله الرحمن الرحيم
---  

{{page.opening}}  

Halo brothers' masih tentang laravel, diartikel kali ini gout mau memberikan tips seputar management data di laravel menggunakan ```Faker``` method.  

Pertama kalian bisa lihat terlebih dahulu direktori project laravel gout kali ini, seperti ini listing directory project laravel gout :  

```bash
root@876a9f5bb1a6:/var/www/projectku# ls -l
total 284
drwxrwxrwx  6 root root   4096 Jan 11 14:50 app
-rwxrwxrwx  1 root root   1686 Aug 27  2019 artisan
drwxrwxrwx  3 root root   4096 Aug 27  2019 bootstrap
-rwxrwxrwx  1 root root   1497 Aug 27  2019 composer.json
-rwxrwxrwx  1 root root 220225 Jan 10 05:11 composer.lock
drwxrwxrwx  2 root root   4096 Aug 27  2019 config
drwxrwxrwx  5 root root   4096 Aug 27  2019 database
-rwxrwxrwx  1 root root   1013 Aug 27  2019 package.json
-rwxrwxrwx  1 root root   1589 Aug 27  2019 phpunit.xml
drwxrwxrwx  2 root root   4096 Aug 27  2019 public
-rwxrwxrwx  1 root root   3993 Jan 10 09:49 readme.md
drwxrwxrwx  6 root root   4096 Aug 27  2019 resources
drwxrwxrwx  2 root root   4096 Aug 27  2019 routes
-rwxrwxrwx  1 root root    563 Aug 27  2019 server.php
drwxrwxrwx  5 root root   4096 Aug 27  2019 storage
drwxrwxrwx  4 root root   4096 Aug 27  2019 tests
drwxrwxrwx 38 root root   4096 Jan 10 05:11 vendor
-rwxrwxrwx  1 root root    538 Aug 27  2019 webpack.mix.js

```  

#### Membuat Seeder  

Sebelum berlanjut ke topik utama yaitu membuat seeder, terlebih dahulu kita akan membuat table baru untuk menampung seeder :  
seperti topik membuat table migration di artikel sebelumnya, kali ini kita akan membuat migration untuk table dengan nama table ```employees```, kita lakukan migration dari terminal :  

```bash
root@876a9f5bb1a6:/var/www/projectku# php artisan make:migration create_employees_table
```  
akan terbentuk file baru di direktori ```database/migration/2021_01_13_create_employees_table.php```, kita buka file migration employees :  

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEmployeesTable extends Migration
{
	public function up()
    {
        Schema::create('employees', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('employees');
    }
}
```  

Kemudian eksekusi code diatas menggunakan artisan lagi, di terminal :  

```bash
root@876a9f5bb1a6:/var/www/projectku# php artisan migrate
```  
bisa dilihat di mysql atau di phpmyadmin kalian, akan ada table baru dengan nama table ```employees``` telah terbentuk, tapi kita lupa menambahkan field/column lainnya. Ok kita ubah terlebih dahulu code diatas, untuk menambahkan beberapa field/column baru di table ```employees``` sehingga code tersebut menjadi seperti ini :  

```php
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
Kemudian jalankan kembali :  
```bash
root@876a9f5bb1a6:/var/www/projectku# php artisan migrate
```  
atau :  

```bash
root@876a9f5bb1a6:/var/www/projectku# php artisan migrate:fresh
```  
jika berhasil maka akan terbentuk field/column baru di table ```employees```. Tapi jika belum berhasil bisa diulang proses diatas dengan menambahkan key ```refresh``` atau :  

```bash
root@876a9f5bb1a6:/var/www/projectku# php artisan migrate:refresh
```  

Ok Sekarang kita akan memulai seeder untuk table ```employees```  
- Apa itu Seeder ?  
	
	Apa itu seeding? Seeding jika diartikan secara harfiah bermakna memberi benih. Dalam konteks pengembangan aplikasi, Seeding adalah memberikan data awal ke database. Hal ini biasanya dilakukan saat
	pengembangan terutama jika kita ingin menguji apakah fitur tertentu telah berjalan sesuai ekspektasi
	menggunakan live data.
	Kita bisa saja memberikan data awal secara manual dengan melakukan insert melalui DBMS, akan tetapi
	bayangkan jika kita akan menguji 100 data atau lebih, tentu akan sangat membosankan dan memakan waktu
	jika kita lakukan Seeding secara manual. Cara yang lebih pintar adalah dengan memanfaatkan fitur Seeding
	di Laravel.

- Membuat Seeder :  
	Lanjut, kita buat terlebih dahulu file seeder untuk tabel tertentu. Misalnya, kita akan menguji fitur list employee, itu berarti kita ingin menyiapkan data employees terlebih dahulu ke database. Data ini hanyalah data dummy. Untuk membuat file seeder kita jalankan perintah berikut :  

```bash
root@876a9f5bb1a6:/var/www/projectku# php artisan make:seeder EmployeesSeederTable
```  

	Setelah kita jalankan perintah di atas, maka sebuah file ```app/database/seeds/EmployeesSeederTable.php``` Seperti ini isi file seedernya :  

```php
<?php

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class EmployeesSeederTable extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
    	//
    }

}
```  

**Penjelasan kode:** 
	> Kode di atas merupakan class seeder dengan nama ProductTableSeeder. Class tersebut memiliki satu method bernama run(). Pada method inilah kita akan menulis kode untuk mengisi data dummy untuk table products. Kita melakukan insert menggunakan Query Builder. Selanjutnya, kita akan coba insert data ke tabel employees. Maka kita tuliskan Query Builder kita pada method run() seperti ini:  Sebelumnya, kita juga bisa menggunakan model untuk proses Query Builder nya, kita buat dulu model baru :  

```bash
root@876a9f5bb1a6:/var/www/projectku# php artisan make:model Employee
```  
Kemudian buka file model dan edit menjadi seperti ini :  

```php
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Employee extends Model
{
    public function create($table, $data)
    {
    	DB::table($table)->insert([
    		$data
    	]);
    }
}

```  
selanjutnya kita buka kembali file ```database/seeds/EmployeeSeederTable.php```, edit code nya menjadi seperti ini :  

```php
<?php

use App\Employee;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class EmployeesSeederTable extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
    	$employee = new Employee;
        $data = [
            'name' => 'Puji Ermanto',
            'email' => 'pujiermanto@gmail.com',
            'jobdesk' => 'Frontend Dev'
        ];

        $employee->create('employees', $data);
    }

}
```  
Kemudian jalankan kembali seeder di terminal :  

```bash
root@876a9f5bb1a6:/var/www/projectku# php artisan db:seed --class=EmployeesSeederTable
Database seeding completed successfully.
root@876a9f5bb1a6:/var/www/projectku# 
```  
Coba cek di mysql atau phpmyadmin kalian maka akan terbentuk data baru, sesuai dengan data yang telah dibuat di file seeder tadi.  

>bisa lihat cuplikan berikut:  

<div class="embed-responsive embed-responsive-21by9">
  <iframe class="embed-responsive-item" src="{{site.url}}/assets/images/post/db-seed.mp4"></iframe>
</div>


### Dummy Data dengan Faker  

Sedikit berbeda dengan seeding namun mempunyai metodelogi yang kurang lebih sama yah, faker sendiri di fungsikan dengan tujuan untuk membuat demonstration data selama proses development. Yaa karena selama proses development ini kita butuh sebuah demonstration apakah aplikasi yang kita buat untuk pengolahan data bisa berjalan dengan baik atau tidak.  

Ok langsung ajah kita eksekusi menggunakan Faker.  
Masih menggunakan file yang sama yaitu file ```database/seeds/EmployeesSeederTable.php```, Kita hanya menambahkan method Query Builder langsung di file seedernya sehingga code seeder tersebut menjadi seperti berikut :  

```php
<?php

use App\Employee;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class EmployeesSeederTable extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create('App\Employees');

        for($i=2; $i<=20; $i++){
        	DB::table('employees')->insert([
                'created_at'=> $faker->date($format='Y-m-d', $timezone='Asia/Jakarta').' | '.$faker->time($format='H:i:s', $timezone='Asia/Jakarta'),
                'updated_at'=> $faker->date($format='Y-m-d', $timezone='Asia/Jakarta').' | '.$faker->time($format='H:i:s', $timezone='Asia/Jakarta'),
        		'name' => $faker->name($gender='male'),
        		'email' => $faker->email(),
        		'jobdesk' => $faker->jobTitle()
        	]);
        }
    }

}
```  

coba kita perhatikan code diatas, dimana laravel menyediakan fasilitas untuk membuat uji coba data yaitu di fungsi dengan namespace ini : ```use Faker\Factory as Faker;```.  
kemudian kita assignment fakernya di variable : ```$faker = Faker::create('App\Employees');```, kemudian kita looping sebuah data yang isinya adalah Query Builder untuk mengirim data ke table ```employees```.

coba kita jalankan kembali seeder nya di terminal :  

```bash
root@876a9f5bb1a6:/var/www/projectku# php artisan db:seed --class=EmployeesSeederTable
Database seeding completed successfully.
root@876a9f5bb1a6:/var/www/projectku# 
```  
> lihat dicuplikan berikut ini:  

<div class="embed-responsive embed-responsive-21by9">
  <iframe class="embed-responsive-item" src="{{site.url}}/assets/images/post/db-faker.mp4"></iframe>
</div>  

Mudah bukan, keren dong pastinya pakai framework ```laravel``` ini dimana proses development kita untuk membuat sebuah aplikasi menjadi lebih cepat dalam proses developmentnya, dan itu meringkas waktu sekali, sangat memudahkan para pengembang dan programmer khususnya web developer.  

Mudah-mudahan bermanfaat dari artikel gout ini yah, jika ada pertanyaan seputar artikel ini, silahkan berkomentar dengan baik di kolom komentar yang tersedia.

ok sekian dulu dari saya untuk artikel kali ini, nanti kita lanjutkan lagi artikel mengenai laravel di artikel selanjutnya.... see the next articles 

bye :) 


***Salam***

**Puji Ermanto**
