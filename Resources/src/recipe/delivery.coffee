class BB.RecipeDelivery

	constructor : ->
		@window	= Ti.UI.createWindow
			title : 'Delivery'
			navBarHidden : true

		@window.add BB.recipe.views.stats

		return @window