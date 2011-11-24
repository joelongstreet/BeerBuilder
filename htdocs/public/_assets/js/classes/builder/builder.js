var Builder = function(){
	
	//TODO - builder should be a model. remove all references to the
	//global window.builder object
	
	//-----------------------------------------//
	var self 			= this;
	var all_grains		= new Grains();
	var all_hops		= new Hops();
	var all_yeasts		= new Yeasts();
	var all_styles		= new BeerStyles();
	this.new_recipe	= new Recipe();
	
	all_grains.fetch();
	all_hops.fetch();
	all_yeasts.fetch();
	all_styles.fetch({
		success : function(data){
			all_styles.build_options();
		}
	});
	//-----------------------------------------//
	
	

	//-----------------------------------------//
	var all_sections = $('section#content').find('section.steps').find('section.step');
	
	
	//--- Step 1 : Setup ---//
	//TODO - this is gross. check out step 5: fermentation
	var the_date = new Date();
	var todays_date = the_date.getFullYear() + '-' + the_date.getMonth() + '-' + the_date.getDate();
	this.new_recipe.set({'date_brewed' : todays_date });
	$(all_sections[0]).find('input[type=date]').val(todays_date);
	$(all_sections[0]).find('#beer_name_input')[0].addEventListener('keyup', function(){
		$('h1#beer_name').text($(this).val());
	});
	$(all_sections[0]).find('input[type=range]').each(function(){
		$(this)[0].addEventListener('change', function(){
			$(this).prev().val($(this).val());
		});
	});
	$(all_sections[0]).find('input.has_range').each(function(){
		$(this)[0].addEventListener('keyup', function(){
			$(this).next().val($(this).val());
		});
	});
	//TODO - durr, is this the best way to do this?
	$(all_sections[0]).find('input[type=date]')[0].addEventListener('mouseup', function(){
		var current_date = $(this).val();
		self.new_recipe.set({'date_brewed' : current_date });
	});
	$(all_sections[0]).find('input[type=date]')[0].addEventListener('keyup', function(){
		var current_date = $(this).val();
		self.new_recipe.set({'date_brewed' : current_date });
	});
	//--- ---//


	//--- Step 2 : Grist ---//
	$(all_sections[1]).find('.add_grain')[0].addEventListener('click', function(e){

		var new_grain = new Recipe_Grain({
			'grain_list' 	: all_grains,
			'parent_view'	: $(all_sections[1])
		});
		
		self.new_recipe.grain_bill.add(new_grain);

		e.preventDefault();
	});
	//--- ---//


	//--- Step 3 : Hops ---//
	$(all_sections[2]).find('.add_hop')[0].addEventListener('click', function(e){

		var new_hop = new Recipe_Hop({
			'hop_list' 		: all_hops,
			'parent_view'	: $(all_sections[2])
		});

		self.new_recipe.hop_schedule.add(new_hop);
		
		e.preventDefault();
	});
	//--- ---//


	//--- Step 4 : Mash and Sparge ---//
	$(all_sections[3]).find('input[type=range]').each(function(){
		$(this)[0].addEventListener('change', function(){
			$(this).prev().val($(this).val());
		});
	});
	$(all_sections[3]).find('input').each(function(){
		$(this)[0].addEventListener('keyup', function(){
			$(this).next().val($(this).val());
		});
	});
	//--- ---//

	//--- Step 5 : Fermentation ---//
	$(all_sections[4]).find('.fermentation').each(function(i){
		var dom_element = $(this);
		init_fermentation(dom_element, i);
	});
	$(all_sections[4]).find('.add_fermentation')[0].addEventListener('click', function(){
		var duplicate 	= $(this).prev().html();
		var index		= $(all_sections[4]).find('.fermentation').length();
		
		init_fermentation(duplicate, index);
	});
	
	
	function init_fermentation(dom_element, i){
		var $fermentation = dom_element;
		var $range			= $fermentation.find('input[type=range]');
		var $text			= $fermentation.find('input[type=text]');
		var $date			= $fermentation.find('input[type=date]');
		
		$range[0].addEventListener('change', function(){
			$text.val($(this).val());
		});
		$text[0].addEventListener('keyup', function(){
			$range.val($(this).val());
			calc_date();
		});
		
		$range[0].addEventListener('mouseup', calc_date);
		$date[0].addEventListener('mouseup', calc_days);
		$date[0].addEventListener('keyup', calc_days);
		
		function calc_days(){
			var days = subtract_from_date(get_date_from(), $date.val())
			if(days != NaN){
				$text.val(days);
				$range.val(days)
			}
		}
		
		function calc_date(){
			var days_to_add	= $text.val();
			var new_date		= add_to_date(get_date_from(), days_to_add);
			$date.val(new_date);
		}
		
		function get_date_from(){
			var date_from = 0;
			if(i == 0){
				date_from = self.new_recipe.get('date_brewed');
			} else{
				date_from = $fermentation.prev().find('input[type=date]').val();
			}

			return date_from;
		}
	}
	
	//--- ---//
	
	
	//--- Step 6 : Finishing ---//
	$(all_sections[5]).find('input[type=range]').each(function(){
		$(this)[0].addEventListener('change', function(){
			$(this).prev().val($(this).val());
		});
	});
	$(all_sections[5]).find('input').each(function(){
		$(this)[0].addEventListener('keyup', function(){
			$(this).next().val($(this).val());
		});
	});
	//--- ---//

	
	//-----------------------------------------//
	
	
	//-----------------------------------------//
	var BeerCharacterSlider = function(){
		var $content 		= $('#beer_character');
		var $content_h		= parseInt($content.css('height'));
		var $wrap			= $content.find('.wrap');
		var $handle			= $content.find('.handle');

		var touch_start	= 0;
		var touch_percent	= 0;
		var is_open			= 1;
		var min_percent	= 25;
		
		$handle.bind('touchstart', function(e){
			touch_start = e.pageY;
			if(is_open == 0){
				$content.addClass('animate');
				setTimeout(function(){
					$content.css({ 'height' : $content_h });
				});
			}
		});
		
		$handle.bind('touchmove', function(e){
			e.preventDefault();
			if(is_open == 1){
				touch_percent = 100 - (((touch_start - e.pageY)/$content_h)*100);
			} else{
				touch_percent = (((e.pageY - touch_start)/$content_h)*100) + min_percent;
			}

			if(touch_percent > min_percent && touch_percent < 100){
				var new_height = touch_percent + '%';
				$wrap.css({ 'height' : new_height });
			}
		});

		$handle.bind('touchend', function(e){
			$content.addClass('animate');
			$wrap.addClass('animate');

			if(touch_percent > 50) {
				setTimeout(function(){
					$content.css({ 'height' : $content_h });
					$wrap.css({ 'height' : '100%' });
					is_open = 1;
				});
			} else {
				setTimeout(function(){ 
					var min = min_percent + '%';
					$content.css({ 'height' : '30px' });
					$wrap.css({ 'height' : min });
					is_open = 0;
				});
			}

			setTimeout(function(){ 
				$content.removeClass('animate');
				$wrap.removeClass('animate');
			}, 300);
		});
	};
	//-----------------------------------------//

	
	
	//-----------------------------------------//
	var Navigation = function(){
		
		var nav_self			= this;
		
		var $nav 				= $('nav#steps ul li');
		var $section			= $('section.steps');
		var $steps				= $section.children('section.step');
		
		var last_page 			= $nav.length - 2;
		var current_page 		= 1;
		var next_page			= 0;

		$steps.eq(current_page-1).addClass('animate');
		
		$nav.each(function(){
			$(this)[0].addEventListener('click', function(){
				var index = $nav.index($(this));
				if(index == current_page){
					return false;
				} else {
					if(index == 0){
						nav_self.go_to_prev_page();
					} else if(index == $nav.length - 1){
						nav_self.go_to_next_page();
					} else{
						next_page = index;
						nav_self.change_pages();
					}
				}
			});
		});
		
		this.go_to_next_page = function(){
			if(current_page < last_page){
				next_page = current_page + 1;
				nav_self.change_pages();
			}
		};
		
		this.go_to_prev_page = function(){
			if(current_page > 1){
				next_page = current_page - 1;
				nav_self.change_pages();
			}
			
		};
		
		this.change_pages = function(){
			
			//TODO - Jesus, Mary, and Joseph. What have I done here...
			var next = next_page - 1;
			var curr = current_page - 1;

			if(next > curr){
				$steps.eq(next).addClass('right');
				$steps.eq(curr).addClass('left');
			} else{
				$steps.eq(next).addClass('left');
				$steps.eq(curr).addClass('right');
			}

			setTimeout(function(){
				$steps.eq(next).addClass('animate');
				$steps.eq(curr).addClass('animate');
			});

			setTimeout(function(){
				$steps.eq(next).removeClass('left right');
				$steps.eq(next).addClass('active');
			});
			
			setTimeout(function(){
				$steps.eq(curr).removeClass('right left active animate');
			}, 1000);
			//say 5 hail mary's for this portion of the code
			
			$nav.eq(next_page).addClass('active');
			$nav.eq(current_page).removeClass('active');
			
			current_page = next_page;
		};
	};
	//-----------------------------------------//


	
	//-----------------------------------------//
	var nav = new Navigation();
	var bcs = new BeerCharacterSlider();
	$('section.steps').swipeLeft(function(){ nav.go_to_next_page(); });
	$('section.steps').swipeRight(function(){ nav.go_to_prev_page(); });
	//-----------------------------------------//


};