import ModelUtilities from '../model-utilities.js';
import ModelTemplates from '../model-templates.js';

const getOptions = change => {
  const modelTemplate = ModelTemplates.getModelTemplate('ariaDiFiorenza');
  if(change) {
    modelTemplate.modelKey = change;
  }
  return modelTemplate;
};

const getVoices = ariaDiFiorenzaOptions => {
  const options = ariaDiFiorenzaOptions ?? getOptions();
  const isMinor = options.modelKey.includes('m');
  let voices;
  if (!isMinor) {
    voices = [
      ['=D52', '=E52', '=E52', '=E52', '=E52', '=D52', '=D52', '=C52', '=E52', '=D52', '=D52', '=E52'],
      ['=B42', '=C52', '=C52', '=C52', '=C52', '=C52', '=B42', '=C52', '=C52', '=C52', '=B42', '=C52'],
      ['=G32', '=C42', '=B32', '=A32', '=E32', '=F32', '=G32', '=A32', '=E32', '=F32', '=G32', '=C32']
    ];
  } else {
    voices = [
      ['=B42', '=C52', '=C52', '=C52', '=C52', '=B42', '=B42', '=A42', '=C52', '=B42', '=B42', '=C52'],
      ['^G42', '=A42', '=A42', '=A42', '=A42', '=A42', '^G42', '=A42', '=A42', '=A42', '^G42', '=A42'],
      ['=E32', '=A32', '=G32', '=F32', '=C32', '=D32', '=E32', '=F32', '=C32', '=D32', '=E32', '=A22']
    ];
  }
  const isFinal = options.addProps.isFinal[0];
  const isTwice = options.addProps.isTwice[0];
  if (!isTwice) {
    options.addProps.isVariation[0] = false;
    options.addProps.isVariation[1] = true;
  } else {  
    options.addProps.isVariation[1] = false;
  }
  const isVariation = options.addProps.isVariation[0];
  if(isFinal) {
    const voiceLength = voices[0].length;
    const voiceIndex = isVariation && isTwice ? 1 : 0;
    voices[voiceIndex][voiceLength - 1] = !isMinor ? '=C52' : '=A42';
  }
  if (isVariation && isTwice) {
    if (!isMinor) {
      voices[0] = ['=D52', '=E52', '=G52', '=E52', '=E52', '=D52', '=D52', '=C52', '=C52', '=C52', '=B42', '=C52'];
      voices[1] = ['=B42', '=C52', '=D52', '=C52', '=C52', '=C52', '=B42', '=C52', '=E42', '=D42', '=D42', '=E42'];
      voices[1].splice(-1, 1, isFinal ? '=C42' : '=E42');
    } else {
      voices[0] = ['=B42', '=C52', '=E52', '=C52', '=C52', '=B42', '=B42', '=A42', '=A42', '=A42', '^G42', '=A42'];
      voices[1] =  ['^G42', '=A42', '=B42', '=A42', '=A42', '=A42', '^G42', '=A42', '=C42', '=B32', '=B32', '=C42'];
      voices[1].splice(-1, 1, isFinal ? '=A32' : '=C42');
    }
  }
  if (!isTwice) {
    voices.forEach(voice => voice.splice(6, 4));
  }
  return ModelUtilities.getVoices(options, voices);
};

const AriaDiFiorenza = {
  getDefaultOptions: getOptions,
  getVoices
};

export default AriaDiFiorenza;