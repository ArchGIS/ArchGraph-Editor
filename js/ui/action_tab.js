"use strict";

$(function() {
  var $tab = $("#action-tab");
  var t = App.locale.translate;

  var commonButtons = [
    App.make.redButton(t("button.delete"), App.graph.deleteSelected)
  ];
  
  function loadNode(node) {
    var addButtons = _.map(
      node.actions.add,
      action => App.make.blueButton(
        t(`${action}.insert`),
        () => App.graph.addToSelected(App.node[action])
      )
    );
    
    $tab.html(addButtons.concat(commonButtons));
  }

  function reset() {
    _.invoke(commonButtons, "detach");
    $tab.empty();
  }

  App.actionTab = {
    "loadNode": loadNode,
    "reset": reset
  };
});
