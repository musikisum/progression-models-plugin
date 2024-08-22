import ModelHelper from '../model-helper.js';
import ModelTemplates from '../model-templates.js';

const _keyObj = {
  'E': { key: 'E', t: 2, accidentals: [[1, 1, 0, 0, 0, '=', 0, 1, 0, 0, 0, 0], [0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1], [0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1]] },
  'G#m': { key: 'G#m', t: -3, accidentals: [[0, '=', 0, 1, 0, 1, 0, 0, 0, '=', 0, 1], [1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0], [1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0]] },  
  'A': { key: 'A', t: -2, accidentals: [[1, 0, 0, 0, 0, '=', 0, 1, 0, 0, 0, 0], [0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0], [0, 1, 1, 1, 0, 0, 1, 0, 1, 1, 1, 0]] },
  'F#m': { key: 'F#m', t: -4, accidentals: [[0, '=', 0, 1, 0, 0, 0, 0, 0, '=', 0, 0], [1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0], [1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0]] },
  'D': { key: 'D', t: 1, accidentals: [[1, 0, 0, 0, 0, '=', 0, 0, 0, 0, 0, 0], [0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0], [0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0]] },
  'Bm': { key: 'Bm', t: -1, accidentals: [[0, '=', 0, 0, 0, 0, 0, 0, 0, '=', 0, 0], [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0], [0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0]] },
  'G': { key: 'G', t: -3, accidentals: [[0, 0, 0, 0, 0, '=', 0, 0, 0, 0, 0, 0], [0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0]] },
  'Em': { key: 'Em', t: 2, accidentals: [[0, '=', 0, 0, 0, 0, 0, 0, 0, -1, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0]] },
  'C': { key: 'C', t: 0, accidentals: [[0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 1, 0, 0, 0, 0, 0, 0, '=', 1, 0]] },
  'Am': { key: 'Am', t: -2, accidentals: [[0, -1, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1], [0, 0, 0, 0, 0, '=', 1, 0, 0, 0, 0, -1]] },
  'F': { key: 'F', t: -3, accidentals: [[0, 0, 0, 0, 0, '=', 0, 0, 0, 0, 0, 0], [0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0]] },
  'Dm': { key: 'Dm', t: 1, accidentals: [[0, -1, 0, 0, 0, 0, 0, -1, 0, -1, 0, 0], [0, 0, 0, 0, -1, -1, 0, 0, 0, 0, 0, -1], [0, 0, 0, -1, 0, '=', 1, 0, -1, 0, 0, -1]] },
  'B': { key: 'B', t: -1, accidentals: [[0, 0, 0, -1, 0, -1, 0, 0, 0, 0, 0, -1], [-1, -1, 0, 0, 0, 0, 0, 0, -1, -1, 0, 0], [-1, '=', 1, 0, -1, 0, 0, -1, 0, '=', '=', 0]] },   
  'Gm': { key: 'Gm', t: -3, accidentals: [[-1, -1, 0, 0, 0, 0, 0, -1, 0, -1, 0, 0], [0, 0, 0, 0, -1, -1, 0, 0, 0, 0, -1, -1], [0, 0, 0, -1, 0, '=', '=', 0, -1, 0, 0, -1]] },
  'Eb': { key: 'Eb', t: 2, accidentals: [[0, 0, 0, -1, 0, -1, 0, 0, 0, -1, 0, -1], [-1, -1, 0, 0, 0, 0, -1, -1, -1, -1, 0, 0], [-1, '=', '=', 0, -1, 0, 0, -1, 0, 0, 0, 0]] },   
  'Cm': { key: 'Cm', t: 0, accidentals: [[-1, -1, 0, 0, 0, -1, 0, -1, 0, -1, 0, 0], [0, 0, -1, -1, -1, -1, 0, 0, 0, 0, -1, -1], [0, 0, 0, -1, 0, '=', '=', 0, -1, -1, 0, -1]] }
};

function _getKeyObject(change) {  
  return _keyObj[change];
}

function getModelKeys() {
  return Object.keys(_keyObj);
}


const getOptions = change => {
  const modelTemplate = ModelTemplates.getModelTemplate('parallelismusDiminished');
  if(change) {
    modelTemplate.key = change;
  }
  return modelTemplate;
};

const getVoices = upperFifthModulationOptions => {
  let voicesLength = 0;
  const measure = [' | ', ' ', ' | ', ' ', ' | ', ' ', ' | ', ' ', ' | ', ' ', ' | ', ' '];
  const voices = [[9, 8, 8, 7, 7, 6 , 6, 5, 5, 4, 4, 3], [7, 7, 6, 6, 5, 5, 4, 4, 3, 3, 2 , 1], [7, 3, 4, 5, 0, 1, 2, 3, -2, -1, 0, 1]];
  const options = upperFifthModulationOptions || getOptions();
  const keyObject = _getKeyObject(options.key);
  if (options.addProps['numberOfSections'][0] === 1) {
    voicesLength = 4;
    voices[1][3] = 5;
  } else if (options.addProps['numberOfSections'][0] === 2) {
    voicesLength = 8;
    voices[1][7] = 3;      
  } else {
    voicesLength = 12;
  }
  if (options.numberOfSections === 1) {
    options.key === 'Dm' && (keyObject.accidentals[1][3] = -1);
    options.key === 'B' && (keyObject.accidentals[1][3] = -1);
    options.key === 'Gm' && (keyObject.accidentals[1][3] = -1);
    options.key === 'E' && (keyObject.accidentals[1][3] = 1);
    options.key === 'A' && (keyObject.accidentals[1][3] = 1);
    options.key === 'F#m' && (keyObject.accidentals[1][3] = 1);
    options.key === 'Bm' && (keyObject.accidentals[1][3] = 1);
  } else if (options.numberOfSections === 2) {
    options.key === 'G#m' && (keyObject.accidentals[1][3] = 1);
    options.key === 'Cm' && (keyObject.accidentals[1][3] = -1);
  }

  return ModelHelper.getVoices(
    options.transposeValues,
    options.voiceArrangement,
    voices,
    keyObject,
    voicesLength,
    measure
  )
};

const getStaff = () => {
  return ['x | x x | x x | x x | x x | x x | x]', 'x | x x | x x | x x | x x | x x | x]', 'x | x x | x x | x x | x x | x x | x]'];
};

const getExample = () => {
  return ['', '', '']; 
};

const ParallelismusDiminished = {
  getDefaultOptions: getOptions,
  getVoices,
  getModelKeys,
  getEmptyStaff: getStaff,
  getMusicExample: getExample
};
  
export default ParallelismusDiminished;