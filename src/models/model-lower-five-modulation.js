import ModelUtilities from '../model-utilities.js';
import ModelTemplates from '../model-templates.js';

const getOptions = change => {
  const modelTemplate = ModelTemplates.getModelTemplate('lowerFiveModulation');
  if(change) {
    modelTemplate.modelKey = change;
  }
  return modelTemplate;
};

const getVoices = lowerFifthModulationOptions => {
  const options = lowerFifthModulationOptions || getOptions();
  const isMinor = options.modelKey.includes('m');
  let voices;
  if (!isMinor) {
    voices = [
      ['=E42', '=D42', '=D42', '=C42', '=F42', '=F42', '=E42', '=F42'],
      ['=C42', '=C42', '_B32:f', '_B32', '=A32', '=G32', '=G32', '=A32'],
      ['=C32', '=G32', '=G32', '=E32', '=F32', '=C32', '=C32', '=F32']
    ];
  } else {
    voices = [
      ['=C52', '=B42', '=B42', '=A42', '=D52', '=D52', '^C52', '=D52'],
      ['=A42', '=A42', '=G42:f', '=G42', '=F42', '=E42', '=E42', '=F42'],
      ['=A22', '=E32', '=E32', '^C32', '=D32', '=A22', '=A22', '=D32']
    ];
  }
  if (options.addProps.changeMode[0]) {
    if (!isMinor) {
      voices[0][6] = '=E42:f';
      voices[1][4] = '_A32';
      voices[1][7] = '_A32';
    } else {
      voices[1][4] = '^F42';
      voices[1][7] = '^F42';
    }
  }

  return ModelUtilities.getVoices(options, voices);
};

const LowerFiveModulation = {
  getDefaultOptions: getOptions,
  getVoices
};
  
export default LowerFiveModulation;