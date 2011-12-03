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

				//TODO - I wonder if this is going to be really slow?
				//maybe do this on interval or something? 
				var shadow_opacity	= 1 - (Math.abs(touch_percent))/100;
				$shadow.css({ 'opacity' : shadow_opacity });
			}
		});
		
		$handle.bind('touchend', function(e){
			$nav.addClass('animate');
			$shadow.addClass('animate');
			
			if(touch_percent > -50) {
				setTimeout(function(){ 
					$nav.css({ '-webkit-transform' : 'translateX(0%)' });
					$shadow.css({ 'opacity' : '1' });
				});
				is_open = 1;
			} else {
				setTimeout(function(){ 
					$nav.css({ '-webkit-transform' : 'translateX(-97%)' }); });
					$shadow.css({ 'opacity' : '0' });
				is_open = 0;
			}
			
			setTimeout(function(){ 
				$nav.removeClass('animate'); 
				$shadow.removeClass('animate'); 
			}, 300);
		});
	};
	
	var $body = $('body');
	if($.os.ios){
		$body.addClass('ios');
	} else if($.os.android){
		$body.addClass('android');
	}	else {
		$body.addClass('desktop');
	}

	if($.os.ios){
		eventer.click = 'touchend';
	} else {
		eventer.click = 'click';
	}
	
	var nav = new Navigation();	
	//TODO build object should be in here. or I should have a way to call it.
	//how am I planning on switching between application functions? eg builder, my recipes, etc
	window.builder = new Builder();
};

$(function(){ var my_app = new app(); });
var eventer = {}
