const NextAyat = (surah, ayat) => {
	document.querySelector('#loader').style.visibility="visible"
	document.querySelector('.card-header').innerHTML=''
	document.querySelector('.card-body').innerHTML=''
	document.querySelector('.card').style.visibility="hidden"
	
	const ayatNext = new AlQuran(QuranApi.proxy, QuranApi.url, QuranApi.req, surah, ayat)

	const displaySurah = new AlQuran(QuranApi.proxy, QuranApi.url, QuranApi.req, surah)


	displaySurah.getSelectAyat()
	.then(res => {
		const ViewSurah = res.data
			// console.log(ViewSurah)

			const headerEl = document.createElement('h4')
			const bodyEl = document.createElement('div')
			headerEl.textContent = `${ViewSurah.name.long} | Surah ${ViewSurah.name.transliteration.id} `
			bodyEl.innerHTML = `
				<h5 class="card-title">${ViewSurah.name.transliteration.id} (${ViewSurah.name.translation.id})</h5>
                <p class="card-text">${ViewSurah.tafsir.id}</p>
			`

			setTimeout(() => {
				document.querySelector('.card').style.visibility="visible"
				document.querySelector('.card-header').appendChild(headerEl)
				document.querySelector('.card-body').appendChild(bodyEl)
				document.querySelector('#loader').style.visibility="hidden"
			}, 1500)

	}).catch(err => {
		console.log('Results errors : ', err)
	})

	const Next = document.querySelector('.card-body').children
	for(let i = 0; i < Next.length; i++){
		Next[i].innerHTML=''
	}

	ayatNext.getReadAyat(ayatNext.proxy, ayatNext.url, ayatNext.param, ayatNext.data, ayatNext.id, res => {

		const ReadAyat = JSON.parse(res)

		const Indexes = ReadAyat.data


		// console.log(Indexes)

		const Disabled = (Indexes.number.inSurah == 1) ? 'disabled' : ''
		const DisableTab = (Indexes.number.inSurah == 1) ? 'tabindex="-1" aria-disabled="true"' : ''
		const TotalAyat = Indexes.surah.numberOfVerses
		const NextData = (Indexes.number.inSurah >= TotalAyat) ? 1 : Indexes.number.inSurah + 1
		const DisableNext = (Indexes.number.inSurah >= TotalAyat) ? 'disabled' : ''
		const PrevData = (Indexes.number.inSurah != 1) ? Indexes.number.inSurah - 1 : ''

		const ActiveData = Indexes.number.inSurah
			

		const FirstData = Indexes.number.inSurah > 1 ? (ActiveData + 1) - ActiveData : ''

		const LastData = Indexes.number.inSurah > 1 ? (ActiveData - ActiveData)+TotalAyat : ''

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

				<div class="text-xs-center">
					<nav aria-label="Page navigation example">
	                    <ul class="pagination justify-content-center">

	                    	<li class="page-item ${Disabled}">
						      <a class="page-link" aria-label="Previous" id="prev" data-total="${TotalAyat}" data-surah="${surah}" data-ayat="${FirstData}" onClick="FirstAyat(${surah}, ${FirstData})">
						        <span aria-hidden="true">&laquo;</span>
						      </a>
						    </li>
	                    	<li class="page-item ${Disabled}">
						      <a class="page-link" ${DisableTab} id="prev" data-total="${TotalAyat}" data-surah="${surah}" data-ayat="${PrevData}" onClick="PrevAyat(${surah}, ${PrevData})">Previous</a>
						    </li>

						    <li class="page-item ${DisableNext}">
								<a class="page-link" data-total="${TotalAyat}" data-surah="${surah}" data-ayat="${NextData}" id="next" onClick="NextAyat(${surah}, ${NextData})">Next</a>
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
		document.querySelector('.card-body').appendChild(rowEl).children

	}, (err) => {
		console.log('Results errors : ', err)
	})
}

