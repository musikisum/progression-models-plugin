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

const convertModelVoicesToAbcVoices = modelVoices => {
  return modelVoices.reduce((accu, modelVoice) => {
    for (let index = 0; index < modelVoice.length; index += 1) {
      const voiceToneObjects = modelVoice[index];
      const abcSymbolsOfModelVoice = ModelUtilities.convertModelVoiceToAbcSymbols(voiceToneObjects);
      accu.push(abcSymbolsOfModelVoice);
    }
    return accu;
  }, []);
}

// creates an array with playable abc.js strings from arrays with model voices 
const getModelAbcOutput = (modelKey, measure, tempo, modelVoices) => {
  const abcResult = [getMeta(modelKey, measure, tempo)];
  const voices = convertModelVoicesToAbcVoices(modelVoices);
  abcResult.push(`V:1\n${voices[0].join(' ')}`);
  abcResult.push(`V:2\n${voices[1].join(' ')}`);
  abcResult.push(`V:3 bass\n${voices[2].join(' ')}`);
  return abcResult.join('\n');
};

const lookupAndSetForceValue = (voiceObj1, voiceObj2) => {
  const numer1 = Math.abs(voiceObj1.fifthsValue);
  const numer2 = Math.abs(voiceObj2.fifthsValue);
  return !((numer1 + numer2) % 7 === 0);
}

const getCompositionAbcOutput = (modelKey, measure, tempo, modelVoices, barsPerLine, stretchLastLine) => {
  const abcResult = [getMeta(modelKey, measure, tempo)];
  const voices = convertModelVoicesToAbcVoices(modelVoices);
  let v1 = '';
  let v2 = '';
  let v3 = '';
  voices.map((voice, index) => {
    const arrIndex = index % 3;
    if (arrIndex === 0) {
      v1 += ` ${voice.join(' ')}`;
    } else if (arrIndex === 1) {
      v2 += ` ${voice.join(' ')}`;
    } else {
      v3 += ` ${voice.join(' ')}`;
    }
  });
  abcResult.push(`V:1\n${v1.trim()}`);
  abcResult.push(`V:2\n${v2.trim()}`);
  abcResult.push(`V:3 bass\n${v3.trim()}`);
  return abcResult.join('\n');
  // Set force flag for beginning voice objects of a model voice 
  // let modelVoices = voicesOjects.map((voiceObj, index, voiceObjArr) =>{
  //   if (index > 0) {
  //     const lastVoiceObj = voiceObjArr[index - 1];
  //     const forcesFlag0 = lookupAndSetForceValue(lastVoiceObj[0], voiceObj[0]);
  //     voiceObj[0].force = forcesFlag0;
  //     const forcesFlag1 = lookupAndSetForceValue(lastVoiceObj[1], voiceObj[1]);
  //     voiceObj[1].force = forcesFlag1;
  //     const forcesFlag2 = lookupAndSetForceValue(lastVoiceObj[2], voiceObj[2]);
  //     voiceObj[2].force = forcesFlag2;
  //   }
  //   return voiceObj;
  // });
  // console.log('modelVoices:', modelVoices)
  // const abcVoices = [[], [], []]
  // const allAbcVoices = convertModelVoicesToAbcVoices(voicesOjects);
  // for (let index = 0; index < allAbcVoices.length; index += 1) {
  //   const arrIndex = index % 3; 
  //   abcVoice[arrIndex] = ` ${allAbcVoices[index]}`;
  // }
  // const abcResult = [getMeta(modelKey, measure, tempo, stretchLastLine)];
  // abcResult.push(`V:1\n${abcVoices[0].trim()}`);
  // abcResult.push(`V:2\n${abcVoices[1].trimm()}`);
  // abcResult.push(`V:3 bass\n${abcVoices[2].trimm()}`);
  // return abcResult;
}

const ModelComposition = {
  getModelAbcOutput,
  getCompositionAbcOutput
};

export default ModelComposition;
