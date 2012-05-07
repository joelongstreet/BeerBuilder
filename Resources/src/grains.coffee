class BB.Grains

	constructor : ->
		@window			= Ti.UI.createWindow
			title 		: 'Grains'

		@table 			= Ti.UI.createTableView
			height 		: BB.HEIGHT - BB.HEIGHT * .1
			width 		: BB.WIDTH
			rowHeight 	: BB.HEIGHT*.2

		button 			= Ti.UI.createButton
			right 		: BB.PADDING_W
			bottom 		: BB.PADDING_H
			title 		: 'Create New Grain'

		button.addEventListener 'click', ->
			return false

		@window.add @table
		@window.add @create_row()
		@window.add button

		return @window

	create_row : ->

		view 			= Ti.UI.createView()

		grain_type 		= Ti.UI.createLabel
				text 	: BB.GRAINS[0].name

		slider 			= Ti.UI.createSlider()
		percent_text 	= Ti.UI.createLabel
				text 	: '0%'
		weight_text 	= Ti.UI.createLabel
				text 	: '0lbs'

		grain_type.addEventListener 'focus', (e) =>
			e.source.blur()
			picker		= Ti.UI.createPicker
				bottom 	: 0
			row_data 	= []
			for item in BB.GRAINS 
				row_data.push item.name

			require('vendor/semiModalPicker').modal_picker
				textField 	: grain_type
				value 		: grain_type.getText()
				type 		: pickerType
				data 		: row_data

			@window.add picker

		view.add grain_type
		view.add slider
		view.add percent_text
		view.add weight_text
		
		return view