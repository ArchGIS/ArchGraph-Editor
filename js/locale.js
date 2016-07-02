"use strict";

(function() {
  var dict = {
    "Author": {
      "short": "Автор"
    },
    "CoAuthor": {
      "short": "Соавтор"
    },
    "ArchMap": {
      "short": "Арх. карта"
    },
    "Research": {
      "short": "Иссл."
    },
    "Excavations": {
      "short": "Раскопки"
    },
    "Monument": {
      "short": "Памятник"
    },
    "Artifact": {
      "short": "Артефакт"
    },
    "MonumentPhoto": {
      "short": "Фото пам."
    },
    "ExcavationsPhoto": {
      "short": "Фото раск."
    },
    "button": {
      "delete": "Удалить элемент",
      "addResearch": "Добавить исследование",
      "addExcavations": "Добавить раскопки",
      "addArchMap": "Добавить археологическую карту",
      "addMonument": "Добавить памятник",
      "addArtifact": "Добавить артефакт",
      "addCoAuthor": "Добавить соавтора",
      "addMonumentPhoto": "Добавить фотографию памятника",
      "addExcavationsPhoto": "Добавить фотографию раскопок"
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
