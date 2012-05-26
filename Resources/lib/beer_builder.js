(function() {
  var temp2, temp3, temp4, temp5, temp_tab, temp_tabs, temp_window;

  temp_tabs = Ti.UI.createTabGroup();

  temp_window = Ti.UI.createWindow({
    title: 'Temp'
  });

  temp_window.rightNavButton = new BB.CloseWindow(temp_tabs);

  temp_tab = Ti.UI.createTab({
    window: temp_window,
    title: 'Test'
  });

  temp_tabs.addTab(temp_tab);

  temp2 = {
    icon: '/img/efficiency.png',
    title: 'Efficiency',
    tab_group: temp_tabs
  };

  temp3 = {
    icon: '/img/abv.png',
    title: 'ABV',
    tab_group: temp_tabs
  };

  temp4 = {
    icon: '/img/me.png',
    title: 'My Recipes',
    tab_group: temp_tabs
  };

  temp5 = {
    icon: '/img/discover.png',
    title: 'Discover',
    tab_group: temp_tabs
  };

  BB.menu = new BB.Menu([BB.recipe, BB.fixer, temp2, temp3, temp4, temp5]);

  BB.menu.open();

}).call(this);
