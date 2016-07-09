"use strict";

$(function() {
  var Author = App.node.Author;
  var Research = App.node.Research;

  $("#top-panel").tabs();  

  $("#zoom-in").on("click", App.graph.zoomIn);
  $("#zoom-out").on("click", App.graph.zoomOut);

  App.hotkey.bind(KeyEvent.DOM_VK_DELETE, App.graph.deleteSelected);

  App.graph.init([
    new Research("research")
  ]);
  
  App.graph.on("remove", "node", function() {
    App.actionTab.reset();
    App.dataTab.reset();
  });
  
  App.graph.on("unselect", "node", function(event) {
    var selected = event.cyTarget.data();
    App.dataTab.updateNode(selected);
    console.log(selected.props);

    App.actionTab.reset();
    App.dataTab.reset();
  });

  App.graph.on("select", "node", function(event) {
    var selected = event.cyTarget.data();
    
    App.actionTab.loadNode(selected);
    App.dataTab.loadNode(selected);
  });
});
