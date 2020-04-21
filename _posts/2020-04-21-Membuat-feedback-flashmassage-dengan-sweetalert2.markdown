---
layout: post
title:  "Membuat feedback flashmassage dengan sweetalert2"
author: puji
categories: [ nativephp, vanilla javascript ]
image: assets/images/post/alert_1.png
tags: [webdevelopment]
opening: بسم الله الرحمن الرحيم
---  
![sweetalert2]({{ site.url }}/assets/images/post/alert_1.png)  

halo sobat coders semuanya, apa kabarnya di masa lockdown sekarang ini.  
kali ini saya akan berbagi tips, tentang mengganti notification alert bawaan browser kita.  
agak sedikit tricky sih penggunaan sweet alert ini, ok langsung ajah kita praktekan.  

#about sweet alert
Package ini dibuat oleh uxweb, yang dapat anda temukan di packagist.org. Sweet alert sudah di design menarik dan mudah untuk digunakan, jadi anda dapat memberikan flash message pada user ketika tindakannya benar atau salah. secara garis besar fitur sweet alert adalah package dari javascript.  

dalam tips kali ini saya asumsikan kalian sudah download sweetalert2 baik itu menggunakan npm ataupun pasang script cdn nya langsung ataupun download dist nya langsung di github nya sweetalert.  
kalian bisa langsung meluncur ke link di bawah ini, untuk mendownloadnya dan di web ini sangat lengkap documentasi nya.  
<a href="https://sweetalert2.github.io/">sweetalert2 </a>  

jadi di tips kali ini saya punya sebuah data dari database yang saya tampilkan dalam sebuah tabel html  

```
<table width="100%" cellspacing="0">
                                        <thead>
                                            <tr>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr> 
                                              <td>
      <a href="content/hapusSlider.php?id=1" class="tombol-hapus">Hapus</a>
                                             </tr>
                                        </tbody>
                                    </table>
                                
```
table diatas kurang lebih tampilannya seperti ini  
![sweetalert2 js]({{ site.url }}/assets/images/post/test1.jpg)  
dalam contoh ini saya ingin memberi feedback pada user berupa flash massage untuk user yang akan menghapus data  
saya ambil bagian yang akan saya pasang sweetalert nya, yaitu di bagian tombol hapus  
```
<td>
<a href="content/hapusSlider.php?id=1" class="tombol-hapus">Hapus</a>
</td>
```  
di tombol hapus itu saya beri class baru yaitu <b>tombol-hapus</b>...coba perhatikan script href diatas. pada bagian class ada nama class dengan nama tombol-hapus, nah tombol hapus ini lah yang akan saya jadikan selector untuk jquery nya.  
kemudian kita buat script jquery untuk menampung nilai tombol-hapus, dan menyeleksi nya kedalam sweetalert.  

selanjutnya kita siapkan file javascriptnya kebetulan direktori yang saya gunakan seperti ini susunannya :  
![sweetalert2 js]({{ site.url }}/assets/images/post/test2.jpg)  

buat file baru disini saya beri nama file jquernya dengan nama ```myscript.js```  
kurang lebih isi code myscript.js adalah sebagai berikut...  

```
//tombol hapus
$('.tombol-hapus').on('click', function(e) {

	e.preventDefault(); //matikan fungsi href nya terlebih dahulu dengan event

	const href = $(this).attr('href'); //kita ambil attribute dari html yang mau kita jadikan flashmassage disini adalah attribut href(link)

	Swal.fire({
		  title: 'APakah anda yakin?',
		  text: "Data yang dihapus tidak bisa dikembalikan!",
		  icon: 'warning',
		  showCancelButton: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: 'Hapus Data!'
		}).then((result) => {
		  if (result.value) {
		  	document.location.href = href; //kembalikan nilai true dengan redirect document ke halaman yang dituju
  		}
	})

});  

```  


