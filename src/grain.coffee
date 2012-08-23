class exports.Grain

    constructor : (options, @weight = 0) ->

        if !options
            throw "Grain properites are required"
        else
            @lovibond      = options.lovibond
            @gravity_units = options.gravity_units

            if options.is_extract
                @is_extract = options.is_extract

        @recipe     = null
        @proportion = 0

    update_weight : (new_weight) ->
        @weight = new_weight

    get_proportion : ->
        proportion = @weight/@recipe.get_grain_weight()
        proportion = parseInt(proportion*100) + '%'