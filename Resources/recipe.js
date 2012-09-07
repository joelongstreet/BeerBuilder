(function() {
  var RecipeInterface;

  RecipeInterface = require('./interface/recipe').RecipeInterface;

  exports.Recipe = (function() {

    function Recipe(ingredients) {
      var Measure, Step, grain, grains, hop, hops, recipe_interface, setup, srm_lookup, yeast, yeasts, _i, _j, _k, _len, _len2, _len3, _ref, _ref2, _ref3;
      Step = require('./interface/step').Step;
      Measure = require('./interface/measure').Measure;
      srm_lookup = require('./srm_lookup').srm_lookup;
      this.srm_lookup = srm_lookup;
      this.steps = [setup = new Step('setup'), grains = new Step('grains'), hops = new Step('hops'), yeasts = new Step('yeasts')];
      this.measures = {
        og: new Measure('Original Gravity'),
        fg: new Measure('Final Gravity'),
        ibu: new Measure('IBU\'s'),
        gubu: new Measure('GU/BU'),
        abv: new Measure('ABV'),
        srm: new Measure('SRM')
      };
      this.grains = [];
      this.hops = [];
      this.yeasts = [];
      this.efficiency = .75;
      this.volume = 5;
      if (!ingredients) ingredients = {};
      if (ingredients.grains) {
        _ref = ingredients.grains;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          grain = _ref[_i];
          this.add_grain(grain);
        }
      }
      if (ingredients.hops) {
        _ref2 = ingredients.hops;
        for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
          hop = _ref2[_j];
          this.add_hop(hop);
        }
      }
      if (ingredients.yeasts) {
        _ref3 = ingredients.yeasts;
        for (_k = 0, _len3 = _ref3.length; _k < _len3; _k++) {
          yeast = _ref3[_k];
          this.add_yeast(yeast);
        }
      }
      recipe_interface = new RecipeInterface(this.steps);
    }

    Recipe.prototype.get_efficiency = function(new_efficiency) {
      return this.efficiency = new_efficiency;
    };

    Recipe.prototype.get_grain_weight = function() {
      var grain, total_weight, _i, _len, _ref;
      total_weight = 0;
      _ref = this.grains;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        grain = _ref[_i];
        total_weight += grain.weight;
      }
      return total_weight;
    };

    Recipe.prototype.get_attenuation = function() {
      var attenuation, yeast, _i, _len, _ref;
      if (this.yeasts.length) {
        attenuation = 0;
        _ref = this.yeasts;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          yeast = _ref[_i];
          attenuation += yeast.attenuation;
        }
        attenuation / this.yeasts.length;
        return parseFloat(attenuation.toFixed(2));
      } else {
        return .75;
      }
    };

    Recipe.prototype.get_gravity_units = function() {
      var grain, grain_units, gravity_units, _i, _len, _ref;
      gravity_units = 0;
      _ref = this.grains;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        grain = _ref[_i];
        grain_units = grain.weight * grain.gravity_units;
        if (!grain.is_extract) grain_units *= this.efficiency;
        gravity_units += grain_units;
      }
      return parseFloat(gravity_units.toFixed(1));
    };

    Recipe.prototype.get_original_gravity = function() {
      var og, og_units;
      og_units = this.get_gravity_units() / this.volume;
      og = 1 + og_units / 1000;
      return og = parseFloat(og.toFixed(4));
    };

    Recipe.prototype.get_final_gravity = function() {
      var fg, fg_units;
      fg_units = this.get_gravity_units() * this.get_attenuation() / this.volume;
      fg = 1 + (this.get_original_gravity() - (1 + fg_units / 1000));
      fg = parseFloat(fg.toFixed(4));
      return fg;
    };

    Recipe.prototype.get_srm = function() {
      var grain, mcu, srm, _i, _len, _ref;
      mcu = 0;
      _ref = this.grains;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        grain = _ref[_i];
        mcu += grain.weight * grain.lovibond / this.volume;
      }
      srm = 1.4922 * (Math.pow(mcu, .6859));
      return Math.round(srm);
    };

    Recipe.prototype.get_hex = function() {
      var hex;
      hex = this.srm_lookup[this.get_srm()];
      if (hex === void 0) hex = '#000000';
      return hex;
    };

    Recipe.prototype.get_gu_bu = function() {
      var gubu;
      return gubu = Math.round(this.get_final_gravity() / this.get_ibu() * 1000) / 1000;
    };

    Recipe.prototype.get_abv = function() {
      var abv;
      abv = 131 * (this.get_original_gravity() - this.get_final_gravity());
      return abv = parseFloat(abv.toFixed(2));
    };

    Recipe.prototype.get_hop_weight = function() {
      var hop, total_weight, _i, _len, _ref;
      total_weight = 0;
      _ref = this.hops;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        hop = _ref[_i];
        total_weight += hop.weight;
      }
      return total_weight;
    };

    Recipe.prototype.get_ibu = function() {
      var aau, hop, ibu, utilization, _i, _len, _ref;
      ibu = 0;
      _ref = this.hops;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        hop = _ref[_i];
        utilization = -1 * (.0041 * Math.pow(hop.time, 2)) + (.6261 * hop.time) + 1.5779;
        aau = hop.weight * utilization * .7489 * hop.aa;
        ibu += aau;
      }
      ibu = ibu / this.volume;
      return parseFloat(ibu.toFixed(2));
    };

    Recipe.prototype.add_grain = function(ingredient) {
      ingredient.recipe = this;
      this.grains.push(ingredient);
      return this.steps['grains'].add_ingredient(ingredient);
    };

    Recipe.prototype.add_hop = function(ingredient) {
      ingredient.recipe = this;
      this.hops.push(ingredient);
      return this.steps['hops'].add_ingredient(ingredient);
    };

    Recipe.prototype.add_yeast = function(ingredient) {
      ingredient.recipe = this;
      this.yeasts.push(ingredient);
      return this.steps['yeasts'].add_ingredient(ingredient);
    };

    Recipe.prototype.remove_grain = function(index) {
      if (typeof index === 'object') index = this.grains.indexOf(index);
      return this.grains.splice(index, 1);
    };

    Recipe.prototype.remove_hop = function(index) {
      if (typeof index === 'object') index = this.hops.indexOf(index);
      return this.hops.splice(index, 1);
    };

    Recipe.prototype.remove_yeast = function(index) {
      if (typeof index === 'object') index = this.yeasts.indexOf(index);
      return this.hops.splice(index, 1);
    };

    Recipe.prototype.build_ui = function() {
      var current_pos, start_pos, step, wrap_pos, _i, _len, _ref,
        _this = this;
      this.window = Ti.UI.createWindow({
        width: '100%',
        height: '100%'
      });
      this.wrap = Ti.UI.createView({
        width: 100 * this.steps.length + '%',
        height: '100%',
        left: 0,
        touchEnabled: false
      });
      _ref = this.steps;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        step = _ref[_i];
        step.set_position(_i);
        this.wrap.add(step.view);
      }
      this.window.add(this.wrap);
      start_pos = 0;
      current_pos = 0;
      wrap_pos = 0;
      this.window.addEventListener('touchstart', function(e) {
        start_pos = e.x;
        return wrap_pos = _this.wrap.getLeft();
      });
      this.window.addEventListener('touchmove', function(e) {
        return _this.wrap.setLeft(-1 * (start_pos - e.x - wrap_pos));
      });
      return this.window.open();
    };

    return Recipe;

  })();

}).call(this);
