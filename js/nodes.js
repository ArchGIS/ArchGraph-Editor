"use strict";

(function() {
  var t = App.locale.translate;

  var NORMAL_CLASSES = "normal-node";
  var BINDER_CLASSES = "binder-node";
  
  function Base(id, ctor) {  
    this.id = id;
    this.label = App.locale.translate(`${ctor.name}.short`);
    this.actions = ctor.actions;
    this.schema = ctor.schema;

    this.props = _.mapObject(
      ctor.schema,
      (info, key) => _.isFunction(info.default) ? info.default() : info.default
    );
  }
  
  function Author(id) {
    Base.call(this, id, Author);
  }
  Author.classes = NORMAL_CLASSES;
  Author.actions = {
    "add": [
      "Research"
    ]
  };
  
  function Research(id) {
    Base.call(this, id, Research);
  }
  Research.classes = NORMAL_CLASSES;
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
      "default": ""
    },
    "year": {
      "input": INP_STRING,
      "default": () => new Date().getFullYear()
    }
  };

  function Excavations(id) {
    Base.call(this, id, Excavations);
  }
  Excavations.classes = NORMAL_CLASSES;
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
  MonumentPhoto.classes = NORMAL_CLASSES;
  MonumentPhoto.actions = {};

  function ExcavationsPhoto(id) {
    Base.call(this, id, ExcavationsPhoto);
  }
  ExcavationsPhoto.classes = NORMAL_CLASSES;
  ExcavationsPhoto.actions = {};

  function ArtifactPhoto(id) {
    Base.call(this, id, ArtifactPhoto);
  }
  ArtifactPhoto.classes = NORMAL_CLASSES;
  ArtifactPhoto.actions = {};

  function Monument(id) {
    Base.call(this, id, Monument);
  }
  Monument.classes = BINDER_CLASSES;
  Monument.actions = {};

  function Artifact(id) {
    Base.call(this, id, Artifact);
  }
  Artifact.classes = NORMAL_CLASSES;
  Artifact.actions = {};

  function CoAuthor(id) {
    Base.call(this, id, CoAuthor);
  }
  CoAuthor.classes = BINDER_CLASSES;
  CoAuthor.actions = {};

  function ArchMap(id) {
    Base.call(this, id, ArchMap);
  }
  ArchMap.classes = NORMAL_CLASSES;
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
