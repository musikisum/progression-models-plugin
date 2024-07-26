import ModelHelper from '../model-helper.js';

const _keyObj = {  
  'E': { key: 'E', t: 2, accidentals: [[1, 1, 1, 1], [0, 0, 1, 0], [1, 0, 0, 0]] },  
  'C#m': { key: 'C#m', t: 0, accidentals: [[0, 1, 1, 0], [1, 1, 1, 1], [0, 1, 1, 1]] },
  'A': { key: 'A', t: -2, accidentals: [[1, 0, 0, 1], [0, 0, 1, 0], [1, 0, 0, 0]] },  
  'F#m': { key: 'F#m', t: 3, accidentals: [[0, 1, 1, 0], [1, 1, 1, 1], [0, 0, 1, 1]] },
  'D': { key: 'D', t: 1, accidentals: [[1, 0, 0, 1], [0, 0, 1, 0], [1, 0, 0, 0]] },  
  'Bm': { key: 'Bm', t: -1, accidentals: [[0, 1, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0]] },
  'G': { key: 'G', t: 4, accidentals: [[0, 0, 0, 0], [0, 0, 1, 0], [0, 0, 0, 0]] },
  'Em': { key: 'Em', t: 2, accidentals: [[0, 1, 1, 0], [0, 0, 1, 0], [0, 0, 0, 0]] },
  'C': { key: 'C', t: 0, accidentals: [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]] },
  'Am': { key: 'Am', t: -2, accidentals: [[0, 0, 0, 0], [0, 0, 1, 0], [0, 0, 0, 0]] },
  'F': { key: 'F', t: 3, accidentals: [[0, 0, 0, 0], [0, 0, 0, 0], [0, -1, 0, 0]] },
  'Dm': { key: 'Dm', t: 1, accidentals: [[0, 0, 0, 0], [0, 0, 1, 0], [0, 0, 0, 0]] },
  'Bb': { key: 'Bb', t: -1, accidentals: [[0, 0, 0, -1], [-1, -1, 0, -1], [0, -1, 0, -1]] },  
  'Gm': { key: 'Gm', t: 4, accidentals: [[-1, 0, 0, -1], [0, 0, 1, 0], [-1, 0, 0, 0]] },
  'Eb': { key: 'Eb', t: 2, accidentals: [[0, 0, 0, 0], [-1, -1, 0, -1], [0, -1, -1, -1]] },  
  'Cm': { key: 'Cm', t: 0, accidentals: [[-1, 0, 0, -1], [0, 0, '=', 0], [-1, 0, 0, 0]] },
  'Ab': { key: 'Ab', t: -2, accidentals: [[0, -1, 0, 0], [-1, -1, 0, -1], [0, -1, -1, -1]] },  
  'Fm': { key: 'Fm', t: 3, accidentals: [[-1, 0, 0, -1], [0, 0, '=', 0], [-1, -1, 0, 0]] }
};

function _getKeyObject(change) {  
  return _keyObj[change];
}

function getModelKeys() {
  return Object.keys(_keyObj);
}

const getOptions = change => {
  const modelTemplate = ModelHelper.getModelTemplate('cadence');
  if(change) {
    modelTemplate.key = change;
  }
  return modelTemplate;
};

const getVoices = cadenceOptions => {
  const voicesLength = 4;
  const measure = [' | ', ' ', ' | ', ' '];
  const voices = [[9, 8, 8, 9], [7, 7, 6, 7], [2, 3, 4, 0]];
  const options = cadenceOptions ?? getOptions();
  options.addProps['isFinal'] && (voices[0] = [9, 8, 8, 7]);
  options.addProps['isBegin'] && (voices[2] = [0, 3, 4, 0]);
  if(options.addProps['isDeceptiv']) {
    voices[0] = [9, 8, 8, 7];
    voices[2] = [2, 3, 4, 5];
    options.addProps['isFinal'] = false;
    options.addProps['isBegin'] = false;
  }
  const [v1, v2, v3] = options.transposeValues;
  const voiceArr = options.voiceArrangement;
  const keyObject = _getKeyObject(options.key);
  
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
  return ['x | x x | x]', 'x | x x | x]', 'x | x x | x]'];
};

const Cadence = {
  getDefaultOptions: getOptions,
  getVoices,
  getEmptyStaff: getStaff,
  getModelKeys
};

export default Cadence;