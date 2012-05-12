class BB.Stats

	constructor : ->
		@is_prototype 	= false
		@og 			= 0
		@ogu 			= 0
		@fg 			= 0
		@fgu 			= 0
		@gubu			= 0
		@ibu 			= 0
		@abv			= 0
		@srm 			= 0
		@efficiency 	= .75
		@volume 		= 5
		@final_volume 	= 5
		@hop_weight 	= 0

	build_screen : ->

		wrapper 			= Ti.UI.createView
			backgroundColor	: '#000'
			opacity			: 0.7
			height 			: BB.HEIGHT*.1
			width 			: BB.WIDTH
			top 			: 0

		@og_text 			= Ti.UI.createLabel
			width 			: BB.WIDTH
			text 			: 'OG : 0'
			left 			: BB.PADDING_W
			top 			: BB.PADDING_H
			color 			: '#ffffff'
			height 			: BB.HEIGHT*.05

		@fg_text 			= Ti.UI.createLabel
			width 			: BB.WIDTH
			text 			: 'FG : 0'
			left 			: BB.PADDING_W
			bottom 			: BB.PADDING_H
			color 			: '#ffffff'
			height 			: BB.HEIGHT*.05

		@gubu_text 			= Ti.UI.createLabel
			width 			: BB.WIDTH
			text 			: 'GUBU : 0'
			left 			: BB.PADDED_W*.425
			top 			: BB.PADDING_H
			color 			: '#ffffff'
			height 			: BB.HEIGHT*.05

		@ibu_text 			= Ti.UI.createLabel
			width 			: BB.WIDTH
			text 			: 'IBU\'S : 0'
			left 			: BB.PADDED_W*.425
			bottom 			: BB.PADDING_H
			color 			: '#ffffff'
			height 			: BB.HEIGHT*.05

		@abv_text 			= Ti.UI.createLabel
			width 			: BB.WIDTH
			text 			: 'ABV : 0'
			right 			: BB.PADDING_W
			top 			: 0
			color 			: '#ffffff'
			textAlign		: 'right'
			height 			: BB.HEIGHT*.05

		@srm_text 			= Ti.UI.createLabel
			width 			: BB.WIDTH
			text 			: 'SRM : 0'
			right 			: BB.PADDING_W
			top				: BB.PADDING_H
			color 			: '#ffffff'
			textAlign		: 'right'
			height 			: BB.HEIGHT*.05

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

		for grain in BB.ingredients.grains

			#Build Gravity Units
			grain_gravity_units = parseInt grain.weight * grain.gu_average
			if grain.extract != 1
				grain_gravity_units = grain_gravity_units * @efficiency
			@gravity_units += grain_gravity_units

			#Build Color
			grain_mcu = parseInt grain.weight * grain.lovibond_avg
			@srm += grain_mcu

			#Build Weight
			@weight += grain.weight

		#Update the Proportion of the Ingredient Please
		for grain in BB.ingredients.grains
			proportion = grain.weight/@weight
			grain.update_proportion(proportion)

		@ogu 		= @gravity_units/@volume
		@fgu 		= (@gravity_units * (@attenuation/100))/@volume
		@og 	 	= 1 + @ogu/1000
		@og 		= Math.round(@og*10000)/10000
		@fg 		= 1 + @fgu/1000
		@fg 		= 1 + (@og - @fg)
		@fg 		= Math.round(@fg*10000)/10000
		@abv 		= 131*(@og - @fg)
		@abv 		= Math.round(@abv*100)/100

		#If a property doesn't exist yet...
		#I think i could get rid of this...
		###
		@og 		= 0 unless @og
		@srm 		= 0 unless @srm
		@srm_rgb 	= 0 unless @srm_rgb
		@fg 		= 0 unless @fg
		@abv 		= 0 unless @abv
		###

		@og_text.setText "OG : #{@og}"
		@fg_text.setText "FG : #{@fg}"
		@abv_text.setText "ABV : #{@abv}"

		@calculate_color()
		@calculate_gu_bu()


	calculate_color : ->
		@srm = @srm/@volume
		@srm = 1.4922*(Math.pow(@srm, .6859));
		@srm = Math.round(@srm*10)/10

		if @srm > 40 then @srm_rgb = '0,0,0'
		else
			@srm_rgb = BB.utilities.srm_lookup.getItem @srm
			if @srm_rgb == undefined
				srm_rgb = '255,255,255'

		@srm_text.setText "SRM : #{@srm}"


	calculate_bitterness : =>

		@hop_weight = 0

		for hop in BB.ingredients.hops
			#This is almost certainly wrong, at least not that accurate i think i need to compare to a table, not a formula .... maybe? uh, what. who farted? 
			aa = (hop.properties.aa_lo + hop.properties.aa_hi)/2
			utilization = -1*(.0041 * Math.pow(hop.time, 2)) + (.6261 * hop.time) + 1.5779
			aau = hop.weight * utilization * .7489 * aa
			@ibu += aau

			#Build Weight
			@hop_weight += hop.weight

		#Update the Proportion of the Ingredient Please
		for hop in BB.ingredients.hops
			proportion = hop.weight/@hop_weight
			hop.update_proportion(proportion)

		@ibu = Math.round @ibu/@final_volume

		@ibu_text.setText "IBU\'S : #{@ibu}"
		@calculate_gu_bu()


	calculate_gu_bu : =>
		if @ibu == 0 then ibu = 1

		#if @fgu ==0 then @fgu = 1
		#else @fgu = 1000 * @fgu -1

		#@gu_bu = Math.round(@fgu/@ibu*1000)/1000

		if @is_prototype then @compare_to_bjcp()

	compare_to_bjcp : =>