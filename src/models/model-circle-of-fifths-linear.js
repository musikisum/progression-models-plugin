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