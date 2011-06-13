(function() {
  jQuery(function() {
    $.minTip = function(element, options) {
      var setState, state;
      this.defaults = {
        position: 'element',
        offset: {
          'x': 0,
          'y': 0
        },
        delay: 200,
        event: 'hover',
        contentType: 'attribute',
        contentAttribute: 'title',
        contentSelector: '',
        showSpeed: 600,
        hideSpeed: 450,
        css: {},
        className: 'miniTip',
        showAnimateProperties: {},
        hideAnimateProperties: {},
        onLoad: function() {},
        onVisible: function() {},
        onHide: function() {},
        onHidden: function() {}
      };
      state = '';
      this.settings = {};
      this.$element = $(element);
      setState = function(_state) {
        return state = _state;
      };
      this.getState = function() {
        return state;
      };
      this.getSetting = function(settingKey) {
        return this.settings[settingKey];
      };
      this.callSettingFunction = function(functionName) {
        return this.settings[functionName]();
      };
      this.init = function() {
        return this.settings = $.extend({}, this.defaults, options);
      };
      return this.init();
    };
    return $.fn.minTip = function(options) {
      return this.each(function() {
        var miniTip;
        if (void 0 === ($(this)).data('minTip')) {
          miniTip = new $.minTip(this, options);
          return ($(this)).data('minTip', miniTip);
        }
      });
    };
  });
}).call(this);
