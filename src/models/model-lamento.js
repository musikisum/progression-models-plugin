import ModelUtilities from '../model-utilities.js';
import ModelTemplates from '../model-templates.js';

const getOptions = change => {
  const modelTemplate = ModelTemplates.getModelTemplate('lamento');
  if(change) {
    modelTemplate.modelKey = change;
  }
  return modelTemplate;
};

function _setValuesForCheckboxes(syncopationProp, chromBassProp, variantProp) {
  // set active state
  chromBassProp[1] = !syncopationProp[0];
  variantProp[1] = !chromBassProp[0];
  // set value dependencies
  if(!syncopationProp[0]) {
    chromBassProp[0] = false;
    variantProp[0] = false;
  }
  // set option for syncopation proerty
  syncopationProp[1] = chromBassProp[0];
}

const getVoices = lamentoOptions => {
  const options = lamentoOptions ?? getOptions();
  const isMinor = options.modelKey.includes('m');
  let voices;
  if (options.addProps.syncopation[0]) {
    voices = !isMinor 
      ? [
        ['=A42', '=A42', '=G42', '=G42', '=F42', '=G42'],
        ['=E42', '=D42', '=D42', '=C42', '=C42', '=B32'],
        ['=C42', '=B32', '=B32', '=A32', '=A32', '=G32']
      ]
      : [
        ['=F42', '=F42', '=E42', '=E42', '=D42', '=E42'],
        ['=C42', '=B32', '=B32', '=A32', '=A32', '^G32'],
        ['=A32', '=G32', '=G32', '=F32', '=F32', '=E32']
      ];
  } else {
    voices = !isMinor 
      ? [
        ['=G42', '=G42', '=F42', '=G42'],
        ['=E42', '=D42', '=C42', '=B32'],
        ['=C42', '=B32', '=A32', '=G32']
      ]
      : [
        ['=E42', '=E42', '=D42', '=E42'],
        ['=C42', '=B32', '=A32', '^G32'],
        ['=A32', '=G32', '=F32', '=E32']
      ];
  }
  if (options.addProps.chromatic3[0]) {
    voices[2] = !isMinor
      ? ['=C42', '=B32:f', '_B32:f', '=A32:f', '_A32:f', '=G32']
      : ['=A32', '^G32:f', '=G32:f', '^F32:f', '=F32:f', '=E32'];
    if (options.addProps.chromatic2[0]) {
      voices[1] = !isMinor
        ? ['=E42', '^D42:f', '=D42:f', '^C42:f', '=C42:f', '=B32']
        : ['=C42', '=B32:f', '_B32:f', '=A32', '=A32', '^G32'];
    }
  }
  const ue65Index = options.addProps.syncopation[0] ? 4 : 2;
  if (options.addProps.italianSixth[0]) {    
    voices[0][ue65Index] = !isMinor ? '^F42' : '^D42';
  } else {
    voices[0][ue65Index] = !isMinor ? '=F42' : '=D42';
  }

  _setValuesForCheckboxes(
    options.addProps.syncopation, 
    options.addProps.chromatic3,
    options.addProps.chromatic2
  );

  return ModelUtilities.getVoices(options, voices);
};

const Lamento = {
  getDefaultOptions: getOptions,
  getVoices
};

export default Lamento;
