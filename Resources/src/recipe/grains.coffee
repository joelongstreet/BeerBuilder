class BB.RecipeGrains

	constructor : ->

		@window			= Ti.UI.createWindow
			title 		: 'Grains'

		@table 			= Ti.UI.createTableView
			height 		: BB.HEIGHT*.65
			width 		: BB.WIDTH
			rowHeight 	: BB.HEIGHT*.1
			top 		: BB.HEIGHT*.2

		button 			= Ti.UI.createButton
			right 		: BB.PADDING_W
			bottom 		: BB.PADDING_H
			title 		: 'Create New Grain'

		button.addEventListener 'click', =>
			@create_row()

		@window.add @table
		@window.add button
		@window.add BB.recipe.views.stats

		@row_data 	= []
		for item in GRAINS
			@row_data.push item.name

		@create_row()

		return @window

	create_row : =>

		row 			= Ti.UI.createTableViewRow()

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

		row.addEventListener 'click', (e) =>

			modal 			= new BB.utilities.modal_picker [
				type 		: 'picker'
				data 		: @row_data
				value 		: @grain_text.getText()
				callback 	: @update_grain
			,
				type 		: 'range'
				min 		: 0
				max			: 10
				value 		: @weight_text.getText()
				callback 	: @update_grain_weight
			]

			modal.open animated : true

		row.add @grain_text
		row.add @percent_text
		row.add @weight_text

		@table.appendRow row

		@grain = new Grain GRAINS[0], @percent_text
		BB.recipe.ingredients.grains.push @grain

	update_grain_weight : (range_value) =>
		@grain.weight = range_value
		@weight_text.setText @grain.weight.format
			suffix 		: 'lbs'
			decimals 	: 10
		BB.stats.calculate_gravity()

	update_grain : (row_selected) =>
		@grain_text.setText GRAINS[row_selected].name
		@grain.properties = GRAINS[row_selected]
		BB.stats.calculate_gravity()


class Grain
	
	constructor : (properties, percent_text) ->
		@properties 	= properties
		@weight 		= 0
		@percent_text 	= percent_text

	update_proportion : (proportion) ->
		if proportion == 1 then proportion = '100%'
		else proportion = 100 * Math.round(proportion*100)/100 + '%'
		@percent_text.setText proportion
