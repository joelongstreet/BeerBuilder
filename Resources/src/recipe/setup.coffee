class BB.RecipeSetup

	constructor : ->
		@window			= Ti.UI.createWindow
			title 		: 'Setup'
			backgroundColor : '#fff'

		close = Ti.UI.createButton
			title : 'close'
		@window.rightNavButton = close
		close.addEventListener 'click', ->
			BB.recipe.tab_group.close()
			BB.menu.open()

		title 			= Ti.UI.createTextField
			hintText 	: 'Your Next Great Beer'
			top 		: BB.PADDING_H
			width 		: BB.WIDTH - BB.PADDING_W*2
			left 		: BB.PADDING_W
			borderStyle : Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
			font 		: {fontSize : 22}

		date 			= Ti.UI.createTextField
			hintText 	: 'Date Brewed'
			top 		: BB.PADDING_H*3
			width 		: BB.WIDTH/2
			right 		: BB.PADDING_W
			borderStyle : Titanium.UI.INPUT_BORDERSTYLE_ROUNDED

		efficiency_s	= Ti.UI.createSlider
			min 		: 0
			max 		: 100
			width 		: BB.WIDTH - BB.PADDING_W*2
			left 		: BB.PADDING_W
			top 		: BB.PADDING_H*7
			value 		: 75
		efficiency_l	= Ti.UI.createLabel
			top 		: BB.PADDING_H*6
			right 		: BB.PADDING_W
			text 		: 'Efficiency: 75%'
		efficiency_s.addEventListener 'change', (e) ->
			BB.recipe.stats.efficiency = e.value/100
			BB.recipe.stats.calculate_gravity()
			BB.recipe.stats.calculate_bitterness()
			efficiency_l.setText "Efficiency: #{e.value.toFixed(0)}%"

		volume_s		= Ti.UI.createSlider
			min 		: 0
			max 		: 20
			width 		: BB.WIDTH - BB.PADDING_W*2
			left 		: BB.PADDING_W
			top 		: BB.PADDING_H*10
			value 		: 5
		volume_l		= Ti.UI.createLabel
			top 		: BB.PADDING_H*9
			right 		: BB.PADDING_W
			text 		: 'Volume: 5 Gallons'
		volume_s.addEventListener 'change', (e) ->
			BB.recipe.stats.volume = e.value
			BB.recipe.stats.calculate_gravity()
			BB.recipe.stats.calculate_bitterness()
			volume_l.setText "Volume: #{e.value.toFixed(1)} Gallons"

		@window.add title
		@window.add date
		@window.add efficiency_s
		@window.add efficiency_l
		@window.add volume_s
		@window.add volume_l

		return @window