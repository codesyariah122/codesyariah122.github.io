---
layout: post
title:  "Membangun project static site dengan gatsbyJS"
author: puji
categories: [ GatsbyJS, React ]
image: assets/images/post/gatsby.png
tags: [fullstack_developer]
opening: بسم الله الرحمن الرحيم
---  


### Membuat project dengan gatsby  
tidak ada salahnya memang menjadi kekinian... hehe ini hanya sekedar basa basi di awal artikel ini. untuk menyambut para coders.  
apa kabarnya nih para coders ? semoga selalu dalam keadaan sehat. sehat itu mahal, coders!  
diartikel kali ini gout agak sedikit kekinian, yah sembari menyelam mengikuti selera pasar juga, toh gak ada salahnya dalam falsafah tersebut. dimana jaman terus bergerak maju, beriringan dengan budaya yang juga serentak maju membawa nilai-nilai baru dan juga termasuk teknologi yang sudah menjadi budaya di tengah masyarakat yang membudaya, apa sih ... !! haha. 

#### baiklah kita ke pembahasan seriusnya nih !  
Bicara-bicara mengenai ssg (static site generator) para coders sudah tau lah yah ! kalau blog gout yang satu ini di bangun dengan static site generator dari ruby dengan base programming languagenya ruby yaitu static site generator <a href="https://jekyllrb.com/">Jekyllrb</a>. tidak ada yang kurang dari jekyll dan sampai saat ini masih menjadi static site generator terbaik di kalangan developer. dokumentasi nya lengkap, simple, dan mudah dimengerti. jekyll juga sudah cukup stabil dibanding dengan staticgen lainnya. walaupun menjadi staticgen terbaik dan memimpin dalam dekade terakhir ini. tapi terkadang selalu ada saja yang kurang ketika develope sebuah page di jekyll,  
Dari pengalaman saat pertama kali mulai menggunakan jekyll, untuk memulai membuat website/blog cukup menggunakan satu dari ratusan template yang tersedia dan install gem jekyll. Jika ingin menggunakan Github pages cukup fork atau download template dan simpan di repository github maka github akan menyajikannya sebagai website/blog.  

* yang special dari jekyll  
Seperti yang sudah kita ketahui bersama bahwasanya jekyll menggunakan templatng liquid. hampir semua variable dapat diakses dari setiap file yang dibuild dengan berbagai ekstensi sesuai kebutuhan, hanya dengan memanfaatkan file YAMl frontmatter disetiap filenya.  
dengan jekyll walaupun menggunakan minimal plugin kita bisa memanfaatkan liquid untuk simple hack supaya mendapatkan hasil yang maksimal yang kita inginkan.  

* kekurangan jekyll  
Ketika kita akan menyediakan content untuk pengguna mobile (hanphone/tablet), khususnya assets gambar tentunya kita tidak ingin membebani pengguna mobile untuk memuat ukuran gambar yang sama seperti yang digunakan diversi desktop.  
ribet sih kebayangnya harus menyesuaikan ukuran gambar sesuai dengan versi mobile jika kita ingin mengkonvert berbagai macam ukuran secara manual dan mengabaikan format penulisan markdown yang simple dan mudah dibaca. sebenernya bisa menggunakan paket dari npm, termasuk gulp tapi jadi build 2 kali, karena inginnya generator dari github pagesnya juga kepake.  

### Mencoba gatsby  
gout sih sebenernya gak secara keseluruhan migrasi ke gatsby, yah sekedar memperluas wawasan saja, yah mengikuti serangan pasar yang akhir-akhir ini di dominasi oleh javascript. tidak ada salahnya kan sedikit bisa.  

***membuat project pertama gatsby***  

```shell
//install paket npm gatsby nya 
npm install -g gatsby-cli@2.4.17  // ini jika ingin beserta versinya
// kemudian clone repository gatsby untuk staticgen baru kita
gatsby new nama-project https://github.com/gatsbyjs/gatsby-starter-hello-world
// kemudian akses direktori yang tadi telah kita clone
cd nama-project
npm run develop
```  
seperti ini susunan direktori dari project gatsby gout :  

![gatsbyJS]({{site.url}}/assets/images/post/gatsby_direktori.png)  

buka file ```package.json``` difile tersebut semnua dependencies dari applikasi gatsby kita. jika kita ingin menggunakan salah satu dependencies nya tinggal kita import aja ke file ```page``` kita.  contohnya ini, gout mau menggunakan salah satu dependencies yang telah tersedia yaitu ```"gatsby": "^2.24.37",``` . gout mau menggunakan package ```LINK``` untuk templating dan untuk route navigasi di halaman awal. buka file root di direktori ```src/index.js```  kemudian ubah codingan menjadi sepert dibawah ini :  

```javascript
import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'


const IndexPage = () => {
  return (
    <Layout>
      <h1>Welcome in my &#127969;</h1>
      <h2>I'am Puji Ermanto .... Just ! <br/>
      &#127959; a full-stack developer</h2>
      <p>Are you need a developer ? &#128187; <Link to="/contact">Contact Me</Link></p>
    </Layout>
    )
}

export default IndexPage
```  
di file tersebut terdapat tag ```<layout></layout>``` tag tersebut adalah state yang terhubung dari file lain sebagai templating engine di applikasi kita yang sebelumnya sudah kita tentukan alurnya. buat direktori baru di direktori root layout kita yatu ```src``` kemudian create direktori baru berinama ```components``` kemudian buat file baru di direktori components beri nama ```layout.js```, buka file ```components/layout.js``` kemudian copy code berikut :  

