---
layout: post
title:  "Kirim Email dengan menggunakan library phpmailer di codeigniter"
author: puji
categories: [ phpmailer, Codeigniter ]
image: assets/images/post/phpmailer.png
tags: [webdevelopment]
opening: بسم الله الرحمن الرحيم
---

Kali ini kita (kita .. lu aja kali) maksudnya saya, kali ini saya akan membuat sebuah layanan email service dengan menggunakan library dari phpmailer dan codeigniter, ok langsung saja kita eksekusi.
buat sebuah controller untuk view nya kita simpan di direktori Conttoller, save dengan nama *EmailService.php*.

```
<?php
class EmailService extends CI_Controller {
	
	public function index()
	{
		
		$service = new stdClass();
		$service->id = null;
		$service->nama = null;
		$service->email = null;
		$service->subject = null;
		$service->pesan = null;
		
		$data = [
					'service' => $service //mengambil dari data $unit diatas
		];
		$data['title'] = "OURCITRUS | Admin";
		
		$data['row'] = $this->admin_m->get();
		
		$data['subject'] = $this->db->get('unit')->result();
		
		if ($this->form_validation->run() == FALSE)
                {
                        $this->view->load('email_service', $data);
                }
                else
                {
                        $this->load->view('formsuccess');
                }
		
	}
	
}
```

kemudian buat lagi file baru untuk templating nya di direktori view, email_service.php  

```

<div class="jumbotron" style="background-color:#000000;">
  <h1 class="display-4 text-center text-white">OURCITRUS <br/> Email Service</h1>
  <p class="lead text-center text-white">Selamat Datang Dihalaman mail service <br/> OURCITRUS | PT. GEMILANG CITRUS BERJAYA</p>
  <div class="container">
	</div>
  <hr class="my-4 text-white" style="color:#ffffff;">
  <p class="lead text-center">
    <a class="btn btn-success btn-md" href="https://ourcitrus.id/product" role="button">ourcitrus website</a>
	<a href="/#ForToday|Future" data-toggle="popover" data-html="true" title="Detail Service" class="btn btn-danger" data-content='Dear Member ourcitrus <br> saat ini anda dapat Menggunakan layanan email service untuk melakukan Request order via email yang bisa anda pilih di kolom input pada bagian list subject <span class="red-pop">Email Order</span> untuk order via email, Komplain/permasalahan login dan service lainnya mengenai kemitraan anda di ourcitrus bisa pilih list subject <span class="red-pop">Customer Service</span>, untuk revisi order bisa pilih <span class="red-pop">Email Revisi</span>. <br/><br/> Salam Gemilang. <br> ourcitrus | For Today And Future'>Read Me Please</a>

  </p>
</div>

<div class="container">
<div class="mx-auto">

<?php $this->view('message.php'); ?>

<?= form_open_multipart('MailSend') ?> <!-- controller MailSend -->

<div class="col-sm-8">
  <div class="form-group">
    <label for="name">Nama Lengkap</label>
    <input type="text" class="demoInputBox form-control" id="name" name="userName" 
	placeholder="Nama Lengkap Anda" required>
  </div>
  </div>
  
<div class="col-sm-8">
  <div class="form-group">
    <label for="email">Alamat Email</label>
    <input type="email"  class="demoInputBox form-control" id="email" name="userEmail" placeholder="email_anda@email.com" required>
  </div>
  </div>
  
  <div class="col-sm-8">
  <div class="form-group">
    <label for="subject">Subject Email</label>
	<select required id="subject" name="subject"  class="demoInputBox form-control">
	<option value="- pilih -">- Pilih -</option>
	<?php foreach($subject as $row):?>
	<option value="<?=$row->name?>"><?=$row->name?></option>
	<?php endforeach;?>
	</select>  
	</div>
  </div>
  
  <div class="col-sm-8">
				<div class="form-group">
                     <label for="image">Attachment </label>
            <input type="file" name="attachment[]" class="demoInputBox form-control" multiple><br/>
                 </div>
  </div>
  
<div class="col-sm-8">
  <div class="form-group">
    <label for="pesan">Isi Pesan</label>
    <textarea name="content" class="demoInputBox ckeditor form-control" id="pesan" rows="3" cols="5" required> </textarea>
  </div>
  </div>
  
<div class="col-sm-8">
  <div class="form-group">
	<button type="submit" name="add" class="btn btn-primary">Send Now</button>
	</div>
	</div>
<?= form_close() ?>

</div>
</div>
<br/><br/>
```

