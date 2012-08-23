(function() {

  exports.Yeast = (function() {

    function Yeast(options) {
      if (!options) {
        throw "Yeast properites are required";
      } else {
        this.attenuation = options.attenuation;
      }
      this.recipe = null;
    }

    return Yeast;

  })();

}).call(this);
