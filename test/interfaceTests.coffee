chai = require 'chai'
chai.should()

{Recipe}    = require '../src/recipe'
{Grain}     = require '../src/grain'
{Hop}       = require '../src/hop'
{Yeast}     = require '../src/yeast'
{Step}      = require '../src/interface/Step'

recipe      = null

describe 'Steps', ->
    
    recipe = new Recipe()

    it 'a table should accept new rows', ->
        grain = new Grain({ name : 'American Crystal Malt 80L', gravity_units : 34, lovibond : 80, traits : []}, .875)
        recipe.add_grain grain
        recipe.steps.grains.table.data.length.should.equal 1

    it 'clicking a row, should trigger the ingredient window', ->
        recipe.steps.grains.table.data.length.should.equal 1
        recipe.steps.grains.table.data[0].trigger_click().should.equal 3
        