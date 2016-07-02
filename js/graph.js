"use strict";

$(function() {
  var Author = App.node.Author;
  var Research = App.node.Research;
  var Excavations = App.node.Excavations;
  var Artifact = App.node.Artifact;
  var t = App.locale.translate;

  var idSequence = 0;
  
  var $cytoscape = $("#cytoscape");

  var relativeCenter = {
    "x": $cytoscape.width() / 2.0,
    "y": $cytoscape.height() / 2.0
  };

  var cy = (function() {
    var style = cytoscape.stylesheet()
      .selector("node").css({
        "content": "data(label)",
        "text-valign": "center",
        "color": "#000"
      })
      .selector(".normal-node").css({
        "background-color": "rgb(28, 184, 65)"
      })
      .selector(".normal-node:selected").css({
        "font-weight": "bold",
        "shape": "rectangle",
        "background-color": "rgb(28, 184, 65)"
      })
      .selector(".binder-node").css({
        "background-color": "#0078e7"
      })
      .selector(".binder-node:selected").css({
        "font-weight": "bold",
        "shape": "rectangle",
        "background-color": "#0078e7"
      })
      .selector("edge").css({
        "width": 2,
        "target-arrow-shape": "triangle",
        "curve-style": "bezier"
      });

    // #FIXME: стартовый набор должен задаваться извне
    var elems = {
      "nodes": [{"data": new Author("author"), "classes": "normal-node"}]
    };

    var initialLayout = {
      "name": "grid",
      "padding": 180
    };

    return cytoscape({
      "userZoomingEnabled": false,
      "boxSelectionEnabled": false,
      "layout": initialLayout,
      "elements": elems,
      "container": $cytoscape[0],
      "style": style
    });
  }());

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
      "classes": NodeCtor.classes,
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
