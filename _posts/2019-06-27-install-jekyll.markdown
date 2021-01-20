---
layout: post
title:  "Create pagination on jekyll posts list and post single page"
author: puji
categories: [ Jekyll, ruby ]
image: assets/images/post/jekyll.png
tags: [jekyll]
opening: بسم الله الرحمن الرحيم
---  

{{page.opening}}  

![jekyll]({{site.url}}/assets/images/post/chartjs/jekyll-og.png)  

Halo gaess ! apa kabarnya, semoga selalu dalam keadaan baik dan sehat yah gaes, kali ini di artikel ini saya akan memberikan tips seputar instalasi jekyll untuk static site generator.  
yah dalam beberapa dekade ini static site menjadi alternatif yang memeriahkan perkembangan dalam dunia blogging, ada keasikan tersendiri ketika blogging di static site, semua content kita siapkan sendiri secara mandiri, tanpa adanya peran backend yang selalu menjadi inti sebuah alur program modern.  

Static site menjadikan aktifitas blogging para blogger menjadi lebih berwarna, variatif dan lebih seru.  

### Jekyll Static site  
Static site yang akan gout bahas kali ini adalah sebuah static site yang di develop menggunakan bahasa pemrogamman ruby, yaaa ! ruby menjadi bahasa pemrogramman yang juga mengalami kemajuan pesat dalam mewarnai perkembangan dunia developer.  
Jekyll dirilis pertama kali oleh Tom Preston-Werner pada tahun 2008.[1] Dengan pengunduran Preston-Werner dari GitHub pada bulan April 2014, proyek ini kehilangan pimpinan pengembang.  
Begitulah sedikit info mengenai history dari jekyll.  

#### Install Jekyll  

Sebelumnya kalian harus menginstall ```ruby terlebih dahulu``` di blog ini ada artikel mengenai installasi ruby bisa kunjungi link berikut : <a href="https://codesyariah122.github.io/ruby/installing-ruby/" target="_blank">Install ruby</a>.  

Setelah ruby terinstall kita bisa langsung menginstall jekyll, buka terminal kalian :  
```bash
$ gem install jekyll bundler
```  
Lakukan cek version jekyll :  

```bash
$ jekyll --version
# or
$ jekyll -v
```  

output :  

```bash
$ jekyll 3.2.0
```  

kemudian buat aplikasi jekyll pertama kita :  

```bash
$ jekyll new namablogkamu
$ chmod -R 777 namablogkamu/
```  

Kemudian kita jalankan server jekyll di terminal :  

```bash
$ jekyll serve
```  

atau menggunakan fitur ```bundle``` :  

```bash
$ gem install bundle
$ bundle update
$ bundle exec jekyll serve
```  
kemudian buka di browser : http://localhost:4000, untuk melakukan kostumisasi silahkan Buka direktori jekyll kita di code editor kita, pertama kita bedah file di root direktori ```namablogkamu/``` yaitu file ```_config.yml``` file ini adalah file konfigurasi untuk static site generator jekyll kita, semua konfigurasi mengenai static site di lakukan di file ini, file ini berekstensi ```.yml``` .  

#### Sedikit tentang YAML(yml) format  
YAML adalah format serialisasi data terbaca-manusia yang mengambil konsep dari bahasa-bahasa seperti XML, C, Python, Perl, serta format surat elektronik seperti yang tercantum dalam RFC 2822. YAML pertama kali diusulkan oleh Clark Evans pada tahun 2001 [1] yang merancang format ini bersama dengan Ingy döt Net dan Oren Ben-Kiki. YAML tersedia bagi beberapa bahasa dan skrip pemrograman.

Pada awal pengembangannya, YAML dimaksudkan sebagai singkatan dari "Yet Another Markup Language" [2]. Dalam perkembangannya, untuk menegaskan tujuannya yang terfokus pada data dan bukan markah dokumen, YAML diubah menjadi singkatan rekursif dari "YAML Ain't a Markup Language."  

