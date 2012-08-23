{Ti} = require './ti'

class exports.IngredientPicker
    
    constructor : (@data, item_callback) ->

        if !@data then throw "Data is required to make a picker"
        if !item_callback then "I need a callback"

        @picker = Ti.UI.createPicker()

        for item in @data
            row = Ti.UI.createPickerRow
                title   : item.name
                object  : item
            @picker.add row
        
        @picker.addEventListener 'change', (e) ->
            item_callback e.row.object