const myAudio = document.querySelector('#myAudio');
function playAudio(){
	myAudio.play();
}

function pauseAudio(){
	myAudio.pause()
}
	

$(document).ready(function(){
// 	$('myAudio').removeAttr('autoplay');
	$('.day-text').hide();
	$(window).scroll(function(){
		if($(this).scrollTop() > 300){
			console.log("down");
			$('.mode-label').css({
				'position':'fixed',
				'display': 'inline-block',
				'margin-top': '7rem',
				'margin-left': '-3.7rem',
				'font-size': '3rem',
				'z-index': '1'
			})
			$('#text-mode').css({
				'position':'fixed',
				'display': 'inline-block',
				'margin-top': '11rem',
				'margin-left': '-3.5rem',
				'z-index':'1',
				'transform': 'rotate(90deg)'
			})
		}else{
			console.log("top");
			$('.mode-label').css({
				'position': '',
				'display':'',
				'margin-top':'',
				'margin-left': '',
				'font-size': '',
				'z-index':'1'
			})
			$('#text-mode').css({
				'position':'',
				'display': '',
				'margin-top': '',
				'margin-left': '',
				'z-index':'1',
				'transform': ''
			})
			$('.mode-label').show('slow').fadeIn(1000);
		}
	})
	
	$('#night-mode').hide();

	$('input[type=checkbox][name=day]').on('click',  function(){

		$('.day-text').show('slow');
		$('.night-text').hide('slow');

		$('#myAudio').attr('autoplay');
		$('#myAudio').attr('loop', 'true');
		
		playAudio();
			
		Swal.fire({
			position: 'top-end',
		  	icon: 'success',
		  	title: 'Good Night',
		  	html: '<h1>🌒</h1>',
		  	showConfirmButton: false,
		  	timer: 1500
		});


		const dayMode = $(this).attr('id');

		$('#day-mode').hide('slow').slideUp(1000);

		$('#night-mode').show('slow').fadeIn(1000);

		$('body').attr('data-theme', 'dark');
		$('nav').removeClass('bg-white');
		$('nav').addClass('bg-dark');

		$('#anjing').css({
			'color': 'mediumseagreen!important'
		});
		$('.nav-link').css({
			'color': '#FFFACD',
		})
		$(".nav-link").hover(function(e) { 
   			 $(this).css("background-color",e.type === "mouseenter"?"#FECD0F":"transparent") 
		})

		$('.jumbotron').removeClass('bg-white');
		$('.jumbotron').addClass('bg-dark');
		$('.article-headline').css({
			'color':'#FFFACD',
		})

		$('footer').removeClass('bg-white');
		$('footer').addClass('bg-dark');
		$('span').css({
			'color': '#FFFACD',
		})
		$('a').css('color','#FFFACD');
	
		$('input[name=day]').prop('checked', false);
	})

	$('input[type=checkbox][name=night]').on('click',  function(){
		$('.night-text').show('slow');
		$('.night-text').css({
			'color': '#FFEACD'
		});

		$('#text-mode').show('slow');

		$('.day-text').hide('slow');

		$('#myAudio').removeAttr('autoplay');
		$('#myAudio').removeAttr('loop');
		pauseAudio();
		
		Swal.fire({
			position: 'top-end',
		  	icon: 'success',
		  	title: 'Good Morning',
		  	html: '<h1>🌤</h1>',
		  	showConfirmButton: false,
		  	timer: 1500
		});

		const nightMode = $(this).attr('id');
		$('#night-mode').hide('slow').slideUp(1000);
		$('#day-mode').show('slow').fadeIn(1000);

		$('body').attr('data-theme', 'day');
		$('nav').removeClass('bg-dark');
		$('nav').addClass('bg-white');


		$('#anjing').css({
			'color':'mediumseagreen!important'
		});
		$('.nav-link').css({
			'color': '#FFFACD',
		})
		$(".nav-link").hover(function(e) { 
   			$(this).css("background-color",e.type === "mouseenter"?"lemonchiffon":"transparent") 
		})


		$('.jumbotron').removeClass('bg-dark');
		$('.jumbotron').addClass('bg-white');
		$('.article-headline').css({
			'color':'#000',
		})

		$('footer').removeClass('bg-dark');
		$('footer').addClass('bg-white');
		$('span').css({
			'color': '#000',
		})
		$('a').css('color','#000');

		$('input[name=night]').prop('checked', false);
	})

})
