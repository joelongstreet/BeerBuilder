(function() {

  BB.utilities.modal_picker = function(items) {
    var callbacks, date_to_string, done, item, overlay, picker, row, rows, slider, string_to_date, win, _i, _j, _len, _len2, _ref;
    win = Ti.UI.createWindow({
      backgroundColor: 'transparent',
      height: BB.HEIGHT,
      width: BB.WIDTH
    });
    overlay = Ti.UI.createView({
      backgroundColor: 'black',
      opacity: 0.7,
      height: BB.HEIGHT * .6,
      top: BB.HEIGHT * .3,
      width: BB.WIDTH
    });
    done = Ti.UI.createButton({
      title: 'X',
      height: BB.HEIGHT * .07,
      bottom: BB.HEIGHT * .6,
      width: 50,
      right: 10,
      style: 1
    });
    done.addEventListener('click', function() {
      return win.close();
    });
    win.add(overlay);
    win.add(done);
    callbacks = [];
    for (_i = 0, _len = items.length; _i < _len; _i++) {
      item = items[_i];
      callbacks.push(item.callback);
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
        }
        picker.callback = item.callback;
        picker.addEventListener('change', function(e) {
          return this.callback(e.rowIndex);
        });
        win.add(picker);
        /*
        			setTimeout (->
        				if item.value
        					Ti.API.info 'should select'
        					picker.setSelectedRow(0, 5, true)
        			), 500
        */
      } else if (item.type === 'range') {
        slider = Ti.UI.createSlider({
          bottom: BB.HEIGHT * .5 + BB.HEIGHT * .1 * _i,
          left: BB.PADDING_W,
          width: BB.WIDTH * .7,
          min: item.min,
          max: item.max
        });
        slider.callback = item.callback;
        slider.addEventListener('change', function(e) {
          return this.callback(e.value);
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
