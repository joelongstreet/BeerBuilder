(function() {
  var Grain,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  BB.RecipeGrains = (function() {

    function RecipeGrains() {
      this.create_row = __bind(this.create_row, this);
      var button, close,
        _this = this;
      this.window = Ti.UI.createWindow({
        title: 'Grains'
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
      this.table.addEventListener('delete', function(e) {});
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

    RecipeGrains.prototype.create_row = function() {
      var grain, row,
        _this = this;
      grain = new Grain();
      BB.recipe.ingredients.grains.push(grain);
      row = grain.build_row();
      row.addEventListener('click', function(e) {
        return row.grain.make_modal();
      });
      return this.table.appendRow(row);
    };

    return RecipeGrains;

  })();

  Grain = (function() {

    function Grain() {
      this.make_modal = __bind(this.make_modal, this);
      this.update_grain = __bind(this.update_grain, this);
      this.update_weight = __bind(this.update_weight, this);
      this.update_proportion = __bind(this.update_proportion, this);      this.properties = GRAINS[0];
      this.weight = 0;
    }

    Grain.prototype.build_row = function() {
      var row;
      row = Ti.UI.createTableViewRow();
      row.grain = this;
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
        text: GRAINS[0].name
      });
      row.add(this.grain_text);
      row.add(this.percent_text);
      row.add(this.weight_text);
      return row;
    };

    Grain.prototype.update_proportion = function(proportion) {
      if (proportion === 1) {
        proportion = '100%';
      } else {
        proportion = 100 * Math.round(proportion * 100) / 100 + '%';
      }
      return this.percent_text.setText(proportion);
    };

    Grain.prototype.update_weight = function(range_value) {
      this.weight = range_value;
      this.weight_text.setText("" + (this.weight.toFixed(1)) + " lbs");
      return BB.recipe.stats.calculate_gravity();
    };

    Grain.prototype.update_grain = function(row_selected) {
      this.grain_text.setText(GRAINS[row_selected].name);
      this.properties = GRAINS[row_selected];
      return BB.recipe.stats.calculate_gravity();
    };

    Grain.prototype.make_modal = function() {
      var item, modal, row_data, selected_grain, _i, _len;
      row_data = [];
      for (_i = 0, _len = GRAINS.length; _i < _len; _i++) {
        item = GRAINS[_i];
        if (item.name === this.grain_text.getText()) selected_grain = _i;
        row_data.push(item.name);
      }
      modal = new BB.IngredientModal();
      modal.add_picker(row_data, selected_grain, this.update_grain);
      modal.add_slider('lbs', 1, this.weight, 0, 10, this.update_weight);
      return modal.open_window();
    };

    return Grain;

  })();

}).call(this);
