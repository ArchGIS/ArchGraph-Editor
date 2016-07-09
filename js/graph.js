"use strict";

$(function() {
  var t = App.locale.translate;
  var cy = null;

  var idSequence = 0;
  
  var $cytoscape = $("#cytoscape");
  var relativeCenter = {
    "x": $cytoscape.width() / 2.0,
    "y": $cytoscape.height() / 2.0
  };

  /**
   * Инициализация графа.
   * Исходное состояние задаётся входными аргументами.
   * 
   * @param {Node[]} nodes
   */
  function init(nodes) {
    var elems = {
      "nodes": _.map(nodes, (node) => ({"data": node}))
    };

    var style = cytoscape.stylesheet()
      .selector("node").css({
        "content": "data(label)",
        "text-valign": "center",
        "color": "#000"
      })
      .selector(":selected").css({/* default */})
      .selector("edge").css({
        "width": 2,
        "target-arrow-shape": "triangle",
        "curve-style": "bezier"
      });

    var initialLayout = {
      "name": "grid",
      "padding": (function() {
          switch (nodes.length) {
            case 1: return 180;
            case 2: return 90;
            default: return 45;
          }
        }())
    };

    cy = cytoscape({
      "userZoomingEnabled": false,
      "boxSelectionEnabled": false,
      "layout": initialLayout,
      "elements": elems,
      "container": $cytoscape[0],
      "style": style
    });
  }

  /**
   * Увеличить текущий масштаб графа.
   */
  function zoomIn() {
    var zoom = cy.zoom();
    if (zoom < 3.0) {
      cy.zoom(zoom + zoom / 3.0);
    }
  }

  /**
   * Уменьшить текущий масштаб графа.
   */
  function zoomOut() {
    var zoom = cy.zoom();
    if (zoom > 0.25) {
      cy.zoom(zoom - zoom / 3.0);
    }
  }

  /**
   * Подписывает функцию `callback` на событие `trigger`.
   * Домен события ограничивается аргументом `target`.
   * Например, можно отслеживать события только вершин (node).
   * 
   * @param {string} trigger
   * @param {string} target
   * @param {function} callback
   */
  function bindEvent(trigger, target, callback) {
    cy.on(trigger, target, callback);
  }

  /**
   * Создать вершину, соединённую с текуще выбранной вершиной.
   * Принимает конструирующую функцию в качестве аргумента.
   * 
   * @param {function} NodeCtor
   */
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

  /**
   * Удалить выделенный узел.
   * #FIXME: должен удалять все исходящие узлы.
   */
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

  /**
   * Возвращает массив вершин графа, которые соединены с `node` вершиной.
   * При передаче дополнительного аргумента `NodeCtor`, фильтрует результат
   * так, чтобы в него входили вершины указанного типа.
   * 
   * @param {Node} node
   * @param {function} NodeCtor
   * @return {Node[]}
   */
  function connectedNodes(node, NodeCtor) {
    var vertex = cy.$("#" + node.id); 
    var connectedVertices = vertex.neighborhood("node"); 
    
    if (NodeCtor) {
      var result = [];
      _.each(connectedVertices, (vertex) => {
        if (vertex.data().constructor == NodeCtor) {
          result.push(vertex.data());
        }
      });
      return result;
    } else {
      return _.invoke(connectedVertices, "data");
    }
  }

  App.graph = {
    "init": init,
    "on": bindEvent,
    "zoomIn": zoomIn,
    "zoomOut": zoomOut,
    "deleteSelected": deleteSelected,
    "addToSelected": addToSelected,
    "connectedNodes": connectedNodes
  };
});