itulah sekilas tentang ***yml*** lanjut seperti ini file ```_config.yml``` milik saya :  

```yml
title: CodeSyariah
list_title: List Posts
email: codesyariah122@hotmail.com
author: Puji Ermanto
phone: +6288222668778
description: CodeSyariah
baseurl: ""
url: "https://codesyariah122.github.io"

# social setup ke founder dulu
social_links:
twitter_username: pujiermanto
github_myrepo: codesyariah122/codesyariah122.github.io
facebook_account: strawberrywine
stackoverflow_account: puji-ermanto
instagram_account: pujiermanto

# Build settings
markdown: kramdown
permalink: /blog/:categories/:title/
# permalink: pretty
highlighter: rouge

theme: minima
minima:
  date_format: "%d %B %Y"

plugins:
  - jekyll-paginate
  - jekyll-feed
  - jekyll-seo-tag

# Disqus Comments
disqus:
    comments: true
    shortname: codesyariah122-github-io

collections:
  - projects
```  

Kemudian buat sebuah file layout pertama kita sebetulnya jekyll sendiri sudah menyediakan fitur default layouting. Tapi disini saya akan memberi sedikit contoh basic dalam pembuatan layout page yang akan kita gunakan di page lainnya jika di perlukan :  

buat file dengan nama ```index.md``` atau ```index.html``` dalam contoh di artikel ini saya buat sebuah file dengan nama ```index.md```, seperti ini isi file nya :  

```markdown
---
layout: home
basepage: Home
developer: puji
quote: home
show_header: true
show_header_image: /assets/images/artwork.jpeg
text_header: Coffee again Script again
---  

```  
File tersebut hanya berisi ```front matter``` , untuk mengassignment beberapa deskripsi data yang diantaranya adalah ```layout``` untuk menentukan layout yang akan di pakai, yang nanti kita akan siapkan sendiri file layout tersebut.  

Sekarang kita buat file untuk layout tersebut, dimana di file tersebut layout yang akan digunakan adalah ```layout: home```, buat file baru di direktori ```_layouts/``` buat file dengan nama ```home.html```.  
Dalam file html tersebut kalian bisa mengisi nya langsung dengan script html atau kalian bisa membuat modularisasi layout lagi, dalam contoh ini saya menggunakan metode modularisasi layout agar aplikasi kita terlihat lebih flexible dan lebih mudah di maintain, berikut isi dari file ```layout/home.html``` :  

```html
---
layout: index
---
{% include home.html %}
```  
di file tersebut saya menjalankan metode modularisasi layout dengan format template liquid menggunakan salah satu library nya yaiut ```{% include %}``` library ini di gunakan ketika kita akan mengambil file lainnya untuk di compile di template tersebut, dan kita akan membuat file baru lagi di direktori ```_includes/home.html``` :  

