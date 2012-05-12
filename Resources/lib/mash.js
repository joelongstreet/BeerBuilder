(function() {

  BB.Mash = (function() {

    function Mash() {
      var temp_win;
      temp_win = Ti.UI.createWindow({
        title: 'Mash',
        navBarHidden: true
      });
      return temp_win;
    }

    return Mash;

  })();

}).call(this);
