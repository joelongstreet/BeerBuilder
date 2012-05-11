(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  BB.Stats = (function() {

    function Stats() {
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
    }

    Stats.prototype.calculate_gravity = function() {
      var grain, grain_gravity_units, grain_mcu, proportion, _i, _j, _len, _len2, _ref, _ref2;
      this.gravity_units = 0;
      this.srm = 0;
      this.weight = 0;
      _ref = BB.ingredients.grains;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        grain = _ref[_i];
        grain_gravity_units = parseInt(grain.weight * grain.gu_average);
        if (grain.extract !== 1) {
          grain_gravity_units = grain_gravity_units * this.efficiency;
        }
        this.gravity_units += grain_gravity_units;
        grain_mcu = parseInt(grain.weight * grain.lovibond_avg);
        this.srm += grain_mcu;
        this.weight += grain.weight;
      }
      _ref2 = BB.ingredients.grains;
      for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
        grain = _ref2[_j];
        proportion = grain.weight / this.weight;
        grain.update_proportion(proportion);
      }
      this.ogu = this.gravity_units / this.volume;
      this.fgu = (this.gravity_units * (this.attenuation / 100)) / this.volume;
      this.og = 1 + this.ogu / 1000;
      this.og = Math.round(this.og * 10000) / 10000;
      this.fg = 1 + this.fgu / 1000;
      this.fg = 1 + (this.og - this.fg);
      this.fg = Math.round(this.fg * 10000) / 10000;
      this.abv = 131 * (this.og - this.fg);
      this.abv = Math.round(this.abv * 100) / 100;
      /*
      		@og 		= 0 unless @og
      		@srm 		= 0 unless @srm
      		@srm_rgb 	= 0 unless @srm_rgb
      		@fg 		= 0 unless @fg
      		@abv 		= 0 unless @abv
      */
      this.calculate_color();
      return this.calculate_gu_bu();
    };

    Stats.prototype.calculate_color = function() {
      var srm_rgb;
      this.srm = this.srm / this.volume;
      this.srm = 1.4922 * (Math.pow(this.srm, .6859));
      this.srm = Math.round(this.srm * 10) / 10;
      if (this.srm > 40) {
        return this.srm_rgb = '0,0,0';
      } else {
        this.srm_rgb = BB.utilities.srm_lookup.getItem(this.srm);
        if (this.srm_rgb === void 0) return srm_rgb = '255,255,255';
      }
    };

    Stats.prototype.calculate_bitterness = function() {
      var aau, hop, utilization, _i, _len, _ref;
      _ref = BB.ingredients.hops;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        hop = _ref[_i];
        utilization = -1 * (.0041 * Math.pow(hop.time, 2)) + (.6261 * hop.time) + 1.5779;
        aau = hop.weight * utilization * .7489 * hop.aa;
        this.ibu += aau;
      }
      this.ibu = Math.round(this.ibu / this.final_volume);
      return this.calculate_gu_bu();
    };

    Stats.prototype.calculate_gu_bu = function() {
      var ibu;
      if (this.ibu === 0) ibu = 1;
      if (this.is_prototype) return this.compare_to_bjcp();
    };

    Stats.prototype.compare_to_bjcp = function() {};

    return Stats;

  })();

}).call(this);
