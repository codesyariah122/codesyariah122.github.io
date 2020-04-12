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

$query = query("SELECT * FROM polling"); //fungsi ini berada di file function.php untuk mengambil data dari table database.

if(isset($_POST['submit'])):
	
	if(polling($_POST) > 0): //jalankan fungsi polling , check apakah ada penambahan data di table polling	
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
				<?php foreach($query as $row): ?> <!-- ambil data dari fungsi query kemudian looping -->
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

#lanjut buka file function.php  
copy code di bawah ini  
{%highlight php%}
<?php 

$conn = mysqli_connect("localhost", "root", "", "tutorial_polling");

if(!$conn) die(mysqli_connect_error());

function headernya($title){
	echo '<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

    <title>'.$title.'</title>
  </head>
  <body>';
}

function footer(){
	echo '  <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
  </body>
</html>';
}

function query($query){
  global $conn; //mengambil variable conn untuk melakukan connecti ke database, karena variable conn berada di luar fungsi
  $result = mysqli_query($conn, $query);

  $rows = []; //siapkan array kosong untuk menampung nilai variable dari value yang di kirim form input melalui method post
	//lakukan looping untuk mengurai data di table polling 
  while($row = mysqli_fetch_assoc($result)):
    $rows[] = $row;
  endwhile;

  return $rows;
}

function polling($data){
  global $conn;
    $id = $data['id'];
	//karena system polling ini berjalan melalui query update, lakukan update dan lakukan penambahan setiap tombol submit di click maka value akan bertambah 1 nilai jadi ( value+1 ) seperti itu seterusnya
    $query = "UPDATE polling SET 
                value=value+1 WHERE id = $id
            ";
    mysqli_query($conn, $query);
    return mysqli_affected_rows($conn);
}
{%endhighlight%}  

ok di setiap file di atas sudah saya beri sedikit penjelasan, mudah-mudahan bisa di mengerti yaa. mudah ko prinsip kerjanya sangat sederhana.  

ok selamat mencoba. 






