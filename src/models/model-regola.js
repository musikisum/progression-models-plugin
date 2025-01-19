import ModelUtilities from '../model-utilities.js';
import ModelTemplates from '../model-templates.js';

const getOptions = change => {
  const modelTemplate = ModelTemplates.getModelTemplate('regola');
  if(change) {
    modelTemplate.modelKey = change;
  }
  return modelTemplate;
};

const getVoices = regolaOptions => {
  const options = regolaOptions ?? getOptions();
  const isMinor = options.modelKey.includes('m');

  // Set voices
  let voices;
  if (!isMinor) {
    voices = [
      ['=E52', '=D52', '=C52', '=B42', '=B42', '=C52', '=B42', '=C52'],
      ['=G42', '=G42', '^F42', '=G42', '=G42', '=G42', '=F42', '=E42'],
      ['=C42', '=B32', '=A32', '=G32', '=F32', '=E32', '=D32', '=C32']
    ];
  } else {
    voices = [
      ['=C52', '=B42', '=A42', '^G42', '^G42', '=A42', '^G42', '=A42'],
      ['=E42', '=B32', '=D42', '=E42', '=E42', '=E42', '=D42', '=C42'],
      ['=A32', '=G32', '=F32', '=E32', '=D32', '=C32', '=B22', '=A22']
    ];
  }
  if (options.addProps.isVariation[0]) {
    if (!isMinor) {
      voices[0] = ['=E51', '=D51', '=D52', '=C52', '=B42', '=B42', '=C52', '=C51', '=B41', '=C52'];
      voices[1] = ['=G41', '^F41', '=G42', '=G41','^F41', '=G42', '=G42', '=G42', '=F42', '=E42'];
    } else {
      voices[0] = ['=C51', '=B41', '=B42', '=A42', '^G42', '^G42', '=A42', '=A41', '^G41', '=A42'];
      voices[1] = ['=E41', '^D41', '=E42', '=E41','^D41', '=E42', '=E42', '=E42', '=D42', '=C42'];
    }
  }

  // Set option values
  const partLengthValue = options.addProps.partLengthValues[0];
  const partToBeginValues = options.addProps.partToBeginValues[0];
  if (options.addProps.isVariation[0]) {
    options.addProps.hasS[0] = false;
    options.addProps.partLengthValues[0] = 4;
    options.addProps.partLengthValues[2] = true;
    options.addProps.partToBeginValues[0] = 1;
    options.addProps.partToBeginValues[2] = true;
  } else {  
    options.addProps.partLengthValues[2] = partToBeginValues !== 1;
    options.addProps.partToBeginValues[2] = partLengthValue !== 4;
  }

  // Decrease voices
  let decreasedVoices = [];
  if (partLengthValue !== 4) {
    decreasedVoices = voices.map(arr => arr.slice(0, partLengthValue * 2));
  }
  if (partToBeginValues !== 1) {
    decreasedVoices = voices.map(arr => arr.slice((partToBeginValues - 1) * 2));
  }
  voices = decreasedVoices.length ? decreasedVoices : voices;

  options.addProps.hasS[1] = partLengthValue < 3 || partToBeginValues === 4 || options.addProps.isVariation[0];

  // Add S to voices
  let index;
  if (partToBeginValues === 2) {
    index = 2;
  } else if (partToBeginValues === 3) {
    index = 0;
  } else {
    index = 4;
  }
  if (options.addProps.hasS[0]) {
    if (!isMinor) {
      voices[0][index] = '=C52';
      voices[1][index] = '=A42';
    } else {
      voices[0][index] = '=A42';
      voices[1][index] = '=F42';
    }
  } 
  
  return ModelUtilities.getVoices(options, voices);
};

const Regola = {
  getDefaultOptions: getOptions,
  getVoices,
};

export default Regola;
