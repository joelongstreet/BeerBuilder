(function() {

  exports.Hop = (function() {

    function Hop(options, weight, time) {
      this.weight = weight != null ? weight : 0;
      this.time = time != null ? time : 0;
      if (!options) {
        throw "Hop properites are required";
      } else {
        this.aa = options.aa;
      }
      this.recipe = null;
    }

    Hop.prototype.update_weight = function(new_weight) {
      this.weight = new_weight;
      this.recipe.measures.uby.update(this.recipe.get_ibu);
      return this.recipe.measures.gubu.update(this.recipe.get_gu_bu);
    };

    Hop.prototype.update_time = function(new_time) {
      this.time = new_time;
      this.recipe.measures.uby.update(this.recipe.get_ibu);
      return this.recipe.measures.gubu.update(this.recipe.get_gu_bu);
    };

    Hop.prototype.get_proportion = function() {
      var proportion;
      proportion = this.weight / this.recipe.get_hop_weight();
      return proportion = parseInt(proportion * 100) + '%';
    };

    return Hop;

  })();

}).call(this);
