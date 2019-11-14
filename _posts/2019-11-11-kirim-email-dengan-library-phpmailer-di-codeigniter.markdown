---
layout: post
title:  "Kirim Email dengan menggunakan library phpmailer di codeigniter"
author: puji
categories: [ phpmailer, Codeigniter ]
image: assets/images/post/phpmailer.png
tags: [webdevelopment]
opening: بسم الله الرحمن الرحيم
---

Kali ini kita (kita .. lu aja kal) maksudnya saya, kali ini saya akan membuat sebuah layanan email service dengan menggunakan library dari phpmailer dan codeigniter, ok langsung saja kita eksekusi.
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
                        $this->template->load('template', 'email-service/email_service', $data);
                }
                else
                {
                        $this->load->view('formsuccess');
                }
		
	}
	
}
```
