class exports.Yeast
    
    constructor : (options) ->

        if !options
            throw "Yeast properites are required"

        else
            @attenuation = options.attenuation

        @recipe     = null