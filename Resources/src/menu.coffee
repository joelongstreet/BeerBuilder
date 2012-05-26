class BB.Menu
	constructor : (tab_groups) ->
		@window			= Ti.UI.createWindow
			title 		: 'Menu'
			backgroundColor : 'white'

		title 			= Ti.UI.createLabel
			text 		: 'Beer Builder'
			top 		: BB.PADDING_H
			width 		: BB.WIDTH
			textAlign	: 'center'
			font 		: {fontSize : 35, fontWeight : 'bold'}
			color 		: 'white'
			backgroundColor : 'black'

		nav_item_top = 0
		for item in tab_groups
			nav_item = @build_nav_item(item, _i, nav_item_top)
			@window.add nav_item

		@window.add title

		return @window


	build_nav_item : (item, iterator) ->

		# This could probably be better at some point
		if iterator == 0 or iterator == 1 then top_position = BB.PADDING_H + BB.HEIGHT * .125
		else if iterator == 2 or iterator == 3 then top_position = BB.PADDING_H + BB.HEIGHT*.25 + BB.HEIGHT * .125
		else if iterator == 4 or iterator == 5 then top_position = BB.PADDING_H + BB.HEIGHT*.25*2 + BB.HEIGHT * .125

		view 			= Ti.UI.createView
			top 		: top_position
			width 		: BB.WIDTH*.4
			height 		: BB.WIDTH*.3
			backgroundColor : '#DEDEDE'
			borderRadius: 3
			borderColor : '#303030'
			borderWidth : 1


		if iterator%2 then view.right = BB.PADDING_W
		else view.left = BB.PADDING_W

		label 			= Ti.UI.createLabel
			text 		: item.title
			bottom 		: 0
			textAlign 	: 'center'

		image 			= Ti.UI.createImageView
			image 		: item.icon
			top 		: 10
			height 		: '60%'

		view.add label
		view.add image

		view.addEventListener 'click', ->
			item.tab_group.open(transition: Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT)

		return view