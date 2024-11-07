import ModelUtilities from '../model-utilities.js';
import ModelTemplates from '../model-templates.js';

const getOptions = change => {
  const modelTemplate = ModelTemplates.getModelTemplate('circleOfFifths');
  if(change) {
    modelTemplate.modelKey = change;
  }
  return modelTemplate;
};

const getVoices = circleOfFifthsOptions => {
  const options = circleOfFifthsOptions ?? getOptions();
  const isMinor = options.modelKey.includes('m');
  let voices;
  if (!isMinor) {
    voices = [
      ['=G42', '=A42', '=A42', '=G42', '=G42', '=F42', '=F42', '=E42'],
      ['=E42', '=E42', '=D42', '=D42', '=C42', '=C42', '=B32', '=B32'],
      ['=C32', '=F32', '=B22', '=E32', '=A22', '=D32', '=G22', '=C32']
    ];
  } else {
    voices = [
      ['=E42', '=F42', '=F42', '=E42', '=E42', '=D42', '=D42', '=C42'],
      ['=C42', '=C42', '=B32', '=B32', '=A32', '=A32', '=G32:f', '=G32'],
      ['=A22', '=D32', '=G22', '=C32', '=F22', '=B22', '=E22', '=A22']
    ];
  }
  if (options.addProps.bassReverse[0]) {
    voices[2] = !isMinor 
      ? ['=C32', '=F22', '=B22', '=E22', '=A22', '=D22', '=G22', '=C22']
      : ['=A22', '=D22', '=G22', '=C22', '=F22', '=B12', '=E22', '=A12'];
  }

  const partLengthValue = options.addProps.partLengthValues[0];
  const partToBeginValues = options.addProps.partToBeginValues[0];
  options.addProps.partLengthValues[2] = partToBeginValues !== 1;
  options.addProps.partToBeginValues[2] = partLengthValue !== 4;

  if (options.addProps.endWithoutSuspension[0]) {
    switch (partLengthValue) {
      case 4:
        if (!isMinor) {
          voices[1][7] = '=C42';
        } else {
          voices[1][6] = '^G32';
          voices[1][7] = '=A32';
        }
        break;
      case 3:
        voices[1][5] = !isMinor ? '=D42' : '=B32';
        break;
      case 2:
        voices[1][3] = !isMinor ? '=E42' : '=C42';
        break;
      default:
        voices[1][1] = !isMinor ? '=F42' : '=D42';
        break;
    }
  }

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

const CircleOfFifths = {
  getDefaultOptions: getOptions,
  getVoices,
};

export default CircleOfFifths;
