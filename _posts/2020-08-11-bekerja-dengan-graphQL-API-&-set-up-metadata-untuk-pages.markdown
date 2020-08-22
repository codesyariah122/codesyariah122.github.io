---
layout: post
title:  "Bekerja dengan graphQL API untuk query metadata page"
author: puji
categories: [ GatsbyJS, React, Javascript ]
image: assets/images/post/graphQL-base.png
tags: [fullstack_developer]
opening: بسم الله الرحمن الرحيم
---  


### Apa itu graphQL   
GraphQL adalah sebuah konsep baru dalam  membangun api. GraphQL (Query Language) yang di develop oleh ```facebook```.  
di implementasikan pada sisi server. Meskipun sebuah query language graphQL ini tidak secara langsung berhubungan dengan database server, dengan kata lain GraphQL ini tidak terbatas untuk database tertentu di platform tertentu, baik itu ```SQL``` ataupun ```noSQL```.  
posisi GraphQL ini berada di sisi client dan server yang berhubungan / mengakses suatu API. Salah satu tujuan pengembangan bahasa query ini adalah untuk memudahkan komunikasi data antara beckend dan frontend / mobile aplikasi.  

![graphQL]({{site.url}}/assets/images/post/graphql-post.png)  

GraphQL ini dapat di implementasikan di segala sisi client seperti : 
* react
* vue
* meteor
* dll  

karena graphQL ini hanya penerjemah (query language) dan runtime saja, maka tidak bergantung pada bahasa pemrogramman sisi server dan database apapun, bisa cek link berikut : <a href="https://graphql.org/code/">GraphQL</a>  

### selanjutnya ... 
Dalam artikel kali ini ! gout masih menggunakan framework gatsbyJS dari react, masih meraba-raba di tengah kebutaan.  
mungkin di artikel kali ini gout hanya sedikit merekam dokumentasi dalam pembuatan single page posts di gatsbyJS.  
pertama gout mengelola query di graphql gatsbyJS.  

buka user interface graphql ```localhost:8000/___graphql``` 
sebelum melakukan testing query untuk binding data di gatsby, kita mau ubah view user interface dari graphql nya dulu untuk menambah user experience dalam mengelola gatsby graphql ini dengan tampilan ```playground``` :  

***stop service gatsbyny terlebih dahulu ```ctrl+c```*** kemudian install packagenya :  

```
npm install --save-dev cross-env env-cmd
```  
kemudian tambahkan package yang tadi di install, ke file ```package.json``` di direktori root  

```  
"develop": "gatsby develop"  

```  
tambahkan package instance berikut :  

```
"GATSBY_GRAPHQL_IDE=playground" 
```  

kemudian buat file baru dengan properti hidden di root direktori dengan nama  

```
.env.development 
```

kemudian tambahkan baris script berikut  

```
GATSBY_GRAPHQL_IDE=playground 
```  

jalankan kembali server gatsbyJS nya 
```
npm run develop 
```  

kemudian buka kembali user interface graphql di link : ``` localhost:8000/___graphql ```  
seperti inilah tampilan graphql dengan package user interface playground:  

![graphQL]({{site.url}}/assets/images/post/graphql-ui-gatsby.png)  

lakukan query diataranya untuk binding data dan melakukan slug untuk data di page posts nanti yang akan kita buat di bagian selanjutnya : 
gout melakukan beberapa query sepert dibawah ini, tambahkan query di box sebelah kiti : 

```
// query untuk metadata
query{
  site{
    siteMetadata {
      title
      author
    }
  }
}


//query buat markdown
query{
  allFile{
    edges {
      node {
        name
        extension
        dir
      }
    }
  }
}

// get slug post page 
query{
  allMarkdownRemark {
    edges{
      node {
        fields {
          slug
        }
      }
    }
  }
}

// get single slug posts tamplate

query (
  $slug: String!
){
  markdownRemark (
    fields: {
      slug: {
        eq: $slug
      }
    }
  ){
    frontmatter {
      title
    }
  }
}
```  
kalian bisa telah sendiri hasil dari query graphQL diatas, untuk slug dan binding data. kalian coba telaah secara lebih spesifik. seperti ini contohnya :  

![graphQL]({{site.url}}/assets/images/post/graphql2.png)  
query diatas untuk binding metadata untuk di query di bagian page. kalian bisa coba baris perbaris atau buka perbaris dari script graphql diatas di tab baru di user interfacenya graphql.

