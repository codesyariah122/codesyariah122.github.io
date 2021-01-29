$(document).ready(function(){
	ObjData.loader.hide();
	ObjData.loaderDua.hide();
	ObjData.selectSurah.append(`
		<option value="choose">choose ...</option>
	`)
	
	SelectSurah(ObjData.api.quran)
	.then(res=>{
		const DataSurah = res.data
		const option = ObjData.selectElementFetch.createOptionElement
		const select = ObjData.selectElementFetch.selectorId

		DataSurah.forEach(result => {
			ObjData.selectSurah.append(`
				<option value="${result.number}">${result.name.transliteration.id}</option>
			`)
		})
	}).catch(err => {
		console.log("Error fetch ", err)
	})
	
	ObjData.pilihSurah.on('click', function(){
		const surahData = ObjData.selectSurah.val();

		if(surahData == 'choose' || surahData == ''){
			ObjData.Error.html('');
			ObjData.hasil.html('');
			ObjData.ViewAyat.html('');
			ObjData.Pagination.html('');
			
			ObjData.Error.append(`
				<div class="alert alert-warning" role="alert">
				  Pilih Nama Surah Terlebih Dahulu
				</div>
			`).fadeIn(1000);
		}else{
			ObjData.selectSurah.val('choose')
			ObjData.Error.html('')

			ViewSurah(ObjData.api.proxy, ObjData.api.quran, surahData)
			.then(res => {
			const resData = res.data
			// console.log(resObjData)
			const allData = {
				namaArb: resData.name.long,
				namaId: resData.name.transliteration.id,
				tafsir: resData.tafsir.id
			}

			ObjData.hasil.append(`
				<h2>${allData.namaArb} | Surah ${allData.namaId}</h2>
				<blockquote class="text-justify">${allData.tafsir}</blockquote>
				<button id="view-ayat" class="btn btn-outline-primary" data-id="${surahData}">View Ayat</button>
			`)
			}).catch(err=>{
				console.log('Error fetching')
			})			
		}
	});

	ObjData.hasil.on('click', '#view-ayat', function(){
		const numberSurah = $(this).data('id');
		$(this).hide('slow').fadeOut(1000);

		ViewAyat(ObjData.api.proxy, ObjData.api.quran, numberSurah)
		.then(res => {
			const SetFirst = res.data.verses[0]
			const SetTotal = SetFirst.numberOfVerses
			const disable = SetFirst.number.inSurah == 1 ? 'disabled' : ''
			const disableTab = SetFirst.number.inSurah == 1 ? 'tabindex="-1" aria-disabled="true"' : ''

			ObjData.Pagination.append(`
				<li class="page-item ${disable}"> 
					<a class="page-link" ${disableTab} id="prev">Previous</a>
				</li>
			`)

			ObjData.ViewAyat.append(`
				<h1>${SetFirst.text.arab} . <span class="number-ayat">${SetFirst.number.inSurah}</span></h1>
				<p>${SetFirst.text.transliteration.en}</p>

					<audio controls>
						<source src="${SetFirst.audio.primary}" type="audio/mp3">
					</audio>

					<blockquote class="mb-5"> - ${SetFirst.translation.id}</blockquote>
			`)

			ObjData.Pagination.append(`
				<li class="page-item">
					<a class="page-link" data-total="${SetTotal}" data-surah="${numberSurah}" data-ayat="${SetFirst.number.inSurah + 1}" id="next">Next</a>
				</li>
			`)
		}).catch(err=>{
			console.log('Something when wrong', err)
		})

	});

	ObjData.Pagination.on('click', '#next', function(){
		const surah = $(this).data('surah');
		const ayat = $(this).data('ayat');
		const TotalAyat = $(this).data('total');

		ReadAyat(ObjData.api.quran, surah, ayat, results => {

			const res= JSON.parse(results)
			const SetFirst = res.data
			// console.log(SetFirst)
			const disabled = (SetFirst.number.inSurah == 1) ? 'disabled' : '';
				const disableTab = (SetFirst.number.inSurah == 1) ? 'tabindex="-1" aria-disabled="true"' : '';
				const SetTotal = SetFirst.surah.numberOfVerses;
				const NextData = (SetFirst.number.inSurah >= SetTotal) ? 1 : SetFirst.number.inSurah + 1;
				const DisableNext = (SetFirst.number.inSurah >= SetTotal) ? 'disabled' : '';
				const PrevData = (SetFirst.number.inSurah != 1) ? SetFirst.number.inSurah - 1 : '';

				// console.log(SetFirst);

				ObjData.Pagination.append(`
					<li class="page-item ${disabled}">
				      <a class="page-link" ${disableTab} id="prev" data-total="${SetTotal}" data-surah="${numberSurah}" data-ayat="${PrevData}">Previous</a>
				    </li>
				`);

				ObjData.ViewAyat.append(`
					<h1>${SetFirst.text.arab} . <span class="number-ayat">${SetFirst.number.inSurah}</span></h1>
					<p>${SetFirst.text.transliteration.en}</p>

						<audio controls>
							<source src="${SetFirst.audio.secondary[0]}" type="audio/mp3">
						</audio>

					<blockquote class="mb-5">- ${SetFirst.translation.id}</blockquote>
				`)

				ObjData.Pagination.append(`
					<li class="page-item ${DisableNext}">
						<a class="page-link" data-total="${SetTotal}" data-surah="${numberSurah}" data-ayat="${NextData}" id="next">Next</a>
					</li>
				`)

		}, () => {
			console.log("Results Error")
		})

	});

	ObjData.Pagination.on('click', '#prev', function(){
		const surah = $(this).data('surah');
		const ayat = $(this).data('ayat');
		const TotalAyat = $(this).data('total');

		ReadAyat(ObjData.api.quran, surah, ayat, results => {

			const res= JSON.parse(results)
			const SetFirst = res.data
			// console.log(SetFirst)
			const disabled = (SetFirst.number.inSurah == 1) ? 'disabled' : '';
				const disableTab = (SetFirst.number.inSurah == 1) ? 'tabindex="-1" aria-disabled="true"' : '';
				const SetTotal = SetFirst.surah.numberOfVerses;
				const NextData = (SetFirst.number.inSurah >= SetTotal) ? 1 : SetFirst.number.inSurah + 1;
				const DisableNext = (SetFirst.number.inSurah >= SetTotal) ? 'disabled' : '';
				const PrevData = (SetFirst.number.inSurah != 1) ? SetFirst.number.inSurah - 1 : '';

				// console.log(SetFirst);

				ObjData.Pagination.append(`
					<li class="page-item ${disabled}">
				      <a class="page-link" ${disableTab} id="prev" data-total="${SetTotal}" data-surah="${numberSurah}" data-ayat="${PrevData}">Previous</a>
				    </li>
				`);

				ObjData.ViewAyat.append(`
					<h1>${SetFirst.text.arab} . <span class="number-ayat">${SetFirst.number.inSurah}</span></h1>
					<p>${SetFirst.text.transliteration.en}</p>

						<audio controls>
							<source src="${SetFirst.audio.secondary[0]}" type="audio/mp3">
						</audio>

					<blockquote class="mb-5">- ${SetFirst.translation.id}</blockquote>
				`)

				ObjData.Pagination.append(`
					<li class="page-item ${DisableNext}">
						<a class="page-link" data-total="${SetTotal}" data-surah="${numberSurah}" data-ayat="${NextData}" id="next">Next</a>
					</li>
				`)

		}, () => {
			console.log("Results Error")
		})

	})
})