const LastAyat = (surah, ayat) => {
	document.querySelector('#loader').style.visibility="visible"
	document.querySelector('.card-header').innerHTML=''
	document.querySelector('.card-body').innerHTML=''
	document.querySelector('.card').style.visibility="hidden"
	
	const ayatLast = new AlQuran(QuranApi.proxy, QuranApi.url, QuranApi.req, surah, ayat)

	const displaySurah = new AlQuran(QuranApi.proxy, QuranApi.url, QuranApi.req, surah)

	displaySurah.getSelectAyat()
	.then(res => {
		const ViewSurah = res.data
			// console.log(ViewSurah)

			const headerEl = document.createElement('h4')
			const bodyEl = document.createElement('div')
			headerEl.textContent = `${ViewSurah.name.long} | Surah ${ViewSurah.name.transliteration.id} `
			bodyEl.innerHTML = `
				<h5 class="card-title">${ViewSurah.name.transliteration.id} (${ViewSurah.name.translation.id})</h5>
                <p class="card-text">${ViewSurah.tafsir.id}</p>
			`

			setTimeout(() => {
				document.querySelector('.card').style.visibility="visible"
				document.querySelector('.card-header').appendChild(headerEl)
				document.querySelector('.card-body').appendChild(bodyEl)
				document.querySelector('#loader').style.visibility="hidden"
			}, 1500)

	}).catch(err => {
		console.log('Results errors : ', err)
	})

	const Last = document.querySelector('.card-body').children
	for(let i = 0; i < Last.length; i++){
		Last[i].innerHTML=''
	}

	ayatLast.getReadAyat(ayatLast.proxy, ayatLast.url, ayatLast.param, ayatLast.data, ayatLast.id, res => {

		const ReadLastAyat = JSON.parse(res)

		const Indexes = ReadLastAyat.data

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

				<div class="text-xs-center">
					<nav aria-label="Page navigation example">
	                    <ul class="pagination justify-content-center">

	                    	<li class="page-item ${Disabled}">
						      <a class="page-link" aria-label="Previous" id="prev" data-total="${TotalAyat}" data-surah="${surah}" data-ayat="${FirstData}" onClick="FirstAyat(${surah}, ${FirstData})">
						        <span aria-hidden="true">&laquo;</span>
						      </a>
						    </li>
	                    	<li class="page-item ${Disabled}">
						      <a class="page-link" ${DisableTab} id="prev" data-total="${TotalAyat}" data-surah="${surah}" data-ayat="${PrevData}" onClick="PrevAyat(${surah}, ${PrevData})">Previous</a>
						    </li>

						    <li class="page-item ${DisableNext}">
								<a class="page-link" data-total="${TotalAyat}" data-surah="${surah}" data-ayat="${NextData}" id="next" onClick="NextAyat(${surah}, ${NextData})">Next</a>
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
		document.querySelector('.card-body').appendChild(rowEl).children

	}, (err) => {
		console.log('Results errors : ', err)
	})
} 


const PrevAyat = (surah, ayat) => {
	// console.log(`Dari method PrevAyat() : Surah - ${surah}, Ayat - ${ayat}`)

	document.querySelector('#loader').style.visibility="visible"
	document.querySelector('.card-header').innerHTML=''
	document.querySelector('.card-body').innerHTML=''
	document.querySelector('.card').style.visibility="hidden"
	
	const ayatPrev = new AlQuran(QuranApi.proxy, QuranApi.url, QuranApi.req, surah, ayat)

	const displaySurah = new AlQuran(QuranApi.proxy, QuranApi.url, QuranApi.req, surah)

	displaySurah.getSelectAyat()
	.then(res => {
		const ViewSurah = res.data
			// console.log(ViewSurah)

			const headerEl = document.createElement('h4')
			const bodyEl = document.createElement('div')
			headerEl.textContent = `${ViewSurah.name.long} | Surah ${ViewSurah.name.transliteration.id} `
			bodyEl.innerHTML = `
				<h5 class="card-title">${ViewSurah.name.transliteration.id} (${ViewSurah.name.translation.id})</h5>
                <p class="card-text">${ViewSurah.tafsir.id}</p>
			`

			setTimeout(() => {
				document.querySelector('.card').style.visibility="visible"
				document.querySelector('.card-header').appendChild(headerEl)
				document.querySelector('.card-body').appendChild(bodyEl)
				document.querySelector('#loader').style.visibility="hidden"
			}, 1500)

	}).catch(err => {
		console.log('Results errors : ', err)
	})

	const Prev = document.querySelector('.card-body').children
	for(let i = 0; i < Prev.length; i++){
		Prev[i].innerHTML=''
	}

	ayatPrev.getReadAyat(ayatPrev.proxy, ayatPrev.url, ayatPrev.param, ayatPrev.data, ayatPrev.id, res => {

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

				<div class="text-xs-center">
					<nav aria-label="Page navigation example">
	                    <ul class="pagination justify-content-center">

	                    	<li class="page-item ${Disabled}">
						      <a class="page-link" aria-label="Previous" id="prev" data-total="${TotalAyat}" data-surah="${surah}" data-ayat="${FirstData}" onClick="FirstAyat(${surah}, ${FirstData})">
						        <span aria-hidden="true">&laquo;</span>
						      </a>
						    </li>
	                    	<li class="page-item ${Disabled}">
						      <a class="page-link" ${DisableTab} id="prev" data-total="${TotalAyat}" data-surah="${surah}" data-ayat="${PrevData}" onClick="PrevAyat(${surah}, ${PrevData})">Previous</a>
						    </li>

						    <li class="page-item ${DisableNext}">
								<a class="page-link" data-total="${TotalAyat}" data-surah="${surah}" data-ayat="${NextData}" id="next" onClick="NextAyat(${surah}, ${NextData})">Next</a>
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
		document.querySelector('.card-body').appendChild(rowEl).children

	}, (err) => {
		console.log('Results errors : ', err)
	})
}

