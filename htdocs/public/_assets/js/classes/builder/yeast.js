var Yeast = Backbone.Model.extend({});

var Yeasts = Backbone.Collection.extend({
	model : Yeast,
	url	: '_assets/json/yeasts.json'
});

var Recipe_Yeast = Backbone.Model.extend({
	
});

var YeastCollection = Backbone.Model.extend({
	model : Recipe_Yeast
});