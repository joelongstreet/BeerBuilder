(function() {

  BB.RecipeFermentation = (function() {

    function RecipeFermentation() {
      var close;
      this.window = Ti.UI.createWindow({
        title: 'Fermentation'
      });
      close = Ti.UI.createButton({
        title: 'close'
      });
      this.window.rightNavButton = close;
      close.addEventListener('click', function() {
        BB.recipe.tab_group.close();
        return BB.menu.open();
      });
      return this.window;
    }

    return RecipeFermentation;

  })();

}).call(this);
