import ModelUtilities from '../model-utilities.js';
import ModelTemplates from '../model-templates.js';

const getOptions = change => {
  const modelTemplate = ModelTemplates.getModelTemplate('fauxbourdon');
  if(change) {
    modelTemplate.modelKey = change;
  }
  return modelTemplate;
};

const getVoices = fauxbourdonOptions => {
  const options = fauxbourdonOptions || getOptions();
  const isMinor = options.modelKey.includes('m');
  let voices;

  if  (options.addProps.chromaticBass[0]) {
    options.addProps.syncopation[0] = true;
    options.addProps.syncopation[1] = true;
    options.addProps.partLengthValues[1] = 5;
  }
  if (!options.addProps.syncopation[0]) {
    options.addProps.partLengthValues[0] = options.addProps.partLengthValues[0] > 3 ? 3 : options.addProps.partLengthValues[0];
    options.addProps.partLengthValues[1] = 3;
  }

  if (options.addProps.syncopation[0]) {
    options.addProps.partLengthValues[2] = false;
    voices = !isMinor 
      ? [
        ['=A42', '=A42', '=G42', '=G42', '=F42', '=F42', '=E42', '=E42', '=D42', '=C42'],
        ['=E42', '=D42', '=D42', '=C42', '=C42', '=B32', '=B32', '=A32', '=A32', '=G32'],
        ['=C42', '=B32', '=B32', '=A32', '=A32', '=G32', '=G32', '=F32', '=F32', '=E32']
      ]
      : [
        ['=F42', '=F42', '=E42', '=E42', '=D42', '=D42', '=C42', '=C42', '=B32', '=A32'],
        ['=C42', '=B32', '=B32', '=A32', '=A32', '=G32', '=G32', '=F32', '=F32', '=E32'],
        ['=A32', '=G32', '=G32', '=F32', '=F32', '=E32', '=E32', '=D32', '=D32', '=C32']
      ];
  }

  if (options.addProps.chromaticBass[0]) {
    options.addProps.syncopation = [true, true];
    if (!isMinor) {
      voices[1] = ['=E42', '^D42:f', '=D42:f', '^C42:f', '=C42:f', '=B32:f', '=B32', '^A32:f', '=A32:f', '=G32'];
      voices[2] = ['=C42', '=B32:f', '_B32:f', '=A32:f', '_A32:f', '=G32:f', '=G32:F', '^F32:f', '=F32:f', '=E32'];
    } else {
      voices[1] = ['=C42', '=B32:f', '_B32:f', '=A32:f', '_A32:f', '=G32:f', '=G32:f', '^F32:f', '=F32:f', '=E32'];
      voices[2] = ['=A32', '^G32:f', '=G32:f', '^F32:f', '=F32:f', '=E32:f', '=E32:f', '^D32:f', '=D32:f', '=C32'];
    }    
  } else {    
    options.addProps.syncopation[1] = false;
  }

  if (!options.addProps.syncopation[0]) {
    voices = !isMinor
      ? [
        ['=G42', '=G42', '=F42', '=E42', '=D42', '=C42'],
        ['=E42', '=D42', '=C42', '=B32', '=A32', '=G32'],
        ['=C42', '=B32', '=A32', '=G32', '=F32', '=E32']
      ]
      : [
        ['=E42', '=E42', '=D42', '=C42', '=B32', '=A32'],
        ['=C42', '=B32', '=A32', '=G32', '=F32', '=E32'],
        ['=A32', '=G32', '=F32', '=E32', '=D32', '=C32']
      ];
  }
  if (options.addProps.partLengthValues[0] !== 5) {
    voices = voices.map(arr => arr.slice(0, options.addProps.partLengthValues[0] * 2));
  }

  return ModelUtilities.getVoices(options, voices);
};

const Fauxbourdon = {
  getDefaultOptions: getOptions,
  getVoices
};

export default Fauxbourdon;
