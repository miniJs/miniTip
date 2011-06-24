$(function() {
  // miniTip Example 1 - default
  $('#tooltip-example-1 .tip').miniTip();

  // miniTip Example 1 - custom attribute
  $('#tooltip-example-2 .tip').miniTip({'contentAttribute': 'data-tip', 'position': 'top'});

  // miniTip Example 1 - custom selector
  $('#tooltip-example-3 .tip').miniTip({'contentType': 'selector', 'contentSelector' : '.tip-content', 'position': 'left'});
});