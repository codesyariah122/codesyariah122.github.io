const ViewAyat = (surah, ayat) => {
	// console.log(`Dari view surah : Surah - ${surah}, Ayat - ${ayat}`)
	document.querySelector('#loader').style.visibility="visible"
	document.querySelector('.card-header').innerHTML=''
	document.querySelector('.card-body').innerHTML=''
	document.querySelector('.card').style.visibility="hidden"	

	const GetAyatView = new AlQuran(QuranApi.proxy, QuranApi.url, QuranApi.req, surah, ayat)

	GetAyatView.getSurahAyat()
	.then( res => {
		// console.log(res)
		const Indexes = res.data

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
	}).catch(err => {
		console.log('Results error : ', err)
	})



	const displaySurah = new AlQuran(QuranApi.proxy, QuranApi.url, QuranApi.req, surah)

	displaySurah.getSelectAyat()
	.then(res => {
		const DisplaySurah = res.data
			// console.log(ViewSurah)

			const headerEl = document.createElement('h4')
			const bodyEl = document.createElement('div')
			headerEl.textContent = `${DisplaySurah.name.long} | Surah ${DisplaySurah.name.transliteration.id} `
			bodyEl.innerHTML = `
				<h5 class="card-title">${DisplaySurah.name.transliteration.id} (${DisplaySurah.name.translation.id})</h5>
                <p class="card-text">${DisplaySurah.tafsir.id}</p>
			`

			setTimeout(() => {
				document.querySelector('.card').style.visibility="visible"
				document.querySelector('.card-header').appendChild(headerEl)
				document.querySelector('.card-body').appendChild(bodyEl)
				document.querySelector('#loader').style.visibility="hidden"
			}, 1500)
	}).catch(err => {
		console.log('Results error : ', err)
	})

	const viewReadAyat = document.querySelector('.card-body').children
	for(let i = 0; i < viewReadAyat.length; i++){
		viewReadAyat[i].innerHTML=''
	}

}

