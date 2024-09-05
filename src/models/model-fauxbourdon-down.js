import ModelHelper from '../model-helper.js';
import ModelTemplates from '../model-templates.js';

const _keyObj = {
  'E': { modelKey: 'E', t: -5, accidentals: [[1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0], [1, 1, 0, 0, 0, 1, 0, 1, 0, 0], [0, 1, 0, 1, 0, 0, 0, 0, 0, 1]] },
  'C#m': { modelKey: 'C#m', t: 0, accidentals: [[0, 0, 1, 1, 1, 1, 0, 0, 1, 1], [0, 1, 0, 1, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 1, 0, 1, 0, 0]] },
  'A': { modelKey: 'A', t: -2, accidentals: [[1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0], [1, 0, 0, 0, 0, 1, 0, 1, 0, 0], [0, 1, 0, 1, 0, 0, 0, 0, 0, 1]] },
  'F#m': { modelKey: 'F#m', t: -4, accidentals: [[0, 0, 1, 1, 0, 0, 0, 0, 1, 1], [0, 1, 0, 1, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 1, 0, 0, 0, 0]] },
  'D': { modelKey: 'D', t: 1, accidentals: [[0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0], [1, 0, 0, 0, 0, 1, 0, 0, 0, 0], [0, 1, 0, 0, 0, 0, 0, 0, 0, 1]] },
  'Bm': { modelKey: 'Bm', t: -1, accidentals: [[0, 0, 1, 1, 0, 0, 0, 0, 1, 1], [0, 1, 0, 0, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 1, 0, 0, 0, 0]] },
  'G': { modelKey: 'G', t: -3, accidentals: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 0, 0, 0, 0], [0, 1, 0, 0, 0, 0, 0, 0, 0, 0]] },
  'Em': { modelKey: 'Em', t: -5, accidentals: [[0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [0, 1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]] },
  'C': { modelKey: 'C', t: 0, accidentals: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]] },
  'Am': { modelKey: 'Am', t: -2, accidentals: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]] },
  'F': { modelKey: 'F', t: -4, accidentals: [[0, 0, 0, 0, -1, -1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, -1, 0, 0]] },
  'Dm': { modelKey: 'Dm', t: -6, accidentals: [[-1, -1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, -1, 0, 0], [0, 0, 0, -1, 0, 0, 0, 0, 0, 0]] },
  'Bb': { modelKey: 'Bb', t: -1, accidentals: [[0, 0, 0, 0, -1, -1, 0, 0, 0, 0, -1], [0, 0, 0, -1, 0, 0, 0, 0, 0, 0], [-1, 0, 0, 0, 0, 0, 0, -1, 0, 0]] },
  'Gm': { modelKey: 'Gm', t: -3, accidentals: [[-1, -1, 0, 0, 0, 0, -1, -1, 0, 0], [-1, 0, 0, 0, 0, 0, -1, 0, 0, -1], [0, 0, 0, -1, 0, 0, 0, 0, 0, -1]] },
  'Eb': { modelKey: 'Eb', t: 2, accidentals: [[0, 0, -1, -1, -1, -1, 0, 0, 0, 0, -1], [0, 0, 0, -1, 0, 0, 0, 0, 0, -1], [-1, 0, 0, 0, 0, -1, 0, -1, 0, 0]] },
  'Cm': { modelKey: 'Cm', t: 0, accidentals: [[-1, -1, 0, 0, 0, 0, -1, -1, 0, 0], [-1, 0, 0, 0, 0, -1, 0, -1, 0, 0], [0, -1, 0, -1, 0, 0, 0, 0, 0, -1]] } ,
  'Ab': { modelKey: 'Ab', t: -2, accidentals: [[0, 0, -1, -1, -1, -1, 0, 0, -1, -1, -1], [0, -1, 0, -1, 0, 0, 0, 0, 0, -1], [-1, 0, 0, 0, 0, -1, 0, -1, 0, 0]] },
  'Fm': { modelKey: 'Fm', t: -4, accidentals: [[-1, -1, 0, 0, -1, -1, -1, -1, 0, 0], [-1, 0, 0, 0, 0, -1, 0, -1, 0, 0], [0, -1, 0, -1, 0, 0, 0, -1, 0, -1]] }  
};

