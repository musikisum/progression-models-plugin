import ModelUtilities from '../model-utilities.js';
import ModelTemplates from '../model-templates.js';

function getModelKeys() {
  return ['E','C#m', 'A', 'F#m', 'D', 'Bm', 'G', 'Em', 'C', 'Am', 'F', 'Dm', 'Bb', 'Gm', 'Eb', 'Cm', 'Ab', 'Fm'];
}

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
      ['=E42', '=D42', '=D42', '=C42', '=C42', '=B32'],
      ['=G32', '^F32', '=G32', '=G32', '^F32', '=G32'],
      ['=C32', '=C32', '=B22', '=A22', '=D32', '=G22']
     ]
  } else {
    voices = [
      ['=C52', '=B42', '=B42', '=A42', '=A42', '=G42'],
      ['=E42', '^D42', '=E42', '=E42', '^D42', '=E42'],
      ['=A32', '=A32', '=G32', '^F32', '=B32', '=E32']
    ]
  }
  
  // Set values for prinner selection 
  const prinner = options.addProps['prinner'][0];
  if(prinner) {
    options.addProps['changeMode'] = [false, true];
    options.addProps['begin65'] = [false, true];
  } else {
    options.addProps['changeMode'][1] = false;
    options.addProps['begin65'][1] = false;
  }
  
  // Set values for changing mode or 6-5 begin
  const changeMode = options.addProps['changeMode'][0];
  const begin65 = options.addProps['begin65'][0]; 

  return ModelUtilities.getVoices(options, voices);
};

const _adjustMutetVoices = (voices, hideUpperSystem, hideLowerSystem) => {
  return ModelUtilities.convertToEmptyLines(voices, hideUpperSystem, hideLowerSystem);
}

const UpperFiveModulation = {
  getDefaultOptions: getOptions,
  getVoices,
  getModelKeys,
  getMutedVoices: (voices, hideUpperSystem, hideLowerSystem) => _adjustMutetVoices(voices, hideUpperSystem, hideLowerSystem)
};

export default UpperFiveModulation;