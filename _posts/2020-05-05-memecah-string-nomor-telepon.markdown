---
layout: post
title:  "Explode string nomor telepon dari query database"
author: puji
categories: [ PHP, explode ]
image: assets/images/post/explode_telp.png
tags: [webdevelopment]
opening: بسم الله الرحمن الرحيم
---  
![explode]({{ site.url }}/assets/images/post/explode_telp1.png)  
Halo para coders semuanya !  
selamat menjalankan ibadah puasanya, semoga berkah ibadah di bulan ramadhan tahun ini.  
postingan kali akan berhubungan dengan string di PHP. ok langsung saja kita eksekusi.  
dalam postingan ini asumsikan saya memiliki data di table seperti di gambar diatas tadi, nilai dari field nomor telpon diatas beruba varchar. jadi penginputan nomor telepon di lakukan saat user mengedit informasi profile nya. pada saat update, kita sertakan insert phone ke database ke field phone.  

ok contoh nya : 
```
//saya punya string beriku 
$telp = "6288222668778";
``` 
di string nomor telpon diatas terlihat string nya belum ada whitespace dan tanpa simbol apapun, dikarenakan saya ingin memudahkan user dalam penginputan nomor teleponnya, maka string harus saya pecah-pecah agar terlihat mudah untuk di baca dan di inputkan oleh user.  
ok langsung saja kita pecah string nomor telepon diatas :  

```
//potong string jadi beberapa bagian
$tel = str_replace("62", "0", $tel);
$fix1 = substr($tel, 0, 4);
$fix2 = substr($tel, 4, 4);
$fix3 = substr($tel, 8);
//lalu kita assign ke dalam sebuah array
$tel = explode($fix1, $tel);

//lalu kita assign lagi hasil array dari fungsi explode diatas ke dalam string kembali
$tel = [$fix1, $fix2, $fix3];
$tel = implode("-", $tel);

echo "Phone = ". $tel;
```

ok silahkan disesuaikan dengan rule dan algoritma ditempat agan masing-masing. dirasa sudah cukup postingan kali ini, saya harap mudah di fahami. 
**salam** 




