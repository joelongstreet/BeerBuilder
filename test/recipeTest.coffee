chai = require 'chai'
chai.should()

{Recipe}    = require '../src/recipe'
{Grain}     = require '../src/grain'
{Hop}       = require '../src/hop'

recipe      = null



describe 'Recipe', ->

    it 'should begin with no ingredients', ->
        recipe = new Recipe
        recipe.grains.length.should.equal 0
        recipe.hops.length.should.equal 0
        recipe.yeasts.length.should.equal 0

    it 'should allow ingredients to be added', ->
        grain = new Grain
            name            : 'American Crystal Malt 80L'
            gravity_units   : 34
            lovibond        : 80
            traits          : []
        recipe.add_grain grain
        recipe.grains.length.should.equal 1

    it 'should allow ingredients to be deleted by index', ->
        recipe.remove_grain 0
        recipe.grains.length.should.equal 0



describe 'Grain', ->
    
    grain = grain1 = grain2 = null

    it 'should throw errors if no options are passed', ->
        (-> grain = new Grain()).should.throw "Grain properites are required"

    it 'should be able to belong to a recipe', ->
        grain1 = new Grain
            name            : 'American Crystal Malt 80L'
            gravity_units   : 34
            lovibond        : 80
            traits          : []
        
        grain2 = new Grain
            name            : 'American 2 Row'
            gravity_units   : 37.5
            lovibond        : 6.5
            traits          : []

        recipe.add_grain grain1
        recipe.add_grain grain2

        grain1.recipe.should.equal recipe
        grain2.recipe.should.equal recipe

    it 'changing a grain\'s weight should update the total weight', ->
        grain1.update_weight .875
        grain2.update_weight 9.25
        recipe.get_grain_weight().should.equal 10.125

    it 'knows how to calculate a porportion', ->
        grain1.get_proportion().should.equal '9%'
        grain2.get_proportion().should.equal '91%'

    it 'changing a grain\'s weight should update the gravity units', ->
        recipe.get_gravity_units().should.equal 282.5

    it 'changing a grain\'s weight should update the original gravity', ->
        recipe.get_original_gravity().should.equal 1.0565

    it 'changing a grain\'s weight should update the final gravity', ->
        recipe.get_final_gravity().should.equal 1.0141

    it 'changing a grain\'s weight should update the abv', ->
        recipe.get_abv().should.equal 5.55



describe 'Hop', ->

    hop = hop1 = hop2 = hop3 = null

    it 'should throw errors if no options are passed', ->
        (-> hop = new Hop()).should.throw "Hop properites are required"

    it 'should be able to belong to a recipe', ->
        hop1 = new Hop
            name    : 'Northern Brewer'
            aa      : 8

        hop2 = new Hop
            name    : 'Northern Brewer'
            aa      : 8

        hop3 = new Hop
            name    : 'Northern Brewer'
            aa      : 8
        
        recipe.add_hop hop1
        recipe.add_hop hop2

        hop1.recipe.should.equal recipe
        hop2.recipe.should.equal recipe

    it 'changing a hop\'s weight or time should update the ibus', ->
        hop1.weight = 1.2
        hop2.weight = .5
        hop3.weight = .5
        hop1.time   = 60
        hop2.time   = 14
        hop3.time   = 1

        recipe.get_ibu().should.equal 40.78

    it 'knows how to calculate a porportion', ->
        hop1.get_proportion().should.equal '71%'
        hop2.get_proportion().should.equal '29%'
        hop3.get_proportion().should.equal '91%'