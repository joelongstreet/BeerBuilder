chai = require 'chai'
chai.should()

{Recipe}        = require '../src/recipe'
{Grain}         = require '../src/grain'
{Hop}           = require '../src/hop'
{Yeast}         = require '../src/yeast'
{Step}          = require '../src/interface/Step'
{IngredientDetail} = require '../src/interface/IngredientDetail'

recipe      = null



describe 'Steps', ->
    
    recipe = new Recipe()
    grain = null

    it 'should accept new rows for the table', ->
        grain = new Grain({ name : 'American Crystal Malt 80L', gravity_units : 34, lovibond : 80, traits : []}, .875)
        recipe.add_grain grain
        recipe.steps.grains.table.data.length.should.equal 1

    it 'should trigger the ingredient window when a table row is clicked', ->
        recipe.steps.grains.table.data[0].trigger_click().should.equal 'window opened'

    it 'should remove an ingredient from the recipe when table row is removed', ->
        recipe.steps.grains.remove_ingredient grain
        recipe.grains.length.should.equal 0

    ###
    it 'should add ingredients to the recipe when asked by the UI', ->
        recipe.steps.grains.drag_table()
        recipe.grains.should.equal 1
    ###


describe 'Ingredient Detail', ->
    
    