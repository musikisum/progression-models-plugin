import ModelHelper from '../model-helper.js';

const _keyObj = {
  C: { key: 'C', t: 0, accidentals: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]] },
  Am: { key: 'Am', t: -2, accidentals: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]] },
  F: { key: 'F', t: 3, accidentals: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, -1, 0], [0, 0, 0, 0, 0, 0, 0, -1, 0, 0]] },
  Dm: { key: 'Dm', t: 1, accidentals: [[0, 0, 0, 0, 0, 0, 0, -1, 0, 0], [0, 0, 0, 0, -1, -1, 0, 0, 0, 0], [0, 0, 0, -1, 0, 0, 0, 0, 0, 0]] },
  Bb: { key: 'Bb', t: -1, accidentals: [[0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0], [-1, -1, 0, 0, 0, 0, 0, 0, -1, 0], [0, 0, 0, 0, 0, 0, 0, -1, 0, 0]] },
  Gm: { key: 'Gm', t: -3, accidentals: [[0, 0, 0, 0, 0, 0, 0, -1, 0, 0], [0, 0, 0, 0, -1, -1, 0, 0, 0, -1], [0, 0, 0, -1, 0, -1, 0, 0, 0, 0]] },
  Eb: { key: 'Eb', t: 2, accidentals: [[0, 0, 0, -1, 0, 0, 0, 0, 0, -1, 0], [-1, -1, 0, 0, 0, 0, -1, -1, -1, 0], [-1, -1, 0, 0, 0, 0, 0, -1, 0, -1]] },
  Cm: { key: 'Cm', t: 0, accidentals: [[-1, 0, 0, 0, 0, -1, 0, -1, 0, 0], [0, 0, -1, -1, -1, -1, 0, 0, 0, -1], [0, 0, 0, -1, 0, -1, 0, 0, 0, -1]] } ,
  Ab: { key: 'Ab', t: -2, accidentals: [[0, -1, 0, -1, 0, 0, 0, 0, 0, -1, 0], [-1, -1, 0, 0, 0, 0, -1, -1, -1, 0], [-1, -1, 0, 0, 0, 0, 0, -1, 0, -1]] },
  Fm: { key: 'Fm', t: 3, accidentals: [[-1, 0, 0, 0, 0, -1, 0, -1, 0, 0], [0, 0, -1, -1, -1, -1, 0, 0, -1, -1], [0, 0, 0, -1, 0, -1, 0, -1, 0, 0]] }  
};

const _keyObjShort = {
  C: { key: 'C', t: 0, accidentals: [[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]] },
  Am: { key: 'Am', t: -2, accidentals: [[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]] },
  F: { key: 'F', t: 3, accidentals: [[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, -1, 0], [0, 0, 0, 0, -1, 0]] },
  Dm: { key: 'Dm', t: 1, accidentals: [[0, 0, 0, 0, -1, 0], [0, 0, -1, 0, 0, 0], [0, 0, -1, 0, 0, 0]] },
  Bb: { key: 'Bb', t: -1, accidentals: [[0, 0, -1, 0, 0, 0], [-1, 0, 0, 0, -1, 0], [0, 0, 0, 0, -1, 0]] },
  Gm: { key: 'Gm', t: -3, accidentals: [[-1, 0, 0, 0, -1, 0], [0, 0, -1, 0, 0, -1], [0, 0, -1, -1, 0, 0]] },
  Eb: { key: 'Eb', t: 2, accidentals: [[0, 0, -1, 0, 0, -1], [-1, 0, 0, -1, -1, 0], [-1, -1, 0, 0, -1, 0]] },
  Cm: { key: 'Cm', t: 0, accidentals: [[-1, 0, 0, -1, -1, 0], [0, -1, -1, 0, 0, 0], [0, 0, -1, -1, 0, 0]] },
  Ab: { key: 'Ab', t: -2, accidentals: [[0, -1, -1, 0, 0, -1], [-1, 0, 0, -1, -1, 0], [-1, -1, 0, 0, -1, -1]] },
  Fm: { key: 'Fm', t: 3, accidentals: [[-1, 0, 0, -1, -1, 0], [0, -1, -1, 0, -1, -1], [0, 0, -1, -1, -1, 0]] }
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
  const modelTemplate = ModelHelper.getModelTemplate('parallelismusDown');
  if(change) {
    modelTemplate.key = change;
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
        // Hier muss auch noch das Vorzeichen des Schlussakkords angepasst werden
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

const getVoices = parallelismusDownOptions => {
  const options = _AdjustOptions(parallelismusDownOptions || getOptions());
  const keyObject = options.addProps['syncopation'][0] ? _getKeyObject(options.key) : _getKeyObjectShort(options.key);

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