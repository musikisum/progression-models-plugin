import ModelHelper from './model-helper.js';

function _getKeyObject(change) {
  switch (change) {      
    case 'Dm':
      return { key: 'Dm', t: 1, accidentals: [['', '', '', '', '', '', '^', ''], ['', '', '', '', '', '', '', ''], ['', '_', '', '', '_', '', '', '']] };
    case 'G':
      return { key: 'G', t: 4, accidentals: [['', '', '', '', '', '', '^', ''], ['', '', '', '', '', '', '', ''], ['', '', '^', '', '', '', '', '']] };
    case 'Gm':
      return { key: 'Gm', t: 4, accidentals: [['_', '', '', '', '', '', '^', ''], ['', '', '', '_', '_', '', '', '_'], ['', '_', '', '', '_', '', '', '']] };
    case 'Am':
      return { key: 'Am', t: -2, accidentals: [['', '', '', '', '', '', '^', ''], ['', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '']] };
    default:
      return { key: 'C', t: 0, accidentals: [['', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '']] };
  }
}

const getOptions = (change) => {
  return {
    key: change || 'C',
    voicesLength: 8,
    measure: [' | ', ' ', ' | ', ' ', ' | ', ' ', ' | ', ' '],
    transposeValues: [0, 0, 0],
    voiceArrangement: [1, 2, 3],
    lastBassNoteUp: false
  }
}

const getVoices = (fifthsCircleLinearOptions) => {

    const voices = [[9, 9, 8, 8, 7, 7, 6, 7], [4, 3, 3, 2, 2, 1, 1, 2], [0, -2, -1, -3, -2, -4, -3, -7]];
    const options = fifthsCircleLinearOptions ?? getOptions();
    options.lastBassNoteUp && (voices[2][7] = 0);
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
    return ['x | x x | x x | x x | x', 'x | x x | x x | x x | x', 'x | x x | x x | x x | x'];
  }

  const getExample = () => {
    return ['f- | f e2 d- | -d c d3/2', 'z | B2 A2 | G2 F z/', 'A,/D,/ | G,/F,/G,/C,/ F,/E,/F,/B,,/ | E,/F,//G,// A,/A,,/ D,/E,/,F,/]'];
  }

  const CircleOfFifthsLinear = {
    getDefaultOptions: getOptions,
    getVoices: getVoices,
    getEmptyStaff: getStaff,
    getMusicExample: getExample
  }

  export default CircleOfFifthsLinear;