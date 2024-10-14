import ModelUtilities from './model-utilities.js';

// Provides meta informations for an abc.js header of a phrase model combination in a modelKey and a measure.
const _getMeta = (modelKey, measure, tempo, stretchLastLine) => {
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

// Convert a voices collection with tone objcts in a collection with abc values 
const _convertModelVoicesToAbcVoices = modelVoices => {
  return modelVoices.reduce((accu, modelVoice) => {
    for (let index = 0; index < modelVoice.length; index += 1) {
      const voiceToneObjects = modelVoice[index];
      const abcSymbolsOfModelVoice = ModelUtilities.convertModelVoiceToAbcSymbols(voiceToneObjects);
      accu.push(abcSymbolsOfModelVoice);
    }
    return accu;
  }, []);
}

// Creates an array with playable abc.js strings from arrays with tone objects of model voices
const getModelAbcOutput = (modelKey, measure, tempo, modelVoices) => {
  const abcResult = [_getMeta(modelKey, measure, tempo)];
  const voices = _convertModelVoicesToAbcVoices(modelVoices);
  abcResult.push(`V:1\n${voices[0].join(' ')}`);
  abcResult.push(`V:2\n${voices[1].join(' ')}`);
  abcResult.push(`V:3 bass\n${voices[2].join(' ')}`);
  return abcResult.join('\n');
};

// Set a force flag for the first voice objects of a model voice 
const _lookupAndSetForceValue = (voiceObj1, voiceObj2) => {
  const numer1 = Math.abs(voiceObj1.fifthsValue);
  const numer2 = Math.abs(voiceObj2.fifthsValue);
  return voiceObj1.fifthsValue !== voiceObj2.fifthsValue && 
  (Math.abs(voiceObj1.fifthsValue) + Math.abs(voiceObj2.fifthsValue)) % 7 === 0;
}

// Create the abc output from collections with tone ojects of models
const getCompositionAbcOutput = (modelKey, measure, tempo, models, barsPerLine, stretchLastLine) => {
  const abcResult = [_getMeta(modelKey, measure, tempo)];
  // Hier erst alle Modells verbinden und dann redundante Vorzeichen entfernen (dann dürfte die Lookup-Methode redundant sein)
  let voicesCollection = models.map((modelVoices, index, arr) => {
    const [cmV1, cmV2, cmV3] = modelVoices;
    if (index > 0) {
      const lastModelVoices = arr[index - 1];
      const [lmV1, lmV2, lmV3] = lastModelVoices;
      cmV1[0].force = _lookupAndSetForceValue(lmV1[lmV1.length - 1], cmV1[0]);
      cmV2[0].force = _lookupAndSetForceValue(lmV2[lmV2.length - 1], cmV2[0]);
      cmV3[0].force = _lookupAndSetForceValue(lmV3[lmV3.length - 1], cmV3[0]);
    }
    return modelVoices;
  });
  const voices = _convertModelVoicesToAbcVoices(voicesCollection);
  let [v1, v2, v3] = [[], [], []];
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
  abcResult.push(`V:1\n${v1.join(' ')}`);
  abcResult.push(`V:2\n${v2.join(' ')}`);
  abcResult.push(`V:3 bass\n${v3.join(' ')}`);
  return abcResult.join('\n');
}

const ModelComposition = {
  getModelAbcOutput,
  getCompositionAbcOutput
};

export default ModelComposition;
