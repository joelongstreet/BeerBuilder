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
        current_pos = 0
        wrap_pos    = 0

        @window.addEventListener 'touchstart', (e) =>
            start_pos   = e.x
            wrap_pos    = @wrap.getLeft()

        @window.addEventListener 'touchmove', (e) =>
            @wrap.setLeft(-1*(start_pos - e.x - wrap_pos))

        @window.open()