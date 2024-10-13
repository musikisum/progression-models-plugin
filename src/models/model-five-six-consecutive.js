import ModelUtilities from '../model-utilities.js';
import ModelTemplates from '../model-templates.js';

function getModelKeys() {
  return ['E', 'A', 'D', 'G', 'C', 'F', 'Bb', 'Eb', 'Ab'];
}

const getOptions = change => {
  const modelTemplate = ModelTemplates.getModelTemplate('fiveSixConsecutive');
  if(change) {
    modelTemplate.modelKey = change;
  }
  return modelTemplate;
};

const getVoices = modelOptions => {
  const options = modelOptions ?? getOptions();
  let voices = [
    ['=G42', '=G42', '=A42', '=A42', '=B42', '=B42', '=C52', '=C52', '=D52', '=D52', '=E52', '=E52'],
    ['=D42', '=E42', '=E42', '=F42', '^F42', '=G42', '=G42', '=A42', '=A42', '=B42', '=B42', '=C52'],
    ['=B32', '=C42', '^C42', '=D42', '^D42', '=E42', '=E42', '=F42', '^F42', '=G42', '^G42', '=A42']
   ]
  if (options.addProps['diatonic'][0]) {
    voices[1][4] = '=F42';
    voices[2] = voices[2].map(symbol => symbol.replace('^', '='));
  }
  const partLengthValue = options.addProps['partLengthValues'][0];
  if (partLengthValue !== 6) {
    voices = voices.map(arr => arr.slice(0, partLengthValue * 2));
  }
  const partToBeginValues = options.addProps['partToBeginValues'][0]
  if (partToBeginValues !== 1) {
    voices = voices.map(arr => arr.slice((partToBeginValues - 1) * 2));
  }
  return ModelUtilities.getVoices(options, voices);
};

const _adjustMutetVoices = (voices, hideUpperSystem, hideLowerSystem) => {
  return ModelUtilities.convertToEmptyLines(voices, hideUpperSystem, hideLowerSystem);
}

const FiveSixConsecutive = {
  getDefaultOptions: getOptions,
  getVoices,
  getModelKeys,
  getMutedVoices: (voices, hideUpperSystem, hideLowerSystem) => _adjustMutetVoices(voices, hideUpperSystem, hideLowerSystem)
};

export default FiveSixConsecutive;