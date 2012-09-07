(function() {

  APP.WIDTH = Ti.Platform.displayCaps.platformWidth;

  APP.HEIGHT = Ti.Platform.displayCaps.platformHeight;

  APP.PADDING_W = Ti.Platform.displayCaps.platformWidth * .025;

  APP.PADDING_H = Ti.Platform.displayCaps.platformWidth * .025;

  APP.COLORS = {
    WHITE: '#ffffff'
  };

  APP.TYPO = {
    H1: {
      fontSize: 24,
      fontWeight: 'bold'
    },
    H2: {
      fontSize: 18,
      fontWeight: 'bold'
    },
    H3: {
      fontSize: 14,
      fontWeight: 'bold'
    }
  };

}).call(this);
