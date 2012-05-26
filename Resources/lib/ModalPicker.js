(function() {

  BB.ModalPicker = (function() {

    function ModalPicker() {
      var done, overlay,
        _this = this;
      this.window = Ti.UI.createWindow({
        backgroundColor: 'transparent',
        height: BB.HEIGHT,
        width: BB.WIDTH
      });
      overlay = Ti.UI.createView({
        backgroundColor: 'black',
        opacity: 0.8,
        height: BB.HEIGHT * .6,
        top: BB.HEIGHT * .3,
        width: BB.WIDTH
      });
      done = Ti.UI.createLabel({
        text: 'X',
        bottom: BB.HEIGHT * .4,
        height: BB.WIDTH * .125,
        width: BB.WIDTH * .125,
        borderRadius: BB.WIDTH * .0625,
        right: BB.PADDING_W * .5,
        backgroundGradient: BB.BG.RED,
        zIndex: 99,
        textAlign: 'center',
        color: '#fff',
        font: {
          fontWeight: 'bold'
        }
      });
      done.addEventListener('click', function() {
        return _this.close_window();
      });
      this.window.add(overlay);
      this.window.add(done);
    }

    ModalPicker.prototype.open_window = function() {
      return this.window.open();
    };

    ModalPicker.prototype.close_window = function() {
      return this.window.close();
    };

    return ModalPicker;

  })();

}).call(this);
