import ModelHelper from '../model-helper.js';
import ModelTemplates from '../model-templates.js';

const _keyObj = {
  'E': { key: 'E', t: 2, accidentals: [[1, 1, 0, 1, 0, 0, 0, 0, 1, 1], [0, 0, 0, 1, 0, 1, 1, 1, 0, 0], [0, 0, 0, 1, 0, 1, 0, 0, 0, 0]] },
  'C#m': { key: 'C#m', t: 0, accidentals: [[0, 0, 0, 0, 1, 1, 0, 1, 0, 0], [1, 1, 1, 0, 0, 0, 0, 1, 0, 1], [1, 1, 0, 0, 0, 0, 0, 1, 0, 1]] },
  'A': { key: 'A', t: -2, accidentals: [[1, 1, 0, 1, 0, 0, 0, 0, 1, 1], [0, 0, 0, 1, 0, 1, 1, 0, 0, 0], [0, 0, 0, 1, 0, 1, 0, 0, 0, 0]] },
  'F#m': { key: 'F#m', t: -4, accidentals: [[0, 0, 0, 0, 1, 1, 0, 1, 0, 0], [1, 1, 0, 0, 0, 0, 0, 1, 0, 1], [1, 0, 0, 0, 0, 0, 0, 1, 0, 1]] },
  'D': { key: 'D', t: 1, accidentals: [[1, 0, 0, 0, 0, 0, 0, 0, 1, 1], [0, 0, 0, 1, 0, 1, 0, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0, 0, 0, 0]] },
  'Bm': { key: 'Bm', t: -1, accidentals: [[0, 0, 0, 0, 1, 0, 0, 0, 1, 0], [1, 1, 0, 0, 0, 0, 0, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0, 1, 0, 0]] },
  'G': { key: 'G', t: -3, accidentals: [[0, 0, 0, 0, 1, 0, 0, 0, 1, 0], [0, 0, 0, 1, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]] },
  'Em': { key: 'Em', t: 2, accidentals: [[0, 0, 0, 0, 0, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]] },
  'C': { key: 'C', t: 0, accidentals: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]] },
  'Am': { key: 'Am', t: -2, accidentals: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]] },
  'F': { key: 'F', t: -4, accidentals: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, -1, 0, 0, 0, 0, 0, 0, 0], [0, -1, 0, 0, 0, 0, 0, 0, 0, 0]] },
  'Dm': { key: 'Dm', t: 1, accidentals: [[0, -1, 0, -1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, -1, 0, 0, 0], [0, 0, 0, 0, 0, -1, 0, 0, 0, 0]] },
  'Bb': { key: 'Bb', t: -1, accidentals: [[0, 0, 0, 0, 1, -1, 0, -1, 0, 0], [0, 0, -1, 0, 0, 0, 0, 0, 0, -1], [-1, -1, 0, 0, 0, 0, 0, 0, 0, -1]] },
  'Gm': { key: 'Gm', t: -3, accidentals: [[-1, -1, 0, -1, 0, 0, 0, 0, 0, -1], [0, 0, 0, 0, 0, 0, -1, 0, 0, 0], [0, 0, 0, -1, 0, -1, 0, 0, 0, 0]] },
  'Eb': { key: 'Eb', t: 2, accidentals: [[0, 0, 0, 0, -1, -1, 0, -1, 0, 0], [-1, -1, -1, 0, 0, 0, 0, 0, 0, -1], [-1, -1, 0, 0, 0, 0, 0, -1, 0, -1]] },
  'Cm': { key: 'Cm', t: 0, accidentals: [[-1, -1, 0, -1, 0, 0, 0, 0, -1, -1], [0, 0, 0, -1, 0, -1, -1, 0, 0, 0], [0, 0, 0, -1, 0, -1, 0, 0, 0, 0]] },
  'Ab': { key: 'Ab', t: -2, accidentals: [[0, 0, 0, 0, -1, -1, 0, -1, 0, 0], [-1, -1, -1, 0, 0, 0, 0, -1, 0, -1], [-1, -1, 0, 0, 0, 0, 0, -1, 0, -1]] },
  'Fm': { key: 'Fm', t: -4, accidentals: [[-1, -1, 0, -1, 0, 0, 0, 0, -1, -1], [0, 0, -1, -1, 0, -1, -1, 0, 0, 0], [0, -1, 0, -1, 0, -1, 0, 0, 0, 0]] }
};

