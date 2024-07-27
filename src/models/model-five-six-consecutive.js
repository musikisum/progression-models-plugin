import ModelHelper from '../model-helper.js';

const _keyObj = {
  'E': { key: 'E', t: 2, accidentals: [[0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1], [1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 0], [1, 0, 1, 1, '^^', 1, 1, 0, 1, 0, 1, 1]] },
  'C#m': { key: 'E', t: 2, accidentals: [[0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1], [1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 0], [1, 0, 1, 1, '\'\'', 1, 1, 0, 1, 0, 1, 1]] },
  'A': { key: 'A', t: -2, accidentals: [[0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1], [0, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 0], [1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1]] },
  'F#m': { key: 'A', t: -2, accidentals: [[0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1], [0, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 0], [1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1]] },  
  'D': { key: 'D', t: 1, accidentals: [[0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1], [0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0], [1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0]] },
  'Bm': { key: 'D', t: 1, accidentals: [[0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1], [0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0], [1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0]] },  
  'G': { key: 'G', t: 4, accidentals: [[0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0], [1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0]] },
  'Em': { key: 'G', t: 4, accidentals: [[0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0], [1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0]] },
  'C': { key: 'C', t: 0, accidentals: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0], [0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0]] },  
  'Am': { key: 'C', t: 0, accidentals: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0], [0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0]] },
  'F': { key: 'F', t: 3, accidentals: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 1, 0, 1, 0, 0, -1, 0, 0, 1, 0]] },
  'Dm': { key: 'F', t: 3, accidentals: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 1, 0, 1, 0, 0, -1, '=', 0, 1, 0]] },
  'Bb': { key: 'Bb', t: -1, accidentals: [[0, 0, 0, 0, 0, 0, -1, -1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1], [0, -1, '=', 0, 1, 0, 0, -1, '=', 0, 1, 0]] },
  'Gm': { key: 'Bb', t: -1, accidentals: [[0, 0, 0, 0, 0, 0, -1, -1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1], [0, -1, '=', 0, 1, 0, 0, -1, '=', 0, 1, 0]] },
  'Eb': { key: 'Eb', t: 2, accidentals: [[-1, -1, 0, 0, 0, 0, -1, -1, 0, 0, 0, 0], [0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, -1], [0, -1, '=', 0, 1, 0, 0, -1, '=', -1, '=', 0]] },
  'Cm': { key: 'Eb', t: 2, accidentals: [[-1, -1, 0, 0, 0, 0, -1, -1, 0, 0, 0, 0], [0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, -1], [0, -1, '=', 0, 1, 0, 0, -1, '=', -1, '=', 0]] },
  'Ab': { key: 'Eb', t: -2, accidentals: [[-1, -1, 0, 0, 0, 0, -1, -1, -1, -1, 0, 0], [-1, 0, 0, -1, '=', -1, 0, 0, 0, 0, 0, -1], [0, -1, '=', -1, '=', 0, 0, -1, '=', -1, '=', 0]] },
  'Fm': { key: 'Eb', t: -2, accidentals: [[-1, -1, 0, 0, 0, 0, -1, -1, -1, -1, 0, 0], [-1, 0, 0, -1, '=', -1, 0, 0, 0, 0, 0, -1], [0, -1, '=', -1, '=', 0, 0, -1, '=', -1, '=', 0]] }
};

function _getKeyObject(change) {  
  return _keyObj[change ?? 'C'];
}

function getModelKeys() {
  return Object.keys(_keyObj);
}

const getOptions = change => {
  const modelTemplate = ModelHelper.getModelTemplate('fiveSixConsecutive');
  if(change) {
    modelTemplate.key = change;
  }
  return modelTemplate;
};

const getVoices = modelOptions => {
  const voicesLength = 12;
  const measure = [' | ', ' ', ' | ', ' ', ' | ', ' ', ' | ', ' ', ' | ', ' ', ' | ', ' '];
  const voices = [[4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9], [1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7], [-1, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5]];
  const options = modelOptions ?? getOptions();
  const [v1, v2, v3] = options.transposeValues;
  const voiceArr = options.voiceArrangement;
  const keyObject = _getKeyObject(options.key);
  
  const [aVoice, bVoice, cVoice] = [[], [], []];
  for (let index = 0; index < voicesLength; index += 1) { 
    let aSign = ModelHelper.getSign(keyObject.accidentals[voiceArr[0] - 1][index]);
    aSign += ModelHelper.transposeOctave(v1, ModelHelper.validateValue(voices[voiceArr[0] - 1][index] + keyObject.t));
    aSign += measure[index];
    aVoice.push(aSign);
    let bSign = ModelHelper.getSign(keyObject.accidentals[voiceArr[1] - 1][index]);
    bSign += ModelHelper.transposeOctave(v2, ModelHelper.validateValue(voices[voiceArr[1] - 1][index] + keyObject.t));
    bSign += measure[index];    
    bVoice.push(bSign);
    let cSign = ModelHelper.getSign(keyObject.accidentals[voiceArr[2] - 1][index]);
    cSign += ModelHelper.transposeOctave(v3, ModelHelper.validateValue(voices[voiceArr[2] - 1][index] + keyObject.t));
    cSign += measure[index];
    cVoice.push(cSign);  
  }
  // implement partlength & partToBegin
  const abcVoices = ['', '', ''];
  const x = [0, 0, 2, 4, 6, 8, 10][options.addProps['partToBeginValues'][0]];
  const y = options.addProps['partLengthValues'][0] * 2;
  if((12 - x) >= y) {
    abcVoices[0] = aVoice.slice(x, x + y);
    abcVoices[1] = bVoice.slice(x, x + y);
    abcVoices[2] = cVoice.slice(x, x + y);
  } else {
    abcVoices[0] = aVoice.slice(x);
    abcVoices[1] = bVoice.slice(x);
    abcVoices[2] = cVoice.slice(x);
  }

  return abcVoices;
};

const getStaff = () => {
  return ['x | x x | x x | x x | x x | x x | x ]', 'x | x x | x x | x x | x x | x x | x ]', 'x | x x | x x | x x | x x | x x | x ]'];
};

const FiveSixConsecutive = {
  getDefaultOptions: getOptions,
  getVoices,
  getModelKeys,
  getEmptyStaff: getStaff
};

export default FiveSixConsecutive;