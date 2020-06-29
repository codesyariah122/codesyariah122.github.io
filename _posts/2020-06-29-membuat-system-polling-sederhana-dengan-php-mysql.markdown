---
layout: post
title:  "membuat system polling sederhana dengan PHP"
author: puji
categories: [ php, mysql ]
image: assets/images/post/tutor.jpg
tags: [webdeveloper]
opening: بسم الله الرحمن الرحيم
---  
![polling_php]({{ site.url }}/assets/images/post/materialize.png)  

# hai coders!...  
bagaimana keadaanya semua, ditengah **pandemi** yang sedang melanda ini,  
semoga kita semua selalu dalam lindungan allah, dan selalu di berikan nikmat sehat dan nikmat waktu luang untuk menjaga kesehatan.  

baiklah, kali ini saya mau iseng-iseng sedikit (.."iseng ko sedikit") ... lanjut.  
iseng-iseng saya kali ini adalah membuat system polling sederhana yang sangat simple dan sederhana dengan php dan database mysql.  

langsung ajah yuk , kita mulai coding ....
# pertama  
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
![polling_php]({{site.url}}/assets/images/post/tutor_mysql.jpg)  
databse telah selesai dibuat, lanjut coding program nya yuk ah .... 

# kedua
siapkan directory di htdoc webserver kalian bebas untuk memberikan nama direktorinya.
kemudian buat beberapa file baru di direktori kalian,
1. index.php
2. config.php
3. functions.php

file utama kita adalah index.php, sedangkan file function.php berperan sebagai file action untuk program systemnya. dan file config merupakan constant untuk configurasi database programm kita kali ini.  Dan untuk update artikel kali ini saya menggunakan teknik PDO (PHP data object), dan kali ini saya menggunakan framework css materialize. 
susunan file nya, direktori nya saya beri nama system_polling :  
![polling_php]({{site.url}}/assets/images/post/direktori.png)  

### buat file config.php  
*kemudian copy code di bawah ini*  

```
<?php
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '1');
define('DB_NAME', 'polling'); 

```  

### lanjut buat file functions.php  
**copy code di bawah ini**  

```

<?php
require 'config.php';

function html($direktori, $layout, $ext='.ext', $title){
  global $dir;

  if(file_exists($dir.'/'.$layout.$ext)){
    $title = ($layout === 'footer') ? '' : $title;
    require_once $dir.'/'.$layout.$ext;
  }else{
    echo "<h1 class='text-red'>Layout tidak tersedia</h1>";
  }

}

function connect(){
  $server = DB_HOST;
  $user = DB_USER;
  $pass = DB_PASS;
  $db = DB_NAME;

  try{
    $conn = new PDO("mysql:host=$server;dbname=$db", $user, $pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    return $conn;
    //echo "Connect Successfully";
  }catch(PDOException $e){
    echo "Conection Failed : ".$e->getMessage();
  }
}

function framework($query){
$dbh = connect();
$result = $dbh->prepare($query);
$result->execute();

$rows = [];
while($row = $result->fetch(PDO::FETCH_OBJ)):
  $rows[] = $row;
endwhile;

return $rows;

}


function polling($data,$table){
$framework = $data['framework'];
// echo $framework; die;
$conn = connect();
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$sql = "UPDATE `$table` SET value=value+1 WHERE `id` = $framework";
$stmt = $conn->prepare($sql);

$stmt->execute();

return $stmt->rowCount();

}
```  
***Copy code dibawah simpan ke file dengan nama ```index.php```***  
```
<?php require_once 'functions.php'; $dir = 'contents';?>

  <!DOCTYPE html>
  <html>
    <head>
      <!--Import Google Icon Font-->
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
      <!--Import materialize.css-->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css">

    <link rel="stylesheet" type="text/css" href="assets/style.css">

      <!--Let browser know website is optimized for mobile-->
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      
      <title>Polling css Framework</title>

    </head>

  <body>

    <?php html('', 'header', '.php', 'Polling Framework css'); ?>

    <?php html('', 'polling', '.php', 'Polling Framework css');?>

  
      <!--Import jQuery before materialize.js-->
      <script type="text/javascript" src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/js/materialize.min.js"></script> 
    <script type="text/javascript" src="assets/MyJs.js"></script>
</body>
  </html>

```  

### Buat direktori contents  
direktori content ini akan menyimpan tampilan utama programm kita.  
***buat file baru di direktori contents***  

buat file dengan ```polling.php```  kemudian copy code dibawah ini : 
```
<div class="divider"></div>
  <div class="container">
    <div class="divider"></div>
  <?php $id=$_GET['p']; ?>
    <?php if(isset($_GET['p'])): if($_GET['p'] === $id): ?>
      <?php $framework = framework("SELECT * FROM `polling` WHERE `id` = $id")[0]; ?>
            <div class="card-panel green accent-2 red-text">
              Terimakasih anda sudah memberikan polling untuk framework <b><font color="blue"><?=$framework->framework?></font></b>
            </div>
          <?php endif; endif;?>

    <div class="row">
        <div class="col s6">
          <h4>Framework favorit anda</h4>
    <?php $data = framework("SELECT * FROM polling");  ?>
          <form action="" method="post">
            <ul>
              <?php foreach($data as $d): ?>
              <li>
                <input class="with-gap" name="framework" value="<?=$d->id?>" type="radio" id="<?=$d->framework?>"/>
              <label for="<?=$d->framework?>"><?=$d->framework?></label>
              </li>
              <?php endforeach;?>
              <li>
                  <button class="btn waves-effect waves-light" type="submit" name="polling">Polling
                <i class="material-icons right">send</i>
              </button>
              </li>
            </ul>
          </form>
           
        </div>
<?php 
if(isset($_REQUEST['polling'])){
  if(polling($_REQUEST, 'polling') > 0){
    header('Location: index.php?p='.$_REQUEST['framework']);
  }
  $error = true;
}
?>        
        <div class="col s6">
          <h4>Framework Polling</h4>
        <?php foreach($data as $p): ?>
          <div class="progress blue lighten-4 tooltipped" data-position="top" data-tooltip="Progress bar was at <?=$p->value?> % when tested"></div><span><?=ucwords($p->framework)?></span>
          <div class="determinate blue" style="width:<?=$p->value?>%;"><?=$p->value?>%</div>
        <?php endforeach?>
        </div>
      </div>
  </div>


```  

untuk file assets dan file lengkap lainnya bisa clone langsung atau download ke repository dibawah ini :  
<a href="https://github.com/codesyariah122/system_polling.git">System Polling </a>  

ok di setiap file di atas sudah saya beri sedikit penjelasan, mudah-mudahan bisa di mengerti yaa. mudah ko prinsip kerjanya sangat sederhana.  

ok selamat mencoba. 






