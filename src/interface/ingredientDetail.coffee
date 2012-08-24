{Ti}        = require '../../TitaniumMocha/Ti'
{TextSlide} = require './TextSlide'

class exports.IngredientDetail

    constructor : (ingredient, data, type) ->

        if !data then throw "Data is required to make a picker"

        @window = Ti.UI.createWindow()
        picker  = Ti.UI.createPicker()

        if type is'grains' or type is 'hops'
            weight = new TextSlide (e) ->
                ingredient.update_weight e.result
            @window.add weight

        if type is 'hops'
            time = new TextSlide (e) ->
                ingredient.update_time e.result
            @window.add time

        for item in data
            row = Ti.UI.createPickerRow
                title   : item.name
                object  : item
            picker.add row
        
        picker.addEventListener 'change', (e) ->
            ingredient.update_self e.something

        @window.add picker

    open_me : ->
        @window.open()
        return 'window opened'