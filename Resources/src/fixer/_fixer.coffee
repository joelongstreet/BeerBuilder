class BB.FixerWindow
	
	constructor : ->
		@temperature 	= 100
		@volume 	 	= 5
		@target 		= 1.050
		@current 		= 1.075

		window			= Ti.UI.createWindow
			title 		: 'Gravity Fixer'
			backgroundColor : 'white'

		temp_s			= Ti.UI.createSlider
			min 		: 0
			max 		: 212
			width 		: BB.WIDTH - BB.PADDING_W*2
			left 		: BB.PADDING_W
			top 		: BB.HEIGHT*.125
			value 		: 100
		temp_l			= Ti.UI.createLabel
			top 		: BB.HEIGHT*.075
			right 		: BB.PADDING_W
			text 		: 'Temperature: 100° Fahrenheit'
		temp_s.addEventListener 'change', (e) =>
			@calculate()
			@temperature = e.value
			temp_l.setText e.value.format
				prefix 		: 'Temperature: '
				suffix 		: '° Fahrenheit'
				decimals 	: 1

		gravity_s		= Ti.UI.createSlider
			min 		: 1
			max 		: 1.2
			width 		: BB.WIDTH - BB.PADDING_W*2
			left 		: BB.PADDING_W
			top 		: BB.HEIGHT*.275
			value 		: 1.075
		gravity_l		= Ti.UI.createLabel
			top 		: BB.HEIGHT*.225
			right 		: BB.PADDING_W
			text 		: 'Current Gravity: 1.075'
		gravity_s.addEventListener 'change', (e) =>
			@calculate()
			@current = e.value
			gravity_l.setText e.value.format
				prefix 		: 'Current Gravity: '
				decimals 	: 1

		target_s		= Ti.UI.createSlider
			min 		: 1
			max 		: 1.2
			width 		: BB.WIDTH - BB.PADDING_W*2
			left 		: BB.PADDING_W
			top 		: BB.HEIGHT*.425
			value 		: 1.050
		target_l		= Ti.UI.createLabel
			top 		: BB.HEIGHT*.375
			right 		: BB.PADDING_W
			text 		: 'Target Gravity: 1.050'
		target_s.addEventListener 'change', (e) =>
			@calculate()
			@target = e.value
			target_l.setText e.value.format
				prefix 		: 'Target Gravity: '
				decimals 	: 1

		volume_s		= Ti.UI.createSlider
			min 		: 0
			max 		: 20
			width 		: BB.WIDTH - BB.PADDING_W*2
			left 		: BB.PADDING_W
			top 		: BB.HEIGHT*.575
			value 		: 5
		volume_l		= Ti.UI.createLabel
			top 		: BB.HEIGHT*.525
			right 		: BB.PADDING_W
			text 		: 'Volume: 5 Gallons'
		volume_s.addEventListener 'change', (e) =>
			@calculate()
			@volume = e.value
			volume_l.setText e.value.format
				prefix 		: 'Volume: '
				suffix 		: ' Gallons'
				decimals 	: 1

		@result 		= Ti.UI.createLabel
			width 		: BB.WIDTH - BB.PADDING_W/2
			bottom 		: BB.PADDING_H
			textAlign 	: 'center'
			font 		: {fontSize : 26}
			text 		: 'Good to Go'

		window.add temp_s
		window.add temp_l
		window.add gravity_s
		window.add gravity_l
		window.add target_s
		window.add target_l
		window.add volume_s
		window.add volume_l
		window.add @result

		return window

	calculate : ->
		Ti.API.info @temperature

		@result.setText('poo')

BB.fixer  				=
	icon 				: '/img/fixer.png'
	title 				: 'Fixer'

BB.fixer.tabs 	=
	default				: Ti.UI.createTab
		window 			: new BB.FixerWindow()

BB.fixer.tab_group 		= Ti.UI.createTabGroup()
BB.fixer.tab_group.addTab BB.fixer.tabs.default