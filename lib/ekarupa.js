export function asciiToUnicode(string, map, options){
  map = preprocessMap(map);
  if (options == undefined) {
    options = {};
  }
  if (options.LHSGreatestWidth == undefined) {
    options.LHSGreatestWidth = calculateLHSGreatestWidth(map["map"]);
  }
  var converted = '';
  var currIndex = 0;
  var currentDecodedChar = '';
  var currentOriginalChar = '';
  processingLoop:
  while (currIndex < string.length) {
    currentOriginalChar = currentDecodedChar = string.slice(currIndex, currIndex + 1);
    for (let currLHSWidth = options.LHSGreatestWidth; currLHSWidth > 0 ; currLHSWidth--) {
      if (map["map"][string.slice(currIndex, currIndex + currLHSWidth)] !== undefined) {
        currentDecodedChar = map["map"][string.slice(currIndex, currIndex + currLHSWidth)];
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
  var currIndex = 0;
  var currentBuffer = '';
  // console.log(converted);
  return converted;
}

function preprocessMap(map){
  let processedMap = {};
  for (let item in map) {
    if (item == "map") {
      let realMap = {};
      for (let rule in map["map"]) {
        realMap[rule.trim()] = map["map"][rule].trim();
      }
      realMap[" "]=" ";
      realMap["\n"]="\n";
      processedMap["map"] = realMap;
    } else {
      processedMap[item] = map[item];
    }
  }
  if (processedMap["prebase"] === undefined) {
    processedMap["prebase"] = 'േ െ ൈ'.split(' ');
  }
  if (processedMap["postbase"] === undefined) {
    processedMap["postbase"] = 'ാ ി ീ ു ൂ ഃ'.split(' ');
  }
  return processedMap;
}

function calculateLHSGreatestWidth(map) {
  return calculateGreatestWidth(map, "lhs");
}

function calculateRHSGreatestWidth(map) {
  return calculateGreatestWidth(map, "rhs");
}

function calculateGreatestWidth(map, index) {
  let greatestWidth = 0;
  for (let key in Object.keys(map)) {
    if (index == "lhs") {
      if (key.length > greatestWidth) {
        greatestWidth = key.length;
      }
    } else if (index == "rhs") {
      if (map[key].length > greatestWidth) {
        greatestWidth = map[key].length;
      }
    }
  }
  return greatestWidth;
}
