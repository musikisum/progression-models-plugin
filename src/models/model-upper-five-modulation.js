import ModelHelper from '../model-helper.js';

function _getKeyObject(change) {
  switch (change) {
    case 'Ab':
      return { key: 'Ab', t: -2, accidentals: [[0, -1, 0, -1, 0, 0], [-1, 0, -1, -1, 0, -1], [-1, -1, 0, 0, -1, -1]] };   
    case 'Fm':
      return { key: 'Fm', t: -4, accidentals: [[-1, 0, 0, 0, 0, -1], [0, '=', 0, 0, '=', 0], [0, 0, -1, 0, 0, 0]] };
    case 'Eb':
      return { key: 'Eb', t: -5, accidentals: [[0, 0, 0, -1, 0, 0], [-1, '=', -1, -1, '=', -1], [-1, -1, 0, 0, 0, -1]] };   
    case 'Cm':
      return { key: 'Cm', t: 0, accidentals: [[-1, 0, 0, 0, 0, -1], [0, 1, 0, 0, 1, 0], [0, 0, -1, 0, 0, 0]] };
    case 'Bb':
      return { key: 'Bb', t: -1, accidentals: [[0, 0, 0, -1, 0, 0], [0, 0, 0, 0, 0, 0], [-1, -1, 0, 0, 0, 0]] };   
    case 'Gm':
      return { key: 'Gm', t: -3, accidentals: [[-1, 0, 0, 0, 0, 0], [0, 1, 0, 0, 1, 0], [0, 0, 0, 0, 0, 0]] };
    case 'F':
      return { key: 'F', t: -4, accidentals: [[0, 0, 0, 0, 0, 0], [0, '=', 0, 0, '=', 0], [0, 0, 0, 0, 0, 0]] };
    case 'Dm':
      return { key: 'Dm', t: 1, accidentals: [[0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 1, 0], [0, 0, 0, 0, 0, 0]] };
    case 'E':
      return { key: 'E', t: -5, accidentals: [[1, 1, 0, 0, 0, 1], [0, 1, 0, 0, 1, 0], [0, 0, 1, 1, 1, 0]] };
    case 'C#m':
      return { key: 'C#m', t: 0, accidentals: [[0, 1, 0, 1, 0, 0], [1, '^^', 1, 1, '^^', 1], [1, 1, 0, 1, 1, 1]] };
    case 'A':
      return { key: 'A', t: -2, accidentals: [[1, 0, 0, 0, 0, 1], [0, 1, 0, 0, 1, 0], [0, 0, 1, 1, 0, 0]] };
    case 'F#m':
      return { key: 'F#m', t: -4, accidentals: [[0, 1, 0, 1, 0, 0], [1, 1, 1, 1, 1, 1], [1, 1, 0, 1, 1, 1]] };
    case 'D':
      return { key: 'D', t: 1, accidentals: [[1, 0, 0, 0, 0, 1], [0, 1, 0, 0, 1, 0], [0, 0, 1, 0, 0, 0]] };
    case 'Bm':
      return { key: 'Bm', t: -1, accidentals: [[0, 1, 0, 0, 0, 0], [0, 1, 0, 0, 1, 0], [0, 0, 0, 1, 1, 1]] };
    case 'G':
      return { key: 'G', t: -3, accidentals: [[0, 0, 0, 0, 0, 1], [0, 1, 0, 0, 1, 0], [0, 0, 1, 0, 0, 0]] };
    case 'Em':
      return { key: 'Em', t: -5, accidentals: [[0, 1, 0, 0, 0, 0], [0, 1, 0, 0, 1, 0], [0, 0, 0, 1, 1, 0]] };
    case 'Am':
      return { key: 'Am', t: -2, accidentals: [[0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 1, 0], [0, 0, 0, 1, 0, 0]] };
    default:
      return { key: 'C', t: 0, accidentals: [[0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 1, 0], [0, 0, 0, 0, 0, 0]] };
  }
}

const getOptions = change => {
  return {
    key: change || 'C',
    voicesLength: 6,
    measure: [' | ', ' ', ' | ', ' ', ' | ', ' '],
    transposeValues: [0, 0, 0],
    voiceArrangement: [1, 2, 3],
    changeMode: false
  }
}

const getVoices = upperFifthModulationOptions => {

    const voices = [[9, 8, 8, 7, 7, 6], [4, 3, 4, 4, 3, 4], [0, 0, -1, -2, 1, -3]];
    const options = upperFifthModulationOptions || getOptions();
    const [v1, v2, v3] = options.transposeValues;
    const voiceArr = options.voiceArrangement;
    const keyObject = _getKeyObject(options.key);

    const abcVoices = ['', '', ''];
    for (let index = 0; index < options.voicesLength; index += 1) {
      abcVoices[voiceArr[0]-1] += ModelHelper.getSign(keyObject.accidentals[0][index]);
      abcVoices[voiceArr[0]-1] += ModelHelper.transposeOctave(v1, ModelHelper.validateValue(voices[0][index] + keyObject.t));
      abcVoices[voiceArr[0]-1] += options.measure[index];

      abcVoices[voiceArr[1]-1] += ModelHelper.getSign(keyObject.accidentals[1][index]);
      abcVoices[voiceArr[1]-1] += ModelHelper.transposeOctave(v2, ModelHelper.validateValue(voices[1][index] + keyObject.t));
      abcVoices[voiceArr[1]-1] += options.measure[index];
      
      abcVoices[voiceArr[2]-1] += ModelHelper.getSign(keyObject.accidentals[2][index]);
      abcVoices[voiceArr[2]-1] += ModelHelper.transposeOctave(v3, ModelHelper.validateValue(voices[2][index] + keyObject.t));
      abcVoices[voiceArr[2]-1] += options.measure[index];  
    }
    return abcVoices;
  }

  const getStaff = () => {
    return ['x | x x | x x | x', 'x | x x | x x | x', 'x | x x | x x | x '];
  }

  const getExample = () => {
    return ['', '', '']; 
  }

  const UpperFiveModulation = {
    getDefaultOptions: getOptions,
    getVoices: getVoices,
    getEmptyStaff: getStaff,
    getMusicWxample: getExample
  }
  
  export default UpperFiveModulation;