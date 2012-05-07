(function() {

  BB.Grains = (function() {

    function Grains() {
      var button;
      this.window = Ti.UI.createWindow({
        title: 'Grains'
      });
      this.table = Ti.UI.createTableView({
        height: BB.HEIGHT - BB.HEIGHT * .1,
        width: BB.WIDTH,
        rowHeight: BB.HEIGHT * .2
      });
      button = Ti.UI.createButton({
        right: BB.PADDING_W,
        bottom: BB.PADDING_H,
        title: 'Create New Grain'
      });
      button.addEventListener('click', function() {
        return false;
      });
      this.window.add(this.table);
      this.window.add(this.create_row());
      this.window.add(button);
      return this.window;
    }

    Grains.prototype.create_row = function() {
      var grain_type, percent_text, slider, view, weight_text,
        _this = this;
      view = Ti.UI.createView();
      grain_type = Ti.UI.createLabel({
        text: BB.GRAINS[0].name
      });
      slider = Ti.UI.createSlider();
      percent_text = Ti.UI.createLabel({
        text: '0%'
      });
      weight_text = Ti.UI.createLabel({
        text: '0lbs'
      });
      grain_type.addEventListener('focus', function(e) {
        var item, picker, row_data, _i, _len, _ref;
        e.source.blur();
        picker = Ti.UI.createPicker({
          bottom: 0
        });
        row_data = [];
        _ref = BB.GRAINS;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          item = _ref[_i];
          row_data.push(item.name);
        }
        require('vendor/semiModalPicker').modal_picker({
          textField: grain_type,
          value: grain_type.getText(),
          type: pickerType,
          data: row_data
        });
        return _this.window.add(picker);
      });
      view.add(grain_type);
      view.add(slider);
      view.add(percent_text);
      view.add(weight_text);
      return view;
    };

    return Grains;

  })();

}).call(this);
