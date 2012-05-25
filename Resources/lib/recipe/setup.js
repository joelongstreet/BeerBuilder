(function() {

  BB.RecipeSetup = (function() {

    function RecipeSetup() {
      var close, date, efficiency_l, efficiency_s, title, volume_l, volume_s;
      this.window = Ti.UI.createWindow({
        title: 'Setup',
        backgroundColor: '#fff'
      });
      close = Ti.UI.createButton({
        title: 'close'
      });
      this.window.rightNavButton = close;
      close.addEventListener('click', function() {
        BB.recipe.tab_group.close();
        return BB.menu.open();
      });
      title = Ti.UI.createTextField({
        hintText: 'Your Next Great Beer',
        top: BB.PADDING_H,
        width: BB.WIDTH - BB.PADDING_W * 2,
        left: BB.PADDING_W,
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
        font: {
          fontSize: 22
        }
      });
      date = Ti.UI.createTextField({
        hintText: 'Date Brewed',
        top: BB.PADDING_H * 3,
        width: BB.WIDTH / 2,
        right: BB.PADDING_W,
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
      });
      efficiency_s = Ti.UI.createSlider({
        min: 0,
        max: 100,
        width: BB.WIDTH - BB.PADDING_W * 2,
        left: BB.PADDING_W,
        top: BB.PADDING_H * 7,
        value: 75
      });
      efficiency_l = Ti.UI.createLabel({
        top: BB.PADDING_H * 6,
        right: BB.PADDING_W,
        text: 'Efficiency: 75%'
      });
      efficiency_s.addEventListener('change', function(e) {
        BB.recipe.stats.efficiency = e.value / 100;
        BB.recipe.stats.calculate_gravity();
        BB.recipe.stats.calculate_bitterness();
        return efficiency_l.setText("Efficiency: " + (e.value.toFixed(0)) + "%");
      });
      volume_s = Ti.UI.createSlider({
        min: 0,
        max: 20,
        width: BB.WIDTH - BB.PADDING_W * 2,
        left: BB.PADDING_W,
        top: BB.PADDING_H * 10,
        value: 5
      });
      volume_l = Ti.UI.createLabel({
        top: BB.PADDING_H * 9,
        right: BB.PADDING_W,
        text: 'Volume: 5 Gallons'
      });
      volume_s.addEventListener('change', function(e) {
        BB.recipe.stats.volume = e.value;
        BB.recipe.stats.calculate_gravity();
        BB.recipe.stats.calculate_bitterness();
        return volume_l.setText("Volume: " + (e.value.toFixed(1)) + " Gallons");
      });
      this.window.add(title);
      this.window.add(date);
      this.window.add(efficiency_s);
      this.window.add(efficiency_l);
      this.window.add(volume_s);
      this.window.add(volume_l);
      return this.window;
    }

    return RecipeSetup;

  })();

}).call(this);
