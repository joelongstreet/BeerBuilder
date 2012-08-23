(function() {

  exports.Recipe = (function() {

    function Recipe(grains, hops, yeasts, efficiency, volume) {
      this.grains = grains != null ? grains : [];
      this.hops = hops != null ? hops : [];
      this.yeasts = yeasts != null ? yeasts : [];
      this.efficiency = efficiency != null ? efficiency : .75;
      this.volume = volume != null ? volume : 5;
      this.efficiency = .75;
      this.volume = 5;
      this.attenuation = .75;
      this.grains = [];
      this.hops = [];
      this.yeasts = [];
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
        attenuation / this.yeast.length;
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
      var color_units, grain, grain_srm, srm, _i, _len, _ref;
      color_units = 0;
      _ref = this.grains;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        grain = _ref[_i];
        grain_srm = grain.weight * grain.lovibond;
        color_units += grain_srm;
      }
      srm = color_units / this.volume;
      return srm = 1.4922 * (Math.pow(srm, .6859));
    };

    Recipe.prototype.get_color = function() {
      var rgb;
      rgb = srm_lookup.getItem(this.get_srm());
      if (rgb === void 0) rgb = '255,255,255';
      return rgb;
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
      return this.grains.push(ingredient);
    };

    Recipe.prototype.add_hop = function(ingredient) {
      ingredient.recipe = this;
      return this.hops.push(ingredient);
    };

    Recipe.prototype.add_yeast = function(ingredient) {
      ingredient.recipe = this;
      return this.hops.push(ingredient);
    };

    Recipe.prototype.remove_grain = function(ingredient) {
      return this.grains.splice(ingredient, 1);
    };

    Recipe.prototype.remove_hop = function(ingredient) {
      return this.hops.splice(ingredient, 1);
    };

    Recipe.prototype.remove_yeast = function(ingredient) {
      return this.yeasts.splice(ingredient, 1);
    };

    return Recipe;

  })();

}).call(this);
