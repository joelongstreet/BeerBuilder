(function() {
  var TextSlide;

  TextSlide = require('./interface/TextSlide').TextSlide;

  exports.IngredientDetail = (function() {

    function IngredientDetail(ingredient, data, type) {
      var item, picker, row, time, weight, _i, _len;
      if (!data) throw "Data is required to make a picker";
      this.window = Ti.UI.createWindow();
      picker = Ti.UI.createPicker();
      if (type === 'grains' || type === 'hops') {
        weight = new TextSlide(function(e) {
          return ingredient.update_weight(e.result);
        });
        this.window.add(weight);
      }
      if (type === 'hops') {
        time = new TextSlide(function(e) {
          return ingredient.update_time(e.result);
        });
        this.window.add(time);
      }
      for (_i = 0, _len = data.length; _i < _len; _i++) {
        item = data[_i];
        row = Ti.UI.createPickerRow({
          title: item.name,
          object: item
        });
        picker.add(row);
      }
      picker.addEventListener('change', function(e) {
        return ingredient.update_self(e.something);
      });
      this.window.add(picker);
    }

    IngredientDetail.prototype.open_me = function() {
      this.window.open();
      return 'window opened';
    };

    return IngredientDetail;

  })();

}).call(this);
