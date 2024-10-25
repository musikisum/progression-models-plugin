import ModelUtilities from '../model-utilities.js';
import ModelTemplates from '../model-templates.js';

function getModelKeys() {
  return ['E','C#m', 'A', 'F#m', 'D', 'Bm', 'G', 'Em', 'C', 'Am', 'F', 'Dm', 'Bb', 'Gm', 'Eb', 'Cm', 'Ab', 'Fm'];
}

const getOptions = change => {
  const modelTemplate = ModelTemplates.getModelTemplate('circleOfFifthsLinear');
  if(change) {
    modelTemplate.modelKey = change;
  }
  return modelTemplate;
};

const getVoices = fifthsCircleLinearOptions => {
  const options = fifthsCircleLinearOptions ?? getOptions();
  const isMinor = options.modelKey.includes('m');
  options.addProps.lastBassNoteUp[1] = options.addProps.partLengthValues[0] !== 4;
  let voices;
  if (!isMinor) {
    voices = [
      ['=G42', '=F42', '=F42', '=E42', '=E42', '=D42', '=D42', '=E42'],
      ['=E42', '=E42', '=D42', '=D42', '=C42', '=C42', '=B32', '=C42'],
      ['=C32', '=A22', '=B22', '=G22', '=A22', '=F22', '=G22', '=C22']
    ];
  } else {
    voices = [
      ['=E52', '=D52', '=D52', '=C52', '=C52', '=B42', '=B42', '=C52'],
      ['=C52', '=C52', '=B42', '=B42', '=A42', '=A42', '^G42', '=A42'],
      ['=A32', '=F32', '=G32', '=E32', '=F32', '=D32', '=E32', '=A22']
    ];
  }
  if (options.addProps.lastBassNoteUp[0]) {
    const signArr = voices[2][voices[2].length - 1].split('');
    signArr.splice(2, 1, '3');
    voices[2][voices[2].length - 1] = signArr.join('');
  }
  const partLengthValue = options.addProps.partLengthValues[0];
  if (partLengthValue !== 4) {
    voices = voices.map(arr => arr.slice(0, partLengthValue * 2));    
  }
  const partToBeginValues = options.addProps.partToBeginValues[0];
  if (partToBeginValues !== 1) {
    voices = voices.map(arr => arr.slice((partToBeginValues - 1) * 2));
  }
  return ModelUtilities.getVoices(options, voices);
};

const _adjustMutetVoices = (voices, hideUpperSystem, hideLowerSystem) => {
  return ModelUtilities.convertToEmptyLines(voices, hideUpperSystem, hideLowerSystem);
};

const CircleOfFifthsLinear = {
  getDefaultOptions: getOptions,
  getVoices,
  getModelKeys,
  getMutedVoices: (voices, hideUpperSystem, hideLowerSystem) => _adjustMutetVoices(voices, hideUpperSystem, hideLowerSystem),
};

export default CircleOfFifthsLinear;