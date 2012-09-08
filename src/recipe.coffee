{RecipeInterface}   = require './interface/recipe'
{srm_lookup}        = require './srm_lookup'

class exports.Recipe
    
    constructor : (ingredients) ->
        @interface  = new RecipeInterface()
        @srm_lookup = srm_lookup

        @grains     = []
        @hops       = []
        @yeasts     = []

        @efficiency = .75
        @volume     = 5

        if !ingredients then ingredients = {}
        
        if ingredients.grains
            for grain in ingredients.grains
                @add_grain grain

        if ingredients.hops
            for hop in ingredients.hops
                @add_hop hop

        if ingredients.yeasts
            for yeast in ingredients.yeasts
                @add_yeast yeast

    get_efficiency : (new_efficiency) ->
        @efficiency = new_efficiency

    get_grain_weight : ->
        total_weight = 0
        for grain in @grains
            total_weight += grain.weight

        return total_weight

    get_attenuation : ->
        if @yeasts.length
            attenuation = 0
            for yeast in @yeasts
                attenuation += yeast.attenuation
            attenuation/@yeasts.length
            return parseFloat(attenuation.toFixed 2)
        else
            return .75

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
        fg_units = @get_gravity_units()*@get_attenuation()/@volume
        fg = 1 + (@get_original_gravity() - (1 + fg_units/1000))
        fg = parseFloat(fg.toFixed 4)
        return fg

    get_srm : ->
        mcu = 0
        for grain in @grains
            mcu += grain.weight * grain.lovibond / @volume

        srm = 1.4922*(Math.pow(mcu, .6859))
        Math.round srm

    get_hex : ->
        hex = @srm_lookup[@get_srm()]
        if hex == undefined then hex = '#000000'
        return hex

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
        @interface.steps['grains'].add_ingredient ingredient

    add_hop : (ingredient) ->
        ingredient.recipe = @
        @hops.push ingredient
        @interface.steps['hops'].add_ingredient ingredient

    add_yeast : (ingredient) ->
        ingredient.recipe = @
        @yeasts.push ingredient
        @interface.steps['yeasts'].add_ingredient ingredient

    remove_grain : (index) ->
        if typeof index == 'object'
            index = @grains.indexOf index
        @grains.splice index, 1

    remove_hop : (index) ->
        if typeof index == 'object'
            index = @hops.indexOf index
        @hops.splice index, 1

    remove_yeast : (index) ->
        if typeof index == 'object'
            index = @yeasts.indexOf index
        @hops.splice index, 1

    build_ui : ->
        @window = Ti.UI.createWindow
            width       : '100%'
            height      : '100%'
        @wrap   = Ti.UI.createView
            width       : 100 * @steps.length + '%'
            height      : '100%'
            left        : 0
            touchEnabled: false

        for step in @steps
            step.set_position _i
            @wrap.add step.view

        @window.add @wrap

        start_pos   = 0
        current_pos = 0
        wrap_pos    = 0

        @window.addEventListener 'touchstart', (e) =>
            start_pos   = e.x
            wrap_pos    = @wrap.getLeft()

        @window.addEventListener 'touchmove', (e) =>
            @wrap.setLeft(-1*(start_pos - e.x - wrap_pos))

        @window.open()