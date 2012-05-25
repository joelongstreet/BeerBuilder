(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  BB.RecipeStats = (function() {

    function RecipeStats() {
      this.compare_to_bjcp = __bind(this.compare_to_bjcp, this);
      this.calculate_gu_bu = __bind(this.calculate_gu_bu, this);
      this.calculate_bitterness = __bind(this.calculate_bitterness, this);
      this.calculate_gravity = __bind(this.calculate_gravity, this);      this.is_prototype = false;
      this.og = 0;
      this.ogu = 0;
      this.fg = 0;
      this.fgu = 0;
      this.gubu = 0;
      this.ibu = 0;
      this.abv = 0;
      this.srm = 0;
      this.efficiency = .75;
      this.volume = 5;
      this.final_volume = 5;
      this.attenuation = 75;
      this.hop_weight = 0;
    }

    RecipeStats.prototype.build_screen = function() {
      var wrapper;
      wrapper = Ti.UI.createView({
        backgroundColor: '#000',
        height: BB.HEIGHT * .2,
        width: BB.WIDTH,
        top: 0
      });
      this.og_text = Ti.UI.createLabel({
        width: BB.WIDTH * .25,
        text: 'OG : 0',
        left: BB.PADDING_W,
        top: BB.PADDING_H,
        color: '#ffffff',
        height: BB.HEIGHT * .05,
        font: BB.TYPO.H6
      });
      this.fg_text = Ti.UI.createLabel({
        width: BB.WIDTH * .25,
        text: 'FG : 0',
        left: BB.PADDING_W,
        bottom: BB.PADDING_H,
        color: '#ffffff',
        height: BB.HEIGHT * .05,
        font: BB.TYPO.H6
      });
      this.gubu_text = Ti.UI.createLabel({
        width: BB.WIDTH * .25,
        text: 'GUBU : 0',
        left: BB.PADDED_W * .425,
        top: BB.PADDING_H,
        color: '#ffffff',
        height: BB.HEIGHT * .05,
        font: BB.TYPO.H6
      });
      this.ibu_text = Ti.UI.createLabel({
        width: BB.WIDTH * .25,
        text: 'IBU\'S : 0',
        left: BB.PADDED_W * .425,
        bottom: BB.PADDING_H,
        color: '#ffffff',
        height: BB.HEIGHT * .05,
        font: BB.TYPO.H6
      });
      this.abv_text = Ti.UI.createLabel({
        width: BB.WIDTH * .25,
        text: 'ABV : 0',
        right: BB.PADDING_W,
        top: BB.PADDING_H,
        color: '#ffffff',
        textAlign: 'right',
        height: BB.HEIGHT * .05,
        font: BB.TYPO.H6
      });
      this.srm_text = Ti.UI.createLabel({
        width: BB.WIDTH * .25,
        text: 'SRM : 0',
        right: BB.PADDING_W,
        bottom: BB.PADDING_H,
        color: '#ffffff',
        textAlign: 'right',
        height: BB.HEIGHT * .05,
        font: BB.TYPO.H6
      });
      wrapper.add(this.og_text);
      wrapper.add(this.fg_text);
      wrapper.add(this.gubu_text);
      wrapper.add(this.ibu_text);
      wrapper.add(this.srm_text);
      wrapper.add(this.abv_text);
      return wrapper;
    };

    RecipeStats.prototype.calculate_gravity = function() {
      var grain, grain_gravity_units, grain_mcu, gu_average, lovibond_avg, proportion, _i, _j, _len, _len2, _ref, _ref2;
      this.gravity_units = 0;
      this.srm = 0;
      this.weight = 0;
      _ref = BB.recipe.ingredients.grains;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        grain = _ref[_i];
        gu_average = (grain.properties.gu_lo + grain.properties.gu_hi) / 2;
        grain_gravity_units = parseInt(grain.weight * gu_average);
        if (grain.properties.extract !== 1) grain_gravity_units *= this.efficiency;
        this.gravity_units += grain_gravity_units;
        lovibond_avg = (grain.properties.lovibond_lo + grain.properties.lovibond_hi) / 2;
        grain_mcu = parseInt(grain.weight * lovibond_avg);
        this.srm += grain_mcu;
        this.weight += grain.weight;
      }
      _ref2 = BB.recipe.ingredients.grains;
      for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
        grain = _ref2[_j];
        proportion = grain.weight / this.weight;
        grain.update_proportion(proportion);
      }
      this.ogu = this.gravity_units / this.volume;
      this.fgu = (this.gravity_units * (this.attenuation / 100)) / this.volume;
      this.og = 1 + this.ogu / 1000;
      this.fg = 1 + this.fgu / 1000;
      this.fg = 1 + (this.og - this.fg);
      this.abv = 131 * (this.og - this.fg);
      this.og_text.setText("OG: " + (this.og.toFixed(3)));
      this.fg_text.setText("FG: " + (this.fg.toFixed(3)));
      this.abv_text.setText("ABV: " + (this.abv.toFixed(1)));
      this.calculate_color();
      return this.calculate_gu_bu();
    };

    RecipeStats.prototype.calculate_color = function() {
      var srm_rgb;
      this.srm = this.srm / this.volume;
      this.srm = 1.4922 * (Math.pow(this.srm, .6859));
      this.srm = Math.round(this.srm * 10) / 10;
      if (this.srm > 40) {
        this.srm_rgb = '0,0,0';
      } else {
        this.srm_rgb = BB.utilities.srm_lookup.getItem(this.srm);
        if (this.srm_rgb === void 0) srm_rgb = '255,255,255';
      }
      return this.srm_text.setText("SRM: " + (this.srm.toFixed(1)));
    };

    RecipeStats.prototype.calculate_bitterness = function() {
      var aa, aau, hop, proportion, utilization, _i, _j, _len, _len2, _ref, _ref2;
      this.hop_weight = 0;
      _ref = BB.recipe.ingredients.hops;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        hop = _ref[_i];
        aa = (hop.properties.aa_lo + hop.properties.aa_hi) / 2;
        utilization = -1 * (.0041 * Math.pow(hop.time, 2)) + (.6261 * hop.time) + 1.5779;
        aau = hop.weight * utilization * .7489 * aa;
        this.ibu += aau;
        this.hop_weight += hop.weight;
      }
      _ref2 = BB.recipe.ingredients.hops;
      for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
        hop = _ref2[_j];
        proportion = hop.weight / this.hop_weight;
        hop.update_proportion(proportion);
      }
      this.ibu = Math.round(this.ibu / this.final_volume);
      this.ibu_text.setText("IBU\'s: " + (this.ibu.toFixed(1)));
      return this.calculate_gu_bu();
    };

    RecipeStats.prototype.calculate_gu_bu = function() {
      if (this.ibu === 0) this.ibu = 1;
      this.gubu = Math.round(this.fgu / this.ibu * 1000) / 1000;
      this.gubu_text.setText("GUBU: " + (this.gubu.toFixed(2)));
      if (this.is_prototype) return this.compare_to_bjcp();
    };

    RecipeStats.prototype.compare_to_bjcp = function() {
      return false;
    };

    return RecipeStats;

  })();

}).call(this);
