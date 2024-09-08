import ModelHelper from '../model-helper.js';
import ModelTemplates from '../model-templates.js';
import cloneDeep from '@educandu/educandu/utils/clone-deep.js';

const _keyObj = {
  'E': { modelKey: 'E', t: -5, accidentals: [[1, 1, 0, 0, 0, 0], [1, 1, 0, 0, 0, 1], [0, 1, 0, 1, 0, 0]] },
  'C#m': { modelKey: 'C#m', t: 0, accidentals: [[0, 0, 1, 1, 1, 1], [0, 1, 0, 1, 0, 1], [1, 0, 0, 0, 0, 1]] },
  'A': { modelKey: 'A', t: -2, accidentals: [[1, 1, 0, 0, 0, 0], [1, 0, 0, 0, 0, 1], [0, 1, 0, 1, 0, 0]] },
  'F#m': { modelKey: 'F#m', t: -4, accidentals: [[0, 0, 1, 1, 0, 1], [0, 1, 0, 1, 0, 1], [1, 0, 0, 0, 0, 1]] },
  'D': { modelKey: 'D', t: 1, accidentals: [[0, 0, 0, 0, 0, 0], [1, 0, 0, 0, 0, 1], [0, 1, 0, 0, 0, 0]] },
  'Bm': { modelKey: 'Bm', t: -1, accidentals: [[0, 0, 1, 1, 0, 1], [0, 1, 0, 0, 0, 1], [0, 0, 0, 0, 0, 1]] },
  'G': { modelKey: 'G', t: -3, accidentals: [[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1], [0, 1, 0, 0, 0, 0]] },
  'Em': { modelKey: 'Em', t: -5, accidentals: [[0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 0, 1], [0, 0, 0, 0, 0, 0]] },
  'C': { modelKey: 'C', t: 0, accidentals: [[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]] },
  'Am': { modelKey: 'Am', t: -2, accidentals: [[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 0]] },
  'F': { modelKey: 'F', t: -4, accidentals: [[0, 0, 0, 0, -1, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]] },
  'Dm': { modelKey: 'Dm', t: -6, accidentals: [[-1, -1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1], [0, 0, 0, -1, 0, 0]] },
  'Bb': { modelKey: 'Bb', t: -1, accidentals: [[0, 0, 0, 0, -1, 0], [0, 0, 0, -1, 0, 0], [-1, 0, 0, 0, 0, 0]] },
  'Gm': { modelKey: 'Gm', t: -3, accidentals: [[-1, -1, 0, 0, 0, 0], [-1, 0, 0, 0, 0, 1], [0, 0, 0, -1, 0, 0]] },
  'Eb': { modelKey: 'Eb', t: 2, accidentals: [[0, 0, -1, -1, -1, -1], [0, 0, 0, -1, 0, 0], [-1, 0, 0, 0, 0, -1]] },
  'Cm': { modelKey: 'Cm', t: 0, accidentals: [[-1, -1, 0, 0, 0, 0], [-1, 0, 0, 0, 0, '='], [0, -1, 0, -1, 0, 0]] },
  'Ab': { modelKey: 'Ab', t: -2, accidentals: [[0, 0, -1, -1, -1, -1], [0, -1, 0, -1, 0, 0], [-1, 0, 0, 0, 0, -1]] },
  'Fm': { modelKey: 'Fm', t: -4, accidentals: [[-1, -1, 0, 0, -1, 0], [-1, 0, 0, 0, 0, '='], [0, -1, 0, -1, 0, 0]] } 
}

