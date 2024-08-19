import ModelHelper from '../model-helper.js';

const _keyObj = {
  'E': { key: 'E', t: 2, accidentals: [[1, 1, 0, 0, 0, 0, 1, 0], [0, 0, '=', '=', 1, 0, 0, 1], [0, 0, 0, 1, 0, 0, 0, 0]] },
  'C#m': { key: 'C#m', t: 0, accidentals: [[0, 1, 0, 1, 1, 1, 1, 1], [1, 1, '=', '=', 0, 1, 1, 0], [1, 1, 0, 1, 1, 1, 1, 1]] },
  'A': { key: 'A', t: -2, accidentals: [[1, 0, 0, 0, 0, 0, 1, 0], [0, 0, '=', '=', 1, 0, 0, 1], [0, 0, 0, 1, 0, 0, 0, 0]] },
  'F#m': { key: 'F#m', t: 3, accidentals: [[0, 1, 0, 1, 0, 0, 1, 0], [1, 1, '=', '=', 0, 1, 1, 0], [1, 1, 0, 1, 0, 1, 1, 0]] },
  'D': { key: 'D', t: 1, accidentals: [[1, 0, 0, 0, 0, 0, 1, 0], [0, 0, '=', '=', 0, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0, 0]] },
  'Bm': { key: 'Bm', t: 2, accidentals: [[0, 1, 0, 0, 0, 0, 1, 0], [0, 0, '=', '=', 0, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0, 0]] },
  'G': { key: 'G', t: -3, accidentals: [[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, '=', '=', 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]] },
  'Em': { key: 'Em', t: 2, accidentals: [[0, 1, 0, 0, 0, 0, 1, 0], [0, 0, '=', '=', 0, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0, 0]] },
  'C': { key: 'C', t: 0, accidentals: [[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, -1, -1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]] },
  'Am': { key: 'Am', t: -2, accidentals: [[0, 0, 0, 0, 0, 0, 1, 0], [0, 0, '=', '=', 0, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0, 0]] },
  'F': { key: 'F', t: 3, accidentals: [[0, 0, 0, 0, -1, -1, 0, -1], [0, 0, -1, -1, 0, 0, 0, 0], [0, 0, 0, 0, -1, 0, 0, -1]] },
  'Dm': { key: 'Dm', t: 1, accidentals: [[0, 0, 0, 0, 0, 0, 1, 0], [0, 0, '=', '=', -1, 0, 0, -1], [0, 0, 0, 1, 0, 0, 0, 0]] },
  'Bb': { key: 'Bb', t: -1, accidentals: [[0, 0, 0, -1, -1, -1, 0, -1], [-1, -1, -1, -1, 0, 0, 0, 0], [-1, 0, 0, 0, -1, -1, -1, -1]] },
  'Gm': { key: 'Gm', t: -3, accidentals: [[-1, 0, 0, 0, 0, 0, '=', 0], [0, 0, '=', '=', -1, 0, 0, -1], [0, 0, 0, '=', 0, 0, 0, 0]] },
  'Eb': { key: 'Eb', t: 2, accidentals: [[0, 0, 0, -1, -1, -1, 0, -1], [-1, -1, -1, -1, 0, -1, -1, 0], [-1, -1, 0, 0, -1, 0, 0, -1]] },
  'Cm': { key: 'Cm', t: 0, accidentals: [[-1, 0, 0, 0, 0, 0, '=', 0], [0, 0, -1, -1, -1, 0, 0, -1], [0, 0, 0, '=', 0, 0, 0, 0]] },
  'Ab': { key: 'Ab', t: -2, accidentals: [[0, -1, 0, -1, -1, -1, 0, -1], [-1, -1, -1, -1, 0, -1, -1, 0], [-1, -1, 0, 0, -1, -1, 0, -1]] },
  'Fm': { key: 'Fm', t: 3, accidentals: [[-1, 0, 0, 0, -1, -1, '=', -1], [0, 0, -1, -1, -1, 0, 0, -1], [0, 0, 0, '=', -1, 0, 0, -1]] }
};

function _getKeyObject(change) {  
  return _keyObj[change];
}

function getModelKeys() {
  return Object.keys(_keyObj);
}

const getOptions = change => {
  const modelTemplate = ModelHelper.getModelTemplate('lowerFiveModulation');
  if(change) {
    modelTemplate.key = change;
  }
  return modelTemplate;
};

const getVoices = lowerFifthModulationOptions => {
  const voicesLength = 8;
  const measure = [' | ', ' ', ' | ', ' ', ' | ', ' ', ' | ', ' '];
  const voices = [[9, 8, 8, 7, 10, 10, 9, 10], [7, 7, 6, 6, 5, 4, 4, 5], [0, 4, 4, 2, 3, 0, 0, 3]];
  const options = lowerFifthModulationOptions || getOptions();
  const [v1, v2, v3] = options.transposeValues;
  const voiceArr = options.voiceArrangement;
  const changeMode = options.addProps['changeMode'][0];
  const keyObject = _getKeyObject(options.key);

  switch (options.key) {
    case 'Cm':
    case 'Gm':
    case 'Dm':
      keyObject.accidentals[1][4] = changeMode ? 0 : -1;
      keyObject.accidentals[1][7] = changeMode ? 0 : -1;
      break;
    case 'C':
    case 'G':
    case 'D':
      keyObject.accidentals[1][4] = changeMode ? -1 : 0;
      keyObject.accidentals[1][7] = changeMode ? -1 : 0;
      break;
    case 'Am':
    case 'Em':
    case 'Bm':
    case 'F#m':
      keyObject.accidentals[1][4] = changeMode ? 1 : 0;
      keyObject.accidentals[1][7] = changeMode ? 1 : 0;
      break;
    case 'A':
    case 'E':
      keyObject.accidentals[1][4] = changeMode ? 0 : 1;
      keyObject.accidentals[1][7] = changeMode ? 0 : 1;
      break;
    default:
      console.log('disable checkbox');      
      break;
  }

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
  return ['x | x x | x x | x x | x]', 'x | x x | x x | x x | x]', 'x | x x | x x | x x | x]'];
};

const getExample = () => {
  return ['', '', '']; 
};

const LowerFiveModulation = {
  getDefaultOptions: getOptions,
  getVoices,
  getModelKeys,
  getEmptyStaff: getStaff,
  getMusicExample: getExample
};
  
export default LowerFiveModulation;