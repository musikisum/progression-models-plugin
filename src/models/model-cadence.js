import ModelHelper from '../model-helper.js';

const _keyObj = {  
  'E': { key: 'E', t: 2, accidentals: [[1, 1, 1, 1], [0, 0, 1, 0], [1, 0, 0, 0]] },  
  'C#m': { key: 'C#m', t: 0, accidentals: [[0, 1, 1, 0], [1, 1, 1, 1], [0, 1, 1, 1]] },
  'A': { key: 'A', t: -2, accidentals: [[1, 0, 0, 1], [0, 0, 1, 0], [1, 0, 0, 0]] },  
  'F#m': { key: 'F#m', t: 3, accidentals: [[0, 1, 1, 0], [1, 1, 1, 1], [0, 0, 1, 1]] },
  'D': { key: 'D', t: 1, accidentals: [[1, 0, 0, 1], [0, 0, 1, 0], [1, 0, 0, 0]] },  
  'Bm': { key: 'Bm', t: -1, accidentals: [[0, 1, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0]] },
  'G': { key: 'G', t: 4, accidentals: [[0, 0, 0, 0], [0, 0, 1, 0], [0, 0, 0, 0]] },
  'Em': { key: 'Em', t: 2, accidentals: [[0, 1, 1, 0], [0, 0, 1, 0], [0, 0, 0, 0]] },
  'C': { key: 'C', t: 0, accidentals: [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]] },
  'Am': { key: 'Am', t: -2, accidentals: [[0, 0, 0, 0], [0, 0, 1, 0], [0, 0, 0, 0]] },
  'F': { key: 'F', t: 3, accidentals: [[0, 0, 0, 0], [0, 0, 0, 0], [0, -1, 0, 0]] },
  'Dm': { key: 'Dm', t: 1, accidentals: [[0, 0, 0, 0], [0, 0, 1, 0], [0, 0, 0, 0]] },
  'Bb': { key: 'Bb', t: -1, accidentals: [[0, 0, 0, -1], [-1, -1, 0, -1], [0, -1, 0, -1]] },  
  'Gm': { key: 'Gm', t: 4, accidentals: [[-1, 0, 0, -1], [0, 0, 1, 0], [-1, 0, 0, 0]] },
  'Eb': { key: 'Eb', t: 2, accidentals: [[0, 0, 0, 0], [-1, -1, 0, -1], [0, -1, -1, -1]] },  
  'Cm': { key: 'Cm', t: 0, accidentals: [[-1, 0, 0, -1], [0, 0, '=', 0], [-1, 0, 0, 0]] },
  'Ab': { key: 'Ab', t: -2, accidentals: [[0, -1, 0, 0], [-1, -1, 0, -1], [0, -1, -1, -1]] },  
  'Fm': { key: 'Fm', t: 3, accidentals: [[-1, 0, 0, -1], [0, 0, '=', 0], [-1, -1, 0, 0]] }
};

function _getKeyObject(change) {  
  return _keyObj[change];
}

function getModelKeys() {
  return Object.keys(_keyObj);
}

const getOptions = change => {
  const modelTemplate = ModelHelper.getModelTemplate('cadence');
  if(change) {
    modelTemplate.key = change;
  }
  return modelTemplate;
};

const getVoices = cadenceOptions => {
  const voicesLength = 4;
  const measure = [' | ', ' ', ' | ', ' '];
  const voices = [[9, 8, 8, 9], [7, 7, 6, 7], [2, 3, 4, 0]];
  const options = cadenceOptions ?? getOptions();
  options.addProps['isFinal'][0] && (voices[0] = [9, 8, 8, 7]);
  options.addProps['isBegin'][0] && (voices[2] = [0, 3, 4, 0]);
  if(options.addProps['isDeceptiv'][0]) {
    voices[0] = [9, 8, 8, 7];
    voices[2] = [2, 3, 4, 5];
    options.addProps['isFinal'][0] = false;
    options.addProps['isBegin'][0] = false;
  }
  return ModelHelper.getVoices(
    options.transposeValues, 
    options.voiceArrangement, 
    voices, 
    _getKeyObject(options.key), 
    voicesLength, 
    measure
  );
};

const getStaff = () => {
  return ['x | x x | x]', 'x | x x | x]', 'x | x x | x]'];
};

const getExample = () => {
  return ['', '', '']; 
};

const Cadence = {
  getDefaultOptions: getOptions,
  getVoices,
  getEmptyStaff: getStaff,
  getModelKeys,
  getMusicExample: getExample
};

export default Cadence;