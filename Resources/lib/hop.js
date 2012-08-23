(function() {

  exports.Hop = (function() {

    function Hop(options) {
      if (!options) {
        throw "Hop properites are required";
      } else {
        this.aa = options.aa;
      }
      this.recipe = null;
      this.weight = 0;
      this.time = 0;
    }

    Hop.prototype.update_weight = function(new_weight) {
      return this.weight = new_weight;
    };

    Hop.prototype.update_time = function(new_time) {
      return this.time = new_time;
    };

    Hop.prototype.get_proportion = function() {
      var proportion;
      proportion = this.weight / this.recipe.get_hop_weight();
      proportion = proportion.toFixed(2);
      return proportion = proportion * 100 + '%';
    };

    return Hop;

  })();

}).call(this);
