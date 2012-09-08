(function() {

  exports.Bubble = (function() {

    function Bubble(window) {
      var animation, left_pos, new_left, size, view,
        _this = this;
      left_pos = this.rando(Ti.Platform.displayCaps.platformWidth, 0);
      new_left = this.rando(left_pos + 10, left_pos - 20);
      size = this.rando(25, 5);
      view = Ti.UI.createView({
        width: size,
        height: size,
        bottom: -1 * size,
        left: left_pos,
        backgroundColor: 'rgba(255,255,255,.4)',
        borderRadius: size * .5
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
