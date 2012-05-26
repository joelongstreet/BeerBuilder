(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  BB.DatePicker = (function(_super) {

    __extends(DatePicker, _super);

    function DatePicker() {
      DatePicker.__super__.constructor.apply(this, arguments);
    }

    DatePicker.prototype.create_date = function() {
      return item.value = this.string_to_date(item.value);
    };

    DatePicker.prototype.string_to_date = function(date_string) {
      var matches;
      date_string = date_string || '';
      matches = /(\d+)\/(\d+)\/(\d+)/.exec(date_string);
      if (matches && matches.length >= 4) {
        return new Date(matches[3], matches[1] - 1, matches[2]);
      }
      return new Date();
    };

    DatePicker.prototype.date_to_string = function(date) {
      return (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
    };

    return DatePicker;

  })(BB.ModalPicker);

}).call(this);
