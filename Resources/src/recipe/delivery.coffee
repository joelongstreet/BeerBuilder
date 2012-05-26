class BB.RecipeDelivery

	constructor : ->
		@window	= Ti.UI.createWindow
			title : 'Delivery'
		@window.rightNavButton = new BB.CloseWindow(BB.recipe.tab_group)

		return @window