const _keyObjShort = {
  'E': { modelKey: 'E', t: -5, accidentals: [[1, 0, 0, 1, 1, 0], [1, 1, 0, 1, 1, 0], [0, 1, 1, 0, 0, 1]] },
  'C#m': { modelKey: 'C#m', t: 0, accidentals: [[0, 1, 1, 0, 1, 1], [0, 1, 1, 0, 0, 1], [1, 0, 0, 1, 1, 0]] },
  'A': { modelKey: 'A', t: -2, accidentals: [[1, 0, 0, 1, 0, 0], [1, 0, 0, 1, 1, 0], [0, 1, 1, 0, 0, 1]] },
  'F#m': { modelKey: 'F#m', t: -4, accidentals: [[0, 1, 0, 0, 1, 1], [0, 1, 1, 0, 0, 1], [1, 0, 0, 1, 0, 0]] },
  'D': { modelKey: 'D', t: 1, accidentals: [[0, 0, 0, 1, 0, 0], [1, 0, 0, 1, 0, 0], [0, 1, 0, 0, 0, 1]] },
  'Bm': { modelKey: 'Bm', t: -1, accidentals: [[0, 1, 0, 0, 1, 0], [0, 1, 0, 0, 0, 1], [0, 0, 0, 1, 0, 0]] },
  'G': { modelKey: 'G', t: -3, accidentals: [[0, 0, 0, 0, 0, 0], [0, 0, 0, 1, 0, 0], [0, 1, 0, 0, 0, 0]] },
  'Em': { modelKey: 'Em', t: -5, accidentals: [[0, 0, 0, 0, 1, 0], [0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]] },
  'C': { modelKey: 'C', t: 0, accidentals: [[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]] },
  'Am': { modelKey: 'Am', t: -2, accidentals: [[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]] },
  'F': { modelKey: 'F', t: -4, accidentals: [[0, 0, -1, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, -1, 0]] },
  'Dm': { modelKey: 'Dm', t: -6, accidentals: [[-1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, -1, 0, 0, 0]] },
  'Bb': { modelKey: 'Bb', t: -1, accidentals: [[0, 0, -1, 0, 0, -1], [0, 0, -1, 0, 0, 0], [-1, 0, 0, 0, -1, 0]] },
  'Gm': { modelKey: 'Gm', t: -3, accidentals: [[-1, 0, 0, 0, -1, 0], [0, 0, -1, 0, 0, -1], [0, 0, -1, -1, 0, 0]] },
  'Eb': { modelKey: 'Eb', t: 2, accidentals: [[0, -1, -1, 0, 0, -1], [0, 0, -1, 0, 0, -1], [-1, 0, 0, -1, -1, 0]] },
  'Cm': { modelKey: 'Cm', t: 0, accidentals: [[-1, 0, 0, -1, 0, 0], [-1, 0, 0, -1, -1, 0], [0, -1, -1, 0, 0, -1]] },
  'Ab': { modelKey: 'Ab', t: -2, accidentals: [[0, -1, -1, 0, -1, -1], [0, -1, -1, 0, 0, -1], [-1, 0, 0, -1, -1, 0]] },
  'Fm': { modelKey: 'Fm', t: -4, accidentals: [[-1, 0, -1, -1, 0, 0], [-1, 0, 0, -1, -1, 0], [0, -1, -1, 0, -1, -1]] }
};

