import ModelHelper from '../model-helper.js';

const _keyObj = {
  'E': { key: 'E', t: 2, accidentals: [[1, 1, 1, 1, 0, 0, 1, 0], [0, 0, 0, 1, 1, 1, 1, 1], [0, 1, 1, 0, 1, 0, 0, 0]] },
  'C#m': { key: 'C#m', t: 0, accidentals: [[0, 0, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 0, 0, 1, 0], [1, 1, 0, 0, 0, 1, 1, 1]] },
  'A': { key: 'A', t: -2, accidentals: [[1, 1, 0, 0, 0, 0, 1, 0], [0, 0, 0, 1, 1, 0, 0, 1], [0, 1, 1, 0, 1, 0, 0, 0]] },
  'F#m': { key: 'F#m', t: 3, accidentals: [[0, 0, 1, 1, 0, 0, 1, 0], [1, 0, 0, 0, 0, 1, 1, 0], [0, 0, 0, 1, 0, 0, 1, 0]] },
  'D': { key: 'D', t: 1, accidentals: [[1, 1, 0, 0, 0, 0, 1, 0], [0, 0, 0, 1, 1, 0, 0, 1], [0, 0, 1, 0, 0, 0, 0, 0]] },
  'Bm': { key: 'Bm', t: -1, accidentals: [[0, 0, 1, 1, 0, 0, 1, 0], [1, 0, 0, 0, 0, 1, 1, 0], [0, 0, 0, 1, 0, 0, 1, 0]] },
  'G': { key: 'G', t: 4, accidentals: [[0, 0, 0, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 1, 0, 0, 0, 0, 0]] },
  'Em': { key: 'Em', t: 2, accidentals: [[0, 0, 1, 1, 0, 0, 1, 0], [0, 0, 0, 0, 0, 1, 1, 0], [0, 0, 0, 0, 0, 1, 0, 0]] },
  'C': { key: 'C', t: 0, accidentals: [[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]] },
  'Am': { key: 'Am', t: -2, accidentals: [[0, 0, 0, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]] },
  'F': { key: 'F', t: 3, accidentals: [[0, 0, 0, 0, 0, 0, 0, 0], [0, -1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, -1, 0, 0]] },
  'Dm': { key: 'Dm', t: 1, accidentals: [[0, 0, 0, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, -1, 0, 0, -1, 0, 0, 0]] },
  'Bb': { key: 'Bb', t: -1, accidentals: [[0, 0, 0, 0, -1, -1, 0, -1], [0, -1, 0, 0, 0, 0, 0, 0], [-1, 0, 0, 0, 0, -1, 0, -1]] }, 
  'Gm': { key: 'Gm', t: 4, accidentals: [[-1, 0, 0, 0, 0, 0, 1, 0], [0, 0, 0, -1, -1, 0, 0, -1], [0, -1, 0, 0, -1, 0, 0, 0]] },
  'Eb': { key: 'Eb', t: 2, accidentals: [[0, 0, 0, 0, -1, -1, 0, -1], [-1, -1, 0, 0, 0, 0, 0, 0], [-1, 0, 0, -1, 0, -1, -1, -1]] },
  'Cm': { key: 'Cm', t: 0, accidentals: [[-1, -1, 0, 0, 0, 0, '=', 0], [0, 0, 0, -1, 0, 0, 0, -1], [0, -1, -1, 0, -1, 0, 0, 0]] },
  'Ab': { key: 'Ab', t: 2, accidentals: [[0, 0, -1, -1, -1, -1, 0, -1], [-1, -1, 0, 0, 0, -1, 0, 0], [-1, 0, 0, -1, 0, -1, -1, -1]] },
  'Fm': { key: 'Fm', t: 0, accidentals: [[-1, -1, 0, 0, 0, 0, '=', 0], [0, -1, 0, -1, 0, 0, 0, -1], [0, -1, -1, 0, -1, -1, 0, 0]] }
};

function _getKeyObject(change) {  
  return _keyObj[change ?? 'C'];
}

function getModelKeys() {
  return Object.keys(_keyObj);
}

const getOptions = change => {
  const modelTemplate = ModelHelper.getModelTemplate('CircleOfFifthsLinear');
  if(change) {
    modelTemplate.key = change;
  }
  return modelTemplate;
};

const getVoices = fifthsCircleLinearOptions => {
  const voicesLength = 8;
  const measure = [' | ', ' ', ' | ', ' ', ' | ', ' ', ' | ', ' '];
  const voices = [[11, 10, 10, 9, 9, 8, 8, 9], [9, 9, 8, 8, 7, 7, 6, 7], [0, -2, -1, -3, -2, -4, -3, -7]];
  const options = fifthsCircleLinearOptions ?? getOptions();
  options.addProps['lastBassNoteUp'] && (voices[2][7] = 0);
  return ModelHelper.getVoicesWithLengthModifications(
    options.transposeValues, 
    options.voiceArrangement, 
    voices, 
    _getKeyObject(options.key), 
    voicesLength, 
    measure, 
    options.addProps
  );
};

const getStaff = () => {
  return ['x | x x | x x | x x | x', 'x | x x | x x | x x | x', 'x | x x | x x | x x | x'];
};

const getExample = () => {
  return ['f- | f e2 d- | -d c d3/2', 'z | B2 A2 | G2 F z/', 'A,/D,/ | G,/F,/G,/C,/ F,/E,/F,/B,,/ | E,/F,//G,// A,/A,,/ D,/E,/,F,/]'];
};

const CircleOfFifthsLinear = {
  getDefaultOptions: getOptions,
  getVoices,
  getModelKeys,
  getEmptyStaff: getStaff,
  getMusicExample: getExample
};

export default CircleOfFifthsLinear;