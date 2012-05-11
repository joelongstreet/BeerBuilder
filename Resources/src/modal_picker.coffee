BB.utilities.modal_picker = (options) ->

	win 				= Ti.UI.createWindow
		backgroundColor	: 'transparent'
		height 			: BB.HEIGHT
		width 			: BB.WIDTH

	overlay 			= Ti.UI.createView
		backgroundColor	: '#000'
		opacity			: 0.7
		height 			: BB.HEIGHT
		width 			: BB.WIDTH
	
	picker 				= Ti.UI.createPicker
		type 			: Ti.UI.PICKER_TYPE_PLAIN
		height 			: BB.HEIGHT/2
		bottom 			: 0
		selectionIndicator : true

	rows = []
	for item in options.data
		rows.push Ti.UI.createPickerRow({ title : item })
	picker.add rows

	if picker.getType() == Ti.UI.PICKER_TYPE_DATE
		picker.value = @string_to_date options.value
	#picker.value = options.value

	picker.addEventListener 'change', (e) ->
		Ti.API.info picker.getSelectedRow(0).title
		return false
	
	cancel 				= Ti.UI.createButton
		title 			:'Cancel'
		height			: BB.HEIGHT*.07
		width 			: 80
		left 			: 10
		style 			: Ti.UI.iPhone.SystemButtonStyle.BORDERED
	 
	done 				=  Ti.UI.createButton
		title			:'Done'
		height			: BB.HEIGHT*.07
		width			: 80
		right			: 10
		style 			: Ti.UI.iPhone.SystemButtonStyle.BORDERED

	cancel.addEventListener 'click', ->
		win.close()

	done.addEventListener 'click', ->
		if picker.getType() == Ti.UI.PICKER_TYPE_DATE
			options.textField.setText @date_to_string picker.value
		else 
			options.textField.setText picker.getSelectedRow(0).title

		win.close()
	 
	spacer 				= Ti.UI.createButton
		systemButton 	: Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
	 
	toolbar 			= Ti.UI.createView
		backgroundColor	: '#bbb'
		height			: BB.HEIGHT*.1
		top 			: BB.HEIGHT*.45

	toolbar.add 	cancel
	toolbar.add 	done
	
	win.add 		overlay
	win.add 		toolbar
	win.add 		picker
	
	return win

	string_to_date = (date_string) ->
		date_string = date_string || '';
		matches = /(\d+)\/(\d+)\/(\d+)/.exec(date_string);

		if (matches && matches.length >= 4)
			return new Date(matches[3], matches[1] - 1, matches[2]);

		return new Date();

	date_to_string = (date) ->
		(date.getMonth()+1) + '/' + date.getDate() + '/' + date.getFullYear()