const NullOptions = document.createElement('option')
	NullOptions.setAttribute('value', 'choose')
	NullOptions.textContent = 'Choose ... '
	document.querySelector('#select-surah').appendChild(NullOptions)

const QuranApi = {
	proxy: 'https://cors-anywhere.herokuapp.com/',
	url: 'https://api.quran.sutanlab.id/',
	req: 'surah'
}

// DOM Select input data surah
SelectSurah(QuranApi.proxy, QuranApi.url, QuranApi.req)
.then(res => {
	const SurahDatas = res.data
	// console.log(SurahDatas)

	SurahDatas.map(key => {
		const optEl = document.createElement('option')
		optEl.setAttribute('value', key.number)
		optEl.textContent = key.name.transliteration.id
		document.querySelector('#select-surah').appendChild(optEl)
	})
}).catch(err => {
	console.log(`Error results : ${err}`)
})


document.querySelector('#loader').style.visibility="hidden"
document.querySelector('.card').style.visibility="hidden"
document.querySelector('.card-header').innerHTML=''


// view surah
document.querySelector('#enter').addEventListener('click', function () {
	document.querySelector('#error').innerHTML=''
	document.querySelector('.card-header').innerHTML=''
	document.querySelector('.card-body').innerHTML=''

	const NumberSUrah = document.querySelector('#select-surah').value

	if(NumberSUrah == 'choose' || NumberSUrah == null){
		const errEl = document.createElement('div')
		errEl.className = 'alert alert-danger'
		errEl.setAttribute('role', 'alert')
		errEl.textContent = 'Pilih Surah Terlebih dahulu'
		document.querySelector('#loader').style.visibility="visible"
		setTimeout(()=>{
			document.querySelector('#error').appendChild(errEl)
			document.querySelector('#loader').style.visibility="hidden"
		}, 1500)
	}else{
		document.querySelector('.card').style.visibility="hidden"
		document.querySelector('#select-surah').value='choose'

		document.querySelector('#loader').style.visibility="visible"

		ViewSurah(QuranApi.proxy, QuranApi.url, NumberSUrah)
		.then(res => {
			// console.log("Success results : ", res)
			const ViewSurah = res.data
			// console.log(ViewSurah)

			const headerEl = document.createElement('h4')
			const bodyEl = document.createElement('div')
			headerEl.textContent = `${ViewSurah.name.long} | Surah ${ViewSurah.name.transliteration.id} `
			bodyEl.innerHTML = `
				<h5 class="card-title">${ViewSurah.name.transliteration.id} (${ViewSurah.name.translation.id})</h5>
                <p class="card-text">${ViewSurah.tafsir.id}</p>
                <a class="btn btn-primary" id="view-ayat" onClick="ViewAyat(${ViewSurah.number}, ${ViewSurah.verses[0].number.inSurah})">View Ayat</a>
			`

			setTimeout(() => {
				document.querySelector('.card').style.visibility="visible"
			
				document.querySelector('.card-header').appendChild(headerEl)
				document.querySelector('.card-body').appendChild(bodyEl)
				document.querySelector('#loader').style.visibility="hidden"
			}, 1500)

		}).catch(err => {
			console.log("Error results : ", err)
		})

	}
})

