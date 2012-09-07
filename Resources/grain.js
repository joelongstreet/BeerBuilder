(function() {

  exports.Grain = (function() {

    function Grain(options, weight) {
      this.weight = weight != null ? weight : 0;
      if (!options) {
        throw "Grain properites are required";
      } else {
        this.lovibond = options.lovibond;
        this.gravity_units = options.gravity_units;
        if (options.is_extract) this.is_extract = options.is_extract;
      }
      this.recipe = null;
      this.proportion = 0;
    }

    Grain.prototype.update_weight = function(new_weight) {
      this.weight = new_weight;
      this.recipe.measures.og.update(this.recipe.get_og);
      this.recipe.measures.fg.update(this.recipe.get_fg);
      this.recipe.measures.abv.update(this.recipe.get_abv);
      this.recipe.measures.srm.update(this.recipe.get_srm);
      return this.recipe.measures.gubu.update(this.recipe.get_gu_bu);
    };

    Grain.prototype.update_self = function(new_self) {
      return false;
    };

    Grain.prototype.get_proportion = function() {
      var proportion;
      proportion = this.weight / this.recipe.get_grain_weight();
      return proportion = parseInt(proportion * 100) + '%';
    };

    return Grain;

  })();

}).call(this);
