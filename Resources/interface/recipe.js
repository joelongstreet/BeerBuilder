(function() {

  exports.RecipeInterface = (function() {

    function RecipeInterface(steps) {
      var current_pos, start_pos, step, wrap_pos, _i, _len, _ref,
        _this = this;
      this.steps = steps;
      this.window = Ti.UI.createWindow({
        width: '100%',
        height: '100%'
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
      current_pos = 0;
      wrap_pos = 0;
      this.window.addEventListener('touchstart', function(e) {
        start_pos = e.x;
        return wrap_pos = _this.wrap.getLeft();
      });
      this.window.addEventListener('touchmove', function(e) {
        return _this.wrap.setLeft(-1 * (start_pos - e.x - wrap_pos));
      });
      this.window.open();
    }

    return RecipeInterface;

  })();

}).call(this);
