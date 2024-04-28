import ModelHelper from "./model-helper.js";

const getComposition = (voices, barsPerLine) => {
  //TODO: Hier noch eine Teilung der Stimmen über die Anzahl der Takte Implementieren
  return `${ModelHelper.meta('C')}${ModelHelper.voice1}${voices[0]}\n${ModelHelper.voice2}${voices[1]}\n${ModelHelper.voice3}${voices[2]}`;
};

const voicesAddition = (result, newVoices) => {
  const threeVoices = 3;
  if (result.length !== threeVoices || newVoices.length !== threeVoices) {
    return result;
  }
  for (let index = 0; index < 3; index += 1) {
    result[index] += ` ${newVoices[index]}`;
  }
  return result;
};

const ModelComposition = {
  abcOutput: getComposition,
  addVoice: voicesAddition
};

export default ModelComposition;

