---
layout: post
title:  "Operational database di bahasa python dengan module mysql connector"
author: puji
categories: [ Python, programmer ]
image: assets/images/post/python/pythonDB.png
tags: [python]
opening: بسم الله الرحمن الرحيم
---  
![python1]({{site.url}}/assets/images/post/python/python-sql.jpeg)  

### Database In Python  
masih melanjutkan artikel sebelumnya membahas python, artikel kali ini akan membahas mengenai akses dan operational data di python :  
dalam artikel kali ini gout menggunaan ***PyMySQL*** untuk menggunakan package tersebut kita harus menginstall package **PyMySQL** nya dulu.  

#### Install package  
langsung saja kita buka terminal untuk memulai installasi module package mysql di python kita :  
gout akan menggunaan module ```mysql.connector```  

```
python3 -m pip install mysql-connector
```  
![pythongif1]({{site.url}}/assets/images/post/python/pip-python.gif)  

setelah proses installasi module selesai, kita bisa mulai menggunakan module tersebut di project python kita. untuk menggunakan module package kita bisa menambahkan tag seperti ini :  

```
import mysql.connector
```  

## MySQL.Connector  
sekarang kita mulai menggunakan module mysql.connector, untuk percobaan kita buat sebuah file untuk membuka sebuah koneksi ke database server, buat file baru dengan nama ```conn.py```, berikut isi code nya :  

```
import mysql.connector

host = 'localhost'
user = 'root'
passwd = '1'

cnx = mysql.connector.connect(
		host = host,
		user = user,
		password = passwd
	)

if cnx.is_connected():
	print("Berhasil terhubung ke server")

cnx.close()
```  
untuk menjalankannya, kita gunakan perintah di cli(command line) seperti biasa ```python <namafile.py>```. 
```
python conn.py
```  
jika dijalankan code diatas, maka hasilnya seperti ini :  

![pythongif2]({{site.url}}/assets/images/post/python/conn-python.gif)  

kode program kita berhasil terhubung ke server MySQL di localhost setelah di eksekusi oleh python.  

sedikit penjelasan dari code diatas ...  
Dibaris pertama kita mengambil module dari python yang mana diartikel ini kita menggunakan module ```mysql.connector```, kita gunakan perintah ```import``` untuk mengambil sebuah module di pyhton.  
**kemudian : **  
```
cnx = mysql.connector.connect(
		host = host,
		user = user,
		password = passwd
	)
```  
di code tersebut kita membuat sebuah koneksi dengan memanggil fungsi ```connect()``` dengan parameter diantaranya ```host, user dan password```, sebenarnya ada lagi beberapa parameter untuk module mysql.connector ini salah satunya adalah ```database``` yang digunakan untuk menentukan nama database yang akan kita gunakan di project kita.  
di baris paling bawah, atau baris terahir kita lakan validasi connection database kita, check connection database : 
```
if cnx.is_connected():
	print("Berhasil terhubung ke server")
```  
dan hasilnya kita print dengan string info yang berisi koneksi berhasil.  
selanjutnya kita akan mencoba membuat database dengan menggunakan module ```mysql.connector```.  

### Membuat Database  
sebelumnya kita sudah membuat sebuah objek untuk menampung nilai connect database, ```cnx```.  
selain objek ```cnx``` kita akan membutuhkan satu objek lagi yaitu cursor, buat objek baru untuk cursor :  
```
cursor = cnx.cursor()
```  
jadi nanti untuk melakukan eksekusi sebuah ```query``` ita tinggal panggil sebuah method di module ```mysql.connector``` yaitu method ```execute()``` dengan parameter string query.  

```
cursor.execute(sql)
```  
ok selanjutnya kita akan buat file baru dengan nama ```createDB.py```, berikut code lengkap dari ```createDB.py``` :  

