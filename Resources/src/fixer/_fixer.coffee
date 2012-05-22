class BB.FixerWindow
	
	constructor : ->
		@temperature 	= 100
		@volume 	 	= 5
		@target 		= 1.050
		@current 		= 1.075

		window			= Ti.UI.createWindow
			title 		: 'Gravity Fixer'
			backgroundColor : 'white'
			tabBarHidden : true

		close = Ti.UI.createButton
			title : 'close'
		window.rightNavButton = close
		close.addEventListener 'click', ->
			BB.fixer.tab_group.close()
			BB.menu.open()

		temp_s			= Ti.UI.createSlider
			min 		: 32
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
			@temperature = Math.round(e.value)
			@calculate()
			temp_l.setText e.value.format
				prefix 		: 'Temperature: '
				suffix 		: '° Fahrenheit'
				decimals 	: 1

		gravity_s		= Ti.UI.createSlider
			min 		: 0
			max 		: 200
			width 		: BB.WIDTH - BB.PADDING_W*2
			left 		: BB.PADDING_W
			top 		: BB.HEIGHT*.275
			value 		: 50
		gravity_l		= Ti.UI.createLabel
			top 		: BB.HEIGHT*.225
			right 		: BB.PADDING_W
			text 		: 'Current Gravity: 1.050'
		gravity_s.addEventListener 'change', (e) =>
			if e.value < 100 then @current = parseFloat('1.0' + Math.round(e.value*100)/100)
			else @current = parseFloat('1.' + Math.round(e.value*100)/100)
			@calculate()
			gravity_l.setText @current.format
				prefix 		: 'Current Gravity: '
				decimals 	: 1000

		target_s		= Ti.UI.createSlider
			min 		: 0
			max 		: 200
			width 		: BB.WIDTH - BB.PADDING_W*2
			left 		: BB.PADDING_W
			top 		: BB.HEIGHT*.425
			value 		: 75
		target_l		= Ti.UI.createLabel
			top 		: BB.HEIGHT*.375
			right 		: BB.PADDING_W
			text 		: 'Target Gravity: 1.075'
		target_s.addEventListener 'change', (e) =>
			if e.value < 100 then @target = parseFloat('1.0' + Math.round(e.value*100)/100)
			else @target = parseFloat('1.' + Math.round(e.value*100)/100)
			@calculate()
			target_l.setText @target.format
				prefix 		: 'Target Gravity: '
				decimals 	: 1000

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
			text 		: 'Final Volume: 5 Gallons'
		volume_s.addEventListener 'change', (e) =>
			@volume = e.value
			@calculate()
			volume_l.setText e.value.format
				prefix 		: 'Final Volume: '
				suffix 		: ' Gallons'
				decimals 	: 10

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
		hydro_calibration 	= 60
		corrected_gravity 	= @current * ((1.00130346 - 0.000134722124 * @temperature + 0.00000204052596 * Math.pow(@temperature, 2) - 0.00000000232820948 * Math.pow(@temperature, 3)) / (1.00130346 - 0.000134722124 * hydro_calibration + 0.00000204052596 * Math.pow(hydro_calibration, 2) - 0.00000000232820948 * Math.pow(hydro_calibration, 3)))
		gravity_points 		= 1000*(corrected_gravity - 1)*@volume
		target_points  		= 1000*(@target - 1)*@volume

		if corrected_gravity > @target
			water_to_add = gravity_points/target_points
			@result.setText water_to_add.format
				prefix 		: 'Add '
				suffix 		: 'gallons Water'
				decimals	: 100
		else
			diff = target_points - gravity_points
			dme_to_add = diff/45
			@result.setText dme_to_add.format
				prefix 		: 'Add '
				suffix 		: 'lbs DME'
				decimals	: 10

BB.fixer  				=
	icon 				: '/img/fixer.png'
	title 				: 'Fixer'

BB.fixer.tabs 	=
	default				: Ti.UI.createTab
		window 			: new BB.FixerWindow()

BB.fixer.tab_group 		= Ti.UI.createTabGroup()
BB.fixer.tab_group.addTab BB.fixer.tabs.default