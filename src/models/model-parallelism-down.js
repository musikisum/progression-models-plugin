import ModelUtilities from '../model-utilities.js';
import ModelTemplates from '../model-templates.js';

function getModelKeys() {
  return ['E', 'C#m', 'A', 'F#m', 'D', 'Bm', 'G', 'Em', 'C', 'Am', 'F', 'Dm', 'Bb', 'Gm', 'Eb', 'Cm', 'Ab', 'Fm'];
}

const getOptions = change => {
  const modelTemplate = ModelTemplates.getModelTemplate('parallelismDown');
  if(change) {
    modelTemplate.modelKey = change;
  }
  return modelTemplate;
};

const getVoices = parallelismDownOptions => {
  const options = parallelismDownOptions || getOptions();
  const isMinor = options.modelKey.includes('m');

  let voices;
  if (options.addProps.syncopation[0]) {
    voices = !isMinor 
      ? [
        ['=C52', '=C52', '=B42', '=B42', '=A42', '=A42', '=G42', '=G42', '=F42', '=E42'],
        ['=E42', '=D42', '=D42', '=C42', '=C42', '=B32', '=B32', '=A32', '=A32', '=G32'],
        ['=C42', '=G32', '=G32', '=A32', '=A32', '=E32', '=E32', '=F32', '=F32', '=C32']
      ]
      : [
        ['=A42', '=A42', '=G42', '=G42', '=F42', '=F42', '=E42', '=E42', '=D42', '=C42'],
        ['=C42', '=B32', '=B32', '=A32', '=A32', '=G32', '=G32', '=F32', '=F32', '=E32'],
        ['=A32', '=E32', '=E32', '=F32', '=F32', '=C32', '=C32', '=D32', '=D32', '=A22']
      ];
  } else {
    voices = !isMinor 
      ? [
        ['=C52', '=B42', '=A42', '=G42', '=F42', '=E42'],
        ['=E42', '=D42', '=C42', '=B32', '=A32', '=G32'],
        ['=C42', '=G32', '=A32', '=E32', '=F32', '=C32']
      ]
      : [
        ['=A42', '=G42', '=F42', '=E42', '=D42', '=C42'],
        ['=C42', '=B32', '=A32', '=G32', '=F32', '=E32'],
        ['=A32', '=E32', '=F32', '=C32', '=D32', '=A22']
      ];
  }

  const numberOfSections =  options.addProps.numberOfSections[0];
  if (numberOfSections !== 5) {
    if (options.addProps.syncopation[0]) {
      voices = voices.map(arr => arr.slice(0, numberOfSections * 2));
    } else {
      voices = numberOfSections < 3 ? voices.map(arr => arr.slice(0, numberOfSections * 2)) : voices;
    }
    if (options.addProps.syncopation[0]) {
      switch (numberOfSections) {
        case 4:
          voices[0][7] = !isMinor ? '=F42' : '=D42';
          break;
        case 3:
          voices[0][5] = !isMinor ? '=G42' : '=E42';
          break;
        case 2:
          voices[0][3] = !isMinor ? '=A42' : '=F42';
          break;
        default:
          voices[0][1] = !isMinor ? '=B42' : '=G42';
          break;
      }
    }
  }  

  return ModelUtilities.getVoices(options, voices);
};

const _adjustMutetVoices = (voices, hideUpperSystem, hideLowerSystem) => {
  return ModelUtilities.convertToEmptyLines(voices, hideUpperSystem, hideLowerSystem);
};

const ParallismusDown = {
  getDefaultOptions: getOptions,
  getVoices,
  getModelKeys,
  getMutedVoices: (voices, hideUpperSystem, hideLowerSystem) => _adjustMutetVoices(voices, hideUpperSystem, hideLowerSystem)
};

export default ParallismusDown;