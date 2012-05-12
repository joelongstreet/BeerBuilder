(function() {

  BB.WIDTH = Ti.Platform.displayCaps.platformWidth;

  BB.HEIGHT = Ti.Platform.displayCaps.platformHeight;

  BB.PADDING_W = BB.WIDTH * .05;

  BB.PADDING_H = BB.HEIGHT * .05;

  BB.PADDED_W = BB.WIDTH * .9;

  BB.PADDED_H = BB.HEIGHT - BB.WIDTH * .05;

  BB.stats = new BB.Stats();

  BB.character = new BB.Character();

  BB.ingredients = {
    grains: [],
    hops: [],
    yeasts: []
  };

  BB.views = {
    stats: BB.stats.build_screen()
  };

  BB.base_windows = {
    setup: new BB.RecipeBase(),
    grain: new BB.Grains(),
    hops: new BB.Hops(),
    yeast: new BB.Yeasts(),
    fermentation: new BB.Fermentation(),
    delivery: new BB.Delivery()
  };

  BB.base_tabs = {
    setup: Ti.UI.createTab({
      window: BB.base_windows.setup,
      title: 'Setup'
    }),
    grains: Ti.UI.createTab({
      window: BB.base_windows.grain,
      title: 'Grains'
    }),
    hops: Ti.UI.createTab({
      window: BB.base_windows.hops,
      title: 'Hops'
    }),
    yeasts: Ti.UI.createTab({
      window: BB.base_windows.yeast,
      title: 'Yeast'
    }),
    fermentations: Ti.UI.createTab({
      window: BB.base_windows.fermentation,
      title: 'Fermentation'
    }),
    delivery: Ti.UI.createTab({
      window: BB.base_windows.delivery,
      title: 'Delivery'
    })
  };

  BB.recipe = Ti.UI.createTabGroup();

  BB.recipe.addTab(BB.base_tabs.setup);

  BB.recipe.addTab(BB.base_tabs.grains);

  BB.recipe.addTab(BB.base_tabs.hops);

  BB.recipe.addTab(BB.base_tabs.yeasts);

  BB.recipe.addTab(BB.base_tabs.fermentations);

  BB.recipe.addTab(BB.base_tabs.delivery);

  BB.recipe.open();

}).call(this);
