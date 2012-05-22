(function() {
  var tab, _i, _len, _ref;

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

  BB.recipe.tabs = [
    Ti.UI.createTab({
      window: new BB.RecipeSetup(),
      title: 'Setup'
    }), Ti.UI.createTab({
      window: new BB.RecipeGrains(),
      title: 'Grains'
    }), Ti.UI.createTab({
      window: new BB.RecipeHops(),
      title: 'Hops'
    }), Ti.UI.createTab({
      window: new BB.RecipeFermentation(),
      title: 'Fermentation'
    }), Ti.UI.createTab({
      window: new BB.RecipeDelivery(),
      title: 'Delivery'
    })
  ];

  BB.recipe.tab_group = Ti.UI.createTabGroup();

  BB.recipe.tab_group.addTab(BB.recipe.tabs[0]);

  BB.recipe.tab_group.addTab(BB.recipe.tabs[1]);

  BB.recipe.tab_group.addTab(BB.recipe.tabs[2]);

  BB.recipe.tab_group.addTab(BB.recipe.tabs[3]);

  BB.recipe.tab_group.addTab(BB.recipe.tabs[4]);

  _ref = BB.recipe.tabs;
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    tab = _ref[_i];
    tab.addEventListener('focus', function() {
      return this.window.add(BB.recipe.views.stats);
    });
  }

}).call(this);
