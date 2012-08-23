class exports.Ti
    
    @UI = {}

    @UI.createWindow = ->
        add : ->
            return false

    @UI.createLabel = -> 1

    @UI.createTableView = ->
        appendRow : ->
            return false

    @UI.createTableViewRow =->
        addEventListener : ->
            return false
    @UI.createPickerView = -> 1
    @UI.createPickerRow = -> 1