const _keyObjLamento = {
  'E': { modelKey: 'E', t: -5, accidentals: [[1, 1, 0, 0, 0, 0, '=', 1], [1, '^^', '^', 1, '=', 1, 0, 1], [0, 1, '=', 1, '=', 0, 1, 0]] },
  'C#m': { modelKey: 'C#m', t: 0, accidentals: [[0, 0, 1, 1, 1, 1, 0, 1], [0, 1, '=', 1, 0, 1, 1, 1], [1, 1, '=', 1, '=', 1, '^^', 1]] },
  'A': { modelKey: 'A', t: -2, accidentals: [[1, 1, 0, 0, 0, 0, '=', 0], [1, 1, '=', 1, '=', 1, 0, 1], [0, 1, '=', 1, '=', 0, 1, 0]] },
  'F#m': { modelKey: 'F#m', t: -4, accidentals: [[0, 0, 1, 1, 0, 0, 0, 1], [0, 1, '=', 1, 1, 1, 1, 1], [1, 1, '=', 1, '=', 1, 1, 1]] },
  'D': { modelKey: 'D', t: 1, accidentals: [[0, 0, 0, 0, 0, 0, '=', 0], [1, 1, '=', 1, '=', 1, 0, 1], [0, 1, '=', 0, -1, 0, 1, 0]] },
  'Bm': { modelKey: 'Bm', t: -1, accidentals: [[0, 0, 1, 1, 0, 0, 0, 1], [0, 1, '=', 0, 0, 1, 0, 1], [0, 1, '=', 1, '=', 1, 1, 1]] },
  'G': { modelKey: 'G', t: -3, accidentals: [[0, 0, 0, 0, 0, 0, -1, 0], [0, 1, '=', 1, '=', 1, 0, 1], [0, 1, '=', 0, -1, 0, 1, 0]] },
  'Em': { modelKey: 'Em', t: -5, accidentals: [[0, 0, 0, 0, 0, 0, 0, 1], [0, 1, '=', 0, 0, 1, 0, 1], [0, 1, '=', 1, '=', 0, 1, 0]] },
  'C': { modelKey: 'C', t: 0, accidentals: [[0, 0, 0, 0, 0, 0, -1, 0], [0, 1, '=', 1, '=', 0, 0, 0], [0, '=', -1, '=', -1, 0, 1, 0]] },
  'Am': { modelKey: 'Am', t: -2, accidentals: [[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, -1, 0, 0, 1, 0, 1], [0, 1, '=', 1, '=', 0, 1, 0]] },
  'F': { modelKey: 'F', t: -4, accidentals: [[0, 0, 0, 0, -1, -1, -1, 0], [0, 1, '=', 1, '=', 0, 0, 0], [0, 0, -1, 0, -1, 0, 0, 0]] },
  'Dm': { modelKey: 'Dm', t: -6, accidentals: [[-1, -1, 0, 0, 0, 0, 0, 0], [0, 0, -1, 0, 0, 1, 0, 1], [0, 1, '=', 0, -1, 0, 1, 0]] },
  'Bb': { modelKey: 'Bb', t: -1, accidentals: [[0, 0, 0, 0, -1, -1, -1, 0], [0, 1, '=', 0, -1, 0, -1, 0], [0, 0, -1, 0, -1, 0, '=', 0]] },
  'Gm': { modelKey: 'Gm', t: -3, accidentals: [[-1, -1, 0, 0, 0, 0, -1, 0], [-1, 0, -1, 0, 0, 1, 0, 1], [0, 1, '=', 0, -1, 0, 1, 0]] },
  'Eb': { modelKey: 'Eb', t: 2, accidentals: [[0, 0, -1, -1, -1, -1, -1, 0], [0, 1, '=', '=', -1, 0, -1, 0], [0, 0, -1, 0, -1, -1, '=', -1]] },
  'Cm': { modelKey: 'Cm', t: 0, accidentals: [[-1, -1, 0, 0, 0, 0, -1, 0], [-1, 0, -1, 0, 0, '=', 0, '='], [0, '=', -1, '=', -1, 0, 1, 0]] },
  'Ab': { modelKey: 'Ab', t: -2, accidentals: [[0, 0, -1, -1, -1, -1, -1, -1], [0, 0, -1, 0, -1, 0, -1, 0], [-1, 0, -1, 0, -1, -1, 0, -1]] },
  'Fm': { modelKey: 'Fm', t: -4, accidentals: [[-1, -1, 0, 0, -1, -1, -1, 0], [-1, 0, -1, 0, 0, '=', 0, '='], [0, '=', -1, '=', -1, 0, '=', 0]] } 
}

function _getKeyObject(change) {  
  return _keyObj[change];
}

function _getKeyObjectShort(change) {  
  return _keyObjShort[change];
}

function _getKeyObjectLamento(change) {  
  return _keyObjLamento[change];
}

