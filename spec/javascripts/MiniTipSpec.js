
describe('miniTip', function() {
  var fixtureOne, fixtureThree, fixtureTwo, options;
  options = {
    position: 'bottom',
    event: 'click'
  };
  fixtureOne = '<div class="tip" title="hello world">\
                  some text here\
                </div>';
  fixtureTwo = '<div class="tip" data-tip="bonjour le monde">\
                  some text here\
                </div>';
  fixtureThree = '<div class="tip">\
                    some text\
                    <span class="tip-content">\
                      hola el mundo\
                    </span>\
                  </div>';
  beforeEach(function() {
    return this.clock = sinon.useFakeTimers();
  });
  describe('plugin', function() {
    beforeEach(function() {
      setFixtures(fixtureOne);
      return this.$element = $('.tip');
    });
    it('should be available on the jQuery object', function() {
      return expect($.fn.miniTip).toBeDefined();
    });
    it('should be chainable', function() {
      return expect(this.$element.miniTip(options)).toBe(this.$element);
    });
    it('should offers default values', function() {
      var plugin;
      plugin = new $.miniTip(this.$element[0], options);
      return expect(plugin.defaults).toBeDefined();
    });
    return it('should overwrites the settings', function() {
      var plugin;
      plugin = new $.miniTip(this.$element[0], options);
      expect(plugin.settings.position).toBe(options.position);
      return expect(plugin.settings.event).toBe(options.event);
    });
  });
  describe('style', function() {
    beforeEach(function() {
      setFixtures(fixtureOne);
      return this.$element = $('.tip');
    });
    describe('position', function() {
      it("should position the tooltip at the top of the cursor by default", function() {
        var plugin;
        plugin = new $.miniTip(this.$element, {
          offset: 0
        });
        this.$element.trigger('mouseenter');
        return expect(plugin.getPosition().top).toBeLessThan(this.$element.offset().top);
      });
      it("should position the tooltip at the left of the cursor", function() {
        var plugin;
        plugin = new $.miniTip(this.$element, {
          position: 'left',
          offset: 0
        });
        this.$element.trigger('mouseenter');
        return expect(plugin.getPosition().left).toBeLessThan(this.$element.offset().left);
      });
      it("should position the tooltip at the right of the cursor", function() {
        var plugin;
        plugin = new $.miniTip(this.$element, {
          position: 'right',
          offset: 0
        });
        this.$element.trigger('mouseenter');
        return expect(plugin.getPosition().left).toBeGreaterThan(this.$element.offset().left);
      });
      return it("should position the tooltip at the bottom of the cursor", function() {
        var plugin;
        plugin = new $.miniTip(this.$element, {
          position: 'bottom',
          offset: 0
        });
        this.$element.trigger('mouseenter');
        return expect(plugin.getPosition().top).toBeGreaterThan(this.$element.offset().top);
      });
    });
    describe('offset', function() {
      it("should add an offset of 10 pixels by default", function() {
        var plugin;
        plugin = new $.miniTip(this.$element);
        plugin.$miniTip.height(100);
        this.$element.trigger('mouseenter');
        return expect(plugin.getPosition().top).toBe(this.$element.offset().top - 100 - 10);
      });
      return it("should add a custom offset", function() {
        var plugin;
        plugin = new $.miniTip(this.$element, {
          offset: 100
        });
        plugin.$miniTip.height(100);
        this.$element.trigger('mouseenter');
        return expect(plugin.getPosition().top).toBe(this.$element.offset().top - 100 - 100);
      });
    });
    describe('showArrow', function() {
      it("should add an arrow to the tooltip by default", function() {
        var plugin;
        plugin = new $.miniTip(this.$element);
        return expect(plugin.$miniTip.find('.minitip-arrow').first()).toExist();
      });
      return it("should not add an arrow to the tooltip when false", function() {
        var plugin;
        plugin = new $.miniTip(this.$element, {
          showArrow: false
        });
        return expect(plugin.$miniTip.find('.minitip-arrow')).not.toExist();
      });
    });
    return describe('className', function() {
      return it('should not add class to the minitip apart from minitip by default', function() {
        var plugin;
        plugin = new $.miniTip(this.$element);
        expect(plugin.$miniTip[0].classList[0]).toBe('minitip');
        return expect(plugin.$miniTip[0].classList.length).toBe(1);
      });
    });
  });
  describe('event', function() {
    beforeEach(function() {
      setFixtures(fixtureOne);
      return this.$element = $('.tip');
    });
    describe('event', function() {
      it('should show the tooltip on hover', function() {
        var plugin;
        plugin = new $.miniTip(this.$element);
        spyOn(plugin, 'show');
        this.$element.trigger('mouseenter');
        this.clock.tick(200);
        return expect(plugin.show).toHaveBeenCalled();
      });
      return it('should show the tooltip on click', function() {
        var plugin;
        plugin = new $.miniTip(this.$element, {
          event: 'click'
        });
        spyOn(plugin, 'show');
        this.$element.trigger('click');
        return expect(plugin.show).toHaveBeenCalled();
      });
    });
    return describe('delay', function() {
      it("should add 200 milliseconds delay by default", function() {
        var plugin;
        plugin = new $.miniTip(this.$element);
        spyOn(window, 'setTimeout');
        this.$element.trigger('mouseenter');
        return expect(window.setTimeout).toHaveBeenCalledWith(jasmine.any(Function), 200);
      });
      return it("shouldn't add any delay if 0", function() {
        var plugin;
        plugin = new $.miniTip(this.$element, {
          delay: 0
        });
        spyOn(window, 'setTimeout');
        this.$element.trigger('mouseenter');
        return expect(window.setTimeout).toHaveBeenCalledWith(jasmine.any(Function), 0);
      });
    });
  });
  describe('content', function() {
    it('should populate the tooltip with the title attribute content', function() {
      var plugin;
      setFixtures(fixtureOne);
      plugin = new $.miniTip($('.tip'));
      return expect(plugin.$miniTipContent.text()).toBe('hello world');
    });
    it('should populate the tooltip with the attribute content specified', function() {
      var plugin;
      setFixtures(fixtureTwo);
      plugin = new $.miniTip($('.tip'), {
        contentAttribute: 'data-tip'
      });
      return expect(plugin.$miniTipContent.text()).toBe('bonjour le monde');
    });
    return it('should populate the tooltip with content of the selector specified', function() {
      var plugin;
      setFixtures(fixtureThree);
      plugin = new $.miniTip($('.tip'), {
        contentType: 'selector',
        contentSelector: '.tip-content'
      });
      return expect(plugin.$miniTipContent.text()).toBe('hola el mundo');
    });
  });
  describe('animation', function() {
    beforeEach(function() {
      setFixtures(fixtureOne);
      return this.$element = $('.tip');
    });
    describe('sowSpeed', function() {
      it('should animate the tooltip for 350 milliseconds by default on show', function() {
        var plugin;
        plugin = new $.miniTip(this.$element);
        spyOn(plugin.$miniTip, 'animate');
        plugin.show();
        return expect(plugin.$miniTip.animate).toHaveBeenCalledWith(jasmine.any(Object), 350, jasmine.any(String), jasmine.any(Function));
      });
      return it('should animate the tooltip for a custom time on show', function() {
        var plugin;
        plugin = new $.miniTip(this.$element, {
          showSpeed: 1000
        });
        spyOn(plugin.$miniTip, 'animate');
        plugin.show();
        return expect(plugin.$miniTip.animate).toHaveBeenCalledWith(jasmine.any(Object), 1000, jasmine.any(String), jasmine.any(Function));
      });
    });
    describe('hideSpeed', function() {
      it('should animate the tooltip for 250 milliseconds by default on show', function() {
        var plugin;
        plugin = new $.miniTip(this.$element);
        spyOn(plugin.$miniTip, 'animate');
        plugin.state = 'visible';
        plugin.hide();
        return expect(plugin.$miniTip.animate).toHaveBeenCalledWith(jasmine.any(Object), 250, jasmine.any(String), jasmine.any(Function));
      });
      return it('should animate the tooltip for a custom time on hide', function() {
        var plugin;
        plugin = new $.miniTip(this.$element, {
          hideSpeed: 1000
        });
        spyOn(plugin.$miniTip, 'animate');
        plugin.state = 'visible';
        plugin.hide();
        return expect(plugin.$miniTip.animate).toHaveBeenCalledWith(jasmine.any(Object), 1000, jasmine.any(String), jasmine.any(Function));
      });
    });
    describe('showEasing', function() {
      it('should animate the tooltip with no easing by default on show', function() {
        var plugin;
        plugin = new $.miniTip(this.$element);
        spyOn(plugin.$miniTip, 'animate');
        plugin.show();
        return expect(plugin.$miniTip.animate).toHaveBeenCalledWith(jasmine.any(Object), jasmine.any(Number), '', jasmine.any(Function));
      });
      return it('should animate the tooltip with a custom easing on show', function() {
        var plugin;
        plugin = new $.miniTip(this.$element, {
          showEasing: 'swing'
        });
        spyOn(plugin.$miniTip, 'animate');
        plugin.show();
        return expect(plugin.$miniTip.animate).toHaveBeenCalledWith(jasmine.any(Object), jasmine.any(Number), 'swing', jasmine.any(Function));
      });
    });
    describe('hideEasing', function() {
      it('should animate the tooltip with no easing by default on hide', function() {
        var plugin;
        plugin = new $.miniTip(this.$element);
        spyOn(plugin.$miniTip, 'animate');
        plugin.show();
        return expect(plugin.$miniTip.animate).toHaveBeenCalledWith(jasmine.any(Object), jasmine.any(Number), '', jasmine.any(Function));
      });
      return it('should animate the tooltip with a custom easing on hide', function() {
        var plugin;
        plugin = new $.miniTip(this.$element, {
          hideEasing: 'swing'
        });
        spyOn(plugin.$miniTip, 'animate');
        plugin.state = 'visible';
        plugin.hide();
        return expect(plugin.$miniTip.animate).toHaveBeenCalledWith(jasmine.any(Object), jasmine.any(Number), 'swing', jasmine.any(Function));
      });
    });
    describe('showAnimateProperties', function() {
      beforeEach(function() {
        return this.defaultProperties = {
          opacity: 1
        };
      });
      it('should animate tooltip with no custom properties by default on show', function() {
        var plugin;
        plugin = new $.miniTip(this.$element);
        spyOn(plugin.$miniTip, 'animate');
        plugin.show();
        return expect(plugin.$miniTip.animate).toHaveBeenCalledWith(this.defaultProperties, jasmine.any(Number), jasmine.any(String), jasmine.any(Function));
      });
      return it('should animate tooltip with custom properties on show', function() {
        var plugin;
        plugin = new $.miniTip(this.$element, {
          showAnimateProperties: {
            color: 'red'
          }
        });
        spyOn(plugin.$miniTip, 'animate');
        plugin.show();
        return expect(plugin.$miniTip.animate).toHaveBeenCalledWith($.extend(this.defaultProperties, {
          color: 'red'
        }), jasmine.any(Number), jasmine.any(String), jasmine.any(Function));
      });
    });
    return describe('hideAnimateProperties', function() {
      beforeEach(function() {
        return this.defaultProperties = {
          opacity: 0
        };
      });
      it('should animate tooltip with no custom properties by default on hide', function() {
        var plugin;
        plugin = new $.miniTip(this.$element);
        spyOn(plugin.$miniTip, 'animate');
        plugin.state = 'visible';
        plugin.hide();
        return expect(plugin.$miniTip.animate).toHaveBeenCalledWith(this.defaultProperties, jasmine.any(Number), jasmine.any(String), jasmine.any(Function));
      });
      return it('should animate tooltip with custom properties on hide', function() {
        var plugin;
        plugin = new $.miniTip(this.$element, {
          hideAnimateProperties: {
            color: 'yellow'
          }
        });
        spyOn(plugin.$miniTip, 'animate');
        plugin.state = 'visible';
        plugin.hide();
        return expect(plugin.$miniTip.animate).toHaveBeenCalledWith($.extend(this.defaultProperties, {
          color: 'yellow'
        }), jasmine.any(Number), jasmine.any(String), jasmine.any(Function));
      });
    });
  });
  return describe('callbacks', function() {
    beforeEach(function() {
      setFixtures(fixtureOne);
      this.$element = $('.tip');
      return this.foo = jasmine.createSpy('foo');
    });
    describe('onLoad', function() {
      return it('should call onLoad when showing the tooltip', function() {
        var plugin;
        plugin = new $.miniTip(this.$element, {
          onLoad: this.foo
        });
        expect(this.foo).not.toHaveBeenCalled();
        plugin.show();
        expect(this.foo).toHaveBeenCalled();
        return expect(plugin.state).toBe('showing');
      });
    });
    describe('onVisible', function() {
      return it('should call onLoad when tooltip is visible', function() {
        var plugin;
        plugin = new $.miniTip(this.$element, {
          onVisible: this.foo,
          showSpeed: 0
        });
        expect(this.foo).not.toHaveBeenCalled();
        plugin.show();
        expect(plugin.state).toBe('visible');
        return expect(this.foo).toHaveBeenCalled();
      });
    });
    describe('onHide', function() {
      return it('should call onHide when hiding the tooltip', function() {
        var plugin;
        plugin = new $.miniTip(this.$element, {
          onHide: this.foo
        });
        expect(this.foo).not.toHaveBeenCalled();
        plugin.state = 'visible';
        plugin.hide();
        expect(this.foo).toHaveBeenCalled();
        return expect(plugin.state).toBe('hiding');
      });
    });
    return describe('onHidden', function() {
      return it('should call onHidden when tooltip is hidden', function() {
        var plugin;
        plugin = new $.miniTip(this.$element, {
          onHidden: this.foo,
          hideSpeed: 0
        });
        expect(this.foo).not.toHaveBeenCalled();
        plugin.state = 'visible';
        plugin.hide();
        expect(plugin.state).toBe('hidden');
        return expect(this.foo).toHaveBeenCalled();
      });
    });
  });
});
