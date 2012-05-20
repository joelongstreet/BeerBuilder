class BB.RecipeFermentation

	constructor : ->
		@window	= Ti.UI.createWindow
			title : 'Fermentation'
			navBarHidden : true

		@window.add BB.recipe.views.stats

		return @window