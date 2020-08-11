---
layout: post
title:  "Membuat fitur reaction button dengan ajax jquery php"
author: puji
categories: [ php, ajax, jquery ]
image: assets/images/post/crud_ajax_with_button_reaction.gif
tags: [webdeveloper]
opening: بسم الله الرحمن الرحيم
---  


### Membuat reaction button dengan jquery ajax  

![crud_ajax_with_button_reaction]({{site.url}}/assets/images/post/crud_ajax_with_button_reaction.gif)  

halo para coders ! apa kabarnya ? ...  
mudah-mudahan kalian semua selalu diberikan nikmat sehat selalu.  

ok dalam artikel kali ini gout mau membagikan tips and trick mungkin yah, hehehe. trick sederhana membuat reaction button kaya yang di medsos, medsos itu loh.  
tapi sebelum ke intinya, gout mau berbagi sedikit cerita. ini ada hubungannya dengan tujuan gout menulis artikel kali ini, karena berdasarkan pengalaman yang pernah gout alami. dari pengalaman tersebut yahh sekitar setahun yang lalu, gout sebagai web developer untuk sebuah perusahaan distributor kosmetik, dan disalah satu halaman webnya gout pasang sebuah button reaction untuk mendapatkan review dari pengalaman pengunjung setelah melihat-lihat list product, nah di aplikasi button reaction itu adalah pihak ketiga yang disediakan sebuah layanan media advertise online yaitu <a href="https://www.addthis.com/social-buttons/">Add this</a> , dari layanan button di media milik Add this itu, sayangnya belum bisa di custom secara bebas, fitur yang tersedia terbatas hanya yang mereka sediakan saja.  

tapi sayangnya sibos gout pengen button yang sesuai dengan yang ia inginkan, dari tugas itulah gout terpaksa deh membuat custom button reaction sendiri dengan seadanya, dengan bahasa pemrogramman yang tersedia yaitu ```php7.0``` yah akhirnya ane mencoba untuk berkreasi sendiri, jadilah button reaction ini gout gabungkan dengan platform lainnya yah salah satunya adalah jquery dan ajax dari javasript.  

nah berdasarkan kisah diatas, sekarang gout bermaksud mau berbagi pengalaman dan gout akan share sedikit tips dan trick tersebut. dalam artikel ini masih berkelanjutan dari artikel sebelumnya yang berjudul : <a href="https://codesyariah122.github.io/php/pdo/ajax/jquery/crud-data-dengan-jquery-ajax/">Membuat crud data dengan ajax jquery</a> di artikel yang terupdate kemaren yaitu penambahan fitur : <a href="https://codesyariah122.github.io/php/ajax/jquery/membuat-fitur-pagination-pada-aplikasi-crud-data-ajax-jquery/">Fitur Pagination</a>.  jadi di artikel ini kurang lebih source codenya masih sama, hanya mungkin ada sedikit perombakan dan penambahan file saja.
ok, kita langsung ajah mulai codingnya : 
pertama yang mengalami perubahan adalah table ```product``` di database utama kita yaitu database crudajax : 

sekarang kita akses terminal kemudian masuk ke config database dari terminal dengan command : 
```sql
mysql -u root -p
-- kemudian gunakan databse crudajax
use crudajax;
-- lihat list table
show tables;
-- tambahkan column baru untuk menghubungkan table product dengan table yang nanti akan dibuat untuk menampung nilai reaction
alter table product add column id_react int(11) after product_price;
-- lihat kembali struktur table setelah penambahan column baru
describe product;
-- kemudian buat key untuk field id_react
ALTER TABLE `product` ADD KEY `id_react` (`id_react`);
-- ///////////////////////////////////////////////////////////////
-- sekarang kita buat table baru untuk fitur reaction di artikel kali ini
CREATE TABLE `reaction` (
  `id_react` int(11) NOT NULL,
  `love` int(11) DEFAULT NULL,
  `likes` int(11) DEFAULT NULL,
  `clapping` int(11) DEFAULT NULL,
  `cool` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```  
