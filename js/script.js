$(function() {
  // miniTip Example 1 - default
  $('#tooltip-example-1 .tip').miniTip();

  // miniTip Example 1 - custom attribute
  $('#tooltip-example-2 .tip').miniTip({'contentAttribute'      : 'data-tip',
                                        'className'             : 'green',
                                        'offset'                : 15,
                                        'showAnimateProperties' : {'top': '-=5'},
                                        'hideAnimateProperties' : {'top': '+=5'},
                                        'position'              : 'bottom'});

  // miniTip Example 1 - custom selector
  $('#tooltip-example-3 .tip').miniTip({'contentType'       : 'selector',
                                        'contentSelector'   : '.tip-content',
                                        'position'          : 'left',
                                        'className'         : 'yellow'});
});