lanjut lagi buat controller baru di direktori controller beri nama MailSend.php
```
<?php
require_once(APPPATH. 'libraries/phpmailer/PHPMailerAutoload.php');
class MailSend extends CI_Controller {
	private $emailSend = "youremail@your.hosting";
	public function index()
	{
		if(isset($_POST['add'])){
		
			$mail = new PHPMailer();
			$post=$this->input->post(null, TRUE);
				$mail->IsSMTP();
				$mail->SMTPDebug = 0;
				$mail->SMTPAuth = TRUE;
				$mail->SMTPSecure = "tls";
				$mail->Port     = 587;  
				$mail->Username = "username@gmail.com";
				$mail->Password = "password_login";
				$mail->Host     = "smtp.googlemail.com";
				$mail->Mailer   = "smtp";
				
				$mail->SetFrom($this->emailSend, htmlspecialchars(strtolower(str_replace(" ","", $_POST["userName"]))));
				$mail->AddAddress($_POST['userEmail']);
				$mail->AddReplyTo($_POST["userEmail"], htmlspecialchars(strtolower(str_replace(" ","", $_POST["userName"]))));
					
				$mail->Subject = htmlspecialchars($post["subject"]);
				$mail->WordWrap   = 80;
				$mail->MsgHTML($post["content"]);
				foreach ($_FILES["attachment"]["name"] as $k => $v) {
					$mail->AddAttachment( $_FILES["attachment"]["tmp_name"][$k], $_FILES["attachment"]["name"][$k] );
				}

				$mail->IsHTML(true);

				if(!$mail->Send()) {
					$this->session->set_flashdata('error', 'Gagal Mengirim Email!');
					redirect('MailSend/err_page?id=err');
				} else {
				$this->session->set_flashdata('success', 'Data Berhasil disimpan ke database ourcitrus');
				echo "<script>
					alert('Hai ".$post['userName']."\\nTerima kasih sudah menghubungi kami \\nEmail Anda : ".$post['userEmail']."\\nkami telah merespon email anda dan akan segera diproses oleh management kami \\nby ourcitrus team.');
					window.location.href='MailSend/success_page?id=success';
					</script>";
					
					
        			}
 				
							 
		}
        
}
	
	public function success_page()
	{
		$data['title'] = "Success Page";
	
		$this->load->view('success_page', $data);
	}
	
	public function err_page()
	{
		$data['title'] = "error Page";
		
		$this->load->view('err_page', $data);

	}
	
}
```

ini untuk halaman tambahan simpan di direktori view dengan success_page.php dan err_page.php

```
<div class="jumbotron">
  <h1 class="display-4 text-center">OURCITRUS <br/> Email Service</h1>
  <p class="lead text-center">Selamat Datang Dihalaman mail service <br/> OURCITRUS | PT. GEMILANG CITRUS BERJAYA</p>
  <div class="container">
	</div>
  <hr class="my-4">
  <p class="lead text-center">
    <a class="btn btn-success btn-md" href="https://ourcitrus.id/product" role="button">ourcitrus website</a>
  </p>
</div>


<b><?php if(isset($filenames)) echo "Successfully uploaded ".count($filenames)." files"; ?></b>
    
<div class="container">
  <div class="row">
  <?php if($_GET['id'] == "success"):?>
    <?php $this->view('message.php'); ?>
  <div class="alert alert-warning alert-dismissible fade show" role="alert">
  <strong>Dear Member</strong> Terima kasih sudah menghubungi kami, selanjutnya pesan anda akan segera di proses oleh team management kami.
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
		</div>
	</div>
	
	<div class="row">
  <div class="col-sm-6">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">OURCITRUS Website</h5>
        <p class="card-text">Anda sudah melakukan proses kirim pesan melalui aplikasi mail service kami, untuk kembali ke halaman utama, silahkan klik tombol dibawah.</p>
        <a href="https://ourcitrus.id/" class="btn btn-primary">Go ourcitrus.id</a>
      </div>
    </div>
  </div>
  
  <?php endif;?>
  
  <div class="col-sm-6">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Kembali Ke Halaman Mail Service</h5>
        <p class="card-text">Untuk kembali ke halaman mail service silahkan klik tombol di bawah.</p>
        <a href="<?=base_url()?>EmailService" class="btn btn-primary">Back To Message</a>
      </div>
    </div>
  </div>
</div>

	
</div>
<br/><br/>
```
kemudian buat file err_page.php

```
<?php if($_GET['id'] == "err"):?>
<?php $this->view('message.php'); ?>
<?php endif;?>
```

masih di direktori view buat file baru dengan nama message.php
```
<?php if($this->session->has_userdata('success')):?>
       <div class="alert alert-success alert-dismissible">
                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                <h4><i class="icon fa fa-check"></i> <?= $this->session->flashdata('success'); ?></h4>
              </div>

 <?php elseif($this->session->has_userdata('del')): ?>
 	       <div class="alert alert-success alert-dismissible">
                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                <h4><i class="icon fa fa-check"></i> <?= $this->session->flashdata('del'); ?></h4>
              </div>
 <?php elseif($this->session->has_userdata('wrong')):?>
 		       <div class="alert alert-danger alert-dismissible">
                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                <h4><i class="icon fa fa-ban"></i>  <?= $this->session->flashdata('wrong'); ?></h4>
              </div>
<?php elseif($this->session->has_userdata('error')):?>
           <div class="alert alert-danger alert-dismissible">
                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                <h4><i class="icon fa fa-ban"></i>  
                  <?= strip_tags(str_replace('</p>', '', $this->session->flashdata('error'))); ?>
                </h4>
              </div>
<?php elseif($this->session->has_userdata('empty-subject')):?>
 		       <div class="alert alert-danger alert-dismissible">
                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                <h4><i class="icon fa fa-ban"></i>  <?= $this->session->flashdata('empty-subject'); ?></h4>
              </div>
<?php elseif($this->session->has_userdata('statusMsg')):?>
 		       <div class="alert alert-danger alert-dismissible">
                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                <h4><i class="icon fa fa-ban"></i>  <?= $this->session->flashdata('empty-subject'); ?></h4>
              </div>
			  
 <?php endif; ?>
 ```
 untuk kekurangannya bisa dilihat di repository di bawah ini 
 <a href='github.com/codesyariah122/phpmailer_ourcitrus/tree/master/admin'>PhpMailer</a>
 
 ok sekian dulu dari saya.

