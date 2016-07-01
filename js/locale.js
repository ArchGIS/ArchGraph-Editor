"use strict";

(function() {
  var dict = {
    "Author": {
      "short": "Автор"
    },
    "Research": {
      "short": "Иссл."
    },
    "Excavations": {
      "short": "Раскопки"
    },
    "Artifact": {
      "short": "Артефакт"
    },
    "button": {
      "delete": "Удалить элемент",
      "addResearch": "Добавить исследование",
      "addExcavations": "Добавить раскопки",
      "addPublication": "Добавить публикацию",
      "addArtifact": "Добавить артефакт",
      "addCoAuthor": "Добавить соавтора"
    },
    "error": {
      "nonLeafRemove": "удалять можно только висячие вершины (листья графа)"
    }
  };
  var dictIndex = {};

  function buildIndex(toParse, path) {
    _.each(toParse, function(object, key) {
      // _.isObject для массивов возвращает true, а нам нужно поймать
      // именно объекты {}, поэтому тут немного хитрая проверка.
      if ('[object Object]' == Object.prototype.toString.call(object)) {
        buildIndex(object, path ? path + '.' + key : key);
      } else {
        dictIndex[path ? path + '.' + key : key] = object;
      }
    });
  }

  buildIndex(dict);
  
  App.locale.translate = function(key) {
    var translation = dictIndex[key];
    if (translation) {
      return translation;
    } else {
      return `<< ${key} >>`;
    }
  }
}());
