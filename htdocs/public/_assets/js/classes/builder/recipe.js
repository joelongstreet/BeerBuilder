var Recipe = Backbone.Model.extend({
	
	defaults : {
		name				: 'Duff Beer', //go to properties
		efficiency 		: 75, //go to properties
		final_volume	: 5, //go to properties
		ibu				: 0,
		og					: 0,
		fg					: 0,
		srm				: 0,
		srm_rgb			: 0,
		abv				: 0,
		gu_bu				: 0,
		attenuation 	: 75 //go to yeast
	},
	
	initialize : function(){
		var self = this;
		
		this.grain_bill	= new GrainBill();
		this.hop_schedule = new HopSchedule();
		this.properties	= new Properties();
		
		var $beer_attrs_wrap = $('#beer_attributes');
		var $beer_attr = {
			gu_bu 	: $beer_attrs_wrap.find('#gu_bu'),
			og			: $beer_attrs_wrap.find('#og'),
			fg			: $beer_attrs_wrap.find('#fg'),
			ibu		: $beer_attrs_wrap.find('#ibu'),
			abv		: $beer_attrs_wrap.find('#abv'),
			srm		: $beer_attrs_wrap.find('#srm'),
			srm_rgb	: $beer_attrs_wrap.find('#srm_panel').children('div')
		};
		
		//TODO this looks wierd, but i really only want to write to the dom if I have to.
		//there might be a better way to do this, I'm not entirely sure yet
		this.bind('change:gu_bu', function(){ $beer_attr.gu_bu.text(this.get('gu_bu')); });
		this.bind('change:og', function(){ $beer_attr.og.text(this.get('og')); });
		this.bind('change:fg', function(){ $beer_attr.fg.text(this.get('fg')); });
		this.bind('change:ibu', function(){ $beer_attr.ibu.text(this.get('ibu')); });
		this.bind('change:abv', function(){ $beer_attr.abv.text(this.get('abv')); });
		this.bind('change:srm', function(){ 
			$beer_attr.srm.text(this.get('srm'));
			$beer_attr.srm_rgb.css({
				'background-color' : 'rgb(' + this.get('srm_rgb') + ')'
			});
		});
	},
	
	calc_gravity : function(){
		
		var self = this;
		
		var new_gravity_units 	= 0;
		var new_srm					= 0;
		var new_srm_rgb			= 0;
		var new_weight				= 0;
		var volume					= parseFloat(this.get('final_volume'));
		var attenuation			= parseInt(this.get('attenuation'));
		
		_.each(this.grain_bill.models, function(grain){

			var gu 	= parseInt(grain.get('weight') * grain.get('gu_average'));
			if(grain.get('extract') != 1){ gu = gu * (self.get('efficiency')/100); }
			new_gravity_units += gu;
			
			var mcu	= parseInt(grain.get('weight') * grain.get('lovibond_avg'));
			new_srm += mcu;
			
			new_weight += parseInt(grain.get('weight'));
		});
		
		//color calculations
		if(new_weight != 0){
			new_srm = new_srm/volume;
			new_srm = 1.4922*(Math.pow(new_srm, .6859));
			new_srm = Math.round(new_srm*10)/10;
			if(new_srm > 40) {
				new_srm_rgb = "0,0,0";
			} else {
				//srm_lookup is a global variable within the utilities.js file
				new_srm_rgb = srm_lookup.getItem(new_srm);
				if(new_srm_rgb == undefined){
					new_srm_rgb = "255,255,255";
				}
			}
		}
		
		_.each(this.grain_bill.models, function(grain){			
			var new_proportion = grain.get('weight')/new_weight;
			if(new_weight == 0) new_proportion = 0;			
			grain.set({ proportion : new_proportion });
			grain.view.change_proportion();
		});
		
		var og_units = new_gravity_units/volume;
		var fg_units = (new_gravity_units * (attenuation/100))/volume ;
		
		var new_og	= 1 + og_units/1000;
		new_og = Math.round(new_og*10000)/10000;

		var new_fg	= 1 + fg_units/1000;
		new_fg = 1 + (new_og - new_fg);
		new_fg = Math.round(new_fg*10000)/10000;
		
		new_abv = 131*(new_og - new_fg);
		new_abv = Math.round(new_abv*100)/100;

		this.set({
			'og' 			: new_og,
			'srm'			: new_srm,
			'srm_rgb'	: new_srm_rgb,
			'fg' 			: new_fg,
			'abv'			: new_abv
		});
		
		this.calc_gu_bu();
	},
	
	calc_bitterness : function(){
		var self = this;
		var new_ibu = 0;
		
		var volume = parseFloat(self.get('final_volume'));
		
		_.each(this.hop_schedule.models, function(hop){
			var time = parseInt(hop.get('time'));
			var aa = parseFloat(hop.get('aa'));
			var weight = parseFloat(hop.get('weight'));
			
			//TODO - this is almost certainly wrong, at least not that accurate
			//i think i need to compare to a table, not a formula .... maybe?
			//uh, what. who farted? 
			var utilization = -1*(.0041 * Math.pow(time, 2)) + (.6261 * time) + 1.5779;
			var aau = weight * utilization * .7489 * aa;
			//

			new_ibu += aau;
		});
		
		new_ibu = new_ibu/volume
		new_ibu = Math.round(new_ibu);
		
		this.set({ 'ibu' : new_ibu });

		this.calc_gu_bu();
	},
	
	calc_gu_bu : function(){
		var ibu = parseInt(this.get('ibu'));
		var fgu = parseFloat(this.get('fg'));
		
		if(ibu == 0) ibu = 1;
		
		fgu == 0 ? fgu = 1 : fgu = (fgu - 1)*1000
		
		this.set({ 'gu_bu' : Math.round(fgu/ibu*1000)/1000 });
		
		if(this.proto){ this.compare_to_bjcp(); }

	},
	
	compare_to_bjcp : function(){
		//TODO - I wonder if all this "getting" will make it run slow. Change this if it's running slow
		//TODO - this seems wrong to me. gotta be a better way to do this.
		if(this.get('og') > this.proto.get('og_hi') || this.get('og') < this.proto.get('og_lo')){
			$('#og').addClass('issue');
		} else{
			$('#og').removeClass('issue');
		}
		if(this.get('fg') > this.proto.get('fg_hi') || this.get('fg') < this.proto.get('fg_lo')){
			$('#fg').addClass('issue');
		} else{
			$('#fg').removeClass('issue');
		}
		/* TODO - neeed to go through and define gubu hi's and lo's in beer_style.json
		if(this.get('gubu') > this.proto.get('gubu_hi') || this.get('gubu') < this.proto.get('gubu_lo')){
			$('#gubu').addClass('issue');
		}*/
		if(this.get('ibu') > this.proto.get('ibu_hi') || this.get('ibu') < this.proto.get('ibu_lo')){
			$('#ibu').addClass('issue');
		} else{
			$('#ibu').removeClass('issue');
		}
		if(this.get('abv') > this.proto.get('abv_hi') || this.get('abv') < this.proto.get('abv_lo')){
			$('#abv').addClass('issue');
		} else{
			$('#abv').removeClass('issue');
		}
		if(this.get('srm') > this.proto.get('srm_hi') || this.get('srm') < this.proto.get('srm_lo')){
			$('#srm').addClass('issue');
			$('#srm_panel').addClass('issue');
		} else {
			$('#srm').removeClass('issue');
			$('#srm_panel').removeClass('issue');
		}
	}
		
});