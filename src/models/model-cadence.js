import ModelHelper from '../model-helper.js';

function _getKeyObject(change) {
  switch (change) {      
    case 'F':
      return { key: 'F', t: 3, accidentals: [['', '', '', ''], ['', '', '', ''], ['', '_', '', '']] };
    case 'Dm':
      return { key: 'Dm', t: 1, accidentals: [['', '', '', ''], ['', '', '^', ''], ['', '', '', '']] };
    case 'G':
      return { key: 'G', t: 4, accidentals: [['', '', '', ''], ['', '', '^', ''], ['', '', '', '']] };
    case 'Gm':
      return { key: 'Gm', t: 4, accidentals: [['_', '', '', '_'], ['', '', '^', ''], ['_', '', '', '']] };
    case 'Am':
      return { key: 'Am', t: -2, accidentals: [['', '', '', ''], ['', '', '^', ''], ['', '', '', '']] };
    case 'Em':
      return { key: 'Em', t: 2, accidentals: [['', '^', '^', ''], ['', '', '^', ''], ['', '', '', '']] };
    default:
      return { key: 'C', t: 0, accidentals: [['', '', '', ''], ['', '', '', ''], ['', '', '', '']] };
  }
}

const getOptions = (change) => {
  return {
    key: change || 'C',
    voicesLength: 4,
    measure: [' | ', ' ', ' | ', ' '],
    transposeValues: [0, 0, -1],
    voiceArrangement: [1, 2, 3],
    isFinal: false,
    isBegin: false
  }
}

const getVoices = (cadenceOptions) => {
  const voices = [[9, 8, 8, 9], [7, 7, 6, 7], [2, 3, 4, 0]];
  const options = cadenceOptions ?? getOptions();
  options.isFinal && (voices[0] = [9, 8, 8, 7]);
  options.isBegin && (voices[2] = [0, 3, 4, 0]);
  const [v1, v2, v3] = options.transposeValues;
  const voiceArr = options.voiceArrangement;
  const keyObject = _getKeyObject(options.key);
  
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
}

const getStaff = () => {
  return ['x | x x | x]', 'x | x x | x]', 'x | x x | x]'];
}

const Cadence = {
  getDefaultOptions: getOptions,
  getVoices,
  getEmptyStaff: getStaff
};

export default Cadence;