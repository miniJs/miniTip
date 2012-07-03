describe 'miniTip', ->
  options =
    position: 'bottom'
    event: 'click'

  fixtureOne = '<div class="tip" title="hello world">
                  some text here
                </div>'

  fixtureTwo = '<div class="tip" data-tip="bonjour le monde">
                  some text here
                </div>'

  fixtureThree = '<div class="tip">
                    some text
                    <span class="tip-content">
                      hola el mundo
                    </span>
                  </div>' 

  beforeEach ->
    @clock = sinon.useFakeTimers()

  describe 'plugin', ->
    beforeEach ->
      setFixtures fixtureOne
      @$element = $('.tip')

    it 'should be available on the jQuery object', ->
      expect($.fn.miniTip).toBeDefined()

    it 'should be chainable', ->
      expect( @$element.miniTip( options ) ).toBe( @$element )

    it 'should offers default values', ->
      plugin = new $.miniTip( @$element[0], options )

      expect( plugin.defaults ).toBeDefined()

    it 'should overwrites the settings', ->
      plugin = new $.miniTip( @$element[0], options )

      expect( plugin.settings.position ).toBe( options.position )
      expect( plugin.settings.event ).toBe( options.event )

  describe 'style', ->
    describe 'position', ->
    describe 'offset', ->
    describe 'opacity', ->
    describe 'showArrow', ->
    describe 'className', ->

  describe 'event', ->
    beforeEach ->
      setFixtures fixtureOne
      @$element = $('.tip')

    describe 'event', ->
      it 'should show the tooltip on hover', ->
        plugin = new $.miniTip( @$element )
        spyOn(plugin, 'show')
        @$element.trigger('mouseenter')
        @clock.tick(200)

        expect(plugin.show).toHaveBeenCalled()


      it 'should show the tooltip on click', ->
        plugin = new $.miniTip( @$element, { event: 'click' } )
        spyOn( plugin, 'show' )
        @$element.trigger( 'click' )

        expect(plugin.show).toHaveBeenCalled()


    describe 'delay', ->
      it "should add 200 milliseconds delay by default", ->
        plugin   = new $.miniTip( @$element )
        spyOn( window, 'setTimeout' )
        @$element.trigger( 'mouseenter' )

        expect(window.setTimeout).toHaveBeenCalledWith(jasmine.any(Function), 200)

      it "shouldn't add any delay if 0", ->
        plugin   = new $.miniTip( @$element, { delay: 0 } )
        spyOn( window, 'setTimeout' )
        @$element.trigger( 'mouseenter' )

        expect(window.setTimeout).toHaveBeenCalledWith(jasmine.any(Function), 0)


  describe 'content', ->
    it 'should populate the tooltip with the title attribute content', ->
      setFixtures fixtureOne
      plugin = new $.miniTip( $('.tip') )

      expect( plugin.$miniTipContent.text() ).toBe 'hello world' 

    it 'should populate the tooltip with the attribute content specified', ->
      setFixtures fixtureTwo
      plugin = new $.miniTip( $('.tip'), { contentAttribute: 'data-tip' } )

      expect( plugin.$miniTipContent.text() ).toBe 'bonjour le monde'

    it 'should populate the tooltip with content of the selector specified', ->
      setFixtures fixtureThree
      plugin = new $.miniTip( $('.tip'), { contentType: 'selector', contentSelector: '.tip-content' } )

      expect( plugin.$miniTipContent.text() ).toBe 'hola el mundo'


  describe 'animation', ->
    describe 'sowSpeed', ->
    describe 'hideSpeed', ->
    describe 'showEasing', ->
    describe 'showAnimateProperties', ->
    describe 'hideAnimateProperties', ->

  describe 'callbacks', ->
    describe 'onLoad', ->
    describe 'onVisible', ->
    describe 'onHide', ->
    describe 'onHidden', ->