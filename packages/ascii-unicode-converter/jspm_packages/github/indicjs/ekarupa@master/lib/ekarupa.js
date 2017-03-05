export function asciiToUnicode(string, map, options){
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
  processingLoop:
  while (currIndex < string.length) {
    currentOriginalChar = currentDecodedChar = string.slice(currIndex, currIndex + 1);
    for (let currLHSWidth = options.LHSGreatestWidth; currLHSWidth > 0 ; currLHSWidth--) {
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
    } else if (map.postbase.includes(currChar)){
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
  for (let rule of Object.keys(map.composition)){
    postProcessed = postProcessed.replaceAll(rule, map.composition[rule])
  }
  return postProcessed;
}

function preprocessMap(map){
  let processedMap = {};
  for (let item in map) {
    if (item === 'map') {
      let realMap = {};
      for (let rule of Object.keys(map.map)) {
        realMap[rule.trim()] = map.map[rule].trim();
      }
      realMap[' ']=' ';
      realMap['\n']='\n';
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

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

function calculateLHSGreatestWidth(map) {
  return calculateGreatestWidth(map, 'lhs');
}

function calculateRHSGreatestWidth(map) {
  return calculateGreatestWidth(map, 'rhs');
}

function calculateGreatestWidth(map, index) {
  let greatestWidth = 0;
  for (let key in Object.keys(map)) {
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
