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
  const isSchema = options.addProps.schema[0];
  if(isSchema) {
    options.addProps.begin65[0] = false;
    options.addProps.begin65[1] = true;
  } else {
    options.addProps.begin65[1] = false;
  }
  const is65 = options.addProps.begin65[0];
  const isMinor = options.modelKey.includes('m');
  const voices = [[], [], []];
  if (!isMinor) {    
    voices[0] = !isSchema ? ['=G42', '=F42', '=F42', '=E42'] : ['=E42', '=D42', '=F42', '=E42'];
    voices[1] = !isSchema ? ['=E42', '=D42', '=D42', '=C42'] : ['=C42', '=B32', '=G32', '=C42'];
    voices[2] = !isSchema ? ['=C32', '=C32', '=B22', '=C32'] : ['=C32', '=G22', '=B22', '=C32'];
  } else {
    voices[0] = !isSchema ? ['=E42', '=D42', '=D42', '=C42'] : ['=C42', '=B32', '=D42', '=C42'];
    voices[1] = !isSchema ? ['=C42', '=B32', '=B32', '=A32'] : ['=A32', '^G32', '=E32', '=A32'];
    voices[2] = !isSchema ? ['=A22', '=A22', '^G22', '=A22'] : ['=A22', '=E22', '^G22', '=A22'];
  }
  if (is65 && !isSchema) {
    if (!isMinor) {
      voices[0].splice(0, 0, '=A41');
      voices[0].splice(1, 1, '=G41');
    } else {
      voices[0].splice(0, 0, '=F41');
      voices[0].splice(1, 1, '=E41');
    }
  }
  return ModelUtilities.getVoices(options, voices);
};

const InitialCadence = {
  getDefaultOptions: getOptions,
  getVoices
};

export default InitialCadence;