var Hop = Backbone.Model.extend({});

var Hops = Backbone.Collection.extend({
	model : Hop,
	url	: '_assets/json/hops.json'
});

var Recipe_Hop = Backbone.Model.extend({
	defaults: {
		time 		: 0,
		weight	: 0,
		aa			: 0
	},
	
	initialize : function(obj){
		var hop = _.first(obj.hop_list.models);
		this.reset_values(hop);
		
		this.bind('change:time', function(){ 
			builder.new_recipe.calc_bitterness();
		});
		this.bind('change:weight', function(){
			builder.new_recipe.calc_bitterness();
		});
		
		this.view = new HopItemView({ collection : obj.hop_list, model : this });
		this.get('parent_view').find('.hop_fields').append(this.view.render().el);
	},
	
	reset_values : function(hop){
		this.set({
			'aa' 			: (hop.get('aa_lo') + hop.get('aa_hi'))/2,
			'character' : hop.get('characteristics')
		});
		builder.new_recipe.calc_bitterness();
	}
	
});

var HopSchedule = Backbone.Collection.extend({
	model : Recipe_Hop
});



//-----------------------------------------//


var HopItemView = Backbone.View.extend({
	className: 'hop',
	
	events: {
		'all'											: 'update_all',
		'change input[type=text].weight'		: 'change_input_weight',
		'change input[type=text].time'		: 'change_input_time',
		'change input[type=range].weight'	: 'change_range_weight',
		'change input[type=range].time'		: 'change_range_time',
		'change select'							: 'change_hop',
		'click .delete'							: 'remove_me'
	},
	
	initialize : function(){
		var self = this;
		this.template 	= _.template($('#hops_view').html());
		this.hop_items	= [];
		
		this.collection.each(function(hop, i){
			var new_option = new HopOptionView({
				model: hop,
				uid: i
			});

			self.hop_items.push(new_option.render().el);
		});
	},

	render : function(){
		
		var rendered_content = this.template(this.hop_items);
		$(this.el).html(rendered_content);
		
		var select_menu = $(this.el).find('select');
		_.each(this.hop_items, function(option_item){
			select_menu.append(option_item);
		});

		return this;
	},
	
	remove_me : function(){
		$(this.el).remove();
		builder.new_recipe.hop_schedule.remove(this.model);
	},
	
	//TODO - i would think there might be a better way to do this...?
	
	change_range_weight : function(){
		var range_input = $(this.el).find('input[type=range].weight');
		var text_input = $(this.el).find('input[type=text].weight');
		text_input.val(range_input.val());
		this.model.set({weight: range_input.val()});
	},
	
	change_range_time : function(){
		var range_input = $(this.el).find('input[type=range].time');
		var text_input = $(this.el).find('input[type=text].time');
		text_input.val(range_input.val());
		this.model.set({time: range_input.val()});
	},
	
	change_input_weight : function(){
		var range_input = $(this.el).find('input[type=range].weight');
		var text_input = $(this.el).find('input[type=text].weight');
		range_input.val(text_input.val());
		this.model.set({weight: text_input.val()});
	},
	
	change_input_time : function(){
		var range_input = $(this.el).find('input[type=range].time');
		var text_input = $(this.el).find('input[type=text].time');
		range_input.val(text_input.val());
		this.model.set({time: text_input.val()});
	},
	
	change_hop : function(){
		var new_val 	= $(this.el).find('select').val();
		var new_model	= this.collection.models[new_val];

		this.model.reset_values(new_model);
	},
	
	update_all : function(){
		
	}
	
	
});

var HopOptionView = Backbone.View.extend({
	
	initialize: function(obj){
		this.name 	= obj.model.get('name');
		this.aa		= (obj.model.get('aa_lo') + obj.model.get('aa_hi'))/2 + '%'
		this.uid		= obj.uid;
	},
	
	render: function(){
		var template = '<option value="' + this.uid +'">' + this.name + ' - ' + this.aa + '</option>';
		
		this.el = template;
		return this;
	}
	
});