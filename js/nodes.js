"use strict";

(function() {
  var t = App.locale.translate;
  
  function Base(id, ctor) {  
    this.id = id;
    this.label = App.locale.translate(`${ctor.name}.short`);
    this.actions = ctor.actions;
    this.schema = ctor.schema;

    this.props = {};
    
    _.each(ctor.schema, (info, key) => {
      this.props[key] = _.isFunction(info.default) ? info.default() : info.default;
    });
  }
  
  function Author(id) {
    Base.call(this, id, Author);
  }
  Author.actions = [
    "addResearch"
  ];

   function Research(id) {
    Base.call(this, id, Research);
  }
  Research.actions = [
    "addPublication",
    "addExcavations",
    "addCoAuthor"
  ];
  Research.schema = {
    "description": {
      "input": INP_TEXT,
      "name": "Описание",
      "default": ""
    },
    "year": {
      "input": INP_STRING,
      "name": "Год проведения",
      "default": () => new Date().getFullYear()
    }
  };

  function Excavations(id) {
    Base.call(this, id, Excavations);
  }
  Excavations.actions = [];

  function Artifact(id) {
    Base.call(this, id, Artifact);
  }
  Artifact.actions = [];
    
  App.node = {
    "Base": Base,
    "Author": Author,
    "Research": Research,
    "Excavations": Excavations,
    "Artifact": Artifact
  };
}());
