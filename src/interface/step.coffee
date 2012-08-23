{Ti} = require './ti'
#db = Ti.Database.install '../ingredients.sqlite','ingredients'

class Step

    constructor : (@type) ->

        @window = Ti.UI.createWindow()

        label   = Ti.UI.createLabel
            title : type.substr(0, 1).toUpperCase() + type.substr(1)

        ###
        if @type is 'grains' then @data_source = db.execute('SELECT * FROM grains')
        if @type is 'hops' then @data_source = db.execute('SELECT * FROM grains')
        if @type is 'yeasts' then @data_source = db.execute('SELECT * FROM grains')
        ###

        @table = Ti.UI.createTableView
            bottom : 0

        @window.add label
        @window.add @table


    add_ingredient : (ingredient) ->

        row = Ti.UI.createTableViewRow
            title   : ingredient.name
            object  : ingredient

        row.addEventListener 'click', ->
            ingredient = require('./Ingredient')

        row.addEventListener 'delete', =>
            @remove()

        @table.appendRow row

    remove : (ingredient) ->
        if @type is 'grains' then ingredient.recipe.remove_grain ingredient
        if @type is 'hops' then ingredient.recipe.remove_hop ingredient
        if @type is 'yeasts' then ingredient.recipe.remove_yeast ingredient

exports.Step = Step