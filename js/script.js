$(function() {
  // miniTip Example 1 - default
  $('#tooltip-example-1 .tip').miniTip();

  // miniTip Example 1 - custom attribute
  $('#tooltip-example-2 .tip').miniTip({'contentAttribute'      : 'data-tip',
                                        'className'             : 'green',
                                        'offset'                : 20,
                                        'showAnimateProperties' : {'top': '-=10'},
                                        'hideAnimateProperties' : {'top': '+=10'},
                                        'position'              : 'bottom',
                                        'onLoad'                : function(element, minitip) {
                                            $(element).animate({'color':'#3C3C3C', 'opacity': 0.35}, '350');

                                        },
                                        'onHide'                : function(element, minitip) {
                                            $(element).animate({'opacity': 1}, '250');
                                        }
  });

  // miniTip Example 1 - custom selector
  $('#tooltip-example-3 .tip').miniTip({'event'             : 'click',
                                        'delay'             : '3000',
                                        'contentType'       : 'selector',
                                        'contentSelector'   : '.tip-content',
                                        'position'          : 'left',
                                        'className'         : 'yellow'});
});