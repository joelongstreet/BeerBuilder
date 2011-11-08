var Builder = function(){	
	
	//TODO - builder should be a model. remove all references to the
	//global window.builder object

	//-----------------------------------------//
	var all_sections = $('section#content').find('section.steps').find('section.step');
	
	
	//--- Step 1 : Setup ---//
	//--- ---//

	
	//--- Step 2 : Grist ---//
	$(all_sections[1]).find('.add_grain')[0].addEventListener('click', function(){

		var new_grain = new Recipe_Grain({
			'grain_list' 	: all_grains,
			'parent_view'	: $(all_sections[1])
		});
		
		self.new_recipe.grain_bill.add(new_grain);
	});
	//--- ---//


	//--- Step 3 : Hops ---//
	$(all_sections[2]).find('.add_hop')[0].addEventListener('click', function(){

		var new_hop = new Recipe_Hop({
			'hop_list' 		: all_hops,
			'parent_view'	: $(all_sections[2])
		});

		self.new_recipe.hop_schedule.add(new_hop);
	});
	//--- ---//


	//--- Step 4 : Mash and Sparge ---//
	//--- ---//
	
	
	//--- Step 5 : Yeast ---//
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
					nav_self.$steps.eq(nav_self.current_page - 1).addClass('active');
				}

			});
		});
	};
	//-----------------------------------------//


	
	//-----------------------------------------//
	var self 		= this;
	var nav			= new Navigation();
	
	var all_grains = new Grains();
	var all_hops 	= new Hops();
	var all_yeasts	= new Yeasts();
	
	all_grains.fetch();
	all_hops.fetch();
	all_yeasts.fetch();
	
	this.new_recipe = new Recipe();
	//-----------------------------------------//
};


$(function(){ window.builder = new Builder(); });