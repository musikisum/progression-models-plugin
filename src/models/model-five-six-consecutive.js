import ModelHelper from '../model-helper.js';

function _getKeyObject(change) {
  switch (change) {
    case 'G':
    case 'Em':
      return { key: 'G', t: 4, accidentals: [[0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0], [1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0]] };  
    default:
      return { key: 'C', t: 0, accidentals: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0], [0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0]] };
  }
}

const getOptions = change => {
  return {
    key: change || 'C',
    voicesLength: 12,
    measure: [' | ', ' ', ' | ', ' ', ' | ', ' ', ' | ', ' ', ' | ', ' ', ' | ', ' '],
    transposeValues: [0, 0, -1],
    voiceArrangement: [1, 2, 3],
    partLength: 6
  };
};

const getVoices = cadenceOptions => {
  const voices = [[4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9], [1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7], [-1, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5]];
  const options = cadenceOptions ?? getOptions();
  const [v1, v2, v3] = options.transposeValues;
  const voiceArr = options.voiceArrangement; // [2, 3, 1] => [1, 2, 0]
  const keyObject = _getKeyObject(options.key);
  
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
  return ['x | x x | x x | x x | x x | x x | x ]', 'x | x x | x x | x x | x x | x x | x ]', 'x | x x | x x | x x | x x | x x | x ]'];
};

const FiveSixConsecutive = {
  getDefaultOptions: getOptions,
  getVoices,
  getEmptyStaff: getStaff
};

export default FiveSixConsecutive;