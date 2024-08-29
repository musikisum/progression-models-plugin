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

// Provides meta informations for an abc.js header of a phrase model combination in a key and a measure.
const getMeta = (key, measure, tempo, stretchLast) => {
  const metaResult = ['X:1'];
  metaResult.push('%%score [(1 2) 3]');
  metaResult.push(`%%measurenb 0${stretchLast ? '\n%%stretchlast 1' : ''}`);
  metaResult.push(`M:${measure}`);
  metaResult.push(`L:${getGefaultLength(measure)}`);
  metaResult.push(`Q:1/4=${tempo}`);
  metaResult.push(`L:${length}`);
  metaResult.push(`K:${key}`);
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
const getComposition = (key, measure, tempo, modelVoices, barsPerLine, stretchLast) => {
  const unsplittetVoices = modelVoices[0].map((_, index) => 
    modelVoices.reduce((combiVoice, modelVoice) => {
      return combiVoice + modelVoice[index];
    }, '')
  );
  let splittetVoices;
  if(barsPerLine) {
    barsPerLine = measure !== 'C' ? barsPerLine : barsPerLine * 2;
    splittetVoices = unsplittetVoices.map(voice => splitAtVerticalBarIndex(voice, barsPerLine));
  }
  const voices = splittetVoices ?? unsplittetVoices;
  const abcResult = [getMeta(key, measure, tempo, stretchLast)];
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
