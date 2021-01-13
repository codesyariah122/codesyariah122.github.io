---
layout: post
title:  "Fetching data github api with Gatsby Source Graphql"
author: puji
categories: [ GatsbyJS, React, Javascript ]
image: assets/images/post/github-gatsby.png
tags: [fullstack_developer]
opening: بسم الله الرحمن الرحيم
---  


### Gatsby Source Graphql   
Halo sob ... ini post kedua di tahun 2021 ini, agak delay yah .. maklum sob kondisi belum kondusif, PSBB silih berganti membatasi aktifitas-aktifitas diruang publik, jangan lupa selalu jaga kesehatan kalian frenn.  
Dalam artikel ini gout mau melanjutkan tulisan gout tentang static site generator yang dibuat dengan ```React.js``` yaitu ```Gatsby.js```. Kali ini akan membagi sedikit tips dari hasil kulik mengulik gout, maklum lah gout ini **otodidak** sejati.  

Ok langsung ajah, di artikel ini gout bermaksud untuk membuat sebuah portfolio page atau personal website, dimana di dalam portfolio page tersebut gout mau memamerkan Portfolio yang berupa aktifitas kita dan keaktifan kita sebagai seorang programmer atau developer atau engineer yang senantiasa bersentuhan dengan github at least apapun itu baik itu profile, repository atau apapun segala aktifitas kita di github. Karena github menyediakan api key gratis untuk diakses publik, dan gout coba memanfaatkan fitur api data dari github.  

### Implement  
Dalam artikel ini sendiri gout akan implementasi kan di gatsby menggunakan sebuah plugin yang di sediakan oleh gatsby untuk fetching data dari api apapun, dan disini gout mau mengambil data github gout yang berupa profile, repository dan aktifitas di github gout. Yuk lets go ...  

Buka code editor kita , di asumsikan kalian sudah menginstall ```Gatsby.js``` nya yah.
jika belum silahkan ke artikel berikut : <a href="https://codesyariah122.github.io/gatsbyjs/react/javascript/membangun-project-staticsite-dengan-gatsby/" target="_blank">Installasi Gatsby</a>, ***Install yang versi terbaru yah***.  

Setelah direktori gatsby kita di buka di code editor, kita buka juga terminal(CLI) kita.
berikut listing directory project gatsby gout.  

```bash
root@debian:/home/puji122/pujiermanto.netlify.app# ls -l
total 952
-rw-r--r--    1 puji122 puji122   1294 Jan  3 01:12 backup_for_plugin_github.txt
-rw-r--r--    1 puji122 puji122      0 Jan  6 10:00 gatsby-browser.js
-rwxrwxrwx    1 root    root      3434 Jan  4 21:04 gatsby-config.js
-rw-r--r--    1 puji122 puji122      0 Jan  6 10:00 gatsby-ssr.js
-rwxrwxrwx    1 root    root       556 Jan  2 08:13 github-api.js
-rwxrwxrwx    1 root    root       675 Jan  2 08:13 LICENSE
-rw-r--r--    1 root    root        67 Jan  8 10:48 netlify.toml
drwxr-xr-x 1440 root    root     45056 Jan  6 11:51 node_modules
-rwxrwxrwx    1 root    root      2720 Jan  6 11:45 package.json
-rwxrwxrwx    1 root    root    882893 Jan  6 08:50 package-lock.json
drwxr-xr-x    5 root    root      4096 Jan  8 05:08 public
-rwxrwxrwx    1 root    root      3270 Jan  8 11:06 README.md
drwxrwxrwx    8 root    root      4096 Jan  2 21:56 src
drwxrwxrwx    2 root    root      4096 Jan  2 08:13 static

```  
### Install Plugin  

Selanjutnya kita install pluginnya :  

```
npm install --save gatsby-source-graphql dotenv 
```  
#### Selanjutnya  
- Env
kemudian kita buat file **Environmentnya**, jika sudah ada maka bisa langsung buka file ```.env```. Jika belum ada : 
```bash
root@debian:/home/puji122/pujiermanto.netlify.app# touch .env.development
```  
Buka file ```.env.development``` : 

```
GATSBY_PORTFOLIO_GITHUB_TOKEN=your_personal_tokens_github
```  
- Personal access tokens github  

kemudian kita buat personal access token di github kita, Bisa akses link berikut : <a href="https://github.com/settings/apps" target="_blank">Personal Access Tokens Github</a>. Klik ```Personal access tokens```, kemudian **Click button** ```Generate new token```, Checklist pada bagian ```repo``` dan ```user```, kemudian beri nama token kalian di bagian ***Note***. Terakhir **Click** ```Generate token```. Dan kalian bisa mencopy tokennya ke file ```.env``` di bagian ```GATSBY_PORTFOLIO_GITHUB_TOKEN=your_token```.  

