{IngredientDetail} = require('./interface/IngredientDetail')
#db = Ti.Database.install '../ingredients.sqlite','ingredients'

class Step

    constructor : (@type) ->
        @view       = Ti.UI.createView
            top     : 0
            width   : '100%'
            height  : '100%'
        @table      = Ti.UI.createTableView
            bottom  : 0
            height  : 150
            backgroundColor : 'grey'
        label       = Ti.UI.createLabel
            title   : type.substr(0, 1).toUpperCase() + type.substr(1)

        ###
        if @type is 'grains' then @data_source = db.execute('SELECT * FROM grains')
        if @type is 'hops' then @data_source = db.execute('SELECT * FROM grains')
        if @type is 'yeasts' then @data_source = db.execute('SELECT * FROM grains')
        else @data_source = []
        ###
        @data_source = []

        @view.add label
        @view.add @table


    add_ingredient : (ingredient) ->

        row = Ti.UI.createTableViewRow
            title   : ingredient.name
            object  : ingredient

        row.addEventListener 'click', =>
            detail = new IngredientDetail ingredient, @data_source, @type
            detail.open_me()

        row.addEventListener 'delete', ->
            @remove_ingredient()

        @table.appendRow row

    remove_ingredient : (ingredient) ->
        if @type is 'grains' then ingredient.recipe.remove_grain ingredient
        if @type is 'hops' then ingredient.recipe.remove_hop ingredient
        if @type is 'yeasts' then ingredient.recipe.remove_yeast ingredient

    drag_table : ->

    set_position : (position) ->
        if position is 0
            @view.setBackgroundColor 'red'
        else if position is 1
            @view.setBackgroundColor 'green'
        else if position is 2
            @view.setBackgroundColor 'blue'
        else if position is 3
            @view.setBackgroundColor 'yellow'
        else if position is 4
            @view.setBackgroundColor 'orange'

        @view.setLeft position * Ti.Platform.displayCaps.platformWidth

    open : ->
        @view.open()

exports.Step = Step