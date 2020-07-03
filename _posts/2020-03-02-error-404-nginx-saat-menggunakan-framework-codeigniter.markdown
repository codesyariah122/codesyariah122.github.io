---
layout: post
title:  "Error 404 nginx saat menggunakan codeigniter"
author: puji
categories: [ linux, server ]
image: assets/images/post/nginx/nginx_404.png
tags: [sysadmin]
opening: بسم الله الرحمن الرحيم
---  
error 404 ini saya alami ketika saya menggunakan framework codeigniter, permasalahan ini kemungkinan terjadi akibat nginx tidak mengenali  
direktori root dari virtualhot project kita yang menggunakan codeigniter.  
setting config codeigniter saya sengaja di buat untuk clean url, berikut script config dan autoload codeigniter yang saya gunakan,  

![sublime_newourcitrus]({{ site.url }}/assets/images/post/sublime/sublime.png)  
![sublime_newourcitrus]({{ site.url }}/assets/images/post/sublime/sublime_2.png)  

dan ini config default virtual host nginx yang saya gunakan :  

![sublime_newourcitrus]({{ site.url }}/assets/images/post/nginx/nginx_default.png)  

pada config virtual host diatas ada script yang saya highlight, nah di config location root virtualhost itulah permasalahan nya,  

dan akhirnya saya edit bagian location root virtual host nginx saya, menjadi seperti ini :  
![sublime_newourcitrus]({{ site.url }}/assets/images/post/nginx/nginx_2_default.png)  

```sh
        location /new_ourcitrus {
                try_files $uri $uri/ /new_ourcitrus/index.php;
                #autoindex on;
        }
```  
setelah itu restart service nginx 
```sh
root@debian:~#systemctl restart nginx.service
```  

dan akhirnya bisa akses nama controller codeigniter di webserver nginx  
![sublime_newourcitrus]({{ site.url }}/assets/images/post/newourcitrus_2.png)  
![sublime_newourcitrus]({{ site.url }}/assets/images/post/newourcitrus_1.png)  

ok selesai ....
salam ....
puji ermanto