- Config gatsby  

setelah plugin terinstall, ```Personal access tokens``` telah di buat, lanjut kita buka file ```gatsby-config.js``` yang berada di root directory gatsby kita .  
tambahkan ini :  

```
const path = require('path');

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

plugins: [
    
    {
      resolve: 'gatsby-source-graphql',
      options: {
        typeName: 'GitHub',
        fieldName: 'github',
        url: 'https://api.github.com/graphql',
        headers: {
          Authorization: `bearer ${process.env.GATSBY_PORTFOLIO_GITHUB_TOKEN}`,
        },
        fetchOptions: {},
      },
    },

]
```  
Setelah itu kita bisa coba untuk fetching menggunakan ```GraphQl``` terlebih dahulu. 
Sebelumnya kita aktifkan dulu server gatsby nya, kembali ke terminal :  

```bash
root@debian:/home/puji122/pujiermanto.netlify.app# npm start
```  
Setelah server gatsby running di localhost:8000, kita bisa buka di browser kita dengan mengakses http://localhost:8000, untuk graphql bisa di akses di ```http://localhost:8000/__graphql```  

<video width="600" controls autoplay>
  <source src="{{site.url}}/assets/images/post/gatsby-source-graphql.mp4" type="video/mp4">
  <source src="mov_bbb.ogg" type="video/ogg">
  Your browser does not support HTML video.
</video>

Seperti terlihat dari cuplikan diatas plugin ```gatsby-source-graphql``` sudah bisa kita gunakan untuk fetching data github kita.  

#### Show off your project at github  

Selanjutnya adalah kita bisa melakukan fetching data di component gatsby kita, di artikel ini gout mau menampilkan github data gout di halaman depan atau homepage dari portfolio page gatsby gout. Sehingga gout bisa menambahkan sebuah komponen baru untuk data github ini dan ditampilkan langsung di komponen homepagenya.  

seperti ini penerapannya di gatsby page gout :  

ini component utama gout :  

```
import React from "react"
import Layout from "../components/layouts/layout"
import '../styles/hero.scss'
import Hero from './homepage/hero'
import Projects from './homepage/Projects'

const IndexPage = () => {

  return (
    <>
        <Layout title="Unexpected Kernel Mode">
          <section className="hero">
            <div className="container">
              <Hero id="hero"/>
            </div>
          </section>

          // ini untuk gatsby-source-graphql tadi, yang disini difungsikan untuk mengambil data github gout
          <section className="project">
              <Projects/>
          </section>
        </Layout>
    </>
  )
}

export default IndexPage

```  
kemudian gout punya satu direktori tambahan untuk component homepage yaitu direktori ```homepage/```.  
kemudian di direktori component ```homepage/``` buat lagi satu direktori untuk membuat view data github nya buat direktori baru namanya ```Projects/```, didalam direktori ```Projects/``` buat satu file baru di direktori ```Projects/``` dengan nama ```index.jsx```, berikut code dari file ```homepage/Projects/index.jsx``` :  

```
import React from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'
import { Container, Card, TitleWrap } from '../../../components/common';
import Star from '../../../components/common/Icons/Star'
import Fork from '../../../components/common/Icons/Fork'


const Projects = () => {

  const Wrapper = styled.div`
    color: #000;
    margin-bottom: 2rem;
  `;

  const Grid = styled.div`
    margin-top: 2rem;
    display: grid;
    align-items: center;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 8fr;
    gap: 1.2rem 1.2rem;

    @media (max-width: 960px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 680px) {
      grid-template-columns: 1fr;
    }
  `;

  const Item = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
    box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.11);
    text-decoration:none;

    h4 {
      color: '#212121';
    }

    p {
      color: '#707070';
    }
  `;

  const Content = styled.div`
    padding: 1rem 0;
    min-height: 160px;
    &:hover{
      color: black;
    }
  `;

  const Stats = styled.div`
    display: flex;
    align-items: center;

    div {
      display: flex;
      &:first-child {
        margin-right: 0.5rem;
      }

      img {
        margin: 0;
      }

      svg path {
        fill: '#000';
      }

      span {
        color: '#000';
        margin-left: 0.5rem;
      }
    }
  `;

  const Languages = styled.div`
    opacity: 0.5;
    font-size: 14px;
  `;

