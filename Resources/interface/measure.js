(function() {

  exports.Measure = (function() {

    function Measure(title) {
      var label_key, line;
      this.view = Ti.UI.createView({
        width: Ti.Platform.displayCaps.platformWidth * .9,
        height: 40,
        top: 30
      });
      label_key = Ti.UI.createLabel({
        bottom: 0,
        left: Ti.Platform.displayCaps.platformWidth * .05,
        width: '100%',
        text: title,
        color: 'white'
      });
      this.label_val = Ti.UI.createLabel({
        bottom: 0,
        right: 0,
        width: '100%',
        text: '1.059',
        color: 'white',
        textAlign: 'right'
      });
      line = Ti.UI.createImageView({
        top: 3,
        height: 2,
        width: '100%',
        left: Ti.Platform.displayCaps.platformWidth * .05,
        backgroundColor: 'white',
        borderRadius: 1
      });
      this.pos_dot = this.create_dot(10);
      this.max_dot = this.create_dot(230);
      this.min_dot = this.create_dot(60);
      this.view.add(line, this.max_dot, this.min_dot, this.pos_dot, label_key, this.label_val);
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

    Measure.prototype.create_dot = function(left_pos) {
      return Ti.UI.createImageView({
        left: left_pos,
        width: 8,
        height: 8,
        top: 0,
        backgroundColor: 'white',
        borderRadius: 4
      });
    };

    Measure.prototype.set_position = function(position) {
      return this.view.setLeft(position * Ti.Platform.displayCaps.platformWidth);
    };

    return Measure;

  })();

}).call(this);
