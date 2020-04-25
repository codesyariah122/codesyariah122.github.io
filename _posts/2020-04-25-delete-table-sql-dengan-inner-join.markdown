---
layout: post
title:  "Delete table database dari 2 table yang berbeda dengan 1 query inner join"
author: puji
categories: [ mysql-server, phpmyadmin ]
image: assets/images/post/1.jpg
tags: [webdevelopment]
opening: بسم الله الرحمن الرحيم
---  
# gambar table user dan table profile
![Table1]({{ site.url }}/assets/images/post/1.jpg)
![Table2]({{ site.url }}/assets/images/post/2.jpg)


# Delete 2 table dengan satu query  

Halo sobat coders semuanya ! ....  
kali ini saya akan membagikan trick seputar Database mysql, dalam tips kali ini saya mempunyai 2 table dalam satu database yang sama.  
seperti pada gambar table diatas, table1 itu saya asumsikan sebagai table user dan table2 saya asumsikan dengan table profile.  

di table user diatas terdapat foreign key untuk nilai **id_profile**, nah foreign key ini saya hubungkan ke primary key dari table profile dengan nilai yang sama yaitu **id_profile**. nilai ini yang akan saya ambil untuk dijadikan kunci pembuka query antar table.  


![foreign]({{ site.url }}/assets/images/post/3.jpg)  

untuk tips kali ini saya asumsikan 2 table yaitu table user dan table profile.  
dan berikut query untuk delete nya :  

jadi rule data saya adalah, dimana saya membuat system untuk aktivasi user, dan aktivasi user dilakukan melalui user role admin ... ( biar admin! ada kerjaan). sebelum melakukan delete kita cek isi table dengan nilai **id_profile** sebagai acuan atau kunci.  
algoritma saya jika **id_profile** ini bernilai *0* berarti nilai nya belum di kirim dan itu berarti statusnya belum aktif. dan selanjutnya melalui user role admin yang bertugas meng aktifasi setiap user yang terdaftar diawal.

```
//ini adalah query untuk mengambil data
$conn = mysqli_connect("localhost", "user", "password", "database");
$dataJoin = mysqli_query($conn, "SELECT * FROM $table1 INNER JOIN $table2 ON $table1.id = $table2.id_profile WHERE $table1.id = $id")[0];

if( $dataJoin['id_profile'] != 0 ):
		//echo true." = Benar "; die;

	mysqli_query($conn, "DELETE $table1, $table2 FROM $table1 INNER JOIN $table2 ON $table1.id_profile=$table2.id_profile WHERE $table1.id_profile = $id");

		return mysqli_affected_rows($conn);
	else:
			mysqli_query($conn, "DELETE FROM $table1 WHERE id = $id");
			return mysqli_affected_rows($conn);
	endif; 
```  

sebetulnya sih untuk menghapus dari 2 table ini bisa dilakukan dua kali query, namun dirasa kurang efektif maka digabungkan dalam satu query. agar server tidak 2 kali kerja.  

jika 2 kali query akan seperti ini :  
```
mysqli_query($conn, "DELETE FROM $table1 WHERE id_profile = $id");
mysqli_query($conn, "DELETE FROM $table2 WHERE id_profile = $id");
```  

dengan itu berarti server harus mengulang query delete 2 kali. berikut tampilan system aktivasi user yang saya buat  


![aktivasi]({{ site.url }}/assets/images/post/4.jpg)  

ok sekian dulu dari saya, semoga bermanfaat.

**salam**


