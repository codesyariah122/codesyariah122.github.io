---
layout: post
title: "Cara Membuat Dummy Data dengan Seeder dan Faker di Laravel"
author: "puji"
categories: [PHP, Laravel]
image: assets/images/social/membuat-dummy-data-dengan-seeder-faker-laravel-share.jpg
hero_image: assets/images/post/laravel-seeder.jpg
og_image_width: 1200
og_image_height: 630
og_image_type: image/jpeg
tags: [laravel, seeder, faker, dummy-data, database, eloquent, php]
opening: بسم الله الرحمن الرحيم
summary: "Tutorial membuat dummy data di Laravel menggunakan database seeder dan Faker, mulai dari migration, model, seeder, hingga menjalankan php artisan db:seed."
---

{{ page.opening }}

## Cara Membuat Dummy Data dengan Seeder dan Faker di Laravel

Saat mengembangkan aplikasi Laravel, kita sering membutuhkan banyak data untuk menguji halaman tabel, pagination, pencarian, filter, API, dashboard, atau fitur lainnya.

Memasukkan puluhan bahkan ratusan data secara manual tentu tidak efisien.

Laravel menyediakan **database seeder**, sedangkan data dummy dapat dibuat menggunakan **Faker**.

Pada tutorial ini kita akan membuat data dummy `employees` dengan alur:

1. Membuat migration tabel `employees`.
2. Membuat model `Employee`.
3. Membuat database seeder.
4. Menggunakan Faker untuk menghasilkan data dummy.
5. Menjalankan seeder dengan Artisan.
6. Memeriksa data yang berhasil dibuat.

> Artikel ini merupakan pembaruan dari tutorial yang pertama kali saya tulis ketika masih menggunakan struktur Laravel versi lama. Contoh di bawah diperbarui agar lebih mudah diterapkan pada Laravel modern.

---

## Apa Itu Seeder di Laravel?

**Seeder** adalah fitur Laravel untuk memasukkan data ke database melalui kode.

Seeder sangat berguna ketika kita membutuhkan data awal atau data pengujian selama proses development.

Misalnya kita sedang membuat halaman daftar karyawan.

Daripada memasukkan 50 karyawan satu per satu melalui phpMyAdmin atau form aplikasi, kita dapat meminta Laravel membuat data tersebut secara otomatis.

Perintah Artisan yang umum digunakan adalah:

```bash
php artisan db:seed
```

Kita juga dapat menjalankan seeder tertentu:

```bash
php artisan db:seed --class=EmployeeSeeder
```

---

## Apa Itu Faker?

**Faker** adalah library yang dapat menghasilkan data palsu atau dummy secara otomatis.

Contohnya:

```text
Nama      : Ahmad Hidayat
Email     : ahmad@example.com
Pekerjaan : Software Developer
```

Dengan Faker, kita tidak perlu menulis data pengujian satu per satu.

Kita dapat menghasilkan puluhan atau ratusan data dengan kombinasi Seeder dan Faker.

---

## 1. Membuat Migration Employees

Pertama kita buat migration untuk tabel `employees`.

Jalankan:

```bash
php artisan make:migration create_employees_table
```

Laravel akan membuat file migration di:

```text
database/migrations/
```

Buka file tersebut kemudian buat struktur tabel seperti berikut:

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('employees', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('jobdesk')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};
```

Kemudian jalankan migration:

```bash
php artisan migrate
```

Sekarang tabel:

```text
employees
```

akan tersedia di database.

Strukturnya kurang lebih:

```text
id
name
email
jobdesk
created_at
updated_at
```

---

## 2. Membuat Model Employee

Selanjutnya buat model:

```bash
php artisan make:model Employee
```

Model akan dibuat pada:

```text
app/Models/Employee.php
```

Contohnya:

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    protected $fillable = [
        'name',
        'email',
        'jobdesk',
    ];
}
```

Model `Employee` akan kita gunakan untuk memasukkan data dari seeder ke tabel `employees`.

---

## 3. Membuat Seeder Laravel

Sekarang buat seeder:

```bash
php artisan make:seeder EmployeeSeeder
```

Pada Laravel modern, file tersebut akan dibuat di:

```text
database/seeders/EmployeeSeeder.php
```

Struktur awalnya kurang lebih:

```php
<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class EmployeeSeeder extends Seeder
{
    public function run(): void
    {
        //
    }
}
```

---

## 4. Insert Data Menggunakan Seeder

Sebelum menggunakan Faker, kita dapat mencoba memasukkan satu data terlebih dahulu.