#### kemudian selanjutnya lagi !
selanjutnya ..... mulailah untuk membaca dokumentasinya, karena dalam artikel kali ini gout mau binding data di page gatsby untuk menyajikan fitur blog dengan gatsby. 
* binding data untuk posts list di page blog
  ini mengurutkan list post yang kita create di direktori root untuk posts kita. pertama kita buat dulu satu direktori baru di direktori ```src/``` dengan nama ```posts/```, tambahkan beberapa file sebagai example post 
  misalnya gout buat file ```first-post.md``` format penulisan post dengan markdown. setelah itu kita buka lagi direktori ```pages``` masih di direktori view utama gatsbyJS yaitu ```src```.  

    * buka file ```blog.js```
      tambahkan baris code berikut : 
      ```
          import React from 'react'

          import { graphql, useStaticQuery } from 'gatsby'

          import { Link } from 'gatsby'

          import Layout from '../components/layout'



          const BlogPage = () => {

            const data = useStaticQuery(graphql`
              query {
                allMarkdownRemark {
                  edges {
                    node {
                      frontmatter {
                        title
                        date
                      }
                      fields {
                        slug
                      }
                    }
                  }
                }
              }
              `)

            //console.log(data);

            return (
              <Layout>
                <h1>My Blog</h1>
                <ol>
                  {data.allMarkdownRemark.edges.map((edge) => {
                    return (
                      <li>
                        <Link to={`/blog/${edge.node.fields.slug}`}>
                        <h2>{edge.node.frontmatter.title}</h2>
                        <p>{edge.node.frontmatter.date}</p>
                        </Link>
                      </li>
                      )
                    })}
                </ol>
              </Layout>
              )
          }
          export default BlogPage
      ```
      file tersebut akan menampilkan daftar baris post di link ```/blog/``` seperti dibawah ini : 

      ![graphQL]({{site.url}}/assets/images/post/post-list-gatsby.png)  


* binding data untuk single posts page
  selanjutnya, setelah edit page ```blog.js``` kita kembali ke direktori root gatsby kita, kemudian buat satu file baru di root direktori, beri nama ```gatsby-node.js``` .  
  seperti ini : 
  
  ![graphQL]({{site.url}}/assets/images/post/gatsby-direktori-1.png)  

  kemudian buka file ```gatsby-node.js``` copy baris code berikut :  

  ```
      const path = require('path')

      module.exports.onCreateNode = ({ node, actions }) => {
        const { createNodeField } = actions

        if(node.internal.type === 'MarkdownRemark'){
          const slug = path.basename(node.fileAbsolutePath, '.md');

          createNodeField({
            node,
            name: 'slug',
            value: slug
          })
        }

      }

      module.exports.createPages = async ({ graphql, actions }) => {

        const { createPage } = actions
        const blogTemplate = path.resolve('./src/templates/blog.js')
        const res = await graphql(`
            query{
              allMarkdownRemark {
                edges {
                  node {
                    fields {
                      slug
                    }
                  }
                }
              }
            }
          `)

        res.data.allMarkdownRemark.edges.forEach((edge) => {
          createPage({
            component: blogTemplate,
            path: `/blog/${edge.node.fields.slug}`,
            context: {
              slug: edge.node.fields.slug
            }
          })
        })


      }
  ```  
  dibagian file tersebut kita melakukan import module-module dan beberapa dependencies dari nodeJS.  

* selanjutnya create post page  
  untuk menampilkan post kita di gatsby kita buat satu direktori baru di direktori ```src``` beri nama ```templates```, kemudian buat file baru di direktori ```templates``` beri nama ```blog.js```. page ini nanti yang akan menampilkan single page untuk post kita. kemudian buka file ```templates/blog.js``` copy baris code berikut :  

  ```
      import React from 'react'

      import Layout from '../components/layout'

      export const query = graphql`query ($slug: String!){
            markdownRemark (fields: {slug: { eq: $slug } }){
              frontmatter {
                title
                date
              }
              html
          }
        }
      `

      const Blog = (props) => {
        return (

            <Layout>
              <h1>{props.data.markdownRemark.frontmatter.title}</h1>
              <small>{props.data.markdownRemark.frontmatter.date}</small>
              <div dangerouslySetInnerHTML={{__html: props.data.markdownRemark.html}}></div>
            </Layout>

          )
      }

      export default Blog
  ```  
* kemudian setup dibagian ```gatsby-config.js```
  buka kembali file ```gatsby-config.js``` di direktori root applikasi gatsbyJS kita :  
  kemudian ubah baris script nya menjadi sepert dibawah ini :  

  ```
      // module.exports = {
      //   /* Your site config here */
      //   plugins: [],
      // }

      module.exports = {
        siteMetadata: {
          title: 'Full-Stack Developer',
          author: 'Puji Ermanto',
        },
        plugins: [
            'gatsby-plugin-sass',
            'react-router-dom',
            {
              resolve: "gatsby-source-filesystem",
              options: {
                name: 'src',
                path: `${__dirname}/src/`
              }
            },
         
            'gatsby-transformer-remark'
            ]
        }
  ```  
  kita telah menambahkan beberapa configurasi untuk metadata dan path direktori untuk page. dalam artikel ini tujuannya untuk menyajikan post kita dalam sebuah halaman (page). baik itu untuk order list posts dan single page posts nya.  
  agan-agan bisa lihat demo link nya di link berikut : 
  <a href="https://pujermanto.netlify.app/blog/" target="_blank">Blog</a>

***untuk bagian ```gatsby-config.js``` silahkan disesuaikan dengan yang agan-agan buat***. akhir kata gout ucapkan terima kasih telah berkunjung dan membaca artikel ini dan tak lupa gout doakan semoga agan-agan semua selalu diberi nikmat sehat dan nikmat waktu luang. akhir kata ...... 


waasalamm....

***puji ermanto***  

