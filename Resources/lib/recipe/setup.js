(function() {

  BB.RecipeSetup = (function() {

    function RecipeSetup() {
      this.window = Ti.UI.createWindow({
        title: 'Setup',
        navBarHidden: true
      });
      this.window.add(BB.recipe.views.stats);
      return this.window;
    }

    return RecipeSetup;

  })();

}).call(this);
