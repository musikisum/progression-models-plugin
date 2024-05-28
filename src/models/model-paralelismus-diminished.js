import ModelHelper from '../model-helper.js';

function _getKeyObject(change) {
  switch (change) {
    case 'Eb':
      return { key: 'Eb', t: 2, accidentals: [[0, 0, 0, -1, 0, -1, 0, 0, 0, -1, 0, -1], [-1, -1, 0, 0, 0, 0, -1, -1, -1, -1, 0, 0], [-1, '=', '=', 0, -1, 0, 0, -1, 0, 0, 0, 0]] };   
    case 'Cm':
      return { key: 'Cm', t: 0, accidentals: [[-1, -1, 0, 0, 0, -1, 0, -1, 0, -1, 0, 0], [0, 0, -1, -1, -1, -1, 0, 0, 0, 0, -1, -1], [0, 0, 0, -1, 0, '=', '=', 0, -1, -1, 0, -1]] };
    case 'B':
      return { key: 'B', t: -1, accidentals: [[0, 0, 0, -1, 0, -1, 0, 0, 0, 0, 0, -1], [-1, -1, 0, 0, 0, 0, 0, 0, -1, -1, 0, 0], [-1, '=', 1, 0, -1, 0, 0, -1, 0, '=', '=', 0]] };   
    case 'Gm':
      return { key: 'Gm', t: -3, accidentals: [[-1, -1, 0, 0, 0, 0, 0, -1, 0, -1, 0, 0], [0, 0, 0, 0, -1, -1, 0, 0, 0, 0, -1, -1], [0, 0, 0, -1, 0, '=', '=', 0, -1, 0, 0, -1]] };
    case 'F':
      return { key: 'F', t: -3, accidentals: [[0, 0, 0, 0, 0, '=', 0, 0, 0, 0, 0, 0], [0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0]] };
    case 'Dm':
      return { key: 'Dm', t: 1, accidentals: [[0, -1, 0, 0, 0, 0, 0, -1, 0, -1, 0, 0], [0, 0, 0, 0, -1, -1, 0, 0, 0, 0, 0, -1], [0, 0, 0, -1, 0, '=', 1, 0, -1, 0, 0, -1]] };
    case 'E':
      return { key: 'E', t: 2, accidentals: [[1, 1, 0, 0, 0, '=', 0, 1, 0, 0, 0, 0], [0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1], [0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1]] };
    case 'G#m':
      return { key: 'G#m', t: -3, accidentals: [[0, '=', 0, 1, 0, 1, 0, 0, 0, '=', 0, 1], [1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0], [1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0]] };  
    case 'A':
      return { key: 'A', t: -2, accidentals: [[1, 0, 0, 0, 0, '=', 0, 1, 0, 0, 0, 0], [0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0], [0, 1, 1, 1, 0, 0, 1, 0, 1, 1, 1, 0]] };
    case 'F#m':
      return { key: 'F#m', t: -4, accidentals: [[0, '=', 0, 1, 0, 0, 0, 0, 0, '=', 0, 0], [1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0], [1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0]] };
    case 'D':
      return { key: 'D', t: 1, accidentals: [[1, 0, 0, 0, 0, '=', 0, 0, 0, 0, 0, 0], [0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0], [0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0]] };
    case 'Bm':
      return { key: 'Bm', t: -1, accidentals: [[0, '=', 0, 0, 0, 0, 0, 0, 0, '=', 0, 0], [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0], [0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0]] };
    case 'G':
      return { key: 'G', t: -3, accidentals: [[0, 0, 0, 0, 0, '=', 0, 0, 0, 0, 0, 0], [0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0]] };
    case 'Em':
      return { key: 'Em', t: 2, accidentals: [[0, '=', 0, 0, 0, 0, 0, 0, 0, -1, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0]] };
    case 'Am':
      return { key: 'Am', t: -2, accidentals: [[0, -1, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1], [0, 0, 0, 0, 0, '=', 1, 0, 0, 0, 0, -1]] };
    default:
      return { key: 'C', t: 0, accidentals: [[0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 1, 0, 0, 0, 0, 0, 0, '=', 1, 0]] };
  }
}

const getOptions = change => {
  return {
    key: change || 'C',  
    voicesLength: 0,
    measure: [' | ', ' ', ' | ', ' ', ' | ', ' ', ' | ', ' ', ' | ', ' ', ' | ', ' '],
    transposeValues: [0, 0, -1],
    voiceArrangement: [1, 2, 3],
    numberOfSections: 3
  };
};

const getVoices = upperFifthModulationOptions => {

  const voices = [[9, 8, 8, 7, 7, 6 , 6, 5, 5, 4, 4, 3], [7, 7, 6, 6, 5, 5, 4, 4, 3, 3, 2 , 1], [7, 3, 4, 5, 0, 1, 2, 3, -2, -1, 0, 1]];
  const options = upperFifthModulationOptions || getOptions();
  const [v1, v2, v3] = options.transposeValues;
  const voiceArr = options.voiceArrangement;
  const keyObject = _getKeyObject(options.key);
  if (options.numberOfSections === 1) {
    options.voicesLength = 4;
    voices[1][3] = 5;
  } else if (options.numberOfSections === 2) {
    options.voicesLength = 8;
    voices[1][7] = 3;      
  } else {
    options.voicesLength = 12;
  }
  if (options.numberOfSections === 1) {
    options.key === 'Dm' && (keyObject.accidentals[1][3] = -1);
    options.key === 'B' && (keyObject.accidentals[1][3] = -1);
    options.key === 'Gm' && (keyObject.accidentals[1][3] = -1);
    options.key === 'E' && (keyObject.accidentals[1][3] = 1);
    options.key === 'A' && (keyObject.accidentals[1][3] = 1);
    options.key === 'F#m' && (keyObject.accidentals[1][3] = 1);
    options.key === 'Bm' && (keyObject.accidentals[1][3] = 1);
  } else if (options.numberOfSections === 2) {
    options.key === 'G#m' && (keyObject.accidentals[1][3] = 1);
    options.key === 'Cm' && (keyObject.accidentals[1][3] = -1);
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
  return ['x | x x | x x | x x | x x | x x | x]', 'x | x x | x x | x x | x x | x x | x]', 'x | x x | x x | x x | x x | x x | x]'];
};

const getExample = () => {
  return ['', '', '']; 
};

const ParalelismusDiminished = {
  getDefaultOptions: getOptions,
  getVoices,
  getEmptyStaff: getStaff,
  getMusicWxample: getExample
};
  
export default ParalelismusDiminished;