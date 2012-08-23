class exports.Hop
    
    constructor : (options, @weight = 0, @time = 0) ->

        if !options
            throw "Hop properites are required"
        else
            @aa = options.aa

        @recipe = null

    update_weight : (new_weight) ->
        @weight = new_weight

    update_time : (new_time) ->
        @time = new_time

    get_proportion : ->
        proportion = @weight/@recipe.get_hop_weight()
        proportion = parseInt(proportion*100) + '%'