const _keyObjShort = {
  'E': { modelKey: 'E', t: -5, accidentals: [[0, 0, 0, 0], [1, 1, 0, 1], [0, 1, 1, 0]] },
  'C#m': { modelKey: 'C#m', t: 0, accidentals: [[1, 1, 1, 1], [0, 1, 1, 1], [1, 0, 0, 1]] },
  'A': { modelKey: 'A', t: -2, accidentals: [[0, 0, 0, 0], [1, 0, 0, 1], [0, 1, 1, 0]] },
  'F#m': { modelKey: 'F#m', t: -4, accidentals: [[1, 1, 0, 1], [0, 1, 1, 1], [1, 0, 0, 1]] },
  'D': { modelKey: 'D', t: 1, accidentals: [[0, 0, 0, 0], [1, 0, 0, 1], [0, 1, 0, 0]] },
  'Bm': { modelKey: 'Bm', t: -1, accidentals: [[1, 1, 0, 1], [0, 1, 0, 1], [0, 0, 0, 1]] },
  'G': { modelKey: 'G', t: -3, accidentals: [[0, 0, 0, 0], [0, 0, 0, 1], [0, 1, 0, 0]] },
  'Em': { modelKey: 'Em', t: -5, accidentals: [[0, 0, 0, 0], [0, 1, 0, 1], [0, 0, 0, 0]] },
  'C': { modelKey: 'C', t: 0, accidentals: [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]] },
  'Am': { modelKey: 'Am', t: -2, accidentals: [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]] },
  'F': { modelKey: 'F', t: -4, accidentals: [[0, 0, -1, 0], [0, 0, 0, 0], [0, 0, 0, 0,]] },
  'Dm': { modelKey: 'Dm', t: -6, accidentals: [[0, 0, 0, 0], [0, 0, 0, 1], [0, 0, -1, 0]] },
  'Bb': { modelKey: 'Bb', t: -1, accidentals: [[0, 0, -1, 0,], [0, 0, -1, 0], [-1, 0, 0, 0,]] },
  'Gm': { modelKey: 'Gm', t: -3, accidentals: [[0, 0, 0, 0,], [-1, 0, 0, 1], [0, 0, -1, 0]] },
  'Eb': { modelKey: 'Eb', t: 2, accidentals: [[-1, -1, -1, -1,], [0, 0, -1, 0], [-1, 0, 0, -1]] },
  'Cm': { modelKey: 'Cm', t: 0, accidentals: [[0, 0, 0, 0], [-1, 0, 0, '='], [0, -1, -1, 0]] },
  'Ab': { modelKey: 'Ab', t: -2, accidentals: [[-1, -1, -1, -1], [0, -1, -1, 0], [-1, 0, 0, -1]] },
  'Fm': { modelKey: 'Fm', t: -4, accidentals: [[0, 0, -1, 0], [-1, 0, 0, '='], [0, -1, -1, 0]] }
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
  const modelTemplate = ModelTemplates.getModelTemplate('lamento');
  if(change) {
    modelTemplate.modelKey = change;
  }
  return modelTemplate;
};

function _adjustOptions(options) {
  if(options.addProps['syncopation'][0]) { // with syncopations
    options.voices = [[5, 5, 4, 4, 3, 4], [9, 8, 8, 7, 7, 6], [7, 6, 6, 5, 5, 4]];
    options.measure = [' | ', ' ', ' | ', ' ', ' | ', ' '];
    options.voicesLength = 6;
  } else { // without syncopations
    options.voices = [[4, 4, 3, 4], [9, 8, 7, 6], [7, 6, 5, 4]]; 
    options.measure = [' | ', ' ', ' | ', ' '];
    options.voicesLength = 4;
  }
}

