class exports.RecipeInterface
    
    constructor : (@steps) ->
    
        @window = Ti.UI.createWindow
            width       : '100%'
            height      : '100%'
        @wrap   = Ti.UI.createView
            width       : 100 * @steps.length + '%'
            height      : '100%'
            left        : 0
            touchEnabled: false

        for step in @steps
            step.set_position _i
            @wrap.add step.view

        @window.add @wrap

        start_pos   = 0
        wrap_pos    = 0

        @window.addEventListener 'touchstart', (e) =>
            start_pos   = e.x
            wrap_pos    = @wrap.getLeft()

        @window.addEventListener 'touchmove', (e) =>
            @wrap.setLeft(-1*(start_pos - e.x - wrap_pos))

        @window.addEventListener 'touchend', (e) =>
            @snap_to_point()

        @window.open()


    snap_to_point : (current_x) ->

        width       = Ti.Platform.displayCaps.platformWidth
        left_pos    = Math.round(@wrap.getLeft()/width)*width

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
            @wrap.setLeft new_left

        @wrap.animate animation