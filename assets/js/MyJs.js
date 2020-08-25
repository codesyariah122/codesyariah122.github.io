// Author : pujiermanto
// company : Codesyariah
// update : 25 august 2020
// No Fruity for Today
function playSound(audio){
	audio.play();
}

function pauseSound(audio){
	audio.pause()
}

function askYou(url){
	const baseUrl = url+"/myrooms";
	
	if(location.href === baseUrl){
		$('#MyModal').modal({
			show: true,
			backdrop: 'static', 
			keyboard: false
		})
		$('.close').hide();
		
		$(document).ready(function() {
		  $('#MyModal').on('shown.bs.modal', function() {
		    $('#jawaban').trigger('focus');
		  });
		});
		// document.querySelector('.close').style.display = "none";

		const submit = document.querySelector('#submit');
		submit.addEventListener('click', function(e){
			const tanya = document.querySelector('input[name=ask]').value;
			let hasil = Math.ceil(0.15 * 29 / 100);

				if(tanya == hasil ){
					document.querySelector('input[name=ask]').value='';
					Swal.fire({
					  position: 'top-end',
					  icon: 'success',
					  title: 'Jawaban anda benar. Welcome in My Rooms <br/>🎉🎇🎁',
					  showConfirmButton: false,
					  timer: 1500
					})
					let myAudio = document.querySelector('#crowded');

					playSound(myAudio);
					setTimeout(function(){
						pauseSound(myAudio);
					}, 1500)
					$('#MyModal').modal('hide');
					// document.location.href=url;
				}else{
					let myAudio = document.querySelector('#booring');

					playSound(myAudio);
					setTimeout(function(){
						pauseSound(myAudio);
					}, 1500)

					Swal.fire({
					  title: 'No ! ',
					  text: "Maaf jawaban anda salah 🧠",
					  icon: 'warning',
					  showCancelButton: true,
					  confirmButtonColor: '#3085d6',
					  cancelButtonColor: '#d33',
					  confirmButtonText: 'Ulangi 🚀',
					  cancelButtonText: 'Tinggalkan 📚'
					}).then((result) => {
					  if (result.value) {
					  	Swal.fire('Ulangi yah ! 🎮');
					  	document.querySelector('input[name=ask]').value='';
					  	$('#MyModal').modal('show');

					  	$(document).ready(function() {
						  $('#MyModal').on('shown.bs.modal', function() {
						    $('#jawaban').trigger('focus');
						  });
						});

					  }else{
					  	Swal.fire('Byee ! ');
					  	document.location.href=url;
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