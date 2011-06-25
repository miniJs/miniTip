(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  jQuery(function() {
    $.miniTip = function(element, options) {
      var content, getArrowCss, hideAnimateProperties, setState, showAnimateProperties, state;
      this.defaults = {
        position: 'top',
        offset: 10,
        opacity: 0.95,
        delay: 200,
        contentType: 'attribute',
        contentAttribute: 'title',
        contentSelector: '',
        showSpeed: 350,
        hideSpeed: 250,
        showEasing: '',
        hideEasing: '',
        showArrow: true,
        className: '',
        showAnimateProperties: {},
        hideAnimateProperties: {},
        onLoad: function() {},
        onVisible: function() {},
        onHide: function() {},
        onHidden: function() {}
      };
      state = 'hidden';
      content = '';
      showAnimateProperties = {
        'opacity': 1
      };
      hideAnimateProperties = {
        'opacity': 0
      };
      this.settings = {};
      this.$element = $(element);
      setState = function(_state) {
        return state = _state;
      };
      getArrowCss = __bind(function() {
        var arrowCss, position, _arrowCss, _borderColor, _left, _shadowBorderColor, _shadowCss;
        arrowCss = {};
        arrowCss['arrow'] = {
          'position': 'absolute',
          'height': 0,
          'width': 0,
          'border': '6px solid transparent'
        };
        position = this.getSetting('position');
        _arrowCss = _shadowCss = {};
        _shadowBorderColor = this.$miniTipContent.css('border-color');
        _borderColor = this.$miniTipContent.css('background-color');
        switch (position) {
          case "left":
            _arrowCss = {
              'right': '-11px',
              'top': '7px',
              'border-left-color': _borderColor
            };
            _shadowCss = {
              'right': '-14px',
              'border-left-color': _shadowBorderColor,
              'top': '6px'
            };
            break;
          case "right":
            _arrowCss = {
              'left': '-11px',
              'top': '7px',
              'border-right-color': _borderColor
            };
            _shadowCss = {
              'left': '-14px',
              'border-right-color': _shadowBorderColor,
              'top': '6px'
            };
            break;
          case "bottom":
            _left = this.$miniTip.outerWidth() < this.$element.outerWidth() ? Math.floor(this.$miniTip.outerWidth() / 5) : Math.floor(this.$element.outerWidth() / 5);
            _arrowCss = {
              'top': '-11px',
              'left': _left + 'px',
              'border-bottom-color': _borderColor
            };
            _shadowCss = {
              'top': '-14px',
              'border-bottom-color': _shadowBorderColor,
              'left': (_left - 1) + 'px'
            };
            break;
          default:
            _left = this.$miniTip.outerWidth() < this.$element.outerWidth() ? Math.floor(this.$miniTip.outerWidth() / 5) : Math.floor(this.$element.outerWidth() / 5);
            _arrowCss = {
              'bottom': '-11px',
              'left': _left + 'px',
              'border-top-color': _borderColor
            };
            _shadowCss = {
              'bottom': '-14px',
              'border-top-color': _shadowBorderColor,
              'left': (_left - 1) + 'px'
            };
        }
        arrowCss['arrow'] = $.extend({}, arrowCss['arrow'], _arrowCss);
        arrowCss['shadow'] = $.extend({}, arrowCss['arrow'], {
          'border-width': '7px',
          'opacity': '0.20'
        }, _shadowCss);
        return arrowCss;
      }, this);
      this.getSetting = function(settingKey) {
        return this.settings[settingKey];
      };
      this.callSettingFunction = function(functionName) {
        return this.settings[functionName]();
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
        return this.$miniTipContent.html($.trim(content));
      };
      this.getPosition = function() {
        var coordinates, position;
        position = this.getSetting('position');
        coordinates = this.$element.offset();
        switch (position) {
          case "bottom":
            coordinates['top'] = coordinates.top + this.$element.outerHeight() + this.getSetting('offset');
            break;
          case "left":
            coordinates['left'] = coordinates.left - this.$miniTip.outerWidth() - this.getSetting('offset');
            coordinates['top'] -= 5;
            break;
          case "right":
            coordinates['left'] = coordinates.left + this.$element.outerWidth() + this.getSetting('offset');
            coordinates['top'] -= 5;
            break;
          default:
            coordinates['top'] = coordinates.top - this.$miniTip.outerHeight() - this.getSetting('offset');
        }
        return coordinates;
      };
      this.updatePosition = __bind(function() {
        return this.$miniTip.css(this.getPosition());
      }, this);
      this.show = function() {
        if (this.getState() === 'hidden' || this.getState === 'hiding') {
          this.callSettingFunction('onLoad');
          setState('showing');
          return this.$miniTip.stop(true, true).css('opacity', 0).show().animate(showAnimateProperties, this.getSetting('showSpeed'), this.getSetting('showEasing'), __bind(function() {
            if (this.getState() === 'showing') {
              this.$miniTip.show();
              this.callSettingFunction('onVisible');
              return setState('visible');
            }
          }, this));
        }
      };
      this.hide = function() {
        if (this.getState() === 'visible' || this.getState() === 'showing') {
          this.callSettingFunction('onHide');
          setState('hiding');
          return this.$miniTip.stop(true, true).animate(hideAnimateProperties, this.getSetting('hideSpeed'), this.getSetting('hideEasing'), __bind(function() {
            if (this.getState() === 'hiding') {
              this.$miniTip.hide();
              this.callSettingFunction('onHidden');
              return setState('hidden');
            }
          }, this));
        }
      };
      this.init = function() {
        var $miniTipArrow, $miniTipArrowShadow, arrowCss, _hover;
        this.settings = $.extend({}, this.defaults, options);
        this.$miniTipContent = $('<div />', {
          'class': 'minitip-content'
        });
        this.$miniTip = $('<div />', {
          'class': 'minitip ' + this.getSetting('className'),
          'css': {
            'opacity': 1
          }
        }).html(this.$miniTipContent).appendTo('body');
        if (this.getSetting('showArrow')) {
          $miniTipArrow = $('<span />', {
            'class': 'minitip-arrow'
          });
          $miniTipArrowShadow = $('<span />', {
            'class': 'minitip-arrow-shadow'
          });
          this.$miniTip.append($miniTipArrowShadow).append($miniTipArrow);
        }
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
        arrowCss = getArrowCss();
        $miniTipArrow.css(arrowCss['arrow']);
        $miniTipArrowShadow.css(arrowCss['shadow']);
        this.updatePosition();
        ($(window)).resize(this.updatePosition);
        showAnimateProperties = $.extend(showAnimateProperties, this.getSetting('showAnimateProperties'));
        hideAnimateProperties = $.extend(hideAnimateProperties, this.getSetting('hideAnimateProperties'));
        _hover = false;
        return this.$element.hover((__bind(function() {
          _hover = true;
          return setTimeout(__bind(function() {
            if (_hover) {
              return this.show();
            }
          }, this), this.getSetting('delay'));
        }, this)), (__bind(function() {
          _hover = false;
          return this.hide();
        }, this)));
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
