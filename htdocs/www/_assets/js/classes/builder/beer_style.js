var BeerStyle = Backbone.Model.extend({});

var BeerStyles = Backbone.Collection.extend({
	model : BeerStyle,
	url : '_assets/json/beer_styles.json',
	
	build_options : function(){
		this.styles = new StyleSelector({
			collection : this.models
		});
		this.templates = new TemplateSelector({
			collection: this.models
		});
	}
});

var TemplateSelector = Backbone.View.extend({
	
	events: {
		'change select' : 'change_template'
	},
	
	initialize: function(){
		
		var self = this;
		$(this.el).html('<select><option selected value="999">No Thanks</option></select>');

		_.each(this.collection, function(model, i){
			var option = '<option value="' + i + '">' + model.get('name') + '</option>';
			$(self.el).find('select').append(option);
		});
		
		$('#template_definition').append($(this.el));
	},
	
	change_template : function(){
		var response = confirm('If you choose a template, your current recipe will be lost. Continue?');
		if(response){
			var this_val = $(this.el).find('select').val();
			$('#style_definition').find('select').val(this_val);
			builder.new_recipe.proto = this.collection[this_val];
			builder.new_recipe.compare_to_bjcp();
			//TODO - apply prototype recipe
		} else{
			$(this.el).find('select').val(999);
		}
	}
	
});

var StyleSelector = Backbone.View.extend({
	
	events: {
		'change select' : 'change_style'
	},
	
	initialize: function(){
		
		var self = this;
		$(this.el).html('<select><option selected value="999">No Thanks</option></select');

		_.each(this.collection, function(model, i){
			var option = '<option value="' + i + '">' + model.get('name') + '</option>';
			$(self.el).find('select').append(option);
		});
		
		$('#style_definition').append($(this.el));
	},
	
	change_style : function(){
		var this_val = $(this.el).find('select').val();
		builder.new_recipe.proto = this.collection[this_val];
		builder.new_recipe.compare_to_bjcp();
	}
});