var Grain = Backbone.Model.extend({});

var Grains = Backbone.Collection.extend({
	model	: Grain,
	url	: '_assets/json/grains.json'
});

var Recipe_Grain = Backbone.Model.extend({

	initialize : function(obj){
		var grain = _.first(obj.grain_list.models);

		this.set({
			'lovibond_avg' 	: (grain.get('lovibond_hi') + grain.get('lovibond_lo'))/2,
			'character' 		: grain.get('characteristics'),
			'gu_average'		: (grain.get('gu_hi') + grain.get('gu_lo'))/2,
			'name'				: grain.get('name')
		});

		this.bind('change:weight', function(){
			builder.new_recipe.calc_gravity();
		});
		
		this.view = new GrainItemView({ collection : obj.grain_list, model : this });
		this.get('parent_view').find('.grain_fields').append(this.view.render().el);
	}

});

var GrainBill = Backbone.Collection.extend({
	model	: Recipe_Grain,
});

//-----------------------------------------//

var GrainItemView = Backbone.View.extend({
	
	className: 'grain',
	
	events: {
		'change input.range' : 'change_range',
		'change input.weight': 'change_weight',
		'change select'		: 'change_grain',
		'click .delete'		: 'remove_me'
	},
	
	initialize: function(){
		var self = this;

		this.template = _.template($('#grains_view').html());
		this.grain_items = [];
		
		_.each(this.collection.models, function(grain, i){
			var new_option = new GrainOptionView({
				model: grain,
				uid: i
			});

			self.grain_items.push(new_option.render().el);
		});
	},
	
	render: function(){
		
		var rendered_content = this.template();
		$(this.el).html(rendered_content);
		
		var select_menu = $(this.el).find('select');
		_.each(this.grain_items, function(option_item){
			select_menu.append(option_item);
		});
		
		return this;
	},
	
	remove_me: function(){
		event.preventDefault();
		$(this.el).remove();
		builder.new_recipe.grain_bill.remove(this.model);
	},
	
	change_range: function(){
		var range_value = $(this.el).find('input[type=range]').val();
		$(this.el).find('input[type=text]').val(range_value);

		this.model.set({weight: range_value});
	},
	
	change_weight: function(){
		var text_value = $(this.el).find('input[type=text]').val();
		$(this.el).find('input[type=range]').val(text_value);

		this.model.set({weight: text_value});
	},
	
	change_grain: function(){
		var new_val 	= $(this.el).find('select').val();
		var new_model	= this.collection.models[new_val];
		
		this.model.set({
			'lovibond_avg' 	: (new_model.get('lovibond_hi') + new_model.get('lovibond_lo'))/2,
			'character' 		: new_model.get('characteristics'),
			'gu_average'		: (new_model.get('gu_hi') + new_model.get('gu_lo'))/2,
			'name'				: new_model.get('name')
		});
		
		//TODO - these really shouldn't be slapped down here
		builder.new_recipe.calc_gravity();
		builder.new_recipe.modify_grain_character();
	},
	
	change_proportion: function(){
		var rounded_proportion = Math.round(this.model.get('proportion')*100) + '%';
		$(this.el).find('.proportion').text(rounded_proportion);
	}

});

var GrainOptionView = Backbone.View.extend({
	
	initialize: function(obj){
		this.name 	= obj.model.get('name');
		this.uid		= obj.uid;
	},
	
	render: function(){
		var template = '<option value="' + this.uid +'">' + this.name + '</option>';
		this.el = template;
		return this;
	}

});