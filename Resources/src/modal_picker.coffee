BB.utilities.modal_picker = (items) ->

	win 				= Ti.UI.createWindow
		backgroundColor	: 'transparent'
		height 			: BB.HEIGHT
		width 			: BB.WIDTH

	overlay 			= Ti.UI.createView
		backgroundColor	: 'green'
		opacity			: 0.7
		height 			: BB.HEIGHT*.8
		top 			: BB.HEIGHT*.2
		width 			: BB.WIDTH
	 
	done 				=  Ti.UI.createButton
		title			:'X'
		height			: BB.HEIGHT*.07
		bottom 			: BB.HEIGHT*.7
		width			: 50
		right			: 10
		style 			: 1

	done.addEventListener 'click', -> win.close()

	win.add 		overlay
	win.add 		done

	callbacks 			= []


	for item in items

		callbacks.push item.callback

		if item.type is 'picker' || item.type is 'date-picker'
		
			picker 				= Ti.UI.createPicker
				type 			: Ti.UI.PICKER_TYPE_PLAIN
				height 			: BB.HEIGHT*.5
				bottom 			: 0
				selectionIndicator : true

			if item.type == 'date' then item.value = @string_to_date item.value

			else
				rows = []
				for row in item.data
					rows.push Ti.UI.createPickerRow({ title : row })
				picker.add rows

				if item.value then picker.value = item.picker_value

			#THIS IS SUPER FUCKING CONFUSING
			picker.callback = item.callback
			picker.addEventListener 'change', (e) ->
				@callback(e.rowIndex)

			win.add picker

		else if item.type == 'range'

			slider 			= Ti.UI.createSlider
				bottom 		: BB.HEIGHT*.5 + BB.HEIGHT*.1*_i
				left 		: BB.PADDING_W
				width 		: BB.WIDTH*.7
				min 		: item.min
				max 		: item.max

			#THIS IS SUPER FUCKING CONFUSING
			slider.callback = item.callback
			slider.addEventListener 'change', (e) ->
				@callback(e.value)

			win.add slider

	
	return win

	string_to_date = (date_string) ->
		date_string = date_string || '';
		matches = /(\d+)\/(\d+)\/(\d+)/.exec(date_string);

		if (matches && matches.length >= 4)
			return new Date(matches[3], matches[1] - 1, matches[2]);

		return new Date();

	date_to_string = (date) ->
		(date.getMonth()+1) + '/' + date.getDate() + '/' + date.getFullYear()