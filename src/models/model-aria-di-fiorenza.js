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
      ['=D42', '=E42', '=E42', '=E42', '=E42', '=D42', '=D42', '=C42', '=E42', '=D42', '=D42', '=E42'],
      ['=B32', '=C42', '=C42', '=C42', '=C42', '=C42', '=B32', '=C42', '=C42', '=C42', '=B32', '=C42'],
      ['=G32', '=C42', '=B32', '=A32', '=E32', '=F32', '=G32', '=A32', '=E32', '=F32', '=G32', '=C32']
    ];
  } else {
    voices = [
      ['=B32', '=C42', '=C42', '=C42', '=C42', '=B32', '=B32', '=A32', '=C42', '=B32', '=B32', '=C42'],
      ['^G32', '=A32', '=A32', '=A32', '=A32', '=A32', '^G32', '=A32', '=A32', '=A32', '^G32', '=A32'],
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
    voices[voiceIndex][voiceLength - 1] = !isMinor ? '=C42' : '=A32';
  }
  if (isVariation && isTwice) {
    voices[0].splice(voices[0].length - 4, 4, ...['=C42', '=C42', '=B32', '=C42']);
    voices[1].splice(voices[1].length - 4, 4, ...['=E32', '=D32', '=D32', '=E32']);
    voices[1].splice(-1, 1, isFinal ? '=C32' : '=E32');
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