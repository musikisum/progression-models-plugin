import ModelHelper from '../model-helper.js';
import ModelTemplates from '../model-templates.js';

const _keyObj = {  
  'E': { modelKey: 'E', t: -5, accidentals: [[0, 0, 0, 1], [1, 1, 0, 0], [0, 0, 1, 0]] },  
  'C#m': { modelKey: 'C#m', t: 0, accidentals: [[1, 1, 0, 0], [0, 1, 0, 1], [1, 1, 1, 1]] },
  'A': { modelKey: 'A', t: -2, accidentals: [[0, 0, 0, 1], [1, 0, 0, 0], [0, 0, 1, 0]] },  
  'F#m': { modelKey: 'F#m', t: -4, accidentals: [[1, 0, 0, 0], [0, 1, 0, 1], [1, 1, 1, 1]] },
  'D': { modelKey: 'D', t: 1, accidentals: [[0, 0, 0, 1], [1, 0, 0, 0], [0, 0, 1, 0]] },  
  'Bm': { modelKey: 'Bm', t: -1, accidentals: [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0]] },
  'G': { modelKey: 'G', t: -3, accidentals: [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 1, 0]] },
  'Em': { modelKey: 'Em', t: -5, accidentals: [[0, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0]] },
  'C': { modelKey: 'C', t: 0, accidentals: [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]] },
  'Am': { modelKey: 'Am', t: -2, accidentals: [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 1, 0]] },
  'F': { modelKey: 'F', t: -4, accidentals: [[0, -1, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]] },
  'Dm': { modelKey: 'Dm', t: 1, accidentals: [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 1, 0]] },
  'Bb': { modelKey: 'Bb', t: -1, accidentals: [[0, -1, 0, 0], [0, 0, 0, -1], [-1, -1, 0, -1]] },  
  'Gm': { modelKey: 'Gm', t: -3, accidentals: [[0, 0, 0, -1], [-1, 0, 0, 0], [0, 0, 1, 0]] },
  'Eb': { modelKey: 'Eb', t: -5, accidentals: [[-1, -1, 0, 0], [0, 0, 0, -1], [-1, -1, 0, -1]] },  
  'Cm': { modelKey: 'Cm', t: 0, accidentals: [[0, 0, 0, -1], [-1, 0, 0, 0], [0, 0, '=', 0]] },
  'Ab': { modelKey: 'Ab', t: -2, accidentals: [[-1, -1, 0, 0], [0, -1, 0, -1], [-1, -1, 0, -1]] },  
  'Fm': { modelKey: 'Fm', t: -4, accidentals: [[0, -1, 0, -1], [-1, 0, 0, 0], [0, 0, '=', 0]] }
};

function _getKeyObject(change) {  
  return _keyObj[change];
}

function getModelKeys() {
  return Object.keys(_keyObj);
}

const getOptions = change => {
  const modelTemplate = ModelTemplates.getModelTemplate('initialCadence');
  if(change) {
    modelTemplate.modelKey = change;
  }
  return modelTemplate;
};

const getVoices = cadenceOptions => {
  const voicesLength = 4;
  const measure = [' | ', ' ', ' | ', ' '];
  const voices = [[4, 3, 3, 2], [2, 1, 1, 0], [0, 0, -1, 0]];
  const options = cadenceOptions ?? getOptions();
  let keyObject = _getKeyObject(options.modelKey);

  return ModelHelper.getVoices(
    options.transposeValues, 
    options.voiceArrangement, 
    voices, 
    keyObject,
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