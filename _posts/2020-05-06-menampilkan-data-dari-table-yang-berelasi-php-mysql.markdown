---
layout: post
title:  "Menampilkan data dari relasi 2 table di php"
author: puji
categories: [ PHP, mysql_database ]
image: assets/images/post/relasi/relasi8.png
tags: [webdevelopment]
opening: بسم الله الرحمن الرحيم
---  
![relasi]({{ site.url }}/assets/images/post/relasi/relasi2.png)
![relasi]({{ site.url }}/assets/images/post/relasi/relasi1.png)  
hallo para coders ! ... salam jumpa.  
kali ini saya ingin berbagi tips dan trick seputar join table, inner join mysql mariaDB , php.  
dari kedua gambar diatas adalah data dari front end halaman admin applikasi web yang saya kembangkan. kedua table diatas tersebut saya relasi kan.  
dan saya assign field dengan nama field ```id_profile``` di table user sebagai foreign key atau kunci tamu.  
nah di field ini lah saya akan menghubungkan kedua table yang di relasi tersebut. dan seperti ini gambaran di database nya :  
![table_user]({{ site.url }}/assets/images/post/relasi/relasi5.png)
![table_profile]({{ site.url }}/assets/images/post/relasi/relasi6.png)
![relation_view_ditable_profile]({{ site.url }}/assets/images/post/relasi/relasi7.png)  
![relasinya]({{ site.url }}/assets/images/post/relasi/relasi8.png)  
dari table diatas saya membutuhkan data dari kedua table diatas. table1 saya asumsikan sebagai table user dan table2 saya asumsikan sebagai table profile. keduanya saling terhubung melalui foreign key di  field id_profile table user. dan di relasikan di table profile.  
maka dari itu saya harus melakukan query dengan key ```INNER JOIN``` , maka script yang saya gunakan menjadi sepert ini :  

```
<?php
function tampilUser($query){
	$result = mysqli_query($conn, $query);

	$rows = [];

	while($row = mysqli_fetch_assoc($result)):
		$rows[] = $row;
	endwhile;
	//print_r($rows);

	return $rows;
}
//assign seluruh fetch data ke dalam variable $tampilUsers
$tampilUsers = tampilUser("SELECT * FROM user, profile WHERE user.id_profile=profile.id_profile order by id DESC");

//tampil kan data dengan looping foreach
?>
<div class="container">
    <div class="row">
    <?php foreach($tampilUsers as $user): ?>
            <div class="d-flex justify-content-around">
                <div class="card" style="width: 18rem;">
                    <div class="text-center">
                      <div class="thumbnail">
                        <img src="assets/img/user/<?=$user['avatar']; ?>" alt="..." class="img-responsive" width="100" height="95">
                            <div class="caption">
                              <h3><?=ucwords($user['name'])?></h3>
                              <small style="color:grey; font-weight: bold; margin-top: -2em;">
                                <span style="<?php if($user['gender'] === 'P'): echo 'color:brown;'; elseif($user['gender'] === 'W'): echo 'color:salmon;'; endif;?>"><i class="fas fa-<?php if($user['gender'] === "P"): $gender="male"; elseif($user['gender'] === "W"): $gender="female";endif; echo $gender;?> fa-2x"></i></span> : <?=$user['role']?></small>
                              <p>signup : <?=$user['date']?></p>
                                <small style="color:salmon;">Login:<?=$user['login'] = ($user['login'] !== '0000-00-00 00:00:00') ? $user['login'] : 'Belum Login' ;?></small>
                                <p>
                                <?php if($_SESSION['role'] === $user['role']): ?>
                                    <div class="ficon">
                                      <a href="../../index.php?profile=<?=$_SESSION['name']?>" class="btn btn-info" role="button">View Profile</a> 
                                      <a href="content/updateProfile.php?id_profile=<?=$user['id_profile']?>" class="btn btn-danger" role="button">Edit Profile</a>
                                    </div>
                                <?php endif; ?>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
```  

silahkan disesuaikan, dengan algoritma dan rule di tempat agan-agan semua. karena di code diatas saya membuatnya dengan SESSION user. ok dirasa cukup totorial kali ini, mudah-mudahan dapat dengan mudah untuk difahami. mohon maaf atas kekurangannya. jika ada pertanyaan silahkan kirim di kolom komentar dibawah ini. 
**salam**



