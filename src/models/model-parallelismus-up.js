import ModelHelper from '../model-helper.js';

const _keyObj = {
  C: { key: 'C', t: 0, accidentals: [[0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]] },
  Am: { key: 'Am', t: -2, accidentals: [[0, 0, 0, 0, 0, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]] }
};

const _keyObjShort = {
  C: { key: 'C', t: 0, accidentals: [[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]] },
  Am: { key: 'Am', t: -2, accidentals: [[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 0]] }
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
  const modelTemplate = ModelHelper.getModelTemplate('parallelismusUp');
  if(change) {
    modelTemplate.key = change;
  }
  return modelTemplate;
};

function _AdjustOptions(options) {
  switch(options.addProps['numberOfSections'][0]) {
    case 1:
      options.voices = [[2, 5], [4, 3], [0, 3]];
      options.measure = [' | ', ' '];
      options.voicesLength = 2;
      options.addProps['syncopation'] = [false, true];
      break;
    case 2:
      if(options.addProps['syncopation'][0]) {
        options.voices = [[2, 5, 5, 5, 4, 7], [4, 4, 3, 6, 6, 5], [0, 3, 3, 2, 2, 5]];
        options.measure = [' | ', ' ', ' | ', ' ', '|', ''];     
        options.voicesLength = 6;
        options.addProps['syncopation'][1] = false; 
      } else {
        options.voices = [[4, 5, 6, 7], [2, 3, 4, 5], [0, 3, 2, 5]]; 
        options.measure = [' | ', ' ', ' | ', ' '];
        options.voicesLength = 4;
        options.addProps['syncopation'][1] = false;
      }      
      break; 
    default:
      if(options.addProps['syncopation'][0]) {
        options.voices = [[2, 5, 5, 5, 4, 7, 7, 7, 6, 9], [4, 4, 3, 6, 6, 6, 5, 8, 8, 7], [0, 3, 3, 2, 2, 5, 5, 4, 4, 7]];
        options.measure = [' | ', ' ', ' | ', ' ', ' | ', ' ', ' | ', ' ', ' | ', ' '];
        options.voicesLength = 10;
        options.addProps['syncopation'][1] = false;
      } else {
        options.voices = [[4, 5, 6, 7, 8, 9], [2, 3, 4, 5, 6, 7], [0, 3, 2, 5, 4, 7]];
        options.measure = [' | ', ' ', ' | ', ' ', ' | ', ' '];
        options.voicesLength = 6;
        options.addProps['syncopation'][1] = false;
      }      
      break;
  }
  return options;
}

const someKeys = [];
const modifyLastChordSectionEndings = (keyObject, key) => {
  if (key === 'Dm' || key === 'Gm' || key === 'Cm' || key === 'Fm' || key === 'A' || key === 'E') {
    keyObject.accidentals[1][5] = 0;
  } else if (key === 'Bm' || key === 'F#m' || key === 'C#m') {
    keyObject.accidentals[1][5] = 1;
  } else {
    keyObject.accidentals[1][5] = -1;
  }
} 

const getVoices = parallelismusUpOptions => {
  const options = _AdjustOptions(parallelismusUpOptions || getOptions());
  const keyObject = options.addProps['syncopation'][0] ? _getKeyObject(options.key) : _getKeyObjectShort(options.key);
  if (someKeys.indexOf(options.key) >= 0) {
    modifyLastChordSectionEndings(keyObject, options.key);
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