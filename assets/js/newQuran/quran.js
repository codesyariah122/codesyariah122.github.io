$(document).ready(function(){
	ObjData.loader.hide();
	ObjData.loaderDua.hide();
	
	SelectSurah(ObjData.api.quranSelect, 'surah');
	
	ObjData.pilihSurah.on('click', function(){
		const surahData = ObjData.selectSurah.val();

		if(surahData == 'choose' || surahData == ''){
			ObjData.hasil.html('');
			ObjData.ViewAyat.html('');
			ObjData.Pagination.html('');
			
			ObjData.Error.append(`
				<div class="alert alert-warning" role="alert">
				  Pilih Nama Surah Terlebih Dahulu
				</div>
			`).fadeIn(1000);
		}else{
			quran(ObjData.api.quran, surahData);				
		}
	});



	ObjData.cari.on('click', function(){
		const surah = $('#number').val();

		if(surah == null || surah == ''){
			alert('Number surah belum di isi');
		}else{
			$('#number').val('');
			quran(ObjData.api.quran, surah);
		}		
	});

	ObjData.hasil.on('click', '#view-ayat', function(){
		const numberSurah = $(this).data('id');
		$(this).hide('slow').fadeOut(1000);
		viewAyat(ObjData.api.quran, numberSurah);
	});

	ObjData.Pagination.on('click', '#next', function(){
		const surah = $(this).data('surah');
		const ayat = $(this).data('ayat');
		const TotalAyat = $(this).data('total');

		ReadAyat(ObjData.api.quran, TotalAyat, surah, ayat);
	});

	ObjData.Pagination.on('click', '#prev', function(){
		const surah = $(this).data('surah');
		const ayat = $(this).data('ayat');
		const TotalAyat = $(this).data('total');

		ReadAyat(ObjData.api.quran, TotalAyat, surah, ayat)

	})
})