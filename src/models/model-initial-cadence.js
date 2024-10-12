import ModelUtilities from '../model-utilities.js';
import ModelTemplates from '../model-templates.js';

function getModelKeys() {
  return ['E','C#m', 'A', 'F#m', 'D', 'Bm', 'G', 'Em', 'C', 'Am', 'F', 'Dm', 'Bb', 'Gm', 'Eb', 'Cm', 'Ab', 'Fm'];
}

const getOptions = change => {
  const modelTemplate = ModelTemplates.getModelTemplate('initialCadence');
  if(change) {
    modelTemplate.modelKey = change;
  }
  return modelTemplate;
};

const getVoices = cadenceOptions => {
  const options = cadenceOptions ?? getOptions();
  const isMinor = options.modelKey.includes('m');
  let voices;
  if (!isMinor) {
    voices = [
      ['=G42', '=F42', '=F42', '=E42'],
      ['=E42', '=D42', '=D42', '=C42'],
      ['=C32', '=C32', '=B22', '=C32']
     ]
  } else {
    voices = [
      ['=E42', '=D42', '=D42', '=C42'],
      ['=C42', '=B32', '=B32', '=A32'],
      ['=A22', '=A22', '^G22', '=A22']
    ]
  }
  return ModelUtilities.getVoices(options, voices);
};

const _adjustMutetVoices = (voices, hideUpperSystem, hideLowerSystem) => {
  return ModelUtilities.convertToEmptyLines(voices, hideUpperSystem, hideLowerSystem);
}

const Cadence = {
  getDefaultOptions: getOptions,
  getVoices,
  getModelKeys,
  getMutedVoices: (voices, hideUpperSystem, hideLowerSystem) => _adjustMutetVoices(voices, hideUpperSystem, hideLowerSystem)
};

export default Cadence;