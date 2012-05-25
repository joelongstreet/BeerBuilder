(function() {
  var Hop,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  BB.RecipeHops = (function() {

    function RecipeHops() {
      this.update_hop = __bind(this.update_hop, this);
      this.update_hop_weight = __bind(this.update_hop_weight, this);
      this.update_hop_time = __bind(this.update_hop_time, this);
      this.create_row = __bind(this.create_row, this);
      var button, close, item, _i, _len,
        _this = this;
      this.window = Ti.UI.createWindow({
        title: 'Hops'
      });
      close = Ti.UI.createButton({
        title: 'close'
      });
      this.window.rightNavButton = close;
      close.addEventListener('click', function() {
        BB.recipe.tab_group.close();
        return BB.menu.open();
      });
      this.table = Ti.UI.createTableView({
        height: BB.HEIGHT * .65,
        width: BB.WIDTH,
        rowHeight: BB.HEIGHT * .1,
        top: BB.HEIGHT * .2,
        editable: true
      });
      this.table.addEventListener('delete', function() {
        return BB.recipe.stats.calculate_bitterness();
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
      this.create_row();
      this.row_data = [];
      for (_i = 0, _len = HOPS.length; _i < _len; _i++) {
        item = HOPS[_i];
        this.row_data.push(item.name);
      }
      return this.window;
    }

    RecipeHops.prototype.create_row = function() {
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
        right: BB.PADDING_W * 5,
        bottom: BB.PADDING_H,
        width: BB.PADDED_W,
        text: '0 oz',
        textAlign: 'right'
      });
      this.time_text = Ti.UI.createLabel({
        right: BB.PADDING_W,
        bottom: BB.PADDING_H,
        width: BB.PADDED_W,
        text: '0 min',
        textAlign: 'right'
      });
      this.hop_text = Ti.UI.createLabel({
        top: BB.PADDING_H,
        left: BB.PADDING_W,
        width: BB.PADDED_W,
        text: HOPS[0].name
      });
      row.addEventListener('click', function(e) {
        var modal;
        modal = new BB.utilities.modal_picker([
          {
            type: 'picker',
            data: _this.row_data,
            value: _this.hop_text.getText(),
            callback: _this.update_hop
          }, {
            type: 'range',
            label: 'Weight',
            min: 0,
            max: 3,
            value: _this.weight_text.getText(),
            callback: _this.update_hop_weight
          }, {
            type: 'range',
            label: 'Time',
            min: 0,
            max: 90,
            value: _this.time_text.getText(),
            callback: _this.update_hop_time
          }
        ]);
        return modal.open({
          animated: true
        });
      });
      row.add(this.hop_text);
      row.add(this.percent_text);
      row.add(this.weight_text);
      row.add(this.time_text);
      this.table.appendRow(row);
      this.hop = new Hop(HOPS[0], this.percent_text);
      return BB.recipe.ingredients.hops.push(this.hop);
    };

    RecipeHops.prototype.update_hop_time = function(range_value) {
      this.hop.time = range_value;
      this.time_text.setText("" + (this.hop.time.toFixed(0)) + " min");
      return BB.recipe.stats.calculate_bitterness();
    };

    RecipeHops.prototype.update_hop_weight = function(range_value) {
      this.hop.weight = range_value;
      this.weight_text.setText("" + (this.hop.weight.toFixed(1)) + " oz");
      return BB.recipe.stats.calculate_bitterness();
    };

    RecipeHops.prototype.update_hop = function(row_selected) {
      this.hop_text.setText(HOPS[row_selected].name);
      this.hop.properties = HOPS[row_selected];
      return BB.recipe.stats.calculate_bitterness();
    };

    return RecipeHops;

  })();

  Hop = (function() {

    function Hop(properties, percent_text) {
      this.properties = properties;
      this.percent_text = percent_text;
      this.weight = 0;
      this.time = 0;
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
