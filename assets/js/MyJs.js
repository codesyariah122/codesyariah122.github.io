function askYou(url){
	const baseUrl = url+"/myrooms";

	if(location.href === baseUrl){
		$('#MyModal').modal({
			show: true,
			backdrop: 'static', 
			keyboard: false
		})
		$('.close').hide();

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
				}else if(tanya !== hasil){
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
					    document.location.href=url;
					  }else{
					  	document.location.href=url;
					  }
					})

				}else {
					Swal.fire({
						title: 'Error !',
						text: 'Anda tidak mengisi jawaban',
						icon: 'danger',
						confirmButtonText: 'Ok Bye ! ',
					}).then((result)=>{
						if(result.value){
							return tanya;
						}else{
							return tanya;
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