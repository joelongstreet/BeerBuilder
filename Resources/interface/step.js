(function() {
  var IngredientDetail, Step;

  IngredientDetail = require('./interface/IngredientDetail').IngredientDetail;

  Step = (function() {

    function Step(type) {
      var label;
      this.type = type;
      this.view = Ti.UI.createView({
        top: 0,
        width: '100%',
        height: '100%'
      });
      this.table = Ti.UI.createTableView({
        bottom: 0,
        height: 150,
        bottom: 0,
        seperatorColor: 'transparent',
        backgroundColor: 'transparent'
      });
      label = Ti.UI.createLabel({
        top: 25,
        left: 0,
        width: Ti.Platform.displayCaps.platformWidth,
        textAlign: 'center',
        color: 'white',
        font: {
          fontSize: 48
        },
        text: type.substr(0, 1).toUpperCase() + type.substr(1)
      });
      /*
              if @type is 'grains' then @data_source = db.execute('SELECT * FROM grains')
              if @type is 'hops' then @data_source = db.execute('SELECT * FROM grains')
              if @type is 'yeasts' then @data_source = db.execute('SELECT * FROM grains')
              else @data_source = []
      */
      this.data_source = [];
      this.view.add(label);
      this.view.add(this.table);
    }

    Step.prototype.add_ingredient = function(ingredient) {
      var row,
        _this = this;
      row = Ti.UI.createTableViewRow({
        title: ingredient.name,
        object: ingredient
      });
      row.addEventListener('click', function() {
        var detail;
        detail = new IngredientDetail(ingredient, _this.data_source, _this.type);
        return detail.open_me();
      });
      row.addEventListener('delete', function() {
        return this.remove_ingredient();
      });
      return this.table.appendRow(row);
    };

    Step.prototype.remove_ingredient = function(ingredient) {
      if (this.type === 'grains') ingredient.recipe.remove_grain(ingredient);
      if (this.type === 'hops') ingredient.recipe.remove_hop(ingredient);
      if (this.type === 'yeasts') {
        return ingredient.recipe.remove_yeast(ingredient);
      }
    };

    Step.prototype.drag_table = function() {};

    Step.prototype.set_position = function(position) {
      return this.view.setLeft(position * Ti.Platform.displayCaps.platformWidth);
    };

    Step.prototype.open = function() {
      return this.view.open();
    };

    return Step;

  })();

  exports.Step = Step;

}).call(this);
