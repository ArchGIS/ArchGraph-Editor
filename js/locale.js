"use strict";

(function() {
  var dict = {
    "Author": {
      "short": "Автор",
      "insert": "Добавить автора"
    },
    "CoAuthor": {
      "short": "Соавтор",
      "insert": "Добавить соавтора"
    },
    "ArchMap": {
      "short": "Арх. карта",
      "insert": "Добавить археологическую карту"
    },
    "Research": {
      "short": "Иссл.",
      "insert": "Добавить исследование"
    },
    "Excavations": {
      "short": "Раскопки",
      "insert": "Добавить раскопки"
    },
    "Monument": {
      "short": "Памятник",
      "insert": "Добавить памятник"
    },
    "Artifact": {
      "short": "Артефакт",
      "insert": "Добавить артефакт"
    },
    "MonumentPhoto": {
      "short": "Фото пам.",
      "insert": "Добавить фотографию памятника"
    },
    "ExcavationsPhoto": {
      "short": "Фото раск.",
      "insert": "Добавить фотографию раскопок"
    },
    "button": {
      "delete": "Удалить элемент"
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
