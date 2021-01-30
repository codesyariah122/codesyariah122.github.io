const quran = (req, data) => {
	ObjData.loader.show('slow').fadeIn(1000);
	ObjData.hasil.html('');
	ObjData.Error.html('');
	ObjData.ViewAyat.html('');
	ObjData.Pagination.html('');

	$.ajax({
		url: `${req}${data}`,
		type: 'get',
		dataType: 'json',
		data: data,
		success: function(res){
			ObjData.selectSurah.val('choose');

			const namaArb = res.data.name.long;
			const namaId = res.data.name.transliteration.id;
			const tafsir = res.data.tafsir.id;

			ObjData.hasil.append(`
				<h2>${namaArb} | Surah ${namaId}</h2>
				<blockquote class="text-justify">${tafsir}</blockquote>
				<button id="view-ayat" class="btn btn-outline-primary" data-id=${data}>View Ayat</button>
				</div>
			`)
		},
		complete: function(){
			ObjData.loader.hide('slow').slideUp(1000);
		}
	});
}

const viewAyat = (req, numberSurah) => {
	ObjData.loaderDua.show('slow').fadeIn(1000);

	$.ajax({
		url: `${req}${numberSurah}`,
		type: 'get',
		dataType: 'json',
		data: numberSurah,
		success: function(res){
			const SetFirst = res.data.verses[0];
			const SetTotal = SetFirst.numberOfVerses;
			const disable = (SetFirst.number.inSurah == 1) ? 'disabled' : '';
			const disableTab = (SetFirst.number.inSurah == 1) ? 'tabindex="-1" aria-disabled="true"' : '';

			// console.log(SetFirst);

			ObjData.Pagination.append(`
				<li class="page-item ${disable}">
			      <a class="page-link" ${disableTab} id="prev">Previous</a>
			    </li>
			`);

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
			`);

		},
		complete: function(){
			ObjData.loaderDua.hide('slow').fadeOut(1000);
		}
	});
}

const ReadAyat = (res, totalAyat, numberSurah, ayat) => {
	const data = {
		'surah': numberSurah,
		'ayat': ayat
	}

	// alert(data.ayat);

	ObjData.ViewAyat.html('');
	ObjData.Pagination.html('');
	ObjData.loaderDua.show('slow').fadeIn(1000);

	$.ajax({
		url: `${ObjData.api.quran}${data.surah}/${data.ayat}`,
		type: 'get',
		dataType: 'json',
		data: data,
		success: function(res){
			const SetFirst = res.data;
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

		}, 
		complete: function(){
			ObjData.loaderDua.hide('slow').fadeOut(1000);
		}
	})
}


const SelectSurah = (req, data) => {
	$.ajax({
		url: `${req}/${data}`,
		type: 'get',
		dataType: 'json',
		data: data,
		success: function(res){
			
			const DataSurah = res.data;

			ObjData.selectSurah.append(`
				<option value="choose" selected>Choose...</option>
			`)

			DataSurah.map(key =>{
				ObjData.selectSurah.append(`
					<option id="pilih" value="${key.number}">${key.name.transliteration.id}</option>
				`)
			})
		}
	})
}