Ubah `EmployeeSeeder.php` menjadi:

```php
<?php

namespace Database\Seeders;

use App\Models\Employee;
use Illuminate\Database\Seeder;

class EmployeeSeeder extends Seeder
{
    public function run(): void
    {
        Employee::create([
            'name' => 'Puji Ermanto',
            'email' => 'pujiermanto@example.com',
            'jobdesk' => 'Web Developer',
        ]);
    }
}
```

Kemudian jalankan:

```bash
php artisan db:seed --class=EmployeeSeeder
```

Jika berhasil, Laravel akan menjalankan proses database seeding.

Sekarang periksa tabel:

```text
employees
```

Data yang kita masukkan melalui seeder seharusnya sudah tersedia.

---

## 5. Membuat Dummy Data Menggunakan Faker

Satu data tentu belum cukup untuk menguji aplikasi.

Sekarang kita gunakan Faker.

Ubah method `run()` menjadi:

```php
public function run(): void
{
    $faker = fake('id_ID');

    for ($i = 0; $i < 20; $i++) {
        Employee::create([
            'name' => $faker->name(),
            'email' => $faker->unique()->safeEmail(),
            'jobdesk' => $faker->jobTitle(),
        ]);
    }
}
```

Jangan lupa import model:

```php
use App\Models\Employee;
```

Sehingga file lengkapnya menjadi:

```php
<?php

namespace Database\Seeders;

use App\Models\Employee;
use Illuminate\Database\Seeder;

class EmployeeSeeder extends Seeder
{
    public function run(): void
    {
        $faker = fake('id_ID');

        for ($i = 0; $i < 20; $i++) {
            Employee::create([
                'name' => $faker->name(),
                'email' => $faker->unique()->safeEmail(),
                'jobdesk' => $faker->jobTitle(),
            ]);
        }
    }
}
```

Kemudian jalankan:

```bash
php artisan db:seed --class=EmployeeSeeder
```

Laravel akan membuat 20 employee dengan data yang berbeda-beda.

Contohnya:

```text
+----+----------------------+-----------------------------+----------------------+
| id | name                 | email                       | jobdesk              |
+----+----------------------+-----------------------------+----------------------+
| 1  | Ahmad Hidayat        | ahmad@example.com           | Software Developer   |
| 2  | Budi Santoso         | budi@example.com            | System Administrator |
| 3  | Rizky Pratama        | rizky@example.com           | Web Developer        |
+----+----------------------+-----------------------------+----------------------+
```

Data tersebut hanya contoh. Faker akan menghasilkan data yang berbeda ketika seeder dijalankan.

---

## 6. Menjalankan Seeder dari DatabaseSeeder

Selain menjalankan `EmployeeSeeder` secara langsung, kita dapat mendaftarkannya di:

```text
database/seeders/DatabaseSeeder.php
```

Contohnya:

```php
<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            EmployeeSeeder::class,
        ]);
    }
}
```

Sekarang cukup jalankan:

```bash
php artisan db:seed
```

Laravel akan menjalankan seeder yang sudah didaftarkan.

---

## 7. Menggunakan migrate:fresh --seed

Saat development, ada satu perintah yang sangat praktis:

```bash
php artisan migrate:fresh --seed
```

Perintah tersebut akan:

```text
hapus seluruh tabel
        ↓
jalankan migration
        ↓
buat tabel kembali
        ↓
jalankan database seeder
```

Ini sangat membantu ketika kita ingin mengembalikan database development ke kondisi awal.

> **Perhatian:** `migrate:fresh` menghapus seluruh tabel pada database yang digunakan. Jangan menjalankannya sembarangan pada database production.

---

## 8. Seeder dengan Query Builder

Selain Eloquent, data juga dapat dimasukkan menggunakan Query Builder.

Contohnya:

```php
use Illuminate\Support\Facades\DB;

public function run(): void
{
    $faker = fake('id_ID');

    for ($i = 0; $i < 20; $i++) {
        DB::table('employees')->insert([
            'name' => $faker->name(),
            'email' => $faker->unique()->safeEmail(),
            'jobdesk' => $faker->jobTitle(),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
```

Untuk kasus sederhana, baik Eloquent maupun Query Builder dapat digunakan.

---

## 9. Cara yang Lebih Rapi: Menggunakan Factory

Untuk aplikasi Laravel yang lebih besar, saya lebih menyarankan menggunakan **Model Factory**.

Buat factory:

```bash
php artisan make:factory EmployeeFactory --model=Employee
```

Kemudian isi factory:

