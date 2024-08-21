import ModelHelper from '../model-helper.js';

const _keyObj = {
  'E': { key: 'E', t: -5, accidentals: [[1, 1, 0, 0, 0, 1], [0, 1, 0, 0, 1, 0], [0, 0, 1, 1, 1, 0]] },
  'C#m': { key: 'C#m', t: 0, accidentals: [[0, 1, 0, 1, 0, 0], [1, '^^', 1, 1, '^^', 1], [1, 1, 0, 1, 1, 1]] },
  'A': { key: 'A', t: -2, accidentals: [[1, 0, 0, 0, 0, 1], [0, 1, 0, 0, 1, 0], [0, 0, 1, 1, 0, 0]] },
  'F#m': { key: 'F#m', t: -4, accidentals: [[0, 1, 0, 1, 0, 0], [1, 1, 1, 1, 1, 1], [1, 1, 0, 1, 1, 1]] },
  'D': { key: 'D', t: 1, accidentals: [[1, 0, 0, 0, 0, 1], [0, 1, 0, 0, 1, 0], [0, 0, 1, 0, 0, 0]] },
  'Bm': { key: 'Bm', t: -1, accidentals: [[0, 1, 0, 0, 0, 0], [0, 1, 0, 0, 1, 0], [0, 0, 0, 1, 1, 1]] },
  'G': { key: 'G', t: -3, accidentals: [[0, 0, 0, 0, 0, 1], [0, 1, 0, 0, 1, 0], [0, 0, 1, 0, 0, 0]] },
  'Em': { key: 'Em', t: -5, accidentals: [[0, 1, 0, 0, 0, 0], [0, 1, 0, 0, 1, 0], [0, 0, 0, 1, 1, 0]] },
  'C': { key: 'C', t: 0, accidentals: [[0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 1, 0], [0, 0, 0, 0, 0, 0]] },
  'Am': { key: 'Am', t: -2, accidentals: [[0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 1, 0], [0, 0, 0, 1, 0, 0]] },
  'F': { key: 'F', t: -4, accidentals: [[0, 0, 0, 0, 0, 0], [0, '=', 0, 0, '=', 0], [0, 0, 0, 0, 0, 0]] },
  'Dm': { key: 'Dm', t: 1, accidentals: [[0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 1, 0], [0, 0, 0, 0, 0, 0]] },
  'Bb': { key: 'Bb', t: -1, accidentals: [[0, 0, 0, -1, 0, 0], [0, 0, 0, 0, 0, 0], [-1, -1, 0, 0, 0, 0]] },   
  'Gm': { key: 'Gm', t: -3, accidentals: [[-1, 0, 0, 0, 0, 0], [0, 1, 0, 0, 1, 0], [0, 0, 0, 0, 0, 0]] },
  'Eb': { key: 'Eb', t: -5, accidentals: [[0, 0, 0, -1, 0, 0], [-1, '=', -1, -1, '=', -1], [-1, -1, 0, 0, 0, -1]] },   
  'Cm': { key: 'Cm', t: 0, accidentals: [[-1, 0, 0, 0, 0, -1], [0, 1, 0, 0, 1, 0], [0, 0, -1, 0, 0, 0]] },
  'Ab': { key: 'Ab', t: -2, accidentals: [[0, -1, 0, -1, 0, 0], [-1, 0, -1, -1, 0, -1], [-1, -1, 0, 0, -1, -1]] },   
  'Fm': { key: 'Fm', t: -4, accidentals: [[-1, 0, 0, 0, 0, -1], [0, '=', 0, 0, '=', 0], [0, 0, -1, 0, 0, 0]] }
};

function _getKeyObject(change) {  
  return _keyObj[change];
}

function getModelKeys() {
  return Object.keys(_keyObj);
}

const getOptions = change => {
  const modelTemplate = ModelHelper.getModelTemplate('upperFiveModulation');
  if(change) {
    modelTemplate.key = change;
  }
  return modelTemplate;
};

const getVoices = upperFifthModulationOptions => {
  const voicesLength = 6;
  const measure = [' | ', ' ', ' | ', ' ', ' | ', ' '];
  const voices = [[9, 8, 8, 7, 7, 6], [4, 3, 4, 4, 3, 4], [0, 0, -1, -2, 1, -3]];
  const options = upperFifthModulationOptions || getOptions();
  const changeMode = options.addProps['changeMode'][0];
  const begin65 = options.addProps['begin65'][0];
  const keyObject = _getKeyObject(options.key);

  
  switch (options.key) {
    case 'C':
    case 'F':
    case 'B':
      keyObject.accidentals[0][5] = changeMode ? -1 : 0;
      keyObject.accidentals[2][2] = changeMode ? -1 : 0;
      options.addProps['changeMode'][1] = false;
      break;
    case 'Am':
    case 'Dm':
    case 'Gm':
    case 'Em':
    case 'Bm':
      keyObject.accidentals[0][5] = changeMode ? 1 : 0;
      keyObject.accidentals[2][2] = changeMode ? 1 : 0;
      options.addProps['changeMode'][1] = false;
      break;
    case 'Cm':
    case 'Fm':
      keyObject.accidentals[0][5] = changeMode ? 0 : -1;
      keyObject.accidentals[2][2] = changeMode ? 0 : -1;
      options.addProps['changeMode'][1] = false;
      break;
    case 'G':
    case 'D':
    case 'A':
    case 'E':
      keyObject.accidentals[0][5] = changeMode ? 0 : 1;
      keyObject.accidentals[2][2] = changeMode ? 0 : 1;
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
    measure,
    begin65
  );
};

const getStaff = () => {
  return ['x | x x | x x | x', 'x | x x | x x | x', 'x | x x | x x | x '];
};

const getExample = () => {
  return ['', '', '']; 
};

const UpperFiveModulation = {
  getDefaultOptions: getOptions,
  getVoices,
  getModelKeys,
  getEmptyStaff: getStaff,
  getMusicExample: getExample
};

export default UpperFiveModulation;