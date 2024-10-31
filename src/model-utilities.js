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

// Create a tone object from a model tone: [sign][tone][octave][length][:force]
const _createToneObject = toneSymbol => {
  const regex = /^(\^}^|\^|=|_|__)([CDEFGAB])(\d)(\d):?(\w+)?$/;
  const match = toneSymbol.match(regex);
  const toneObj = {};
  const [, sign, tone, octave, length, additionals] = match;
  toneObj.fifthsValue = _fifthsValues[`${sign}${tone}`];
  toneObj.octave = parseInt(octave, 10) || 4;
  toneObj.length = parseInt(length, 10) || 2;
  toneObj.force = !!additionals;
  return toneObj;
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

// Convert MeasureSign to defaultLength 
function convertMeasureSignToDefaultLength(measureSign) {
  switch (measureSign) {      
    case '2/4':
    case '3/4':
    case 'C':   
      return '1/8';
    case '3/8':
      return '1/16';
    case '3/2':
      return '1/4';
    default:
      return '1/4';
  }
}

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
 
const ModelUtilities = {
  getVoices,
  getFifthsValueFromTone,
  convertMeasureSignToDefaultLength,
  updateTransposeValues,
  divideVoices
};

export default ModelUtilities;
