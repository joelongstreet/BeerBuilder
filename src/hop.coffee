class exports.Hop
    
    constructor : (options) ->

        if !options
            throw "Hop properites are required"

        else
            @aa = options.aa

        @recipe     = null
        @weight     = 0
        @time       = 0

    update_weight : (new_weight) ->
        @weight = new_weight

    update_time : (new_time) ->
        @time = new_time

    get_proportion : ->
        proportion = @weight/@recipe.get_hop_weight()
        proportion = proportion.toFixed(2)
        proportion = proportion*100 + '%'