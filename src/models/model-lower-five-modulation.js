import ModelHelper from '../model-helper.js';

function _getKeyObject(change) {
  switch (change) {
    case 'Ab':
      return { key: 'Ab', t: -2, accidentals: [[0, -1, 0, -1, -1, -1, 0, -1], [-1, -1, -1, -1, 0, -1, -1, 0], [-1, -1, 0, 0, -1, -1, 0, -1]] };
    case 'Fm':
      return { key: 'Fm', t: 3, accidentals: [[-1, 0, 0, 0, -1, -1, '=', -1], [0, 0, -1, -1, -1, 0, 0, -1], [0, 0, 0, '=', -1, 0, 0, -1]] };
    case 'Eb':
      return { key: 'Eb', t: 2, accidentals: [[0, 0, 0, -1, -1, -1, 0, -1], [-1, -1, -1, -1, 0, -1, -1, 0], [-1, -1, 0, 0, -1, 0, 0, -1]] };
    case 'Cm':
      return { key: 'Cm', t: 0, accidentals: [[-1, 0, 0, 0, 0, 0, '=', 0], [0, 0, -1, -1, -1, 0, 0, -1], [0, 0, 0, '=', 0, 0, 0, 0]] };
    case 'Bb':
      return { key: 'Bb', t: -1, accidentals: [[0, 0, 0, -1, -1, -1, 0, -1], [-1, -1, -1, -1, 0, 0, 0, 0], [-1, 0, 0, 0, -1, -1, -1, -1]] };
    case 'Gm':
      return { key: 'Gm', t: -3, accidentals: [[-1, 0, 0, 0, 0, 0, '=', 0], [0, 0, '=', '=', -1, 0, 0, -1], [0, 0, 0, '=', 0, 0, 0, 0]] };
    case 'F':
      return { key: 'F', t: 3, accidentals: [[0, 0, 0, 0, -1, -1, 0, -1], [0, 0, -1, -1, 0, 0, 0, 0], [0, 0, 0, 0, -1, 0, 0, -1]] };
    case 'Dm':
      return { key: 'Dm', t: 1, accidentals: [[0, 0, 0, 0, 0, 0, 1, 0], [0, 0, '=', '=', -1, 0, 0, -1], [0, 0, 0, 1, 0, 0, 0, 0]] };
    case 'E':
      return { key: 'E', t: 2, accidentals: [[1, 1, 0, 0, 0, 0, 1, 0], [0, 0, '=', '=', 1, 0, 0, 1], [0, 0, 0, 1, 0, 0, 0, 0]] };
    case 'C#m':
      return { key: 'C#m', t: 0, accidentals: [[0, 1, 0, 1, 1, 1, 1, 1], [1, 1, '=', '=', 0, 1, 1, 0], [1, 1, 0, 1, 1, 1, 1, 1]] };
    case 'A':
      return { key: 'A', t: -2, accidentals: [[1, 0, 0, 0, 0, 0, 1, 0], [0, 0, '=', '=', 1, 0, 0, 1], [0, 0, 0, 1, 0, 0, 0, 0]] };
    case 'F#m':
      return { key: 'F#m', t: 3, accidentals: [[0, 1, 0, 1, 0, 0, 1, 0], [1, 1, '=', '=', 0, 1, 1, 0], [1, 1, 0, 1, 0, 1, 1, 0]] };
    case 'D':
      return { key: 'D', t: 1, accidentals: [[1, 0, 0, 0, 0, 0, 1, 0], [0, 0, '=', '=', 0, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0, 0]] };
    case 'Bm':
      return { key: 'Bm', t: 2, accidentals: [[0, 1, 0, 0, 0, 0, 1, 0], [0, 0, '=', '=', 0, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0, 0]] };
    case 'G':
      return { key: 'G', t: -3, accidentals: [[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, '=', '=', 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]] };
    case 'Em':
      return { key: 'Em', t: 2, accidentals: [[0, 1, 0, 0, 0, 0, 1, 0], [0, 0, '=', '=', 0, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0, 0]] };
    case 'Am':
      return { key: 'Am', t: -2, accidentals: [[0, 0, 0, 0, 0, 0, 1, 0], [0, 0, '=', '=', 0, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0, 0]] };
    default:
      return { key: 'C', t: 0, accidentals: [[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, -1, -1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]] };
  }
}

const getOptions = change => {
  return {
    key: change || 'F',  
    voicesLength: 8,
    measure: [' | ', ' ', ' | ', ' ', ' | ', ' ', ' | ', ' '],
    transposeValues: [0, 0, -1],
    voiceArrangement: [1, 2, 3],
    changeMode: false
  };
};

const getVoices = lowerFifthModulationOptions => {

  const voices = [[9, 8, 8, 7, 10, 10, 9, 10], [7, 7, 6, 6, 5, 4, 4, 5], [0, 4, 4, 2, 3, 0, 0, 3]];
  const options = lowerFifthModulationOptions || getOptions();
  const [v1, v2, v3] = options.transposeValues;
  const voiceArr = options.voiceArrangement;
  const keyObject = _getKeyObject(options.key);
  const flatValues = ['C', 'F', 'Dm', 'Bb', 'Gm', 'Eb', 'Cm', 'Ab', 'Fm'];

  if(lowerFifthModulationOptions.changeMode) {
    if (flatValues.includes(keyObject.key)) {
      keyObject.accidentals[1][4] = keyObject.accidentals[1][4] === -1 ? 0 : -1;
      keyObject.accidentals[1][7] = keyObject.accidentals[1][7] === -1 ? 0 : -1;  
    } else {
      keyObject.accidentals[1][4] = keyObject.accidentals[1][4] === 1 ? 0 : 1;
      keyObject.accidentals[1][7] = keyObject.accidentals[1][7] === 1 ? 0 : 1; 
    }
  }

  const abcVoices = ['', '', ''];
  for (let index = 0; index < options.voicesLength; index += 1) {
    abcVoices[0] += ModelHelper.getSign(keyObject.accidentals[voiceArr[0] - 1][index]);
    abcVoices[0] += ModelHelper.transposeOctave(v1, ModelHelper.validateValue(voices[voiceArr[0] - 1][index] + keyObject.t));
    abcVoices[0] += options.measure[index];
    abcVoices[1] += ModelHelper.getSign(keyObject.accidentals[voiceArr[1] - 1][index]);
    abcVoices[1] += ModelHelper.transposeOctave(v2, ModelHelper.validateValue(voices[voiceArr[1] - 1][index] + keyObject.t));
    abcVoices[1] += options.measure[index];
    abcVoices[2] += ModelHelper.getSign(keyObject.accidentals[voiceArr[2] - 1][index]);
    abcVoices[2] += ModelHelper.transposeOctave(v3, ModelHelper.validateValue(voices[voiceArr[2] - 1][index] + keyObject.t));
    abcVoices[2] += options.measure[index];  
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
  getEmptyStaff: getStaff,
  getMusicWxample: getExample
};
  
export default LowerFiveModulation;