import ModelUtilities from '../model-utilities.js';
import ModelTemplates from '../model-templates.js';

function getModelKeys() {
  return ['E', 'C#m', 'A', 'F#m', 'D', 'Bm', 'G', 'Em', 'C', 'Am', 'F', 'Dm', 'Bb', 'Gm', 'Eb', 'Cm', 'Ab', 'Fm'];
}

const getOptions = change => {
  const modelTemplate = ModelTemplates.getModelTemplate('cadence');
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
      ['=E42', '=D42', '=D42', '=E42'],
      ['=C42', '=C42', '=B32', '=C42'],
      ['=E32', '=F32', '=G32', '=C32']
    ];
  } else {
    voices = [
      ['=C52', '=B42', '=B42', '=C52'],
      ['=A42', '=A42', '^G42:f', '=A42'],
      ['=C42', '=D42', '=E42', '=A32']
    ];
  }
  const isBegin = options.addProps.isBegin[0];
  const isFinal = options.addProps.isFinal[0];
  const isDeceptive = options.addProps.isDeceptiv[0];
  if(isBegin) {
    voices[2][0] = !isMinor ? '=C42' : '=A42';
  }
  if (isFinal) {
    voices[0][3] = !isMinor ? '=C42' : '=A42';
    voices[2][3] = !isMinor ? '=C32' : '=A32';
  }
  if (isDeceptive) {
    voices[0][3] = !isMinor ? '=C42' : '=A42';
    voices[2][3] = !isMinor ? '=A32' : '=F42';
  }
  return ModelUtilities.getVoices(options, voices);
};

const _adjustMutetVoices = (voices, hideUpperSystem, hideLowerSystem) => {
  return ModelUtilities.convertToEmptyLines(voices, hideUpperSystem, hideLowerSystem);
};

const Cadence = {
  getDefaultOptions: getOptions,
  getVoices,
  getModelKeys,
  getMutedVoices: (voices, hideUpperSystem, hideLowerSystem) => _adjustMutetVoices(voices, hideUpperSystem, hideLowerSystem)
};

export default Cadence;