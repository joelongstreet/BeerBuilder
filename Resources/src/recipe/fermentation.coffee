class BB.RecipeFermentation

	constructor : ->
		@window	= Ti.UI.createWindow
			title : 'Fermentation'
		@window.rightNavButton = new BB.CloseWindow(BB.recipe.tab_group)

		return @window