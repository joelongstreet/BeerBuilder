var app = function(){
	
	var Navigation = function(){
		var $nav		= $('nav#main');
		var $shadow = $('div#nav_shadow');
		var $handle = $nav.find('.handle');
		
		$handle.bind('click', function(){
			$nav.toggleClass('open');
			$shadow.toggleClass('on');
		});
	};
	
	var nav = new Navigation();
	
	//TODO build object should be in here. or I should have a way to call it.
	//how am I planning on switching between application functions? eg builder, my recipes, etc
	window.builder = new Builder();
};

$(function(){ var my_app = new app(); });