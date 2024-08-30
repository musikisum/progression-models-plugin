import ModelHelper from '../model-helper.js';
import ModelTemplates from '../model-templates.js';

const _keyObj = {
  'E': { key: 'E', t: -5, accidentals: [[1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0], [1, 1, 0, 0, 0, 1, 0, 1, 0, 0], [0, 1, 0, 1, 0, 0, 0, 0, 0, 1]] },
  'C#m': { key: 'C#m', t: 0, accidentals: [[0, 0, 1, 1, 1, 1, 0, 0, 1, 1], [0, 1, 0, 1, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 1, 0, 1, 0, 0]] },
  'A': { key: 'A', t: -2, accidentals: [[1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0], [1, 0, 0, 0, 0, 1, 0, 1, 0, 0], [0, 1, 0, 1, 0, 0, 0, 0, 0, 1]] },
  'F#m': { key: 'F#m', t: -4, accidentals: [[0, 0, 1, 1, 0, 0, 0, 0, 1, 1], [0, 1, 0, 1, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 1, 0, 0, 0, 0]] },
  'D': { key: 'D', t: 1, accidentals: [[0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0], [1, 0, 0, 0, 0, 1, 0, 0, 0, 0], [0, 1, 0, 0, 0, 0, 0, 0, 0, 1]] },
  'Bm': { key: 'Bm', t: -1, accidentals: [[0, 0, 1, 1, 0, 0, 0, 0, 1, 1], [0, 1, 0, 0, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 1, 0, 0, 0, 0]] },
  'G': { key: 'G', t: -3, accidentals: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 0, 0, 0, 0], [0, 1, 0, 0, 0, 0, 0, 0, 0, 0]] },
  'Em': { key: 'Em', t: -5, accidentals: [[0, 0, 0, 0, 0, 0, 0, 0, 1, 1], [0, 1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]] },
  'C': { key: 'C', t: 0, accidentals: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]] },
  'Am': { key: 'Am', t: -2, accidentals: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]] },
  'F': { key: 'F', t: -4, accidentals: [[0, 0, 0, 0, -1, -1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, -1, 0, 0]] },
  'Dm': { key: 'Dm', t: -6, accidentals: [[-1, -1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, -1, 0, 0], [0, 0, 0, -1, 0, 0, 0, 0, 0, 0]] },
  'Bb': { key: 'Bb', t: -1, accidentals: [[0, 0, 0, 0, -1, -1, 0, 0, 0, 0, -1], [0, 0, 0, -1, 0, 0, 0, 0, 0, 0], [-1, 0, 0, 0, 0, 0, 0, -1, 0, 0]] },
  'Gm': { key: 'Gm', t: -3, accidentals: [[-1, -1, 0, 0, 0, 0, -1, -1, 0, 0], [-1, 0, 0, 0, 0, 0, -1, 0, 0, -1], [0, 0, 0, -1, 0, 0, 0, 0, 0, -1]] },
  'Eb': { key: 'Eb', t: 2, accidentals: [[0, 0, -1, -1, -1, -1, 0, 0, 0, 0, -1], [0, 0, 0, -1, 0, 0, 0, 0, 0, -1], [-1, 0, 0, 0, 0, -1, 0, -1, 0, 0]] },
  'Cm': { key: 'Cm', t: 0, accidentals: [[-1, -1, 0, 0, 0, 0, -1, -1, 0, 0], [-1, 0, 0, 0, 0, -1, 0, -1, 0, 0], [0, -1, 0, -1, 0, 0, 0, 0, 0, -1]] } ,
  'Ab': { key: 'Ab', t: -2, accidentals: [[0, 0, -1, -1, -1, -1, 0, 0, -1, -1, -1], [0, -1, 0, -1, 0, 0, 0, 0, 0, -1], [-1, 0, 0, 0, 0, -1, 0, -1, 0, 0]] },
  'Fm': { key: 'Fm', t: -4, accidentals: [[-1, -1, 0, 0, -1, -1, -1, -1, 0, 0], [-1, 0, 0, 0, 0, -1, 0, -1, 0, 0], [0, -1, 0, -1, 0, 0, 0, -1, 0, -1]] }  
};

