import ModelHelper from '../model-helper.js';
import ModelTemplates from '../model-templates.js';

const _keyObj = {  
  'E': { key: 'E', t: 2, accidentals: [[1, 1, 0, 1], [0, 0, 1, 0], [1, 0, 0, 0]] },  
  'C#m': { key: 'C#m', t: 0, accidentals: [[0, 1, 0, 0], [1, 1, 1, 1], [0, 1, 1, 1]] },
  'A': { key: 'A', t: -2, accidentals: [[1, 0, 0, 1], [0, 0, 1, 0], [1, 0, 0, 0]] },  
  'F#m': { key: 'F#m', t: 3, accidentals: [[0, 1, 0, 0], [1, 1, 1, 1], [0, 0, 1, 1]] },
  'D': { key: 'D', t: 1, accidentals: [[1, 0, 0, 1], [0, 0, 1, 0], [1, 0, 0, 0]] },  
  'Bm': { key: 'Bm', t: -1, accidentals: [[0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 1, 0]] },
  'G': { key: 'G', t: 4, accidentals: [[0, 0, 0, 0], [0, 0, 1, 0], [0, 0, 0, 0]] },
  'Em': { key: 'Em', t: 2, accidentals: [[0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 0]] },
  'C': { key: 'C', t: 0, accidentals: [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]] },
  'Am': { key: 'Am', t: -2, accidentals: [[0, 0, 0, 0], [0, 0, 1, 0], [0, 0, 0, 0]] },
  'F': { key: 'F', t: 3, accidentals: [[0, 0, 0, 0], [0, 0, 0, 0], [0, -1, 0, 0]] },
  'Dm': { key: 'Dm', t: 1, accidentals: [[0, 0, 0, 0], [0, 0, 1, 0], [0, 0, 0, 0]] },
  'Bb': { key: 'Bb', t: -1, accidentals: [[0, 0, 0, -1], [-1, -1, 0, -1], [0, -1, 0, -1]] },  
  'Gm': { key: 'Gm', t: 4, accidentals: [[-1, 0, 0, -1], [0, 0, 1, 0], [-1, 0, 0, 0]] },
  'Eb': { key: 'Eb', t: 2, accidentals: [[0, 0, 0, 0], [-1, -1, 0, -1], [0, -1, -1, -1]] },  
  'Cm': { key: 'Cm', t: 0, accidentals: [[-1, 0, 0, -1], [0, 0, '=', 0], [-1, 0, 0, 0]] },
  'Ab': { key: 'Ab', t: -2, accidentals: [[0, -1, 0, 0], [-1, -1, 0, -1], [0, -1, -1, -1]] },  
  'Fm': { key: 'Fm', t: 3, accidentals: [[-1, 0, 0, -1], [0, 0, '=', 0], [-1, -1, 0, 0]] }
};

function _getKeyObject(change) {  
  return _keyObj[change];
}

function getModelKeys() {
  return Object.keys(_keyObj);
}

const getOptions = change => {
  const modelTemplate = ModelTemplates.getModelTemplate('cadence');
  if(change) {
    modelTemplate.key = change;
  }
  return modelTemplate;
};

const setAccidentials = (keyObject, isBegin, isFinal, isDeceptiv) => {
  switch (keyObject.key) {
    case 'Gm':
    case 'Cm':
    case 'Fm':
      keyObject.accidentals[0][3] = isFinal || isDeceptiv ? 0 : -1;
      keyObject.accidentals[2][0] = isBegin ? 0 : -1;
      break;
    case 'Bb':
    case 'Ab':
    case 'Eb':
      keyObject.accidentals[0][3] = isFinal || isDeceptiv ? -1 : 0;
      keyObject.accidentals[2][0] = isBegin ? -1 : 0;
      break;
    case 'D':
    case 'A':
    case 'E':
      keyObject.accidentals[0][3] = isFinal || isDeceptiv ? 0 : 1;
      keyObject.accidentals[2][0] = isBegin ? 0 : 1;
      break;
    case 'C#m':
    case 'F#m':
      keyObject.accidentals[0][3] = isFinal || isDeceptiv ? 1 : 0;
      keyObject.accidentals[2][0] = isBegin ? 1 : 0;
      break;
    default:
      break
  }
};

const setAccidentialsForDeceptiveBassModification = (keyObject, isDeceptive) => {
  switch (keyObject.key) {
    case 'Dm':
    case 'Gm':
    case 'Cm':
    case 'Fm':
      keyObject.accidentals[2][3] = isDeceptive ? -1 : 0;
      break;
    case 'Ab':
    case 'Eb':
    case 'Bb':
      keyObject.accidentals[2][3] = isDeceptive ? 0 : -1;
      break;
    case 'C#m':
    case 'F#m':
      keyObject.accidentals[2][3] = isDeceptive ? 0 : 1;
      break;
    case 'A':
    case 'E':
      keyObject.accidentals[2][3] = isDeceptive ? 1 : 0;
      break
    default:
      break;
  }
};

const getVoices = cadenceOptions => {
  const voicesLength = 4;
  const measure = [' | ', ' ', ' | ', ' '];
  const voices = [[9, 8, 8, 9], [7, 7, 6, 7], [2, 3, 4, 0]];
  const options = cadenceOptions ?? getOptions();
  let keyObject = _getKeyObject(options.key);

  const isBegin = options.addProps['isBegin'][0];
  const isFinal = options.addProps['isFinal'][0];
  const isDeceptive = options.addProps['isDeceptiv'][0];
  if(isBegin) {
    voices[2][0] = 0;
  }
  if (isFinal) {
    voices[0][3] = 7;
    voices[2][3] = 0;
  }
  if (isDeceptive) {
    voices[0][3] = 7;
    voices[2][3] = 5;
  }
  setAccidentials(keyObject, isBegin, isFinal, isDeceptive);
  setAccidentialsForDeceptiveBassModification(keyObject, isDeceptive);

  return ModelHelper.getVoices(
    options.transposeValues, 
    options.voiceArrangement, 
    voices, 
    keyObject,
    voicesLength, 
    measure
  );
};

const getStaff = () => {
  return ['x | x x | x]', 'x | x x | x]', 'x | x x | x]'];
};

const getExample = () => {
  return ['', '', '']; 
};

const Cadence = {
  getDefaultOptions: getOptions,
  getVoices,
  getEmptyStaff: getStaff,
  getModelKeys,
  getMusicExample: getExample
};

export default Cadence;