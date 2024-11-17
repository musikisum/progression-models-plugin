import ModelUtilities from '../model-utilities.js';
import ModelTemplates from '../model-templates.js';

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
  const numberOfSections =  options.addProps.numberOfSections[0];
  options.addProps.endWithoutSuspension[1] = !options.addProps.syncopation[0];

  let voices;
  if (options.addProps.syncopation[0]) {
    voices = !isMinor 
      ? [
        ['=E52', '=D52', '=D52', '=C52', '=C52', '=B42', '=B42', '=A42', '=A42', '=G42'],
        ['=C52', '=C52', '=B42', '=B42', '=A42', '=A42', '=G42', '=G42', '=F42', '=F42'],
        ['=C42', '=G32', '=G32', '=A32', '=A32', '=E32', '=E32', '=F32', '=F32', '=C32']
      ]
      : [
        ['=C52', '=B42', '=B42', '=A42', '=A42', '=G42', '=G42', '=F42', '=F42', '=E42'],
        ['=A42', '=A42', '=G42', '=G42', '=F42', '=F42', '=E42', '=E42', '=D42', '=D42'],
        ['=A42', '=E42', '=E42', '=F42', '=F42', '=C42', '=C42', '=D42', '=D42', '=A32']
      ];
  } else {
    voices = !isMinor 
      ? [
        ['=E52', '=D52', '=C52', '=B42', '=A42', '=G42'],
        ['=C52', '=B42', '=A42', '=G42', '=F42', '=E42'],
        ['=C42', '=G32', '=A32', '=E32', '=F32', '=C32']
      ]
      : [
        ['=C52', '=B42', '=A42', '=G42', '=F42', '=E42'],
        ['=A42', '=G42', '=F42', '=E42', '=D42', '=C42'],
        ['=A42', '=E42', '=F42', '=C42', '=D42', '=A32']
      ];
  }
  if (options.addProps.syncopation[0] && options.addProps.endWithoutSuspension[0]) {
    switch (numberOfSections) {
      case 3:
        voices[1][9] = !isMinor ? '=E42' : '=C42';
        break;
      case 2:
        voices[1][7] = !isMinor ? '=F42' : '=D42';
        break;
      default:
        voices[1][3] = !isMinor ? '=A42' : '=F42';
        break;
    }
  }
  if (!options.addProps.syncopation[0] && options.addProps.chromatic[0]) { 
    // without suspensions
    if (!isMinor) {
      voices[2][1] = '^G32';
      voices[0][3] = '_B42';
      voices[2][5] = '^C32';
    } else {        
      voices[0][1] = '_B42';
      voices[2][3] = '^C42';
      voices[0][5] = '_E42';
    } 
  } else if (options.addProps.syncopation[0] && options.addProps.chromatic[0]) { 
    // with suspensions
    if (!isMinor) {
      voices[2][1] = '^G32';
      voices[2][2] = '^G32';
      voices[0][5] = '_B42';
      voices[0][6] = '_B42';
      voices[2][9] = '^C32';
    } else {
      voices[0][1] = '_B42';
      voices[0][2] = '_B42';
      voices[2][5] = '^C42';
      voices[2][6] = '^C42';
      voices[0][9] = '_E42';
    }
  }
  if (options.addProps.syncopation[0]) {
    voices = voices.map(arr => arr.slice(0, numberOfSections * 4));
  } else {
    voices = voices.map(arr => arr.slice(0, numberOfSections * 2));
  }
  return ModelUtilities.getVoices(options, voices);
};

const ParallismusDown = {
  getDefaultOptions: getOptions,
  getVoices
};

export default ParallismusDown;