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
	$('#beer_character').find('.handle').bind('click', function(){
		$('#beer_character').toggleClass('closed');
	});
	//-----------------------------------------//

	
	
	//-----------------------------------------//
	var Navigation = function(){
		
		var nav_self		= this;
		
		this.$nav 			= $('nav#steps ul li');
		this.last_page 	= this.$nav.length - 2;
		this.current_page = 1;
		
		this.$section		= $('section.steps');
		this.$steps			= this.$section.children('section.step');
		
		this.$nav.each(function(){
			$(this)[0].addEventListener('click', function(){
				var index = nav_self.$nav.index($(this));
				
				if(index == nav_self.current_page){
					return false;
				} else {
					if(index == 0){
						if(nav_self.current_page > 1) nav_self.current_page--;
					} else if(index == nav_self.$nav.length - 1){
						if(nav_self.current_page < nav_self.last_page) nav_self.current_page++;
					} else{
						nav_self.current_page = index;
					}

					nav_self.$steps.removeClass('active');
					nav_self.$nav.removeClass('active');
					nav_self.$steps.eq(nav_self.current_page - 1).addClass('active');
					nav_self.$nav.eq(nav_self.current_page).addClass('active');
				}

			});
		});
	};
	//-----------------------------------------//


	
	//-----------------------------------------//
	var nav			= new Navigation();
	//-----------------------------------------//
	
	
};


$(function(){ window.builder = new Builder(); });