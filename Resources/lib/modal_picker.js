(function() {

  BB.utilities.modal_picker = function(items) {
    var date_to_string, done, item, overlay, picker, picker_callback, row, rows, slider, slider_callback, string_to_date, win, _i, _j, _len, _len2, _ref;
    win = Ti.UI.createWindow({
      backgroundColor: 'transparent',
      height: BB.HEIGHT,
      width: BB.WIDTH
    });
    overlay = Ti.UI.createView({
      backgroundColor: 'green',
      opacity: 0.7,
      height: BB.HEIGHT * .8,
      top: BB.HEIGHT * .2,
      width: BB.WIDTH
    });
    done = Ti.UI.createButton({
      title: 'X',
      height: BB.HEIGHT * .07,
      bottom: BB.HEIGHT * .7,
      width: 50,
      right: 10,
      style: 1
    });
    done.addEventListener('click', function() {
      return win.close();
    });
    win.add(overlay);
    win.add(done);
    for (_i = 0, _len = items.length; _i < _len; _i++) {
      item = items[_i];
      if (item.type === 'picker' || item.type === 'date-picker') {
        picker = Ti.UI.createPicker({
          type: Ti.UI.PICKER_TYPE_PLAIN,
          height: BB.HEIGHT * .5,
          bottom: 0,
          selectionIndicator: true
        });
        if (item.type === 'date') {
          item.value = this.string_to_date(item.value);
        } else {
          rows = [];
          _ref = item.data;
          for (_j = 0, _len2 = _ref.length; _j < _len2; _j++) {
            row = _ref[_j];
            rows.push(Ti.UI.createPickerRow({
              title: row
            }));
          }
          picker.add(rows);
          if (item.value) picker.value = item.picker_value;
          picker_callback = item.callback;
          picker.addEventListener('change', function(e) {
            return picker_callback(e.rowIndex);
          });
        }
        win.add(picker);
      } else if (item.type === 'range') {
        slider = Ti.UI.createSlider({
          bottom: BB.PADDING_H,
          left: BB.PADDING_W,
          width: BB.WIDTH * .7,
          min: item.min,
          max: item.max
        });
        slider_callback = item.callback;
        slider.addEventListener('change', function(e) {
          return slider_callback(e.value);
        });
        win.add(slider);
      }
    }
    return win;
    string_to_date = function(date_string) {
      var matches;
      date_string = date_string || '';
      matches = /(\d+)\/(\d+)\/(\d+)/.exec(date_string);
      if (matches && matches.length >= 4) {
        return new Date(matches[3], matches[1] - 1, matches[2]);
      }
      return new Date();
    };
    return date_to_string = function(date) {
      return (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
    };
  };

}).call(this);
