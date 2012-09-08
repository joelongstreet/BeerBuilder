(function() {
  var Bubbles;

  Bubbles = require('./interface/bubble/bubbles').Bubbles;

  exports.RecipeInterface = (function() {

    function RecipeInterface(steps) {
      var bubbles, start_pos, step, wrap_pos, _i, _len, _ref,
        _this = this;
      this.steps = steps;
      this.window = Ti.UI.createWindow({
        width: '100%',
        height: '100%',
        backgroundColor: '#f99208'
      });
      this.wrap = Ti.UI.createView({
        width: 100 * this.steps.length + '%',
        height: '100%',
        left: 0,
        touchEnabled: false
      });
      _ref = this.steps;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        step = _ref[_i];
        step.set_position(_i);
        this.wrap.add(step.view);
      }
      this.window.add(this.wrap);
      start_pos = 0;
      wrap_pos = 0;
      this.window.addEventListener('touchstart', function(e) {
        start_pos = e.x;
        return wrap_pos = _this.wrap.getLeft();
      });
      this.window.addEventListener('touchmove', function(e) {
        return _this.wrap.setLeft(-1 * (start_pos - e.x - wrap_pos));
      });
      this.window.addEventListener('touchend', function(e) {
        return _this.snap_to_point();
      });
      bubbles = new Bubbles(this.window);
      this.window.open();
    }

    RecipeInterface.prototype.snap_to_point = function(current_x) {
      var animation, left_pos, new_left, width,
        _this = this;
      width = Ti.Platform.displayCaps.platformWidth;
      left_pos = Math.round(this.wrap.getLeft() / width) * width;
      if (left_pos <= 0 && left_pos > (-1 * this.steps.length * width)) {
        new_left = left_pos;
      } else if (left_pos === width) {
        new_left = 0;
      } else {
        new_left = -1 * ((this.steps.length - 1) * width);
      }
      animation = Ti.UI.createAnimation({
        left: new_left,
        duration: 250
      });
      animation.addEventListener('complete', function() {
        return _this.wrap.setLeft(new_left);
      });
      return this.wrap.animate(animation);
    };

    return RecipeInterface;

  })();

}).call(this);
