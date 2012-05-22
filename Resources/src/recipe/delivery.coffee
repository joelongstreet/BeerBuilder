class BB.RecipeDelivery

	constructor : ->
		@window	= Ti.UI.createWindow
			title : 'Delivery'

		close = Ti.UI.createButton
			title : 'close'
		@window.rightNavButton = close
		close.addEventListener 'click', ->
			BB.recipe.tab_group.close()
			BB.menu.open()

		@window.add BB.recipe.views.stats

		return @window