(function() {

  BB.WIDTH = Ti.Platform.displayCaps.platformWidth;

  BB.HEIGHT = Ti.Platform.displayCaps.platformHeight;

  BB.PADDING_W = BB.WIDTH * .05;

  BB.PADDING_H = BB.HEIGHT * .05;

  BB.PADDED_W = BB.WIDTH * .9;

  BB.PADDED_H = BB.HEIGHT - BB.WIDTH * .05;

  BB.TYPO = {
    H1: {
      fontSize: 24,
      fontWeight: 'bold'
    },
    H2: {
      fontSize: 22,
      fontWeight: 'bold'
    },
    H3: {
      fontSize: 14,
      fontWeight: 'bold'
    },
    H4: {
      fontSize: 14,
      fontWeight: 'bold'
    },
    H5: {
      fontSize: 14,
      fontWeight: 'bold'
    },
    H6: {
      fontSize: 11,
      fontWeight: 'bold'
    }
  };

}).call(this);
