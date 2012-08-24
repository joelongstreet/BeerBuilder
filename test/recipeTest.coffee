chai = require 'chai'
chai.should()

{Recipe}    = require '../src/recipe'
{Grain}     = require '../src/grain'
{Hop}       = require '../src/hop'
{Yeast}     = require '../src/yeast'

recipe      = null



describe 'Recipe', ->

    it 'should begin with no ingredients', ->
        recipe = new Recipe()
        recipe.grains.length.should.equal 0
        recipe.hops.length.should.equal 0
        recipe.yeasts.length.should.equal 0

    it 'should allow ingredients to be added', ->
        grain = new Grain({ name : 'American Crystal Malt 80L', gravity_units : 34, lovibond : 80, traits : []})
        recipe.add_grain grain
        recipe.grains.length.should.equal 1

    it 'should allow ingredients to be deleted by index', ->
        recipe.remove_grain 0
        recipe.grains.length.should.equal 0

    it 'should allow ingredients to be deleted by their object definition', ->
        grain = new Grain({ name : 'American Crystal Malt 80L', gravity_units : 34, lovibond : 80, traits : []})
        recipe.add_grain grain
        recipe.remove_grain grain
        recipe.grains.length.should.equal 0

    it 'should be able to be prepopulated by a variety of ingredients', ->
        anchor_steam = new Recipe
            grains : [
                new Grain({ name : 'American Crystal Malt 80L', gravity_units : 34, lovibond : 80, traits : []}, .875)
                new Grain({ name : 'American 2 Row', gravity_units : 37.5, lovibond : 6.5, traits : []}, 9.25),
            ]
            hops : [
                new Hop({name : 'Northern Brewer', aa : 8}, 1.2, 60)
                new Hop({name : 'Northern Brewer', aa : 8}, .5, 14)
                new Hop({name : 'Northern Brewer', aa : 8}, .5, 1)
            ]

        anchor_steam.get_original_gravity().should.equal 1.0565
        anchor_steam.get_ibu().should.equal 42.09

    ###
    it 'should accept a prototype as a style guideline', ->

    it 'should change min and max values for measures when the recipe type changes', ->
        recipe.grains.length.should.equal 'a billion'
    ###



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
        grain1.get_proportion().should.equal '8%'
        grain2.get_proportion().should.equal '91%'

    it 'should update the gravity units when a grain\'s weight has changed', ->
        recipe.get_gravity_units().should.equal 282.5

    it 'should update the original gravity when a grain\'s weight has changed', ->
        recipe.get_original_gravity().should.equal 1.0565

    it 'should update the final gravity when a grain\'s weight has changed', ->
        recipe.get_final_gravity().should.equal 1.0141

    it 'should update the abv when a grain\'s weight has changed', ->
        recipe.get_abv().should.equal 5.55

    it 'should update the srm when a grain\'s weight has changed', ->
        recipe.get_srm().should.equal 14

    it 'should update the hex color when a grain\'s weight has changed', ->
        recipe.get_hex().should.equal '#C35900'


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
        recipe.add_hop hop3

        hop1.recipe.should.equal recipe
        hop2.recipe.should.equal recipe
        hop3.recipe.should.equal recipe

    it 'changing a hop\'s weight or time should update the ibus', ->
        hop1.weight = 1.2
        hop2.weight = .5
        hop3.weight = .5
        hop1.time   = 60
        hop2.time   = 14
        hop3.time   = 1

        recipe.get_ibu().should.equal 42.09

    it 'knows how to calculate a porportion', ->
        hop1.get_proportion().should.equal '54%'
        hop2.get_proportion().should.equal '22%'
        hop3.get_proportion().should.equal '22%'



describe 'Yeast', ->

    yeast = null

    it 'should throw errors if no options are passed', ->
        (-> yeast = new Yeast()).should.throw "Yeast properites are required"

    it 'should be able to belong to a recipe', ->
        yeast = new Yeast({ name : 'Low Attenuating Yeast', attenuation : .8 })
        recipe.add_yeast yeast
        yeast.recipe.should.equal recipe

    it 'should effect a recipe\'s final gravity', ->
        yeast.recipe.get_final_gravity().should.not.equal 1.0141