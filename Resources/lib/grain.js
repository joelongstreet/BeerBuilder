(function() {

  exports.Grain = (function() {

    function Grain(options) {
      if (!options) {
        throw "Grain properites are required";
      } else {
        this.lovibond = options.lovibond;
        this.gravity_units = options.gravity_units;
        if (options.is_extract) this.is_extract = options.is_extract;
      }
      this.recipe = null;
      this.weight = 0;
      this.proportion = 0;
    }

    Grain.prototype.update_weight = function(new_weight) {
      return this.weight = new_weight;
    };

    Grain.prototype.get_proportion = function() {
      var proportion;
      proportion = this.weight / this.recipe.get_grain_weight();
      proportion = proportion.toFixed(2);
      return proportion * 100 + '%';
    };

    return Grain;

  })();

}).call(this);
