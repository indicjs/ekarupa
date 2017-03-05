(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.ekarupa = global.ekarupa || {})));
}(this, (function (exports) { 'use strict';

function asciiToUnicode(string, map, options) {
  map = preprocessMap(map);
  if (options === undefined) {
    options = {};
  }
  if (options.LHSGreatestWidth === undefined) {
    options.LHSGreatestWidth = calculateLHSGreatestWidth(map.map);
  }
  var converted = '';
  var currIndex = 0;
  var currentDecodedChar = '';
  var currentOriginalChar = '';
  processingLoop: while (currIndex < string.length) {
    currentOriginalChar = currentDecodedChar = string.slice(currIndex, currIndex + 1);
    for (var currLHSWidth = options.LHSGreatestWidth; currLHSWidth > 0; currLHSWidth--) {
      if (map.map[string.slice(currIndex, currIndex + currLHSWidth)] !== undefined) {
        currentDecodedChar = map.map[string.slice(currIndex, currIndex + currLHSWidth)];
        converted += currentDecodedChar;
        currIndex += currLHSWidth;
        // console.log(currentDecodedChar);
        continue processingLoop;
      }
    }
    converted += currentDecodedChar;
    currIndex += 1;
  }
  var postProcessed = '';
  currIndex = 0;
  var currChar = '';
  var baseFound = false;
  var prebaseBuffer = '';
  var baseBuffer = '';
  while (currIndex < converted.length) {
    currChar = converted.slice(currIndex, currIndex + 1);
    if (map.prebase.includes(currChar)) {
      if (baseFound) {
        postProcessed += prebaseBuffer;
        prebaseBuffer = '';
        baseFound = false;
      }
      prebaseBuffer += currChar;
    } else if (map.joiner.includes(currChar)) {
      postProcessed += currChar;
      baseFound = false;
    } else if (map.postbase.includes(currChar)) {
      postProcessed += prebaseBuffer;
      prebaseBuffer = '';
      baseFound = false;
      postProcessed += currChar;
    } else {
      if (baseFound === false) {
        postProcessed += currChar;
        baseFound = true;
      } else {
        postProcessed += prebaseBuffer;
        prebaseBuffer = '';
        postProcessed += currChar;
      }
    }
    currIndex += 1;
  }
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = Object.keys(map.composition)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var rule = _step.value;

      postProcessed = postProcessed.replaceAll(rule, map.composition[rule]);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return postProcessed;
}

function preprocessMap(map) {
  var processedMap = {};
  for (var item in map) {
    if (item === 'map') {
      var realMap = {};
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = Object.keys(map.map)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var rule = _step2.value;

          realMap[rule.trim()] = map.map[rule].trim();
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      realMap[' '] = ' ';
      realMap['\n'] = '\n';
      processedMap.map = realMap;
    } else {
      processedMap[item] = map[item];
    }
  }
  if (processedMap.prebase === undefined) {
    processedMap.prebase = 'േ െ ൈ ്ര'.split(' ');
  }
  if (processedMap.postbase === undefined) {
    processedMap.postbase = 'ാ ി ീ ു ൂ ഃ'.split(' ');
  }
  if (processedMap.joiner === undefined) {
    processedMap.joiner = '്'.split(' ');
  }
  if (processedMap.composition === undefined) {
    processedMap.composition = {
      'ോ': 'ോ'
    };
  }
  return processedMap;
}

String.prototype.replaceAll = function (search, replacement) {
  var target = this;
  return target.replace(new RegExp(search, 'g'), replacement);
};

function calculateLHSGreatestWidth(map) {
  return calculateGreatestWidth(map, 'lhs');
}

function calculateGreatestWidth(map, index) {
  var greatestWidth = 0;
  for (var key in Object.keys(map)) {
    if (index === 'lhs') {
      if (key.length > greatestWidth) {
        greatestWidth = key.length;
      }
    } else if (index === 'rhs') {
      if (map[key].length > greatestWidth) {
        greatestWidth = map[key].length;
      }
    }
  }
  return greatestWidth;
}

exports.asciiToUnicode = asciiToUnicode;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ekarupa.umd.js.map
