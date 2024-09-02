import ModelHelper from '../model-helper.js';
import ModelTemplates from '../model-templates.js';
import cloneDeep from '@educandu/educandu/utils/clone-deep.js';

const _keyObj = {
  'E': { modelKey: 'E', t: 2, accidentals: [[0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1], [1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 0], [1, 0, 1, 1, '^^', 1, 1, 0, 1, 0, 1, 1]] },
  'C#m': { modelKey: 'E', t: 2, accidentals: [[0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1], [1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 0], [1, 0, 1, 1, '\'\'', 1, 1, 0, 1, 0, 1, 1]] },
  'A': { modelKey: 'A', t: -2, accidentals: [[0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1], [0, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 0], [1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1]] },
  'F#m': { modelKey: 'A', t: -2, accidentals: [[0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1], [0, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 0], [1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1]] },  
  'D': { modelKey: 'D', t: 1, accidentals: [[0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1], [0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0], [1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0]] },
  'Bm': { modelKey: 'D', t: 1, accidentals: [[0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1], [0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0], [1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0]] },  
  'G': { modelKey: 'G', t: 4, accidentals: [[0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0], [1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0]] },
  'Em': { modelKey: 'G', t: 4, accidentals: [[0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0], [1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0]] },
  'C': { modelKey: 'C', t: 0, accidentals: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0], [0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0]] },  
  'Am': { modelKey: 'C', t: 0, accidentals: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0], [0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0]] },
  'F': { modelKey: 'F', t: 3, accidentals: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 1, 0, 1, 0, 0, -1, 0, 0, 1, 0]] },
  'Dm': { modelKey: 'F', t: 3, accidentals: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 1, 0, 1, 0, 0, -1, '=', 0, 1, 0]] },
  'Bb': { modelKey: 'Bb', t: -1, accidentals: [[0, 0, 0, 0, 0, 0, -1, -1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1], [0, -1, '=', 0, 1, 0, 0, -1, '=', 0, 1, 0]] },
  'Gm': { modelKey: 'Bb', t: -1, accidentals: [[0, 0, 0, 0, 0, 0, -1, -1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1], [0, -1, '=', 0, 1, 0, 0, -1, '=', 0, 1, 0]] },
  'Eb': { modelKey: 'Eb', t: 2, accidentals: [[-1, -1, 0, 0, 0, 0, -1, -1, 0, 0, 0, 0], [0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, -1], [0, -1, '=', 0, 1, 0, 0, -1, '=', -1, '=', 0]] },
  'Cm': { modelKey: 'Eb', t: 2, accidentals: [[-1, -1, 0, 0, 0, 0, -1, -1, 0, 0, 0, 0], [0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, -1], [0, -1, '=', 0, 1, 0, 0, -1, '=', -1, '=', 0]] },
  'Ab': { modelKey: 'Eb', t: -2, accidentals: [[-1, -1, 0, 0, 0, 0, -1, -1, -1, -1, 0, 0], [-1, 0, 0, -1, '=', -1, 0, 0, 0, 0, 0, -1], [0, -1, '=', -1, '=', 0, 0, -1, '=', -1, '=', 0]] },
  'Fm': { modelKey: 'Eb', t: -2, accidentals: [[-1, -1, 0, 0, 0, 0, -1, -1, -1, -1, 0, 0], [-1, 0, 0, -1, '=', -1, 0, 0, 0, 0, 0, -1], [0, -1, '=', -1, '=', 0, 0, -1, '=', -1, '=', 0]] }
};

function _getKeyObject(change) {  
  return _keyObj[change ?? 'C'];
}

function getModelKeys() {
  return Object.keys(_keyObj);
}

const getOptions = change => {
  const modelTemplate = ModelTemplates.getModelTemplate('fiveSixConsecutive');
  if(change) {
    modelTemplate.modelKey = change;
  }
  return modelTemplate;
};

const getVoices = modelOptions => {
  const voicesLength = 12;
  const measure = [' | ', ' ', ' | ', ' ', ' | ', ' ', ' | ', ' ', ' | ', ' ', ' | ', ' '];
  const voices = [[4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9], [1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7], [-1, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5]];
  const options = modelOptions ?? getOptions();
  let keyObject = _getKeyObject(options.modelKey);
  if (options.addProps['diatonic'][0]) {
    keyObject = cloneDeep(_getKeyObject(options.modelKey));
    keyObject.accidentals = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]; 
  } else {
    keyObject = _getKeyObject(options.modelKey);
  }

  return ModelHelper.getVoicesWithLengthModifications(
    options.transposeValues, 
    options.voiceArrangement, 
    voices, 
    keyObject, 
    voicesLength, 
    measure, 
    options.addProps
  );
};

const getStaff = () => {
  return ['x | x x | x x | x x | x x | x x | x ]', 'x | x x | x x | x x | x x | x x | x ]', 'x | x x | x x | x x | x x | x x | x ]'];
};

const FiveSixConsecutive = {
  getDefaultOptions: getOptions,
  getVoices,
  getModelKeys,
  getEmptyStaff: getStaff
};

export default FiveSixConsecutive;