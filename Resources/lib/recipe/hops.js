(function() {
  var Hop,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  BB.RecipeHops = (function() {

    function RecipeHops() {
      this.create_row = __bind(this.create_row, this);
      var button, close,
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
      return this.window;
    }

    RecipeHops.prototype.create_row = function() {
      var hop, row,
        _this = this;
      hop = new Hop();
      BB.recipe.ingredients.hops.push(hop);
      row = hop.build_row();
      row.addEventListener('click', function(e) {
        return row.hop.make_modal();
      });
      return this.table.appendRow(row);
    };

    return RecipeHops;

  })();

  Hop = (function() {

    function Hop() {
      this.make_modal = __bind(this.make_modal, this);
      this.update_weight = __bind(this.update_weight, this);
      this.update_time = __bind(this.update_time, this);
      this.update_hop = __bind(this.update_hop, this);
      this.update_proportion = __bind(this.update_proportion, this);
      this.build_row = __bind(this.build_row, this);      this.properties = HOPS[0];
      this.weight = 0;
      this.time = 0;
    }

    Hop.prototype.build_row = function() {
      var row;
      row = Ti.UI.createTableViewRow();
      row.hop = this;
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
      row.add(this.hop_text);
      row.add(this.percent_text);
      row.add(this.weight_text);
      row.add(this.time_text);
      return row;
    };

    Hop.prototype.update_proportion = function(proportion) {
      if (proportion === 1) {
        proportion = '100%';
      } else {
        proportion = 100 * Math.round(proportion * 100) / 100 + '%';
      }
      return this.percent_text.setText(proportion);
    };

    Hop.prototype.update_hop = function(row_selected) {
      this.hop_text.setText(HOPS[row_selected].name);
      this.properties = HOPS[row_selected];
      return BB.recipe.stats.calculate_bitterness();
    };

    Hop.prototype.update_time = function(range_value) {
      this.time = range_value;
      this.time_text.setText("" + (this.time.toFixed(0)) + " min");
      return BB.recipe.stats.calculate_bitterness();
    };

    Hop.prototype.update_weight = function(range_value) {
      this.weight = range_value;
      this.weight_text.setText("" + (this.weight.toFixed(1)) + " oz");
      return BB.recipe.stats.calculate_bitterness();
    };

    Hop.prototype.make_modal = function() {
      var item, modal, row_data, selected_hop, _i, _len;
      row_data = [];
      for (_i = 0, _len = HOPS.length; _i < _len; _i++) {
        item = HOPS[_i];
        if (item.name === this.hop_text.getText()) selected_hop = _i;
        row_data.push(item.name);
      }
      modal = new BB.IngredientModal();
      modal.add_picker(row_data, selected_hop, this.update_hop);
      modal.add_slider('oz', 2, this.weight, 0, 3, this.update_weight);
      modal.add_slider('min', 0, this.time, 0, 90, this.update_time, BB.HEIGHT * .6);
      return modal.open_window();
    };

    return Hop;

  })();

}).call(this);
