---
layout: post
title:  "async await javascript"
author: puji
categories: [ Javascript, VanillaJS ]
image: assets/images/post/quran-vanilla-JS/QuranMajeed-Android-hand_0.jpg
tags: [webdevelopment]
opening: بسم الله الرحمن الرحيم
---  

{{page.opening}}  

Assalamualaikum, sobat digital dimanapun berada salam baca, semoga kalian semua selalu dalam keadaan sehat selalu, kali ini gout mau sedikit berbagi, yaitu berupa tips trick dan tutorial, kali ini gout akan membahas mengenai pembuatan QuranDigital menggunakan Vannila javascipt atau native.  

Ok yu langsung aja kita praktek :  

pertama siapkan dulu direktori projectnya, di dalam direktori web server kalian.  
<blockquote>Harus di jalankan di web server yah</blockquote>.  

Karena kita akan menjalankan proses ajax request. kalian bebas memberi nama direktori apapun, kemudian buka di code editor buat satu buah file baru dengan nama ```index.html```, kemudian buat direktori baru dengan nama ```js``` untuk menyimpan file statis kita yaitu berupa script javascript.  
berikut isi code dari file utama kita yaitu file ```index.html``` :  

```html
  <div class="container">
      <div class="row justify-content-center">

        <div class="col-md-12">
             <div class="container">
                <div class="row justify-content-center">

                    <div class="col-12 col-xs-12 col-sm-12">
                        <h1>Baca Quran Online</h1>
                        <hr> 
                        <div class="row">
                            <div class="col-md-4">
                                <!-- input surah -->
                                    <div class="input-group mb-3">
                                    <select class="custom-select" id="select-surah" name="surah" style="width:50%;">  
                                    </select>
                                    
                                </div>
                            </div>

                                <!-- input ayat -->
                                <div class="col-md-4">
                                    <div class="input-group mb-3">
                                    <select class="custom-select" id="select-ayat" name="ayat" style="width:30%;">  
                                    </select> 
                                    <div class="input-group-append">
                                        <button id="enter-quran" class="btn btn-dark btn-sm">Enter</button>
                                    </div>
                                    </div>

                                </div>

                                <!-- loader -->

                                <div class="col-md-3">
                                    
                                    <div id="loader">
                                        <img src="img/loading2.gif" class="img-responsive" width="70" height="30">
                                    </div>

                                </div>


                            </div>

                        </div>                

                        <div id="error-quran" style="width: 85%; margin-left: -.7rem;"></div>    

                    </div>

            <div id="quran-list"></div>

            <!-- Modal -->
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content tafsir-modal">
                  
                </div>
              </div>
            </div>

        </div>

      </div>

    </div>
```  

script html diatas menggunakan framework css bootstrap versi 4.5, kalian tinggal menambahkan tag bagian link css dan script yang diarahkan ke bootstrap kalian.  

kemudian di direktori ```js/```, buat beberapa file baru :  
1. quran.js  
2. app.js  
3. functions.js  

Buka file ```js/quran.js```, berikut isi code quran.js :  

