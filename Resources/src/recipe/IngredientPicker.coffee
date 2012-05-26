class BB.IngredientModal extends BB.ModalPicker
 

    add_picker : (row_data = [], picker_value = 0, callback = ->) ->

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
            callback e.rowIndex

        @window.add picker

        #HACK - this is an appcelerator bug I can't avoid
        setTimeout (->
            picker.setSelectedRow 0, picker_value, true
        ), 250



    add_weight_slider : (units = 'lbs', decimals = 1, slider_value = 0, min = 0, max = 10, callback = ->) ->

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
            callback(e.value)

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