// View Ayat
const ViewAyat = (data, id) => {
	const NumberSurah = data
	const NumberAyat = id

	ReadAyat(QuranApi.proxy, QuranApi.url,QuranApi.req, NumberSurah, NumberAyat, res => {
		
		document.querySelector('#view-ayat').style.visibility="hidden"

		const DataAyat = JSON.parse(res)

		const Indexes = DataAyat.data
		// console.log(Indexes)

		const TotalAyat = Indexes.surah.numberOfVerses
		const Disabled = Indexes.number.inSurah == 1 ? 'disabled' : ''
		const DisableTab = Indexes.number.inSurah == 1 ? 'tabindex="-1" aria-disabled="true"' : ''
		const DisableNext = Indexes.number.inSurah >= TotalAyat ? 'disabled' : '';
		const ActiveData = Indexes.number.inSurah
		const FirstData = Indexes.number.inSurah == 1 ? (ActiveData + 1) - ActiveData : '';
		const LastData = Indexes.number.inSurah == 1 ? (ActiveData - ActiveData)+TotalAyat : '';
		const rowEl = document.createElement('div')

		// console.log(`Data active : ${ActiveData}, Number Surah : ${LastData}`)

		// Row Element
		rowEl.className = 'row justify-content-center'
		rowEl.innerHTML = `
			<div class="col-12 col-xs-12 col-sm-12 text-center">
							<h2>${Indexes.text.arab} &nbsp; <span class="number-ayat">${Indexes.number.inSurah}</span> </h2>
				<h5>${Indexes.text.transliteration.en}</h5>

				<audio controls>
					<source src="${Indexes.audio.primary}" type="audio/mp3">
				</audio>

				<blockquote class="mb-2 text-success"> - ${Indexes.translation.id}</blockquote>

				<br/>

				<div class="mt-2 text-xs-center">
					<nav aria-label="Page navigation example">
	                    <ul class="pagination justify-content-center">
	                    	<li class="page-item ${Disabled}">
						      <a class="page-link" aria-label="Previous" id="prev" data-total="${TotalAyat}" data-surah="${NumberSurah}" data-ayat="${FirstData}">
						        <span aria-hidden="true">&laquo;</span>
						      </a>
						    </li>
	                    	<li class="page-item ${Disabled}"> 
								<a class="page-link" ${DisableTab} id="prev">Previous</a>
							</li>

							<li class="page-item">
								<a class="page-link" data-total="${TotalAyat}" data-surah="${NumberSurah}" onClick="NextAyat(${NumberSurah}, ${Indexes.number.inSurah + 1})" id="next">Next</a>
							</li>
							<li class="page-item ${DisableNext}">
						      <a class="page-link" aria-label="Next" id="next" data-total="${TotalAyat}" data-surah="${NumberSurah}" data-ayat="${LastData}" onClick="LastAyat(${NumberSurah}, ${LastData})">
						        <span aria-hidden="true">&raquo;</span>
						      </a>
						    </li>
	                    </ul>
	                </nav>
	            </div>
			</div>
		`

		document.querySelector('.card-body').appendChild(rowEl).children
		
		// const viewAyat = document.querySelector('.card-body')
		// console.log(viewAyat.children)

	}, (err) => {
		console.log("Error results : ", err)
	})
}


const NextAyat = (surah, ayat) => {

	const Next = document.querySelector('.card-body').children
		for(let i = 1; i < Next.length; i++){
			Next[i].innerHTML=''
		}


	const DataSurah = surah
	const next = ayat

	ReadAyat(QuranApi.proxy, QuranApi.url, QuranApi.req, DataSurah, next, res => {

		const ReadAyat = JSON.parse(res)

		const Indexes = ReadAyat.data
		// console.log(Indexes)

		const Disabled = (Indexes.number.inSurah == 1) ? 'disabled' : ''
		const DisableTab = (Indexes.number.inSurah == 1) ? 'tabindex="-1" aria-disabled="true"' : ''
		const TotalAyat = Indexes.surah.numberOfVerses
		const NextData = (Indexes.number.inSurah >= TotalAyat) ? 1 : Indexes.number.inSurah + 1;
		const DisableNext = (Indexes.number.inSurah >= TotalAyat) ? 'disabled' : '';
		const PrevData = (Indexes.number.inSurah != 1) ? Indexes.number.inSurah - 1 : '';

		const ActiveData = Indexes.number.inSurah
			

		const FirstData = Indexes.number.inSurah > 1 ? (ActiveData + 1) - ActiveData : '';

		const LastData = Indexes.number.inSurah > 1 ? (ActiveData - ActiveData)+TotalAyat : '';

		const rowEl = document.createElement('div')
		// Row Element
		rowEl.className = 'row justify-content-center'
		rowEl.innerHTML = `
			<div class="col-12 col-xs-12 col-sm-12 text-center">
							<h2>${Indexes.text.arab} &nbsp; <span class="number-ayat">${Indexes.number.inSurah}</span> </h2>
				<h5>${Indexes.text.transliteration.en}</h5>

				<audio controls>
					<source src="${Indexes.audio.primary}" type="audio/mp3">
				</audio>

				<blockquote class="mb-2 text-success"> - ${Indexes.translation.id}</blockquote>

				<br/>

				<div class="mt-2 text-xs-center">
					<nav aria-label="Page navigation example">
	                    <ul class="pagination justify-content-center">

	                    	<li class="page-item ${Disabled}">
						      <a class="page-link" aria-label="Previous" id="prev" data-total="${TotalAyat}" data-surah="${DataSurah}" data-ayat="${FirstData}" onClick="FirstAyat(${DataSurah}, ${FirstData})">
						        <span aria-hidden="true">&laquo;</span>
						      </a>
						    </li>
	                    	<li class="page-item ${Disabled}">
						      <a class="page-link" ${DisableTab} id="prev" data-total="${TotalAyat}" data-surah="${DataSurah}" data-ayat="${PrevData}" onClick="PrevAyat(${DataSurah}, ${PrevData})">Previous</a>
						    </li>

						    <li class="page-item ${DisableNext}">
								<a class="page-link" data-total="${TotalAyat}" data-surah="${DataSurah}" data-ayat="${NextData}" id="next" onClick="NextAyat(${DataSurah}, ${NextData})">Next</a>
							</li>
							<li class="page-item ${DisableNext}">
						      <a class="page-link" aria-label="Next" id="next" data-total="${TotalAyat}" data-surah="${DataSurah}" data-ayat="${LastData}" onClick="LastAyat(${DataSurah}, ${LastData})">
						        <span aria-hidden="true">&raquo;</span>
						      </a>
						    </li>

	                    </ul>
	                </nav>
	            </div>
			</div>
		`
		document.querySelector('.card-body').appendChild(rowEl).children

	}, (err) => {
		console.log("Error results : ", err)
	})
}

