(function() {

  BB.RecipeSetup = (function() {

    function RecipeSetup() {
      var date, efficiency, title, volume;
      this.window = Ti.UI.createWindow({
        title: 'Setup',
        backgroundColor: '#fff'
      });
      Ti.API.info(Ti.Platform.displayCaps.platformWidth);
      Ti.API.info(BB.WIDTH);
      Ti.API.info(JSON.stringify(BB));
      title = Ti.UI.createTextField({
        hintText: 'Beer Title',
        top: BB.PADDING_H,
        height: BB.HEIGHT * .1,
        width: BB.WIDTH / 2,
        left: BB.PADDING_W,
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
      });
      date = Ti.UI.createTextField({
        hintText: new Date().getTime(),
        top: BB.PADDING_H * 3
      });
      efficiency = Ti.UI.createTextField({
        hintText: '0 - 100',
        top: BB.PADDING_H * 6
      });
      volume = Ti.UI.createTextField({
        hintText: '0 - 100',
        top: BB.PADDING_H * 9
      });
      this.window.add(title);
      return this.window;
    }

    return RecipeSetup;

  })();

}).call(this);