```

import mysql.connector

host = 'localhost'
user = 'root'
passwd = '1'
nama_db = 'nama_ular'

cnx = mysql.connector.connect(
		host = host,
		user = user,
		password = passwd
	)

cursor = cnx.cursor()
cursor.execute("CREATE DATABASE {}".format(nama_db))

print("Database berhasil dibuat")
```  
sama seperti penggunaan mysql di pemrograman lainnya, kita menggunakan baris-baris command untuk melakukan sebuah query di ```MySQL```. code di atas bisa langsung kita eksekusi dengan menjalankannya di terminal(CLI(command line)) :  
```
python createDB.py
```  
seperti ini hasil code diatas jika di jalankan diterminal
![python3]({{site.url}}/assets/images/post/python/create_db1.png)  

dan ini di UI phpmyadmin : 
![python4]({{site.url}}/assets/images/post/python/create_db2.png)  

dengan itu berarti eksekusi code kita berhasil, dan database berhasil dibuat dari screenshoot di phpmyadmin tersebut terlihat ada database baru yang terdaftar.  

### Membuat table  
Untuk membuat table di database yang baru kita buat, caranya masih sama dengan code sebelumnya kita tinggal gunakan perintah command SQL untuk melakukan sebuah query ke dalam method ```execute()```  
ubah dahulu bagian ```connect()```, tambahkan parameter baru yaitu ```database``` untuk menentukan database mana yang akan digunakan:  

```
host = 'localhost'
user = 'root'
passwd = '1'
nama_db = 'nama_ular'
nama_tb = 'ular_berbisa'

cnx = mysql.connector.connect(
		host = host,
		user = user,
		password = passwd,
		database = nama_db
	)
```  
pada kode diatas kita menambahkan satu parameter baru untuk menentukan nama database yang akan kita gunakan sehingga menjadi seperti ini parameter lengkap untuk method ```connect()``` :  ```nama_db = 'nama_ular'``` ```database = nama_db```. jadi kita bisa buat sebuah file baru, gout beri nama file nya ```createTable.py``` : 

```
# nama file = createTable.py
import mysql.connector

host = 'localhost'
user = 'root'
passwd = '1'
nama_db = 'nama_ular'
nama_tb = 'ular_berbisa'

cnx = mysql.connector.connect(
		host = host,
		user = user,
		password = passwd,
		database = nama_db
	)

cursor = cnx.cursor()

sql = """CREATE TABLE {} (
	id_ular INT AUTO_INCREMENT PRIMARY KEY,
	nama_ular VARCHAR(255),
	nama_latin VARCHAR(255)
)
"""

cursor.execute(sql.format(nama_tb))

print("Table ular_berbisa berhasil dibuat")
```  
setelah itu kita bisa langsung eksekusi code programmnya :  
```
python createTable.py
```  
seperti ini hasilnya program python di terminal kita :  

![python5]({{site.url}}/assets/images/post/python/create_tb1.png)  

dan ini di phpmyadmin:  

![python6]({{site.url}}/assets/images/post/python/create_tb2.png)  

kita sudah berhasil membuat sebuah table baru di database kita menggunaan module ```mysql.connector``` di python.  

### Insert data  

Sebelumnya kita telah membuat sebuah table baru, sekarang kita akan mencoba untu menjalankan QUERY SQL untuk menambahan  data baru ke database kita, caranya masih sama, menggunaan command SQL.  
buat satu file baru lagi , gout kasih nama file nya ```insertDB.py```, kalian bebas memberi nama filenya. berikut isi dari file ```insertDB.py``` :  

```
import mysql.connector

host = 'localhost'
user = 'root'
passwd = '1'
nama_db = 'nama_ular'
nama_tb = 'ular_berbisa'

cnx = mysql.connector.connect(
		host = host,
		user = user,
		passwd = passwd,
		database = nama_db
	)

cursor = cnx.cursor()

sql = "INSERT INTO {} (nama_ular, nama_latin) VALUES (%s, %s)".format(nama_tb)

val = ("King Cobra", "Ophiophagus hannah")

cursor.execute(sql, val)


cnx.commit()

print("{} data ditambahkan ".format(cursor.rowcount))
```  
Langsung kita jalankan codenya di terminal kita :  

```
python insertDB.py
```  
begini hasilnya di terminal :  
![python6]({{site.url}}/assets/images/post/python/insert_tb1.png)  

