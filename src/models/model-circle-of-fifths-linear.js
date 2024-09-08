import ModelHelper from '../model-helper.js';
import ModelTemplates from '../model-templates.js';

const _keyObj = {
  'E': { modelKey: 'E', t: -5, accidentals: [[0, 0, 0, 1, 0, 1, 0, 1], [1, 1, 1, 1, 0, 0, 1, 0], [0, 1, 1, 0, 1, 0, 0, 0]] },
  'C#m': { modelKey: 'C#m', t: 0, accidentals: [[1, 1, 0, 0, 0, 1, 0, 0], [0, 0, 1, 1, 1, 1, 1, 1], [1, 0, 0, 1, 0, 1, 1, 1]] },
  'A': { modelKey: 'A', t: -2, accidentals: [[0, 0, 0, 1, 0, 0, 0, 1], [1, 1, 0, 0, 0, 0, 1, 0], [0, 1, 1, 0, 1, 0, 0, 0]] },
  'F#m': { modelKey: 'F#m', t: -4, accidentals: [[1, 0, 0, 0, 0, 1, 0, 0], [0, 0, 1, 1, 1, 1, 1, 1], [1, 0, 0, 1, 0, 0, 1, 1]] },
  'D': { modelKey: 'D', t: 1, accidentals: [[0, 0, 0, 1, 0, 0, 0, 1], [1, 1, 0, 0, 0, 0, 1, 0], [0, 0, 1, 0, 0, 0, 0, 0]] },
  'Bm': { modelKey: 'Bm', t: -1, accidentals: [[1, 0, 0, 0, 0, 1, 0, 0], [0, 0, 1, 1, 0, 0, 1, 0], [0, 0, 0, 1, 0, 0, 1, 0]] },
  'G': { modelKey: 'G', t: -3, accidentals: [[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 1, 0], [0, 0, 1, 0, 0, 0, 0, 0]] },
  'Em': { modelKey: 'Em', t: 2, accidentals: [[0, 0, 0, 0, 0, 1, 0, 0], [0, 0, 1, 1, 0, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0]] },
  'C': { modelKey: 'C', t: 0, accidentals: [[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]] },
  'Am': { modelKey: 'Am', t: -2, accidentals: [[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0]] },
  'F': { modelKey: 'F', t: -4, accidentals: [[0, -1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, -1, 0, 0]] },
  'Dm': { modelKey: 'Dm', t: 1, accidentals: [[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 1, 0], [0, -1, 0, 0, -1, 0, 0, 0]] },
  'Bb': { modelKey: 'Bb', t: -1, accidentals: [[0, -1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, -1, -1, 0, -1], [-1, 0, 0, 0, 0, -1, 0, -1]] }, 
  'Gm': { modelKey: 'Gm', t: -3, accidentals: [[0, 0, 0, -1, 0, 0, 0, -1], [-1, -1, 0, 0, 0, 0, 1, 0], [0, -1, 0, 0, -1, 0, 0, 0]] },
  'Eb': { modelKey: 'Eb', t: -5, accidentals: [[-1, -1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, -1, -1, 0, -1], [-1, 0, 0, -1, 0, -1, -1, -1]] },
  'Cm': { modelKey: 'Cm', t: 0, accidentals: [[0, 0, 0, -1, 0, 0, 0, -1], [-1, -1, 0, 0, 0, 0, '=', 0], [0, -1, -1, 0, -1, 0, 0, 0]] },
  'Ab': { modelKey: 'Ab', t: -2, accidentals: [[-1, -1, 0, 0, 0, -1, 0, 0], [0, 0, -1, -1, -1, -1, 0, -1], [-1, 0, 0, -1, 0, -1, -1, -1]] },
  'Fm': { modelKey: 'Fm', t: -4, accidentals: [[0, -1, 0, -1, 0, 0, 0, -1], [-1, -1, 0, 0, 0, 0, '=', 0], [0, -1, -1, 0, -1, -1, 0, 0]] }
};

function _getKeyObject(change) {  
  return _keyObj[change ?? 'C'];
}

function getModelKeys() {
  return Object.keys(_keyObj);
}

const getOptions = change => {
  const modelTemplate = ModelTemplates.getModelTemplate('circleOfFifthsLinear');
  if(change) {
    modelTemplate.modelKey = change;
  }
  return modelTemplate;
};

const getVoices = fifthsCircleLinearOptions => {
  const voicesLength = 8;
  const measure = [' | ', ' ', ' | ', ' ', ' | ', ' ', ' | ', ' '];
  const voices = [[11, 10, 10, 9, 9, 8, 8, 9], [9, 9, 8, 8, 7, 7, 6, 7], [7, 5, 6, 4, 5, 3, 4, 0]];
  const options = fifthsCircleLinearOptions ?? getOptions();
  if(options.addProps['lastBassNoteUp'][0]) {
    voices[2][7] = 7;
  }
  return ModelHelper.getVoicesWithLengthModifications(
    options.transposeValues, 
    options.voiceArrangement, 
    voices, 
    _getKeyObject(options.modelKey), 
    voicesLength, 
    measure, 
    options.addProps
  );
};

const _adjustMutetVoices = (voices, hideUpperSystem, hideLowerSystem) => {
  return ModelHelper.convertToEmptyLines(voices, hideUpperSystem, hideLowerSystem);
}

const CircleOfFifthsLinear = {
  getDefaultOptions: getOptions,
  getVoices,
  getModelKeys,
  getMutedVoices: (voices, hideUpperSystem, hideLowerSystem) => _adjustMutetVoices(voices, hideUpperSystem, hideLowerSystem),
};

export default CircleOfFifthsLinear;