const LastAyat = (surah, ayat) => {
	const Next = document.querySelector('.card-body').children
		for(let i = 1; i < Next.length; i++){
			Next[i].innerHTML=''
		}

	const DataSurah = surah
	const last = ayat

		ReadAyat(QuranApi.proxy, QuranApi.url, QuranApi.req, DataSurah, last, res => {

		const ReadAyat = JSON.parse(res)

		const Indexes = ReadAyat.data
		// console.log(Indexes)

		const Disabled = (Indexes.number.inSurah == 1) ? 'disabled' : ''
		const DisableTab = (Indexes.number.inSurah == 1) ? 'tabindex="-1" aria-disabled="true"' : ''
		const TotalAyat = Indexes.surah.numberOfVerses
		const NextData = (Indexes.number.inSurah >= TotalAyat) ? 1 : Indexes.number.inSurah + 1;
		const DisableNext = (Indexes.number.inSurah >= TotalAyat) ? 'disabled' : '';
		const PrevData = (Indexes.number.inSurah != 1) ? Indexes.number.inSurah - 1 : '';

		const ActiveData = Indexes.number.inSurah
			

		const FirstData = Indexes.number.inSurah > 1 ? (ActiveData + 1) - ActiveData : '';

		const LastData = Indexes.number.inSurah > 1 ? (ActiveData - ActiveData)+TotalAyat : '';

		const rowEl = document.createElement('div')
		// Row Element
		rowEl.className = 'row justify-content-center'
		rowEl.innerHTML = `
			<div class="col-12 col-xs-12 col-sm-12 text-center">
							<h2>${Indexes.text.arab} &nbsp; <span class="number-ayat">${Indexes.number.inSurah}</span> </h2>
				<h5>${Indexes.text.transliteration.en}</h5>

				<audio controls>
					<source src="${Indexes.audio.primary}" type="audio/mp3">
				</audio>

				<blockquote class="mb-2 text-success"> - ${Indexes.translation.id}</blockquote>

				<br/>

				<div class="mt-2 text-xs-center">
					<nav aria-label="Page navigation example">
	                    <ul class="pagination justify-content-center">

	                    	<li class="page-item ${Disabled}">
						      <a class="page-link" aria-label="Previous" id="prev" data-total="${TotalAyat}" data-surah="${DataSurah}" data-ayat="${FirstData}" onCLick="FirstAyat(${DataSurah}, ${FirstData})">
						        <span aria-hidden="true">&laquo;</span>
						      </a>
						    </li>
	                    	<li class="page-item ${Disabled}">
						      <a class="page-link" ${DisableTab} id="prev" data-total="${TotalAyat}" data-surah="${DataSurah}" data-ayat="${PrevData}" onClick="PrevAyat(${DataSurah}, ${PrevData})">Previous</a>
						    </li>

						    <li class="page-item ${DisableNext}">
								<a class="page-link" data-total="${TotalAyat}" data-surah="${DataSurah}" data-ayat="${NextData}" id="next" onClick="NextAyat(${DataSurah}, ${NextData})">Next</a>
							</li>
							<li class="page-item ${DisableNext}">
						      <a class="page-link" aria-label="Next" id="next" data-total="${TotalAyat}" data-surah="${DataSurah}" data-ayat="${LastData}" onClick="LastAyat(${DataSurah}, ${LastData})">
						        <span aria-hidden="true">&raquo;</span>
						      </a>
						    </li>

	                    </ul>
	                </nav>
	            </div>
			</div>
		`
		document.querySelector('.card-body').appendChild(rowEl).children

	}, (err) => {
		console.log("Error results : ", err)
	})

}

