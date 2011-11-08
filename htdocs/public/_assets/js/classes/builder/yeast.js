var Yeast = Backbone.Model.extend({});

var Yeasts = Backbone.Collection.extend({
	model : Yeast,
	url	: '_assets/json/yeasts.json'
});