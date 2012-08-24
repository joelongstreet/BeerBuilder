class exports.Hop
    
    constructor : (options, @weight = 0, @time = 0) ->

        if !options
            throw "Hop properites are required"
        else
            @aa = options.aa

        @recipe = null

    update_weight : (new_weight) ->
        @weight = new_weight
        @recipe.measures.uby.update @recipe.get_ibu
        @recipe.measures.gubu.update @recipe.get_gu_bu

    update_time : (new_time) ->
        @time = new_time
        @recipe.measures.uby.update @recipe.get_ibu
        @recipe.measures.gubu.update @recipe.get_gu_bu

    get_proportion : ->
        proportion = @weight/@recipe.get_hop_weight()
        proportion = parseInt(proportion*100) + '%'