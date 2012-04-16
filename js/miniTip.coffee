#
# miniTip, the tooltip plugin for jQuery
# Instructions: http://minijs.com/plugins/6/tip
# By: Matthieu Aussaguel, http://www.mynameismatthieu.com, @mattaussaguel
# Version: 0.1 Beta
# Updated: April 16, 2012
# More info: http://minijs.com/
#

jQuery ->
    $.miniTip = (element, options) ->
        # default plugin settings
        @defaults = {
          position:              'top'             # 'bottom' | 'top' | 'left' | 'right'
          event:                 'hover'           # 'hover' | 'click'
          offset:                10                # margin to the element
          opacity:               0.95              # tooltip opacity
          delay:                 200               # time before the tooltip appears on hover event - how long it stays visible for on click event.
          showArrow:             true              # show arrow
          
          contentType:           'attribute'       # 'attribute' | 'selector'
          contentAttribute:      'title'           # attribute name if content type 'attribute' i.e: 'data-miniTip'
          contentSelector:       ''                # selector if content type is 'selector' i.e: '.mini-tip'

          showSpeed:             350               # number, animation showing speed in milliseconds
          hideSpeed:             250               # number, animation hiding speed in milliseconds
          showEasing:            ''                # easing equation on show, must load http:#gsgd.co.uk/sandbox/jquery/easing/
          hideEasing:            ''                # easing equation on hide, must load http:#gsgd.co.uk/sandbox/jquery/easing/

          className:              ''                # miniTip className - useful for to apply themes
          showAnimateProperties:  {}                # animate properties on show, will fadeIn by default
          hideAnimateProperties:  {}                # animate properties on hde, will fadeOut by default

          onLoad:                 ->                # Function(element, minitip), called when the miniTip is being loaded,
          onVisible:              ->                # Function(element, minitip), called when the miniTip is loaded
          onHide:                 ->                # Function(element, minitip), called when miniTip is hiding
          onHidden:               ->                # Function(element, minitip), called when miniTip is hidden
        }

        ## private variables
        # current state
        state = 'hidden'

        # miniTip title
        content = ''

        # miniTip default css
        miniTipCss = {
            'display':  'none'
            'position': 'absolute'
            'top':      0
            'left':     0
            'z-index':  99999
            'opacity':  1
        }

        # show animate properties
        showAnimateProperties = { 'opacity': 1 }

        # hide animate properties
        hideAnimateProperties = { 'opacity': 0 }

        ## public variables
        # plugin settings
        @settings = {}

        # jQuery version of DOM element attached to the plugin
        @$element = $ element
        
        ## private methods
        # set the current state
        setState = (_state) ->
          state = _state

        # get the arrow Css
        getArrowCss = =>
          arrowCss = {}
          arrowCss['arrow'] = { 'position': 'absolute', 'height' : 0, 'width'  : 0, 'border' : '6px solid transparent' }
          
          #element position
          position = @getSetting 'position'

          # init the css properties objects for manipulation
          _arrowCss = _shadowCss = {}
          _shadowBorderColor = @$miniTipContent.css('border-color')
          _borderColor = @$miniTipContent.css('background-color')

          # calulate the css properties depending on the position
          switch position
            when "left"
                _arrowCss = { 'right' : '-11px', 'top'   : '7px', 'border-left-color' : _borderColor }
                _shadowCss = { 'right' : '-14px', 'border-left-color' : _shadowBorderColor, 'top': '6px' }
            when "right"
                _arrowCss = { 'left' : '-11px', 'top'   : '7px', 'border-right-color' : _borderColor }
                _shadowCss = { 'left' : '-14px', 'border-right-color' : _shadowBorderColor, 'top': '6px' }
            when "bottom"
                _left = if (@$miniTip.outerWidth() < @$element.outerWidth()) then Math.floor(@$miniTip.outerWidth() / 5) else Math.floor(@$element.outerWidth() / 5)
                _arrowCss = { 'top' : '-11px', 'left'   : _left + 'px', 'border-bottom-color' : _borderColor }
                _shadowCss = { 'top' : '-14px', 'border-bottom-color' : _shadowBorderColor, 'left': (_left - 1) + 'px' }
            else
                _left = if (@$miniTip.outerWidth() < @$element.outerWidth()) then Math.floor(@$miniTip.outerWidth() / 5) else Math.floor(@$element.outerWidth() / 5)
                _arrowCss = { 'bottom' : '-11px', 'left'   : _left + 'px', 'border-top-color' : _borderColor }
                _shadowCss = { 'bottom' : '-14px', 'border-top-color' : _shadowBorderColor, 'left': (_left - 1) + 'px' }

          # merge ojects
          arrowCss['arrow']  = $.extend {}, arrowCss['arrow'], _arrowCss
          arrowCss['shadow'] = $.extend {}, arrowCss['arrow'], {'border-width':'7px', 'opacity': '0.20'}, _shadowCss
          arrowCss


        ## public methods
        # get particular plugin setting
        @getSetting = (settingKey) ->
          @settings[settingKey]

        # call one of the plugin setting functions
        @callSettingFunction = (functionName) ->
          @settings[functionName](element, @$miniTip[0])

        # get current state
        @getState = ->
          state

        # get miniTip content
        @getContent = ->
          content

        # set miniTip content
        @setContent = (_content) ->
            content = _content

        # update miniTip content
        @updateMiniTipContent = (content) ->
            @$miniTipContent.html($.trim(content))

        # get miniTip coordinates
        @getPosition = ->
            #element position
            position = @getSetting 'position'

            # element offset
            coordinates = @$element.offset()

            # calculate the miniTip position
            switch position
                when "bottom"
                    coordinates['top'] = coordinates.top + @$element.outerHeight() + @getSetting('offset')
                when "left"
                    coordinates['left'] = coordinates.left - @$miniTip.outerWidth() - @getSetting('offset')
                    coordinates['top'] -= 5
                when "right"
                    coordinates['left'] = coordinates.left  + @$element.outerWidth() + @getSetting('offset')
                    coordinates['top'] -= 5
                else
                    coordinates['top'] = coordinates.top - @$miniTip.outerHeight() - @getSetting('offset')

            # returns the calculated coordinates
            coordinates

        # update miniTip position
        @updatePosition = =>
            @$miniTip.css(@getPosition())

        # show miniTip
        @show = ->
          if @getState() is 'hidden' or @getState is 'hiding'
            @callSettingFunction 'onLoad'
            setState 'showing'
            @$miniTip.stop(true, true)
                     .css('opacity', 0)
                     .show()
                     .animate(showAnimateProperties, @getSetting('showSpeed'), @getSetting('showEasing'), =>
                if @getState() is 'showing'
                    @$miniTip.show()
                    @callSettingFunction 'onVisible'
                    setState 'visible'
            )


        # show miniTip
        @hide = ->
          if @getState() is'visible' or @getState() is 'showing'
            @callSettingFunction 'onHide'
            setState 'hiding'
            @$miniTip.stop(true, true)
                     .animate(hideAnimateProperties, @getSetting('hideSpeed'), @getSetting('hideEasing'), =>
                if @getState() is 'hiding'
                    @$miniTip.hide()
                    @callSettingFunction 'onHidden'
                    setState 'hidden'
            )

        # init function
        @init = ->
            # merge options and default settings
            @settings = $.extend {}, @defaults, options

            # generate the miniTip HTML and append to the body
            @$miniTipContent =  $('<div />', {'class': 'minitip-content'})
            @$miniTip = $('<div />', {'class' : 'minitip ' + @getSetting('className'), 'css' : miniTipCss}).html(@$miniTipContent)
                                                                                                                .appendTo('body')
            # add arrow to the tooltip
            if @getSetting 'showArrow'
               $miniTipArrow = $('<span />', {'class': 'minitip-arrow'})
               $miniTipArrowShadow = $('<span />', {'class': 'minitip-arrow-shadow'})
               @$miniTip.append($miniTipArrowShadow)
                        .append($miniTipArrow)

            # set the miniTip content
            if @getSetting('contentType') is 'selector'
                # the content type is selector
                @setContent @$element.find(@getSetting 'contentSelector' ).html()
            else
                # the content type is attribute
                @setContent @$element.attr @getSetting 'contentAttribute'
                # empty the element title
                @$element.attr @getSetting('contentAttribute'), ''

            # if the content is empty, we stop processing else we populate the miniTip
            if not @getContent()? then return this false else @updateMiniTipContent @getContent()

            # update the arrow css
            if $miniTipArrow?
              arrowCss = getArrowCss()
              $miniTipArrow.css(arrowCss['arrow'])
              $miniTipArrowShadow.css(arrowCss['shadow'])

            # update the position
            @updatePosition()

            # update the miniTip position when window gets re sized
            ($ window).resize @updatePosition

            # set animate properties
            showAnimateProperties = $.extend showAnimateProperties, @getSetting('showAnimateProperties')
            hideAnimateProperties = $.extend hideAnimateProperties, @getSetting('hideAnimateProperties')
            
            if @getSetting('event') is 'hover'
                # on hover
                # keep track of the hover state
                _hover = false

                # attach the hover events to the element
                @$element.hover((=>
                    _hover = true

                    setTimeout(=>
                        @show() if _hover
                    , @getSetting 'delay')
                ), (=>
                    _hover = false
                    @hide()
                ))
            else
                # on click
                @$element.bind('click', =>
                    @show()
                    setTimeout(=>
                        @hide()
                    , @getSetting 'delay')
                )
        # end init function

        # initialise the plugin
        @init()

    $.fn.miniTip = (options) ->
        return this.each ->
            if undefined == ($ this).data('minTip')
                miniTip = new $.miniTip this, options
                ($ this).data 'minTip', miniTip