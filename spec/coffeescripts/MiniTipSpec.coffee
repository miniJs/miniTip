describe 'miniTip', ->
  options =
    position: 'top'

  beforeEach ->
    loadFixtures 'fragment.html'
    @$element = $('.tip')

  it 'should be available on the jQuery object', ->
    expect($.fn.miniTip).toBeDefined()

  it 'should be chainable', ->
    expect(@$element.miniTip(options)).toBe(@$element)

  it 'should offers default values', ->
    plugin = new $.miniTip(@$element[0], options)

    expect(plugin.defaults).toBeDefined()

  it 'should overwrites the settings', ->
    plugin = new $.miniTip(@$element[0], options)

    expect(plugin.settings.position).toBe(options.position)