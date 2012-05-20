(function() {
  var Grain,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  BB.Grains = (function() {

    function Grains() {
      this.update_grain = __bind(this.update_grain, this);
      this.update_grain_weight = __bind(this.update_grain_weight, this);
      this.create_row = __bind(this.create_row, this);
      var button, item, _i, _len, _ref,
        _this = this;
      this.window = Ti.UI.createWindow({
        title: 'Grains',
        navBarHidden: true
      });
      this.table = Ti.UI.createTableView({
        height: BB.HEIGHT * .65,
        width: BB.WIDTH,
        rowHeight: BB.HEIGHT * .1,
        top: BB.HEIGHT * .2
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
      this.window.add(BB.views.stats);
      this.row_data = [];
      _ref = BB.GRAINS;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        this.row_data.push(item.name);
      }
      this.create_row();
      return this.window;
    }

    Grains.prototype.create_row = function() {
      var row,
        _this = this;
      row = Ti.UI.createTableViewRow();
      this.percent_text = Ti.UI.createLabel({
        right: BB.PADDING_W,
        top: BB.PADDING_H,
        width: BB.PADDED_W,
        text: '0%',
        textAlign: 'right'
      });
      this.weight_text = Ti.UI.createLabel({
        right: BB.PADDING_W,
        bottom: BB.PADDING_H,
        width: BB.PADDED_W,
        text: '0lbs',
        textAlign: 'right'
      });
      this.grain_text = Ti.UI.createLabel({
        top: BB.PADDING_H,
        left: BB.PADDING_W,
        text: BB.GRAINS[0].name
      });
      row.addEventListener('click', function(e) {
        var modal;
        modal = new BB.utilities.modal_picker([
          {
            type: 'picker',
            data: _this.row_data,
            value: _this.grain_text.getText(),
            callback: _this.update_grain
          }, {
            type: 'range',
            min: 0,
            max: 10,
            value: _this.weight_text.getText(),
            callback: _this.update_grain_weight
          }
        ]);
        return modal.open({
          animated: true
        });
      });
      row.add(this.grain_text);
      row.add(this.percent_text);
      row.add(this.weight_text);
      this.table.appendRow(row);
      this.grain = new Grain(BB.GRAINS[0], this.percent_text);
      return BB.ingredients.grains.push(this.grain);
    };

    Grains.prototype.update_grain_weight = function(range_value) {
      this.grain.weight = range_value;
      this.weight_text.setText(this.grain.weight.format({
        suffix: 'lbs',
        decimals: 10
      }));
      return BB.stats.calculate_gravity();
    };

    Grains.prototype.update_grain = function(row_selected) {
      this.grain_text.setText(BB.GRAINS[row_selected].name);
      this.grain.properties = BB.GRAINS[row_selected];
      return BB.stats.calculate_gravity();
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
