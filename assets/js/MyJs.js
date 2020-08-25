function askYou(url){
	const baseUrl = url+"/myrooms";

	if(location.href === baseUrl){
		$('#MyModal').modal({
			show: true,
			backdrop: 'static', 
			keyboard: false
		})
		$('.close').hide();
		// document.querySelector('.close').style.display = "none";

		const submit = document.querySelector('#submit');
		submit.addEventListener('click', function(e){
			const tanya = document.querySelector('input[name=ask]').value;
			let hasil = Math.ceil(0.15 * 29 / 100);

				if(tanya == hasil ){
					Swal.fire({
					  position: 'top-end',
					  icon: 'success',
					  title: 'Jawaban anda benar. Welcome in My Rooms',
					  showConfirmButton: false,
					  timer: 1500
					})
					tanya.value="";
					$('#MyModal').modal('hide');
					// document.location.href=url;
				}else{
					Swal.fire({
					  title: 'No ! ',
					  text: "Maaf jawaban anda salah",
					  icon: 'warning',
					  showCancelButton: false,
					  confirmButtonColor: '#3085d6',
					  cancelButtonColor: '#d33',
					  confirmButtonText: 'Ok bye ... !'
					}).then((result) => {
					  if (result.value) {
					  	Swal.fire('Ulangi yah !');
					  	document.querySelector('input[name=ask]').value='';
					  	$('#MyModal').modal('show');
					  }
					})

				}

		})
		// let tanya = parseInt(prompt("Jawab Pertanyaan Berikut : \n0.15 * 29 / 100 = ? "));
		// let hasil = Math.ceil(0.15 * 29 / 100);


	}else{
		return 0;
	}
}