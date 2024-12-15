import ModelUtilities from '../model-utilities.js';
import ModelTemplates from '../model-templates.js';

const getOptions = change => {
  const modelTemplate = ModelTemplates.getModelTemplate('halfCadence');
  if(change) {
    modelTemplate.modelKey = change;
  }
  return modelTemplate;
};

const getVoices = halfCadenceOptions => {
  const options = halfCadenceOptions ?? getOptions();
  const isMinor = options.modelKey.includes('m');
  let voices;
  if (!isMinor) {
    voices = [
      ['=E42', '=D42', '=D42', '=D42'],
      ['=C42', '=C42', '=C42', '=B32'],
      ['=E32', '=F32', '=F32', '=G32']
    ];
  } else {
    voices = [
      ['=C52', '=B42', '=B42', '=B42'],
      ['=A42', '=A42', '=A42', '^G42:f'],
      ['=C32', '=D32', '=D32', '=E32']
    ];
  }
  const hasDd = options.addProps.hasDd[0];
  const isBegin = options.addProps.isBegin[0];
  if(isBegin) {
    voices[2][0] = !isMinor ? '=C32' : '=A32';
  }
  if(hasDd) {
    voices[2][2] = !isMinor ? '^F32' : '^D32';
  }
  return ModelUtilities.getVoices(options, voices);
};

const HalfCadence = {
  getDefaultOptions: getOptions,
  getVoices
};

export default HalfCadence;