di command database diatas kita punya satu table baru yang akan terhubung ke field/column ```id_reat``` di table ```product```. kemudian selanjutnya kita langsung buka code editor untuk mengubah beberapa codingan yang antara lain sebagai berikut :  
file pertama yang akan dirubah adalah file ```contents/detail.php``` , sehingga file tersebut gout rubah jadi seperti dibawah ini :   
```php
<style type="text/css">
  .polygon{
    clip-path: polygon(47% 41%, 75% 0%, 94% 49%, 75% 100%, 18% 78%, 0 30%);
  }
</style>
<?php  
require_once '../functions.php';
if(@$_GET['detail']):
  $dataId = @$_GET['detail'];
  $detailData = view("SELECT * FROM `product` WHERE `id` = '$dataId'");
endif;
?>
<?php foreach($detailData as $data): ?>
  <div class="row justify-content-center">
    <div class="card" style="width: 18rem;">
      <img id="setan" src="assets/images/<?=$data['product_image']?>" class="card-img-top polygon" alt="<?=$data['product_name']?>">
      <div class="card-body">
        <h3 class="text-primary"><?=$data['product_name']?></h3>
        <p class="card-text">
          IDR - <?=number_format($data['product_price'], 2)?>
        </p>
        <p class="blockquote-footer">
          <?=$data['product_description']?>
        </p>
        <div id="reaction">
          <input type="hidden" id="id_react" name="id_react" value="<?=$data['id_react']?>">
        </div>
      </div>
    </div>
  </div>
<?php endforeach; ?>


<script type="text/javascript" src="assets/js/getReaction.js"></script>
```  
di file tersebut untuk javascript nya gout pisah ke file tersendiri sehingga file javascriptnya ada di direktori ```assets/js/``` dengan nama file ```getReaction.js``` , berikut code di file ```getReaction.js``` : 

```javascript
// file getReaction.js
$('#reaction').load('contents/reaction.php');
  // $('.polygon').mouseenter(function(){
 //       $(this).removeClass('polygon');
  // });
  // $('.polygon').mouseleave(function(){
  //  $(this).addClass('polygon');
  // })
var image = document.querySelector('.polygon')

image.addEventListener('mouseenter', function(){
  image.classList.remove('polygon');
});
image.addEventListener('mouseleave', function(){
  image.classList.add('polygon');
});


$(document).ready(function(){
  const reactId = $('input[type=hidden][name=id_react]').val();
  $.ajax({
    url: 'contents/reaction.php?react_id='+reactId,
    type: 'post',
    data: 'reactId='+reactId,
    success: function(response){
      if(response){
        $('#reactId').attr("value",reactId);
      }
    }
  })
})
```  
kemudian di file berikutnya adalah file tambahan baru yang gout beri nama ```reaction.php``` di direktori ```contents/reaction.php``` berikut isi codingan file ```reaction.php``` :  

```php
<?php  require_once '../functions.php';?>

<style type="text/css">
  input[type="checkbox"]{
      display: none;
    }

    .emoji-label{
      cursor: pointer;
      font-size: 3rem;
      margin-left:0.3rem;
      margin-top:-1rem;
      animation: shake 0.5s;
        animation-iteration-count: infinite; 
    }
    .emoji-label:hover{
      -webkit-transform: scaleX(-1);
        transform: scaleX(-1);
        animation: shake 0.5s;
        animation-iteration-count: infinite; 
    }
    .display{
      display: none;
    }

</style>
<?php 
if(@$_GET['react_id']):
  $dataId = @$_GET['react_id']; 
endif; 
?>

<button class="btn btn-small btn-primary mb-3" id="react-onclick" onclick="emojiReact(emoji)">Push Reaction</button>
<br/>
<input type="hidden" name="reactId" id="reactId" value="<?=@$_GET['react_id']?>">

<input type="checkbox" id="love" value="love" name="reactemoji" class="reaction">
<label for="love" class="emoji-label display">love</label>

<input type="checkbox" id="likes" value="likes" name="reactemoji" class="reaction">
<label for="likes" class="emoji-label display">like</label>

<input type="checkbox" id="clapping" value="clapping" name="reactemoji" class="reaction">
<label for="clapping" class="emoji-label display">clapping</label>

<input type="checkbox" id="cool" value="cool" name="reactemoji" class="reaction">
<label for="cool" class="emoji-label display">cool</label>

<div id="react-value"></div>

<script type="text/javascript" src="assets/js/reaction.js"></script>

```  
masih menggunakan fungsi yang sama, yang ada di file ```functions.php``` direktori root, aplikasi crud data ajax jquery.  di file ```contents/reaction.php``` tersebut file javascript nya juga gout pisah di direktori lain, sepertinya dalam artikel kali ini semua file javascript gout pisahkan ke direktori ```assets/js``` di file ```reaction.php``` ini file javascriptnya gout kasih nama ```reaction.js``` dan berikut isi codingan file ```reaction.js``` : 

