import ModelHelper from "./model-helper.js";

// creates an array with playable abc.js strings from arrays with model voices 
const getComposition = (key, measure, tempo, defaultLength, modelVoices, barsPerLine) => {

  const unsplittetVoices = modelVoices[0].map((_, index) => 
    modelVoices.reduce((combiVoice, modelVoice) => {
      return combiVoice + modelVoice[index]
    }, '')
  );
  let splittetVoices = undefined;
  if(barsPerLine) {
    splittetVoices = unsplittetVoices.map(voice => splitAtVerticalBarIndex(voice, barsPerLine));
  }
  const voices = splittetVoices ?? unsplittetVoices;

  return `${ModelHelper.meta(key, measure, tempo, defaultLength)}V:1\n${voices[0]}\nV:2\n${voices[1]}\nV:3 bass\n${voices[2]}`;
};

// split a voice after a number of measure lines
function splitAtVerticalBarIndex(voice, barIndex) {
  const parts = voice.split(' | ');
  const firstPart = parts.slice(0, barIndex).join(' | ');
  const secondPart = parts.slice(barIndex).join(' | ');
  return `${firstPart}|\n${secondPart}`;
}

const ModelComposition = {
  abcOutput: getComposition,
};

export default ModelComposition;
