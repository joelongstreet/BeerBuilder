(function() {

  BB.RecipeDelivery = (function() {

    function RecipeDelivery() {
      this.window = Ti.UI.createWindow({
        title: 'Delivery',
        navBarHidden: true
      });
      this.window.add(BB.recipe.views.stats);
      return this.window;
    }

    return RecipeDelivery;

  })();

}).call(this);
