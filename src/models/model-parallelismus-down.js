import ModelHelper from '../model-helper.js';
import ModelTemplates from '../model-templates.js';

const _keyObj = {
  'E': { key: 'E', t: 2, accidentals: [[1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0], [0, 0, 1, 1, 1, 1, 0, 0, 0, 1], [0, 0, 0, 1, 0, 1, 0, 0, 0, 0]] },
  'C#m': { key: 'C#m', t: 0, accidentals: [[0, 1, 0, 1, 0, 0, 0, 0, 0, 1], [1, 1, 0, 0, 0, 0, 1, 1, 1, 0], [1, 1, 0, 0, 0, 0, 0, 1, 0, 1]] },
  'A': { key: 'A', t: -2, accidentals: [[1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0], [0, 0, 1, 1, 1, 1, 0, 0, 0, 1], [0, 0, 0, 1, 0, 1, 0, 0, 0, 0]] },
  'F#m': { key: 'F#m', t: 3, accidentals: [[0, 1, 0, 1, 0, 0, 0, 0, 0, 1], [1, 1, 0, 0, 0, 0, 1, 1, 0, 0], [1, 1, 0, 0, 0, 0, 0, 0, 0, 1]] },
  'D': { key: 'D', t: 1, accidentals: [[1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0], [0, 0, 1, 1, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 1, 0, 0, 0, 0]] },
  'Bm': { key: 'Bm', t: -1, accidentals: [[0, 1, 0, 0, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 0, 1, 1, 0, 0], [0, 1, 0, 0, 0, 0, 0, 0, 0, 0]] },
  'G': { key: 'G', t: -3, accidentals: [[0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0], [0, 0, 1, 1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]] },
  'Em': { key: 'Em', t: 2, accidentals: [[0, 1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]] },
  'C': { key: 'C', t: 0, accidentals: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]] },
  'Am': { key: 'Am', t: -2, accidentals: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]] },
  'F': { key: 'F', t: 3, accidentals: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, -1, 0], [0, 0, 0, 0, 0, 0, 0, -1, 0, 0]] },
  'Dm': { key: 'Dm', t: 1, accidentals: [[0, 0, 0, 0, 0, 0, 0, -1, 0, 0], [0, 0, 0, 0, -1, -1, 0, 0, 0, 0], [0, 0, 0, -1, 0, 0, 0, 0, 0, 0]] },
  'Bb': { key: 'Bb', t: -1, accidentals: [[0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0], [-1, -1, 0, 0, 0, 0, 0, 0, -1, 0], [-1, 0, 0, 0, 0, 0, 0, -1, 0, -1]] },
  'Gm': { key: 'Gm', t: -3, accidentals: [[-1, 0, 0, 0, 0, 0, 0, -1, 0, 0], [0, 0, 0, 0, -1, -1, 0, 0, 0, -1], [0, 0, 0, -1, 0, -1, 0, 0, 0, 0]] },
  'Eb': { key: 'Eb', t: 2, accidentals: [[0, 0, 0, -1, 0, 0, 0, 0, 0, -1, 0], [-1, -1, 0, 0, 0, 0, -1, -1, -1, 0], [-1, -1, 0, 0, 0, 0, 0, -1, 0, -1]] },
  'Cm': { key: 'Cm', t: 0, accidentals: [[-1, 0, 0, 0, 0, -1, 0, -1, 0, 0], [0, 0, -1, -1, -1, -1, 0, 0, 0, -1], [0, 0, 0, -1, 0, -1, 0, 0, 0, 0]] } ,
  'Ab': { key: 'Ab', t: -2, accidentals: [[0, -1, 0, -1, 0, 0, 0, 0, 0, -1, 0], [-1, -1, 0, 0, 0, 0, -1, -1, -1, 0], [-1, -1, 0, 0, 0, 0, 0, -1, 0, -1]] },
  'Fm': { key: 'Fm', t: 3, accidentals: [[-1, 0, 0, 0, 0, -1, 0, -1, 0, 0], [0, 0, -1, -1, -1, -1, 0, 0, -1, -1], [0, 0, 0, -1, 0, -1, 0, -1, 0, 0]] }  
};

