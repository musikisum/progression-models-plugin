import ModelHelper from '../model-helper.js';

function _getKeyObject(change) {
  switch (change) {      
    case 'Dm':
      return { key: 'Gm', t: 1, accidentals: [['', '', '', '', '', '', '^', ''], ['', '', '', '', '_', '', '', '_'], ['', '', '', '^', '', '', '', '']] };
    case 'G':
      return { key: 'C', t: -3, accidentals: [['', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '']] };
    case 'Gm':
      return { key: 'Cm', t: -3, accidentals: [['_', '', '', '', '', '', '', ''], ['', '', '', '', '_', '', '', '_'], ['', '', '', '', '', '', '', '']] };
    case 'Am':
      return { key: 'Dm', t: -2, accidentals: [['', '', '', '', '', '', '^', ''], ['', '', '', '', '', '', '', ''], ['', '', '', '^', '', '', '', '']] };
    default:
      return { key: 'F', t: 0, accidentals: [['', '', '', '', '', '', '', ''], ['', '', '_', '_', '', '', '', ''], ['', '', '', '', '', '', '', '']] };
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
  const flatValues = ['Gm', 'C', 'Cm', 'F'];

  if(lowerFifthModulationOptions.changeMode) {
    if (flatValues.includes(keyObject.key)) {
      keyObject.accidentals[1][4] = keyObject.accidentals[1][4] === '_' ? '' : '_';
      keyObject.accidentals[1][7] = keyObject.accidentals[1][7] === '_' ? '' : '_';  
    } else {
      keyObject.accidentals[1][4] = keyObject.accidentals[1][4] === '^' ? '' : '^';
      keyObject.accidentals[1][7] = keyObject.accidentals[1][7] === '^' ? '' : '^'; 
    }
  }

  const abcVoices = ['', '', ''];
  for (let index = 0; index < options.voicesLength; index += 1) {
    abcVoices[voiceArr[0]-1] += keyObject.accidentals[0][index];
    abcVoices[voiceArr[0]-1] += ModelHelper.transposeOctave(v1, ModelHelper.validateValue(voices[0][index] + keyObject.t));
    abcVoices[voiceArr[0]-1] += options.measure[index];

    abcVoices[voiceArr[1]-1] += keyObject.accidentals[1][index];
    abcVoices[voiceArr[1]-1] += ModelHelper.transposeOctave(v2, ModelHelper.validateValue(voices[1][index] + keyObject.t));
    abcVoices[voiceArr[1]-1] += options.measure[index];
      
    abcVoices[voiceArr[2]-1] += keyObject.accidentals[2][index];
    abcVoices[voiceArr[2]-1] += ModelHelper.transposeOctave(v3, ModelHelper.validateValue(voices[2][index] + keyObject.t));
    abcVoices[voiceArr[2]-1] += options.measure[index];  
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