```javascript
const apiQuran = {
  url: 'https://api.quran.sutanlab.id/surah/'
}

const Loader = document.querySelector('#loader')
const enterQuran = document.querySelector('#enter-quran')
const NextAyat = document.querySelector('.next')
const PrevAyat = document.querySelector('.prev')
const errorQuran = document.querySelector('#error-quran')
const selectSurah = document.querySelector('#select-surah')
const selectAyat = document.querySelector('#select-ayat')
const optSurahEl = document.createElement('option')
const optAyatEl = document.createElement('option')
const optErrEl = document.createElement('option')

optSurahEl.setAttribute('value', '')
optSurahEl.textContent='choose ... '
optAyatEl.setAttribute('value', 1)
optAyatEl.textContent='Pilih Ayat'
optErrEl.className='alert alert-danger'
optErrEl.setAttribute('role', 'alert')
optErrEl.textContent='Pilih surah terlebih dahulu ... '

selectSurah.appendChild(optSurahEl)
selectAyat.appendChild(optAyatEl)

Loader.style.visibility="hidden"
errorQuran.style.visibility="visible"

setSurah(apiQuran.url)

.then(response => response.json())
.then(response => {
  const Data = response.data 
  OptSurah(Data)
})


selectSurah.addEventListener('change', function(){
  Loader.style.visibility="visible"
  errorQuran.innerHTML=''
  selectAyat.innerHTML = ''
  selectAyat.appendChild(optAyatEl)

  const surah = this.value
  if(surah !== ''){
    setAyat(apiQuran.url, surah)
    .finally(() => {
      setTimeout(function(){
        Loader.style.visibility="hidden"      
      }, 1500)
    })
    .then(response => response.json())
    .then(response => {
      // console.log(response)
      const Data = response.data .verses
      OptAyat(Data)
    })
  }else{
    setTimeout(function(){
      Loader.style.visibility="hidden"
    }, 500)
  }
})

enterQuran.addEventListener('click', function() {
  Loader.style.visibility="visible"
  errorQuran.style.visibility="visible"
  const surah = selectSurah.value
  const ayat = selectAyat.value

  if(surah === '' ) {
    setTimeout(function(){
      errorQuran.appendChild(optErrEl)
      Loader.style.visibility="hidden"
    }, 500)
  }else{
    getQuran(apiQuran.url, surah, ayat)
    .finally(() => {
      setTimeout(function(){
        Loader.style.visibility="hidden"
      }, 1000)
    })
    .then( res => res.json())
    .then( res => {
      const Data = res.data
      ViewSurah(Data)
    })
  }
  
})



document.addEventListener('click', function(e){
  if(e.target.classList.contains('next')){
    const surah = e.target.dataset.surah
    const next = e.target.dataset.ayat

    getQuran(apiQuran.url, surah, next)
    .finally(() => {
      setTimeout(function(){
        Loader.style.visibility="hidden"
      }, 1000)
    })
    .then( res => res.json())
    .then( res => {
      const Data = res.data
      ViewSurah(Data)
    })  
  }else if(e.target.classList.contains('last')){
    const surah = e.target.dataset.surah
    const last = e.target.dataset.ayat
    console.log(last)
    getQuran(apiQuran.url, surah, last)
    .finally(() => {
      setTimeout(function(){
        Loader.style.visibility="hidden"
      }, 1000)
    })
    .then( res => res.json())
    .then( res => {
      const Data = res.data
      ViewSurah(Data)
    })  
    // .catch((err) => console.log('Results error : ', err))
  }else if(e.target.classList.contains('prev')){
    const surah = e.target.dataset.surah
    const prev = e.target.dataset.ayat
    getQuran(apiQuran.url, surah, prev)
    .finally(() => {
      setTimeout(function(){
        Loader.style.visibility="hidden"
      }, 1000)
    })
    .then( res => res.json())
    .then( res => {
      const Data = res.data
      ViewSurah(Data)
    })  
    // .catch((err) => console.log('Results error : ', err))
  }else if(e.target.classList.contains('first')){
    const surah = e.target.dataset.surah
    const first = e.target.dataset.ayat
    getQuran(apiQuran.url, surah, first)
    .finally(() => {
      setTimeout(function(){
        Loader.style.visibility="hidden"
      }, 1000)
    })
    .then( res => res.json())
    .then( res => {
      // console.log(res)
      const Data = res.data
      ViewSurah(Data)
    })  
    // .catch((err) => console.log('Results error : ', err))
  }else if(e.target.classList.contains('tafsir-surah')){
    const surah = e.target.dataset.surah
    Literation(apiQuran.url, surah)
    .then( res => res.json())
    .then( res => {
      const Data = res.data
      ViewLiteration(Data)
    })
    .catch((err) => console.log('Results error : ', err))
  }
})

```  

kemudian buka file ```js/app.js```, yang akan kita fungsikan sebagai file yang akan menjalankan request ajax melalui library fetch dan diartikel yang lalu gout sudah mencoba request ajax menggunakan library jquery, dan sekarang gout akan mencobanya menggunakan vanilla javascript atau native javascript atau javascript murni, berikut isi code dari file ```js/app.js``` :  

```javascript
const setSurah = async(url) => {
  const reqSurah = await fetch(`${url}`)
  return reqSurah
}

const setAyat = async(url, param) => {
  const reqAyat = await fetch(`${url}${param}`)
  return reqAyat
}

const getQuran = async(url, param, data) => {
  const reqQuran = await fetch(`${url}${param}/${data}`)
  return reqQuran
}

const Literation = async(url, param) => {
  const reqLiteration = await fetch(`${url}${param}`)
  return reqLiteration  
}
```  

dan terakhir kita buka file ```js/functions.js``` yang akan gout fungsikan sebagai file yang akan menjalankan proses dom element-element html yang telah gout siapkan sebelumnya melalui selector class dan id, berikut isi code dari functions.js :  

