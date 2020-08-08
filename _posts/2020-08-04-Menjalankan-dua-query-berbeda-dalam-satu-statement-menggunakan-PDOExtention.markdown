---
layout: post
title:  "Menjalankan dua query berbeda dalam satu statement menggunakan PDOExtention"
author: puji
categories: [ php, ajax, jquery ]
image: assets/images/post/pdo.png
tags: [webdeveloper]
opening: بسم الله الرحمن الرحيم
---  


### Menjalankan dua query berbeda secara bersamaan dalam satu statement  

masih mengenai PDOExtention seperti base method dari aplikasi crud data sederhana ajax, di artikel sebelum-sebelumnya yang pernah ada di blogg ini.  
ketika sebuah aplikasi semakin berkembang dinamika process data menjadi semakin komplek, ada banyak table data yang berhubungan satu dengan lainnya. Algoritma menjadi semakin komplek dibutuhkan penanganan yang praktis, cepat dan mudah dimengerti untuk selanjutnya di maintenance.

dalam artikel ini gout maksudkan sebagai catatan pribadi gout belaka, dimana dalam beberapa project gout yang lalu menemukan kasus, seperti :  

* table yang berhubungan satu sama lain
dalam kasus tersebut gout berhadapan dengan table yang terkait dengan table lainnya, di kasus tersebut ada data yang harus diinsert dan diupdate secara bersamaan, setelah berkutat di mesin google mencari solusi dan ilmu disana dimari, akhirnya gout bertemu dengan kasus dan permasalahan yang sama disebuah website sharing programmer terkenal sejagad dunia yang fana ini yaitu di stackoverflow, link nya gout sematkan di bawah ini :  
[stackoverflow](https://stackoverflow.com/questions/14059172/insert-into-2-tables-with-pdo-mysql "Crud data sederhana dengan ajax jquery")  
dari diskusi di forum tersebut akhirnya solved dengan code yang beberapa kali gout debugging, dan akhirnya fix menjadi seperti ini :  

```php
function addData($data, $table1, $table2){
  $dbh = connect();
  $data = $dataExample;
  $sql = "
      INSERT INTO `$table1` (id1_primarykey, data_exapmple, id2_foreignkey) VALUES ('', ?, '');
  ";
  $insertProduct = $dbh->prepare($sql);

  $insertProduct->bindParam(1, $data);

  $insertProduct->execute();
  
    // update id_react table product
  $lastId = $dbh->lastInsertId();
  $sql = "
    UPDATE `$table1` SET id2_foreignkey = $lastId WHERE `id1_primarykey` = $lastId;
    INSERT INTO `$table2` (id2_primarykey, data) VALUES($lastId, ?);
  ";
  $stmt = $dbh->prepare($sql);
  $stmt->bindParam(1, $data);

  return $stmt->execute();

```  

dari code diatas alhamdulillah problem gout solved, dari process pertama data dikirm ke table1 kemudian dalam process selanjutnya satu field data di table1 di update dengan mengambil ***id terakhir*** dalam kasus tersebut gout menggunakan PDOExtention dan script untuk PDO::lastInsertId(); ***perhatikan script berikut : ```$lastId = $dbh->lastInsertId()```*** ```$dbh``` itu adalah variable untu memanggil fungsi ```connect(){}``` yaitu sebuah fungsi untuk mengkoneksikan database. di table1 berbarengan dengan mengirim data yang berbeda ke table yang berbeda yaitu table2. dan process ini berjalan normal dan lancar. semoga coders semua yang mengalami permasalahan yang sama bisa solved juga, semoga artikel ini juga membantu bagi yang mempunyai permasalahan yang sama dengan gout. dirasa gout cukupkan artikel ini. akhir kata gout ucapkan .... 

waasalamm....

***puji ermanto***  

