"use strict";

$(function() {
  var Author = App.node.Author;
  var Research = App.node.Research;
  var Excavations = App.node.Excavations;
  var Artifact = App.node.Artifact;
  var t = App.locale.translate;

  var idSequence = 0;
  
  var $cytoscape = $("#cytoscape");

  // #FIXME: стартовый набор должен задаваться извне
  var elems = {
    "nodes": [{"data": new Author('author')}]
  };

  var relativeCenter = {
    "x": $cytoscape.width() / 2.0,
    "y": $cytoscape.height() / 2.0
  };
  
  var cy = cytoscape({
    "userZoomingEnabled": false,
    "boxSelectionEnabled": false,
    "container": $cytoscape[0],
    "elements": elems,
    "layout": {
      "name": "grid",
      "padding": 180
    },
    "style": [{
      "selector": "node",
      "style": {
        "content": "data(label)",
        "text-valign": "center"
      }
    }, {
      "selector": "edge",
      "style": {
	"width": 2,
	"target-arrow-shape": "triangle",
	"curve-style": 'bezier'
      }
    }]
  });

  function zoomIn() {
    var zoom = cy.zoom();
    if (zoom < 3.0) {
      cy.zoom(zoom + zoom / 3.0);
    }
  }

  function zoomOut() {
    var zoom = cy.zoom();
    if (zoom > 0.25) {
      cy.zoom(zoom - zoom / 3.0);
    }
  }

  function bindEvent(trigger, target, callback) {
    cy.on(trigger, target, callback);
  }

  function addToSelected(NodeCtor) {
    var selected = cy.$(":selected");
    var id = "" + idSequence++;
    var pos = selected.position();
    
    var node = {
      "group": "nodes",
      "data": new NodeCtor(id),
      "position": {
        "x": pos.x + 75,
        "y": pos.y
      }
    };
    var edge = {
      "group": "edges",
      "data": {
        "source": selected.id(),
        "target": id
      }
    };
    
    cy.add([node, edge]);
  }

  function deleteSelected() {
    var selected = cy.$(":selected");
    if (0 == selected.length) { // Не выделено ни одного узла.
      return;
    }
    
    if (selected.neighborhood("node").length < 2) {
      if (App.alert.confirm("Вы уверены, что хотите удалить этот элемент?")) {
        selected.remove();
      }
    } else {
      App.alert.error(t("error.nonLeafRemove"));
    }
  }

  App.graph = {
    "on": bindEvent,
    "zoomIn": zoomIn,
    "zoomOut": zoomOut,
    "deleteSelected": deleteSelected,
    "addToSelected": addToSelected
  };
});
