import ModelHelper from '../model-helper.js';
import ModelTemplates from '../model-templates.js';

const _keyObj = {
  'E': { key: 'E', t: -5, accidentals: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]] },
  'C#m': { key: 'C#m', t: -7, accidentals: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]] },
  'A': { key: 'A', t: -2, accidentals: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]] },
  'F#m': { key: 'F#m', t: -4, accidentals: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]] },
  'D': { key: 'D', t: -6, accidentals: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]] },
  'Bm': { key: 'Bm', t: -1, accidentals: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]] },
  'G': { key: 'G', t: -3, accidentals: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]] },
  'Em': { key: 'Em', t: -5, accidentals: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]] },
  'C': { key: 'C', t: -7, accidentals: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]] },
  'Am': { key: 'Am', t: -2, accidentals: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]] },
  'F': { key: 'F', t: -4, accidentals: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]] },
  'Dm': { key: 'Dm', t: -6, accidentals: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]] },
  'Bb': { key: 'Bb', t: -1, accidentals: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]] },
  'Gm': { key: 'Gm', t: -3, accidentals: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]] },
  'Eb': { key: 'Eb', t: -5, accidentals: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]] },
  'Cm': { key: 'Cm', t: -7, accidentals: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]] }, 
  'Ab': { key: 'Ab', t: -2, accidentals: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]] },
  'Fm': { key: 'Fm', t: -4, accidentals: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]] }
};

function _getKeyObject(change) {  
  return _keyObj[change ?? 'C'];
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

const getVoices = fauxbourdonOptions => {
  const options = _AdjustOptions(fauxbourdonOptions || getOptions());

  return ModelHelper.getVoices(
    options.transposeValues, 
    options.voiceArrangement, 
    options.voices, 
    _getKeyObject(options.key), 
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
