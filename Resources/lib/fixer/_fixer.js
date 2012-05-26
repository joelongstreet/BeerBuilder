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
        backgroundColor: 'white',
        tabBarHidden: true
      });
      window.rightNavButton = new BB.CloseWindow(BB.fixer.tab_group);
      temp_s = Ti.UI.createSlider({
        min: 32,
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
        _this.temperature = Math.round(e.value);
        _this.calculate();
        return temp_l.setText("Temperature: " + (e.value.toFixed(0)) + " ° Fahrenheit");
      });
      gravity_s = Ti.UI.createSlider({
        min: 0,
        max: 200,
        width: BB.WIDTH - BB.PADDING_W * 2,
        left: BB.PADDING_W,
        top: BB.HEIGHT * .275,
        value: 50
      });
      gravity_l = Ti.UI.createLabel({
        top: BB.HEIGHT * .225,
        right: BB.PADDING_W,
        text: 'Current Gravity: 1.050'
      });
      gravity_s.addEventListener('change', function(e) {
        if (e.value < 100) {
          _this.current = parseFloat('1.0' + Math.round(e.value * 100) / 100);
        } else {
          _this.current = parseFloat('1.' + Math.round(e.value * 100) / 100);
        }
        _this.calculate();
        return gravity_l.setText("Current Gravity: " + (_this.current.toFixed(3)));
      });
      target_s = Ti.UI.createSlider({
        min: 0,
        max: 200,
        width: BB.WIDTH - BB.PADDING_W * 2,
        left: BB.PADDING_W,
        top: BB.HEIGHT * .425,
        value: 75
      });
      target_l = Ti.UI.createLabel({
        top: BB.HEIGHT * .375,
        right: BB.PADDING_W,
        text: 'Target Gravity: 1.075'
      });
      target_s.addEventListener('change', function(e) {
        if (e.value < 100) {
          _this.target = parseFloat('1.0' + Math.round(e.value * 100) / 100);
        } else {
          _this.target = parseFloat('1.' + Math.round(e.value * 100) / 100);
        }
        _this.calculate();
        return target_l.setText("Target Gravity: " + (_this.target.toFixed(3)));
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
        text: 'Final Volume: 5 Gallons'
      });
      volume_s.addEventListener('change', function(e) {
        _this.volume = e.value;
        _this.calculate();
        return volume_l.setText("Final Volume: " + (e.value.toFixed(1)) + " Gallons");
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
      var corrected_gravity, diff, dme_to_add, gravity_points, hydro_calibration, target_points, water_to_add;
      hydro_calibration = 60;
      corrected_gravity = this.current * ((1.00130346 - 0.000134722124 * this.temperature + 0.00000204052596 * Math.pow(this.temperature, 2) - 0.00000000232820948 * Math.pow(this.temperature, 3)) / (1.00130346 - 0.000134722124 * hydro_calibration + 0.00000204052596 * Math.pow(hydro_calibration, 2) - 0.00000000232820948 * Math.pow(hydro_calibration, 3)));
      gravity_points = 1000 * (corrected_gravity - 1) * this.volume;
      target_points = 1000 * (this.target - 1) * this.volume;
      if (corrected_gravity > this.target) {
        water_to_add = gravity_points / target_points;
        return this.result.setText("Add " + (water_to_add.toFixed(2)) + " gallons of water");
      } else {
        diff = target_points - gravity_points;
        dme_to_add = diff / 45;
        return this.result.setText("Add " + (dme_to_add.toFixed(2)) + " lbs DME");
      }
    };

    return FixerWindow;

  })();

  BB.fixer = {
    icon: '/img/fixer.png',
    title: 'Fixer',
    tab_group: Ti.UI.createTabGroup()
  };

  BB.fixer.tabs = {
    "default": Ti.UI.createTab({
      window: new BB.FixerWindow()
    })
  };

  BB.fixer.tab_group.addTab(BB.fixer.tabs["default"]);

}).call(this);
