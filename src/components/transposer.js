import { transposeABC, INTERVALS } from 'abc-notation-transposition';
 
const transpose = (abcNotation, transpositionValue) => {
  let transposedPlayableABC = null;
  let trInSemitones;
  switch (transpositionValue) {
    case 3:
      trInSemitones = -3;
      break;
    case 2:
      trInSemitones = 2;
      break;
    case 1:
      trInSemitones = 7;
      break;
    case -1:
      trInSemitones = 5;
      break;
    case -2:
      trInSemitones = -2;
      break;
    case -3:
      trInSemitones = 3;
      break;
    default:
      trInSemitones = 0;
      break;
  }
  try {
    transposedPlayableABC = transposeABC(abcNotation, trInSemitones);
  } catch(error) {
    console.log(error.message);
  }   
  return transposedPlayableABC ?? abcNotation;
}

const Transposer = {
  getTransposition: (abc, transpositionValue) => transpose(abc, transpositionValue)
};

export default Transposer;