```javascript
import React from 'react'

import Header from './header'
import Footer from './footer'
import '../styles/index.scss'
import layoutStyle from './layout.module.scss'

const Layout = (props)=>{
  return (
    <div className={layoutStyle.container}>
      <div className={layoutStyle.content}>
        <Header />
        {props.children}
      </div>
      <Footer />
    </div>
    )
}

export default Layout
```  
file layout.js ini lah sebagai base templating di file tersebut terdapat tag  

```<header/><footer/>``` tag tersebut juga merupakan state yang terhubung di file lainnya. buat file baru lagi di directori ```src/components```  

* components/header.js
buka file header.js, kemudian copy code berikut :  

```javascript
import React from 'react'
import { Link } from 'gatsby'

import headerStyles from './header.module.scss'

const Header = () => {
  return (

      <header className={headerStyles.header}>
        <h1>
          <Link className={headerStyles.title} to="/">
            Puji Ermanto
          </Link>
        </h1>
        <nav>
          <ul className={headerStyles.navList}>
            <li>
              <Link className={headerStyles.navItem} activeClassName={headerStyles.activeNavItem} to="/">Home</Link>
            </li>
            <li>
              <Link className={headerStyles.navItem} activeClassName={headerStyles.activeNavItem} to="/blog">Blog</Link>
            </li>
            <li>
              <Link className={headerStyles.navItem} activeClassName={headerStyles.activeNavItem} to="/about">About</Link>
            </li>
            <li>
              <Link className={headerStyles.navItem} activeClassName={headerStyles.activeNavItem} to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
      </header>
    )
}
export default Header
```  

file header ini adalah sebuah navigasi bar untuk mengubungkan antar halaman di file tersebut juga gout sudah menambah style dan manambah class untuk styling dengan sass (scss), di applikasi ini gout sudah menginstall plugin untuk package sass gatsby :  

```shell
 // install plugin sass
 npm install --save node-sass gatsby-plugin-sass
```  

berikut dokumentasi dari plugin sass gatsby : 
<a href="https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-sass">gatsby-plugin-sass</a>  
kemudian kita bisa buat file untuk styling kita beri nama ```header.module.scss```  

```scss
.header{
  padding: 1rem 0 3rem;
}

.title{
  color: #000000;
  font-size: 3rem;
  text-decoration: none;
}

.nav-list{
  display: flex;
  list-style-type: none;
  margin: 0;
}

.nav-item {
  color: #999999;
  font-size: .9rem;
  margin-right: 1.3rem;
  text-decoration: none;
}

.nav-item:hover{
  color: #666666;
}

.active-nav-item{
  color: #333333;
}
```  
styling diatas masih css standart... kemudian di file header kita tinggal import file css tersebut ```import headerStyles from './header.module.scss'``` untuk menggunakannya kita tinggal menambahkan di setiap tag dengan nama variable yang telah kita definisikan sebelumnya. kita tinggal panggil contohnya di tag ```<header className={headerStyles.header}>``` ```{headerStyle.header}``` ini adalah variable camelcase. yah layaknya react, toh gatsby ini kan dibangun dengan reactJS.  
kemudian buat file baru lagi untuk styling bagian utama container di project page kita, buat file di direktori ```components``` dengan nama ```layout.module.scss```  kemudian copy code berikut :  

```scss
.container{
  margn: 0 auto;
  max-width: 750px;
  padding: 1rem;

  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content{
  flex-grow: 1;
}
```  
file ```layout.module.scss``` diatas sudah kita import di file ```layout.js``` : ```import layoutStyle from './layout.module.scss'``` 
kemudian buat satu file baru lagi di direktori ```components``` dengan nama ```footer.js``` kemudian copy code berikut :  

```javascript
import React from 'react'

const Footer = () => {
  return (
    <footer>
      <p>Created by puji ermanto, &copy; 2020</p>
    </footer>
    )
}

export default Footer
```  
silahkan menambahkan file lainnya sesuai navigasi di file ```header.js``` yang sebelumnya sudah dibuat, buat di direktori ```pages``` sebelumnya file utama kita di direktori ```pages``` adalah file ```index.js``` yang sudah kita buat tadi. silahkan bereksplorasi dengan gatsby. kalau gout sih hanya sekedar mencoba, silahkan para coders untuk mengembangkannya lebih jauh lagi. yah meskipun dokumentasi nya rada ```ngehe``` untuk develop pemula.  

berikut ini repository gatsby gout : 
<a href="https://github.com/codesyariah122/pujiermanto.github.io">pujiermanto.github.io</a> 

akhir kata gout ucapkan terima kasih sudah mampir dan membaca artikel ini, semoga bermanfaat dan menjadi barokah. Aamiin. terima kasih.


waasalamm....

***puji ermanto***  

