(function() {
  var Bubbles, Measure, Step;

  Bubbles = require('./interface/bubble/bubbles').Bubbles;

  Step = require('./interface/step').Step;

  Measure = require('./interface/measure').Measure;

  exports.RecipeInterface = (function() {

    function RecipeInterface() {
      var bubbles, grains, hops, measure, og, setup, start_pos, step, wrap_pos, yeasts, _i, _j, _len, _len2, _ref, _ref2,
        _this = this;
      this.window = Ti.UI.createWindow({
        width: '100%',
        height: '100%',
        backgroundColor: '#f99208'
      });
      this.steps = [setup = new Step('setup'), grains = new Step('grains'), hops = new Step('hops'), yeasts = new Step('yeasts')];
      this.measures = [og = new Measure('Original Gravity')];
      this.page_wrap = Ti.UI.createView({
        width: 100 * this.steps.length + '%',
        height: '100%',
        left: 0,
        touchEnabled: false
      });
      this.measure_wrap = Ti.UI.createView({
        width: 100 * this.steps.length + '%',
        height: '100%',
        left: 0,
        touchEnabled: false
      });
      _ref = this.steps;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        step = _ref[_i];
        step.set_position(_i);
        this.page_wrap.add(step.view);
      }
      _ref2 = this.measures;
      for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
        measure = _ref2[_j];
        measure.set_position(_j);
        this.measure_wrap.add(measure.view);
      }
      this.window.add(this.page_wrap, this.measure_wrap);
      start_pos = 0;
      wrap_pos = 0;
      this.window.addEventListener('touchstart', function(e) {
        start_pos = e.x;
        return wrap_pos = _this.page_wrap.getLeft();
      });
      this.window.addEventListener('touchmove', function(e) {
        return _this.page_wrap.setLeft(-1 * (start_pos - e.x - wrap_pos));
      });
      this.window.addEventListener('touchend', function(e) {
        return _this.snap_to_point();
      });
      bubbles = new Bubbles(this.window);
      this.window.open();
    }

    RecipeInterface.prototype.snap_to_point = function() {
      var animation, left_pos, new_left, width,
        _this = this;
      width = Ti.Platform.displayCaps.platformWidth;
      left_pos = Math.round(this.page_wrap.getLeft() / width) * width;
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
        return _this.page_wrap.setLeft(new_left);
      });
      return this.page_wrap.animate(animation);
    };

    return RecipeInterface;

  })();

}).call(this);
