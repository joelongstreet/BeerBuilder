var app = function(){
	
	var Navigation = function(){
		var $nav		= $('nav#main');
		var $shadow = $('div#nav_shadow');
		var $handle = $nav.find('.handle');
		var $nav_w	= parseInt($nav.css('width'));

		var touch_start	= 0;
		var touch_percent	= 0;
		var is_open 		= 0;
		
		$handle.bind('touchstart', function(e){
			touch_start = e.pageX;
		});
		
		$handle.bind('touchmove', function(e){
			if(is_open == 0){
				touch_percent = -1*(100 - (((e.pageX - touch_start)/$nav_w)*100));
			} else{
				touch_percent = -1*(((touch_start - e.pageX)/$nav_w)*100);
			}

			if(touch_percent < 0 && touch_percent > -97){
				var translate_string = 'translateX(' + touch_percent + '%' + ')';
				$nav.css({ '-webkit-transform' : translate_string });	
			}
		});
		
		$handle.bind('touchend', function(e){
			$nav.addClass('animate');
			if(touch_percent > -50) {
				setTimeout(function(){ $nav.css({ '-webkit-transform' : 'translateX(0%)' }); });
				is_open = 1;
			} else {
				setTimeout(function(){ $nav.css({ '-webkit-transform' : 'translateX(-97%)' }); });
				is_open = 0;
			}
			
			setTimeout(function(){ $nav.removeClass('animate'); }, 300);
		});
	};
	
	var nav = new Navigation();
	
	//TODO build object should be in here. or I should have a way to call it.
	//how am I planning on switching between application functions? eg builder, my recipes, etc
	window.builder = new Builder();
};

$(function(){ var my_app = new app(); });