```php
<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class EmployeeFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => fake('id_ID')->name(),
            'email' => fake()->unique()->safeEmail(),
            'jobdesk' => fake()->jobTitle(),
        ];
    }
}
```

Model `Employee` menggunakan trait:

```php
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Employee extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'jobdesk',
    ];
}
```

Kemudian pada seeder:

```php
Employee::factory()
    ->count(50)
    ->create();
```

Dengan cara ini kita dapat membuat:

```text
50 employee
100 employee
1.000 employee
```

tanpa menulis looping manual.

---

## Seeder vs Factory di Laravel

Keduanya berhubungan dengan pembuatan data, tetapi mempunyai tanggung jawab yang sedikit berbeda.

**Seeder** mengatur data apa yang perlu dimasukkan ke database.

Contohnya:

```php
$this->call([
    EmployeeSeeder::class,
]);
```

Sedangkan **Factory** mendefinisikan bagaimana sebuah model dummy dibuat.

Contohnya:

```php
Employee::factory()
    ->count(100)
    ->create();
```

Karena itu, keduanya sering digunakan bersama.

Alurnya menjadi:

```text
DatabaseSeeder
      ↓
EmployeeSeeder
      ↓
EmployeeFactory
      ↓
Faker
      ↓
employees table
```

---

## Contoh DatabaseSeeder untuk Banyak Data

Misalnya aplikasi mempunyai employee dan user.

Kita dapat membuat:

```php
public function run(): void
{
    User::factory()
        ->count(10)
        ->create();

    Employee::factory()
        ->count(50)
        ->create();
}
```

Kemudian:

```bash
php artisan migrate:fresh --seed
```

Database development langsung mempunyai data yang cukup untuk menguji aplikasi.

---

## Error yang Sering Terjadi Saat Menggunakan Seeder

### Class Seeder Tidak Ditemukan

Pastikan namespace-nya:

```php
namespace Database\Seeders;
```

dan jalankan:

```bash
composer dump-autoload
```

kemudian:

```bash
php artisan db:seed
```

### Duplicate Entry pada Email

Jika kolom `email` menggunakan unique index, Faker juga sebaiknya menggunakan:

```php
$faker->unique()->safeEmail()
```

atau:

```php
fake()->unique()->safeEmail()
```

### Data Seeder Terus Bertambah

Jika:

```bash
php artisan db:seed
```

dijalankan berkali-kali, seeder dapat memasukkan data tambahan setiap kali dijalankan.

Untuk database development yang boleh dihapus, kita dapat menggunakan:

```bash
php artisan migrate:fresh --seed
```

Tetapi sekali lagi, jangan gunakan `migrate:fresh` pada database production yang berisi data penting.

---

## Kesimpulan

Laravel Seeder dan Faker sangat membantu ketika kita membutuhkan data pengujian selama proses development.

Dengan kombinasi:

```text
Migration
   ↓
Model
   ↓
Factory
   ↓
Faker
   ↓
Seeder
   ↓
Database
```

kita dapat membuat puluhan bahkan ratusan data dummy hanya dengan beberapa baris kode.

Perintah yang paling sering digunakan antara lain:

```bash
php artisan make:seeder EmployeeSeeder
php artisan db:seed
php artisan db:seed --class=EmployeeSeeder
php artisan migrate:fresh --seed
```

Untuk project sederhana kita dapat menggunakan Faker langsung di dalam seeder.

Sedangkan untuk project yang lebih besar, penggunaan **Factory + Seeder** biasanya menghasilkan struktur yang lebih mudah dipelihara.

Semoga tutorial ini membantu memahami cara membuat **dummy data menggunakan Seeder dan Faker di Laravel**.

---

## Artikel Laravel Lainnya

Kalau sedang belajar Laravel, beberapa pembahasan lain di blog ini juga dapat digunakan sebagai lanjutan.

- Pelajari migration dan pengelolaan database Laravel.
- Pelajari Eloquent untuk mengelola data menggunakan model.
- Pelajari pagination ketika jumlah dummy data sudah cukup banyak.
- Pelajari pembuatan API Laravel untuk menampilkan data tersebut.

Saya juga sedang menulis seri implementasi Laravel dan MikroTik berdasarkan proses pengembangan aplikasi yang saya kerjakan, mulai dari koneksi RouterOS API hingga provisioning dan monitoring PPPoE.

---

*Artikel ini pertama kali ditulis menggunakan struktur Laravel versi lama dan kemudian diperbarui agar contoh Seeder, Faker, Factory, namespace, dan struktur direktorinya lebih relevan untuk Laravel modern.*