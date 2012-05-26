(function() {

  BB.RecipeDelivery = (function() {

    function RecipeDelivery() {
      this.window = Ti.UI.createWindow({
        title: 'Delivery'
      });
      this.window.rightNavButton = new BB.CloseWindow(BB.recipe.tab_group);
      return this.window;
    }

    return RecipeDelivery;

  })();

}).call(this);
