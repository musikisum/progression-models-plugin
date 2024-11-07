import ModelUtilities from '../model-utilities.js';
import ModelTemplates from '../model-templates.js';

const getOptions = change => {
  const modelTemplate = ModelTemplates.getModelTemplate('parallelismUp');
  if(change) {
    modelTemplate.modelKey = change;
  }
  return modelTemplate;
};

const _adjustDisabled = (isMinor, numberOfSections, chromatic, syncopation, endWithoutSuspension) => {
  endWithoutSuspension[1] = !syncopation[0];
  // eslint-disable-next-line no-return-assign
  const setChromatic = value => chromatic[1] = value;
  if (!isMinor) {
    switch (numberOfSections) {
      case 3:
      case 2:
        setChromatic(false);
        break;
      default:
        setChromatic(true);
        chromatic[0] = false;
        break;
    }
  } else {
    switch (numberOfSections) {
      case 3:     
        setChromatic(false);
        break;
      default:
        setChromatic(true);
        chromatic[0] = false;
        break;
    }
  }
};

const getVoices = parallelismUpOptions => {
  const options = parallelismUpOptions || getOptions();
  const isMinor = options.modelKey.includes('m');
  let voices;
  if (options.addProps.syncopation[0]) {
    voices = !isMinor 
      ? [
        ['=E42', '=A42', '=A42', '=A42', '=G42', '=C52', '=C52', '=C52', '=B42', '=E52'],
        ['=G32', '=G32', '=F32', '=B32', '=B32', '=B32', '=A32', '=D42', '=D42', '=D42'],
        ['=C32', '=F32', '=F32', '=E32', '=E32', '=A32', '=A32', '=G32', '=G32', '=C42']
      ]
      : [
        ['=C42', '=F42', '=F42', '=F42', '=E42', '=A42', '=A42', '=A42', '=G42', '=C52'],
        ['=E32', '=E32', '=D32', '=G32', '=G32', '=G32', '=F32', '=B32', '=B32', '=B32'],
        ['=A22', '=D32', '=D32', '=C32', '=C32', '=F32', '=F32', '=E32', '=E32', '=A32']
      ];
  } else {
    voices = !isMinor 
      ? [
        ['=E42', '=F42', '=G42', '=A42', '=B42', '=C52'],
        ['=G32', '=A32', '=B32', '=C42', '=D42', '=E42'],
        ['=C32', '=F32', '=E32', '=A32', '=G32', '=C42']
      ]
      : [
        ['=C42', '=D42', '=E42', '=F42', '=G42', '=A42'],
        ['=E32', '=F32', '=G32', '=A32', '=B32', '=C42'],
        ['=A22', '=D32', '=C32', '=F32', '=E32', '=A32']
      ];
  }

  const numberOfSections =  options.addProps.numberOfSections[0];
  _adjustDisabled(isMinor, numberOfSections, options.addProps.chromatic, options.addProps.syncopation, options.addProps.endWithoutSuspension);

  if (options.addProps.chromatic[0] && !options.addProps.syncopation[0]) {
    const indexShift = isMinor ? 2 : 0;
    voices[0][1 + indexShift] = '=F42:f';
    voices[0][2 + indexShift] = '^G42:f';
  }
  if (options.addProps.chromatic[0] && options.addProps.syncopation[0]) {
    const index = isMinor ? 8 : 4;
    voices[0][index] = '^G42:f';
  }
  if (numberOfSections !== 3) {
    if (options.addProps.syncopation[0]) {
      voices = voices.map(arr => arr.slice(0, (numberOfSections * 4) - 2));
    } else {
      voices = voices.map(arr => arr.slice(0, numberOfSections * 2));
    }
  }
  if (options.addProps.syncopation[0] && options.addProps.endWithoutSuspension[0]) {
    switch (numberOfSections) {
      case 3:
        voices[1][9] = !isMinor ? '=C42' : '=A32';
        break;
      case 2:
        voices[1][5] = !isMinor ? '=A32' : '=F32';
        break;
      case 1:
        voices[1][1] = !isMinor ? '=F32' : '=D32';
        break;
      default:
        break;
    }
  }

  return ModelUtilities.getVoices(options, voices);
};

const ParallismusUp = {
  getDefaultOptions: getOptions,
  getVoices
};

export default ParallismusUp;