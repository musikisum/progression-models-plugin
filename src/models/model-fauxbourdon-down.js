import ModelUtilities from '../model-utilities.js';
import ModelTemplates from '../model-templates.js';

function getModelKeys() {
  return ['E', 'C#m', 'A', 'F#m', 'D', 'Bm', 'G', 'Em', 'C', 'Am', 'F', 'Dm', 'Bb', 'Gm', 'Eb', 'Cm', 'Ab', 'Fm'];
}

const getOptions = change => {
  const modelTemplate = ModelTemplates.getModelTemplate('fauxbourdon');
  if(change) {
    modelTemplate.modelKey = change;
  }
  return modelTemplate;
};

function _AdjustOptions(options) {
  switch(options.addProps.numberOfSections[0]) {
    case 1: 
      if(options.addProps.syncopation[0]) { // with syncopations
        options.voices = [[5, 5, 4, 4], [9, 8, 8, 7], [7, 6, 6, 5]];
        options.measure = [' | ', ' ', ' | ', ' '];
        options.voicesLength = 4;
      } else { // without syncopations
        options.voices = [[5, 4], [9, 8], [7, 6]];
        options.measure = [' | ', ' '];
        options.voicesLength = 2;
      }
      break;
    case 2:
      if(options.addProps.syncopation[0]) { // with syncopations
        options.voices = [[5, 5, 4, 4, 3, 3, 2, 2], [9, 8, 8, 7, 7, 6, 6, 5], [7, 6, 6, 5, 5, 4, 4, 3]];
        options.measure = [' | ', ' ', ' | ', ' ', ' | ', ' ', ' | ', ' '];
        options.voicesLength = 8;
      } else { // without syncopations
        options.voices = [[5, 4, 3, 2], [9, 8, 7, 6], [7, 6, 5, 4]]; 
        options.measure = [' | ', ' ', ' | ', ' '];
        options.voicesLength = 4;
      }      
      break;
    default:
      if(options.addProps.syncopation[0]) { // with syncopations
        options.voices = [[5, 5, 4, 4, 3, 3, 2, 2, 1, 1], [9, 8, 8, 7, 7, 6, 6, 5, 5, 4], [7, 6, 6, 5, 5, 4, 4, 3, 3, 2]];
        options.measure = [' | ', ' ', ' | ', ' ', ' | ', ' ', ' | ', ' ', ' | ', ' '];
        options.voicesLength = 10;
      } else { // without syncopations
        options.voices = [[5, 4, 3, 2, 1, 0], [9, 8, 7, 6, 5, 4], [7, 6, 5, 4, 3, 2]];
        options.measure = [' | ', ' ', ' | ', ' ', ' | ', ' '];
        options.voicesLength = 6;
      }      
      break;
  }
}

function _AdjustLamento(options) {
  options.voices = [[5, 5, 4, 4, 3, 3, 2, 1], [9, 8, 8, 7, 7, 6, 7, 6], [7, 6, 6, 5, 5, 4, 3, 4]];
  options.measure = [' | ', ' ', ' | ', ' ', ' | ', ' ', ' | ', ' '];
  options.voicesLength = 8;
}

const getVoices = fauxbourdonOptions => {
  const options = fauxbourdonOptions || getOptions();
  const isMinor = options.modelKey.includes('m');
  let voices;
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
    options.addProps.partLengthValues[2] = true;
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

const _adjustMutetVoices = (voices, hideUpperSystem, hideLowerSystem) => {
  return ModelUtilities.convertToEmptyLines(voices, hideUpperSystem, hideLowerSystem);
};

const Fauxbourdon = {
  getDefaultOptions: getOptions,
  getVoices,
  getModelKeys,
  getMutedVoices: (voices, hideUpperSystem, hideLowerSystem) => _adjustMutetVoices(voices, hideUpperSystem, hideLowerSystem)
};

export default Fauxbourdon;
