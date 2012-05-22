(function() {

  BB.RecipeDelivery = (function() {

    function RecipeDelivery() {
      var close;
      this.window = Ti.UI.createWindow({
        title: 'Delivery'
      });
      close = Ti.UI.createButton({
        title: 'close'
      });
      this.window.rightNavButton = close;
      close.addEventListener('click', function() {
        BB.recipe.tab_group.close();
        return BB.menu.open();
      });
      this.window.add(BB.recipe.views.stats);
      return this.window;
    }

    return RecipeDelivery;

  })();

}).call(this);
