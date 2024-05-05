import ModelHelper from './model-helper.js';

// split a voice after a number of measure lines
function splitAtVerticalBarIndex(voice, barIndex) {
  const parts = voice.split(' | ');
  const firstPart = parts.slice(0, barIndex).join(' | ');
  const secondPart = parts.slice(barIndex).join(' | ');
  return `${firstPart}|\n${secondPart}`;
}

// creates an array with playable abc.js strings from arrays with model voices 
const getComposition = (key, measure, tempo, defaultLength, modelVoices, barsPerLine) => {

  const unsplittedVoices = modelVoices[0].map((_, index) => 
    modelVoices.reduce((combiVoice, modelVoice) => {
      return combiVoice + modelVoice[index];
    }, '')
  );
  let splittedVoices;
  if(barsPerLine) {
    splittedVoices = unsplittedVoices.map(voice => splitAtVerticalBarIndex(voice, barsPerLine));
  }
  const voices = splittedVoices ?? unsplittedVoices;

  return `${ModelHelper.meta(key, measure, tempo, defaultLength)}${ModelHelper.voice1}${voices[0]}\n${ModelHelper.voice2}${voices[1]}\n${ModelHelper.voice3}${voices[2]}`;
};

const ModelComposition = {
  abcOutput: getComposition,
};

export default ModelComposition;
