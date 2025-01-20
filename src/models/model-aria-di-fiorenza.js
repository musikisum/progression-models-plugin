import ModelUtilities from '../model-utilities.js';
import ModelTemplates from '../model-templates.js';

const getOptions = change => {
  const modelTemplate = ModelTemplates.getModelTemplate('ariaDiFiorenza');
  if(change) {
    modelTemplate.modelKey = change;
  }
  return modelTemplate;
};

const voicesFactory = (short, isMinor, isFinal, isVariation) => {
  let voicesArr;
  if (!short && !isMinor) {
    voicesArr = [
      ['=D52', '=E52', '=E52', '=E52', '=E52', '=D52', '=D52', '=C52', '=E52', '=D52', '=D52', '=E52'],
      ['=B42', '=C52', '=C52', '=C52', '=C52', '=C52', '=B42', '=C52', '=C52', '=C52', '=B42', '=C52'],
      ['=G32', '=C42', '=B32', '=A32', '=E32', '=F32', '=G32', '=A32', '=E32', '=F32', '=G32', '=C32']
    ];
    if (isVariation) {
      voicesArr[0][2] = '=G52';
      voicesArr[1][2] = '=D52';
      voicesArr[1].splice(8, 4, ...['=E42', '=D42', '=D42', '=E42']);
      voicesArr[0].splice(8, 4, ...['=C52', '=C52', '=B42', '=C52']);
      voicesArr[1][11] = isFinal ? '=C42' : '=E42';
    } else {
      voicesArr[0][11] = isFinal ? '=C52' : '=E52';
    }    
  }
  if (!short && isMinor) {
    voicesArr = [
      ['=B42', '=C52', '=C52', '=C52', '=C52', '=B42', '=B42', '=A42', '=C52', '=B42', '=B42', '=C52'],
      ['^G42', '=A42', '=A42', '=A42', '=A42', '=A42', '^G42', '=A42', '=A42', '=A42', '^G42', '=A42'],
      ['=E32', '=A32', '=G32', '=F32', '=C32', '=D32', '=E32', '=F32', '=C32', '=D32', '=E32', '=A22']
    ];
    if (isVariation) {
      voicesArr[0][2] = '=E52';
      voicesArr[1][2] = '=B42';
      voicesArr[1].splice(8, 4, ...['=C42', '=B32', '=B32', '=C42']);
      voicesArr[0].splice(8, 4, ...['=A42', '=A42', '^G42', '=A42']);
      voicesArr[1][11] = isFinal ? '=A32' : '=C42';
    } else {
      voicesArr[0][11] = isFinal ? '=A42' : '=C52';
    }    
  } 
  if (short && !isMinor) {
    voicesArr = [
      ['=D52', '=E52', '=E52', '=E52', '=E52', '=D52', '=D52', '=E52'],
      ['=B42', '=C52', '=C52', '=C52', '=C52', '=C52', '=B42', '=C52'],
      ['=G32', '=C42', '=B32', '=A32', '=E32', '=F32', '=G32', '=C32']
    ];
    voicesArr[0][2] = isVariation ? '=G52' : '=E52';
    voicesArr[1][2] = isVariation ? '=D52' : '=C52';
    voicesArr[0][7] = isFinal ? '=C52' : '=E52';
  } 
  if (short && isMinor) {
    voicesArr = [
      ['=B42', '=C52', '=C52', '=C52', '=C52', '=B42', '=B42', '=C52'],
      ['^G42', '=A42', '=A42', '=A42', '=A42', '=A42', '^G42', '=A42'],
      ['=E32', '=A32', '=G32', '=F32', '=C32', '=D32', '=E32', '=A22']
    ];
    voicesArr[0][2] = isVariation ? '=E52' : '=C52';
    voicesArr[1][2] = isVariation ? '=B42' : '=A42';
    voicesArr[0][7] = isFinal ? '=A42' : '=C52';
  }
  return voicesArr;
};

const getVoices = ariaDiFiorenzaOptions => {
  const options = ariaDiFiorenzaOptions ?? getOptions();
  const isMinor = options.modelKey.includes('m');
  const short = options.addProps.short[0];
  const isFinal = options.addProps.isFinal[0];
  const isVariation = options.addProps.isVariation[0];
  const voices = voicesFactory(short, isMinor, isFinal, isVariation);

  return ModelUtilities.getVoices(options, voices);
};

const AriaDiFiorenza = {
  getDefaultOptions: getOptions,
  getVoices
};

export default AriaDiFiorenza;