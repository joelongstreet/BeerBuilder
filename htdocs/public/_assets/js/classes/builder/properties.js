var Property = Backbone.Model.extend({});

var Properties = Backbone.Collection.extend({
	
	defaults : {
		name			: 'Duff Beer',
		volume		: 5,
		efficiency 	: 75
	},
	
	
	initialize : function(){
		
		/*$(all_sections[0]).find('input[type=range]').each(function(){
			var self = $(this);
			self.prev().val(self.val());

			self.bind('change', function(){
				self.prev().val(self.val());
			});
		});

		$(all_sections[0]).find('input[type=text]').each(function(){
			var self = $(this);
			self.bind('change', function(){
				self.next().val(self.val());
			});
		});*/
	}
	
});