```javascript
// file reaction.js
function emojiReact(emoji){
  document.getElementById('react-onclick').style.display='none';
  for(let i = 0; i<=emoji.length-1; i++){
    $('.emoji-label').eq(i).html(emoji[i]);
    let emojiLabel = document.querySelector('.emoji-label')[i];
    $('.emoji-label').removeClass('display');
  }
}
emoji = ['🥰', '&#128077;', '&#128079;&#127996;', '&#127882;'];

$(document).ready(function(){
  $('#react-value').load('contents/react_data.php');

  $('input[type=checkbox]').click(function(){
    const reactEmoji = $('input[name=reactemoji]:checked').val();
    const reactId = $('input[type=hidden][name=reactId]').val();
    if(reactEmoji){
      switch(reactEmoji){
        case "love":
        emoji = "🥰";
        break;
        case "likes":
        emoji = "&#128077;";
        break;
        case "clapping":
        emoji = "&#128079;&#127996;";
        break;
        case "cool":
        emoji = "&#127882;";
        break;
      }
      $.ajax({
        url: 'contents/react_data.php?reactemoji='+reactEmoji+'&reactid='+reactId,
        type: 'post',
        data: 'reactEmoji='+reactEmoji+'&reactId='+reactId,
        success: function(response){
          if(response){
            //Swal.fire(response);
            Swal.fire("Your reaction : "+emoji);
            $('#react-value').html(response);
            $('input[name=reactemoji]').prop('checked', false);
          }
        }
      });
    }
  });
});
```  
berikutnya adalah file ```functions.php``` di file tersebut perubahan yang gout tambahkan yakni di fungsi ```addAjax(){}``` , dan di fungsi tersebut juga gout bahas di artikel terakhir kemarin mengenai insert data ke 2 table berbeda dalam satu statement yaitu di artikel berikut : 
<a href="https://codesyariah122.github.io/php/ajax/jquery/Menjalankan-dua-query-berbeda-dalam-satu-statement-menggunakan-PDOExtention/">Menjalankan dua query berbeda dalam satu statement</a>.  
berikut fungsi ```addAjax(){}``` yang sudah gout ubah : 

