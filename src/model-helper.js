import ModelProvider from './model-provider.js';

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

// Replace an number, represent a cromatic half tone, to an abc.js sign.
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

// Handle voice exchanges 
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
  const returnValue = mapObj[voiceArr];
  return returnValue;
};

// Hack to change the beginning of the upper five modulation to a 5-6 consecutive.
const add56Consecutive = (voiceIndex, voiceArr, abcVoices, keyObject) => {
  const specialIssues = ['C#m', 'F#m', 'Eb', 'Ab'];
  const index = voiceArr.indexOf(voiceIndex);
  const modVoice = abcVoices[index];
  const [firstElem, ...rest] = modVoice.split('|');
  let octaveModifications, firstSign, secondSign, tone;
  if (specialIssues.indexOf(keyObject.key) < 0) {
    firstSign = '';
    secondSign = '';
    tone = firstElem.trim().charAt(0);
    octaveModifications = firstElem.trim().slice(1);
  } else {
    firstSign = firstElem.trim().charAt(0) === '^' ? '^' : '';
    secondSign  = firstElem.trim().charAt(0);
    tone = firstElem.trim().charAt(1);
    octaveModifications = firstElem.trim().slice(2);
  }
  const nextTone = diatonicScale[diatonicScale.indexOf(tone) + 1];
  const newFirstElem = `${firstSign}${nextTone}${octaveModifications}/ ${secondSign}${tone}${octaveModifications}/ | ${rest.join('|')}`;
  abcVoices[index] = newFirstElem;
}

// Create the abc string representation of a voice model 
const getVoices = (transposeValues, voiceArr, voices, keyObject, voicesLength, measure, begin65, prinner) => {
  const [va1, va2, va3] = voiceArr; // Contains the voice numbers 1, 2 and 3
  let abcVoices = ['', '', ''];
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

  // Begin of the upper five modulation with 6-5 motion
  begin65 && add56Consecutive(2, voiceArr, abcVoices, keyObject);
  if (prinner) {
    abcVoices = abcVoices.reduce((akku, elem, index) => {
      const str = elem.split(' ');
      str.splice(2, 1);        
      if (index < 2) {
        str.splice(3, 2);
      } else {
        str.splice(3, 1);
        str.splice(4, 1);
      }
      akku.push(str.join(' '));
      return akku;
    }, []);
  }
  return abcVoices;
}

// Create an array to terminate start sections of a voice model
const getBeginAtHelperArr = voiceLength => {
  const helpArr = [];
  helpArr.push(0);
  for (let index = 0; index < voiceLength; index++) {
    helpArr.push(index * 2);    
  }
  return helpArr;
}

// Create the abc string representation of a voice model with modifications of the length
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
  const helpArr = getBeginAtHelperArr(voicesLength);
  const x = helpArr[addProps['partToBeginValues'][0]];
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
  return abcVoices;
}
 
const ModelHelper = {
  transposeOctave,
  validateValue,
  getSign,
  updateTransposeValues,
  getVoices,
  getVoicesWithLengthModifications
};

export default ModelHelper;
