import ModelProvider from "./models/model-provider.js";

const diatonicScale = ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'c', 'd', 'e', 'f', 'g', 'a', 'b'];

// Transpose a single tone in octaves up or down.  
const transpose = (number, tone) => {
  switch (number) {
    case -3:
      return `${tone},,,`;
    case -2:
      return `${tone},,`;
    case -1:
      return `${tone},`;      
    case 1:
      return `${tone}'`;  
    case 2:
      return `${tone}''`;  
    case 3:
      return `${tone}'''`;
    default:
      return tone;
  }
};

// Composes abc.js characters for values outside the valid range of the diatonic scale.
const validate = index => {
  let value = '';
  let diatonicIndex = index;
  if (diatonicIndex < 0) {
    do {
      value += ',';
      diatonicIndex += 7;
    } while (diatonicIndex < 0);      
  }
  if (diatonicIndex > 13) {
    do {
      value += '\'';
      diatonicIndex -= 7;
    } while (diatonicIndex <= 13);
  }
  const result = `${diatonicScale[diatonicIndex]}${value}`;
  return result;
};

// Provides meta informations for an abc.js header of a phrase model combination in a key and a measure.
const getMeta = (key, measure, tempo, length) => {
  return `X:1\n%%score [(1 2) 3]\nM:${measure}\nQ:${tempo}\nL:${length}\nK:${key}\n`;
};

const getSign = sign => {
  switch (sign) {
    case 1:
      return '^';  
    case -1:
      return '_';
    case 0:
      return '';
    default:
      return sign;
  }
};

const updateTransposeValues = (voiceArr, modelName) => {
  const model = ModelProvider.getModel(modelName);
  const dtv = model.getDefaultOptions().transposeValues;
  const mapObj = {
    '012': [dtv[0], dtv[1], dtv[2]],
    '102': [dtv[0], dtv[1] - 1, dtv[2]],
    '021': [dtv[0], dtv[1], dtv[2]],
    '120': [dtv[0], dtv[1], dtv[2] - 1],
    '201': [dtv[0] + 1, dtv[1] - 1, dtv[2]],
    '210': [dtv[0] + 1, dtv[1], dtv[2]]
  };
  return mapObj[voiceArr];
}

const modelTemplates = {
  cadence: {
    name: 'cadence',
    key: 'C',
    transposeValues: [0, 0, -1],
    voiceArrangement: [1, 2, 3],
    radioValue: 0,
    addProps: { 
      isFinal: false,
      isBegin: false
    }
  },
  circleOfFifths:  {
    name: 'circleOfFifths',
    key: 'C',
    transposeValues: [0, 0, 0],
    voiceArrangement: [1, 2, 3],
    radioValue: 0
  },
  circleOfFifthsLinear: {
    name: 'circleOfFifthsLinear',
    key: 'C',
    transposeValues: [0, 0, -1],
    voiceArrangement: [1, 2, 3],
    addProps: {
      lastBassNoteUp: false
    }
  }
}
 
const ModelHelper = {
  meta: getMeta,
  transposeOctave: transpose,
  validateValue: validate,
  getSign,
  updateTransposeValues,
  getModelTemplate: modelName => modelTemplates[modelName]
};

export default ModelHelper;