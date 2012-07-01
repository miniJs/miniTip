(function() {

  describe('miniTip', function() {
    var options;
    options = {
      position: 'top'
    };
    beforeEach(function() {
      loadFixtures('fragment.html');
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
      return expect(plugin.settings.position).toBe(options.position);
    });
  });

}).call(this);
