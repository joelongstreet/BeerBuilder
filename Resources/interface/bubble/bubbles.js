(function() {
  var Bubble;

  Bubble = require('./interface/bubble/bubble').Bubble;

  exports.Bubbles = (function() {

    function Bubbles(window) {
      var _this = this;
      this.window = window;
      setInterval((function() {
        var bubble;
        bubble = new Bubble(_this.window);
        return _this.window.add(bubble);
      }), 500);
    }

    Bubbles.prototype.rando = function(hi, lo) {
      return Math.floor(Math.random() * hi) + lo;
    };

    return Bubbles;

  })();

}).call(this);
