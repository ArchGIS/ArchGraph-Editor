"use strict";

$(function() {
  var $tab = $("#action-tab");
  var t = App.locale.translate;

  var commonButtons = [
    App.make.redButton(t("button.delete"), App.graph.deleteSelected)
  ];

  var actionMapping = (function() {
    var node = App.node;

    // Пока действия только для добавления узлов.
    return _.mapObject({
      "addResearch": node.Research,
      "addAuthor": node.Author,
      "addExcavations": node.Excavations,
      "addMonument": node.Monument,
      "addMonumentPhoto": node.MonumentPhoto,
      "addExcavationsPhoto": node.ExcavationsPhoto,
      "addArtifact": node.Artifact,
      "addArchMap": node.ArchMap,
      "addCoAuthor": node.CoAuthor
    }, NodeCtor => () => App.graph.addToSelected(NodeCtor));
  }());
  console.log(actionMapping);
  
  function loadNode(node) {
    var buttons = _.map(
      node.actions,
      action => App.make.blueButton(
        t(`button.${action}`),
        actionMapping[action]
      )
    );
    
    $tab.html(buttons.concat(commonButtons));
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
