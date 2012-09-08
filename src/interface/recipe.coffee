{Bubbles}   = require('./interface/bubble/bubbles')
{Step}      = require './interface/step'
{Measure}   = require './interface/measure'

class exports.RecipeInterface
    
    constructor : ->
    
        @window     = Ti.UI.createWindow
            width       : '100%'
            height      : '100%'
            backgroundColor : '#f99208'

        @steps      = [
            setup   = new Step 'setup'
            grains  = new Step 'grains'
            hops    = new Step 'hops'
            yeasts  = new Step 'yeasts'
        ]

        @measures   = [
            og      = new Measure 'Original Gravity'
            #fg      = new Measure 'Final Gravity'
            #ibu     = new Measure 'IBU\'s'
            #gubu    = new Measure 'GU/BU'
            #abv     = new Measure 'ABV'
            #srm     = new Measure 'SRM'
        ]

        @page_wrap      = Ti.UI.createView
            width       : 100 * @steps.length + '%'
            height      : '100%'
            left        : 0
            touchEnabled: false

        @measure_wrap   = Ti.UI.createView
            width       : 100 * @steps.length + '%'
            height      : '100%'
            left        : 0
            touchEnabled: false

        for step in @steps
            step.set_position _i
            @page_wrap.add step.view
        for measure in @measures
            measure.set_position _j
            @measure_wrap.add measure.view

        @window.add @page_wrap, @measure_wrap

        start_pos   = 0
        wrap_pos    = 0

        @window.addEventListener 'touchstart', (e) =>
            start_pos   = e.x
            wrap_pos    = @page_wrap.getLeft()

        @window.addEventListener 'touchmove', (e) =>
            @page_wrap.setLeft(-1*(start_pos - e.x - wrap_pos))

        @window.addEventListener 'touchend', (e) =>
            @snap_to_point()

        bubbles = new Bubbles @window

        @window.open()


    snap_to_point : ->

        width       = Ti.Platform.displayCaps.platformWidth
        left_pos    = Math.round(@page_wrap.getLeft()/width)*width

        if left_pos <= 0 && left_pos > (-1*@steps.length*width)
            new_left = left_pos
        else if left_pos == width
            new_left = 0
        else
            new_left = -1*((@steps.length-1)*width)

        animation = Ti.UI.createAnimation
            left        : new_left
            duration    : 250

        animation.addEventListener 'complete', =>
            @page_wrap.setLeft new_left

        @page_wrap.animate animation