```html
<form action="{{ site.url }}" method="get">
  <label for="search-box">Search</label>
  <input type="text" id="search-box" name="query"><br/>
  <button type="submit">Search</button>&nbsp;&nbsp;<button type="reset">Reset</button>
</form><br/>
<ul id="search-results"></ul>
<hr><br/>

     {% assign quote = site.data.quotes[page.quote] %}
             <blockquote class="header-quote">
               {{quote.quotes1}} 
          </blockquote>

        <blockquote class="header-quote"> 
            {{quote.quotes2}} 
      </blockquote>

   <br/>

      <ul class="post-list">
      {% for blogku in site.posts %}
      <li>
        {% assign date_format = site.minima.date_format | default: "%d %B %Y" %}
        <h3 style='margin-bottom:-7px;'>
          <a class="post-link" href="{{ blogku.url | relative_url }}">
            {{ blogku.title | markdownify }}
          </a>
        </h3>
        <span class="post-meta">{{ blogku.date | date: date_format }} </span> 
       
        <br/>
        
          {% if site.show_excerpts %}
             {{ blogku.excerpt | strip_html | truncatewords:15 | markdownify }}
          <a href="{{blogku.url}}" class="meta-post"><b style='color:coral;'>Read More</b></a><br/>
 
          {% else %}
        
        <a href="{{site.url}}" class="meta-post"><b style='color:coral;'>No More</b></a><br/>
          {% endif %}
         
      </li>

      {% endfor %}

    </ul>

<div class="pagination">
  {% if paginator.previous_page %}
    <a class="pagination-item newer"
       href="{{ site.url }}/{% if paginator.page > 2 %}page{{paginator.previous_page}}{% endif %}">
       <i class="fa fa-arrow-left"></i> Newer
   </a>
  {% endif %}

  {% if paginator.next_page %}
    <a class="pagination-item older" href="{{ site.url }}/page{{paginator.next_page}}">
        Older <i class="fa fa-arrow-right"></i>
    </a>
  {% endif %}
</div>
<br/>
<hr>

```  
Di file tersebut terdapat beberapa tag dari liquid templating jekyll sebagai sarana yang memudahkan kita melakukan fetching data di static site jekyll, dalam artikel selanjutnya mungkin kita akan membahas mengenai ```liquid templating```. Sebagai bahan belajar, saya sertakan link repository dari contoh static site jekyll yang saya buat :  

<a href="https://github.com/codesyariah122/codesyariah122-github-io-repo" target="_blank"> Link Repo Jekyll saya</a>  


Ada beberapa konfigurasi untuk menangani static site jekyll ini dari mulai yang minimal config sampai yang complex config, tergantung kalian mau mengembangkannya sampai mana, eksplorasikan ide kalian. yang terpenting buat saya adalah konfigurasi di bagian ```baseurl``` atau ```url``` yang akan sering di gunakan di tiap page yang akan kita buat di static site jekyll ini. Berikut documentasi jekyll untuk mengatur bagian ```_config.yml``` : <a href="https://jekyllrb.com/docs/configuration/" target="_blank"> Config Jekyll Docs</a>  

selanjutnya buat post baru di direktori ```_posts```, buat post dengan format ```markdown(md)``` sebagai contoh seperti ini :  

file : ```_post/2019-06-28-example-post.markdown```  

kalian bisa meng assignment atau menambahkan dan mendaftarkan beberapa data yang kalian perlukan dalam file blog ini dalam sebuah format front matter, seperti ini :  

```markdown
---
layout: blog
title: My First Post In Jekyll
date: 2019-06-27 06:15:05 +0700
author: puji
developer: puji
categories: [jekyll, ruby, Static Site]
tags: [Developer, webdev]
meta: Example my first post in beautiful jekyll static site ...
header-img: /assets/images/post/jekyll.jpeg
---  

### Example Title  


example paragraph with markdown formating

![example_image_with_markdown]({{site.url}}/assets/images/post/chartjs/example.png)  

**and paragraph again** any text ***any text***

```  

***Front Matter***  

Front Matter adalah data-data yang tersimpan untuk konten kita yang berisi informasi meta dari file tersebut. Isinya bisa apa saja, sebagai contoh untuk memberi judul, tanggal dan apakah postingannya ingin dalam draft atau dipublish langsung. Tapi tidak terbatas di ketiga hal tersebut saja.  
tidak menutup kemungkinan kalian bisa menggunakan front matter ini untuk bagian page di static site jekyll ini, dan kalian bisa mengembangkannya lebih jauh lagi.  

Untuk mempelajari jekyll lebih jauh kalian bisa kunjungi situs remsi jekyll dan ikuti documentasi nya :  

<a href="https://jekyllrb.com/docs/" target="_blank">Jekyll Docs</a>  

Semoga artikel saya kali ini bisa jadi manfaat, atas kekurangannya saya mohon maaf. sampai ketemu di artikel selanjutnya gaess.  

**Wassalaam**  

***Puji Ermanto***









