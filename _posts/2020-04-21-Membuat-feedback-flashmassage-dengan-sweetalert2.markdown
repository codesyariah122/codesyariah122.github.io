---
layout: post
title:  "Membuat feedback flashmassage dengan sweetalert2"
author: puji
categories: [ nativephp, vanilla javascript ]
image: assets/images/post/alert_1.png
tags: [webdevelopment]
opening: بسم الله الرحمن الرحيم
---  
![default order datatables]({{ site.url }}/assets/images/post/alert_1.png)  

halo sobat coders semuanya, apa kabarnya di masa lockdown sekarang ini.  
kali ini saya akan berbagi tips, tentang mengganti notification alert bawaan browser kita.  
agak sedikit tricky sih penggunaan sweet alert ini, ok langsung ajah kita praktekan.  

#about sweet alert
Package ini dibuat oleh uxweb, yang dapat anda temukan di packagist.org. Sweet alert sudah di design menarik dan mudah untuk digunakan, jadi anda dapat memberikan flash message pada user ketika tindakannya benar atau salah. secara garis besar fitur sweet alert adalah package dari javascript.  

dalam tips kali ini saya asumsikan kalian sudah download sweetalert2 baik itu menggunakan npm ataupun pasang script cdn nya langsung ataupun download dist nya langsung di github nya sweetalert.  
kalian bisa langsung meluncur ke link di bawah ini, untuk mendownloadnya dan di web ini sangat lengkap documentasi nya.  
<a href="https://sweetalert2.github.io/">sweetalert2 </a>  

jadi di tips kali ini saya punya sebuah data dari database yang saya tampilkan dalam sebuah tabel html  

{% hightlight PHP %}
                                    <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                        <thead>
                                            <tr>
                                                <th>nama file</th>
                                                <th>Gambar</th>
                                                <th>Action</th>
                                                <th>Last Update</th>
                                            </tr>
                                        </thead>
                                        <tfoot>
                                            <tr>
                                                <th>Nama file</th>
                                                <th>Gambar</th>
                                                <th>Action</th>
                                                <th>Last Update</th>
                                            </tr>
                                        </tfoot>
                                        <tbody>
                                            <?php foreach($tampilSlider as $slider): ?>
                                            <tr> 
                                                <td><?=$slider['nama']?></td>
                                                 <td><img src="../../../img/<?=$slider['gambar']?>" width="250" height="150"/></td>
                                                 <td>
                                                    <a href="content/hapusSlider.php?id=<?=$slider['id']?>" class="btn btn-outline-primary btn-xs tombol-hapus">Hapus</a>&nbsp;&nbsp;
                                                   <a href="content/updateSlider.php?id=<?=$slider['id']?>" class="btn btn-outline-success btn-xs">Ubah</a></td>
                                              <td><?=waktu_lalu($slider['last_update'])?></td>
                                             </tr>
                                            <?php endforeach; ?>
                                        </tbody>
                                    </table>
{% endhighlight %}  

table diatas kurang lebih tampilannya seperti ini  
![default order datatables]({{ site.url }}/assets/images/post/test1.jpg)  
dalam contoh ini saya ingin memberi feedback pada user berupa flash massage untuk user yang akan menghapus data  
saya ambil bagian yang akan saya pasang sweetalert nya, yaitu di bagian tombol hapus  
```
<td>
<a href="content/hapusSlider.php?id=<?=$slider['id']?>" class="btn btn-outline-primary btn-xs tombol-hapus">Hapus</a>
</td>
```  
di tombol hapus itu saya beri class baru yaitu <b>tombol-hapus</b>...coba perhatikan script href diatas. pada bagian class ada nama class dengan nama tombol-hapus, nah tombol hapus ini lah yang akan saya jadikan selector untuk jquery nya.  
kemudian kita buat script jquery untuk menampung nilai tombol-hapus, dan menyeleksi nya kedalam sweetalert.  

selanjutnya kita siapkan file javascriptnya kebetulan 
