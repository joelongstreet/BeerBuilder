class BB.RecipeSetup

	constructor : ->
		@window	= Ti.UI.createWindow
			title : 'Setup'
			navBarHidden : true

		@window.add BB.recipe.views.stats

		return @window