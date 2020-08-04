---
layout: post
title:  "Membuat fitur pagination pada aplikasi crud data ajax jquery"
author: puji
categories: [ php, ajax, jquery ]
image: assets/images/post/paging.png
tags: [webdeveloper]
opening: بسم الله الرحمن الرحيم
---  


### Fitur pagination dalam crud data with ajax jquery  
halo coders semuanya ....  
ini masih melanjutkan edisi crud data dengan ajax jquery dengan menggunakan metode php pdo ekstension sebagai sql universal interfacenya.  dalam artikel kali ini gout mau menambahkan fitur pagination atau pengindeksan sebuah halaman/page, kedalam aplikasi crud data sederhana menggunakan metode pdo dan ajax-jquery yang sempat di bahas diartikel beberapa minggu yang lalu, masih hot-hot pop lah.  

***menyambung dari artikel crud data ajax jquery, di artikel sebelumnya***  

[Crud data ajax jquery](https://codesyariah122.github.io/php/pdo/ajax/jquery/crud-data-dengan-jquery-ajax/ "Crud data sederhana dengan ajax jquery")  

dalam artikel sebelumnya tentang implementasi sebuah metode upload file.  sudah gout bahas beberapa hari yang lalu. dari fitur live search tersebut sudah gout push juga ke repository gout yaitu di link dibawah ini :  
[Crud data ajax jquery master](https://github.com/codesyariah122/crud-data-with-php-PDO-Jquery-ajax/tree/with_upload "Crud data sederhana dengan ajax jquery")  

Dan kali ini dalam artikel terbaru ini gout mau mengimplementasikan fitur pagination atau pengindeksan tampilan atau view dalam penyajian data disuatu halaman.  
pagination ini merupakan fitur yang sangat membantu dalam pengolahan sebuah data yang akan disajikan. sehingga tampilan data tidak berantai sampai ke baris bawah. terutama jika data yang ingin diquery itu berisi ratusan atau ribuan data, kebayang dong harus scroll halaman berapa kali.  

ok tanpa berpanjang-panjang dalam mukodimah di artikel kali ini, kita langsung ajah ke inti permasalahannya. sebelum coding dimulai, kita sedikit flashback ke artikel sebelumnya dimana gout menambahkan fitur untuk upload image.  
diartikel membuat pagination ini struktur file masih sama, hanya struktur coding atau penulisan codenya yang mengalami perombakan , diantaranya beberapa coding yang gout rubah :  
* file ```contents/view.php```  

difile ini gout merubah struktur coding menjadi seperti ini : 

```php
<style type="text/css">
  .loader{
    width: 150px;
    position: absolute;
    top: 4.3rem;
    margin-left: 12rem;
    z-index: -1;
    display: none;
  }
</style>
<h1 class="text-primary text-center mt-4 pt-4">Product Table</h1>

<div class="row mt-3 mb-3 mx-auto">
  <div class="col-xs-12">
      <input type="text" class="form-control" name="keyword" id="keyword" placeholder="Type keyword ... " autocomplete="off">
      <img src="assets/img/animated.gif" class="loader">
  </div>
</div>

<div id="paging"></div>


<div id="modal-detail"></div>  

<table class="table table-hover">
  <thead>
    <tr>
      <th scope="col">Product Code</th>
      <th scope="col">Product Name</th>
      <th scope="col">Operation Table</th>
    </tr>
  </thead>
  <tbody id="product-data">
  </tbody>
</table>


<script type="text/javascript">
  $(document).ready(function(){
      $('#product-data').load('contents/product_data.php').fadeIn(1000);
      $('#modal-detail').load('contents/modal.php');
      $('#paging').load('contents/paging.php');
      $('#keyword').trigger('focus')
  });
</script>

```  

terlihat struktur codingnya berbeda dari artikel sebelumnya, dan tampilan di view ini juga sebagai sumber DOM html datanya. ***selanjutnya ...***  

* file ```assets/MyJs.js```
[Crud data ajax jquery](https://github.com/codesyariah122/crud-data-with-php-PDO-Jquery-ajax/blob/with_upload/assets/MyJs.js "File MyJs.js")  

Di link diatas adalah file ```MyJs.js``` dari artikel sebelumnya. difile tersebut juga mengalami perubahan yakni di bagian untuk searchData dan satu tambahan yaitu untuk dom paginationnya, berikut perubahan dari file ```MyJs.js``` dari link diatas :  

```javascript
$('#viewdata').on('keyup', '#keyword', function(){
  $('.loader').show();
  const keyword = $('#keyword').val();

  $.ajax({
    url: 'contents/product_data.php?page='+keyword,
    type: 'post',
    data: 'keyword='+keyword,
    success: function(response){
      if(response){
        //alert(response);
        $('.loader').hide().slideUp(1000);
        $('#product-data').html(response);
      }else{
        Swal.fire('Product data no found');
      }
    }
  });

});


$('#viewdata').on('click', '.page-link', function(){
  const pageNum = $(this).data('num');

  $.ajax({
    url: 'contents/product_data.php?page='+pageNum,
    type: 'post',
    data: 'pageNum='+pageNum,
    success: function(response){
      if(response){
        //alert(response);
        $('#product-data').html(response);
      }
    }
  });
});

```  
dua bagian itu saja yang mengalami perubahan, selebihnya masih sama dari artikel awal tentang crud ajax jquery.  

selanjutnya di file root kita ```functions.php``` ada sedikit penambahan di fungsi ```searchData(){}``` seperti ini perubahan di bagian fungsi ```searchData(){}``` tersebut :  

```php
function searchData($keyword, $limitStart, $limit){
  $query = "SELECT * FROM `product` WHERE 
        `product_code` LIKE '%$keyword' OR
        `product_name` LIKE '%$keyword%' OR 
        `product_price` LIKE '%$keyword%' 
        ORDER BY `id` DESC
        LIMIT $limitStart, $limit";

  return view($query);
}
```  

dibagian tersebut terlihat berbeda dari code di artikel sebelumnya, kali ini fungsi tersebut ane tambahkan command sql ```sql LIMIT ``` fungsi limit ini lah yang digunakan dalam membuat fitur pagination dengan ```LIMIT``` data yang akan disajikan akan di batasi sesuai dengan option yang disesuaikan. sehingga di file selanjutnya yaitu file utama untuk domHTML data yakni di file ```product_data.php``` , mengalami perubahan menjadi seperti berikut : 

```php
<?php
require_once '../functions.php';
  //echo "?page=".@$_GET['page'];
$limit = 3;
$jmlData = count(view("SELECT * FROM `product`"));
$jmlHalaman = ceil($jmlData / $limit);
$aktifPage = ((int)@$_GET['page']) ? @$_GET['page'] : 1;
$limitStart = ($aktifPage - 1)*$limit;
switch(@$_GET['page']):
  case @$_POST['keyword']:
  $keyword = @$_POST['keyword'];
  $viewData = searchData($keyword, $limitStart, $limit);
  break;
  default:
  $viewData = view("SELECT * FROM `product` ORDER BY `id` DESC LIMIT $limitStart, $limit");
endswitch;
?>


<?php if(empty($viewData)): ?>
  <tr>
    <td colspan="5" style="color:red; font-weight: bold; text-align:center;">No data on this table product</td>
  </tr>
<?php endif; ?>


 <?php foreach($viewData as $view): ?>
    <tr>
      <td><?=$view['product_code']?></td>
      <td><?=$view['product_name']?></td>
      <td>
        <button id="<?=$view['id']?>" class="edit btn btn-danger btn-sm"><i class='fas fa-edit'></i></button>
        <button id="<?=$view['id']?>" class="del btn btn-info btn-sm"><i class='fas fa-eraser'></i></button>
        <button data-id="<?=$view['id']?>" class="detail btn btn-success btn-sm" data-toggle="modal" data-target="#detailData" data-code="<?=$view['product_code']?>"><i class="fas fa-fw fa-binoculars"></i></button>
      </td>
    </tr>
<?php endforeach; ?>

```  

dari file diatas terlihat perubahan struktur coding dari mulai menambahkan untuk parameter ```[LIMITSTART,LIMIT]``` di fungsi ```searchData(){}``` sehingga hasil dari codingan tersebut merubah tampilan view cruddata ajax kita menjadi seperti berikut : 

![pagination_ajax]({{site.url}}/assets/images/post/crud_ajax_pagination.gif)  

untuk tambahan file lainnya yaitu di file ```modal.php``` karena di file ```product_data.php``` sebelumnya tag html untuk modal berada difile ```product_data.php``` tersebut, dan di artikel kali ini dalam membuat fitur pagination gout pindahkan kesatu file baru yang gout beri nama file ```contents/modal.php``` , dan satu lagi satu tambahan file baru yaitu file ```contents/paging.php``` file ini adalah tag html untuk controll paginationnya, menggunakan css bootstrap 4.5. 
untuk 2 file tambahan tersebut dapat dilihat direpo yang sudah gout push ke github, silahkan meluncuk di link di bawah ini : 
[Crud data ajax jquery](https://github.com/codesyariah122/crud-data-with-php-PDO-Jquery-ajax/tree/with_pagination/contents "2 file tambahan : paging.php dan modal.php")  

sekian dulu ane akhiri artikel kali ini ***Membuat fitur pagination di aplikasi crud data ajax jquery***, mudah2an dapat dimengerti jikalau ada pertanyaan silahkan memberikan pertanyaan di kolom komentar dibawah. tapi harus pakai akun disqus, yah bikin dulu akun di disqus lah, gak mahal dan gak susah ko. hehehe
ok sekian dulu 

waasalamm....

***puji ermanto***  