const FirstAyat = (surah, ayat) => {
	// console.log(`Dari button first ayat : Surah - ${surah}, AYat - ${ayat}`)
	document.querySelector('#loader').style.visibility="visible"
	document.querySelector('.card-header').innerHTML=''
	document.querySelector('.card-body').innerHTML=''
	document.querySelector('.card').style.visibility="hidden"
	
	const ayatFirst = new AlQuran(QuranApi.proxy, QuranApi.url, QuranApi.req, surah, ayat)

	const displaySurah = new AlQuran(QuranApi.proxy, QuranApi.url, QuranApi.req, surah)

	displaySurah.getSelectAyat()
	.then(res => {
		const ViewSurah = res.data
			// console.log(ViewSurah)

			const headerEl = document.createElement('h4')
			const bodyEl = document.createElement('div')
			headerEl.textContent = `${ViewSurah.name.long} | Surah ${ViewSurah.name.transliteration.id} `
			bodyEl.innerHTML = `
				<h5 class="card-title">${ViewSurah.name.transliteration.id} (${ViewSurah.name.translation.id})</h5>
                <p class="card-text">${ViewSurah.tafsir.id}</p>
			`

			setTimeout(() => {
				document.querySelector('.card').style.visibility="visible"
				document.querySelector('.card-header').appendChild(headerEl)
				document.querySelector('.card-body').appendChild(bodyEl)
				document.querySelector('#loader').style.visibility="hidden"
			}, 1500)

	}).catch(err => {
		console.log('Results errors : ', err)
	})

	const First = document.querySelector('.card-body').children
	for(let i = 0; i < First.length; i++){
		First[i].innerHTML=''
	}

	ayatFirst.getReadAyat(ayatFirst.proxy, ayatFirst.url, ayatFirst.param, ayatFirst.data, ayatFirst.id, res => {

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

				<div class="text-xs-center">
					<nav aria-label="Page navigation example">
	                    <ul class="pagination justify-content-center">

	                    	<li class="page-item ${Disabled}">
						      <a class="page-link" aria-label="Previous" id="prev" data-total="${TotalAyat}" data-surah="${surah}" data-ayat="${FirstData}" onClick="FirstAyat(${surah}, ${FirstData})">
						        <span aria-hidden="true">&laquo;</span>
						      </a>
						    </li>
	                    	<li class="page-item ${Disabled}">
						      <a class="page-link" ${DisableTab} id="prev" data-total="${TotalAyat}" data-surah="${surah}" data-ayat="${PrevData}" onClick="PrevAyat(${surah}, ${PrevData})">Previous</a>
						    </li>

						    <li class="page-item ${DisableNext}">
								<a class="page-link" data-total="${TotalAyat}" data-surah="${surah}" data-ayat="${NextData}" id="next" onClick="NextAyat(${surah}, ${NextData})">Next</a>
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
		document.querySelector('.card-body').appendChild(rowEl).children

	}, (err) => {
		console.log('Results errors : ', err)
	})
}