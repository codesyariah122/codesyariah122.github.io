document.querySelector('#loader').style.visibility="hidden"
document.querySelector('.card-quran').style.visibility="hidden"
document.querySelector('.header-quran').innerHTML=''

let NullOptionsSurah = document.createElement('option')
	NullOptionsSurah.setAttribute('value', 'choose')
	NullOptionsSurah.textContent = 'Choose ... '
	document.querySelector('#select-surah').appendChild(NullOptionsSurah)

let NullOptionsAyat = document.createElement('option')
	NullOptionsAyat.setAttribute('value', 'pilih-ayat')
	NullOptionsAyat.textContent='Pilih Ayat'
	document.querySelector('#select-ayat').appendChild(NullOptionsAyat)

const QuranApi = {
	proxy: 'https://cors-anywhere.herokuapp.com/',
	url: 'https://api.quran.sutanlab.id/',
	req: 'surah/'
}

const SelectSurah = new AlQuran(QuranApi.proxy, QuranApi.url, QuranApi.req)

// console.log(SelectSurah.proxy)


SelectSurah.getSelectSurah()
.then(res => {
	// console.log(res)
	const Surah = res.data 

	Surah.map(key => {
		let optEl = document.createElement('option')
		optEl.setAttribute('value', key.number)
		optEl.textContent=key.name.transliteration.id
		document.querySelector('#select-surah').appendChild(optEl)
	})
}).catch(err => console.log('Error results : ', err))


document.querySelector('#select-surah').addEventListener('change', () => {
	document.querySelector('#loader').style.visibility="visible"
	document.querySelector('#select-ayat').innerHTML=''
	document.querySelector('#select-ayat').appendChild(NullOptionsAyat)
	document.querySelector('#error-quran').innerHTML=''

	const surah = document.querySelector('#select-surah').value
	const SelectAyat = new AlQuran(QuranApi.proxy, QuranApi.url, QuranApi.req, surah)

	SelectAyat.getSelectAyat()
	.then( res => {
		const AyatDatas = res.data.verses
		AyatDatas.map(key => {
			const optEl = document.createElement('option')
			optEl.setAttribute('value', key.number.inSurah)
			optEl.textContent=`Ayat - ${key.number.inSurah}`
			document.querySelector('#select-ayat').appendChild(optEl)
		})
	document.querySelector('#loader').style.visibility="hidden"
	}).catch(err => console.log(`Results error : ${err}`))

})


