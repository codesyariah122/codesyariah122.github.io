---
layout: post
title:  "membuat system polling dengan metode request ajax jquery PHP PDO"
author: puji
categories: [ php, mysql ]
image: assets/images/post/system_polling.png
tags: [webdeveloper]
opening: بسم الله الرحمن الرحيم
---  
![polling_php]({{site.url}}/public/images/post/system_polling.png)  

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
```sql
mysql -u root -p
#masukan password root login anda
#lanjut buat database

create database polling;
use polling;

create table polling ( id int(11) primary key auto_increment, framework varchar(100) not null, value int(11) yes null );
describe polling;
```
![polling_php]({{site.url}}/public/images/post/system_polling_database.png)  
databse telah selesai dibuat, lanjut coding program nya yuk ah .... 

# kedua
siapkan directory di htdoc webserver kalian bebas untuk memberikan nama direktorinya.
kemudian buat beberapa file baru di direktori kalian,
1. index.php
2. config.php
3. functions.php

file utama kita adalah index.php, sedangkan file function.php berperan sebagai file action untuk program systemnya. dan file config merupakan constant untuk configurasi database programm kita kali ini.  Dan untuk update artikel kali ini saya menggunakan teknik PDO (PHP data object), dan kali ini saya menggunakan framework css materialize. 
susunan file nya, direktori nya saya beri nama system_polling :  
![polling_php]({{site.url}}/assets/images/post/system_polling_direktori.png)  

### buat file config.php  
*kemudian copy code di bawah ini*  

```php
<?php
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '1');
define('DB_NAME', 'polling'); 

```  

### lanjut buat file functions.php  
**copy code di bawah ini**  

```php

<?php
require_once 'config.php';

function html($direktori, $layout, $ext='.ext', $title){
  global $dir;

  if(file_exists($dir.'/'.$layout.$ext)){
    $title = ($layout === 'footer') ? '' : $title;
    require_once $dir.'/'.$layout.$ext;
  }else{
    echo "<h1 class='red-text'>Layout not found</h1>";
  }
}

function connect(){
  $server = DB_HOST;
  $user = DB_USER;
  $pass = DB_PASS;
  $db = DB_NAME;

  try{
    $conn = new PDO("mysql:host=$server; dbname=$db", $user, $pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::
      ERRMODE_EXCEPTION);
    return $conn;
    // echo "Connection sucessfully";

  }catch(PDOException $e){
    echo "Connection failed :".$e->getMessage();
  }
}

function framework($query){
  $dbh = connect();
  $result = $dbh->prepare($query);
  $result->execute();

  $rows=[];
  while($row = $result->fetch(PDO::FETCH_OBJ)):
    $rows[] = $row;
  endwhile;

  return json_encode($rows);
}

function polling($data, $table){
  $framework = @$data['framework'];

  $dbh = connect();
  $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  $sql = "UPDATE `$table` SET value = value+1 WHERE `framework` = '$framework'";
  $stmt = $dbh->prepare($sql);
  $stmt->bindParam(':value', $framework);
  $stmt->execute();
  return $stmt->rowCount();
}
```  
***Copy code dibawah simpan ke file dengan nama ```index.php```***  
```php
<?php require_once 'functions.php'; $dir='contents'; ?>  
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

      <title>Polling css framework</title>
    </head>

    <div id="polling">
      <?php html($dir, 'polling', '.php', 'Polling Framework css'); ?>
    </div>


    <body>
      <!--Import jQuery before materialize.js-->
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/js/materialize.min.js"></script>

      <script type="text/javascript" src="assets/MyJs.js"></script>

    </body>
  </html>

```  

### Buat direktori contents  
direktori content ini akan menyimpan tampilan utama programm kita.  
***buat file baru di direktori contents***  

