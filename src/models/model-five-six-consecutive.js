import ModelUtilities from '../model-utilities.js';
import ModelTemplates from '../model-templates.js';
import cloneDeep from '@educandu/educandu/utils/clone-deep.js';

const _keyObj = {
  'E': { modelKey: 'E', t: 2, accidentals: [[0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1], [1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 0], [1, 0, 1, 1, '^^', 1, 1, 0, 1, 0, 1, 1]] },
  'A': { modelKey: 'A', t: -2, accidentals: [[0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1], [0, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 0], [1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1]] },
  'D': { modelKey: 'D', t: 1, accidentals: [[0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1], [0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0], [1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0]] },
  'G': { modelKey: 'G', t: 4, accidentals: [[0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0], [1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0]] },
  'C': { modelKey: 'C', t: 0, accidentals: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0], [0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0]] },  
  'F': { modelKey: 'F', t: 3, accidentals: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 1, 0, 1, 0, 0, -1, '=', 0, 1, 0]] },
  'Bb': { modelKey: 'Bb', t: -1, accidentals: [[0, 0, 0, 0, 0, 0, -1, -1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1], [0, -1, '=', 0, 1, 0, 0, -1, '=', 0, 1, 0]] },
  'Eb': { modelKey: 'Eb', t: 2, accidentals: [[-1, -1, 0, 0, 0, 0, -1, -1, 0, 0, 0, 0], [0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, -1], [0, -1, '=', 0, 1, 0, 0, -1, '=', -1, '=', 0]] },
  'Ab': { modelKey: 'Eb', t: -2, accidentals: [[-1, -1, 0, 0, 0, 0, -1, -1, -1, -1, 0, 0], [-1, 0, 0, -1, '=', -1, 0, 0, 0, 0, 0, -1], [0, -1, '=', -1, '=', 0, 0, -1, '=', -1, '=', 0]] },
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

  return ModelUtilities.getVoicesWithLengthModifications(
    options.transposeValues, 
    options.voiceArrangement, 
    voices, 
    keyObject, 
    voicesLength, 
    measure, 
    options.addProps
  );
};

const _adjustMutetVoices = (voices, hideUpperSystem, hideLowerSystem) => {
  return ModelUtilities.convertToEmptyLines(voices, hideUpperSystem, hideLowerSystem);
}

const FiveSixConsecutive = {
  getDefaultOptions: getOptions,
  getVoices,
  getModelKeys,
  getMutedVoices: (voices, hideUpperSystem, hideLowerSystem) => _adjustMutetVoices(voices, hideUpperSystem, hideLowerSystem)
};

export default FiveSixConsecutive;