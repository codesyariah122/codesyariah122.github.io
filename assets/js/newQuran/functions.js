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

						<div class="text-xs-center mt-2">
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