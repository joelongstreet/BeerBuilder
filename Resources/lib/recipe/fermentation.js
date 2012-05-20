(function() {

  BB.RecipeFermentation = (function() {

    function RecipeFermentation() {
      this.window = Ti.UI.createWindow({
        title: 'Fermentation',
        navBarHidden: true
      });
      this.window.add(BB.recipe.views.stats);
      return this.window;
    }

    return RecipeFermentation;

  })();

}).call(this);
