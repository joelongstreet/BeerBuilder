class exports.Bubble
    
    constructor : (window) ->

        left_pos = @rando Ti.Platform.displayCaps.platformWidth, 0 
        new_left = @rando left_pos + 10, left_pos - 20
        size     = @rando 25, 5

        view = Ti.UI.createView
            width           : size
            height          : size
            bottom          : -1*size
            left            : left_pos
            backgroundColor : 'rgba(255,255,255,.4)'
            borderRadius    : size*.5

        animation = Ti.UI.createAnimation
            bottom          : Ti.Platform.displayCaps.platformHeight
            left            : new_left
            duration        : @rando 2500, 800

        animation.addEventListener 'complete', =>
            window.remove view

        view.animate animation

        return view

    rando : (hi, lo) ->
        return Math.floor(Math.random() * hi) + lo