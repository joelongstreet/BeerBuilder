class BB.Hops

	constructor : ->

		@window			= Ti.UI.createWindow
			title 		: 'Hops'
			navBarHidden: true

		@table 			= Ti.UI.createTableView
			height 		: BB.HEIGHT - BB.HEIGHT * .2
			width 		: BB.WIDTH
			rowHeight 	: BB.HEIGHT*.2
			top 		: BB.HEIGHT*.1

		button 			= Ti.UI.createButton
			right 		: BB.PADDING_W
			bottom 		: BB.PADDING_H
			title 		: 'Create New Hop'

		button.addEventListener 'click', =>
			@create_row()

		@window.add @table
		@window.add button
		@window.add BB.views.stats

		@create_row()

		return @window

	create_row : =>

		row 			= Ti.UI.createTableViewRow()

		slider 			= Ti.UI.createSlider
			bottom 		: BB.PADDING_H
			left 		: BB.PADDING_W
			width 		: BB.WIDTH*.7
			min 		: 0
			max 		: 3

		percent_text 	= Ti.UI.createLabel
			right 		: BB.PADDING_W
			top 		: BB.PADDING_H
			width 		: BB.PADDED_W
			text 		: '0%'
			textAlign 	: 'right'

		weight_text 	= Ti.UI.createLabel
			right 		: BB.PADDING_W
			bottom 		: BB.PADDING_H
			width 		: BB.PADDED_W
			text 		: '0 oz'
			textAlign 	: 'right'

		hop_type 		= Ti.UI.createLabel
			top 		: BB.PADDING_H
			left 		: BB.PADDING_W
			width 		: BB.PADDED_W
			text 		: BB.HOPS[0].name

		slider.addEventListener 'change', (e) =>
			new_value 		= Math.round(e.value*10)/10
			hop.weight 		= new_value
			hop.time 		= 30
			if new_value.toString().length == 1
				new_value = new_value.toString() + '.0'
			new_value += ' oz'
			weight_text.setText new_value
			BB.stats.calculate_bitterness()

		hop_type.addEventListener 'click', (e) =>

			row_data 	= []
			
			for item in BB.HOPS
				row_data.push item.name

			modal 			= new BB.utilities.modal_picker
				textField 	: hop_type
				value 		: hop_type.getText()
				data 		: row_data

			modal.open animated : true

		row.add hop_type
		row.add slider
		row.add percent_text
		row.add weight_text

		@table.appendRow row

		hop = new Hop BB.HOPS[0], percent_text
		BB.ingredients.hops.push hop


class Hop
	
	constructor : (properties, percent_text) ->
		@properties 	= properties
		@weight 		= 0
		@percent_text 	= percent_text

	update_proportion : (proportion) ->
		if proportion == 1 then proportion = '100%'
		else proportion = 100 * Math.round(proportion*100)/100 + '%'
		@percent_text.setText proportion
