const api = {
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

setSurah(api.url)

.then(response => response.json())
.then(response => {
	const Data = response.data 
	OptSurah(Data)
})


selectSurah.addEventListener('change', function(e){
	Loader.style.visibility="visible"
	errorQuran.innerHTML=''
	selectAyat.innerHTML = ''
	selectAyat.appendChild(optAyatEl)

	const surah = this.value
	if(surah !== ''){
		setAyat(api.url, surah)
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
		getQuran(api.url, surah, ayat)
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

		getQuran(api.url, surah, next)
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
		getQuran(api.url, surah, last)
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
		getQuran(api.url, surah, prev)
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
		getQuran(api.url, surah, first)
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
		Literation(api.url, surah)
		.then( res => res.json())
		.then( res => {
			const Data = res.data
			ViewLiteration(Data)
		})
		.catch((err) => console.log('Results error : ', err))
	}
})
