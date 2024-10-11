import ModelUtilities from './model-utilities.js';

// Provides meta informations for an abc.js header of a phrase model combination in a modelKey and a measure.
const getMeta = (modelKey, measure, tempo, stretchLastLine) => {
  const metaResult = ['X:1'];
  metaResult.push('%%score [(1 2) 3]');
  metaResult.push(`%%measurenb 0${stretchLastLine ? '\n%%stretchLast 1' : ''}`);
  metaResult.push(`M:${measure}`);
  metaResult.push('L:1/4');
  metaResult.push(`Q:1/4=${tempo}`);
  metaResult.push(`L:${length}`);
  metaResult.push(`K:${modelKey}`);
  return metaResult.join('\n');;
};

// split a voice after a number of measure lines
const splitAtVerticalBarIndex = (voice, barIndex) => {
  const chunks = [];
  const parts = voice.split(' | ');
  for (let i = 0; i < parts.length; i += barIndex) {
    chunks.push(parts.slice(i, i + barIndex).join(' | '));
  }
  return `${chunks.join(' |\n')  } |`;
}

// creates an array with playable abc.js strings from arrays with model voices 
const getModelAbcOutput = (modelKey, measure, tempo, modelVoices) => {
  const abcResult = [getMeta(modelKey, measure, tempo)];
  const voices = modelVoices.reduce((accu, modelVoice) => {
    for (let index = 0; index < modelVoice.length; index += 1) {
      const voiceToneObjects = modelVoice[index];
      const abcSymbolsOfModelVoice = ModelUtilities.convertModelVoiceToAbcSymbols(voiceToneObjects);
      accu.push(abcSymbolsOfModelVoice);
    }
    return accu;
  }, []);
  abcResult.push(`V:1\n${voices[0].join(' ')}`);
  abcResult.push(`V:2\n${voices[1].join(' ')}`);
  abcResult.push(`V:3 bass\n${voices[2].join(' ')}`);
  return abcResult.join('\n');
};

const getCompositionAbcOutput = (modelKey, measure, tempo, modelsVoices, barsPerLine, stretchLastLine) => {
  const abcResult = [getMeta(modelKey, measure, tempo, stretchLastLine)];
  //TODO: hier Modelle zusammensetzen und den Fehler beheben, da die Models 
  // noch nicht als string sondern als Arrays von Zeichen vorliegen
  voices = [[''], [''], ['']];
  abcResult.push(`V:1\n${voices[0].join(' ')}`);
  abcResult.push(`V:2\n${voices[1].join(' ')}`);
  abcResult.push(`V:3 bass\n${voices[2].join(' ')}`);
  return abcResult;
}

const ModelComposition = {
  getModelAbcOutput,
  getCompositionAbcOutput
};

export default ModelComposition;
