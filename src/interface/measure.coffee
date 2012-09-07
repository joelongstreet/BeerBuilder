class Measure

    constructor : (title) ->

        @view       = Ti.UI.createView()
        @label      = Ti.UI.createLabel
            text    : 0
        title       = Ti.UI.createLabel
            text    : title

        graph       = Ti.UI.createView()

        line        = Ti.UI.createImageView()
        @pos_dot    = Ti.UI.createImageView()
        @max_dot    = Ti.UI.createImageView()
        @min_dot    = Ti.UI.createImageView()

        graph.add line, @max_dot, @min_dot, @pos_dot
        @view.add graph, title, @label

    update : (new_prop) ->
        

    update_min : (new_pos) ->
        @min_dot.setLeft new_pos

    update_max : (new_pos) ->
        @max_dot.setLeft new_pos

    update_dot : (new_pos) ->
        @label.setText new_pos
        @pos_dot.setLeft new_pos

exports.Measure = Measure