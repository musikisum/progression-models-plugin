import ModelProvider from './model-provider.js';

// Provide values of fifths
const _fifthsValues = {
  '^^C': 14,
  '^^F': 13,
  '^B': 12,
  '^E': 11,
  '^A': 10,
  '^D': 9,
  '^G': 8,
  '^C': 7,
  '^F': 6,
  '=B': 5,
  '=E': 4,
  '=A': 3,
  '=D': 2,
  '=G': 1,
  '=C': 0,
  '=F': -1,
  '_B': -2,
  '_E': -3,
  '_A': -4,
  '_D': -5,
  '_G': -6,
  '_C': -7,
  '_F': -8
};

// Set the direction up/down of a tone object transposition
const transposeUp = (fifthsValue, transposeFifthsValue) => {
  const values = [0, 4, 1, 5, 2, 6, 3];
  const val1 = values[((fifthsValue % 7) + 7) % 7];
  const val2 = values[((transposeFifthsValue % 7) + 7) % 7];
  return (val1 + val2) > 6 ? 1 : 0;
};

//
const _getModelKeyValue = modelKey => {
  switch (modelKey) {
    case 'E':
    case 'C#m':
      return _fifthsValues['=E'];
    case 'A':
    case 'F#m':
      return _fifthsValues['=A'];
    case 'D':
    case 'Bm':
      return _fifthsValues['=D'];
    case 'G':
    case 'Em':
      return _fifthsValues['=G'];
    case 'C':
    case 'Am':
      return _fifthsValues['=C'];
    case 'F':
    case 'Dm':
      return _fifthsValues['=F'];
    case 'Bb':
    case 'Gm':
      return _fifthsValues._B;
    case 'Eb':
    case 'Cm':
      return _fifthsValues._E;
    case 'Ab':
    case 'Fm':
      return _fifthsValues._A;
    default:
      return 0;
  }
};

// Provide a fifths value from an abc symbol
const getFifthsValueFromTone = symbol => {
  return _fifthsValues[symbol];
};

// Provide an abc symbol from a fifts value
const getToneFromFifthsValue = number => {
  if (number < -9 && number < 15) {
    console.log(`The fifths value ${number} ist out of range`);
  }
  return Object.keys(_fifthsValues).find(key => _fifthsValues[key] === number);
};

// Create a tone object from a model tone: [sign][tone][octave][length][:force]
const _createToneObject = toneSymbol => {
  const regex = /^(\^}^|\^|=|_|__)([CDEFGAB])(\d)(\d):?(\w+)?$/;
  const match = toneSymbol.match(regex);
  const toneObj = {};
  const [, sign, tone, octave, length, additionals] = match;
  toneObj.fifthsValue = _fifthsValues[`${sign}${tone}`];
  toneObj.octave = parseInt(octave, 10) || 4;
  toneObj.length = parseInt(length, 10) || 2;
  console.log(additionals)
  toneObj.force = !!additionals;
  return toneObj;
};

// Provide a abc octave value from a midi octave number
const _getOctaveSpecifier = octaveNumber => {
  switch (octaveNumber) {
    case 1:
      return ',,,';
    case 2:
      return ',,';
    case 3:
      return ',';
    case 4:
      return '';
    case 5:
      return '\'';
    case 6:
      return '\'\'';
    case 7:
      return '\'\'\'';
    case 8:
      return '\'\'\'\'';
    default:
      console.log(`The octave value is invalid: ${octaveNumber}.`);
      return '';
  }
};

// Handle voice exchanges 
const updateTransposeValues = (voiceArr, modelName) => {
  const model = ModelProvider.getModel(modelName);
  const dtv = model.getDefaultOptions().transposeValues;
  const mapObj = {
    '012': [dtv[0], dtv[1], dtv[2]],
    '102': [dtv[0], dtv[1] - 1, dtv[2]],
    '021': [dtv[0], dtv[1] + 1, dtv[2]],
    '120': [dtv[0], dtv[1], dtv[2] - 1],
    '201': [dtv[0] + 1, dtv[1] - 1, dtv[2]],
    '210': [dtv[0] + 1, dtv[1], dtv[2]]
  };
  const returnValue = mapObj[voiceArr];
  return returnValue;
};

