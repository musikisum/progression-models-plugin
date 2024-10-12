import ModelUtilities from '../model-utilities.js';
import ModelTemplates from '../model-templates.js';

function getModelKeys() {
  return ['E','C#m', 'A', 'F#m', 'D', 'Bm', 'G', 'Em', 'C', 'Am', 'F', 'Dm', 'Bb', 'Gm', 'Eb', 'Cm', 'Ab', 'Fm'];
}

const getOptions = change => {
  const modelTemplate = ModelTemplates.getModelTemplate('circleOfFifths');
  if(change) {
    modelTemplate.modelKey = change;
  }
  return modelTemplate;
};

const getVoices = circleOfFifthsOptions => {
  const options = circleOfFifthsOptions ?? getOptions();
  const isMinor = options.modelKey.includes('m');
  let voices;
  if (!isMinor) {
    voices = [
      ['=G42', '=A42', '=A42', '=G42', '=G42', '=F42', '=F42', '=E42'],
      ['=E42', '=E42', '=D42', '=D42', '=C42', '=C42', '=B32', '=C42'],
      ['=C32', '=F32', '=B22', '=E32', '=A22', '=D32', '=G22', '=C32']
     ]
  } else {
    voices = [
      ['=E42', '=F42', '=F42', '=E42', '=E42', '=D42', '=D42', '=C42'],
      ['=C42', '=C42', '=B32', '=B32', '=A32', '=A32', '^G32', '=A42'],
      ['=A22', '=D32', '=G22', '=C32', '=F22', '=B22', '=E22', '=A22']
    ]
  }
  return ModelUtilities.getVoices(options, voices);
};

const _adjustMutetVoices = (voices, hideUpperSystem, hideLowerSystem) => {
  return ModelUtilities.convertToEmptyLines(voices, hideUpperSystem, hideLowerSystem);
}

const CircleOfFifths = {
  getDefaultOptions: getOptions,
  getVoices,
  getModelKeys,
  getMutedVoices: (voices, hideUpperSystem, hideLowerSystem) => _adjustMutetVoices(voices, hideUpperSystem, hideLowerSystem)
};

export default CircleOfFifths;
