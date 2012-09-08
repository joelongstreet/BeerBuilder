class exports.Measure

    constructor : (title) ->

        @view       = Ti.UI.createView
            width   : Ti.Platform.displayCaps.platformWidth*.9
            height  : 40
            top     : 30

        label_key   = Ti.UI.createLabel
            bottom  : 0
            left    : Ti.Platform.displayCaps.platformWidth*.05
            width   : '100%'
            text    : title
            color   : 'white'

        @label_val  = Ti.UI.createLabel
            bottom  : 0
            right   : 0
            width   : '100%'
            text    : '1.059'
            color   : 'white'
            textAlign : 'right'

        line        = Ti.UI.createImageView
            top     : 3
            height  : 2
            width   : '100%'
            left    : Ti.Platform.displayCaps.platformWidth*.05
            backgroundColor : 'white'
            borderRadius : 1

        @pos_dot    = @create_dot(10)
        @max_dot    = @create_dot(230)
        @min_dot    = @create_dot(60)

        @view.add line, @max_dot, @min_dot, @pos_dot, label_key, @label_val

    update : (new_prop) ->
        

    update_min : (new_pos) ->
        @min_dot.setLeft new_pos

    update_max : (new_pos) ->
        @max_dot.setLeft new_pos

    update_dot : (new_pos) ->
        @label.setText new_pos
        @pos_dot.setLeft new_pos

    create_dot : (left_pos) ->
        Ti.UI.createImageView
            left    : left_pos
            width   : 8
            height  : 8
            top     : 0
            backgroundColor : 'white'
            borderRadius : 4

    set_position : (position) ->
        @view.setLeft position * Ti.Platform.displayCaps.platformWidth