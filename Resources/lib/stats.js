(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  BB.Stats = (function() {

    function Stats() {
      this.compare_to_bjcp = __bind(this.compare_to_bjcp, this);
      this.calculate_gu_bu = __bind(this.calculate_gu_bu, this);
      this.calculate_bitterness = __bind(this.calculate_bitterness, this);
      this.calculate_gravity = __bind(this.calculate_gravity, this);
      this.build_attrs = __bind(this.build_attrs, this);
      var temp_view;
      temp_view = Ti.UI.createView();
      return temp_view;
    }

    Stats.prototype.build_attrs = function() {
      this.og = 0;
      this.fg = 0;
      this.gubu = 0;
      this.ibu = 0;
      this.abv = 0;
      return this.srm = 0;
    };

    Stats.prototype.calculate_gravity = function() {};

    Stats.prototype.calculate_bitterness = function() {};

    Stats.prototype.calculate_gu_bu = function() {};

    Stats.prototype.compare_to_bjcp = function() {};

    return Stats;

  })();

}).call(this);