// Modifies voices of a model in according to the modeltemplate properties
const getVoices = (options, modelVoices) => {
  let modelToneObjects = [[], [], []];
  // set model key 
  const fifthsValueToTranspose = _getModelKeyValue(options.modelKey);
  // Modify toneObjects
  for (let voicesIndex = 0; voicesIndex < modelVoices.length; voicesIndex += 1) {
    const voice = modelVoices[voicesIndex];
    for (let vIndex = 0; vIndex < voice.length; vIndex += 1) {
      const toneObj = _createToneObject(voice[vIndex]);
      const transposeUpValue = transposeUp(toneObj.fifthsValue, fifthsValueToTranspose);
      toneObj.octave += transposeUpValue;
      toneObj.fifthsValue += fifthsValueToTranspose;
      modelToneObjects[voicesIndex].push(toneObj);
    }    
  }
  // voice change 
  modelToneObjects = options.voiceArrangement.map(index => modelToneObjects[index - 1]);
  // octave transpositions
  for (let index = 0; index < modelToneObjects.length; index += 1) {
    const voice = modelToneObjects[index];
    voice.forEach(obj => {
      obj.octave += options.transposeValues[index];
    });
  }
  return modelToneObjects;
};

// Create measure abc code from an array of tone objects and remove not forced leading =-signs  
function _getMeasureAbcCodeFromTonObjectsArray(toneObjArr) {
  return toneObjArr.reduce((accu, toneObj) => {
    let abcSymbol = `${getToneFromFifthsValue(toneObj.fifthsValue)}${_getOctaveSpecifier(toneObj.octave)}${toneObj.length}`;
    if (!toneObj.force && abcSymbol.startsWith('=')) {
      abcSymbol = abcSymbol.slice(1);
    }
    accu.push(abcSymbol);
    return accu;
  }, []);
}

// Remove redundant signs in a measure
function _removeRedundantSignsInMeasure(measureSymbols, index = 0, done = {}, prefixPattern = /^([=_^]+)?/) {
  // stop the loop 
  if (index >= measureSymbols.length) {
    return measureSymbols;
  }
  const symbol = measureSymbols[index];
  if (done[symbol]) { // Replace an reminded symbol 
    measureSymbols[index] = done[symbol];
  } else { // Entry point for replacing a symbol and saving the modefied symbol for the next replace 
    const modifiedSymbol = symbol.replace(prefixPattern, '');
    done[symbol] = modifiedSymbol;
  }
  // recursive method call 
  return _removeRedundantSignsInMeasure(measureSymbols, index + 1, done, prefixPattern);
}

function _convertMeasureSign(measureSign) {
  switch (measureSign) {    
    case "C":
        return [6, 8];    
    case "3/4":
        return [4, 6];    
    case "2/4":
        return [2, 4];  
    default:
      return [2, 4]; // 'C|'
  }
} 

// Only for triple meters
function _adjustLengthValuesInTripleMeasures(voice, inversion) {
  const indexIs5 = inversion ? 2 : 1;
    if (inversion) {
      voice[0].length = 4;
    }
    for (let i = indexIs5; i < voice.length; i += 2) {
      voice[i].length = 4;
    }
  return voice;
};

// Convert MeasureSign to defaultLength 
function convertMeasureSignToDefaultLength(measureSign) {
  switch (measureSign) {      
    case "2/4":
    case "3/4":
    case "C":   
      return '1/8';
    default:
      return '1/4';
  }
}

