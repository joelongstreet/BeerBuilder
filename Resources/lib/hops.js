(function() {
  var Hop,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  BB.Hops = (function() {

    function Hops() {
      this.create_row = __bind(this.create_row, this);
      var button,
        _this = this;
      this.window = Ti.UI.createWindow({
        title: 'Hops',
        navBarHidden: true
      });
      this.table = Ti.UI.createTableView({
        height: BB.HEIGHT - BB.HEIGHT * .2,
        width: BB.WIDTH,
        rowHeight: BB.HEIGHT * .2,
        top: BB.HEIGHT * .1
      });
      button = Ti.UI.createButton({
        right: BB.PADDING_W,
        bottom: BB.PADDING_H,
        title: 'Create New Hop'
      });
      button.addEventListener('click', function() {
        return _this.create_row();
      });
      this.window.add(this.table);
      this.window.add(button);
      this.window.add(BB.views.stats);
      this.create_row();
      return this.window;
    }

    Hops.prototype.create_row = function() {
      var hop, hop_type, percent_text, row, slider, weight_text,
        _this = this;
      row = Ti.UI.createTableViewRow();
      slider = Ti.UI.createSlider({
        bottom: BB.PADDING_H,
        left: BB.PADDING_W,
        width: BB.WIDTH * .7,
        min: 0,
        max: 3
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
        text: '0 oz',
        textAlign: 'right'
      });
      hop_type = Ti.UI.createLabel({
        top: BB.PADDING_H,
        left: BB.PADDING_W,
        width: BB.PADDED_W,
        text: BB.HOPS[0].name
      });
      slider.addEventListener('change', function(e) {
        var hop_text;
        hop.weight = e.value;
        hop.time = 30;
        hop_text = hop.weight.format({
          suffix: 'oz',
          decimals: 10
        });
        weight_text.setText(hop_text);
        return BB.stats.calculate_bitterness();
      });
      hop_type.addEventListener('click', function(e) {
        var item, modal, row_data, _i, _len, _ref;
        row_data = [];
        _ref = BB.HOPS;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          item = _ref[_i];
          row_data.push(item.name);
        }
        modal = new BB.utilities.modal_picker({
          textField: hop_type,
          value: hop_type.getText(),
          data: row_data
        });
        return modal.open({
          animated: true
        });
      });
      row.add(hop_type);
      row.add(slider);
      row.add(percent_text);
      row.add(weight_text);
      this.table.appendRow(row);
      hop = new Hop(BB.HOPS[0], percent_text);
      return BB.ingredients.hops.push(hop);
    };

    return Hops;

  })();

  Hop = (function() {

    function Hop(properties, percent_text) {
      this.properties = properties;
      this.weight = 0;
      this.percent_text = percent_text;
    }

    Hop.prototype.update_proportion = function(proportion) {
      if (proportion === 1) {
        proportion = '100%';
      } else {
        proportion = 100 * Math.round(proportion * 100) / 100 + '%';
      }
      return this.percent_text.setText(proportion);
    };

    return Hop;

  })();

}).call(this);
