(function() {
  var Bubbles, Measure, Step;

  Bubbles = require('./interface/bubble/bubbles').Bubbles;

  Step = require('./interface/step').Step;

  Measure = require('./interface/measure').Measure;

  exports.RecipeInterface = (function() {

    function RecipeInterface() {
      var abv, bubbles, fg, grains, gubu, hops, ibu, measure, measure_touch, measure_wrap, og, page_touch, page_wrap, setup, srm, step, yeasts, _i, _j, _len, _len2, _ref, _ref2;
      this.window = Ti.UI.createWindow({
        width: '100%',
        height: '100%',
        backgroundColor: '#f99208'
      });
      this.steps = [setup = new Step('setup'), grains = new Step('grains'), hops = new Step('hops'), yeasts = new Step('yeasts')];
      this.measures = [og = new Measure('Original Gravity'), fg = new Measure('Final Gravity'), ibu = new Measure('IBU\'s'), gubu = new Measure('GU/BU'), abv = new Measure('ABV'), srm = new Measure('SRM')];
      page_wrap = Ti.UI.createView({
        width: 100 * this.steps.length + '%',
        height: '100%',
        left: 0
      });
      measure_wrap = Ti.UI.createView({
        width: 100 * this.measures.length + '%',
        height: '100%',
        left: 0,
        top: 120
      });
      _ref = this.steps;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        step = _ref[_i];
        step.set_position(_i);
        page_wrap.add(step.view);
      }
      _ref2 = this.measures;
      for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
        measure = _ref2[_j];
        measure.set_position(_j);
        measure_wrap.add(measure.view);
      }
      page_touch = Ti.UI.createView({
        width: Ti.Platform.displayCaps.platformWidth,
        height: 100,
        top: 0
      });
      measure_touch = Ti.UI.createView({
        width: Ti.Platform.displayCaps.platformWidth,
        height: 100,
        top: 120
      });
      this.handle_touch(page_touch, page_wrap, this.steps.length);
      this.handle_touch(measure_touch, measure_wrap, this.measures.length);
      this.window.add(page_wrap, measure_wrap, page_touch, measure_touch);
      bubbles = new Bubbles(this.window);
      this.window.open();
    }

    RecipeInterface.prototype.handle_touch = function(touch_element, control, control_length) {
      var start_pos, wrap_pos,
        _this = this;
      start_pos = 0;
      wrap_pos = 0;
      touch_element.addEventListener('touchstart', function(e) {
        start_pos = e.x;
        return wrap_pos = control.getLeft();
      });
      touch_element.addEventListener('touchmove', function(e) {
        return control.setLeft(-1 * (start_pos - e.x - wrap_pos));
      });
      return touch_element.addEventListener('touchend', function(e) {
        return _this.snap_to_point(control, control_length);
      });
    };

    RecipeInterface.prototype.snap_to_point = function(control, control_length) {
      var animation, left_pos, new_left, width,
        _this = this;
      width = Ti.Platform.displayCaps.platformWidth;
      left_pos = Math.round(control.getLeft() / width) * width;
      if (left_pos <= 0 && left_pos > (-1 * control_length * width)) {
        new_left = left_pos;
      } else if (left_pos === width) {
        new_left = 0;
      } else {
        new_left = -1 * ((control_length - 1) * width);
      }
      animation = Ti.UI.createAnimation({
        left: new_left,
        duration: 250
      });
      animation.addEventListener('complete', function() {
        return control.setLeft(new_left);
      });
      return control.animate(animation);
    };

    return RecipeInterface;

  })();

}).call(this);
