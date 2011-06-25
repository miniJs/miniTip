#
# miniTip, the tooltip plugin for jQuery
# Instructions: Coming Soon
# By: Matthieu Aussaguel, http://www.mynameismatthieu.com
# Version: 0.1
# Updated: June 13th, 2011
#

jQuery ->
    $.miniTip = (element, options) ->
        # default plugin settings
        @defaults = {
          position              : 'bottom'          # 'bottom' | 'top' | 'left' | 'right'
          margin                : 5                 # margin to the element
          delay                 : 200               # delay time before the tooltip appears

          contentType           : 'attribute'       # 'attribute' | 'selector'
          contentAttribute      : 'title'           # attribute name if content type 'attribute' i.e: 'data-tooltip'
          contentSelector       : ''                # selector if content type is 'selector' i.e: '.mini-tip'

          showSpeed             : 400               # number, animation showing speed in milliseconds
          hideSpeed             : 250               # number, animation hiding speed in milliseconds
          showEasing            : ''                # easing equation on show
          hideEasing            : ''                # easing equation on hide

          css                   : {}                # tooltip additional css properties
          className             : 'minitip'         # generated tooltip className
          contentClassName      : 'minitip-content' # generated tooltip content className
          showAnimateProperties : {}                # animate properties on show, will fadeIn by default
          hideAnimateProperties : {}                # animate properties on hde, will fadeOut by default

          onLoad                : ->                # Function, called when the notification is being loaded
          onVisible             : ->                # Function, called when the notification is loaded
          onHide                : ->                # Function, called when notification is hiding
          onHidden              : ->                # Function, called when notification is hidden
        }

        ## private variables
        # current state
        state = 'hidden'

        # tooltip title
        content = ''

        ## public variables
        # plugin settings
        @settings = {}

        # jQuery version of DOM element attached to the plugin
        @$element = $ element

        
        ## private methods
        # set the current state
        setState = (_state) ->
          state = _state

        ## public methods
        # get current state
        @getState = ->
          state

        # get tooltip content
        @getContent = ->
          content

        # set tooltip content
        @setContent = (_content) ->
            content = _content

        # update tooltip content
        @updateMiniTipContent = (content) ->
            @$miniTipContent.html(content)

        # get tooltip coordinates
        @getPosition = ->
            #element position
            position = @getSetting 'position'

            # element offset
            coordinates = @$element.offset()

            # calculate the tooltip position
            switch position
                when "top"
                    coordinates['top'] = coordinates.top - @$miniTip.outerHeight() - @getSetting('margin')
                when "left"
                    coordinates['left'] = coordinates.left - @$miniTip.outerWidth() - @getSetting('margin')
                when "right"
                    coordinates['left'] = coordinates.left  + @$element.outerWidth() + @getSetting('margin')
                else
                    coordinates['top'] = coordinates.top + @$element.outerHeight() + @getSetting('margin')

            # returns the calculated coordinates
            coordinates

        # update miniTip position
        @updatePosition = =>
            @$miniTip.css(@getPosition())

        # get particular plugin setting
        @getSetting = (settingKey) ->
          @settings[settingKey]

        # call one of the plugin setting functions
        @callSettingFunction = (functionName) ->
          @settings[functionName]()

        # show miniTip
        @show = ->
          if @getState() is 'hidden' or @getState is 'hiding'
            setState 'showing'
            @$miniTip.stop(true, true)
                     .css('opacity', 0)
                     .show()
                     .animate({'opacity': 1}, @getSetting('showSpeed'), @getSetting('showEasing'), =>
                if @getState() is 'showing'
                    @$miniTip.show()
                    setState 'visible'
            )


        # show miniTip
        @hide = ->
          if @getState() is'visible' or @getState() is 'showing'
            setState 'hiding'
            @$miniTip.stop(true, true).animate({'opacity': 0}, @getSetting('hideSpeed'), @getSetting('hideEasing'), =>
                if @getState() is 'hiding'
                    @$miniTip.hide()
                    setState 'hidden'
            )

        # init function
        @init = ->
            # merge options and default settings
            @settings = $.extend {}, @defaults, options

            # merge css properties
            miniTipCss = $.extend {}, {'opacity' : 1}, @getSetting('css')

            # generate the miniTip HTML and append to the body
            @$miniTipContent =  $('<div />', {'class': @getSetting('contentClassName')})
            @$miniTip = $('<div />', {'class' : @getSetting('className'), 'css' : miniTipCss}).html(@$miniTipContent)
                                                                                              .appendTo('body')

            # set the tooltip content
            if @getSetting('contentType') is 'selector'
                # the content type is selector
                @setContent @$element.find(@getSetting 'contentSelector' ).html()
            else
                # the content type is attribute
                @setContent @$element.attr @getSetting 'contentAttribute'
                # empty the element title
                @$element.attr @getSetting('contentAttribute'), ''

            # if the content is empty, we stop processing else we populate the miniTip
            if not @getContent()? then return false else @updateMiniTipContent @getContent()

            # update the position
            @updatePosition()

            ($ window).resize(@updatePosition)

            # attach the mouseenter and mouseleave events to the element
            @$element.hover((=>@show()), (=> @hide()))
#            @$element.bind('mouseenter', => @show())
#                     .bind('mouseleave', => @hide())

        # initialise the plugin
        @init()

    $.fn.miniTip = (options) ->
        return this.each ->
            if undefined == ($ this).data('minTip')
                miniTip = new $.miniTip this, options
                ($ this).data 'minTip', miniTip