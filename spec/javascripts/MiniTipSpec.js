(function() {

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
      describe('position', function() {});
      describe('offset', function() {});
      describe('opacity', function() {});
      describe('showArrow', function() {});
      return describe('className', function() {});
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
      describe('sowSpeed', function() {});
      describe('hideSpeed', function() {});
      describe('showEasing', function() {});
      describe('showAnimateProperties', function() {});
      return describe('hideAnimateProperties', function() {});
    });
    return describe('callbacks', function() {
      describe('onLoad', function() {});
      describe('onVisible', function() {});
      describe('onHide', function() {});
      return describe('onHidden', function() {});
    });
  });

}).call(this);
