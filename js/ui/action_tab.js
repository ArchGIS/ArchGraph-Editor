"use strict";

$(function() {
  var $tab = $("#action-tab");
  var t = App.locale.translate;
  var g = App.graph;

  var $commonButtons = [
    App.make.redButton(t("button.delete"), App.graph.deleteSelected)
  ];
  
  var actionMapping = {
    "addResearch": () => g.addToSelected(App.node.Research),
    "addAuthor": () => g.addToSelected(App.node.Author),
    "addExcavations": () => g.addToSelected(App.node.Excavations)
  };
  
  function loadNode(node) {
    var $buttons = _.map(
      node.actions,
      action => App.make.blueButton(
        t(`button.${action}`),
        actionMapping[action]
      )
    );
    
    $tab.html($buttons.concat($commonButtons));
  }

  function reset() {
    _.invoke($commonButtons, "detach");
    $tab.empty();
  }

  App.actionTab = {
    "loadNode": loadNode,
    "reset": reset
  };
});
