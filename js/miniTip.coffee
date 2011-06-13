#
# miniTip, the tooltip plugin for jQuery
# Instructions: Coming Soon
# By: Matthieu Aussaguel, http://www.mynameismatthieu.com
# Version: 0.1
# Updated: June 13th, 2011
#

jQuery ->
    $.minTip = (element, options) ->
        # default plugin settings
        @defaults = {
          position              : 'element'         # 'element' | 'cursor'
          offset                : {'x': 0, 'y': 0}  #
          delay                 : 200               #
          event                 : 'hover'           # 'hover' | 'click'

          contentType           : 'attribute'       # 'attribute' | 'selector'
          contentAttribute      : 'title'           # attribute name if content type 'attribute' i.e: 'data-tooltip'
          contentSelector       : ''                # selector if content type is 'selector' i.e: $(this).parent().find() where this is the elemetn

          showSpeed             : 600               # number, animation showing speed in milliseconds
          hideSpeed             : 450               # number, animation hiding speed in milliseconds

          css                   : {}                # tooltip additionnal css properties
          className             : 'miniTip'         # tooltip className
          showAnimateProperties : {}                # animate properties on show, will fadeIn by default
          hideAnimateProperties : {}                # animate properties on hde, will fadeOut by default

          onLoad                : ->                # Function, called when the notification is being loaded
          onVisible             : ->                # Function, called when the notification is loaded
          onHide                : ->                # Function, called when notification is hidding
          onHidden              : ->                # Function, called when notification is hidden
        }

        ## private variables
        # current state
        state = ''

        ## public variables
        # plugin settings
        @settings = {}

        # jQuery version of DOM elment attached to the plugin
        @$element = $ element

        ## private methods
        setState = (_state) ->
          state = _state

        ## public methods
        # get current state
        @getState = ->
          state

        # get particular plugin setting
        @getSetting = (settingKey) ->
          @settings[settingKey]

        # call one of the plugin setting functions
        @callSettingFunction = (functionName) ->
          @settings[functionName]()

        # init function
        @init = ->
            @settings = $.extend {}, @defaults, options


        # initialise the plugin
        @init()

    $.fn.minTip = (options) ->
        return this.each ->
            if undefined == ($ this).data('minTip')
                miniTip = new $.minTip this, options
                ($ this).data 'minTip', miniTip