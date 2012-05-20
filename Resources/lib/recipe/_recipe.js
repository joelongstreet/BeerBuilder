(function() {

  BB.recipe = {
    icon: '/img/builder.png',
    title: 'Builder'
  };

  BB.recipe.stats = new BB.RecipeStats();

  BB.recipe.character = new BB.RecipeCharacter();

  BB.recipe.ingredients = {
    grains: [],
    hops: [],
    yeasts: []
  };

  BB.recipe.views = {
    stats: BB.recipe.stats.build_screen()
  };

  BB.recipe.tabs = {
    setup: Ti.UI.createTab({
      window: new BB.RecipeSetup(),
      title: 'Setup'
    }),
    grains: Ti.UI.createTab({
      window: new BB.RecipeGrains(),
      title: 'Grains'
    }),
    hops: Ti.UI.createTab({
      window: new BB.RecipeHops(),
      title: 'Hops'
    }),
    fermentations: Ti.UI.createTab({
      window: new BB.RecipeFermentation(),
      title: 'Fermentation'
    }),
    delivery: Ti.UI.createTab({
      window: new BB.RecipeDelivery(),
      title: 'Delivery'
    })
  };

  BB.recipe.tab_group = Ti.UI.createTabGroup();

  BB.recipe.tab_group.addTab(BB.recipe.tabs.setup);

  BB.recipe.tab_group.addTab(BB.recipe.tabs.grains);

  BB.recipe.tab_group.addTab(BB.recipe.tabs.hops);

  BB.recipe.tab_group.addTab(BB.recipe.tabs.fermentations);

  BB.recipe.tab_group.addTab(BB.recipe.tabs.delivery);

}).call(this);
