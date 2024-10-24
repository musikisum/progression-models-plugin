import ModelUtilities from './model-utilities.js';

// Provides meta informations for an abc.js header of a phrase model combination in a modelKey and a measure.
const _getMeta = (modelKey, measure, length, tempo, stretchLastLine) => {
  const metaResult = ['X:1'];
  metaResult.push('%%score [(1 2) 3]');
  metaResult.push(`%%measurenb 0${stretchLastLine ? '\n%%stretchLast 1' : ''}`);
  metaResult.push(`M:${measure}`);
  metaResult.push(`Q:1/4=${tempo}`);
  metaResult.push(`L:${length}`);
  metaResult.push(`K:${modelKey}`);
  return metaResult.join('\n');;
};

// Convert a voices collection with tone objcts in a collection with abc values 
const _convertModelVoicesToAbcVoices = (modelVoices, measureSign, invertRhythm) => {
  return modelVoices.reduce((accu, modelVoice) => {
    for (let index = 0; index < modelVoice.length; index += 1) {
      const voiceToneObjects = modelVoice[index];
      const abcSymbolsOfModelVoice = ModelUtilities.convertModelVoiceToAbcSymbols(voiceToneObjects, measureSign, invertRhythm);
      accu.push(abcSymbolsOfModelVoice);
    }
    return accu;
  }, []);
}

// Creates an array with playable abc.js strings from arrays with tone objects of model voices for editor view only
const getModelAbcOutput = (modelKey, measure, length, tempo, modelVoices) => {
  const abcResult = [_getMeta(modelKey, measure, length, tempo)];
  const voices = _convertModelVoicesToAbcVoices(modelVoices, measure);
  abcResult.push(`V:1\n${voices[0].join(' ')}`);
  abcResult.push(`V:2\n${voices[1].join(' ')}`);
  abcResult.push(`V:3 bass\n${voices[2].join(' ')}`);
  return abcResult.join('\n');
};

// Set a force flag for the first voice objects of a model voice
// (Actually inly valid for twice voiceObjects in a measure)
const _lookupAndSetForceValue = (voiceObj1, voiceObj2) => {
  const val1 = voiceObj1.fifthsValue;
  const val2 = voiceObj2.fifthsValue;
  if (val1 === val2) {
    return false;
  }
  const isGreaterThan6 = Math.abs(val1 - val2) > 6;
  // console.log('> 6:', isGreaterThan6, val1, val2)
  return isGreaterThan6 && (val1 - val2) % 7 === 0;
}

// Create the abc output from collections with tone ojects of models
const getCompositionAbcOutput = (
  modelKey, 
  measure, 
  tempo, 
  models, 
  barsPerLine, 
  stretchLastLine, 
  invertRhythm
) => {
  const defaultLength = ModelUtilities.convertMeasureSignToDefaultLength(measure);
  const abcResult = [_getMeta(modelKey, measure, defaultLength, tempo, stretchLastLine)];
  const voicesCollection = models.map((modelVoices, index, arr) => {
    if (index > 0) {
      const [cmV1, cmV2, cmV3] = modelVoices;
      const lastModelVoices = arr[index - 1];
      const [lmV1, lmV2, lmV3] = lastModelVoices;
      cmV1[0].force = _lookupAndSetForceValue(lmV1[lmV1.length - 1], cmV1[0]);
      cmV2[0].force = _lookupAndSetForceValue(lmV2[lmV2.length - 1], cmV2[0]);
      cmV3[0].force = _lookupAndSetForceValue(lmV3[lmV3.length - 1], cmV3[0]);
    }
    return modelVoices;
  });
  const combinedVoicesCollection = voicesCollection[0].map((_, colIndex) => {
    return voicesCollection.map(row => row[colIndex]).reduce((acc, curr) => acc.concat(curr), []);
  });
  const voices = _convertModelVoicesToAbcVoices([[combinedVoicesCollection[0]], [combinedVoicesCollection[1]], [combinedVoicesCollection[2]]], measure, invertRhythm);
  const [v1, v2, v3] = [[], [], []];
  voices.forEach((voice, index) => {
    const arrIndex = index % 3;
    if (arrIndex === 0) {
      v1.push(...voice);
    } else if (arrIndex === 1) {
      v2.push(...voice);
    } else {
      v3.push(...voice);
    }
  });
  const [abcV1, abcV2, abcV3] = ModelUtilities.divideVoices([v1.join(' '), v2.join(' '), v3.join(' ')], barsPerLine);
  abcResult.push(`V:1\n${abcV1}`);
  abcResult.push(`V:2\n${abcV2}`);
  abcResult.push(`V:3 bass\n${abcV3}`);
  return abcResult.join('\n');
};

const ModelComposition = {
  getModelAbcOutput,
  getCompositionAbcOutput
};

export default ModelComposition;
