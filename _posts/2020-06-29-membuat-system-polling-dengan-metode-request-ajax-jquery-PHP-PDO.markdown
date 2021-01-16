---
layout: post
title:  "membuat system polling dengan metode request ajax jquery PHP PDO"
author: puji
categories: [ php, mysql ]
image: assets/images/post/system_polling1.png
tags: [webdeveloper]
opening: بسم الله الرحمن الرحيم
---  
![system_polling_php]({{site.url}}/assets/images/post/system_polling2.png)  
![system_polling_php]({{site.url}}/assets/images/post/system_polling3.png) 
![system_polling_php]({{site.url}}/assets/images/post/system_polling4.png) 
![system_polling_php]({{site.url}}/assets/images/post/system_polling5.png) 

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
```bash
mysql -u root -p
#masukan password root login anda
#lanjut buat database

create database polling;
use polling;

create table polling ( id int(11) primary key auto_increment, framework varchar(100) not null, value int(11) yes null );
describe polling;
```
![database_polling_php]({{site.url}}/assets/images/post/system_polling_database.png)  
databse telah selesai dibuat, lanjut coding program nya yuk ah .... 

# kedua
siapkan directory di htdoc webserver kalian bebas untuk memberikan nama direktorinya.
kemudian buat beberapa file baru di direktori kalian,
1. index.php
2. config.php
3. functions.php

file utama kita adalah index.php, sedangkan file function.php berperan sebagai file action untuk program systemnya. dan file config merupakan constant untuk configurasi database programm kita kali ini.  Dan untuk update artikel kali ini saya menggunakan teknik PDO (PHP data object), dan kali ini saya menggunakan framework css materialize. 
susunan file nya, direktori nya saya beri nama system_polling :  
![direktori_polling_php]({{site.url}}/assets/images/post/system_polling_direktori.png)  

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

function resetPolling($data){
  $framework = @$data['framework'];

  $dbh = connect();
  $sql = "UPDATE `framework` SET value = 0/value, win = win+1 WHERE `framework` = '$framework'";
  $stmt = $dbh->prepare($sql);
  $stmt->bindParam(':value', $framework);
  $stmt->bindParam(':total', $framework);
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
      <link rel="stylesheet" type="text/css" href="assets/package/dist/sweetalert2.min.css">
      <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.1/css/all.min.css">
      <!--Let browser know website is optimized for mobile-->
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

      <title>Polling css framework</title>
    </head>

    <div id="polling">
      <?php html($dir, 'polling', '.php', 'Polling Framework css'); ?>
    </div>


    <body>
      <!--Import jQuery before materialize.js-->
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/js/materialize.min.js"></script>

      <!-- sweet alert 2 -->
      <script src="assets/package/dist/sweetalert2.min.js"></script>

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
// var_dump($framework); 
// echo $framework[0]->value."<br/><br/>";
// die;
?>

<div class="row">
  <div class="col s6">
    <h4>Framework List : </h4>
      <ul>
      <?php foreach($framework as $f): ?>

        <li>
          <input class="polling-input with-gap" name="framework" value="<?=$f->framework?>" type="radio" id="<?=$f->framework?>">
          <label for="<?=$f->framework?>"><?=$f->framework?></label>
        </li>
      <?php endforeach; ?>
<!--        <li>
          <button class="polling-btn btn waves-effect waves-light" id="polling-btn">Polling
              <i class="material-icons right">send</i>
          </button>
        </li> -->
      </ul>
  </div>


<div id="view-data">
  
</div>

```  
dalam update artikel kali ini penulis menambahkan fungsi ajax sebagai metode request untuk meload data dari clientside tanpa mereload halaman secara keseluruhan : 
```javascript
$(document).ready(function(){

  $('#view-data').hide().load('contents/view_data.php').fadeIn(1000);

  $('input[type=radio]').on("click", function(e){
    const framework = $('input[name=framework]:checked').val();

    // alert(framework);

    switch(framework){
      case "Bootstrap":
      icon = 'bootstrap.png';
      break;
      case "Materialize":
      icon = 'materialize.png'
      break;
      case "Foundation":
      icon = 'foundation.png';
      break;
      case "Bulma":
      icon = 'bulma.png';
      break;
    }

    const value = $('#progress').attr('aria-valuenow');


    if(framework){
      $.ajax({
        url: 'contents/view_data.php?p=polling',
        type: 'post',
        data: 'framework='+framework,
        success: function(response){
          if(response){
            $('#view-data').load('contents/view_data.php').fadeIn(1000);

            $('input[type=radio]').prop("checked", false);
            swal.fire({
              title: framework,
              text: 'Your framework choice : '+framework,
              imageUrl: location.href+'/assets/images/'+icon,
              imageWidth: 150,
              imageHeight: 130,
              imageAlt: framework,
              timer: 2000
            });
          }else{
            swal.fire("Nothing framework selected");
            e.preventDefault();
          }
          
        }
      })
    }

    if(value >= 99){
    $('#view-data').hide().load('contents/view_data.php').fadeIn(1000);
      $.ajax({
        url: 'contents/view_data.php?p=reset',
        type: 'post',
        data: 'framework='+framework,
        success: function(response){
          if(response){
              Swal.fire({
                title: framework+' is Winner <i class="fas fa-medal"></i>',
                text: framework+" has 100%",
                imageUrl: location.href+'/assets/images/'+icon,
                imageWidth: 150,
                imageHeight: 130,
                imageAlt: framework,  
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yeahh, next polling again!'
              }).then((result) => {
                if (result.value) {
                  Swal.fire(
                    'Ok !',
                    'See you next Polling',
                    location.href+'/assets/images/'+icon,
                  '150',
                  '130',
                  framework,
                  );
                  setTimeout(function(){
                    $('#view-data').load('contents/view_data.php').fadeIn(1000);
                  }, 1500);
                }
              })
            }
          }
      });
    }

  });
});


```  
save code diatas dengan nama MyJs.js di direktori assets, secara keseluruhan code diatas akan meload halaman view yang telah direquest oleh clientside dan menampilkan keseluruhan data terupdate setelah query data selesai dilakukan oleh serverside : 
```php
<?php 
require_once '../functions.php';
$medal = '<i class="fas fa-fw fa-lg fa-medal blue-text"></i>';
if(@$_GET['p'] == 'polling'):
  if(polling($_POST, 'framework') > 0):
    echo @$_POST['framework'];
  endif;
elseif(@$_GET['p'] == 'reset'):
  resetPolling(@$_POST);
  echo @$_POST['framework'];
else:
$framework = framework("SELECT * FROM `framework`");
$framework = json_decode($framework, true); 
//var_dump($framework); die;
?>

  <div class="col s6">
    <h4>Framework Polling</h4>
  <?php for($i=0; $i <= count($framework[0])-1; $i++): ?>
  <div class="col s5">
    <p class="orange-text">Win : <?php for($j=1; $j <= $framework[$i]['win']; $j++): echo $medal; endfor;?> </p>

  </div>
    <div class="tootltipped progress blue lighten-4" data-position="left" data-tooltip="I am a tooltip"></div>
    <span id="framework" data-name="<?=$framework[$i]['framework']?>">
      <?=$framework[$i]['framework']?>  
    </span>
    <div id="progress" class="determinate blue"  aria-valuenow="<?=$framework[$i]['value']?>" aria-valuemin="0" aria-valuemax="100" value="<?=$framework[$i]['value']?>" style="width: <?=$framework[$i]['value']?>%"><?=$framework[$i]['value']?>%
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