const _keyObjShort = {
  'E': { key: 'E', t: -5, accidentals: [[1, 0, 0, 1, 1, 0], [1, 1, 0, 1, 1, 0], [0, 1, 1, 0, 0, 1]] },
  'C#m': { key: 'C#m', t: 0, accidentals: [[0, 1, 1, 0, 1, 1], [0, 1, 1, 0, 0, 1], [1, 0, 0, 1, 1, 0]] },
  'A': { key: 'A', t: -2, accidentals: [[1, 0, 0, 1, 0, 0], [1, 0, 0, 1, 1, 0], [0, 1, 1, 0, 0, 1]] },
  'F#m': { key: 'F#m', t: -4, accidentals: [[0, 1, 0, 0, 1, 1], [0, 1, 1, 0, 0, 1], [1, 0, 0, 1, 0, 0]] },
  'D': { key: 'D', t: 1, accidentals: [[0, 0, 0, 1, 0, 0], [1, 0, 0, 1, 0, 0], [0, 1, 0, 0, 0, 1]] },
  'Bm': { key: 'Bm', t: -1, accidentals: [[0, 1, 0, 0, 1, 0], [0, 1, 0, 0, 0, 1], [0, 0, 0, 1, 0, 0]] },
  'G': { key: 'G', t: -3, accidentals: [[0, 0, 0, 0, 0, 0], [0, 0, 0, 1, 0, 0], [0, 1, 0, 0, 0, 0]] },
  'Em': { key: 'Em', t: -5, accidentals: [[0, 0, 0, 0, 1, 0], [0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]] },
  'C': { key: 'C', t: 0, accidentals: [[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]] },
  'Am': { key: 'Am', t: -2, accidentals: [[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]] },
  'F': { key: 'F', t: -4, accidentals: [[0, 0, -1, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, -1, 0]] },
  'Dm': { key: 'Dm', t: -6, accidentals: [[-1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, -1, 0, 0, 0]] },
  'Bb': { key: 'Bb', t: -1, accidentals: [[0, 0, -1, 0, 0, -1], [0, 0, -1, 0, 0, 0], [-1, 0, 0, 0, -1, 0]] },
  'Gm': { key: 'Gm', t: -3, accidentals: [[-1, 0, 0, 0, -1, 0], [0, 0, -1, 0, 0, -1], [0, 0, -1, -1, 0, 0]] },
  'Eb': { key: 'Eb', t: 2, accidentals: [[0, -1, -1, 0, 0, -1], [0, 0, -1, 0, 0, -1], [-1, 0, 0, -1, -1, 0]] },
  'Cm': { key: 'Cm', t: 0, accidentals: [[-1, 0, 0, -1, 0, 0], [-1, 0, 0, -1, -1, 0], [0, -1, -1, 0, 0, -1]] },
  'Ab': { key: 'Ab', t: -2, accidentals: [[0, -1, -1, 0, -1, -1], [0, -1, -1, 0, 0, -1], [-1, 0, 0, -1, -1, 0]] },
  'Fm': { key: 'Fm', t: -4, accidentals: [[-1, 0, -1, -1, 0, 0], [-1, 0, 0, -1, -1, 0], [0, -1, -1, 0, -1, -1]] }
};

