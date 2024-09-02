import ModelHelper from '../model-helper.js';
import ModelTemplates from '../model-templates.js';

const _keyObj = {
  'E': { modelKey: 'E', t: 2, accidentals: [[1, 1, 0, 0, 0, '=', 0, 1, 0, 0, 0, 0], [0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1], [0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1]] },
  'G#m': { modelKey: 'G#m', t: -3, accidentals: [[0, '=', 0, 1, 0, 1, 0, 0, 0, '=', 0, 1], [1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0], [1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0]] },  
  'A': { modelKey: 'A', t: -2, accidentals: [[1, 0, 0, 0, 0, '=', 0, 1, 0, 0, 0, 0], [0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0], [0, 1, 1, 1, 0, 0, 1, 0, 1, 1, 1, 0]] },
  'F#m': { modelKey: 'F#m', t: -4, accidentals: [[0, '=', 0, 1, 0, 0, 0, 0, 0, '=', 0, 0], [1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0], [1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0]] },
  'D': { modelKey: 'D', t: 1, accidentals: [[1, 0, 0, 0, 0, '=', 0, 0, 0, 0, 0, 0], [0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0], [0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0]] },
  'Bm': { modelKey: 'Bm', t: -1, accidentals: [[0, '=', 0, 0, 0, 0, 0, 0, 0, '=', 0, 0], [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0], [0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0]] },
  'G': { modelKey: 'G', t: -3, accidentals: [[0, 0, 0, 0, 0, '=', 0, 0, 0, 0, 0, 0], [0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0]] },
  'Em': { modelKey: 'Em', t: 2, accidentals: [[0, '=', 0, 0, 0, 0, 0, 0, 0, -1, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0]] },
  'C': { modelKey: 'C', t: 0, accidentals: [[0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 1, 0, 0, 0, 0, 0, 0, '=', 1, 0]] },
  'Am': { modelKey: 'Am', t: -2, accidentals: [[0, -1, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1], [0, 0, 0, 0, 0, '=', 1, 0, 0, 0, 0, -1]] },
  'F': { modelKey: 'F', t: -3, accidentals: [[0, 0, 0, 0, 0, '=', 0, 0, 0, 0, 0, 0], [0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0]] },
  'Dm': { modelKey: 'Dm', t: 1, accidentals: [[0, -1, 0, 0, 0, 0, 0, -1, 0, -1, 0, 0], [0, 0, 0, 0, -1, -1, 0, 0, 0, 0, 0, -1], [0, 0, 0, -1, 0, '=', 1, 0, -1, 0, 0, -1]] },
  'B': { modelKey: 'B', t: -1, accidentals: [[0, 0, 0, -1, 0, -1, 0, 0, 0, 0, 0, -1], [-1, -1, 0, 0, 0, 0, 0, 0, -1, -1, 0, 0], [-1, '=', 1, 0, -1, 0, 0, -1, 0, '=', '=', 0]] },   
  'Gm': { modelKey: 'Gm', t: -3, accidentals: [[-1, -1, 0, 0, 0, 0, 0, -1, 0, -1, 0, 0], [0, 0, 0, 0, -1, -1, 0, 0, 0, 0, -1, -1], [0, 0, 0, -1, 0, '=', '=', 0, -1, 0, 0, -1]] },
  'Eb': { modelKey: 'Eb', t: 2, accidentals: [[0, 0, 0, -1, 0, -1, 0, 0, 0, -1, 0, -1], [-1, -1, 0, 0, 0, 0, -1, -1, -1, -1, 0, 0], [-1, '=', '=', 0, -1, 0, 0, -1, 0, 0, 0, 0]] },   
  'Cm': { modelKey: 'Cm', t: 0, accidentals: [[-1, -1, 0, 0, 0, -1, 0, -1, 0, -1, 0, 0], [0, 0, -1, -1, -1, -1, 0, 0, 0, 0, -1, -1], [0, 0, 0, -1, 0, '=', '=', 0, -1, -1, 0, -1]] }
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
    modelTemplate.modelKey = change;
  }
  return modelTemplate;
};

const getVoices = upperFifthModulationOptions => {
  let voicesLength = 0;
  const measure = [' | ', ' ', ' | ', ' ', ' | ', ' ', ' | ', ' ', ' | ', ' ', ' | ', ' '];
  const voices = [[9, 8, 8, 7, 7, 6 , 6, 5, 5, 4, 4, 3], [7, 7, 6, 6, 5, 5, 4, 4, 3, 3, 2 , 1], [7, 3, 4, 5, 0, 1, 2, 3, -2, -1, 0, 1]];
  const options = upperFifthModulationOptions || getOptions();
  const keyObject = _getKeyObject(options.modelKey);
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
    options.modelKey === 'Dm' && (keyObject.accidentals[1][3] = -1);
    options.modelKey === 'B' && (keyObject.accidentals[1][3] = -1);
    options.modelKey === 'Gm' && (keyObject.accidentals[1][3] = -1);
    options.modelKey === 'E' && (keyObject.accidentals[1][3] = 1);
    options.modelKey === 'A' && (keyObject.accidentals[1][3] = 1);
    options.modelKey === 'F#m' && (keyObject.accidentals[1][3] = 1);
    options.modelKey === 'Bm' && (keyObject.accidentals[1][3] = 1);
  } else if (options.numberOfSections === 2) {
    options.modelKey === 'G#m' && (keyObject.accidentals[1][3] = 1);
    options.modelKey === 'Cm' && (keyObject.accidentals[1][3] = -1);
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