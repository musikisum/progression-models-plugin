import ModelUtilities from '../model-utilities.js';
import ModelTemplates from '../model-templates.js';

const getOptions = change => {
  const modelTemplate = ModelTemplates.getModelTemplate('circleOfFifthsUp');
  if(change) {
    modelTemplate.modelKey = change;
  }
  return modelTemplate;
};

const getVoices = circleOfFifthsOptionsUp => {
  const options = circleOfFifthsOptionsUp ?? getOptions();
  let voices;
  if(options.addProps.syncopation[0]) {
    voices = [
      ['=E42', '=D42', '=G42', '=G42', '=F42', '=E42', '=A42', '=A42'],
      ['=C42', '=C42', '=B32', '=A32', '=D42', '=D42', '=C42', '=B32'],
      ['=C32', '=G32', '=G32', '=D32', '=D32', '=A32', '=A32', '=E32']
    ];
    options.addProps.partLengthValues[2] = false;
    options.addProps.endWithoutSuspension[1] = false;
    options.addProps.endWithMajorChord[1] = false;
    options.addProps.endWithMajorChord[1] = !options.addProps.endWithoutSuspension[0];
  } else {
    voices = [
      ['=E42', '=D42', '=F42', '=E42'],
      ['=C42', '=B32', '=D42', '=C42'],
      ['=C32', '=G32', '=D32', '=A32']
    ];
    options.addProps.partLengthValues[2] = true;
    options.addProps.endWithoutSuspension[1] = true;
    options.addProps.endWithMajorChord[1] = true;
  }
  const partLengthValue = options.addProps.partLengthValues[0];
  if (partLengthValue !== 4) {
    voices = voices.map(arr => arr.slice(0, partLengthValue * 2));    
  }
  if (partLengthValue === 1) {
    options.addProps.endWithMajorChord[1] = true;
  }
  if (options.addProps.endWithoutSuspension[0] && options.addProps.syncopation[0]) {
    switch (partLengthValue) {
      case 3:
        voices[1][voices[1].length - 1] = options.addProps.endWithMajorChord[0] ? '^C42' : '=C42';
        break;  
      case 2:
        voices[0][voices[0].length - 1] = options.addProps.endWithMajorChord[0] ? '^F42' : '=F42'
        break; 
      case 1:
        voices[1][voices[1].length - 1] = '=B32';
        break;    
      default:
        voices[0][voices[0].length - 1] = options.addProps.endWithMajorChord[0] ? '^G42' : '=G42';
        break;
    }
  }
  return ModelUtilities.getVoices(options, voices);
};

const CircleOfFifthsUp = {
  getDefaultOptions: getOptions,
  getVoices,
};

export default CircleOfFifthsUp;