const _keyObjShort = {
  'E': { key: 'E', t: 2, accidentals: [[0, 1, 1, 0, 1, 1], [1, 0, 0, 1, 1, 0], [0, 0, 1, 1, 0, 0]] },
  'C#m': { key: 'C#m', t: 0, accidentals: [[1, 0, 0, 1, 1, 0], [0, 1, 1, 0, 0, 1], [1, 1, 0, 0, 1, 1]] },
  'A': { key: 'A', t: -2, accidentals: [[0, 1, 1, 0, 0, 1], [1, 0, 0, 1, 1, 0], [0, 0, 1, 1, 0, 0]] },
  'F#m': { key: 'F#m', t: -4, accidentals: [[1, 0, 0, 1, 1, 0], [0, 0, 1, 0, 0, 1], [1, 0, 0, 0, 1, 1]] }, 
  'D': { key: 'D', t: 1, accidentals: [[0, 0, 1, 0, 0, 1], [1, 0, 0, 0, 1, 0], [0, 0, 1, 0, 0, 0]] },
  'Bm': { key: 'Bm', t: -1, accidentals: [[1, 0, 0, 0, 1, 0], [0, 0, 1, 0, 0, 0], [0, 0, 0, 0, 1, 0]] },
  'G': { key: 'G', t: -3, accidentals: [[0, 0, 1, 0, 0, 0], [0, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 0]] },
  'Em': { key: 'Em', t: 2, accidentals: [[0, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]] },
  'C': { key: 'C', t: 0, accidentals: [[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]] },
  'Am': { key: 'Am', t: -2, accidentals: [[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]] },
  'F': { key: 'F', t: -4, accidentals: [[0, 0, 0, 0, 0, 0], [0, -1, 0, 0, 0, 0], [0, -1, 0, 0, 0, 0]] },
  'Dm': { key: 'Dm', t: 1, accidentals: [[0, -1, 0, 0, 0, 0], [0, 0, 0, -1, 0, 0], [0, 0, 0, -1, 0, 0]] },
  'Bb': { key: 'Bb', t: -1, accidentals: [[0, 0, 0, -1, 0, 0], [0, -1, 0, 0, 0, -1], [-1, -1, 0, 0, 0, -1]] },
  'Gm': { key: 'Gm', t: -3, accidentals: [[0, -1, 0, 0, 0, -1], [-1, 0, 0, -1, 0, 0], [0, 0, -1, -1, 0, 0]] },
  'Eb': { key: 'Eb', t: 2, accidentals: [[-1, 0, 0, -1, 0, 0], [0, -1, 0, 0, 0, -1], [-1, -1, 0, 0, -1, -1]] },
  'Cm': { key: 'Cm', t: 0, accidentals: [[0, -1, -1, 0, 0, -1], [-1, 0, 0, -1, -1, 0], [0, 0, -1, -1, 0, 0]] },
  'Ab': { key: 'Ab', t: -2, accidentals: [[-1, 0, 0, -1, -1, 0], [0, -1, 0, 0, 0, -1], [-1, -1, 0, 0, -1, -1]] },
  'Fm': { key: 'Fm', t: -4, accidentals: [[0, -1, -1, 0, 0, -1], [-1, -1, 0, -1, -1, 0], [0, -1, -1, -1, 0, 0]] }
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
  const modelTemplate = ModelTemplates.getModelTemplate('parallelismusUp');
  if(change) {
    modelTemplate.key = change;
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
        options.addProps['chromatic'][1] = !options.key.includes('m') ? false : true;
        options.key.includes('m') && (options.addProps['chromatic'][0] = false);
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
  return options;
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
} 

const getVoices = parallelismusUpOptions => {
  const options = _AdjustOptions(parallelismusUpOptions || getOptions());
  const withSyncopations = options.addProps['syncopation'][0];
  const keyObject = withSyncopations ? _getKeyObject(options.key) : _getKeyObjectShort(options.key);
  
  // Set accidentals for reduction of model length
  const chromatic = options.addProps['chromatic'][0];
  const isNatural = ['Eb', 'Ab', 'Cm', 'Fm'];
  if (!keyObject.key.includes('m')) {
    // for major Mode
    if (!withSyncopations) { // without syncopation
      keyObject.accidentals[1][2] = chromatic ? 
      (!isNatural.includes(keyObject.key) ? 1 : '=') : // with chromatic
      (!isNatural.includes(keyObject.key) ? 0 : -1); // without chromatic
    } else { // with syncopations
      keyObject.accidentals[0][4] = chromatic ? 
      (!isNatural.includes(keyObject.key) ? 1 : '=') : // with chromatic
      (!isNatural.includes(keyObject.key) ? 0 : -1); // without chromatic
    }
  } else {
    // for minor Mode
    if (!withSyncopations) { // without syncopation
      keyObject.accidentals[1][4] = chromatic ? 
      (!isNatural.includes(keyObject.key) ? 1 : '=') : // with chromatic
      (!isNatural.includes(keyObject.key) ? 0 : -1); // without chromatic
    } else { // with syncopations
      keyObject.accidentals[0][8] = chromatic ? 
      (!isNatural.includes(keyObject.key) ? 1 : '=') : // with chromatic
      (!isNatural.includes(keyObject.key) ? 0 : -1); // without chromatic
    }    
  }

  // Set accidentals for second voice ending in first reduction of model length
  if (options.addProps['numberOfSections'][0] === 2) {
    modifyLastChordSectionEndings(options, keyObject, options.key);
  }

  return ModelHelper.getVoices(
    options.transposeValues,
    options.voiceArrangement, 
    options.voices, 
    keyObject, 
    options.voicesLength, 
    options.measure
  );
};

const getStaff = () => {
  return ['x | x x | x x | x x | x x | x', 'x | x x | x x | x x | x x | x', 'x | x x | x x | x x | x x | x'];
};

const getExample = () => {
  return ['', '', '']; 
};

const ParallismusUp = {
  getDefaultOptions: getOptions,
  getVoices,
  getModelKeys,
  getEmptyStaff: getStaff,
  getMusicExample: getExample
};

export default ParallismusUp;