function _adjustAccidantals(options, keyObject, keyObjectOrig) {
  // set italian sixth accidental
  if(options.voicesLength === 4 && keyObject.modelKey.includes('m') && options.addProps['italianSixth'][0]) {
    switch (keyObject.accidentals[0][2]) {
      case 0:
        keyObject.accidentals[0][2] = 1;
        break; 
      case -1:
        keyObject.accidentals[0][2] = 0;
        break;    
      default:
        break;
    }
  }
  if (options.voicesLength === 6 && ((options.addProps['chromatic3'][0] || keyObject.modelKey.includes('m')) && options.addProps['italianSixth'][0])) {
    switch (keyObject.accidentals[0][4]) {
      case 0:
         keyObject.accidentals[0][4] = 1;
        break; 
      case -1:
        keyObject.accidentals[0][4] = '=';
        break;    
      default:
        break;
    }  
  }
  // set the accidental for a chromatic bass line
  if(options.addProps['chromatic3'][0]) {
    switch(keyObject.modelKey) {
      case 'C':
      case 'F':
        keyObject.accidentals[2] = [0, 0, -1, 0, -1, 0];
        break;  
      case 'G':
      case 'D':
      case 'Dm':
      case 'Gm':
        keyObject.accidentals[2] = [0, 1, '=', 0, -1, 0];
        break;
      case 'A':
      case 'E':
      case 'Am':
      case 'Em':
        keyObject.accidentals[2] = [0, 1, '=', 1, '=', 0];
        break;
      case 'B':
        keyObject.accidentals[2] = [-1, 0, -1, 0, -1, 0];
        break;
      case 'Eb':
      case 'Ab':
        keyObject.accidentals[2] = [-1, 0, -1, 0, -1, -1];
        break;
      case 'Cm':
      case 'Fm':
        keyObject.accidentals[2] = [0, '=', -1, '=', -1, 0];
        break;
      case 'Bm':
        keyObject.accidentals[2] = [0, 1, '=', 1, '=', 1];
        break;
      case 'F#m':
        keyObject.accidentals[2] = [1, 1, '=', 1, '=', 1];
        break;
        case 'C#m':
          keyObject.accidentals[2] = [1, '=', 0, 1, '=', 1];
      default:
        break;
    }
  } else {
    keyObject.accidentals[2] = keyObjectOrig.accidentals[2];
  }
  // set the accidentals for a chromatic inner voice
  if(options.addProps['chromatic2'][0]) {
    switch(keyObject.modelKey) {
      case 'C':
      case 'F':
        keyObject.accidentals[1] = [0, 1, '=', 1, '=', 0];
        break;
      case 'G':
        keyObject.accidentals[1] = [0, 1, '=', 1, '=', 1];
        break;
      case 'D':
      case 'A':
        keyObject.accidentals[1] = [1, 1, '=', 1, '=', 1];
        break;
      case 'E':
        keyObject.accidentals[1] = [1, '^^', 1, 1, '=', 1];
        break;
      case 'B':
      case 'Eb':
        keyObject.accidentals[1] = [0, 1, '=', '=', -1, 0];
        break;
      case 'Ab':
        keyObject.accidentals[1] = [0, '=', -1, '=', -1, 0];
        break;
      case 'Am':
      case 'Dm':
      case 'Gm':
        keyObject.accidentals[1] = [0, 0, -1, 0, 0, 1];
        break;
      case 'Em':
      case 'Bm':
        keyObject.accidentals[1] = [0, 1, '=', 0, 0, 1];
        break;
      case 'F#m':
      case 'C#m':
        keyObject.accidentals[1] = [0, 1, '=', 1, 1, 1];
        break;
      case 'Cm':
      case 'Fm':
        keyObject.accidentals[1] = [0, 0, -1, 0, 0, '='];
        break;
    }
  } else {
    keyObject.accidentals[1] = keyObjectOrig.accidentals[1];
  }  
}

function _setValuesForCheckboxes(isMinor, syncopationProp, chromBassProp, italianProp, variantProp) {
  // set active state
  chromBassProp[1] = !syncopationProp[0];
  italianProp[1] = !isMinor;
  if(chromBassProp[0]) {
    italianProp[1] = false;
  }
  variantProp[1] = !chromBassProp[0];
  // set value dependencies
  if(!syncopationProp[0]) {
    chromBassProp[0] = false;
    variantProp[0] = false;
    if (!isMinor) {
      italianProp[0] = false;
    }
  }  
}

const getVoices = lamentoOptions => {
  const options = lamentoOptions ?? getOptions();
  _adjustOptions(options);
  const keyObjectOrig = options.addProps['syncopation'][0] ? _getKeyObject(options.modelKey) : _getKeyObjectShort(options.modelKey);
  const keyObject = cloneDeep(keyObjectOrig);
  if (options.voicesLength === 4 && !options.addProps['chromatic3']) {
    options.addProps['italianSixth'][1] = !keyObject.modelKey.includes('m');
  }
  _setValuesForCheckboxes(
    options.modelKey.includes('m'), 
    options.addProps['syncopation'], 
    options.addProps['chromatic3'], 
    options.addProps['italianSixth'], 
    options.addProps['chromatic2']
  );
  _adjustAccidantals(options, keyObject, keyObjectOrig);

  return ModelHelper.getVoices(
    options.transposeValues, 
    options.voiceArrangement, 
    options.voices, 
    keyObject, 
    options.voicesLength, 
    options.measure
  );
};

const _adjustMutetVoices = (voices, hideUpperSystem, hideLowerSystem) => {
  return ModelHelper.convertToEmptyLines(voices, hideUpperSystem, hideLowerSystem);
}

const getExample = () => {
  return ['f- | f e2 d- | -d c d3/2', 'z | B2 A2 | G2 F z/', 'A,/D,/ | G,/F,/G,/C,/ F,/E,/F,/B,,/ | E,/F,//G,// A,/A,,/ D,/E,/,F,/]'];
};

const Lamento = {
  getDefaultOptions: getOptions,
  getVoices,
  getModelKeys,
  getMutedVoices: (voices, hideUpperSystem, hideLowerSystem) => _adjustMutetVoices(voices, hideUpperSystem, hideLowerSystem)
};

export default Lamento;
