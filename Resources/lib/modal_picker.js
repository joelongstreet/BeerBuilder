(function() {

  exports.modal_picker = function(o) {
    var cancel, container, done, item, overlay, picker, spacer, toolbar, type, win, _i, _len, _ref;
    type = (o.type === undefined ? Ti.UI.PICKER_TYPE_PLAIN : o.type);
    win = Ti.UI.createWindow({
      backgroundColor: 'transparent'
    });
    overlay = Ti.UI.createView({
      backgroundColor: '#000',
      opacity: 0.6
    });
    container = Ti.UI.createView({
      bottom: 0,
      layout: 'vertical',
      height: 'auto'
    });
    picker = Ti.UI.createPicker({
      type: type,
      height: 'auto',
      selectionIndicator: true
    });
    if (type === Ti.UI.PICKER_TYPE_DATE) {
      picker.value = stringToDate(o.value);
    } else if (o.data) {
      _ref = o.data;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        picker.add(Ti.UI.createPickerRow({
          title: o.data[item]
        }));
      }
    }
    picker.addEventListener('change', function() {
      return false;
    });
    cancel = Ti.UI.createButton({
      title: 'Cancel',
      height: 30,
      width: 80,
      style: Ti.UI.iPhone.SystemButtonStyle.BORDERED,
      left: 10
    });
    done = Ti.UI.createButton({
      title: 'Done',
      height: 30,
      width: 80,
      style: Ti.UI.iPhone.SystemButtonStyle.BORDERED,
      right: 10
    });
    cancel.addEventListener('click', function() {
      return win.close();
    });
    done.addEventListener('click', function() {
      if (type === Ti.UI.PICKER_TYPE_DATE) {
        o.textField.value = dateToString(picker.value);
      } else {
        o.textField.value = picker.getSelectedRow(0).title;
      }
      return win.close();
    });
    spacer = Ti.UI.createButton({
      systemButton: Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
    });
    toolbar = Ti.UI.createView({
      height: 43,
      backgroundColor: '#bbb'
    });
    toolbar.add(cancel);
    toolbar.add(done);
    container.add(toolbar);
    container.add(picker);
    win.add(overlay);
    win.add(container);
    return win;
  };

}).call(this);
