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

		@row_data 	= []
		for item in HOPS
			@row_data.push item.name

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

		row.addEventListener 'click', (e) =>

			modal 			= new BB.utilities.modal_picker [
				type 		: 'picker'
				data 		: @row_data
				value 		: @hop_text.getText()
				callback 	: @update_hop
			,
				type 		: 'range'
				label 		: 'Weight'
				min 		: 0
				max			: 3
				value 		: @weight_text.getText()
				callback 	: @update_hop_weight
			,
				type 		: 'range'
				label 		: 'Time'
				min 		: 0
				max			: 90
				value 		: @time_text.getText()
				callback 	: @update_hop_time
			]

			modal.open animated : true

		row.add @hop_text
		row.add @percent_text
		row.add @weight_text
		row.add @time_text

		@table.appendRow row

		@hop = new Hop HOPS[0], @percent_text
		BB.recipe.ingredients.hops.push @hop

	update_hop_time : (range_value) =>
		@hop.time = range_value
		@time_text.setText "#{@hop.time.toFixed(0)} min"
		BB.recipe.stats.calculate_bitterness()

	update_hop_weight : (range_value) =>
		@hop.weight = range_value
		@weight_text.setText "#{@hop.weight.toFixed(1)} oz"
		BB.recipe.stats.calculate_bitterness()

	update_hop : (row_selected) =>
		@hop_text.setText HOPS[row_selected].name
		@hop.properties = HOPS[row_selected]

		BB.recipe.stats.calculate_bitterness()


class Hop
	
	constructor : (properties, percent_text) ->
		@properties 	= properties
		@percent_text 	= percent_text
		@weight 		= 0
		@time 			= 0

	update_proportion : (proportion) ->
		if proportion == 1 then proportion = '100%'
		else proportion = 100 * Math.round(proportion*100)/100 + '%'
		@percent_text.setText proportion
