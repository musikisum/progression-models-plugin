import ModelUtilities from '../model-utilities.js';
import ModelTemplates from '../model-templates.js';

function getModelKeys() {
  return ['E','C#m', 'A', 'F#m', 'D', 'Bm', 'G', 'Em', 'C', 'Am', 'F', 'Dm', 'Bb', 'Gm', 'Eb', 'Cm', 'Ab', 'Fm'];
}

const getOptions = change => {
  const modelTemplate = ModelTemplates.getModelTemplate('circleOfFifthsLinear');
  if(change) {
    modelTemplate.modelKey = change;
  }
  return modelTemplate;
};

const getVoices = fifthsCircleLinearOptions => {
  const options = fifthsCircleLinearOptions ?? getOptions();
  const isMinor = options.modelKey.includes('m');
  options.addProps.lastBassNoteUp[1] = options.addProps.partLengthValues[0] !== 4;
  let voices;
  if (!isMinor) {
    voices = [
      ['=G42', '=F42', '=F42', '=E42', '=E42', '=D42', '=D42', '=E42'],
      ['=E42', '=E42', '=D42', '=D42', '=C42', '=C42', '=B32', '=B32'],
      ['=C42', '=A32', '=B32', '=G32', '=A32', '=F32', '=G32', '=C32']
    ];
  } else {
    voices = [
      ['=E52', '=D52', '=D52', '=C52', '=C52', '=B42', '=B42', '=C52'],
      ['=C52', '=C52', '=B42', '=B42', '=A42', '=A42', '=G42:f', '=G42'],
      ['=A32', '=F32', '=G32', '=E32', '=F32', '=D32', '=E32', '=A22']
    ];
  }

  const partLengthValue = options.addProps.partLengthValues[0];

  if (options.addProps.endWithoutSuspension[0]) {
    switch (partLengthValue) {
      case 4:
        if (!isMinor) {
          voices[1][7] = '=C42';
        } else {
          voices[1][6] = '^G42';
          voices[1][7] = '=A42';
        }
        break;
      case 3:
        voices[1][5] = !isMinor ? '=D42' : '=B42';
        break;
      case 2:
        voices[1][3] = !isMinor ? '=E42' : '=C52';
        break;
      default:
        voices[1][1] = !isMinor ? '=F42' : '=D52';
        break;
    }
  }

  if (options.addProps.lastBassNoteUp[0]) {
    const signArr = voices[2][voices[2].length - 1].split('');
    signArr.splice(2, 1, '3');
    voices[2][voices[2].length - 1] = signArr.join('');
  }
  if (partLengthValue !== 4) {
    voices = voices.map(arr => arr.slice(0, partLengthValue * 2));    
  }
  const partToBeginValues = options.addProps.partToBeginValues[0];
  if (partToBeginValues !== 1) {
    voices = voices.map(arr => arr.slice((partToBeginValues - 1) * 2));
  }
  return ModelUtilities.getVoices(options, voices);
};

const CircleOfFifthsLinear = {
  getDefaultOptions: getOptions,
  getVoices,
  getModelKeys
};

export default CircleOfFifthsLinear;