import ModelUtilities from '../model-utilities.js';
import ModelTemplates from '../model-templates.js';

const _keyObj = {
  'E': { modelKey: 'E', t: 2, accidentals: [[1, 1, 0, 1, 0, 0, 0, 0, 1, 1], [0, 0, 0, 1, 0, 1, 1, 1, 0, 0], [0, 0, 0, 1, 0, 1, 0, 0, 0, 0]] },
  'C#m': { modelKey: 'C#m', t: 0, accidentals: [[0, 0, 0, 0, 1, 1, 0, 1, 0, 0], [1, 1, 1, 0, 0, 0, 0, 1, 0, 1], [1, 1, 0, 0, 0, 0, 0, 1, 0, 1]] },
  'A': { modelKey: 'A', t: -2, accidentals: [[1, 1, 0, 1, 0, 0, 0, 0, 1, 1], [0, 0, 0, 1, 0, 1, 1, 0, 0, 0], [0, 0, 0, 1, 0, 1, 0, 0, 0, 0]] },
  'F#m': { modelKey: 'F#m', t: -4, accidentals: [[0, 0, 0, 0, 1, 1, 0, 1, 0, 0], [1, 1, 0, 0, 0, 0, 0, 1, 0, 1], [1, 0, 0, 0, 0, 0, 0, 1, 0, 1]] },
  'D': { modelKey: 'D', t: 1, accidentals: [[1, 0, 0, 0, 0, 0, 0, 0, 1, 1], [0, 0, 0, 1, 0, 1, 0, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0, 0, 0, 0]] },
  'Bm': { modelKey: 'Bm', t: -1, accidentals: [[0, 0, 0, 0, 1, 0, 0, 0, 1, 0], [1, 1, 0, 0, 0, 0, 0, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0, 1, 0, 0]] },
  'G': { modelKey: 'G', t: -3, accidentals: [[0, 0, 0, 0, 1, 0, 0, 0, 1, 0], [0, 0, 0, 1, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]] },
  'Em': { modelKey: 'Em', t: 2, accidentals: [[0, 0, 0, 0, 0, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]] },
  'C': { modelKey: 'C', t: 0, accidentals: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]] },
  'Am': { modelKey: 'Am', t: -2, accidentals: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]] },
  'F': { modelKey: 'F', t: -4, accidentals: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, -1, 0, 0, 0, 0, 0, 0, 0], [0, -1, 0, 0, 0, 0, 0, 0, 0, 0]] },
  'Dm': { modelKey: 'Dm', t: 1, accidentals: [[0, -1, 0, -1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, -1, 0, 0, 0], [0, 0, 0, 0, 0, -1, 0, 0, 0, 0]] },
  'Bb': { modelKey: 'Bb', t: -1, accidentals: [[0, 0, 0, 0, 1, -1, 0, -1, 0, 0], [0, 0, -1, 0, 0, 0, 0, 0, 0, -1], [-1, -1, 0, 0, 0, 0, 0, 0, 0, -1]] },
  'Gm': { modelKey: 'Gm', t: -3, accidentals: [[-1, -1, 0, -1, 0, 0, 0, 0, 0, -1], [0, 0, 0, 0, 0, 0, -1, 0, 0, 0], [0, 0, 0, -1, 0, -1, 0, 0, 0, 0]] },
  'Eb': { modelKey: 'Eb', t: 2, accidentals: [[0, 0, 0, 0, -1, -1, 0, -1, 0, 0], [-1, -1, -1, 0, 0, 0, 0, 0, 0, -1], [-1, -1, 0, 0, 0, 0, 0, -1, 0, -1]] },
  'Cm': { modelKey: 'Cm', t: 0, accidentals: [[-1, -1, 0, -1, 0, 0, 0, 0, -1, -1], [0, 0, 0, -1, 0, -1, -1, 0, 0, 0], [0, 0, 0, -1, 0, -1, 0, 0, 0, 0]] },
  'Ab': { modelKey: 'Ab', t: -2, accidentals: [[0, 0, 0, 0, -1, -1, 0, -1, 0, 0], [-1, -1, -1, 0, 0, 0, 0, -1, 0, -1], [-1, -1, 0, 0, 0, 0, 0, -1, 0, -1]] },
  'Fm': { modelKey: 'Fm', t: -4, accidentals: [[-1, -1, 0, -1, 0, 0, 0, 0, -1, -1], [0, 0, -1, -1, 0, -1, -1, 0, 0, 0], [0, -1, 0, -1, 0, -1, 0, 0, 0, 0]] }
};