document.querySelector('#enter-quran').addEventListener('click', () => {
	document.querySelector('#error-quran').innerHTML=''
	document.querySelector('.header-quran').innerHTML=''
	document.querySelector('.quran-body').innerHTML=''
	document.querySelector('.card-quran').style.visibility="hidden"

	const surah = document.querySelector('#select-surah').value
	const ayat = document.querySelector('#select-ayat').value

	if(surah == 'choose'){
		const errEl = document.createElement('div')
		errEl.className = 'alert alert-danger'
		errEl.setAttribute('role', 'alert')
		errEl.textContent = 'Pilih Surah Terlebih dahulu'
		document.querySelector('#loader').style.visibility="visible"
		setTimeout(()=>{
			document.querySelector('#error-quran').appendChild(errEl)
			document.querySelector('#loader').style.visibility="hidden"
		}, 1500)
	}else if(ayat === 'pilih-ayat'){
		document.querySelector('#loader').style.visibility="visible"

		const GetAyat = new AlQuran(QuranApi.proxy, QuranApi.url, QuranApi.req, surah)

		GetAyat.getSelectAyat()
		.then(res => {

			// console.log("Success results : ", res)
			const ViewSurah = res.data
			
			const headerEl = document.createElement('h4')
			const bodyEl = document.createElement('div')
			headerEl.textContent = `${ViewSurah.name.long} | Surah ${ViewSurah.name.transliteration.id} `
			bodyEl.innerHTML = `
				<h5 class="card-title">${ViewSurah.name.transliteration.id} (${ViewSurah.name.translation.id})</h5>
                <p class="card-text">${ViewSurah.tafsir.id}</p>
                <a class="btn btn-outline-success" id="view-ayat" onClick="ViewAyat(${ViewSurah.number}, ${ViewSurah.verses[0].number.inSurah})">View Ayat</a>
			`

			setTimeout(() => {
				document.querySelector('.card-quran').style.visibility="visible"
				document.querySelector('.header-quran').appendChild(headerEl)
				document.querySelector('.quran-body').appendChild(bodyEl)
				document.querySelector('#loader').style.visibility="hidden"
			}, 1500)

		}).catch(err => console.log(`Error results : ${err}`))
	
	}else{
		document.querySelector('#loader').style.visibility="visible"

		const GetSurahAyat = new AlQuran(QuranApi.proxy, QuranApi.url, QuranApi.req, surah, ayat)

		GetSurahAyat.getSurahAyat()
		.then( res => {
			const DataSurah = res.data
			const DataAyat = res.data.text 
			console.log(DataSurah)

			const headerEl = document.createElement('h4')
			const bodyEl = document.createElement('div')
			const rowEl = document.createElement('div')
			
			headerEl.textContent = `${DataSurah.surah.name.long} | Surah ${DataSurah.surah.name.transliteration.id} `
			bodyEl.innerHTML = `
				<h5 class="card-title">${DataSurah.surah.name.transliteration.id} (${DataSurah.surah.name.translation.id})</h5>
                <p class="card-text">${DataSurah.surah.tafsir.id}</p>
			`

			setTimeout(() => {
				document.querySelector('.card-quran').style.visibility="visible"
				document.querySelector('.header-quran').appendChild(headerEl)
				document.querySelector('.quran-body').appendChild(bodyEl)
				document.querySelector('#loader').style.visibility="hidden"
			}, 1500)

			console.log(typeof DataSurah.surah.preBismillah)

			const TotalAyat = DataSurah.surah.numberOfVerses
			const Disabled = DataSurah.number.inSurah == 1 ? 'disabled' : ''
			const DisableTab = DataSurah.number.inSurah == 1 ? 'tabindex="-1" aria-disabled="true"' : ''
			const DisableNext = DataSurah.number.inSurah >= TotalAyat ? 'disabled' : ''
			const ActiveData = DataSurah.number.inSurah
			const NextData = (DataSurah.number.inSurah >= TotalAyat) ? 1 : DataSurah.number.inSurah + 1
			const PrevData = (DataSurah.number.inSurah != 1) ? DataSurah.number.inSurah - 1 : '';
			const FirstData = DataSurah.number.inSurah == 1 ? (ActiveData + 1) - ActiveData : ''
			const LastData = DataSurah.number.inSurah == 1 ? (ActiveData - ActiveData)+TotalAyat : ''
			const PreBismillah = DataSurah.surah.PreBismillah ? `<h2 class="mb-5"> - ${DataSurah.surah.preBismillah.text.arab}</h2>` : '' 

			// console.log(PreBismillah)

			rowEl.className='row justify-content-center'
			rowEl.innerHTML = `
				<div class="col-12 col-xs-12 col-sm-12 text-center">
				<h2>${PreBismillah}</h2>
							<h2>${DataSurah.text.arab} &nbsp; <span class="number-ayat">${DataSurah.number.inSurah}</span> </h2>
				<h5>${DataSurah.text.transliteration.en}</h5>

				<audio controls>
					<source src="${DataSurah.audio.primary}" type="audio/mp3">
				</audio>

				<blockquote class="mb-2 text-success"> - ${DataSurah.translation.id}</blockquote>

				<br/>

				<div class="text-xs-center">
					<nav aria-label="Page navigation example mt-2 mb-3">
	                    <ul class="pagination justify-content-center">
	                    	<li class="page-item ${Disabled}">
						      <a class="page-link" aria-label="Previous" id="prev" data-total="${TotalAyat}" data-surah="${surah}" data-ayat="${FirstData}" onClick="FirstAyat(${surah}, ${FirstData})">
						        <span aria-hidden="true">&laquo;</span>
						      </a>
						    </li>
	                    	<li class="page-item ${Disabled}"> 
								<a class="page-link" ${DisableTab} id="prev" onClick="PrevAyat(${surah}, ${PrevData})">Previous</a>
							</li>

							<li class="page-item">
								<a class="page-link" id="next" data-total="${TotalAyat}" data-surah="${surah}" data-next="${surah}, ${DataSurah.number.inSurah + 1}" onClick="NextAyat(${surah}, ${DataSurah.number.inSurah + 1})" id="next">Next</a>
							</li>
							<li class="page-item ${DisableNext}">
						      <a class="page-link" aria-label="Next" id="next" data-total="${TotalAyat}" data-surah="${surah}" data-ayat="${LastData}" onClick="LastAyat(${surah}, ${LastData})">
						        <span aria-hidden="true">&raquo;</span>
						      </a>
						    </li>
	                    </ul>
	                </nav>
	            </div>
			</div>
			`
			document.querySelector('.quran-body').appendChild(rowEl)

		}).catch(err => {
			console.log(`Results errors : ${err}`)
		})
	}

})
