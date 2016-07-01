"use strict";

$(function() {
  var Author = App.node.Author;
  var Research = App.node.Research;
  var Excavations = App.node.Excavations;
  var Artifact = App.node.Artifact;
  var t = App.locale.translate;
  
  var author = new Author('author');
  var research = new Research('research');
  var elems = {
    "nodes": [
      { data: author },
      { data: research },
      { data: new Artifact("art") },
      { data: new Excavations("mr") }
    ],
    "edges": [
      { data: { source: "author", target: "research"} },
      { data: { source: "research", target: "mr"} },
      { data: { source: "art", target: "mr"} }
    ]
  };
  
  var cy = cytoscape({
    "userZoomingEnabled": false,
    "boxSelectionEnabled": false,
    "container": $("#cytoscape")[0],
    "elements": elems,
    "style": [{
      "selector": "node",
      "style": {"content": "data(label)"}
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
    "deleteSelected": deleteSelected
  };
});
