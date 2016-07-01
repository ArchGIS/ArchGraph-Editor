"use strict";

$(function() { 
  var $tab = $("#data-tab");
  var $inputs = {};

  // #FIXME: должны быть в другом месте
  var inputTemplates = [
    value => `<textarea>${value}</textarea>`,
    value => `<input value="${value}">`,
  ];
  
  function loadNode(node) {
    var $elems = []; // Элементы для вставки в html

    _.each(node.schema, (info, key) => {
      var $input = $(inputTemplates[info.input](node.props[key]));

      $inputs[key] = $input;
      $elems.push($("<label/>").html([info.name, $input]));
    });

    $tab.html($elems);
  }

  function updateNode(node) {
    _.each(node.schema, (info, key) => {
      node.props[key] = $inputs[key].val();
    });
  }

  function reset() {
    $tab.empty();
  }

  App.dataTab = {
    "loadNode": loadNode,
    "updateNode": updateNode,
    "reset": reset
  };
})
