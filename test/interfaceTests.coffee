chai = require 'chai'
chai.should()

{Recipe}        = require '../src/recipe'
{Grain}         = require '../src/grain'
{Hop}           = require '../src/hop'
{Yeast}         = require '../src/yeast'
{Step}          = require '../src/interface/Step'
{Ingredient}    = require '../src/interface/Ingredient'

recipe      = null



describe 'Steps', ->
    
    recipe = new Recipe()

    it 'should accept new rows for the table', ->
        grain = new Grain({ name : 'American Crystal Malt 80L', gravity_units : 34, lovibond : 80, traits : []}, .875)
        recipe.add_grain grain
        recipe.steps.grains.table.data.length.should.equal 1

    ###
    it 'should trigger the ingredient window when a table row is clicked', ->
        recipe.steps.grains.table.data[0].trigger_click().should.equal 'false'

    it 'should remove an ingredient from the recipe when table row is removed', ->
        recipe.steps.grains.table.data[0].trigger_remove()
        recipe.grains.should.equal 0

    it 'should add ingredients to the recipe when asked by the UI', ->
        recipe.steps.grains.drag_table()
        recipe.grains.should.equal 1
    ###


###
describe 'Ingredient', ->
    
    it 'should update it\'s respective recipe when changed', ->
        recipe.steps.current_ingredient.update_weight(5)
        recipe.grains[1].weight.should.equal 5

    it 'should update other visual elements', ->
        recipe.steps.current_ingredient.update_weight(5)
        recipe.props.original_gravity.should.qual 10
###