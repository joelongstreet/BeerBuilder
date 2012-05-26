class BB.RecipeGrains


	constructor : ->

		@window			= Ti.UI.createWindow
			title 		: 'Grains'

		close = Ti.UI.createButton
			title : 'close'
		@window.rightNavButton = close
		close.addEventListener 'click', ->
			BB.recipe.tab_group.close()
			BB.menu.open()

		@table 			= Ti.UI.createTableView
			height 		: BB.HEIGHT*.65
			width 		: BB.WIDTH
			rowHeight 	: BB.HEIGHT*.1
			top 		: BB.HEIGHT*.2
			editable 	: true
		@table.addEventListener 'delete', (e) ->
			#This needs to actually delete the grain...
			#BB.recipe.stats.calculate_gravity()

		button 			= Ti.UI.createButton
			right 		: BB.PADDING_W
			bottom 		: BB.PADDING_H
			title 		: 'Create New Grain'

		button.addEventListener 'click', =>
			@create_row()

		@window.add @table
		@window.add button

		@create_row()

		return @window



	create_row : =>

		grain = new Grain()
		BB.recipe.ingredients.grains.push grain

		row = grain.build_row()
		row.addEventListener 'click', (e) =>
			row.grain.make_modal()

		@table.appendRow row




class Grain
	

	constructor : ->
		@properties 	= GRAINS[0]
		@weight 		= 0



	build_row 	: ->

		row 			= Ti.UI.createTableViewRow()
		row.grain 		= @

		@percent_text 	= Ti.UI.createLabel
			right 		: BB.PADDING_W
			top 		: BB.PADDING_H
			width 		: BB.PADDED_W
			text 		: '0%'
			textAlign 	: 'right'

		@weight_text 	= Ti.UI.createLabel
			right 		: BB.PADDING_W
			bottom 		: BB.PADDING_H
			width 		: BB.PADDED_W
			text 		: '0lbs'
			textAlign 	: 'right'

		@grain_text 	= Ti.UI.createLabel
			top 		: BB.PADDING_H
			left 		: BB.PADDING_W
			text 		: GRAINS[0].name

		row.add @grain_text
		row.add @percent_text
		row.add @weight_text

		return row



	update_proportion : (proportion) =>
		if proportion == 1 then proportion = '100%'
		else proportion = 100 * Math.round(proportion*100)/100 + '%'
		@percent_text.setText proportion



	update_weight : (range_value) =>
		@weight = range_value
		@weight_text.setText "#{@weight.toFixed(1)} lbs"
		BB.recipe.stats.calculate_gravity()



	update_grain : (row_selected) =>
		@grain_text.setText GRAINS[row_selected].name
		@properties = GRAINS[row_selected]
		BB.recipe.stats.calculate_gravity()



	make_modal : =>
		row_data = []
		for item in GRAINS
			if item.name == @grain_text.getText()
				selected_grain = _i
			row_data.push item.name

		modal = new BB.IngredientModal()
		modal.add_picker(row_data, selected_grain, @update_grain)
		modal.add_slider('lbs', 1, @weight, 0, 10, @update_weight)
		modal.open_window()
