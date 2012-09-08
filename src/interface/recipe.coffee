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
            fg      = new Measure 'Final Gravity'
            ibu     = new Measure 'IBU\'s'
            gubu    = new Measure 'GU/BU'
            abv     = new Measure 'ABV'
            srm     = new Measure 'SRM'
        ]

        page_wrap       = Ti.UI.createView
            width       : 100 * @steps.length + '%'
            height      : '100%'
            left        : 0

        measure_wrap    = Ti.UI.createView
            width       : 100 * @measures.length + '%'
            height      : '100%'
            left        : 0
            top         : 120

        for step in @steps
            step.set_position _i
            page_wrap.add step.view
        for measure in @measures
            measure.set_position _j
            measure_wrap.add measure.view

        page_touch      = Ti.UI.createView
            width       : Ti.Platform.displayCaps.platformWidth
            height      : 100
            top         : 0

        measure_touch   = Ti.UI.createView
            width       : Ti.Platform.displayCaps.platformWidth
            height      : 100
            top         : 120

        @handle_touch page_touch, page_wrap, @steps.length
        @handle_touch measure_touch, measure_wrap, @measures.length

        @window.add page_wrap, measure_wrap, page_touch, measure_touch

        bubbles = new Bubbles @window

        @window.open()


    handle_touch : (touch_element, control, control_length) ->
        start_pos   = 0
        wrap_pos    = 0

        touch_element.addEventListener 'touchstart', (e) =>
            start_pos   = e.x
            wrap_pos    = control.getLeft()

        touch_element.addEventListener 'touchmove', (e) =>
            control.setLeft(-1*(start_pos - e.x - wrap_pos))

        touch_element.addEventListener 'touchend', (e) =>
            @snap_to_point(control, control_length)


    snap_to_point : (control, control_length) ->

        width       = Ti.Platform.displayCaps.platformWidth
        left_pos    = Math.round(control.getLeft()/width)*width

        if left_pos <= 0 && left_pos > (-1*control_length*width)
            new_left = left_pos
        else if left_pos == width
            new_left = 0
        else
            new_left = -1*((control_length-1)*width)

        animation = Ti.UI.createAnimation
            left        : new_left
            duration    : 250

        animation.addEventListener 'complete', =>
            control.setLeft new_left

        control.animate animation