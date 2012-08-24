{Ti} = require '../../TitaniumMocha/Ti'

class exports.TextSlide
    
    constructor : (top, left) ->

        view        = Ti.UI.createView()

        label       = Ti.UI.createLabel
            left    : left
            top     : top

        view.add label

        return view