const _keyObjShort = {
  'E': { key: 'E', t: 2, accidentals: [[1, 1, 0, 1, 1, 0], [0, 1, 1, 0, 0, 1], [0, 0, 1, 1, 0, 0]] },
  'C#m': { key: 'C#m', t: 0, accidentals: [[0, 1, 1, 0, 0, 1], [1, 0, 0, 1, 1, 0], [1, 1, 0, 0, 1, 1]] },
  'A': { key: 'A', t: -2, accidentals: [[1, 0, 0, 1, 1, 0], [0, 1, 1, 0, 0, 1], [0, 0, 1, 1, 0, 0]] },
  'F#m': { key: 'F#m', t: 3, accidentals: [[0, 1, 1, 0, 0, 1], [1, 0, 0, 1, 0, 0], [1, 1, 0, 0, 0, 1]] },
  'D': { key: 'D', t: 1, accidentals: [[1, 0, 0, 1, 0, 0], [0, 1, 0, 0, 0, 1], [0, 0, 0, 1, 0, 0]] },
  'Bm': { key: 'Bm', t: -1, accidentals: [[0, 1, 0, 0, 0, 1], [0, 0, 0, 1, 0, 0], [0, 1, 0, 0, 0, 0]] },
  'G': { key: 'G', t: -3, accidentals: [[0, 0, 0, 1, 0, 0], [0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]] },
  'Em': { key: 'Em', t: 2, accidentals: [[0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]] },
  'C': { key: 'C', t: 0, accidentals: [[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]] },
  'Am': { key: 'Am', t: -2, accidentals: [[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]] },
  'F': { key: 'F', t: 3, accidentals: [[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, -1, 0], [0, 0, 0, 0, -1, 0]] },
  'Dm': { key: 'Dm', t: 1, accidentals: [[0, 0, 0, 0, -1, 0], [0, 0, -1, 0, 0, 0], [0, 0, -1, 0, 0, 0]] },
  'Bb': { key: 'Bb', t: -1, accidentals: [[0, 0, -1, 0, 0, 0], [-1, 0, 0, 0, -1, 0], [-1, 0, 0, 0, -1, -1]] },
  'Gm': { key: 'Gm', t: -3, accidentals: [[-1, 0, 0, 0, -1, 0], [0, 0, -1, 0, 0, -1], [0, 0, -1, -1, 0, 0]] },
  'Eb': { key: 'Eb', t: 2, accidentals: [[0, 0, -1, 0, 0, -1], [-1, 0, 0, -1, -1, 0], [-1, -1, 0, 0, -1, -1]] },
  'Cm': { key: 'Cm', t: 0, accidentals: [[-1, 0, 0, -1, -1, 0], [0, -1, -1, 0, 0, -1], [0, 0, -1, -1, 0, 0]] },
  'Ab': { key: 'Ab', t: -2, accidentals: [[0, -1, -1, 0, 0, -1], [-1, 0, 0, -1, -1, 0], [-1, -1, 0, 0, -1, -1]] },
  'Fm': { key: 'Fm', t: 3, accidentals: [[-1, 0, 0, -1, -1, 0], [0, -1, -1, 0, -1, -1], [0, 0, -1, -1, -1, 0]] }
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
  const modelTemplate = ModelTemplates.getModelTemplate('parallelismusDown');
  if(change) {
    modelTemplate.modelKey = change;
  }
  return modelTemplate;
};

function _AdjustOptions(options) {
  switch(options.addProps['numberOfSections'][0]) {
    case 1:
      options.voices = [[9, 8], [7, 6], [7, 4]];
      options.measure = [' | ', ' '];
      options.voicesLength = 2;
      options.addProps['syncopation'] = [false, true];
      break;
    case 2:
      if(options.addProps['syncopation'][0]) {
        options.voices = [[9, 8, 8, 7, 7, 6], [7, 7, 6, 6, 5, 4], [7, 4, 4, 5, 5, 2]];
        options.measure = [' | ', ' ', ' | ', ' ', ' | ', ' '];     
        options.voicesLength = 6;
        options.addProps['syncopation'][1] = false;
      } else {
        options.voices = [[9, 8, 7, 6], [7, 6, 5, 4], [7, 4, 5, 2]]; 
        options.measure = [' | ', ' ', ' | ', ' '];
        options.voicesLength = 4;
        options.addProps['syncopation'][1] = false;
      }      
      break; 
    default:
      if(options.addProps['syncopation'][0]) {
        options.voices = [[9, 8, 8, 7, 7, 6, 6, 5, 5, 4], [7, 7, 6, 6, 5, 5, 4, 4, 3, 2], [7, 4, 4, 5, 5, 2, 2, 3, 3, 0]];
        options.measure = [' | ', ' ', ' | ', ' ', ' | ', ' ', ' | ', ' ', ' | ', ' '];
        options.voicesLength = 10;
        options.addProps['syncopation'][1] = false;
      } else {
        options.voices = [[9, 8, 7, 6, 5, 4], [7, 6, 5, 4, 3, 2], [7, 4, 5, 2, 3, 0]];
        options.measure = [' | ', ' ', ' | ', ' ', ' | ', ' '];
        options.voicesLength = 6;
        options.addProps['syncopation'][1] = false;
      }      
      break;
  }
  return options;
}

const someKeys = ['Dm', 'Gm', 'Cm', 'Fm', 'Bm', 'F#m', 'C#m', 'Eb', 'Ab', 'A', 'E'];
const modifyLastChordSectionEndings = (keyObject, modelKey) => {
  if (modelKey === 'Dm' || modelKey === 'Gm' || modelKey === 'Cm' || modelKey === 'Fm' || modelKey === 'A' || modelKey === 'E') {
    keyObject.accidentals[1][5] = 0;
  } else if (modelKey === 'Bm' || modelKey === 'F#m' || modelKey === 'C#m') {
    keyObject.accidentals[1][5] = 1;
  } else {
    keyObject.accidentals[1][5] = -1;
  }
};

const getVoices = parallelismusDownOptions => {
  const options = _AdjustOptions(parallelismusDownOptions || getOptions());
  const keyObject = options.addProps['syncopation'][0] ? _getKeyObject(options.modelKey) : _getKeyObjectShort(options.modelKey);
  if (someKeys.indexOf(options.modelKey) >= 0) {
    modifyLastChordSectionEndings(keyObject, options.modelKey);
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

const ParallismusDown = {
  getDefaultOptions: getOptions,
  getVoices,
  getModelKeys,
  getEmptyStaff: getStaff,
  getMusicExample: getExample
};

export default ParallismusDown;