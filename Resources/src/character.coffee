class BB.Character

	constructor : ->
		@grains 	= @build_text_view 'Grain Character'
		@hops 		= @build_text_view 'Hop Character'
		@yeasts 	= @build_text_view 'Yeast Character'

		return [@grains, @hops, @yeasts]


	update_item : (items, type) =>
		item_text = ''
		for item in items
			item_text += item
			if _i != items.length - 1
				item_text += ','

		if type == 'grain' then @grains.update_text item_text
		else if type == 'hop' then @hops.update_text item_text
		else if type == 'yeast' then @yeasts.update_text item_text


	build_text_view : (label_text) ->

		view 				= Ti.UI.createView
			backgroundColor : 'red'
			width 		: BB.PADDED_W
			left 		: BB.PADDING_W
			top 		: BB.PADDING_H
			height 		: BB.HEIGHT*.15

		label 	= Ti.UI.createLabel
			width 	: BB.PADDED_W/5
			left 	: BB.PADDING_W
			top 	: BB.PADDING_H
			text 	: label_text
			height 	: '100%'

		content	= Ti.UI.createLabel
			width 	: BB.PADDED_W*(3/5)
			left 	: BB.PADDED_W/5
			top 	: BB.PADDING_H
			height 	: '100%'

		@update_text = (new_text) =>
			content.setText()

		view.add label
		view.add content

		return view