// Convert a voice of tone objects to an string ob abc symbols with measure signs 
const convertModelVoiceToAbcSymbols = (modelVoiceObjs, measureSign, invertRhythm) => {
  const voiceAbcSymbols = [];
  let [length, measureLength] = _convertMeasureSign(measureSign);
  let tempArr = [];
  let modelVoice;
  if (measureSign !== '3/4') {
    modelVoice = modelVoiceObjs;
  } else {
    modelVoice = _adjustLengthValuesInTripleMeasures(modelVoiceObjs, invertRhythm);
    length = invertRhythm ? 2 : 4;
  }
  for (let index = 0; index < modelVoice.length; index += 1) {
    const toneObj = modelVoice[index];
    tempArr.push(toneObj);
    length += toneObj.length;
    if (length % measureLength === 0) {
      let measureOfSymbols = _getMeasureAbcCodeFromTonObjectsArray(tempArr);
      measureOfSymbols = _removeRedundantSignsInMeasure(measureOfSymbols);
      voiceAbcSymbols.push(...measureOfSymbols);
      voiceAbcSymbols.push('|');
      tempArr = [];
    }
    if (index === modelVoice.length - 1) {
      let halfMeasureOfSymbols = _getMeasureAbcCodeFromTonObjectsArray(tempArr);
      halfMeasureOfSymbols = _removeRedundantSignsInMeasure(halfMeasureOfSymbols);
      voiceAbcSymbols.push(...halfMeasureOfSymbols);
      tempArr = [];
    }
  }
  return voiceAbcSymbols;
};

const divideVoices = (abcVoices, barsPerLine) => {
  const result = [[], [], []];
  const newAbcVoices = [[], [], []];
  abcVoices.forEach((voice, index) => {
    const parts = voice.split(' | '); 
    for (let i = 0; i < parts.length; i += barsPerLine) {
      result[index].push(parts.slice(i, i + barsPerLine));    
    }
  });
  result.forEach((voiceArr, index) => {
    let abc = '';
    for (let i = 0; i < voiceArr.length; i += 1) {
      abc += voiceArr[i].join(' | ');
      abc += ' | ';
      abc += i !== voiceArr.length - 1 ? '\n' : '';
      newAbcVoices[index] = abc;
    }
  });
  return newAbcVoices;
};

// Copy properties form one modelTemplate to an other modelTemplate
const copyMatchingProperties = (oldModelTemplate, newModelTemplate) => {
  for (let key in oldModelTemplate) {
    if (key === 'key' || key === 'name') {
      continue;
    }
    if (newModelTemplate.hasOwnProperty(key)) {
      if (typeof oldModelTemplate[key] === 'object' && oldModelTemplate[key] !== null) {
        if (Array.isArray(oldModelTemplate[key])) {
          newModelTemplate[key] = [...oldModelTemplate[key]];
        } else {
          copyMatchingProperties(oldModelTemplate[key], newModelTemplate[key]);
        } 
      } else {
        newModelTemplate[key] = oldModelTemplate[key];
      }
    }
  }
}

// Convert an abc string t an empty line
const convertToEmptyLines = (voices, hideUpperSystem, hideLowerSystem) => {
  const result = voices[2].split(/[| ]+/).filter(entry => entry !== '');
  const newV1Arr = []; const newV2Arr = []; const newV3Arr = [];
  
  result.forEach((_, index) => {
    const isEven = index % 2 === 0;
    const separator = isEven ? ' | ' : ' ';    
    if (hideUpperSystem) {
      newV1Arr.push('x', separator);
      newV2Arr.push('x', separator);
    }    
    if (hideLowerSystem) {
      newV3Arr.push('x', separator);
    }
  });  
  if (hideUpperSystem) {
    voices[0] = newV1Arr.join('');
    voices[1] = newV2Arr.join('');
  }  
  if (hideLowerSystem) {
    voices[2] = newV3Arr.join('');
  }  
  return voices;
};
 
const ModelUtilities = {
  getVoices,
  getFifthsValueFromTone,
  getToneFromFifthsValue,
  convertModelVoiceToAbcSymbols,
  convertMeasureSignToDefaultLength,
  updateTransposeValues,
  divideVoices,
  copyMatchingProperties,
  convertToEmptyLines
};

export default ModelUtilities;
