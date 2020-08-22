---
layout: post
title:  "Membuat pagination di codeigniter dengan tambahan class bootstrap"
author: puji
categories: [ PHP, Date And Time ]
image: assets/images/post/pagination.png
tags: [webdevelopment]
opening: بسم الله الرحمن الرحيم
---  
![pagination2]({{ site.url }}/assets/images/post/pagination2.png)  
![pagination3]({{ site.url }}/assets/images/post/pagination3.png)  
assaalamualaikum ~  
Halo para coders! tercinta mudah-mudahan selalu dalam keadaan baik-baik dan sehat semuanya.  
kali ini coders akan berbagi trick dan tips seputar pagination di framework codeigniter, sederhana saja mungkin trick kali ini, mungkin sudah banyak yang tau tentang pagination yang tidak lain fungsi nya adalah sebagai custom link dalam membagi sebuah tampilan data, supaya tertata lebih rapi dan terorganisir dengan baik, dan client bisa nyaman dalam melihat dan mengambil data dari website kita.  

oke langsung saja....  
dalam trick kali ini saya asumsikan coders sudah mengerti tentang mvc pada codeigniter minimal tentang routing dan controller.  
contoh umum pagination ini sudah banyak di adaptasi oleh website-website besar salah satunya adalah raksasa teknologi google yang membuat system pagination dalam aplikasi mesin pencariannya yang terkenal itu. seperti ini pagination milik pencarian google.  

![pagination3]({{ site.url }}/assets/images/post/pagination_google.jpg)  
Hal ini efektif untuk mempercepat penelusuran dan dapat memberikan pengalaman yang luar biasa bagi user (User Experience).

Jadi, sangatlah penting untuk membuat pagination untuk mempercepat load page dan meningkatkan pengalaman user (User Experience).  
Framework PHP Codeigniter memberikan kemudahan dalam membuat pagination. Hal ini dikarenakan codeigniter telah menyediakan library pagination yang siap digunakan.

Akan tetapi, codeigniter tidak menyediakan style untuk pagination. Hanya berupa link biasa yang berbentuk nomor urut.

Hal ini merupakan hal yang baik, karena codeigniter memberikan kebebasan kepada developer untuk berkreasi atas style dari pagination tersebut.

Itulah kenapa kita membutuhkan BOOTSTRAP untuk mempercantik tampilan dari pagination.  
Bootstrap merupakan framework yang berisi file CSS dan Javascript yang berfungsi untuk mempermudah developer untuk merancang UI (User Interface) suatu halaman website.

Bootstrap sendiri bersifat responsive yang membuat halaman web merender dengan baik pada berbagai perangkat dan ukuran jendela atau layar.

Nah, dengan mengkombinasikan Codeigniter dengan Bootstrap, maka akan didapatkan pagination yang cantik sekaligus responsive.

Mari kita mulai!  

#persiapan  
Apa saja yang perlu Anda persiapkan?

Berikut listnya:

1. Codeiginter, jika anda belum memilikinya silahkan download di situs resminya www.codeigniter.com

2. Bootstrap, bootstrap ini berfungsi untuk mempercantik tampilan. Jika anda belum memilikinya, silahkan download di situs resminya www.getbootstrap.com

Bootstrap yang digunakan adalah Bootstrap v4.0+.  
# step ke 2  
saya asumsikan coders semua sudah menyiapkan database nya, dan sudah menginstall codeigniter dan menggunakannya dalam aplikasi web anda.  
dalam post kali ini saya hanya menjelaskan intinya langsung tentang penggunaan pagination di codeigniter.  

dalam aplikasi saya saya, mempunyai sebuah halaman untuk menampilkan post atau blog di website saya, contoh nya seperti kedua gambar di awal post ini.  

didalam controller kalian, buat sebuah configurasi seperti ini:  
```
<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Post extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model('M_Data', 'post');
    }

    public function index()
    {
        $data['login'] = $this->session->userdata('email');
        $data['index_title'] = "Ourcitrus News";
        $config['base_url'] = base_url('post/index'); //site url
        $config['total_rows'] = $this->M_Data->countAllpost(); //total row
        $config['per_page'] = 3;  //show record per halaman
        $config["uri_segment"] = 3;  // uri parameter
        $choice = $config["total_rows"] / $config["per_page"];
        $config["num_links"] = floor($choice);
   
        // Membuat Style pagination untuk BootStrap v4
        $config['first_link']       = 'First';
        $config['last_link']        = 'Last';
        $config['next_link']        = 'Next';
        $config['prev_link']        = 'Previous';
        $config['full_tag_open']    = '<div class="pagging text-center"><nav><ul class="pagination justify-content-center">';
        $config['full_tag_close']   = '</ul></nav></div>';
        $config['num_tag_open']     = '<li class="page-item"><span class="page-link">';
        $config['num_tag_close']    = '</span></li>';
        $config['cur_tag_open']     = '<li class="page-item active"><span class="page-link">';
        $config['cur_tag_close']    = '<span class="sr-only">(current)</span></span></li>';
        $config['next_tag_open']    = '<li class="page-item"><span class="page-link">';
        $config['next_tagl_close']  = '<span aria-hidden="true">&raquo;</span></span></li>';
        $config['prev_tag_open']    = '<li class="page-item"><span class="page-link">';
        $config['prev_tagl_close']  = '</span>Next</li>';
        $config['first_tag_open']   = '<li class="page-item"><span class="page-link">';
        $config['first_tagl_close'] = '</span></li>';
        $config['last_tag_open']    = '<li class="page-item"><span class="page-link">';
        $config['last_tagl_close']  = '</span></li>';
 
        $this->pagination->initialize($config);
        $data['page'] = ($this->uri->segment(3)) ? $this->uri->segment(3) : 0;
 
        //panggil function dari model untuk query table post. 
        $data['post'] = $this->post->infoterbaru($config["per_page"], $data['page']);           
 
        $data['pagination'] = $this->pagination->create_links();

		//$this->template->myLayout('post/index', $data); ini layout yang saya buat dari tambahan fungsi di libraries codeigniter, jika dalam standar codeigniter maka harusnya seperti ini  
		$this->load->view('post/index', $data)
    }

}
```

selanjutnya kita buat model untuk mengambil data dari table post di database coders, sepert ini config di model saya :  

```
<?php
class M_Data extends CI_Model {

	    public function infoterbaru($limit, $start)
    {
        $this->db->order_by('id', 'DESC');
        return $this->db->get('info_terbaru', $limit, $start)->result();
    }

        public function countAllpost()
    {
        return $this->db->get('info_terbaru')->num_rows();
    }

}
```
  
kemudian kita tinggal pasang pagination yang telah kita initialize di controller Post method infoterbaru di atas.  
jadi di view nya seperti ini :  

```
    <div class="row justify-content-center">
    	<div class="col-lg-6">
            <?= $pagination ?>
         </div>
    </div>

```
  
ok coders silahkan di coba, mudah-mudahan bisa bermanfaat dan dapat berjalan dengan baik. saya cukupkan sampai di sini tips and trick kali ini, mengenai pagination di codeigniter dengan menambahkan class untuk bootstrap. 
sekian coders . 
<h3>Salam !</h3>


