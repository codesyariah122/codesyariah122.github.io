$(document).ready(function(){
	$('#day-mode').hide();

	$('input[type=checkbox][name=night]').on('click',  function(){

		Swal.fire('Welcome in Night Mode');

		const nightMode = $(this).attr('id');
		$('#night-mode').hide('slow').slideUp(1000);
		$('#day-mode').show('slow').fadeIn(1000);

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
		$('input[name=night]').prop('checked', false);
	})

	$('input[type=checkbox][name=day]').on('click',  function(){
		Swal.fire('Goodbye ! Night Mode');

		const dayMode = $(this).attr('id');

		$('#day-mode').hide('slow').slideUp(1000);
		$('#night-mode').show('slow').fadeIn(1000);

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

		$('input[name=day]').prop('checked', false);
	})

})