"use strict";

$(function() {
  var $tab = $("#action-tab");
  var t = App.locale.translate;

  var $errorButton = $("<button/>", {
    "text": t("button.delete"),
    "class": "pure-button button-warning"
  }).on("click", function() {
    App.graph.deleteSelected();
  });
  
  var buttonTemplate = (text) => `
    <button class="pure-button pure-button-primary row-button">
      ${text}
    </button>
  `;
  
  function loadNode(node) {
    var $parts = _.map(
      _.map(node.actions, action => t(`button.${action}`)),
      buttonTemplate
    );
    $tab.html($errorButton);
  }

  function reset() {
    $errorButton.detach();
    // $tab.empty();
  }

  App.actionTab = {
    "loadNode": loadNode,
    "reset": reset
  };
});