const _keyObjShort = {
  'E': { modelKey: 'E', t: 2, accidentals: [[0, 1, 1, 0, 1, 1], [1, 0, 0, 1, 1, 0], [0, 0, 1, 1, 0, 0]] },
  'C#m': { modelKey: 'C#m', t: 0, accidentals: [[1, 0, 0, 1, 1, 0], [0, 1, 1, 0, 0, 1], [1, 1, 0, 0, 1, 1]] },
  'A': { modelKey: 'A', t: -2, accidentals: [[0, 1, 1, 0, 0, 1], [1, 0, 0, 1, 1, 0], [0, 0, 1, 1, 0, 0]] },
  'F#m': { modelKey: 'F#m', t: -4, accidentals: [[1, 0, 0, 1, 1, 0], [0, 0, 1, 0, 0, 1], [1, 0, 0, 0, 1, 1]] }, 
  'D': { modelKey: 'D', t: 1, accidentals: [[0, 0, 1, 0, 0, 1], [1, 0, 0, 0, 1, 0], [0, 0, 1, 0, 0, 0]] },
  'Bm': { modelKey: 'Bm', t: -1, accidentals: [[1, 0, 0, 0, 1, 0], [0, 0, 1, 0, 0, 0], [0, 0, 0, 0, 1, 0]] },
  'G': { modelKey: 'G', t: -3, accidentals: [[0, 0, 1, 0, 0, 0], [0, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 0]] },
  'Em': { modelKey: 'Em', t: 2, accidentals: [[0, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]] },
  'C': { modelKey: 'C', t: 0, accidentals: [[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]] },
  'Am': { modelKey: 'Am', t: -2, accidentals: [[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]] },
  'F': { modelKey: 'F', t: -4, accidentals: [[0, 0, 0, 0, 0, 0], [0, -1, 0, 0, 0, 0], [0, -1, 0, 0, 0, 0]] },
  'Dm': { modelKey: 'Dm', t: 1, accidentals: [[0, -1, 0, 0, 0, 0], [0, 0, 0, -1, 0, 0], [0, 0, 0, -1, 0, 0]] },
  'Bb': { modelKey: 'Bb', t: -1, accidentals: [[0, 0, 0, -1, 0, 0], [0, -1, 0, 0, 0, -1], [-1, -1, 0, 0, 0, -1]] },
  'Gm': { modelKey: 'Gm', t: -3, accidentals: [[0, -1, 0, 0, 0, -1], [-1, 0, 0, -1, 0, 0], [0, 0, -1, -1, 0, 0]] },
  'Eb': { modelKey: 'Eb', t: 2, accidentals: [[-1, 0, 0, -1, 0, 0], [0, -1, 0, 0, 0, -1], [-1, -1, 0, 0, -1, -1]] },
  'Cm': { modelKey: 'Cm', t: 0, accidentals: [[0, -1, -1, 0, 0, -1], [-1, 0, 0, -1, -1, 0], [0, 0, -1, -1, 0, 0]] },
  'Ab': { modelKey: 'Ab', t: -2, accidentals: [[-1, 0, 0, -1, -1, 0], [0, -1, 0, 0, 0, -1], [-1, -1, 0, 0, -1, -1]] },
  'Fm': { modelKey: 'Fm', t: -4, accidentals: [[0, -1, -1, 0, 0, -1], [-1, -1, 0, -1, -1, 0], [0, -1, -1, -1, 0, 0]] }
};

function _getKeyObject(change) {  
  return _keyObj[change];
}

function _getKeyObjectShort(change) {  
  return _keyObjShort[change];
}

function getModelKeys() {
  return Object.keys(_keyObj);
}

const getOptions = change => {
  const modelTemplate = ModelTemplates.getModelTemplate('parallelismUp');
  if(change) {
    modelTemplate.modelKey = change;
  }
  return modelTemplate;
};

