$(function() {
  // miniTip example 1 - default
  $('#example-1 .tip').miniTip();

  // miniTip 2 - custom attribute
  $('#example-2 .tip').miniTip({'contentAttribute'      : 'data-tip',
                                        'className'             : 'green',
                                        'offset'                : 20,
                                        'showAnimateProperties' : {'top': '-=10'},
                                        'hideAnimateProperties' : {'top': '+=10'},
                                        'position'              : 'bottom',
                                        'onLoad'                : function(element, minitip) {
                                            $(element).animate({'opacity': 0.35}, '350');

                                        },
                                        'onHide'                : function(element, minitip) {
                                            $(element).animate({'opacity': 1}, '250');

                                        }
  });

  // miniTip example 3 - custom selector
  $('#example-3 .tip').miniTip({'event'             : 'click',
                                        'delay'             : '3000',
                                        'contentType'       : 'selector',
                                        'contentSelector'   : '.tip-content',
                                        'position'          : 'left',
                                        'className'         : 'yellow'});
});