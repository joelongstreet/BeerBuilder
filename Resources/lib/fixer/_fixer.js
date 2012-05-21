(function() {

  BB.FixerWindow = (function() {

    function FixerWindow() {
      var gravity_l, gravity_s, target_l, target_s, temp_l, temp_s, volume_l, volume_s, window,
        _this = this;
      this.temperature = 100;
      this.volume = 5;
      this.target = 1.050;
      this.current = 1.075;
      window = Ti.UI.createWindow({
        title: 'Gravity Fixer',
        backgroundColor: 'white'
      });
      temp_s = Ti.UI.createSlider({
        min: 0,
        max: 212,
        width: BB.WIDTH - BB.PADDING_W * 2,
        left: BB.PADDING_W,
        top: BB.HEIGHT * .125,
        value: 100
      });
      temp_l = Ti.UI.createLabel({
        top: BB.HEIGHT * .075,
        right: BB.PADDING_W,
        text: 'Temperature: 100° Fahrenheit'
      });
      temp_s.addEventListener('change', function(e) {
        _this.temperature = e.value;
        _this.calculate();
        return temp_l.setText(e.value.format({
          prefix: 'Temperature: ',
          suffix: '° Fahrenheit',
          decimals: 1
        }));
      });
      gravity_s = Ti.UI.createSlider({
        min: 0,
        max: 200,
        width: BB.WIDTH - BB.PADDING_W * 2,
        left: BB.PADDING_W,
        top: BB.HEIGHT * .275,
        value: 75
      });
      gravity_l = Ti.UI.createLabel({
        top: BB.HEIGHT * .225,
        right: BB.PADDING_W,
        text: 'Current Gravity: 1.075'
      });
      gravity_s.addEventListener('change', function(e) {
        _this.current = parseFloat('1.' + Math.round(e.value * 100) / 100);
        _this.calculate();
        return gravity_l.setText(_this.current.format({
          prefix: 'Current Gravity: ',
          decimals: 1000
        }));
      });
      target_s = Ti.UI.createSlider({
        min: 0,
        max: 200,
        width: BB.WIDTH - BB.PADDING_W * 2,
        left: BB.PADDING_W,
        top: BB.HEIGHT * .425,
        value: 50
      });
      target_l = Ti.UI.createLabel({
        top: BB.HEIGHT * .375,
        right: BB.PADDING_W,
        text: 'Target Gravity: 1.050'
      });
      target_s.addEventListener('change', function(e) {
        _this.target = parseFloat('1.' + Math.round(e.value * 100) / 100);
        _this.calculate();
        return target_l.setText(_this.target.format({
          prefix: 'Target Gravity: ',
          decimals: 1000
        }));
      });
      volume_s = Ti.UI.createSlider({
        min: 0,
        max: 20,
        width: BB.WIDTH - BB.PADDING_W * 2,
        left: BB.PADDING_W,
        top: BB.HEIGHT * .575,
        value: 5
      });
      volume_l = Ti.UI.createLabel({
        top: BB.HEIGHT * .525,
        right: BB.PADDING_W,
        text: 'Volume: 5 Gallons'
      });
      volume_s.addEventListener('change', function(e) {
        _this.volume = e.value;
        _this.calculate();
        return volume_l.setText(e.value.format({
          prefix: 'Volume: ',
          suffix: ' Gallons',
          decimals: 1
        }));
      });
      this.result = Ti.UI.createLabel({
        width: BB.WIDTH - BB.PADDING_W / 2,
        bottom: BB.PADDING_H,
        textAlign: 'center',
        font: {
          fontSize: 26
        },
        text: 'Good to Go'
      });
      window.add(temp_s);
      window.add(temp_l);
      window.add(gravity_s);
      window.add(gravity_l);
      window.add(target_s);
      window.add(target_l);
      window.add(volume_s);
      window.add(volume_l);
      window.add(this.result);
      return window;
    }

    FixerWindow.prototype.calculate = function() {
      return this.result.setText('poo');
    };

    return FixerWindow;

  })();

  BB.fixer = {
    icon: '/img/fixer.png',
    title: 'Fixer'
  };

  BB.fixer.tabs = {
    "default": Ti.UI.createTab({
      window: new BB.FixerWindow()
    })
  };

  BB.fixer.tab_group = Ti.UI.createTabGroup();

  BB.fixer.tab_group.addTab(BB.fixer.tabs["default"]);

}).call(this);
