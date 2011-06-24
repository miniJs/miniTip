(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  jQuery(function() {
    $.miniTip = function(element, options) {
      var content, setState, state;
      this.defaults = {
        position: 'bottom',
        margin: 5,
        delay: 200,
        contentType: 'attribute',
        contentAttribute: 'title',
        contentSelector: '',
        showSpeed: 400,
        hideSpeed: 250,
        showEasing: '',
        hideEasing: '',
        css: {},
        className: 'minitip',
        contentClassName: 'minitip-content',
        showAnimateProperties: {},
        hideAnimateProperties: {},
        onLoad: function() {},
        onVisible: function() {},
        onHide: function() {},
        onHidden: function() {}
      };
      state = 'hidden';
      content = '';
      this.settings = {};
      this.$element = $(element);
      setState = function(_state) {
        return state = _state;
      };
      this.getState = function() {
        return state;
      };
      this.getContent = function() {
        return content;
      };
      this.setContent = function(_content) {
        return content = _content;
      };
      this.updateMiniTipContent = function(content) {
        return this.$miniTipContent.html(content);
      };
      this.getPosition = function() {
        var coordinates, position;
        position = this.getSetting('position');
        coordinates = this.$element.offset();
        switch (position) {
          case "top":
            coordinates['top'] = coordinates.top - this.$miniTip.outerHeight() - this.getSetting('margin');
            break;
          case "left":
            coordinates['left'] = coordinates.left - this.$miniTip.outerWidth() - this.getSetting('margin');
            break;
          case "right":
            coordinates['left'] = coordinates.left + this.$element.outerWidth() + this.getSetting('margin');
            break;
          default:
            coordinates['top'] = coordinates.top + this.$element.outerHeight() + this.getSetting('margin');
        }
        return coordinates;
      };
      this.updatePosition = __bind(function() {
        return this.$miniTip.css(this.getPosition());
      }, this);
      this.getSetting = function(settingKey) {
        return this.settings[settingKey];
      };
      this.callSettingFunction = function(functionName) {
        return this.settings[functionName]();
      };
      this.show = function() {
        if (this.getState() === 'hidden' || this.getState === 'hiding') {
          setState('showing');
          return this.$miniTip.stop(true, true).css('opacity', 0).show().animate({
            'opacity': 1
          }, this.getSetting('showSpeed'), this.getSetting('showEasing'), __bind(function() {
            this.$miniTip.show();
            return setState('visible');
          }, this));
        }
      };
      this.hide = function() {
        setState('hiding');
        return this.$miniTip.animate({
          'opacity': 0
        }, this.getSetting('hideSpeed'), this.getSetting('hideEasing'), __bind(function() {
          this.$miniTip.hide();
          return setState('hidden');
        }, this));
      };
      this.init = function() {
        var miniTipCss;
        this.settings = $.extend({}, this.defaults, options);
        miniTipCss = $.extend({}, {
          'opacity': 1
        }, this.getSetting('css'));
        this.$miniTipContent = $('<div />', {
          'class': this.getSetting('contentClassName')
        });
        this.$miniTip = $('<div />', {
          'class': this.getSetting('className'),
          'css': miniTipCss
        }).html(this.$miniTipContent).appendTo('body');
        if (this.getSetting('contentType') === 'selector') {
          this.setContent(this.$element.find(this.getSetting('contentSelector')).html());
        } else {
          this.setContent(this.$element.attr(this.getSetting('contentAttribute')));
          this.$element.attr(this.getSetting('contentAttribute'), '');
        }
        if (!(this.getContent() != null)) {
          return false;
        } else {
          this.updateMiniTipContent(this.getContent());
        }
        this.updatePosition();
        ($(window)).resize(this.updatePosition);
        return this.$element.bind('mouseenter', __bind(function() {
          return this.show();
        }, this)).bind('mouseleave', __bind(function() {
          return this.hide();
        }, this));
      };
      return this.init();
    };
    return $.fn.miniTip = function(options) {
      return this.each(function() {
        var miniTip;
        if (void 0 === ($(this)).data('minTip')) {
          miniTip = new $.miniTip(this, options);
          return ($(this)).data('minTip', miniTip);
        }
      });
    };
  });
}).call(this);
