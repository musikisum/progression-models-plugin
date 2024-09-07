// Provide default lengts for measure value
const getGefaultLength = measure => {
  switch (measure) {
    case 'C|':
      return '1/2';  
    case 'C':
      return '1/4'; 
    case '2/4':
      return '1/4';  
    default:
      return '1/2';
  }
}

function removeEverySecondPipe(voice) {
  return voice.replace(/\|/g, 
    (match, offset, string) => { return (string.slice(0, offset).match(/\|/g) || []).length % 2 === 0 ? match : ''; }
  );
}

// Provides meta informations for an abc.js header of a phrase model combination in a modelKey and a measure.
const getMeta = (modelKey, measure, tempo, stretchLastLine) => {
  const metaResult = ['X:1'];
  metaResult.push('%%score [(1 2) 3]');
  metaResult.push(`%%measurenb 0${stretchLastLine ? '\n%%stretchLast 1' : ''}`);
  metaResult.push(`M:${measure}`);
  metaResult.push(`L:${getGefaultLength(measure)}`);
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

const createEmpyLines = (voices, hideUpperSystem, hideLowerSystem, emptyNoteSystems) => {
  const result = voices[2].split(/[| ]+/).filter(entry => entry !== '');    
  const newV1Arr = [];
  const newV2Arr = [];
  const newV3Arr = [];
  for (let index = 0; index < result.length; index += 1) {
    if (index % 2 === 0) {
      if (hideUpperSystem || emptyNoteSystems) {
        newV1Arr.push('x');
        newV1Arr.push(' | ');
        newV2Arr.push('x');
        newV2Arr.push(' | ');        
      }
      if (hideLowerSystem) {
        newV3Arr.push('x');
        newV3Arr.push(' | '); 
      }
    } else {
      if (hideUpperSystem || emptyNoteSystems) {
        newV1Arr.push('x');
        newV1Arr.push(' ');
        newV2Arr.push('x');
        newV2Arr.push(' ');        
      }
      if (hideLowerSystem) {
        newV3Arr.push('x');
        newV3Arr.push(' ');
      }
    }   
  }
  if (hideUpperSystem || emptyNoteSystems) {
    voices[0] = newV1Arr.join();    
    voices[1] = newV2Arr.join();
  }
  if (hideLowerSystem || emptyNoteSystems) {
    voices[2] = newV2Arr.join();    
  }
  return voices;
}

// creates an array with playable abc.js strings from arrays with model voices 
const getComposition = (modelKey, measure, tempo, modelVoices, barsPerLine, stretchLastLine) => {
  createEmpyLines(modelVoices[0], true, true);
  const unsplittetVoices = modelVoices[0].map((_, index) => 
    modelVoices.reduce((combiVoice, modelVoice) => {
      return combiVoice + modelVoice[index];
    }, '')
  );
  let splittetVoices; let number;
  if(barsPerLine) {
    number = measure !== 'C' ? barsPerLine : barsPerLine * 2;
    splittetVoices = unsplittetVoices.map(voice => splitAtVerticalBarIndex(voice, number));
  }
  const voices = splittetVoices ?? unsplittetVoices;
  const abcResult = [getMeta(modelKey, measure, tempo, stretchLastLine)];
  if (measure === 'C') {
    voices[0] = removeEverySecondPipe(voices[0]);
    voices[1] = removeEverySecondPipe(voices[1]);
    voices[2] = removeEverySecondPipe(voices[2]);
  }
  abcResult.push(`V:1\n${voices[0]}`);
  abcResult.push(`V:2\n${voices[1]}`);
  abcResult.push(`V:3 bass\n${voices[2]}`);
  return abcResult.join('\n');
};

const ModelComposition = {
  abcOutput: getComposition
};

export default ModelComposition;
