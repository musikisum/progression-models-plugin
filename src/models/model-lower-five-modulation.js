import ModelHelper from '../model-helper.js';
import ModelTemplates from '../model-templates.js';

const _keyObj = {
  'E': { key: 'E', t: 2, accidentals: [[1, 1, 0, 0, 0, 0, 1, 0], [0, 0, '=', '=', 1, 0, 0, 1], [0, 0, 0, 1, 0, 0, 0, 0]] },
  'C#m': { key: 'C#m', t: 0, accidentals: [[0, 1, 0, 1, 1, 1, 1, 1], [1, 1, '=', '=', 0, 1, 1, 0], [1, 1, 0, 1, 1, 1, 1, 1]] },
  'A': { key: 'A', t: -2, accidentals: [[1, 0, 0, 0, 0, 0, 1, 0], [0, 0, '=', '=', 1, 0, 0, 1], [0, 0, 0, 1, 0, 0, 0, 0]] },
  'F#m': { key: 'F#m', t: 3, accidentals: [[0, 1, 0, 1, 0, 0, 1, 0], [1, 1, '=', '=', 0, 1, 1, 0], [1, 1, 0, 1, 0, 1, 1, 0]] },
  'D': { key: 'D', t: 1, accidentals: [[1, 0, 0, 0, 0, 0, 1, 0], [0, 0, '=', '=', 0, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0, 0]] },
  'Bm': { key: 'Bm', t: 2, accidentals: [[0, 1, 0, 0, 0, 0, 1, 0], [0, 0, '=', '=', 0, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0, 0]] },
  'G': { key: 'G', t: -3, accidentals: [[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, '=', '=', 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]] },
  'Em': { key: 'Em', t: 2, accidentals: [[0, 1, 0, 0, 0, 0, 1, 0], [0, 0, '=', '=', 0, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0, 0]] },
  'C': { key: 'C', t: 0, accidentals: [[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, -1, -1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]] },
  'Am': { key: 'Am', t: -2, accidentals: [[0, 0, 0, 0, 0, 0, 1, 0], [0, 0, '=', '=', 0, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0, 0]] },
  'F': { key: 'F', t: 3, accidentals: [[0, 0, 0, 0, -1, -1, 0, -1], [0, 0, -1, -1, 0, 0, 0, 0], [0, 0, 0, 0, -1, 0, 0, -1]] },
  'Dm': { key: 'Dm', t: 1, accidentals: [[0, 0, 0, 0, 0, 0, 1, 0], [0, 0, '=', '=', -1, 0, 0, -1], [0, 0, 0, 1, 0, 0, 0, 0]] },
  'Bb': { key: 'Bb', t: -1, accidentals: [[0, 0, 0, -1, -1, -1, 0, -1], [-1, -1, -1, -1, 0, 0, 0, 0], [-1, 0, 0, 0, -1, -1, -1, -1]] },
  'Gm': { key: 'Gm', t: -3, accidentals: [[-1, 0, 0, 0, 0, 0, '=', 0], [0, 0, '=', '=', -1, 0, 0, -1], [0, 0, 0, '=', 0, 0, 0, 0]] },
  'Eb': { key: 'Eb', t: 2, accidentals: [[0, 0, 0, -1, -1, -1, 0, -1], [-1, -1, -1, -1, 0, -1, -1, 0], [-1, -1, 0, 0, -1, 0, 0, -1]] },
  'Cm': { key: 'Cm', t: 0, accidentals: [[-1, 0, 0, 0, 0, 0, '=', 0], [0, 0, -1, -1, -1, 0, 0, -1], [0, 0, 0, '=', 0, 0, 0, 0]] },
  'Ab': { key: 'Ab', t: -2, accidentals: [[0, -1, 0, -1, -1, -1, 0, -1], [-1, -1, -1, -1, 0, -1, -1, 0], [-1, -1, 0, 0, -1, -1, 0, -1]] },
  'Fm': { key: 'Fm', t: 3, accidentals: [[-1, 0, 0, 0, -1, -1, '=', -1], [0, 0, -1, -1, -1, 0, 0, -1], [0, 0, 0, '=', -1, 0, 0, -1]] }
};

function _getKeyObject(change) {  
  return _keyObj[change];
}

function getModelKeys() {
  return Object.keys(_keyObj);
}

const getOptions = change => {
  const modelTemplate = ModelTemplates.getModelTemplate('lowerFiveModulation');
  if(change) {
    modelTemplate.modelKey = change;
  }
  return modelTemplate;
};

const getVoices = lowerFifthModulationOptions => {
  const voicesLength = 8;
  const measure = [' | ', ' ', ' | ', ' ', ' | ', ' ', ' | ', ' '];
  const voices = [[9, 8, 8, 7, 10, 10, 9, 10], [7, 7, 6, 6, 5, 4, 4, 5], [0, 4, 4, 2, 3, 0, 0, 3]];
  const options = lowerFifthModulationOptions || getOptions();
  const changeMode = options.addProps['changeMode'][0];
  const keyObject = _getKeyObject(options.modelKey);

  switch (options.modelKey) {
    case 'Cm':
    case 'Gm':
    case 'Dm':
      keyObject.accidentals[1][4] = changeMode ? 0 : -1;
      keyObject.accidentals[1][7] = changeMode ? 0 : -1;
      options.addProps['changeMode'][1] = false;
      break;
    case 'C':
    case 'G':
    case 'D':
      keyObject.accidentals[1][4] = changeMode ? -1 : 0;
      keyObject.accidentals[1][7] = changeMode ? -1 : 0;
      options.addProps['changeMode'][1] = false;
      break;
    case 'Am':
    case 'Em':
    case 'Bm':
    case 'F#m':
      keyObject.accidentals[1][4] = changeMode ? 1 : 0;
      keyObject.accidentals[1][7] = changeMode ? 1 : 0;
      options.addProps['changeMode'][1] = false;
      break;
    case 'A':
    case 'E':
      keyObject.accidentals[1][4] = changeMode ? 0 : 1;
      keyObject.accidentals[1][7] = changeMode ? 0 : 1;
      options.addProps['changeMode'][1] = false;
      break;
    default:      
      options.addProps['changeMode'][1] = true;      
      break;
  }

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
  return ['x | x x | x x | x x | x]', 'x | x x | x x | x x | x]', 'x | x x | x x | x x | x]'];
};

const getExample = () => {
  return ['', '', '']; 
};

const LowerFiveModulation = {
  getDefaultOptions: getOptions,
  getVoices,
  getModelKeys,
  getEmptyStaff: getStaff,
  getMusicExample: getExample
};
  
export default LowerFiveModulation;