```php
// file functions.php
function addAjax($data, $file, $table1, $table2){
  // var_dump(@$file);
  // var_dump(@$data);

  $dbh = connect();
  $productCode = @$data['productcode'];
  $productImage = upload($file, '../assets/images/');
  $productName = @$data['productname'];
  $productDesc = @$data['productdescription'];
  $productPrice = @$data['productprice'];

  if(!$productImage){
    $productImage = 'no-product-image.png';
  }

  $sql = "INSERT INTO `$table1` (id, product_code, product_image, product_name, product_description, product_price, id_react) VALUES ('', ?, ?, ?, ?, ?, '')";
  $insertProduct = $dbh->prepare($sql);

  $insertProduct->bindParam(1, $productCode);
  $insertProduct->bindParam(2, $productImage);
  $insertProduct->bindParam(3, $productName);
  $insertProduct->bindParam(4, $productDesc);
  $insertProduct->bindParam(5, $productPrice);

  $insertProduct->execute();
  
    // update id_react table product
  $lastId = $dbh->lastInsertId();
  $sql = "
    UPDATE `$table1` SET id_react = $lastId WHERE `id` = $lastId;
    INSERT INTO `$table2` (id_react, love, likes, clapping, cool) VALUES($lastId, '', '', '', '');
  ";
  $stmt = $dbh->prepare($sql);
  return $stmt->execute();

}
```  
berikut ini fungsi lain yaitu fungsi untuk insert reaction dari buttonnya : gout beri nama fungsi ```reactEmoji(){}``` 
```php
// file functions.php
function reactEmoji($data, $table){
  $reactEmoji = @$data['reactemoji'];
  $reactId = @$data['reactid'];

  $dbh = connect();

  switch($reactEmoji){
    case "love":
      $sql = "UPDATE `$table` SET love=love+1 WHERE `id_react` = '$reactId'";
      $reaction = $dbh->prepare($sql);
      $reaction->execute();
      return $reaction->rowCount();
    break;

    case "likes":
      $sql = "UPDATE `$table` SET likes=likes+1 WHERE `id_react` = '$reactId'";
      $reaction = $dbh->prepare($sql);
      $reaction->execute();
      return $reaction->rowCount();
    break;

    case "clapping":
      $sql = "UPDATE `$table` SET clapping=clapping+1 WHERE `id_react` = '$reactId'";
      $reaction = $dbh->prepare($sql);
      $reaction->execute();
      return $reaction->rowCount();
    break;

    case "cool":
      $sql = "UPDATE `$table` SET cool=cool+1 WHERE `id_react` = '$reactId'";
      $reaction = $dbh->prepare($sql);
      $reaction->execute();
      return $reaction->rowCount();
    break;
  }
  
}
```  
berikutnya adalah file yang gout beri nama ```react_data.php``` file tersebut berfungsi untuk menampung nilai value yang terlah mengalami update dari reaction yang telah di input di file ```reaction.php``` berikut ini isi codingan di file ```react_data.php``` : 

```php
// file contents/react_data.php
<style type="text/css">
  .react-ul{
      display: flex;
      padding:2px;
      margin-top:-2rem;
    }
  .react-list{
      list-style: none;
      padding: 10px;
      font-size: 1.5rem;
    }
</style>
<?php
require_once '../functions.php';

if(@$_GET['reactemoji'] && @$_GET['reactid']):
  reactEmoji(@$_GET, 'reaction');
$emoji = @$_GET['reactemoji'];
$idEmoji = @$_GET['reactid'];
$emojiValue = view("SELECT * FROM `reaction` WHERE `id_react` = $idEmoji")[0];
?>
<ul class="react-ul" class="ml-4">
  <li class="react-list <?=($emojiValue['love'] > 1) ? 'text-primary' : 'text-danger';?>"><?=$emojiValue['love']?></li>
  <li class="react-list <?=($emojiValue['likes'] > 1) ? 'text-primary' : 'text-danger';?>" style="margin-left:2rem;"><?=$emojiValue['likes']?></li>
  <li class="react-list <?=($emojiValue['clapping'] > 1) ? 'text-primary' : 'text-danger';?>" style="margin-left:2rem;"><?=$emojiValue['clapping']?></li>
  <li class="react-list <?=($emojiValue['cool'] > 1) ? 'text-primary' : 'text-danger';?>" style="margin-left:1.7rem;"><?=$emojiValue['cool']?></li>
</ul>

<?php endif; ?>
```  
file ```react_data.php``` tersebut akan diload hanya ketika saat button telah di click atau dengan kata lain ada event yang di minta lalu script akan mengirim query ke database dan kemudian nilai atau value di database di update dengan fungsi ```reactEmoji(){}``` di file ```functions.php```. jadi file ```react_data.php``` ini menyajikan data dari value yang telah terupdate di database.

ok codingan yang mengalami perubahan hanya itu saja, untuk source code lengkap dapat kalian simak di link dibawah ini :  
<a href="https://github.com/codesyariah122/crud-data-with-php-PDO-Jquery-ajax/tree/with_react_button">crud ajax jquery dengan branch with_react_button</a>. akhir kata gout mengucapkan terima kasih kepada para pembaca, mudah2an bisa jadi manfaat dari artikel gout ini. akhir kata gout ucapkan.  

waasalamm....

***puji ermanto***  

