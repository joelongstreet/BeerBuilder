class BB.RecipeHops


	constructor : ->

		@window			= Ti.UI.createWindow
			title 		: 'Hops'

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
		@table.addEventListener 'delete', ->
			BB.recipe.stats.calculate_bitterness()

		button 			= Ti.UI.createButton
			right 		: BB.PADDING_W
			bottom 		: BB.PADDING_H
			title 		: 'Create New Hop'
		button.addEventListener 'click', => @create_row()

		@window.add @table
		@window.add button

		@create_row()

		return @window



	create_row : =>

		hop = new Hop()
		BB.recipe.ingredients.hops.push hop

		row = hop.build_row()
		row.addEventListener 'click', (e) =>
			row.hop.make_modal()

		@table.appendRow row




class Hop

	
	constructor : ->

		@properties 	= HOPS[0]
		@weight 		= 0
		@time 			= 0



	build_row : =>

		row 			= Ti.UI.createTableViewRow()
		row.hop 		= @

		@percent_text 	= Ti.UI.createLabel
			right 		: BB.PADDING_W
			top 		: BB.PADDING_H
			width 		: BB.PADDED_W
			text 		: '0%'
			textAlign 	: 'right'

		@weight_text 	= Ti.UI.createLabel
			right 		: BB.PADDING_W * 5
			bottom 		: BB.PADDING_H
			width 		: BB.PADDED_W
			text 		: '0 oz'
			textAlign 	: 'right'

		@time_text 	= Ti.UI.createLabel
			right 		: BB.PADDING_W
			bottom 		: BB.PADDING_H
			width 		: BB.PADDED_W
			text 		: '0 min'
			textAlign 	: 'right'

		@hop_text 		= Ti.UI.createLabel
			top 		: BB.PADDING_H
			left 		: BB.PADDING_W
			width 		: BB.PADDED_W
			text 		: HOPS[0].name

		row.add @hop_text
		row.add @percent_text
		row.add @weight_text
		row.add @time_text

		return row



	update_proportion : (proportion) =>
		if proportion == 1 then proportion = '100%'
		else proportion = 100 * Math.round(proportion*100)/100 + '%'
		@percent_text.setText proportion



	update_hop : (row_selected) =>
		@hop_text.setText HOPS[row_selected].name
		@properties = HOPS[row_selected]
		BB.recipe.stats.calculate_bitterness()



	update_time : (range_value) =>
		@time = range_value
		@time_text.setText "#{@time.toFixed(0)} min"
		BB.recipe.stats.calculate_bitterness()



	update_weight : (range_value) =>
		@weight = range_value
		@weight_text.setText "#{@weight.toFixed(1)} oz"
		BB.recipe.stats.calculate_bitterness()


	make_modal : =>
		row_data = []
		for item in HOPS
			if item.name == @hop_text.getText()
				selected_hop = _i
			row_data.push item.name

		modal = new BB.IngredientModal()
		modal.add_picker(row_data, selected_hop, @update_hop)
		modal.add_slider('oz', 2, @weight, 0, 3, @update_weight)
		modal.add_slider('min', 0, @time, 0, 90, @update_time, BB.HEIGHT*.6)
		modal.open_window()