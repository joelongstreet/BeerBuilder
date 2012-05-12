(function() {

  BB.RecipeBase = (function() {

    function RecipeBase() {
      var temp_win;
      temp_win = Ti.UI.createWindow({
        title: 'Setup',
        navBarHidden: true
      });
      return temp_win;
    }

    return RecipeBase;

  })();

}).call(this);
