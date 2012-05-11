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


	calculate_bitterness : =>

		for hop in BB.ingredients.hops
			#This is almost certainly wrong, at least not that accurate
			#i think i need to compare to a table, not a formula .... maybe?
			#uh, what. who farted? 
			utilization = -1*(.0041 * Math.pow(hop.time, 2)) + (.6261 * hop.time) + 1.5779
			aau = hop.weight * utilization * .7489 * hop.aa
			@ibu += aau

		@ibu = Math.round @ibu/@final_volume
		@calculate_gu_bu()


	calculate_gu_bu : =>
		if @ibu == 0 then ibu = 1

		#if @fgu ==0 then @fgu = 1
		#else @fgu = 1000 * @fgu -1

		#@gu_bu = Math.round(@fgu/@ibu*1000)/1000

		if @is_prototype then @compare_to_bjcp()

	compare_to_bjcp : =>