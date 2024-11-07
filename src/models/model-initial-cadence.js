import ModelUtilities from '../model-utilities.js';
import ModelTemplates from '../model-templates.js';

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
    ];
  } else {
    voices = [
      ['=E42', '=D42', '=D42', '=C42'],
      ['=C42', '=B32', '=B32', '=A32'],
      ['=A22', '=A22', '^G22', '=A22']
    ];
  }
  if (options.addProps.begin65[0]) {
    if (!isMinor) {
      voices[0].splice(0, 0, '=A41');
      voices[0].splice(1, 1, '=G41');
    } else {
      voices[0].splice(0, 0, '^F41');
      voices[0].splice(1, 1, '=E41');
    }
  }
  return ModelUtilities.getVoices(options, voices);
};

const Cadence = {
  getDefaultOptions: getOptions,
  getVoices
};

export default Cadence;