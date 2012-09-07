(function() {
  var Measure;

  Measure = (function() {

    function Measure(title) {
      var graph, line;
      this.view = Ti.UI.createView();
      this.label = Ti.UI.createLabel({
        text: 0
      });
      title = Ti.UI.createLabel({
        text: title
      });
      graph = Ti.UI.createView();
      line = Ti.UI.createImageView();
      this.pos_dot = Ti.UI.createImageView();
      this.max_dot = Ti.UI.createImageView();
      this.min_dot = Ti.UI.createImageView();
      graph.add(line, this.max_dot, this.min_dot, this.pos_dot);
      this.view.add(graph, title, this.label);
    }

    Measure.prototype.update = function(new_prop) {};

    Measure.prototype.update_min = function(new_pos) {
      return this.min_dot.setLeft(new_pos);
    };

    Measure.prototype.update_max = function(new_pos) {
      return this.max_dot.setLeft(new_pos);
    };

    Measure.prototype.update_dot = function(new_pos) {
      this.label.setText(new_pos);
      return this.pos_dot.setLeft(new_pos);
    };

    return Measure;

  })();

  exports.Measure = Measure;

}).call(this);
