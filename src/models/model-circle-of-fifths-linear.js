import ModelHelper from '../model-helper.js';

const _keyObj = {
  'Ab': { key: 'Ab', t: 2, accidentals: [[0, 0, -1, -1, -1, -1, 0, -1], [-1, -1, 0, 0, 0, -1, 0, 0], [-1, 0, 0, -1, 0, -1, -1, -1]] },
  'Fm': { key: 'Fm', t: 0, accidentals: [[-1, -1, 0, 0, 0, 0, '=', 0], [0, -1, 0, -1, 0, 0, 0, -1], [0, -1, -1, 0, -1, -1, 0, 0]] },
  'Eb': { key: 'Eb', t: 2, accidentals: [[0, 0, 0, 0, -1, -1, 0, -1], [-1, -1, 0, 0, 0, 0, 0, 0], [-1, 0, 0, -1, 0, -1, -1, -1]] },
  'Cm': { key: 'Cm', t: 0, accidentals: [[-1, -1, 0, 0, 0, 0, '=', 0], [0, 0, 0, -1, 0, 0, 0, -1], [0, -1, -1, 0, -1, 0, 0, 0]] },
  'Bb': { key: 'Bb', t: -1, accidentals: [[0, 0, 0, 0, -1, -1, 0, -1], [0, -1, 0, 0, 0, 0, 0, 0], [-1, 0, 0, 0, 0, -1, 0, -1]] }, 
  'Gm': { key: 'Gm', t: 4, accidentals: [[-1, 0, 0, 0, 0, 0, 1, 0], [0, 0, 0, -1, -1, 0, 0, -1], [0, -1, 0, 0, -1, 0, 0, 0]] },
  'F': { key: 'F', t: 3, accidentals: [[0, 0, 0, 0, 0, 0, 0, 0], [0, -1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, -1, 0, 0]] },
  'Dm': { key: 'Dm', t: 1, accidentals: [[0, 0, 0, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, -1, 0, 0, -1, 0, 0, 0]] },
  'E': { key: 'E', t: 2, accidentals: [[1, 1, 1, 1, 0, 0, 1, 0], [0, 0, 0, 1, 1, 1, 1, 1], [0, 1, 1, 0, 1, 0, 0, 0]] },
  'C#m': { key: 'C#m', t: 0, accidentals: [[0, 0, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 0, 0, 1, 0], [1, 1, 0, 0, 0, 1, 1, 1]] },
  'A': { key: 'A', t: -2, accidentals: [[1, 1, 0, 0, 0, 0, 1, 0], [0, 0, 0, 1, 1, 0, 0, 1], [0, 1, 1, 0, 1, 0, 0, 0]] },
  'F#m': { key: 'F#m', t: 3, accidentals: [[0, 0, 1, 1, 0, 0, 1, 0], [1, 0, 0, 0, 0, 1, 1, 0], [0, 0, 0, 1, 0, 0, 1, 0]] },
  'D': { key: 'D', t: 1, accidentals: [[1, 1, 0, 0, 0, 0, 1, 0], [0, 0, 0, 1, 1, 0, 0, 1], [0, 0, 1, 0, 0, 0, 0, 0]] },
  'Bm': { key: 'Bm', t: -1, accidentals: [[0, 0, 1, 1, 0, 0, 1, 0], [1, 0, 0, 0, 0, 1, 1, 0], [0, 0, 0, 1, 0, 0, 1, 0]] },
  'G': { key: 'G', t: 4, accidentals: [[0, 0, 0, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 1, 0, 0, 0, 0, 0]] },
  'Em': { key: 'Em', t: 2, accidentals: [[0, 0, 1, 1, 0, 0, 1, 0], [0, 0, 0, 0, 0, 1, 1, 0], [0, 0, 0, 0, 0, 1, 0, 0]] },
  'Am': { key: 'Am', t: -2, accidentals: [[0, 0, 0, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]] },
  'C': { key: 'C', t: 0, accidentals: [[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]] }
}

function _getKeyObject(change) {  
  return _keyObj[change ?? 'C'];
}

function getModelKeys() {
  return Object.keys(_keyObj);
}

const getOptions = change => {
  return {
    key: change || 'C',
    transposeValues: [0, 0, -1],
    voiceArrangement: [1, 2, 3],
    lastBassNoteUp: false
  };
};

const getVoices = fifthsCircleLinearOptions => {
  const voicesLength = 8;
  const measure = [' | ', ' ', ' | ', ' ', ' | ', ' ', ' | ', ' '];
  const voices = [[9, 9, 8, 8, 7, 7, 6, 7], [4, 3, 3, 2, 2, 1, 1, 2], [0, -2, -1, -3, -2, -4, -3, -7]];
  const options = fifthsCircleLinearOptions ?? getOptions();
  options.lastBassNoteUp && (voices[2][7] = 0);
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
  return ['x | x x | x x | x x | x', 'x | x x | x x | x x | x', 'x | x x | x x | x x | x'];
};

const getExample = () => {
  return ['f- | f e2 d- | -d c d3/2', 'z | B2 A2 | G2 F z/', 'A,/D,/ | G,/F,/G,/C,/ F,/E,/F,/B,,/ | E,/F,//G,// A,/A,,/ D,/E,/,F,/]'];
};

const CircleOfFifthsLinear = {
  getDefaultOptions: getOptions,
  getVoices,
  getModelKeys,
  getEmptyStaff: getStaff,
  getMusicExample: getExample
};

export default CircleOfFifthsLinear;