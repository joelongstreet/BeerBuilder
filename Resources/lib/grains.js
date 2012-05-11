(function() {
  var Grain,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  BB.Grains = (function() {

    function Grains() {
      this.create_row = __bind(this.create_row, this);
      var button,
        _this = this;
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
        return _this.create_row();
      });
      this.window.add(this.table);
      this.window.add(button);
      this.create_row();
      return this.window;
    }

    Grains.prototype.create_row = function() {
      var grain, grain_type, percent_text, row, slider, weight_text,
        _this = this;
      row = Ti.UI.createTableViewRow();
      slider = Ti.UI.createSlider({
        bottom: BB.PADDING_H,
        left: BB.PADDING_W,
        width: BB.WIDTH * .7,
        min: 0,
        max: 10
      });
      percent_text = Ti.UI.createLabel({
        right: BB.PADDING_W,
        top: BB.PADDING_H,
        width: BB.PADDED_W,
        text: '0%',
        textAlign: 'right'
      });
      weight_text = Ti.UI.createLabel({
        right: BB.PADDING_W,
        bottom: BB.PADDING_H,
        width: BB.PADDED_W,
        text: '0lbs',
        textAlign: 'right'
      });
      grain_type = Ti.UI.createLabel({
        top: BB.PADDING_H,
        left: BB.PADDING_W,
        text: BB.GRAINS[0].name
      });
      slider.addEventListener('change', function(e) {
        var new_value;
        new_value = Math.round(e.value * 10) / 10;
        grain.weight = new_value;
        if (new_value.toString().length === 1) {
          new_value = new_value.toString() + '.0';
        }
        new_value += 'lbs';
        weight_text.setText(new_value);
        return BB.stats.calculate_gravity();
      });
      grain_type.addEventListener('click', function(e) {
        var item, modal, row_data, _i, _len, _ref;
        row_data = [];
        _ref = BB.GRAINS;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          item = _ref[_i];
          row_data.push(item.name);
        }
        modal = new BB.utilities.modal_picker({
          textField: grain_type,
          value: grain_type.getText(),
          data: row_data
        });
        return modal.open({
          animated: true
        });
      });
      row.add(grain_type);
      row.add(slider);
      row.add(percent_text);
      row.add(weight_text);
      this.table.appendRow(row);
      grain = new Grain(BB.GRAINS[0], percent_text);
      return BB.ingredients.grains.push(grain);
    };

    return Grains;

  })();

  Grain = (function() {

    function Grain(properties, percent_text) {
      this.properties = properties;
      this.weight = 0;
      this.percent_text = percent_text;
    }

    Grain.prototype.update_proportion = function(proportion) {
      if (proportion === 1) {
        proportion = '100%';
      } else {
        proportion = 100 * Math.round(proportion * 100) / 100 + '%';
      }
      return this.percent_text.setText(proportion);
    };

    return Grain;

  })();

}).call(this);
