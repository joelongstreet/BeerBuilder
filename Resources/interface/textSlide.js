(function() {

  exports.TextSlide = (function() {

    function TextSlide(top, left) {
      var label, view;
      view = Ti.UI.createView();
      label = Ti.UI.createLabel({
        left: left,
        top: top
      });
      view.add(label);
      return view;
    }

    return TextSlide;

  })();

}).call(this);
