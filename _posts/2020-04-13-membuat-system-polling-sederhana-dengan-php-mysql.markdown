---
layout: post
title:  "membuat system polling sederhana dengan PHP"
author: puji
categories: [ php, mysql ]
image: assets/images/post/tutor.jpg
tags: [webdev]
opening: بسم الله الرحمن الرحيم
---  
![polling_php]({{ site.url }}/assets/images/post/tutor.jpg)  

hai coders!...  
bagaimana keadaanya semua, ditengah **pandemi** yang sedang melanda ini,  
semoga kita semua selalu dalam lindungan allah, dan selalu di berikan nikmat sehat dan nikmat waktu luang untuk menjaga kesehatan.  

baiklah, kali ini saya mau iseng-iseng sedikit (.."iseng ko sedikit") ... lanjut.  
iseng-iseng saya kali ini adalah membuat system polling sederhana yang sangat simple dan sederhana dengan php dan database mysql.  

langsung ajah yuk , kita mulai coding ....
#pertama  
kita siapkan dulu database untuk menampung value pollingnya...  
masuk ke terminal atau cmd di windows, akses root ke aplikasi database nya disini saya menggunakan mysql
*terminal*
```
mysql -u root -p
#masukan password root login anda
#lanjut buat database

create database polling;
use polling;

create table polling ( id int(11) primary key auto_increment, framework varchar(100) not null, value int(11) yes null );
describe polling;
```
![polling_php]({{ site.url }}/assets/images/post/tutor_mysql.jpg)  
databse telah selesai dibuat, lanjut coding program nya yuk ah .... 

siapkan directory di htdoc webserver kalian bebas untuk memberikan nama direktorinya.
kemudian buat file baru di direktori kalian,  
1 index.php
2 function.php  
file utama kita adalah index.php, sedangkan file function.php berperan sebagai file action untuk program systemnya.  
susunan file nya, direktori nya saya beri nama tutor_polling :  
![polling_php]({{ site.url }}/assets/images/post/tutor_direktori.jpg)  

##buka file index.php  
*kemudian copy code di bawah ini*  

{%highlight php%}
<?php 
require_once 'function.php';

headernya("Halaman Utama");

$query = query("SELECT * FROM polling");

if(isset($_POST['submit'])):
	
	if(polling($_POST) > 0):
		header('Location: index.php');
	else:
		echo "
				<script>alert('anda belum mengisi polling');
				document.location.href='index.php';
				</script>
				";
	endif;

endif;
?>
<div class="jumbotron jumbotron-fluid">
  <div class="container justify-content-center">
    <h1 class="display-4">Polling Framework PHP</h1>
    <p class="lead">Framework PHP apa yang sedang trend sekarang ini, <br/> <smal class="blockquote-footer">mari kita lakukan polling</smal>.</p>
  </div>
</div>

<div class="container">
	<div class="row">
		<div class="col-6">
		<p class="lead">Which one is Best PHP Framework</p>
      <hr>
			<form action="" method="post">
				<?php foreach($query as $row): ?>
				<div class="form-group ml-4">
				  <input class="form-check-input" type="radio" name="id" id="<?=$row['framework']?>" value="<?=$row['id']?>">
				  <label class="form-check-label" for="<?=$row['framework']?>">
				    <?=$row['framework']?>
				  </label>
				</div>
				<?php endforeach; ?>
				<div class="form-group ml-auto">
					<button type="submit" name="submit" class="btn btn-outline-success btn-block">Polling</button>
				</div>
			</form>
		</div>

		<div class="col-6">
				<p class="lead">Persentase Polling Framework PHP Terbaik</p>
      		<hr>

      		<div class="row">
      			<div class="col-2">
      				<?php foreach($query as $row): ?>
      					<div class="mb-3">
      						<?php echo $row['framework'] ?>
      					</div>
      				<?php endforeach; ?>
      			</div>

      				<div class="col-10">
      					<?php foreach($query as $row): ?>
			      		<div class="progress mt-1 mb-4">
			  				<div class="progress-bar <?php if($row['value'] < 15 ): echo 'bg-info'; 
			  				elseif($row['value'] > 15): echo 'bg-success'; elseif($row['value'] > 25): echo 'bg-warning'; elseif($row['value'] > 50): echo 'bg-danger'; endif; ?>" role="progressbar" style="width: <?=$row['value']?>%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"><?=$row['value']?>%
			  				</div>
						</div>
						<?php endforeach; ?>	
      				</div>
      		</div><!-- row percentage -->
		</div><!--col-6 percentage-->

	</div>
</div>

<?php footer(); ?>  
{%endhighlight%}







