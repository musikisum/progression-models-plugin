import ModelUtilities from '../model-utilities.js';
import ModelTemplates from '../model-templates.js';

function getModelKeys() {
  return ['E', 'G#m', 'A', 'F#m', 'D', 'Bm', 'G', 'Em', 'C', 'Am', 'F', 'Dm', 'B', 'Gm', 'Eb'];
}

const getOptions = change => {
  const modelTemplate = ModelTemplates.getModelTemplate('parallelismDiminuated');
  if(change) {
    modelTemplate.modelKey = change;
  }
  return modelTemplate;
};

const getVoices = upperFifthModulationOptions => {
  const options = upperFifthModulationOptions || getOptions();
  const isMinor = options.modelKey.includes('m');
  let voices;
  if (!isMinor) {
    voices = [
      ['=G42', '=F42', '=F42', '=E42', '=E42', '=D42', '=D42', '=C42', '=C42', '_B32', '_B32', '=A32', '=A32', '=G32', '=G32', '=F32'],
      ['=E42', '=E42', '=D42', '=D42', '=C42', '=C42', '=B32', '=B32', '=A32', '=A32', '=G32', '=G32', '=F32', '=F32', '=E32', '=E32'],
      ['=C42', '=A32', '=B32', '=C42', '=E32', '^F32', '^G32', '=A32', '=C32', '=D32', '=E32', '=F32', '=A22', '=B22:f', '^C32', '=D32']
    ];
  } else {
    voices = [
      ['=E52', '=D52', '=D52', '=C52', '=C52', '_B42', '_B42', '=A42', '=A42', '=G42', '=G42', '=F42', '=F42', '_E42', '_E42', '=D42'],
      ['=C52', '=C52', '=B42', '=B42', '=A42', '=A42', '=G42', '=G42', '=F42', '=F42', '=E42', '=E42', '=D42', '=D42', '=C42', '=C42'],
      ['=A32', '^F32', '^G32', '=A32', '=C32', '=D32', '=E32', '=F32', '=A22', '=B22:f', '^C32', '=D32', '=F22', '=G22', '=A22', '_B22']
    ];
  }
  const numberOfSections = options.addProps.numberOfSections[0];

  if (options.addProps.endWithoutSuspension[0]) {
    switch (numberOfSections) {
      case 4:
        voices[1][15] = !isMinor ? '=D32' : '_B32';
        break;
      case 3:
        voices[1][11] = !isMinor ? '=F32' : '=D42';
        break;
      case 2:
        voices[1][7] = !isMinor ? '=A32' : '=F42';
        break;
      default:
        voices[1][3] = !isMinor ? '=C42' : '=A42';
        break;
    }
  }

  voices = voices.map(arr => arr.slice(0, numberOfSections * 4));
  if (!options.addProps.confirmation[0]) {
    voices = voices.map(arr => arr.slice(4));
  }
  
  return ModelUtilities.getVoices(options, voices);
};

const ParallelismDiminuated = {
  getDefaultOptions: getOptions,
  getVoices,
  getModelKeys
};
  
export default ParallelismDiminuated;