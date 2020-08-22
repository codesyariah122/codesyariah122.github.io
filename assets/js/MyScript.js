$(document).ready(function(){
// 	$('myAudio').removeAttr('autoplay');
	
	$(window).scroll(function(){
		if($(this).scrollTop() > 300){
			console.log("down");
			$('.mode-label').css({
				'position':'fixed',
				'display': 'inline-block',
				'margin-top': '7rem',
				'margin-left': '-1.2rem',
				'font-size': '3rem',
				'z-index': '1'
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
			$('.mode-label').show('slow').fadeIn(1000);
		}
	})
	
	$('#night-mode').hide();

		$('input[type=checkbox][name=day]').on('click',  function(){
		
		$('myAudio').attr('autoplay', 'true');
			
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
		
		$('myAudio').stop(true);
		$('myAudio').removeAttr('autoplay');
		
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