di phpmyadmin sepert ini hasilnya :  
![python7]({{site.url}}/assets/images/post/python/insert_tb2.png)  

***penjelasan:***  
sedikit penjelasan: perhatikan baris code yang kita gunakan untuk melakukan query insert data:  
```
sql = "INSERT INTO {} (nama_ular, nama_latin) VALUES (%s, %s)".format(nama_tb)

val = ("King Cobra", "Ophiophagus hannah")

cursor.execute(sql, val)


cnx.commit()
```  
Di code tersebut kita menggunakan ```%s``` sebagai placeholder untuk mengisi query insert parameter value di sqlnya.  
teknik ini sangat berguna untuk menghindari ```SQL Injection``` dan juga membuat penulisan code kita lebih clean dan mudah untuk di baca. kemudian di code berikutnya atau di bawahnya kita laukan ```cnx.commit()``` code ini dimaksudkan guna untuk menyimpan data yang kita insertkan, method ```commit()``` juga biasa digunakan untuk diantaranya : update data, dan hapus data.  

***Menambahkan beberapa data sekaligus : ***  
buat sebuah file baru sebagai contoh, disini kita akan menginsert beberapa data dalam satu eksekusi. gout buat sebuah file baru sebagai contoh gout beri nama ```insertMany.py``` :  
```
import mysql.connector

host = 'localhost'
user = 'root'
passwd = '1'
nama_db = 'nama_ular'
nama_tb = 'ular_berbisa'

cnx = mysql.connector.connect(
		host = host,
		user = user,
		passwd = passwd,
		database = nama_db
	)

cursor = cnx.cursor()

sql = "INSERT INTO {} (nama_ular, nama_latin) VALUES (%s, %s)".format(nama_tb)

values = [
		("Mamba Hitam", "Dendroaspis polylepis"),
		("Viper Bertanduk", "Cerastes cerastes")
		]

for val in values:
	cursor.execute(sql, val)
	cnx.commit()

print("{} data ditambahkan ".format(len(values)))
```  
kemudian jalankan kembali di teminal file ```python insertMany.py```  

Dan seperti ini hasilnya di terminal :  
![python6]({{site.url}}/assets/images/post/python/insert_many1.png)  

di phpmyadmin sepert ini hasilnya :  
![python7]({{site.url}}/assets/images/post/python/insert_many2.png)  

### Menampilkan data  
Judul selanjutnya ini adalah menampilkan data, masih menggunaan query MySQL dengan command ```SELECT```. kita bisa ambil beberapa data dengan method :  
<li>fetchall() untuk menampilkan seluruh data</li>
<li>fetchmany(5) untuk menampilkan lima data</li>
<li>fetchone() untuk menampilkan satu data pertama saja.</li>  

Method ```fetchall(), fetchmany(), fetchone()``` aan mengembalikan sebuah data list yang berisi tupple. 
ok kita coba buat satu file baru lagi, gout beri nama file nya ```selectData.py``` :  

```
import mysql.connector

host = 'localhost'
user = 'root'
passwd = '1'
nama_db = 'nama_ular'
nama_tb = 'ular_berbisa'

cnx = mysql.connector.connect(
		host = host,
		user = user,
		password = passwd,
		database = nama_db
	)

cursor = cnx.cursor()

sql = "SELECT * FROM {}".format(nama_tb)

cursor.execute(sql)

results = cursor.fetchall()

for data in results:
	print(data)

cnx.close()
```  
Seperti biasa kita eksekusi lagi lewat terminal untuk menjalankannya.  
```
python selectData.py
```  
Dan seperti ini hasilnya di terminal :  
![python8]({{site.url}}/assets/images/post/python/select_data1.png)  

Selanjutnya kita akan mencoba menggunaan method ```fetchone()```, untuk mengambil satu data saja. buat file baru lagi dengan nama ```selectOne.py``` :  

