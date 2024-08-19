import ModelHelper from '../model-helper.js';

const _keyObj = {
  'E': { key: 'E', t: -5, accidentals: [[0, 1, 1, 0, 0, 0, 0, 1], [1, 1, 1, 1, 0, 0, 1, 0], [0, 0, 1, 1, 1, 1, 0, 0]] },
  'C#m': { key: 'C#m', t: -7, accidentals: [[1, 0, 0, 1, 1, 1, 1, 0], [0, 0, 1, 1, 1, 1, 1, 1], [1, 1, 0, 0, 0, 1, 1, 1]] },
  'A': { key: 'A', t: -2, accidentals: [[0, 1, 1, 0, 0, 0, 0, 1], [1, 1, 0, 0, 0, 0, 1, 0], [0, 0, 1, 1, 1, 0, 0, 0]] },
  'F#m': { key: 'F#m', t: -4, accidentals: [[1, 0, 0, 1, 1, 0, 0, 0], [0, 0, 1, 1, 1, 1, 1, 0], [1, 0, 0, 0, 0, 1, 1, 1]] },
  'D': { key: 'D', t: -6, accidentals: [[0, 0, 0, 0, 0, 0, 0, 1], [1, 1, 0, 0, 0, 0, 1, 0], [0, 0, 1, 1, 0, 0, 0, 0]] },
  'Bm': { key: 'Bm', t: -1, accidentals: [[1, 0, 0, 1, 1, 0, 0, 0], [0, 0, 1, 1, 0, 0, 1, 0], [0, 0, 0, 0, 0, 1, 1, 0]] },
  'G': { key: 'G', t: -3, accidentals: [[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 1, 0], [0, 0, 1, 0, 0, 0, 0, 0]] },
  'Em': { key: 'Em', t: -5, accidentals: [[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 1, 1, 0, 0, 1, 0], [0, 0, 0, 0, 0, 1, 0, 0]] },
  'C': { key: 'C', t: -7, accidentals: [[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]] },
  'Am': { key: 'Am', t: -2, accidentals: [[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0]] },
  'F': { key: 'F', t: -4, accidentals: [[0, 0, 0, 0, 0, -1, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, -1, 0, 0, 0, 0, 0, 0]] },
  'Dm': { key: 'Dm', t: -6, accidentals: [[0, -1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 1, 0], [0, 0, 0, 0, -1, 0, 0, 0]] },
  'Bb': { key: 'Bb', t: -1, accidentals: [[0, 0, 0, 0, 0, -1, 0, 0], [0, 0, 0, 0, -1, -1, 0, -1], [-1, -1, 0, 0, 0, 0, 0, -1]] },
  'Gm': { key: 'Gm', t: -3, accidentals: [[0, -1, 0, 0, 0, 0, 0, -1], [-1, -1, 0, 0, 0, 0, 1, 0], [0, 0, 0, -1, -1, 0, 0, 0]] },
  'Eb': { key: 'Eb', t: -5, accidentals: [[-1, 0, 0, -1, 0, -1, 0, 0], [0, 0, 0, 0, -1, -1, 0, -1], [-1, -1, 0, 0, 0, 0, -1, -1]] },
  'Cm': { key: 'Cm', t: -7, accidentals: [[0, -1, 0, 0, 0, 0, 0, -1], [-1, -1, 0, 0, 0, 0, '=', 0], [0, 0, -1, -1, -1, 0, 0, 0]] }, 
  'Ab': { key: 'Ab', t: -2, accidentals: [[-1, 0, 0, -1, 0, -1, 0, 0], [0, 0, -1, -1, -1, -1, 0, -1], [-1, -1, 0, 0, 0, -1, -1, -1]] },
  'Fm': { key: 'Fm', t: -4, accidentals: [[0, -1, 0, 0, 0, -1, 0, -1], [-1, -1, 0, 0, 0, 0, '=', 0], [0, -1, -1, -1, -1, 0, 0, 0]] }
};

function _getKeyObject(change) {  
  return _keyObj[change ?? 'C'];
}

function getModelKeys() {
  return Object.keys(_keyObj);
}

const getOptions = change => {
  const modelTemplate = ModelHelper.getModelTemplate('circleOfFifths');
  if(change) {
    modelTemplate.key = change;
  }
  return modelTemplate;
};

const getVoices = circleOfFifthsOptions => {
  const voicesLength = 8;
  const measure = [' | ', ' ', ' | ', ' ', ' | ', ' ', ' | ', ' '];
  const voices = [[11, 12, 12, 11, 11, 10, 10, 9], [9, 9, 8, 8, 7, 7, 6, 7], [0, 3, -1, 2, -2, 1, -3, 0]];
  const options = circleOfFifthsOptions ?? getOptions();
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
  const x = [0, 0, 2, 4, 6][options.addProps['partToBeginValues'][0]];
  const y = options.addProps['partLengthValues'][0] * 2;
  if((8 - x) >= y) {
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
  return ['x | x x | x x | x x | x', 'x | x x | x x | x x | x', 'x | x x | x x | x x | x'];
};

const getExample = () => {
  return ['f- | f e2 d- | -d c d3/2', 'z | B2 A2 | G2 F z/', 'A,/D,/ | G,/F,/G,/C,/ F,/E,/F,/B,,/ | E,/F,//G,// A,/A,,/ D,/E,/,F,/]'];
};

const CircleOfFifths = {
  getDefaultOptions: getOptions,
  getVoices,
  getModelKeys,
  getEmptyStaff: getStaff,
  getMusicExample: getExample
};

export default CircleOfFifths;
