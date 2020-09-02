---
layout: post
title:  "Penggunaan database di pemrogramman python"
author: puji
categories: [ Python, programmer ]
image: assets/images/post/pythonDB.png
tags: [python]
opening: بسم الله الرحمن الرحيم
---  
![Source_bashrc]({{site.url}}/assets/images/post/python-sql.jpeg)  

### Database In Python  
masih melanjutkan artikel sebelumnya membahas python, artikel kali ini akan membahas mengenai akses dan operational data di python :  
dalam artikel kali ini gout menggunaan ***PyMySQL*** untuk menggunakan package tersebut kita harus menginstall package **PyMySQL** nya dulu.  

#### Install package  
langsung saja kita buka terminal untuk memulai installasi package mysql di python kita :  

```
python -m pip install PyMySQL
```  
setelah process installasi selesai, kita bisa langsung menggunakan package PyMySQL tersebut di project kita, sebagai contoh penggunaannya, disini gout buka di codeeditor **SublimeText3**, kemudian buka direktori project gout di code editor tersebut.  

#### membuat koneksi database  
langsung kita buat satu file baru, disini gout membuat satu file dengan nama ```connection.py```, untuk menggunakan package ```PyMySQL``` kita tinggal import ajah dengan code berikut ``` import pymysql.cursors ```.  
dalam menggunaannya bisa lihat code lengkap di bawah ini :  

```
import pymysql.cursors

db = pymysql.connect("localhost", "root", "1", "crudajax")
cursor = db.cursor()

cursor.execute("SELECT VERSION()")

data = cursor.fetchone()

print("Database version : %s " % data)

db.close()
```  
sesuaikan dengan konfigurasi database di tempat kalian.  
kita bisa langsung eksekusi code diatas, antara lain menggunakan terminal, kembali buka terminal lagi. kemudian eksekusi dengan perintah :  
```
# sesuai nama file yang diberikan
python connection.py
```
jika muncul result di terminal seperti ini :  
```
Database version : 10.1.45-MariaDB-0+deb9u1
```  
pernyataan diatas menandakan koneksi ke database berhasil, dan database siap di operasikan.

#### insert data  
contoh script dibawah ini adalah eksekusi pernyataan untuk SQL INSERT untu membuat catatan di table kita.  

```
import pymysql.cursors

# Open database connection
db = pymysql.connect("localhost","testuser","test123","TESTDB" )

# prepare a cursor object using cursor() method
cursor = db.cursor()

# Prepare SQL query to INSERT a record into the database.
sql = """INSERT INTO EMPLOYEE(FIRST_NAME,
   LAST_NAME, AGE, SEX, INCOME)
   VALUES ('Mac', 'Mohan', 20, 'M', 2000)"""
try:
   # Execute the SQL command
   cursor.execute(sql)
   # Commit your changes in the database
   db.commit()
except:
   # Rollback in case there is any error
   db.rollback()

# disconnect from server
db.close()
```  

#### fetching data  
untuk fetching data sendiri seperti ini contoh penggunaanya :  

```
import pymysql.cursors

connect = pymysql.connect("localhost", "root", "1", "crudajax")

cursor = connect.cursor()

sql = "SELECT * FROM product"

try:
	cursor.execute(sql)

	result = cursor.fetchall()

	for row in result:
		productcode = row[1]
		productname = row[3]
		productprice = row[5]

		print("Product Code = {}, Product Name = {}, Product Price = {}".format(productcode, productname, productprice))
except:
	print("Error : unable to fetch data")

connect.close()
```  
sampai disini mungin kesimpulannya, pemrograman python ini tidak jauh berbeda dengan php, yang sebelumny gout gunakan dalam beberapa project gout dan di kerjaan utama gout. makanya gout tertari menggunakan python untuk project selanjutnya.

Ok sekian dulu artikel mengenai Python kali ini, inshaallah nanti gout sambung lagi membahas mengenai python, di artikel selanjut-lanjutnya.  

akhir kata gout ucapkan terima kasih, jangan lupa jaga selalu kesehatan kita. Salam sukses selalu. Aamiin. 

**Wassalam**


By. Puji Ermanto



