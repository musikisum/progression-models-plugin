import ModelUtilities from '../model-utilities.js';
import ModelTemplates from '../model-templates.js';

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
  ];
  if (options.addProps.diatonic[0]) {
    voices[1][4] = '=F42';
    voices[2] = voices[2].map(symbol => symbol.replace('^', '='));
    options.addProps.withRootNotes[1] = true;
  } else {
    options.addProps.withRootNotes[1] = false;
  }
  if (!options.addProps.diatonic[0] && options.addProps.withRootNotes[0]) {
    voices[0][1] = '=C52';
    voices[0][3] = '=D52';
    voices[0][5] = '=E52';
    voices[0][7] = '=F52';
    voices[0][9] = '=G52';
    voices[0][11] = '=A52';
  }

  const partLengthValue = options.addProps.partLengthValues[0];
  const partToBeginValues = options.addProps.partToBeginValues[0];
  options.addProps.partLengthValues[2] = partToBeginValues !== 1;
  options.addProps.partToBeginValues[2] = partLengthValue !== 6;

  let decreasedVoices = [];
  if (partLengthValue !== 6) {
    decreasedVoices = voices.map(arr => arr.slice(0, partLengthValue * 2));
  }
  if (partToBeginValues !== 1) {
    decreasedVoices = voices.map(arr => arr.slice((partToBeginValues - 1) * 2));
  }
  voices = decreasedVoices.length ? decreasedVoices : voices;

  return ModelUtilities.getVoices(options, voices);
};

const FiveSixConsecutive = {
  getDefaultOptions: getOptions,
  getVoices
};

export default FiveSixConsecutive;