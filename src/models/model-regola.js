import ModelUtilities from '../model-utilities.js';
import ModelTemplates from '../model-templates.js';

const getOptions = change => {
  const modelTemplate = ModelTemplates.getModelTemplate('regola');
  if(change) {
    modelTemplate.modelKey = change;
  }
  return modelTemplate;
};

const voicesFactory = (isupwards, isMinor, isVariation) => {
  let voices;
  if (isupwards && !isMinor) {
    voices = [
      ['=E52', '=F52', '=G52', '=A52', '=G52', '=F52', '=G52', '=E52'],
      ['=C52', '=B42', '=C52', '=C52', '=B42', '=C52', '=D52', '=C52'],
      ['=C32', '=D32', '=E32', '=F32', '=G32', '=A32', '=B32', '=C42']
    ];
    if (isVariation) {
      voices[0] = ['=C52', '=B42', '=C52', '=D52', '=B42', '=C52', '=D52', '=C52'];
      voices[1] = ['=E42', '=F42', '=G42', '=A42', '=G42', '^F42', '=F42', '=E42'];
    }
  }
  if (isupwards && isMinor) {  
    voices = [
      ['=C52', '=D52', '=E52', '=F52', '=E52', '=D52', '=E52', '=C52'],
      ['=A42', '^G42', '=A42', '=A42', '^G42', '=A42', '=B42', '=A42'],
      ['=A22', '=B22', '=C32', '=D32', '=E32', '^F32', '^G32', '=A32']
    ];
    if (isVariation) {
      voices[0] = ['=A42', '^G42', '=A42', '=B42', '^G42', '=A42', '=B42', '=A42'];
      voices[1] = ['=C42', '=D42', '=E42', '=F42', '=E42', '=D42', '=D42', '=C42'];
    }
  }
  if (!isupwards && !isMinor) {
    voices = [
      ['=E52', '=G52', '^F52', '=G52', '=G52', '=G52', '=F52', '=E52'],
      ['=C52', '=D52', '=C52', '=B42', '=B42', '=C52', '=B42', '=C52'],
      ['=C42', '=B32', '=A32', '=G32', '=F32', '=E32', '=D32', '=C32']
    ];
    if (isVariation) {
      voices[0] = ['=E52', '=D52', '=C52', '=B42', '=C52', '=C52', '=B42', '=C52'];
      voices[1] = ['=G42', '=G42', '^F42', '=G42', '=A42', '=G42', '=F42', '=E42'];
    }
  } 
  if (!isupwards && isMinor) {    
    voices = [
      ['=C52', '=E52', '=D52', '=E52', '=E52', '=E52', '=D52', '=C52'],
      ['=A42', '=B42', '=A42', '^G42', '^G42', '=A42', '^G42', '=A42'],
      ['=A32', '=G32', '=F32', '=E32', '=D32', '=C32', '=B22', '=A22']
    ];
    if (isVariation) {
      voices[0] = ['=E52', '=E52', '=D52', '=B42', '=B42', '=E52', '=D52', '=C52'];
      voices[1] = ['=C52', '=B42', '=A42', '^G42', '^G42', '=A42', '^G42', '=A42'];
    }
  }
  return voices;
};

const getVoices = regolaOptions => {
  const options = regolaOptions ?? getOptions();
  const isMinor = options.modelKey.includes('m');
  const isUpwards = options.addProps.isUpwards[0];
  const isVariation = options.addProps.isVariation[0];

  let voices = voicesFactory(isUpwards, isMinor, isVariation);

  // Set option values
  const partLengthValue = options.addProps.partLengthValues[0];
  const partToBeginValues = options.addProps.partToBeginValues[0];
  options.addProps.partLengthValues[2] = partToBeginValues !== 1;
  options.addProps.partToBeginValues[2] = partLengthValue !== 4;

  // Control voices length
  let decreasedVoices = [];
  if (partLengthValue !== 4) {
    decreasedVoices = voices.map(arr => arr.slice(0, partLengthValue * 2));
  }
  if (partToBeginValues !== 1) {
    decreasedVoices = voices.map(arr => arr.slice((partToBeginValues - 1) * 2));
  }

  if (partToBeginValues === 4 && isMinor) {
    options.addProps.isVariation[1] = true;
  } else {
    options.addProps.isVariation[1] = false;
  }  

  voices = decreasedVoices.length ? decreasedVoices : voices;
  
  return ModelUtilities.getVoices(options, voices);
};

const Regola = {
  getDefaultOptions: getOptions,
  getVoices,
};

export default Regola;