function getModelKeys() {
  return Object.keys(_keyObj);
}

const getOptions = change => {
  const modelTemplate = ModelTemplates.getModelTemplate('fauxbourdon');
  if(change) {
    modelTemplate.modelKey = change;
  }
  return modelTemplate;
};

function _AdjustOptions(options) {
  switch(options.addProps['numberOfSections'][0]) {
    case 1: 
      if(options.addProps['syncopation'][0]) { // with syncopations
        options.voices = [[5, 5, 4, 4], [9, 8, 8, 7], [7, 6, 6, 5]];
        options.measure = [' | ', ' ', ' | ', ' '];
        options.voicesLength = 4;
      } else { // without syncopations
        options.voices = [[5, 4], [9, 8], [7, 6]];
        options.measure = [' | ', ' '];
        options.voicesLength = 2;
      }
      break;
    case 2:
      if(options.addProps['syncopation'][0]) { // with syncopations
        options.voices = [[5, 5, 4, 4, 3, 3, 2, 2], [9, 8, 8, 7, 7, 6, 6, 5], [7, 6, 6, 5, 5, 4, 4, 3]];
        options.measure = [' | ', ' ', ' | ', ' ', ' | ', ' ', ' | ', ' '];
        options.voicesLength = 8;
      } else { // without syncopations
        options.voices = [[5, 4, 3, 2], [9, 8, 7, 6], [7, 6, 5, 4]]; 
        options.measure = [' | ', ' ', ' | ', ' '];
        options.voicesLength = 4;
      }      
      break;
    default:
      if(options.addProps['syncopation'][0]) { // with syncopations
        options.voices = [[5, 5, 4, 4, 3, 3, 2, 2, 1, 1], [9, 8, 8, 7, 7, 6, 6, 5, 5, 4], [7, 6, 6, 5, 5, 4, 4, 3, 3, 2]];
        options.measure = [' | ', ' ', ' | ', ' ', ' | ', ' ', ' | ', ' ', ' | ', ' '];
        options.voicesLength = 10;
      } else { // without syncopations
        options.voices = [[5, 4, 3, 2, 1, 0], [9, 8, 7, 6, 5, 4], [7, 6, 5, 4, 3, 2]];
        options.measure = [' | ', ' ', ' | ', ' ', ' | ', ' '];
        options.voicesLength = 6;
      }      
      break;
  }
  return options;
}

function _AdjustLamento(options) {
  options.voices = [[5, 5, 4, 4, 3, 3, 2, 1], [9, 8, 8, 7, 7, 6, 7, 6], [7, 6, 6, 5, 5, 4, 3, 4]];
  options.measure = [' | ', ' ', ' | ', ' ', ' | ', ' ', ' | ', ' '];
  options.voicesLength = 8;
  options.addProps['numberOfSections'][2] = true;
  options.addProps['syncopation'][2] = true;
}

const getVoices = fauxbourdonOptions => {
  const options = _AdjustOptions(fauxbourdonOptions || getOptions());
  let keyObject;
  if (options.addProps['chromaticBass'][0] === true && options.addProps['chromaticBass'][1] === false) {
    keyObject = _getKeyObjectLamento(options.modelKey);
    _AdjustLamento(options);
  } else {
    keyObject = options.addProps['syncopation'][0] ? _getKeyObject(options.modelKey) : _getKeyObjectShort(options.modelKey);
    // options.addProps['chromaticBass'][0] = false;
    // options.addProps['chromaticBass'][2] = true;
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
  return ['x | x x | x x | x x | x', 'x | x x | x x | x x | x', 'x | x x | x x | x x | x'];
};

const getExample = () => {
  return ['f- | f e2 d- | -d c d3/2', 'z | B2 A2 | G2 F z/', 'A,/D,/ | G,/F,/G,/C,/ F,/E,/F,/B,,/ | E,/F,//G,// A,/A,,/ D,/E,/,F,/]'];
};

const Fauxbourdon = {
  getDefaultOptions: getOptions,
  getVoices,
  getModelKeys,
  getEmptyStaff: getStaff,
  getMusicExample: getExample
};

export default Fauxbourdon;
