(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  BB.IngredientModal = (function(_super) {

    __extends(IngredientModal, _super);

    function IngredientModal() {
      IngredientModal.__super__.constructor.apply(this, arguments);
    }

    IngredientModal.prototype.add_picker = function(row_data, picker_value, callback) {
      var picker, row, rows, _i, _len;
      if (row_data == null) row_data = [];
      if (picker_value == null) picker_value = 0;
      if (callback == null) callback = '';
      picker = Ti.UI.createPicker({
        type: Ti.UI.PICKER_TYPE_PLAIN,
        height: BB.HEIGHT * .5,
        bottom: 0,
        selectionIndicator: true
      });
      rows = [];
      for (_i = 0, _len = row_data.length; _i < _len; _i++) {
        row = row_data[_i];
        rows.push(Ti.UI.createPickerRow({
          title: row
        }));
      }
      picker.add(rows);
      picker.addEventListener('change', function(e) {
        return callback(e.rowIndex);
      });
      this.window.add(picker);
      return setTimeout((function() {
        return picker.setSelectedRow(0, picker_value, true);
      }), 250);
    };

    IngredientModal.prototype.add_slider = function(units, decimals, slider_value, min, max, callback, position) {
      var label, slider;
      if (units == null) units = 'lbs';
      if (decimals == null) decimals = 1;
      if (slider_value == null) slider_value = 0;
      if (min == null) min = 0;
      if (max == null) max = 10;
      if (callback == null) callback = '';
      if (position == null) position = BB.HEIGHT * .5;
      label = Ti.UI.createLabel({
        bottom: position,
        right: BB.PADDING_W,
        color: 'white',
        textAlign: 'right',
        text: "" + slider_value + " " + units
      });
      slider = Ti.UI.createSlider({
        bottom: position,
        left: BB.PADDING_W,
        width: BB.WIDTH * .7,
        min: min,
        max: max,
        value: slider_value
      });
      slider.addEventListener('change', function(e) {
        label.setText("" + (e.value.toFixed(decimals)) + " " + units);
        return callback(e.value);
      });
      this.window.add(label);
      return this.window.add(slider);
    };

    return IngredientModal;

  })(BB.ModalPicker);

}).call(this);
