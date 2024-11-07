import ModelUtilities from '../model-utilities.js';
import ModelTemplates from '../model-templates.js';

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
      ['=C32', '=D32', '=E32', '=A22']
    ];
  }
  const isBegin = options.addProps.isBegin[0];
  const isFinal = options.addProps.isFinal[0];
  const isDeceptive = options.addProps.isDeceptiv[0];
  if(isBegin) {
    voices[2][0] = !isMinor ? '=C42' : '=A32';
  }
  if (isFinal) {
    voices[0][3] = !isMinor ? '=C42' : '=A42';
    voices[2][3] = !isMinor ? '=C32' : '=A22';
  }
  if (isDeceptive) {
    voices[0][3] = !isMinor ? '=C42' : '=A42';
    voices[2][3] = !isMinor ? '=A32' : '=F32';
  }
  return ModelUtilities.getVoices(options, voices);
};

const Cadence = {
  getDefaultOptions: getOptions,
  getVoices
};

export default Cadence;