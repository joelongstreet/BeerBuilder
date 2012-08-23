class exports.Recipe
    
    constructor : ->
        @efficiency     = .75
        @volume         = 5
        @attenuation    = .75

        @grains         = []
        @hops           = []
        @yeasts         = []

    get_efficiency : (new_efficiency) ->
        @efficiency = new_efficiency

    get_grain_weight : ->
        total_weight = 0
        for grain in @grains
            total_weight += grain.weight

        return total_weight

    get_gravity_units : ->
        gravity_units = 0
        for grain in @grains
            grain_units = grain.weight * grain.gravity_units
            if !grain.is_extract
                grain_units *= @efficiency
            gravity_units += grain_units

        return parseFloat(gravity_units.toFixed 1)

    get_original_gravity : ->
        og_units = @get_gravity_units()/@volume
        og = 1 + og_units/1000
        og = parseFloat(og.toFixed 4)

    get_final_gravity : ->
        fg_units = @get_gravity_units()*@attenuation/@volume
        fg = 1 + (@get_original_gravity() - (1 + fg_units/1000))
        fg = parseFloat(fg.toFixed 4)
        return fg

    get_srm : ->
        color_units = 0
        for grain in @grains
            grain_srm = grain.weight * grain.lovibond
            color_units += grain_srm

        srm = color_units/@volume
        srm = 1.4922*(Math.pow(srm, .6859))

    get_color : ->
        rgb = srm_lookup.getItem @get_srm()

        if rgb == undefined
            rgb = '255,255,255'
        return rgb

    get_gu_bu : ->
        gubu = Math.round(@get_final_gravity()/@get_ibu()*1000)/1000

    get_abv : ->
        abv = 131*(@get_original_gravity() - @get_final_gravity())
        abv = parseFloat(abv.toFixed 2)

    get_hop_weight : ->
        total_weight = 0
        for hop in @hops
            total_weight += hop.weight

        return total_weight

    get_ibu : ->
        ibu = 0
        for hop in @hops
            utilization = -1*(.0041 * Math.pow(hop.time, 2)) + (.6261 * hop.time) + 1.5779
            aau = hop.weight * utilization * .7489 * hop.aa
            ibu += aau

        ibu = ibu/@volume

        return parseFloat(ibu.toFixed 2)

    add_grain : (ingredient) ->
        ingredient.recipe = @
        @grains.push ingredient

    add_hop : (ingredient) ->
        ingredient.recipe = @
        @hops.push ingredient

    add_yeast : (ingredient) ->
        ingredient.recipe = @
        @hops.push ingredient

    remove_grain : (ingredient) ->
        @grains.splice ingredient, 1

    remove_hop : (ingredient) ->
        @hops.splice ingredient, 1

    remove_yeast : (ingredient) ->
        @yeasts.splice ingredient, 1