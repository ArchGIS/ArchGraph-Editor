"use strict";

(function() {
  var bindings = {};

  function bindKeyUp(keyCode, callback) {
    bindings[keyCode] = callback;
  }

  $(window).keyup(function(event) {
    var callback = bindings[event.which];
    if (callback) {
      callback();
    }
  });
  
  App.hotkey = {
    "bind": bindKeyUp
  };
}());
