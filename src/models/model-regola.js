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
      ['=C52', '=B42', '=C52', '=C52', '=B42', '=C52', '=D52', '=C52'],
      ['=E42', '=F42', '=G42', '=A42', '=G42', '=F42', '=F42', '=E42'],
      ['=C32', '=D32', '=E32', '=F32', '=G32', '=A32', '=B32', '=C42']
    ];
    if (isVariation) {
      voices[0][3] = '=D52';
      voices[1][5] = '^F42';
      voices[1][6] = '=F42:f';
    }
  }
  if (isupwards && isMinor) {  
    voices = [
      ['=A42', '^G42', '=A42', '=A42', '^G42', '=A42', '=B42', '=A42'],
      ['=C42', '=D42', '=E42', '=F42', '=E42', '=D42', '=D42', '=C42'],
      ['=A22', '=B22', '=C32', '=D32', '=E32', '^F32', '^G32', '=A32']
    ];
    if (isVariation) {
      voices[0][3] = '=B42';
    }
  }
  if (!isupwards && !isMinor) {
    voices = [
      ['=E52', '=D52', '=C52', '=B42', '=B42', '=C52', '=B42', '=C52'],
      ['=G42', '=G42', '^F42', '=G42', '=G42', '=G42', '=F42', '=E42'],
      ['=C42', '=B32', '=A32', '=G32', '=F32', '=E32', '=D32', '=C32']
    ];
    if (isVariation) {
      voices[0][4] = '=C52';
      voices[0][4] = '=A42';
    }
  } 
  if (!isupwards && isMinor) {    
    voices = [
      ['=C52', '=B42', '=A42', '^G42', '^G42', '=A42', '^G42', '=A42'],
      ['=E42', '=B32', '=D42', '=E42', '=E42', '=E42', '=D42', '=C42'],
      ['=A32', '=G32', '=F32', '=E32', '=D32', '=C32', '=B22', '=A22']
    ];
    if (isVariation) {
      voices[1][1] = '=E42';
      voices[1][2] = '^D42';
      voices[2][2] = '=F32:f';
      voices[0][4] = '=A42';
      voices[1][4] = '=F42';
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

  // Decrease voices
  let decreasedVoices = [];
  if (partLengthValue !== 4) {
    decreasedVoices = voices.map(arr => arr.slice(0, partLengthValue * 2));
  }
  if (partToBeginValues !== 1) {
    decreasedVoices = voices.map(arr => arr.slice((partToBeginValues - 1) * 2));
  }
  voices = decreasedVoices.length ? decreasedVoices : voices;
  
  return ModelUtilities.getVoices(options, voices);
};

const Regola = {
  getDefaultOptions: getOptions,
  getVoices,
};

export default Regola;
