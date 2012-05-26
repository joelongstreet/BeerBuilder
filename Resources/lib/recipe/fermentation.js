(function() {

  BB.RecipeFermentation = (function() {

    function RecipeFermentation() {
      this.window = Ti.UI.createWindow({
        title: 'Fermentation'
      });
      this.window.rightNavButton = new BB.CloseWindow(BB.recipe.tab_group);
      return this.window;
    }

    return RecipeFermentation;

  })();

}).call(this);
