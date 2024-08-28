// Provides meta informations for an abc.js header of a phrase model combination in a key and a measure.
const meta = (key, measure, tempo, length, stretchLast) => {
  const test = stretchLast ? '\n%%stretchlast 1' : '';
  return `X:1\n%%score [(1 2) 3]\n%%measurenb 0${test}\nM:${measure}\nQ:${tempo}\nL:${length}\nK:${key}\n`;
};

// split a voice after a number of measure lines
function splitAtVerticalBarIndex(voice, barIndex) {
  const chunks = [];
  const parts = voice.split(' | ');
  for (let i = 0; i < parts.length; i += barIndex) {
    chunks.push(parts.slice(i, i + barIndex).join(' | '));
  }
  return `${chunks.join(' |\n')  } |`;
}

// creates an array with playable abc.js strings from arrays with model voices 
const getComposition = (key, measure, tempo, defaultLength, modelVoices, barsPerLine, stretchLast) => {

  const unsplittetVoices = modelVoices[0].map((_, index) => 
    modelVoices.reduce((combiVoice, modelVoice) => {
      return combiVoice + modelVoice[index];
    }, '')
  );
  let splittetVoices;
  if(barsPerLine) {
    splittetVoices = unsplittetVoices.map(voice => splitAtVerticalBarIndex(voice, barsPerLine));
  }
  const voices = splittetVoices ?? unsplittetVoices;
  // Mit Regex noch 2 halbe Noten gegen eine Ganze austauschen:
  return `${meta(key, measure, tempo, defaultLength, stretchLast)}V:1\n${voices[0]}\nV:2\n${voices[1]}\nV:3 bass\n${voices[2]}`;
};

const ModelComposition = {
  abcOutput: getComposition,
};

export default ModelComposition;
