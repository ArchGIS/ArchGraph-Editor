"use strict";

$(function() {
  $("#zoom-in").on("click", App.graph.zoomIn);
  $("#zoom-out").on("click", App.graph.zoomOut);

  var $layoutSelector = $("#graph-layout-selector");
  var $applyLayout = $("#apply-graph-layout");

  $applyLayout.on("click", function() {
    App.graph.setLayout($layoutSelector.find(":selected").val());    
  });
});