const {
    github: {
      viewer: {
        repositories: { edges },
      },
    },
  } = useStaticQuery(
    graphql`
      query{
        github {
          viewer {
            repositories(first: 15, orderBy: { field: STARGAZERS, direction: DESC }) {
              edges {
                node {
                  id
                  name
                  url
                  description
                  createdAt
                  stargazers {
                    totalCount
                  }
                  forkCount
                  languages(first: 3) {
                    nodes {
                      id,
                      name
                    }
                  }
                }
              }
            }
          }
        }
      }
    `
  );


  return (
    <Wrapper as={Container} id="projects">
        <h2 style={{color: '#000', textAlign: 'justify'}}>My Projects</h2>
            <p style={{textIndent: '25px', fontSize: '15px', lineHeight: '37px', textAlign: 'justify', width:'100%'}}>Ini merupakan dokumentasi dan rekam jejak pribadi saya dalam proses mengerjakan dan mengembangkan sebuah project yang saya kerjakan beberapa waktu sebelumnya, juga sebagai media dokumentasi dan modul-modul dalam mempelajari dan memperluas khazanah saya pribadi dalam mengembangkan minat saya dalam  dunia IT dan Pemrograman.</p>
      <Grid>
        {edges.map(({ node }) => (
          <Item key={node.id} as="a" href={node.url} target="_blank" rel="noopener noreferrer">
            <Card>
              <Content>
                <h4>{node.name}</h4>
                <h5 style={{color:'grey'}}>{node.createdAt}</h5>
                <p>{node.description}</p>
              </Content>
              <TitleWrap>
                <Stats>
                  <div>
                    <Star/>
                    <span>{node.stargazers.totalCount}</span>
                  </div>
                  <div>
                    <Fork/>
                    <span>{node.forkCount}</span>
                  </div>
                </Stats>
                <Stats>
                  <Languages>
                    {
                      node.languages.nodes.map(({ id, name }) => (
                        <span key={id}>
                          {name}
                        </span>
                      ))
                    }
                  </Languages>
                </Stats>
              </TitleWrap>
            </Card>
          </Item>
        ))}
      </Grid>
    </Wrapper>
  )

}

export default Projects


```  
bisa kalian telaah yah code nya, kalau gout hanya mau sedikit **memberi tambahan untuk intinya**, untuk artikel ini akan gout jabarkan intinya yakni :  

- Query Github Graphql  

```
const {
    github: {
      viewer: {
        repositories: { edges },
      },
    },
  } = useStaticQuery(
    graphql`
      query{
        github {
          viewer {
            repositories(first: 15, orderBy: { field: STARGAZERS, direction: DESC }) {
              edges {
                node {
                  id
                  name
                  url
                  description
                  createdAt
                  stargazers {
                    totalCount
                  }
                  forkCount
                  languages(first: 3) {
                    nodes {
                      id,
                      name
                    }
                  }
                }
              }
            }
          }
        }
      }
    `
  );
```  

**Look at this**  
Di code ini kita melakukan query dengan mengambil data dari api github :  

```
github: {
      viewer: {
        repositories: { edges },
      },
    } = 
```  
Penggunaanya yakni api github, yang documentasi nya bisa kalian simak dimari :  
<a href="https://docs.github.com/en/free-pro-team@latest/graphql/overview/about-the-graphql-api" target="_blank">Github Api Documentation</a>, dan kalian juga bisa langsung explore graphqlnya github disini : <a href="https://docs.github.com/en/free-pro-team@latest/graphql/overview/explorer" target="_blank">Explorer github graphql</a> lanjut login dengan akun github kalian.  
**seperti ini contohnya :**  
<video width="600" controls autoplay>
  <source src="{{site.url}}/assets/images/post/github-explorer.mp4" type="video/mp4">
  <source src="mov_bbb.ogg" type="video/ogg">
  Your browser does not support HTML video.
</video>  

- Looping data  

Kemudian kita looping data nya di bagian view dan dapat diambil data sebagai berikut :  

```
{edges.map(({ node }) => (
  {node.id}
  {node.url}
  {node.name}
  {node.description}
  {node.stargazers.totalCount}
  {node.forkCount}

  //dan untuk bagian language lakukan looping kedua :  
    {node.languages.nodes.map(({ id, name }) => (
        {id}
        {name}
    ))}
))}
``` 

#### Component-component tambahan lainnya  
Untuk component lainnya kalian bisa meluncur langsung ke link repository gout berikut yah :  

<a href="https://github.com/codesyariah122/pujiermanto.netlify.app/tree/with_new_gatsby/src/components/common" target="_blank">Disini</a>, bisa kalian sesuaikan dan di kostum sesuai selera kalian.  
kesimpulannya gout hanya membagi tips pada bagian query graphqlnya saja yah.  

<a href="https://pujiermanto.netlify.app/" target="_blank">Demo My Portfolio WIth Github Data</a> 

Kurang lebihnya mohon di maafkan, semoga tulisan ini bermanfaat. akhir kata gout ucapkan ...  

***Wassalaamm***

***puji ermanto***  

