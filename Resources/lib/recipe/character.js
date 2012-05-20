(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  BB.RecipeCharacter = (function() {

    function RecipeCharacter() {
      this.update_item = __bind(this.update_item, this);      this.grains = this.build_text_view('Grain Character');
      this.hops = this.build_text_view('Hop Character');
      this.yeasts = this.build_text_view('Yeast Character');
      return [this.grains, this.hops, this.yeasts];
    }

    RecipeCharacter.prototype.build_screen = function() {
      return 1;
    };

    RecipeCharacter.prototype.update_item = function(items, type) {
      var item, item_text, _i, _len;
      item_text = '';
      for (_i = 0, _len = items.length; _i < _len; _i++) {
        item = items[_i];
        item_text += item;
        if (_i !== items.length - 1) item_text += ',';
      }
      if (type === 'grain') {
        return this.grains.update_text(item_text);
      } else if (type === 'hop') {
        return this.hops.update_text(item_text);
      } else if (type === 'yeast') {
        return this.yeasts.update_text(item_text);
      }
    };

    RecipeCharacter.prototype.build_text_view = function(label_text) {
      var content, label, view,
        _this = this;
      view = Ti.UI.createView({
        backgroundColor: 'red',
        width: BB.PADDED_W,
        left: BB.PADDING_W,
        top: BB.PADDING_H,
        height: BB.HEIGHT * .15
      });
      label = Ti.UI.createLabel({
        width: BB.PADDED_W / 5,
        left: BB.PADDING_W,
        top: BB.PADDING_H,
        text: label_text,
        height: '100%'
      });
      content = Ti.UI.createLabel({
        width: BB.PADDED_W * (3 / 5),
        left: BB.PADDED_W / 5,
        top: BB.PADDING_H,
        height: '100%'
      });
      this.update_text = function(new_text) {
        return content.setText();
      };
      view.add(label);
      view.add(content);
      return view;
    };

    return RecipeCharacter;

  })();

}).call(this);
