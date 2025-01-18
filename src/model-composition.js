import ModelUtilities from './model-utilities.js';
import AbcVoiceFactory from './abc-voice-factory.js';

// Provides meta informations for an abc.js header of a phrase model combination in a modelKey and a measure.
const _getMeta = (modelKey, measure, length, tempo, stretchLastLine) => {
  const metaResult = ['X:1'];
  metaResult.push('%%score [(1 2) 3]');
  metaResult.push(`%%measurenb 0${stretchLastLine ? '\n%%stretchLast 1' : ''}`);
  if(!(measure === '1/1')) {
    metaResult.push(`M:${measure}`);
  }
  metaResult.push(`Q:1/4=${tempo}`);
  metaResult.push(`L:${length}`);
  metaResult.push(`K:${modelKey}`);
  return metaResult.join('\n');;
};

// Convert a voices collection with tone objcts in a collection with abc values 
const _convertModelVoicesToAbcVoices = (modelVoices, measureSign, invertRhythm, hideUpperSystem, hideLowerSystem) => {
  return modelVoices.reduce((accu, modelVoice, modelIndex) => {
    for (let index = 0; index < modelVoice.length; index += 1) {
      const hideSystem = (hideUpperSystem && modelIndex < 2) || (hideLowerSystem && modelIndex === 2) || (hideUpperSystem && hideLowerSystem);
      const abcVoice = new AbcVoiceFactory(modelVoice[index], measureSign, invertRhythm, hideSystem);
      const abcSymbolsOfModelVoice = abcVoice.getAbcMeasures(); 
      accu.push(abcSymbolsOfModelVoice);
    }
    return accu;
  }, []);
};

// Create the abc output from collections with tone ojects of models for display view
const getCompositionAbcOutput = (
  modelKey, 
  measure, 
  tempo, 
  models, 
  barsPerLine, 
  stretchLastLine, 
  invertRhythm,
  hideUpperSystem, 
  hideLowerSystem,
  withTies
) => {
  const defaultLength = ModelUtilities.convertMeasureSignToDefaultLength(measure);
  const abcResult = [_getMeta(modelKey, measure, defaultLength, tempo, stretchLastLine)];
  const combinedVoicesCollection = models[0].map((_, colIndex) => {
    return models.map(row => row[colIndex]).reduce((acc, curr) => acc.concat(curr), []);
  });
  const voices = _convertModelVoicesToAbcVoices([[combinedVoicesCollection[0]], [combinedVoicesCollection[1]], [combinedVoicesCollection[2]]], measure, invertRhythm, hideUpperSystem, hideLowerSystem);

  // ---------- Block to manipulate abc measures --------------
  let [voice1, voice2, voice3] = voices.map(voice => ModelUtilities.splitVoiceAbcInMeasures(voice));
  [voice1, voice2] = ModelUtilities.addCrossVoicesSaftySigns(voice1, voice2);
  if (withTies) {
    voice1 = ModelUtilities.replaceDoubleValues(voice1);
    voice2 = ModelUtilities.replaceDoubleValues(voice2);
    voice3 = ModelUtilities.replaceDoubleValues(voice3);    
  }
  voice1 = ModelUtilities.removeRedundantSigns(voice1);
  voice2 = ModelUtilities.removeRedundantSigns(voice2);
  voice3 = ModelUtilities.removeRedundantSigns(voice3); 
  [voices[0], voices[1], voices[2]] = [voice1, voice2, voice3].map(voice => ModelUtilities.combineAbcMeasuresToVoice(voice));
  // ---------- End block to manipulate abc measures --------------

  const [abcV1, abcV2, abcV3] = ModelUtilities.divideVoices([voices[0].join(' '), voices[1].join(' '), voices[2].join(' ')], barsPerLine);
  abcResult.push(`V:1\n${AbcVoiceFactory.removeSingelNoteNotations(abcV1)}`);
  abcResult.push(`V:2\n${AbcVoiceFactory.removeSingelNoteNotations(abcV2)}`);
  abcResult.push(`V:3 bass\n${AbcVoiceFactory.removeSingelNoteNotations(abcV3)}`);
  return abcResult.join('\n');
};

// Creates an array with playable abc.js strings from arrays with tone objects of model voices for editor view only
const getModelAbcOutput = (modelKey, measure, length, tempo, modelVoices) => {
  const abcResult = [_getMeta(modelKey, measure, length, tempo)];
  const voices = _convertModelVoicesToAbcVoices(modelVoices, measure);
  abcResult.push(`V:1\n${voices[0].join(' ')}`);
  abcResult.push(`V:2\n${voices[1].join(' ')}`);
  abcResult.push(`V:3 bass\n${voices[2].join(' ')}`);
  return abcResult.join('\n');
};

const ModelComposition = {
  getModelAbcOutput,
  getCompositionAbcOutput
};

export default ModelComposition;
