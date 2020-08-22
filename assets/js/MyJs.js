function askYou(url){
	const baseUrl = url+"/myrooms";

	if(location.href === baseUrl){
		let tanya = parseInt(prompt("0.15 * 29 / 100 = ? "));
		let hasil = Math.ceil(0.15 * 29 / 100)
		if(tanya == hasil ){
			Swal.fire({
			  position: 'top-end',
			  icon: 'success',
			  title: 'Jawaban anda benar. Welcome in My Rooms',
			  showConfirmButton: false,
			  timer: 1500
			})
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
			    document.location.href=url;
			  }
			})

		}
	}else{
		return 0;
	}
}