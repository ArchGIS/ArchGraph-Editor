"use strict";

var INP_TEXT = 0;
var INP_STRING = 1;

(function() {
  var inputId = 0;

  function factory(type, name, value) {
    switch (type) {
    case INP_TEXT: return new TextInput(name, value);
    case INP_STRING: return new StringInput(name, value);
    default: throw `unknown input type: ${type}`;
    }
  }
  
  function StringInput(name, value) {
    var $input = $(`<input value="${value}">`);
    
    this.val = () => $input.val();
    this.$el = $(`<label>${name}${$input[0].outerHTML}</label>`);
  }
  
  function TextInput(name, value) {
    var $input = $(`<textarea>${value}</textarea>`);
    
    this.val = () => $input.val();
    this.$el = $(`<label>${name}${$input[0].outerHTML}</label>`);
  }

  App.input = {"factory": factory};
}());
