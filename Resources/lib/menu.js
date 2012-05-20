(function() {

  BB.Menu = (function() {

    function Menu(tab_groups) {
      var item, nav_item, nav_item_top, title, _i, _len;
      this.window = Ti.UI.createWindow({
        title: 'Menu',
        backgroundColor: 'white'
      });
      title = Ti.UI.createLabel({
        text: 'Beer Builder',
        top: BB.PADDING_H,
        width: BB.WIDTH,
        textAlign: 'center',
        font: {
          fontSize: 35,
          fontWeight: 'bold'
        },
        color: 'white',
        backgroundColor: 'black'
      });
      nav_item_top = 0;
      for (_i = 0, _len = tab_groups.length; _i < _len; _i++) {
        item = tab_groups[_i];
        nav_item = this.build_nav_item(item, _i, nav_item_top);
        this.window.add(nav_item);
      }
      this.window.add(title);
      return this.window;
    }

    Menu.prototype.build_nav_item = function(item, iterator) {
      var image, label, top_position, view;
      if (iterator === 0 || iterator === 1) {
        top_position = BB.PADDING_H + BB.HEIGHT * .125;
      } else if (iterator === 2 || iterator === 3) {
        top_position = BB.PADDING_H + BB.HEIGHT * .25 + BB.HEIGHT * .125;
      } else if (iterator === 4 || iterator === 5) {
        top_position = BB.PADDING_H + BB.HEIGHT * .25 * 2 + BB.HEIGHT * .125;
      }
      view = Ti.UI.createView({
        top: top_position,
        width: BB.WIDTH * .4,
        height: BB.WIDTH * .3,
        backgroundColor: '#DEDEDE',
        borderRadius: 3,
        borderColor: '#303030',
        borderWidth: 1
      });
      if (iterator % 2) {
        view.right = BB.PADDING_W;
      } else {
        view.left = BB.PADDING_W;
      }
      label = Ti.UI.createLabel({
        text: item.title,
        bottom: 0,
        textAlign: 'center'
      });
      image = Ti.UI.createImageView({
        image: item.icon,
        top: 10,
        height: '60%'
      });
      view.add(label);
      view.add(image);
      view.addEventListener('click', function() {
        return item.tab_group.open();
      });
      return view;
    };

    return Menu;

  })();

}).call(this);
