---
layout: post
title:  "Membuat fitur upload pada aplikasi crud data ajax jquery"
author: puji
categories: [ php, ajax, jquery ]
image: assets/images/post/upload.png
tags: [webdeveloper]
opening: بسم الله الرحمن الرحيم
---  


### Fitur upload gambar dengan metode PDO dan jquery-ajax  
![upload_ajax]({{site.url}}/assets/images/post/crud_ajax_with_upload.gif)  

halo coders semuanya ....  
ini masih melanjutkan edisi crud data dengan ajax jquery dengan menggunakan metode php pdo ekstension sebagai sql universal interfacenya.  dalam artikel kali ini gout mau menambahkan fitur upload gambar kedalam aplikasi crud data sederhana menggunakan metode pdo dan ajax-jquery :  

***menyambung dari artikel crud data ajax jquery, di artikel sebelumnya***  

[Crud data ajax jquery](https://github.com/codesyariah122/crud-data-with-php-PDO-Jquery-ajax/tree/master/assets "Crud data sederhana dengan ajax jquery")  

dari code-code sebelumnya ana hanya menambahkan satu fungsi baru sebagai sebuah metode untuk menjalankan program live search.  
dalam artikel kali ini gout mau menambahkan fitur untuk upload image atau foto, dimana dalam fitur upload itu kita membutuhkan sebuah element html yaitu ```<form>``` yang berisi attribut ```enctype```, dan enctype ini berisi nilai =```"multipart/form-data"``` nilai ini merupakan keharusan jika kita ingin melakukan pengolahan file dengan serverside php di beckendnya.  
maka untuk itu gout akan merubah struktur source code di bagian file ```contents/add.php``` dan file ```contents/edit.php``` dimana kedua file tersebut kan berisi form input data dari frontend nya.  

oh iya ... dibagian database juga gout harus menambahkan 2 item baru, salah satunya untuk menampung nilai dari input file yang dipilih ketika melakukan process input data, sehingga didapatkan struktur table baru di database crudajax menjadi seperti ini :  

![upload_ajax2]({{site.url}}/assets/images/post/database_upload_crud_ajax.png)  

terlihat ada 2 item baru yaitu column dengan nama  
* ```product_image```  
* ```product_description```  
kedua item baru ini akan ditambahkan juga di file ```add.php``` dan file ```edit.php``` , untuk item ```product_image``` akan kita gunakan ```<input type="file">``` sedangkan untuk item ```product_description``` akan kita gunakan element input ```<textarea></textarea>```. sehingga keseluruhan codenya gout rubah menjadi seperti berikut : 
***file ```contents/add.php```***  
```php
<?php 
require_once '../functions.php';
if(@$_GET['page'] == 'add'):

  //addAjax($_POST, $_FILES, 'product');
  if(addAjax($_POST, $_FILES, 'product') > 0):
    //usleep(700000);
    echo "success";
  endif;

else:



?>

<style type="text/css">
  li{
    list-style: none;
  }
  #close{
    margin-top: -0.7rem;
  }
</style>

<fieldset class="card mt-5 mb-5">

  <div class="row justify-content-end">
    <button id="close" class="btn btn-lg"><i class="far fa-fw fa-lg fa-window-close"></i></button>  
  </div>

  <h4 class="text-primary text-center mt-2">Add New Product</h4>

<div class="col mx-auto">
  <ul>
    <form method="post" enctype="multipart/form-data">
      <li>
        <label for="productcode">Product Code</label>
        <input type="text" id="productcode" class="form-control">
      </li>
      <li>
        <div class="form-group">
           <label for="productimage">Choose file</label>
           <input type="file" class="form-control-file" id="productimage">
         </div>
      </li>
      <li>
        <label for="productname">Product Name</label>
        <input type="text" id="productname" class="form-control">
      </li>
      <li>
        <label for="productdescription">Product Description</label>
          <textarea class="form-control" id="productdescription" cols="5" rows="3"></textarea>
      </li>
      <li>
        <label for="productprice">Product Price</label>
        <input type="number" id="productprice" class="form-control">
      </li>
    </form>   
    <li>
      <button id="add" class="mt-5 btn btn-primary btn-lg">Add Product</button>
    </li>
  </ul>
</div>


</fieldset>

<?php endif; ?>
```  

untuk fungsi insert data nya masih menggunakan fungsi ```addAjax()``` dari file ```functions.php``` namun gout menambahkan  satu parameter baru yaitu super global variable ```$_FILES``` untuk menampung nilai input dari file input di element form html. terdapat 2 item baru ditambahkan di element form add ini yaitu ```<input type="file">``` dan ```<textarea></textarea>``` . sedangkan untuk file ```edit.php``` tidak jauh berbeda isinya gout menambahkan 2 item baru tersebut di element form edit, sehingga menjadi seperti dibawah ini : 

***file ```contents/edit.php```***  
```php
<?php  
require_once '../functions.php';

$id = @$_POST['id'];

$viewById = view("SELECT * FROM `product` WHERE `id` = '$id'");

//var_dump($viewById);

if(@$_GET['page'] == 'edit'):

  if(editAjax($_POST, $_FILES, 'product') > 0):
    echo "success"; 
  endif;

else:
?>
<style type="text/css">
  li{
    list-style: none;
  }
  #close{
    margin-top:-0.7rem;
  }
</style>

<fieldset class="card mt-5 mb-5">

  <div class="row justify-content-end">
    <button id="close" class="btn btn-lg"><i class="far fa-fw fa-lg fa-window-close"></i></button>
  </div>

  <h4 class="text-info text-center mt-2"><b>Edit Product Data</b></h4>

<div class="col mx-auto">
  <ul>
    <form method="post" enctype="multipart/form-data">
      <input type="hidden" id="productid" value="<?=$viewById[0]['id']?>">
      <li>        
        <label for="productcode">Product Code</label>
        <input type="text" id="productcode" class="form-control" value="<?=$viewById[0]['product_code']?>">
      </li>
      <li>
        <img src="assets/images/<?=$viewById[0]['product_image']?>" width="200" height="200" class="img-responsive mt-2">
        <div class="form-group">
           <label for="productimage">Choose file for upload</label>
           <input type="file" class="form-control-file" id="productimage" value="<?=$viewById[0]['product_image']?>">
         </div>
      </li>
      <li>
        <label for="productname">Product Name</label>
        <input type="text" id="productname" class="form-control" value="<?=$viewById[0]['product_name']?>">
      </li>
      <li>
        <label for="productdescription">Product Description</label>
          <textarea class="form-control" id="productdescription" cols="5" rows="3">
            <?=$viewById[0]['product_description']?>
          </textarea>
      </li>
      <li>
        <label for="productprice">Product Price</label>
        <input type="number" id="productprice" class="form-control" value="<?=$viewById[0]['product_price']?>">
      </li>
    </form>
    <li>
      <button id="edit" class="mt-5 btn btn-primary btn-lg">Edit Product</button>
    </li>
  </ul>
</div>


</fieldset>

<?php endif; ?>
```  
hampir sama dengan file ```add.php``` hanya saja untuk edit ini seperti biasa nilai nya sudah di definisikan dari data yang ada di database. sehingga di tiap bagian input ditambahkan attribute ```value="<?=$viewById[0]['field_database']?>"```, sedangkan untuk penggunaan fungsi update masih sama dari sebelumnya yakni masih menggunakaan fungsi ```editAjax()``` dan gout menambahkan satu parameter baru sama seperti file ```add.php``` yang tidak lain adalah parameter ```$_FILES``` sebagai super global yang menangani inputan data berupa file browser.  

# lanjut ke bagian utama di aplikasi crudajax ini 
### file ```functions.php``` 
didalam file functions.php gout merubah algorithma data pada bagian fungsi ```function addAjax(){}``` dan fungsi ```function editAjax(){}``` kemudian menambah satu fungsi tambahan sebagai fungsi yang bertanggung jawab dalam menjalankan fitur upload file atau dalam hal ini file yang ditangani adalah file yang berekstensi image(gambar/foto). sehingga secara keseluruhan file ```functions.php``` setelah gout lakukan perombakan dan penambahan satu fungsi ajah sih sebenernya cuma biar sedikit dramatis gitu artikelnya, hehehe. menjadi seperti ini : 

***file ```functions.php```***  

```php
<?php
require_once 'config.php';

function layout($dir, $file, $ext){
  //global $dir;
  if(file_exists($dir.'/'.$file.$ext)){
    require_once $dir.'/'.$file.$ext;
  }else{
    echo "<h1 class='text-danger text-center'>Layout Not Found</h1>";
  }
}

function connect(){
  $dbhost = DB_HOST;
  $dbname = DB_NAME;
  $dbuser = DB_USER;
  $dbpass = DB_PASS;

  try{
    $conn = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    //echo "Connection succesfully added";
    return $conn;
  }catch(PDOException $e){
    echo "Connection failed ".$e->getMessage();
  }
}


function view($query){
  $dbh = connect();
  try{
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sql = $dbh->query($query);
    $rows=[];

    while($row = $sql->fetch(PDO::FETCH_ASSOC)):
      $rows[] = $row;
    endwhile;

    return $rows;
  }catch(PDOException $e){
    echo $e->getMessage();
  }
}


function addAjax($data, $file, $table){
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

  $insertProduct = $dbh->prepare("INSERT INTO `$table` (id, product_code, product_image, product_name, product_description, product_price) VALUES ('', ?, ?, ?, ?, ?)");
  $insertProduct->bindParam(1, $productCode);
  $insertProduct->bindParam(2, $productImage);
  $insertProduct->bindParam(3, $productName);
  $insertProduct->bindParam(4, $productDesc);
  $insertProduct->bindParam(5, $productPrice);

  $insertProduct->execute();

  return $insertProduct->rowCount();
}

function editAjax($data, $file, $table){
  $productCode = @$data['productcode'];
  $productImage = @$data['productimage'];
  $productName = @$data['productname'];
  $productDesc = @$data['productdescription'];
  $productPrice = @$data['productprice'];
  $productId = @$data['productid'];

  if(!$productImage){
    $productImage = upload($file, '../assets/images/');
  }elseif(empty($productImage)){
    $productImage = 'no-product-image.png';
  }


  $dbh = connect();

  $edit = $dbh->prepare("UPDATE `$table` SET product_code = ?, product_image = ?, product_name = ?, product_description = ?, product_price = ? WHERE `id` = ?");
  $edit->execute([$productCode, $productImage, $productName, $productDesc, $productPrice, $productId]);

  return $edit->rowCount();
}

function deleteAjax($data, $table){
  $dbh = connect();
  $id = @$data['id'];
  $delete = $dbh->prepare("DELETE FROM `$table` WHERE `id` = :id");
  $delete->bindParam(":id", $id);

  $delete->execute();

  return $delete->rowCount();
}

function searchData($keyword){
  $query = "SELECT * FROM `product` WHERE 
        `product_code` LIKE '%$keyword' OR
        `product_name` LIKE '%$keyword%' OR 
        `product_price` LIKE '%$keyword%'
        ORDER BY `id` DESC
  ";

  return view($query);
}

function upload($file, $dir){
  $namaFile = @$file['productimage']['name'];
  $ukuranFile = @$file['productimage']['size'];
  $error = @$file['productimage']['error'];
  $tmpName = @$file['productimage']['tmp_name'];

  // validasi error
  if($error === 4){
    $empty = true;
    if(isset($empty)){
      echo "Image not upload";
    }
    return false;
  }

  // validasi ekstensi gambar
  $ekstensiValid = ['jpg', 'jpeg', 'png', 'gif'];
  $ekstensiGambar = explode('.', $namaFile);
  $ekstensiGambar = strtolower(end($ekstensiGambar));
  echo $ekstensiGambar;

    if(!in_array($ekstensiGambar, $ekstensiValid)){
      $noEkstensi = true;
      if(isset($noEkstensi)){
        echo "File no image";
      }
    return false;
    }
  // cek ukuran gambar
    if($ukuranFile > 700000){
      $sizeError = true;
      if(isset($sizeError)){
        echo "File image is too big";
      }
      return false;
    }

  // lolos pengecekan

  $namaFileBaru = uniqid();
  $namaFileBaru .= '.';
  $namaFileBaru .= $ekstensiGambar;

  // lakukan process upload
  move_uploaded_file($tmpName, $dir.$namaFileBaru);

  return $namaFileBaru;

}
```  
nah terlihat bukan perbedaannya dari file ```functions.php``` dari artikel sebelumnya, struktur alur data pada fungsi ```addAjax(){}``` dan ```editAjax(){}``` ada sedikit penambahan. dan pada baris paling bawah ditambahkan juga fungsi yang paling krusialnya yaitu fungsi ```upload(){}``` yang bertindak sebagai root program di artikel gout kali ini.  

*untuk keseluruhan* source code dan kelengkapan data yang lebih detail agan-agan dan coders semua bisa meluncur ke repositori crudajax di link dibawah ini : 
[Repo Crud data ajax jquery](https://github.com/codesyariah122/crud-data-with-php-PDO-Jquery-ajax/tree/with_upload "Crud data sederhana dengan ajax jquery")  
dari link tersebut agan-agan dan coders! semua bisa melanjutkan algoritma lainnya mungkin, karena di repository tersebut juga gout menambahkan beberapa tambahan dari sisi frontend nya, diantaranya:  gout menambahkan popup modal dari bootstrap untuk menampilkan detail data product di table product kemudian gout mengubah struktur html dari file-file yang di load oleh jquery, bisa aga-agan telisik dari link repository tersebut. 

***akhir kata*** gout ucapkan terima kasih  

dan semangat dalam belajar dan bekerja 

wassalam .


gout : puji ermanto - seorang kaki tangan kapitalis metropolitan