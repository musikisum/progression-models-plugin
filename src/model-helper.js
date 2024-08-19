import ModelProvider from './models/model-provider.js';

// Provide the abc.js tone names for c1 to b2.
const diatonicScale = ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'c', 'd', 'e', 'f', 'g', 'a', 'b'];

// Replace a number for octave transposition up or down in a abc.js sign.  
const transposeOctave = (number, tone) => {
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
const validateValue = index => {
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
const meta = (key, measure, tempo, length) => {
  return `X:1\n%%score [(1 2) 3]\nM:${measure}\nQ:${tempo}\nL:${length}\nK:${key}\n`;
};

// Method to replace an half tone number to a abc.js sign.
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
  console.log('va:', voiceArr, 'tv:', dtv);
  //cadence: 0,0,-1
  const mapObj = {
    '012': [dtv[0], dtv[1], dtv[2]],
    '102': [dtv[0], dtv[1] - 1, dtv[2]],
    '021': [dtv[0], dtv[1], dtv[2]],
    '120': [dtv[0], dtv[1], dtv[2] - 1],
    '201': [dtv[0] + 1, dtv[1] - 1, dtv[2]],
    '210': [dtv[0] + 1, dtv[1], dtv[2]]
  };
  const returnValue = mapObj[voiceArr];
  console.log('rv:', returnValue)
  return returnValue;
};

const getVoices = (transposeValues, voiceArr, voices, keyObject, voicesLength, measure) => {
  const [va1, va2, va3] = voiceArr;
  const abcVoices = ['', '', ''];
  for (let index = 0; index < voicesLength; index += 1) { 
    abcVoices[0] += getSign(keyObject.accidentals[va1 - 1][index]);
    abcVoices[0] += transposeOctave(transposeValues[0], validateValue(voices[va1 - 1][index] + keyObject.t));
    abcVoices[0] += measure[index];
    abcVoices[1] += getSign(keyObject.accidentals[va2 - 1][index]);
    abcVoices[1] += transposeOctave(transposeValues[1], validateValue(voices[va2 - 1][index] + keyObject.t));
    abcVoices[1] += measure[index];    
    abcVoices[2] += getSign(keyObject.accidentals[va3 - 1][index]);
    abcVoices[2] += transposeOctave(transposeValues[2], validateValue(voices[va3 - 1][index] + keyObject.t));
    abcVoices[2] += measure[index];  
  } 
  return abcVoices;
}

const getBeginAtHelperArr = voiceLength => {
  const helpArr = [];
  helpArr.push(0);
  for (let index = 0; index < voiceLength; index++) {
    helpArr.push(index * 2);    
  }
  return helpArr;
}

const getVoicesWithLengthModifications = (transposeValues, voiceArr, voices, keyObject, voicesLength, measure, addProps) => {
  const [va1, va2, va3] = voiceArr;
  const [aVoice, bVoice, cVoice] = [[], [], []];
  for (let index = 0; index < voicesLength; index += 1) { 
    let aSign = getSign(keyObject.accidentals[va1 - 1][index]);
    aSign += transposeOctave(transposeValues[0], validateValue(voices[va1 - 1][index] + keyObject.t));
    aSign += measure[index];
    aVoice.push(aSign);
    let bSign = getSign(keyObject.accidentals[va2 - 1][index]);
    bSign += transposeOctave(transposeValues[1], validateValue(voices[va2 - 1][index] + keyObject.t));
    bSign += measure[index];    
    bVoice.push(bSign);
    let cSign = getSign(keyObject.accidentals[va3 - 1][index]);
    cSign += transposeOctave(transposeValues[2], validateValue(voices[va3 - 1][index] + keyObject.t));
    cSign += measure[index];
    cVoice.push(cSign);  
  }
  // implement partlength & partToBegin
  const abcVoices = ['', '', ''];
  const x = getBeginAtHelperArr(voicesLength)[addProps['partToBeginValues'][0]];
  const y = addProps['partLengthValues'][0] * 2;
  if((voicesLength - x) >= y) {
    abcVoices[0] = aVoice.slice(x, x + y);
    abcVoices[1] = bVoice.slice(x, x + y);
    abcVoices[2] = cVoice.slice(x, x + y);
  } else {
    abcVoices[0] = aVoice.slice(x);
    abcVoices[1] = bVoice.slice(x);
    abcVoices[2] = cVoice.slice(x);
  }
  if(addProps['resolveLastDissonance']) {
    console.log('0:', abcVoices[0])
    console.log('1:', abcVoices[1])
    console.log('2:', abcVoices[2])
  }
  return abcVoices;
}

const modelTemplates = {
  cadence: {
    modelKey: '',
    name: 'cadence',
    key: 'C',
    transposeValues: [0, 0, -1],
    voiceArrangement: [1, 2, 3],
    radioValue: 0,
    customDescription: "",
    showDescription: false,
    addProps: { 
      isFinal: [false, false],
      isBegin: [false, false],
      isDeceptiv: [false, false]
    }
  },
  circleOfFifths:  {
    modelKey: '',
    name: 'circleOfFifths',
    key: 'C',
    transposeValues: [0, 0, 0],
    voiceArrangement: [1, 2, 3],
    radioValue: 0,
    customDescription: "",
    showDescription: false,
    addProps: {
      partLengthValues: [4, 4],
      partToBeginValues: [1, 4],
      resolveLastDissonance: [false, false]
    }
  },
  circleOfFifthsLinear: {
    modelKey: '',
    name: 'circleOfFifthsLinear',
    key: 'C',
    transposeValues: [0, 0, -1],
    voiceArrangement: [1, 2, 3],
    customDescription: "",
    showDescription: false,
    addProps: {
      lastBassNoteUp: [false, false],
      partLengthValues: [4, 4],
      partToBeginValues: [1, 4]
    }
  },
  fiveSixConsecutive: {
    modelKey: '',
    name: 'fiveSixConsecutive',
    key: 'C',
    transposeValues: [0, 0, -1],
    voiceArrangement: [1, 2, 3],
    customDescription: "",
    showDescription: false,
    addProps: {
      partLengthValues: [6, 6],
      partToBeginValues: [1, 6]
    }
  },
  lowerFiveModulation: {
    modelKey: '',
    name: 'lowerFiveModulation',
    key: 'C',
    transposeValues: [0, 0, -1],
    voiceArrangement: [1, 2, 3],
    customDescription: "",
    chkbDisabled: false,
    showDescription: false,
    addProps: {
      changeMode: [false, false]
    }
  }
}
 
const ModelHelper = {
  meta,
  transposeOctave,
  validateValue,
  getSign,
  updateTransposeValues,
  getModelTemplate: modelName => modelTemplates[modelName],
  getVoices,
  getVoicesWithLengthModifications
};

export default ModelHelper;