```javascript
const OptSurah = (Data) => {
  // console.log(Data)
  Data.map(key => {
    // console.log(key)
    const optSurah = document.createElement('option')
    optSurah.setAttribute('value', key.number)
    optSurah.textContent=`${key.name.transliteration.id}`
    document.querySelector('#select-surah').appendChild(optSurah)
  })
}


const OptAyat = (Data) => {
  // console.log(Data)
  Data.map(key => {
    // console.log(key)
    const OptAyat = document.createElement('option')
    OptAyat.setAttribute('value', key.number.inSurah)
    OptAyat.textContent = `Ayat - ${key.number.inSurah}`
    document.querySelector('#select-ayat').appendChild(OptAyat)
  })
}

const ViewLiteration = (Data) => {
  // console.log(Data)
  document.querySelector('.tafsir-modal').innerHTML=''
  const DataTafsir = {
    name: Data.name.transliteration.id,
    rev: {
      arab: Data.revelation.arab,
      id: Data.revelation.id
    },
    trans: Data.name.translation.id,
    tafsir: Data.tafsir.id
  }
  const TafsirModal = document.createElement('div')
  TafsirModal.className='card'
  TafsirModal.innerHTML=`
    <div class="card">
      <div class="card-header">
        ${DataTafsir.name}(${DataTafsir.trans})
      </div>
      <div class="card-body">
        <blockquote class="blockquote mb-0">
          <p>${DataTafsir.tafsir}.</p>
          <footer class="blockquote-footer"><b>Revelation : </b> <cite title="Source Title">
             ${DataTafsir.rev.arab} | ${DataTafsir.rev.id}
          </cite></footer>
        </blockquote>
      </div>
    </div>
  `
  document.querySelector('.tafsir-modal').appendChild(TafsirModal)
}


const ViewSurah = (Surah) => {
  // console.log(Surah)
  const DataSurah = [
    {
      audio: Surah.audio,
      name: Surah.surah.name,
      numberOfVerses: Surah.surah.numberOfVerses,
      numberAyat: Surah.number.inSurah,
      numberSurah: Surah.surah.number,
      revelation: Surah.surah.revelation,
      preBismillah: Surah.preBismillah,
      tafsir: Surah.tafsir,
      text: Surah.text,
      translation: Surah.translation
    }
  ]
  let card = ''
  DataSurah.map(s => card+=QuranCard(s))
  const QuranView = document.querySelector('#quran-list')
  QuranView.innerHTML = card
}


function QuranCard(s)  {

  // console.log(s)
  const NumberSurah = s.numberSurah
  const TotalAyat = s.numberOfVerses
  const activeData = s.numberAyat
  const Disabled = activeData == 1 ? 'disabled' : ''
  const DisabledTab = activeData == 1 ? 'tabindex="-1" aria-disabled="true"' : ''
  const DisabledNext = activeData >= TotalAyat ? 'disabled' : ''
  const NextData = activeData >= TotalAyat ? 1 : activeData + 1
  const PrevData = activeData != 1 ? activeData - 1 : ''
  const FirstData = activeData >= 1 ? (activeData + 1) - activeData : ''
  const LastData = activeData >= 1 ? (activeData - activeData) + TotalAyat : ''

  // console.log(activeData)

  return `
    <div class="card card-quran">
            <div class="card-header">
               <h3> ${s.name.long} (${s.name.transliteration.id})</h3>
            </div>
                  
          <div class="card-body quran-body">
            <div class="row justify-content-center">
              <div class="ayat">
                <div class="col-12 col-xs-12 col-sm-12 text-center mb-5">
                <h1 class="mb-5"> ${s.preBismillah = (s.preBismillah !== undefined) ? s.preBismillah.text.arab : ''} </h1>
                <h2>
                  <span class="circle-number">${s.numberAyat}</span> &nbsp; 
                  ${s.text.arab}
                </h2>
                <h4 class="mt-3">${s.text.transliteration.en}</h4>
            <br/>
            <blockquote class="mt-2 mb-2 text-success"> - ${s.translation.id}</blockquote>
            <br/>

                <audio controls>
              <source src="${s.audio.primary}" type="audio/mp3">
            </audio>
            <br/>
            <br/>
            
            <div class="text-xs-center mt-3">
              <nav aria-label="Page navigation example">
                <ul class="pagination justify-content-center">

                  <li class="page-item ${Disabled}">
                    <a class="page-link first" data-surah="${NumberSurah}" data-ayat="${FirstData}" aria-label="Previous">
                      <span aria-hidden="true">&laquo;</span>
                    </a>
                  </li>
                  <li class="page-item ${Disabled}"><a class="page-link prev" data-surah="${NumberSurah}" data-ayat="${PrevData}">Previous</a></li>
                  
              
                  <li class="page-item ${DisabledNext}"><a class="page-link next" data-surah="${NumberSurah}" data-ayat="${NextData}">Next</a></li>
                  <li class="page-item ${DisabledNext}">
                    <a class="page-link last" aria-label="Next" data-surah="${NumberSurah}" data-ayat="${LastData}">
                       <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>

                </ul>
              </nav>
            </div>

            <a class="tafsir-surah btn btn-success mt-2" data-surah="${NumberSurah}" data-toggle="modal" data-target="#exampleModal">Read Tafsir Surah</a>


          </div>
            </div>

          </div>
        </div>

  `
}
```  
jika semua sudah di copas sekarang kita coba akses di web browser ke direktori project kita. selamat mencoba

Mudah-mudahan bermanfaat dari artikel gout ini yah.

ok sekian dulu dari saya untuk artikel kali ini, nanti kita lanjutkan lagi artikel mengenai tips and trick seputar pemrogramman khususnya web programming  
... see the next articles 

bye :) 


***Salam***

**Puji Ermanto**