buat file dengan ```polling.php```  kemudian copy code dibawah ini : 
```php
<?php 
$framework = json_decode(framework("SELECT * FROM `framework`"));
?>

<div class="row">
<?php 
if(isset($_GET['p'])):
  $data=$_GET['p']; 
  if($_GET['p'] === $data):
    $frameworkdata = framework("SELECT * FROM `framework` WHERE `framework` = '$data'");
    $frameworkdata = json_decode($frameworkdata, true);
    // var_dump($frameworkdata); die;
?>

<div class="card-panel teal lighten-2">Anda baru saja memberikan polling untuk framework <b><font color="blue">
  <?=$frameworkdata[0]['framework']?></font></b>
</div>
<?php endif;endif;?>
  <div class="col s6">
    <h4>Framework List : </h4>
      <ul>
      <?php foreach($framework as $f): ?>
        <li>
          <input class="polling-input with-gap" name="framework" value="<?=$f->framework?>" type="radio" id="<?=$f->framework?>">
          <label for="<?=$f->framework?>"><?=$f->framework?></label>
        </li>
      <?php endforeach; ?>
        <li>
          <button class="polling-btn btn waves-effect waves-light" id="polling-btn">Polling
              <i class="material-icons right">send</i>
          </button>
        </li>
      </ul>
  </div>


<div id="view-data">
  
</div>

```  
dalam update artikel kali ini penulis menambahkan fungsi ajax sebagai metode request untuk meload data dari clientside tanpa mereload halaman secara keseluruhan : 
```javascript
$(document).ready(function(){
  $('#view-data').hide().load('contents/view_data.php').fadeIn(1000);

  $('#polling-btn').on("click", function(e){
    const frameworkValue = $('input[type=radio][name=framework]:checked').val();

    if(!frameworkValue){
      alert("Nothing framework selected");
      e.preventDefault();
    }else{

      $.ajax({
        url: 'contents/view_data.php?p=polling',
        type: 'post',
        data: 'framework='+frameworkValue,
        success: function(response){
          if(response == 'success'){
            $('#view-data').load('contents/view_data.php');
            //reset input radio button
            $('input[type=radio][name=framework]').prop('checked', false);
          }else{
            alert("You not selected framework polling");
            e.preventDefault();
          }
        }
      }) 

    }


  })

});
```  
save code diatas dengan nama MyJs.js di direktori assets, secara keseluruhan code diatas akan meload halaman view yang telah direquest oleh clientside dan menampilkan keseluruhan data terupdate setelah query data selesai dilakukan oleh serverside : 
```php
<?php 
require_once '../functions.php';

if(@$_GET['p'] == 'polling'):
  if(polling($_POST, 'framework') > 0):
    echo "success";
  endif;
else:
$framework = framework("SELECT * FROM `framework`");
$framework = json_decode($framework, true); 
// var_dump($framework); die;
?>

  <div class="col s6">
    <h4>Framework Polling</h4>
  <?php for($i=0; $i <= count($framework[0]); $i++): ?>
    <div class="tootltipped progress blue lighten-4" data-position="left" data-tooltip="I am a tooltip"></div><span><?=$framework[$i]['framework']?></span>
    <div id="progress" class="determinate blue"  aria-valuenow="<?=$framework[$i]['value']?>" aria-valuemin="0" aria-valuemax="100" style="width: <?=$framework[$i]['value']?>%"><?=$framework[$i]['value']?>%
    </div>
  <?php endfor;?>
  </div>

<?php endif; ?>

```  
save code diatas di direktori ```contents/``` dengan nama view_data.php. Alhasil setiap kali request dari clientside akan ditangani terlebih dahulu oleh metode ajax nya, ini bertujuan mengurangi resource load page ke server, dan membuat kerja server menjadi lebih cepat.

untuk file assets dan file lengkap lainnya bisa clone langsung atau download ke repository dibawah ini :  
<a href="https://github.com/codesyariah122/system_polling.git">System Polling </a>  

ok di setiap file di atas sudah saya beri sedikit penjelasan, mudah-mudahan bisa di mengerti yaa. mudah ko prinsip kerjanya sangat sederhana.  

ok selamat mencoba. 