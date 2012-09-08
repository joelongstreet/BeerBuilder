{Bubble} = require('./interface/bubble/bubble')

class exports.Bubbles

    constructor : (@window) ->

        setInterval (=>
            bubble = new Bubble(@window)
            @window.add bubble
        ), 500

        

    rando : (hi, lo) ->
        return Math.floor(Math.random() * hi) + lo