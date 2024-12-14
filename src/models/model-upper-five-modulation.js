import ModelUtilities from '../model-utilities.js';
import ModelTemplates from '../model-templates.js';

const getOptions = change => {
  const modelTemplate = ModelTemplates.getModelTemplate('upperFiveModulation');
  if(change) {
    modelTemplate.modelKey = change;
  }
  return modelTemplate;
};

const getVoices = upperFifthModulationOptions => {
  const options = upperFifthModulationOptions ?? getOptions();
  const isMinor = options.modelKey.includes('m');
  let voices;
  if (!isMinor) {
    voices = [
      ['=G42', '^F42', '=G42', '=G42', '^F42', '=G42'],
      ['=E42', '=D42', '=D42', '=C42', '=C42', '=B32'],
      ['=C32', '=C32', '=B22', '=A22', '=D32', '=G22']
    ];
  } else {
    voices = [
      ['=E42', '^D42', '=E42', '=E42', '^D42', '=E42'],
      ['=C42', '=B32', '=B32', '=A32', '=A32', '=G32'],
      ['=A32', '=A32', '=G32', '^F32', '=B32', '=E32']
    ];
  }
  // Set values for changeMod selection 
  if (options.addProps.changeMode[0]) {
    options.addProps.prinner = [false, true];
    if (!isMinor) {
      voices[1][5] = '_B32';
      voices[2][2] = '_B22';
    } else {
      voices[1][5] = '^G32';
      voices[2][2] = '^G32';
    }
  }
  // Set values for prinner selection 
  if(options.addProps.prinner[0]) {
    options.addProps.changeMode = [false, true];
    voices = !isMinor 
      ? [
        ['=G42', '=G42', '^F42', '=G42'],
        ['=E42', '=D42', '=C42', '=B32'],
        ['=C32', '=B22', '=A22', '=G22']
      ]
      : [
        ['=E42', '=E42', '^D42', '=E42'],
        ['=C42', '=B32', '=A32', '=G32'],
        ['=A32', '=G32', '^F32', '=E32']
      ];
  } else {
    options.addProps.changeMode[1] = false;
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
  options.addProps.prinner[1] = options.addProps.changeMode[0];
  return ModelUtilities.getVoices(options, voices);
};

const UpperFiveModulation = {
  getDefaultOptions: getOptions,
  getVoices
};

export default UpperFiveModulation;