const _keyObjLamento = {
  'E': { key: 'E', t: -5, accidentals: [[1, 1, 0, 0, 0, 0, '=', 1], [1, '^^', '^', 1, '=', 1, 0, 1], [0, 1, '=', 1, '=', 0, 1, 0]] },
  'C#m': { key: 'C#m', t: 0, accidentals: [[0, 0, 1, 1, 1, 1, 0, 1], [0, 1, '=', 1, 0, 1, 1, 1], [1, 1, '=', 1, '=', 1, '^^', 1]] },
  'A': { key: 'A', t: -2, accidentals: [[1, 1, 0, 0, 0, 0, '=', 0], [1, 1, '=', 1, '=', 1, 0, 1], [0, 1, '=', 1, '=', 0, 1, 0]] },
  'F#m': { key: 'F#m', t: -4, accidentals: [[0, 0, 1, 1, 0, 0, 0, 1], [0, 1, '=', 1, 1, 1, 1, 1], [1, 1, '=', 1, '=', 1, 1, 1]] },
  'D': { key: 'D', t: 1, accidentals: [[0, 0, 0, 0, 0, 0, '=', 0], [1, 1, '=', 1, '=', 1, 0, 1], [0, 1, '=', 0, -1, 0, 1, 0]] },
  'Bm': { key: 'Bm', t: -1, accidentals: [[0, 0, 1, 1, 0, 0, 0, 1], [0, 1, '=', 0, 0, 1, 0, 1], [0, 1, '=', 1, '=', 1, 1, 1]] },
  'G': { key: 'G', t: -3, accidentals: [[0, 0, 0, 0, 0, 0, -1, 0], [0, 1, '=', 1, '=', 1, 0, 1], [0, 1, '=', 0, -1, 0, 1, 0]] },
  'Em': { key: 'Em', t: -5, accidentals: [[0, 0, 0, 0, 0, 0, 0, 1], [0, 1, '=', 0, 0, 1, 0, 1], [0, 1, '=', 1, '=', 0, 1, 0]] },
  'C': { key: 'C', t: 0, accidentals: [[0, 0, 0, 0, 0, 0, -1, 0], [0, 1, '=', 1, '=', 0, 0, 0], [0, '=', -1, '=', -1, 0, 1, 0]] },
  'Am': { key: 'Am', t: -2, accidentals: [[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, -1, 0, 0, 1, 0, 1], [0, 1, '=', 1, '=', 0, 1, 0]] },
  'F': { key: 'F', t: -4, accidentals: [[0, 0, 0, 0, -1, -1, -1, 0], [0, 1, '=', 1, '=', 0, 0, 0], [0, 0, -1, 0, -1, 0, 0, 0]] },
  'Dm': { key: 'Dm', t: -6, accidentals: [[-1, -1, 0, 0, 0, 0, 0, 0], [0, 0, -1, 0, 0, 1, 0, 1], [0, 1, '=', 0, -1, 0, 1, 0]] },
  'Bb': { key: 'Bb', t: -1, accidentals: [[0, 0, 0, 0, -1, -1, -1, 0], [0, 1, '=', 0, -1, 0, -1, 0], [0, 0, -1, 0, -1, 0, '=', 0]] },
  'Gm': { key: 'Gm', t: -3, accidentals: [[-1, -1, 0, 0, 0, 0, -1, 0], [-1, 0, -1, 0, 0, 1, 0, 1], [0, 1, '=', 0, -1, 0, 1, 0]] },
  'Eb': { key: 'Eb', t: 2, accidentals: [[0, 0, -1, -1, -1, -1, -1, 0], [0, 1, '=', '=', -1, 0, -1, 0], [0, 0, -1, 0, -1, -1, '=', -1]] },
  'Cm': { key: 'Cm', t: 0, accidentals: [[-1, -1, 0, 0, 0, 0, -1, 0], [-1, 0, -1, 0, 0, '=', 0, '='], [0, '=', -1, '=', -1, 0, 1, 0]] },
  'Ab': { key: 'Ab', t: -2, accidentals: [[0, 0, -1, -1, -1, -1, -1, -1], [0, 0, -1, 0, -1, 0, -1, 0], [-1, 0, -1, 0, -1, -1, 0, -1]] },
  'Fm': { key: 'Fm', t: -4, accidentals: [[-1, -1, 0, 0, -1, -1, -1, 0], [-1, 0, -1, 0, 0, '=', 0, '='], [0, '=', -1, '=', -1, 0, '=', 0]] } 
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
    modelTemplate.key = change;
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
      options.addProps['chromaticBass'] = [false, true];
      options.addProps['numberOfSections'][2] = true;
    } else { // without syncopations
      options.voices = [[5, 4], [9, 8], [7, 6]];
      options.measure = [' | ', ' '];
      options.voicesLength = 2;
      options.addProps['chromaticBass'] = [false, true];
      options.addProps['numberOfSections'][2] = false;
    }
      break;
    case 2:
      if(options.addProps['syncopation'][0]) { // with syncopations
        options.voices = [[5, 5, 4, 4, 3, 3, 2, 2], [9, 8, 8, 7, 7, 6, 6, 5], [7, 6, 6, 5, 5, 4, 4, 3]];
        options.measure = [' | ', ' ', ' | ', ' ', ' | ', ' ', ' | ', ' '];
        options.voicesLength = 8;
        options.addProps['chromaticBass'][1] = false;
        options.addProps['numberOfSections'][2] = true;
      } else { // without syncopations
        options.voices = [[5, 4, 3, 2], [9, 8, 7, 6], [7, 6, 5, 4]]; 
        options.measure = [' | ', ' ', ' | ', ' '];
        options.voicesLength = 4;
        options.addProps['chromaticBass'][1] = true;
        options.addProps['numberOfSections'][2] = false;
      }      
      break;
    default:
      if(options.addProps['syncopation'][0]) { // with syncopations
        options.voices = [[5, 5, 4, 4, 3, 3, 2, 2, 1, 1], [9, 8, 8, 7, 7, 6, 6, 5, 5, 4], [7, 6, 6, 5, 5, 4, 4, 3, 3, 2]];
        options.measure = [' | ', ' ', ' | ', ' ', ' | ', ' ', ' | ', ' ', ' | ', ' '];
        options.voicesLength = 10;
        options.addProps['chromaticBass'][1] = false;
        options.addProps['numberOfSections'][2] = true;
      } else { // without syncopations
        options.voices = [[5, 4, 3, 2, 1, 0], [9, 8, 7, 6, 5, 4], [7, 6, 5, 4, 3, 2]];
        options.measure = [' | ', ' ', ' | ', ' ', ' | ', ' '];
        options.voicesLength = 6;
        options.addProps['chromaticBass'][1] = true;
        options.addProps['numberOfSections'][2] = false;
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
}

const getVoices = fauxbourdonOptions => {
  const options = _AdjustOptions(fauxbourdonOptions || getOptions());
  let keyObject;
  if (options.addProps['chromaticBass'][0] === true && options.addProps['chromaticBass'][1] === false) {
    keyObject = _getKeyObjectLamento(options.key);
    _AdjustLamento(options);
  } else {
    keyObject = options.addProps['syncopation'][0] ? _getKeyObject(options.key) : _getKeyObjectShort(options.key);
    options.addProps['chromaticBass'][0] = false;
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