function _AdjustOptions(options) {
  switch(options.addProps['numberOfSections'][0]) {
    case 1: // without syncopations
      options.voices = [[4, 5], [2, 3], [0, 3]];
      options.measure = [' | ', ' '];
      options.voicesLength = 2;
      options.addProps['syncopation'] = [false, true];
      options.addProps['chromatic'] = [false, true];
      break;
    case 2:
      if(options.addProps['syncopation'][0]) { // with syncopations
        options.voices = [[2, 5, 5, 5, 4, 7], [4, 4, 3, 6, 6, 5], [0, 3, 3, 2, 2, 5]];
        options.measure = [' | ', ' ', ' | ', ' ', '|', ''];     
        options.voicesLength = 6;
        options.addProps['syncopation'][1] = false; 
        options.addProps['chromatic'] = [false, true];
      } else { // without syncopations
        options.voices = [[4, 5, 6, 7], [2, 3, 4, 5], [0, 3, 2, 5]]; 
        options.measure = [' | ', ' ', ' | ', ' '];
        options.voicesLength = 4;
        options.addProps['syncopation'][1] = false;
        options.addProps['chromatic'][1] = !options.modelKey.includes('m') ? false : true;
        options.modelKey.includes('m') && (options.addProps['chromatic'][0] = false);
      }      
      break; 
    default:
      if(options.addProps['syncopation'][0]) { // with syncopations
        options.voices = [[2, 5, 5, 5, 4, 7, 7, 7, 6, 9], [4, 4, 3, 6, 6, 6, 5, 8, 8, 7], [0, 3, 3, 2, 2, 5, 5, 4, 4, 7]];
        options.measure = [' | ', ' ', ' | ', ' ', ' | ', ' ', ' | ', ' ', ' | ', ' '];
        options.voicesLength = 10;
        options.addProps['syncopation'][1] = false;
        options.addProps['chromatic'][1] = false;
      } else { // without syncopations
        options.voices = [[4, 5, 6, 7, 8, 9], [2, 3, 4, 5, 6, 7], [0, 3, 2, 5, 4, 7]];
        options.measure = [' | ', ' ', ' | ', ' ', ' | ', ' '];
        options.voicesLength = 6;
        options.addProps['syncopation'][1] = false;
        options.addProps['chromatic'][1] = false;
      }      
      break;
  }
}

const modifyLastChordSectionEndings = (options, keyObject, key) => {
  switch (key) {
    case 'Dm':
    case 'Gm':
      (options.voicesLength === 6) && (keyObject.accidentals[1][5] = -1);
      break; 
    case 'D': 
    case 'G': 
      (options.voicesLength === 6) && (keyObject.accidentals[1][5] = 0);
      break;
    default:
      break;
  }
};

const getVoices = parallelismUpOptions => {
  const options = parallelismUpOptions ?? getOptions();
  _AdjustOptions(options);
  const withSyncopations = options.addProps['syncopation'][0];
  const keyObject = withSyncopations ? _getKeyObject(options.modelKey) : _getKeyObjectShort(options.modelKey);
  
  // Set accidentals for reduction of model length
  const chromatic = options.addProps['chromatic'][0];
  const isNatural = ['Eb', 'Ab', 'Cm', 'Fm'];
  if (!keyObject.modelKey.includes('m')) {
    // for major Mode
    if (!withSyncopations) { // without syncopation
      keyObject.accidentals[1][2] = chromatic ? 
      (!isNatural.includes(keyObject.modelKey) ? 1 : '=') : // with chromatic
      (!isNatural.includes(keyObject.modelKey) ? 0 : -1); // without chromatic
    } else { // with syncopations
      keyObject.accidentals[0][4] = chromatic ? 
      (!isNatural.includes(keyObject.modelKey) ? 1 : '=') : // with chromatic
      (!isNatural.includes(keyObject.modelKey) ? 0 : -1); // without chromatic
    }
  } else {
    // for minor Mode
    if (!withSyncopations) { // without syncopation
      keyObject.accidentals[1][4] = chromatic ? 
      (!isNatural.includes(keyObject.modelKey) ? 1 : '=') : // with chromatic
      (!isNatural.includes(keyObject.modelKey) ? 0 : -1); // without chromatic
    } else { // with syncopations
      keyObject.accidentals[0][8] = chromatic ? 
      (!isNatural.includes(keyObject.modelKey) ? 1 : '=') : // with chromatic
      (!isNatural.includes(keyObject.modelKey) ? 0 : -1); // without chromatic
    }    
  }

  // Set accidentals for second voice ending in first reduction of model length
  if (options.addProps['numberOfSections'][0] === 2) {
    modifyLastChordSectionEndings(options, keyObject, options.modelKey);
  }

  return ModelUtilities.getVoices(
    options.transposeValues,
    options.voiceArrangement, 
    options.voices, 
    keyObject, 
    options.voicesLength, 
    options.measure
  );
};

const _adjustMutetVoices = (voices, hideUpperSystem, hideLowerSystem) => {
  return ModelUtilities.convertToEmptyLines(voices, hideUpperSystem, hideLowerSystem);
}

const ParallismusUp = {
  getDefaultOptions: getOptions,
  getVoices,
  getModelKeys,
  getMutedVoices: (voices, hideUpperSystem, hideLowerSystem) => _adjustMutetVoices(voices, hideUpperSystem, hideLowerSystem)
};

export default ParallismusUp;