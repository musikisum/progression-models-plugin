import ModelHelper from '../model-helper.js';

const _keyObj = {
  C: { key: 'C', t: 0, accidentals: [[0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]] },
  Am: { key: 'Am', t: -2, accidentals: [[0, 0, 0, 0, 0, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]] }
};

const _keyObjShort = {
  C: { key: 'C', t: 0, accidentals: [[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]] },
  Am: { key: 'Am', t: -2, accidentals: [[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 0]] }
};

function _getKeyObject(change) {  
  return _keyObj[change ?? 'C'];
}

function _getKeyObjectShort(change) {  
  return _keyObjShort[change ?? 'C'];
}

function getModelKeys() {
  return Object.keys(_keyObj);
}

const getOptions = change => {
  return {
    key: change || 'C',
    transposeValues: [0, 0, -1],
    voiceArrangement: [1, 2, 3],
    syncopation: true,
    partLength: 3,
  };
};

function _AdjustOptions(options) {
  switch(options.partLength) {
    case 1:
      options.voices = [[2, 5], [4, 3], [0, 3]];
      options.measure = [' | ', ' '];
      options._voicesLength = 2;
      break;
    case 2:
      if(options.syncopation) {
        options.voices = [[2, 5, 5, 4], [4, 4, 3, 6], [0, 3, 3, 2]];
        options.measure = [' | ', ' ', ' | ', ' '];     
        options._voicesLength = 4;  
      } else {
        options.voices = [[4, 5, 6, 7], [2, 3, 4, 5], [0, 3, 2, 5]]; 
        options.measure = [' | ', ' ', ' | ', ' '];
        options._voicesLength = 4;
      }      
      break; 
    default:
      if(options.syncopation) {
        options.voices = [[2, 5, 5, 5, 4, 7, 7, 7, 6, 9], [4, 4, 3, 6, 6, 6, 5, 8, 8, 7], [0, 3, 3, 2, 2, 5, 5, 4, 4, 7]];
        options.measure = [' | ', ' ', ' | ', ' ', ' | ', ' ', ' | ', ' ', ' | ', ' '];
        options._voicesLength = 10;
      } else {
        options.voices = [[4, 5, 6, 7, 8, 9], [2, 3, 4, 5, 6, 7], [0, 3, 2, 5, 4, 7]];
        options.measure = [' | ', ' ', ' | ', ' ', ' | ', ' '];
        options._voicesLength = 6;
      }      
      break;
  }
  return options;
}

const getVoices = sevenSixStewiseUpOptions => {
  const options = _AdjustOptions(sevenSixStewiseUpOptions || getOptions());
  const voicesLength = options._voicesLength;
  const syncopation = options.syncopation;
  const measure = options.measure;
  const voices = options.voices;
  const keyObject = syncopation ? _getKeyObject(options.key) : _getKeyObjectShort(options.key);
  const [v1, v2, v3] = options.transposeValues;
  const voiceArr = options.voiceArrangement;

  const abcVoices = ['', '', ''];
  for (let index = 0; index < voicesLength; index += 1) {
    abcVoices[0] += ModelHelper.getSign(keyObject.accidentals[voiceArr[0] - 1][index]);
    abcVoices[0] += ModelHelper.transposeOctave(v1, ModelHelper.validateValue(voices[voiceArr[0] - 1][index] + keyObject.t));
    abcVoices[0] += measure[index];
    abcVoices[1] += ModelHelper.getSign(keyObject.accidentals[voiceArr[1] - 1][index]);
    abcVoices[1] += ModelHelper.transposeOctave(v2, ModelHelper.validateValue(voices[voiceArr[1] - 1][index] + keyObject.t));
    abcVoices[1] += measure[index];    
    abcVoices[2] += ModelHelper.getSign(keyObject.accidentals[voiceArr[2] - 1][index]);
    abcVoices[2] += ModelHelper.transposeOctave(v3, ModelHelper.validateValue(voices[voiceArr[2] - 1][index] + keyObject.t));
    abcVoices[2] += measure[index];  
  }
  return abcVoices;
};

const getStaff = () => {
  return ['x | x x | x x | x x | x x | x', 'x | x x | x x | x x | x x | x', 'x | x x | x x | x x | x x | x'];
};

const getExample = () => {
  return ['', '', '']; 
};

const ParallismusUp = {
  getDefaultOptions: getOptions,
  getVoices,
  getModelKeys,
  getEmptyStaff: getStaff,
  getMusicExample: getExample
};

export default ParallismusUp;