const PrevAyat = (surah, ayat) => {
	const Next = document.querySelector('.card-body').children
		for(let i = 1; i < Next.length; i++){
			Next[i].innerHTML=''
		}

	const DataSurah = surah
	const prev = ayat

	ReadAyat(QuranApi.proxy, QuranApi.url, QuranApi.req, DataSurah, prev, res => {

		const ReadAyat = JSON.parse(res)

		const Indexes = ReadAyat.data
		// console.log(Indexes)

		const Disabled = (Indexes.number.inSurah == 1) ? 'disabled' : ''
		const DisableTab = (Indexes.number.inSurah == 1) ? 'tabindex="-1" aria-disabled="true"' : ''
		const TotalAyat = Indexes.surah.numberOfVerses
		const NextData = (Indexes.number.inSurah >= TotalAyat) ? 1 : Indexes.number.inSurah + 1;
		const DisableNext = (Indexes.number.inSurah >= TotalAyat) ? 'disabled' : '';
		const PrevData = (Indexes.number.inSurah != 1) ? Indexes.number.inSurah - 1 : '';

		const ActiveData = Indexes.number.inSurah
			

		const FirstData = Indexes.number.inSurah > 1 ? (ActiveData + 1) - ActiveData : '';

		const LastData = Indexes.number.inSurah > 1 ? (ActiveData - ActiveData)+TotalAyat : '';

		const rowEl = document.createElement('div')
		// Row Element
		rowEl.className = 'row justify-content-center'
		rowEl.innerHTML = `
			<div class="col-12 col-xs-12 col-sm-12 text-center">
							<h2>${Indexes.text.arab} &nbsp; <span class="number-ayat">${Indexes.number.inSurah}</span> </h2>
				<h5>${Indexes.text.transliteration.en}</h5>

				<audio controls>
					<source src="${Indexes.audio.primary}" type="audio/mp3">
				</audio>

				<blockquote class="mb-2 text-success"> - ${Indexes.translation.id}</blockquote>

				<br/>

				<div class="mt-2 text-xs-center">
					<nav aria-label="Page navigation example">
	                    <ul class="pagination justify-content-center">

	                    	<li class="page-item ${Disabled}">
						      <a class="page-link" aria-label="Previous" id="prev" data-total="${TotalAyat}" data-surah="${DataSurah}" data-ayat="${FirstData}" onClick="FirstAyat(${DataSurah}, ${FirstData})">
						        <span aria-hidden="true">&laquo;</span>
						      </a>
						    </li>
	                    	<li class="page-item ${Disabled}">
						      <a class="page-link" ${DisableTab} id="prev" data-total="${TotalAyat}" data-surah="${DataSurah}" data-ayat="${PrevData}" onClick="PrevAyat(${DataSurah}, ${PrevData})">Previous</a>
						    </li>

						    <li class="page-item ${DisableNext}">
								<a class="page-link" data-total="${TotalAyat}" data-surah="${DataSurah}" data-ayat="${NextData}" id="next" onClick="NextAyat(${DataSurah}, ${NextData})">Next</a>
							</li>
							<li class="page-item ${DisableNext}">
						      <a class="page-link" aria-label="Next" id="next" data-total="${TotalAyat}" data-surah="${DataSurah}" data-ayat="${LastData}" onClick="LastAyat(${DataSurah}, ${LastData})">
						        <span aria-hidden="true">&raquo;</span>
						      </a>
						    </li>

	                    </ul>
	                </nav>
	            </div>
			</div>
		`
		document.querySelector('.card-body').appendChild(rowEl).children

	}, (err) => {
		console.log("Error results : ", err)
	})

}

