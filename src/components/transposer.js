import { transposeABC, INTERVALS } from 'abc-notation-transposition';

const transpose = (abcNotation, halftones) => {
  let transposedAbcNotation = null;
  try {
    transposedAbcNotation = transposeABC(abcNotation, halftones);
  } catch(error) {
    console.log(error.message);
  }   
  return transposedAbcNotation ?? abcNotation;
}

export default transpose;