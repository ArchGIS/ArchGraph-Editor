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
  Author.actions = {
    "add": [
      "Research"
    ]
  };

  function Research(id) {
    Base.call(this, id, Research);
  }
  Research.actions = {
    "add": [
      "ArchMap",
      "Excavations",
      "CoAuthor"
    ]
  };
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
  Excavations.actions = {
    "add": [
      "Artifact",
      "MonumentPhoto",
      "ExcavationsPhoto",
      "Monument"
    ]
  };

  function MonumentPhoto(id) {
    Base.call(this, id, MonumentPhoto);
  }
  MonumentPhoto.actions = {};

  function ExcavationsPhoto(id) {
    Base.call(this, id, ExcavationsPhoto);
  }
  ExcavationsPhoto.actions = {};

  function ArtifactPhoto(id) {
    Base.call(this, id, ArtifactPhoto);
  }
  ArtifactPhoto.actions = {};

  function Monument(id) {
    Base.call(this, id, Monument);
  }
  Monument.actions = {};

  function Artifact(id) {
    Base.call(this, id, Artifact);
  }
  Artifact.actions = {};

  function CoAuthor(id) {
    Base.call(this, id, CoAuthor);
  }
  CoAuthor.actions = {};

  function ArchMap(id) {
    Base.call(this, id, ArchMap);
  }
  ArchMap.actions = {};
    
  App.node = {
    "Base": Base,
    "Author": Author,
    "Monument": Monument,
    "ExcavationsPhoto": ExcavationsPhoto,
    "MonumentPhoto": MonumentPhoto,
    "ArtifactPhoto": ArtifactPhoto,
    "Research": Research,
    "Excavations": Excavations,
    "Artifact": Artifact,
    "CoAuthor": CoAuthor,
    "ArchMap": ArchMap
  };
}());
