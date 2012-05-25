class BB.RecipeStats

	constructor : ->
		@is_prototype 		= false
		@og 				= 0
		@ogu 				= 0
		@fg 				= 0
		@fgu 				= 0
		@gubu				= 0
		@ibu 				= 0
		@abv				= 0
		@srm 				= 0
		@efficiency 		= .75
		@volume 			= 5
		@final_volume 		= 5
		@attenuation		= 75
		@hop_weight 		= 0

	build_screen : ->

		wrapper 			= Ti.UI.createView
			backgroundColor	: '#000'
			height 			: BB.HEIGHT*.2
			width 			: BB.WIDTH
			top 			: 0

		@og_text 			= Ti.UI.createLabel
			width 			: BB.WIDTH*.25
			text 			: 'OG : 0'
			left 			: BB.PADDING_W
			top 			: BB.PADDING_H
			color 			: '#ffffff'
			height 			: BB.HEIGHT*.05
			font 			: BB.TYPO.H6

		@fg_text 			= Ti.UI.createLabel
			width 			: BB.WIDTH*.25
			text 			: 'FG : 0'
			left 			: BB.PADDING_W
			bottom 			: BB.PADDING_H
			color 			: '#ffffff'
			height 			: BB.HEIGHT*.05
			font 			: BB.TYPO.H6

		@gubu_text 			= Ti.UI.createLabel
			width 			: BB.WIDTH*.25
			text 			: 'GUBU : 0'
			left 			: BB.PADDED_W*.425
			top 			: BB.PADDING_H
			color 			: '#ffffff'
			height 			: BB.HEIGHT*.05
			font 			: BB.TYPO.H6

		@ibu_text 			= Ti.UI.createLabel
			width 			: BB.WIDTH*.25
			text 			: 'IBU\'S : 0'
			left 			: BB.PADDED_W*.425
			bottom 			: BB.PADDING_H
			color 			: '#ffffff'
			height 			: BB.HEIGHT*.05
			font 			: BB.TYPO.H6

		@abv_text 			= Ti.UI.createLabel
			width 			: BB.WIDTH*.25
			text 			: 'ABV : 0'
			right 			: BB.PADDING_W
			top 			: BB.PADDING_H
			color 			: '#ffffff'
			textAlign		: 'right'
			height 			: BB.HEIGHT*.05
			font 			: BB.TYPO.H6

		@srm_text 			= Ti.UI.createLabel
			width 			: BB.WIDTH*.25
			text 			: 'SRM : 0'
			right 			: BB.PADDING_W
			bottom 			: BB.PADDING_H
			color 			: '#ffffff'
			textAlign		: 'right'
			height 			: BB.HEIGHT*.05
			font 			: BB.TYPO.H6

		wrapper.add @og_text
		wrapper.add @fg_text
		wrapper.add @gubu_text
		wrapper.add @ibu_text
		wrapper.add @srm_text
		wrapper.add @abv_text

		return wrapper

		

	calculate_gravity : =>

		@gravity_units 	= 0
		@srm 			= 0
		@weight 		= 0

		for grain in BB.recipe.ingredients.grains

			#Build Gravity Units
			gu_average = (grain.properties.gu_lo + grain.properties.gu_hi)/2
			grain_gravity_units = parseInt grain.weight * gu_average
			if grain.properties.extract != 1
				grain_gravity_units *= @efficiency
			@gravity_units += grain_gravity_units

			#Build Color
			lovibond_avg = (grain.properties.lovibond_lo + grain.properties.lovibond_hi)/2
			grain_mcu = parseInt grain.weight * lovibond_avg
			@srm += grain_mcu

			#Build Weight
			@weight += grain.weight

		#Update the Proportion of the Ingredient Please
		for grain in BB.recipe.ingredients.grains
			proportion = grain.weight/@weight
			grain.update_proportion(proportion)

		@ogu 		= @gravity_units/@volume
		@fgu 		= (@gravity_units * (@attenuation/100))/@volume
		@og 	 	= 1 + @ogu/1000
		@fg 		= 1 + @fgu/1000
		@fg 		= 1 + (@og - @fg)
		@abv 		= 131*(@og - @fg)

		@og_text.setText "OG: #{@og.toFixed(3)}"
		@fg_text.setText "FG: #{@fg.toFixed(3)}"
		@abv_text.setText "ABV: #{@abv.toFixed(1)}"

		@calculate_color()
		@calculate_gu_bu()


	calculate_color : ->
		@srm = @srm/@volume
		@srm = 1.4922*(Math.pow(@srm, .6859))
		@srm = Math.round(@srm*10)/10

		if @srm > 40 then @srm_rgb = '0,0,0'
		else
			@srm_rgb = BB.utilities.srm_lookup.getItem @srm
			if @srm_rgb == undefined
				srm_rgb = '255,255,255'

		@srm_text.setText "SRM: #{@srm.toFixed(1)}"


	calculate_bitterness : =>

		@hop_weight = 0

		for hop in BB.recipe.ingredients.hops
			#This is almost certainly wrong, at least not that accurate i think i need to compare to a table, not a formula .... maybe? uh, what. who farted? 
			aa = (hop.properties.aa_lo + hop.properties.aa_hi)/2
			utilization = -1*(.0041 * Math.pow(hop.time, 2)) + (.6261 * hop.time) + 1.5779
			aau = hop.weight * utilization * .7489 * aa
			@ibu += aau

			#Build Weight
			@hop_weight += hop.weight

		#Update the Proportion of the Ingredient Please
		for hop in BB.recipe.ingredients.hops
			proportion = hop.weight/@hop_weight
			hop.update_proportion(proportion)

		@ibu = Math.round @ibu/@final_volume

		@ibu_text.setText "IBU\'s: #{@ibu.toFixed(1)}"
		@calculate_gu_bu()


	calculate_gu_bu : =>
		if @ibu == 0 then @ibu = 1
		#else @fgu = 1000 * @fgu - 1
		@gubu = Math.round(@fgu/@ibu*1000)/1000
		@gubu_text.setText "GUBU: #{@gubu.toFixed(2)}"

		if @is_prototype then @compare_to_bjcp()

	compare_to_bjcp : =>
		false