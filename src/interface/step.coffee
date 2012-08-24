{Ti} = require '../../TitaniumMocha/Ti'
#db = Ti.Database.install '../ingredients.sqlite','ingredients'

class Step

    constructor : (@type) ->

        @current_ingredient = null

        @window     = Ti.UI.createWindow()
        @table      = Ti.UI.createTableView()
        label       = Ti.UI.createLabel
            title   : type.substr(0, 1).toUpperCase() + type.substr(1)

        ###
        if @type is 'grains' then @data_source = db.execute('SELECT * FROM grains')
        if @type is 'hops' then @data_source = db.execute('SELECT * FROM grains')
        if @type is 'yeasts' then @data_source = db.execute('SELECT * FROM grains')
        ###

        @window.add label
        @window.add @table


    add_ingredient : (ingredient) ->

        row = Ti.UI.createTableViewRow
            title   : ingredient.name
            object  : ingredient

        row.addEventListener 'click', =>
            @current_ingredient = require('./Ingredient')
            return 3

        row.addEventListener 'delete', ->
            @remove_ingredient()

        @table.appendRow row

    remove_ingredient : (ingredient) ->
        if @type is 'grains' then ingredient.recipe.remove_grain ingredient
        if @type is 'hops' then ingredient.recipe.remove_hop ingredient
        if @type is 'yeasts' then ingredient.recipe.remove_yeast ingredient

    drag_table : ->

exports.Step = Step