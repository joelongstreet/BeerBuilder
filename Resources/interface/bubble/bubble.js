(function() {

  exports.Bubble = (function() {

    function Bubble(window) {
      var animation, left_pos, new_left, view,
        _this = this;
      left_pos = this.rando(Ti.Platform.displayCaps.platformWidth, 0);
      new_left = this.rando(left_pos + 10, left_pos - 10);
      view = Ti.UI.createView({
        width: 10,
        height: 10,
        bottom: -5,
        left: left_pos,
        backgroundColor: 'blue',
        borderRadius: 10
      });
      animation = Ti.UI.createAnimation({
        bottom: Ti.Platform.displayCaps.platformHeight,
        left: new_left,
        duration: this.rando(2500, 800)
      });
      animation.addEventListener('complete', function() {
        return window.remove(view);
      });
      view.animate(animation);
      return view;
    }

    Bubble.prototype.rando = function(hi, lo) {
      return Math.floor(Math.random() * hi) + lo;
    };

    return Bubble;

  })();

}).call(this);