```
import mysql.connector

host = 'localhost'
user = 'root'
passwd = '1'
nama_db = 'nama_ular'
nama_tb = 'ular_berbisa'

cnx = mysql.connector.connect(
		host = host,
		user = user,
		password = passwd,
		database = nama_db
	)

cursor = cnx.cursor()

sql = "SELECT * FROM {}".format(nama_tb)

cursor.execute(sql)

results = cursor.fetchone()

print(results)

# for data in results:
# 	print(data)

cnx.close()
```  
Dan seperti ini hasilnya di terminal :  
![python9]({{site.url}}/assets/images/post/python/select_data2.png)  

Untuk method select data lainnya, coders bisa coba sendiri, diantaranya ada ```fetchmany() dan fetchall()```. 

### Update data  
Di judul ini kita akan mencoba mengubah sebuah data, caranya pun masih sama dengan script sebelum-sebelumnya. Masih menggunakan command SQL, kali ini kita akan melakukan query ```UPDATE```. 
ok langsung saja kita buat file baru, gout beri nama ```updateData.py``` :  

```
import mysql.connector

host = 'localhost'
user = 'root'
passwd = '1'
nama_db = 'nama_ular'
nama_tb = 'ular_berbisa'

cnx = mysql.connector.connect(
		host = host,
		user = user,
		password = passwd,
		database = nama_db
	)

cursor = cnx.cursor()

sql = "UPDATE {} SET nama_ular=%s, nama_latin=%s WHERE id_ular=%s".format(nama_tb)
val = ("Mamba Hijau", "Dendroaspis angusticeps", 3)
cursor.execute(sql, val)

cnx.commit()

print("{} data diupdate".format(cursor.rowcount))

cnx.close()
```  
di code tersebut gout melakukan update data untuk sebuah id : 
```WHERE id_ular=``` karena di variable selanjutnya yaitu ***val = *** gout memberikan nilai seperti ini ```val = ("Mamba Hijau", "Dendroaspis angusticeps", 3)```, dengan itu gout melakukan update untuk data dengan ```ular_id=3```.  
Dan seperti ini hasilnya di terminal :  
![python10]({{site.url}}/assets/images/post/python/update_data1.png)  
dan di phpmyadminnya :  
![python11]({{site.url}}/assets/images/post/python/update_data2.png)  

selanjutnya ... 

### Hapus data  
Untuk menjalankan hapus data kurang lebih sama, masih menggunakan query SQL kali ini kita akan gunakan comman ```DELETE``` untuk menghapus data dan ```WHERE``` untuk menentukan data mana yang akan kita hapus disini gout menggunakan ```WHERE``` berdasarkan id yang akan dihapus.  
kita buat file baru dengan nama ```deleteData.py```, seperti ini code nya :  

```
import mysql.connector

host = 'localhost'
user = 'root'
passwd = '1'
nama_db = 'nama_ular'
nama_tb = 'ular_berbisa'

cnx = mysql.connector.connect(
		host = host,
		user = user,
		password = passwd,
		database = nama_db
	)

cursor = cnx.cursor()

sql = "DELETE FROM {} WHERE id_ular=%s".format(nama_tb)

val = (3,)

cursor.execute(sql, val)

cnx.commit()

print("{} data dihapus ".format(cursor.rowcount))

cnx.close()
```  
dari code diatas gout melakukan delete data berdasarkan ```id_ular = 3```.  

![python12]({{site.url}}/assets/images/post/python/delete_data1.png)  

dan di phpmyadminnya :  
![python13]({{site.url}}/assets/images/post/python/delete_data2.png)  
data dengan ```id_ular = 3``` berhasil dihapus.

sampai disini mungin kesimpulannya, pemrograman python ini tidak jauh berbeda dengan php, yang sebelumny gout gunakan dalam beberapa project gout dan di kerjaan utama gout. makanya gout tertarik dalam mempelajari dan menggunakan python untuk project gout selanjutnya.

Ok sekian dulu artikel mengenai operational database di Python kali ini, inshaallah nanti gout sambung lagi membahas mengenai python, di artikel selanjut-lanjutnya.  

akhir kata gout ucapkan terima kasih, jangan lupa jaga selalu kesehatan kita. Salam sukses selalu. Aamiin. 

**Wassalam**


By. Puji Ermanto



