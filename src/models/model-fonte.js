import ModelUtilities from '../model-utilities.js';
import ModelTemplates from '../model-templates.js';

const getOptions = change => {
  const modelTemplate = ModelTemplates.getModelTemplate('monteFontePonte');
  if(change) {
    modelTemplate.modelKey = change;
  }
  return modelTemplate;
};

const getVoices = mfpOptions => {
  const options = mfpOptions ?? getOptions();
  const voices = [[], [], []];
  voices[0] = ['=G42', '=F42', '=F42', '=E42']; 
  voices[1] = ['^C42', '=D42', '=B32', '=C42']; 
  voices[2] = options.addProps.bassReverse[0] ? ['=A32', '=D32', '=G32', '=C32'] : ['=A32', '=D42', '=G32', '=C42'];
  if (options.addProps.expanded[0]) {
    voices[0] = ['^G42', '=A42', '=G42:f', '=F42', '=F42', '=E42'];
    voices[1] = ['=D42', '=C42', '^C42', '=D42', '=B32', '=C42'];
    voices[2] = options.addProps.bassReverse[0] ? ['=E32', '=A32', '=A32', '=D32', '=G32', '=C32'] : ['=E42', '=A32', '=A32', '=D42', '=G32', '=C42'];
  }
  return ModelUtilities.getVoices(options, voices);
};

const Fonte = {
  getDefaultOptions: getOptions,
  getVoices
};

export default Fonte;