const FirstAyat = (surah, ayat) => {
	const Next = document.querySelector('.card-body').children
		for(let i = 1; i < Next.length; i++){
			Next[i].innerHTML=''
		}

	const DataSurah = surah
	const last = ayat

	ReadAyat(QuranApi.proxy, QuranApi.url, QuranApi.req, DataSurah, last, res => {

		const ReadAyat = JSON.parse(res)

		const Indexes = ReadAyat.data
		// console.log(Indexes)

		const Disabled = (Indexes.number.inSurah == 1) ? 'disabled' : ''
		const DisableTab = (Indexes.number.inSurah == 1) ? 'tabindex="-1" aria-disabled="true"' : ''
		const TotalAyat = Indexes.surah.numberOfVerses
		const NextData = (Indexes.number.inSurah >= TotalAyat) ? 1 : Indexes.number.inSurah + 1;
		const DisableNext = (Indexes.number.inSurah >= TotalAyat) ? 'disabled' : '';
		const PrevData = (Indexes.number.inSurah != 1) ? Indexes.number.inSurah - 1 : '';

		const ActiveData = Indexes.number.inSurah
			

		const FirstData = Indexes.number.inSurah > 1 ? (ActiveData + 1) - ActiveData : '';

		const LastData = Indexes.number.inSurah == 1 ? (ActiveData - ActiveData)+TotalAyat : '';

		const rowEl = document.createElement('div')
		// Row Element
		rowEl.className = 'row justify-content-center'
		rowEl.innerHTML = `
			<div class="col-12 col-xs-12 col-sm-12 text-center">
							<h2>${Indexes.text.arab} &nbsp; <span class="number-ayat">${Indexes.number.inSurah}</span> </h2>
				<h5>${Indexes.text.transliteration.en}</h5>

				<audio controls>
					<source src="${Indexes.audio.primary}" type="audio/mp3">
				</audio>

				<blockquote class="mb-2 text-success"> - ${Indexes.translation.id}</blockquote>
				
				<br/>

				<div class="mt-2 text-xs-center">
					<nav aria-label="Page navigation example">
	                    <ul class="pagination justify-content-center">

	                    	<li class="page-item ${Disabled}">
						      <a class="page-link" aria-label="Previous" id="prev" data-total="${TotalAyat}" data-surah="${DataSurah}" data-ayat="${FirstData}" onClick>
						        <span aria-hidden="true">&laquo;</span>
						      </a>
						    </li>
	                    	<li class="page-item ${Disabled}">
						      <a class="page-link" ${DisableTab} id="prev" data-total="${TotalAyat}" data-surah="${DataSurah}" data-ayat="${PrevData}" onClick="PrevAyat(${DataSurah}, ${PrevData})">Previous</a>
						    </li>

						    <li class="page-item ${DisableNext}">
								<a class="page-link" data-total="${TotalAyat}" data-surah="${DataSurah}" data-ayat="${NextData}" id="next" onClick="NextAyat(${DataSurah}, ${NextData})">Next</a>
							</li>
							<li class="page-item ${DisableNext}">
						      <a class="page-link" aria-label="Next" id="next" data-total="${TotalAyat}" data-surah="${DataSurah}" data-ayat="${LastData}" onClick="LastAyat(${DataSurah}, ${LastData})">
						        <span aria-hidden="true">&raquo;</span>
						      </a>
						    </li>

	                    </ul>
	                </nav>
	            </div>
			</div>
		`
		document.querySelector('.card-body').appendChild(rowEl).children

	}, (err) => {
		console.log("Error results : ", err)
	})

}