---
layout: post
title:  "pasang aplikasi chat di website yang menggunakan framework codeigniter"
author: puji
categories: [ live chat, Codeigniter ]
image: assets/images/post/chat/chat.jpg
tags: [webdevelopment]
opening: بسم الله الرحمن الرحيم
---

Akhir-akhir ini perkembangan website sudah sangat berkembang pesat, banyak fitur yang bisa memudahkan kita untuk mendapatkan sebuah informasi digital yang akurat.  
salah satu layanan aplikasi yang ingin saya bahas kali ini adalah live chat, live chat biasa digunakan untuk layanan live support untuk melayani langsung customer atau client  
dari sebuah website. live chat ini sangat bermanfaat untuk digunakan bagi kalian yang mempunyai website eccomerce, marketing digital atau bisnis digital lainnya, untuk melayani  
customer atau calon customer yang mengunjungi website atau toko online kita.  

kali ini saya akan mempraktekan pemasangan aplikasi chat dari tawk.to yang akan saya pasang di website yang menggunakan framework codeigniter, ini saya terapkan di salah satu website client saya,  
yaitu sebuah perusahaan yang bergerak di bidang distribusi kosmetik dan nutrisi, yang cukup terkenal di seputaran jawa timur dan akan merambah dunia bisnis nasional. yaitu <a href="https://ourcitrus.id">OURCITRUS | PT.Gemilang Citrus Berjaya</a>.  

ok cukup sekian pembukaan nya langsung saja kita praktekan sekarang. pertama tama disini saya menggunakan framework codeigniter untuk kerangka kerja website saya,  
pakai framework lain, atau dengan cara native pun bisa, hanya mungkin sedikit berbeda di routing dan layouting nya.  
pertama kita siapkan dulu file baru di direktori controllers, untuk itu pastikan kalian sudah memahami framework codeigniter atau object oriented dari PHP. 
ok langsung saja create new file di direktori controllers save dengan nama ```Chat.php```  

{% highlight php %}
<?php
class EmailService extends CI_Controller {	
	
	  public function index()
	  {
		  $data['title'] = "live chat di codeigniter";
		  $this->load->view('layout_kamu.php', $data);
		  $this->load->view('chat.php');
	  }
  
  }
  ?>
{% endhighlight %}  

kemudian buat lagi sebuah file baru untuk templating nya, atau view nya create new file di direktori views beri nama ```chat.php```  
kali ini saya menggunakan layanan chat aplikasi dari tawkto, pastikan kalian mempunyai akun di tawkto jika belum daftar silahkan lakukan pendaftaran terlebih dahulu di website resminya tawkto di sini:  
<a href="https://dashboard.tawk.to/login">tawk.to</a> jika belum daftar silahkan klik link create free account dibawah tombol login, jika sudah login kalian masuk ke bagian admin  
![untitled8]({{ site.url }}/assets/images/post/chat/ss1.jpg)  
kemudian copy script yang ada di samping layar, silahkan di copy.
![untitled6]({{ site.url }}/assets/images/post/chat/ss2.jpg)  

kemudian kita buka file view yang tadi kita buat di direktori views, yaitu file ```chat.php```, kemudian tempelkan script dari tawkto tadi ke file chat.php  

{%highlight php%}
<!--Start of Tawk.to Script-->
<script type="text/javascript">
var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/5d96b76c6c1dde20ed04eedb/default';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();
</script>
<!--End of Tawk.to Script-->
{%endhighlight%}  

ok selesai sudah, sekarang fitur live chat sudah terpasang di website kalian, silahkan di organisasi untuk service customer anda di live chat.
sekian dan terima kasih.  


