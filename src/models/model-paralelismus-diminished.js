import ModelHelper from '../model-helper.js';

function _getKeyObject(change) {
  switch (change) {      
    case 'Gm':
      return { key: 'Gm', t: -3, accidentals: [[-1, -1, 0, 0, 0, 0, 0, -1, 0, -1, 0, 0], [0, 0, 0, 0, -1, -1, 0, 0, 0, 0, -1, -1], [0, 0, 0, -1, 0, '=', '=', 0, -1, 0, 0, -1]] };
    case 'F':
      return { key: 'F', t: -3, accidentals: [[0, 0, 0, 0, 0, '=', 0, 0, 0, 0, 0, 0], [0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0]] };
    case 'Dm':
      return { key: 'Dm', t: 1, accidentals: [[0, -1, 0, 0, 0, 0, 0, -1, 0, -1, 0, 0], [0, 0, 0, 0, -1, -1, 0, 0, 0, 0, 0, -1], [0, 0, 0, -1, 0, '=', 1, 0, -1, 0, 0, -1]] };
    case 'G':
      return { key: 'G', t: -3, accidentals: [[0, 0, 0, 0, 0, '=', 0, 0, 0, 0, 0, 0], [0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0]] };
    case 'Em':
        return { key: 'Em', t: 1, accidentals: [[0, -1, 0, 0, 0, 0, 0, -1, 0, -1, 0, 0], [0, 0, 0, 0, -1, -1, 0, 0, 0, 0, 0, -1], [0, 0, 0, -1, 0, '=', 1, 0, -1, 0, 0, -1]] };
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
  if (options.numberOfSections === 1 || options.numberOfSections === 2) {
    options.key === 'Dm' && (keyObject.accidentals[1][3] = '_');
    options.key === 'G' && (keyObject.accidentals[1][3] = '');
    options.key === 'Gm' && (keyObject.accidentals[1][3] = '_');
  } 
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