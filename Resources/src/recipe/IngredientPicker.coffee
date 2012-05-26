class BB.IngredientModal extends BB.ModalPicker
 

    add_picker : (row_data) ->

        picker              = Ti.UI.createPicker
            type            : Ti.UI.PICKER_TYPE_PLAIN
            height          : BB.HEIGHT*.5
            bottom          : 0
            selectionIndicator : true

        rows = []
        for row in row_data
            rows.push Ti.UI.createPickerRow({ title : row })
        picker.add rows

        picker.addEventListener 'change', (e) ->
            Ti.API.info 'picker change'

        @window.add picker



    add_weight_slider : (units = 'lbs', decimals = 1, slider_value = 0, min = 0, max = 10) ->

        weight_label        = Ti.UI.createLabel
            right           : BB.PADDING_W
            bottom          : BB.HEIGHT*.5
            color           : 'white'
            textAlign       : 'right'
            text            : "#{slider_value} #{units}"

        weight_slider       = Ti.UI.createSlider
            bottom          : BB.HEIGHT*.5
            left            : BB.PADDING_W
            width           : BB.WIDTH*.7
            min             : min
            max             : max
            value           : slider_value

        weight_slider.addEventListener 'change', (e) ->
            weight_label.setText "#{e.value.toFixed(decimals)} #{units}"

        @window.add weight_label
        @window.add weight_slider



    add_time_slider : ->
        time_slider         = Ti.UI.createSlider
            bottom          : BB.HEIGHT*.6
            left            : BB.PADDING_W
            width           : BB.WIDTH*.7
            min             : item.min
            max             : item.max

        time_slider.addEventListener 'change', (e) ->
            @callback(e.value)

        @window.add time_slider
