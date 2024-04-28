const diatonicScale = ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'c', 'd', 'e', 'f', 'g', 'a', 'b'];

// eslint-disable-next-line no-warning-comments
//TODO: This funktion transpose only a single tone an not a model. It's a problem?
const transpose = function (number, tone) {
  switch (number) {
    case -3:
      return `${tone},,,`;
    case -2:
      return `${tone},,`;
    case -1:
      return `${tone},`;      
    case 1:
      return `${tone}'`;  
    case 2:
      return `${tone}''`;  
    case 3:
      return `${tone}'''`;
    default:
      return tone;
  }
};

const validate = index => {
  let value = '';
  let diatonicIndex = index;
  if (diatonicIndex < 0) {
    do {
      value += ',';
      diatonicIndex += 7;
    } while (diatonicIndex < 0);      
  }
  if (diatonicIndex > 13) {
    do {
      value += '\'';
      diatonicIndex -= 7;
    } while (diatonicIndex <= 13);
  }
  const result = `${diatonicScale[diatonicIndex]}${value}`;
  return result;
};

const getMeta = key => {
  return `X:1\n%%score [(1 2) 3]\nM:C\nL:1/2\nK:${key}\n`;
};

const ModelHelper = {
  meta: getMeta,
  transposeOctave: transpose,
  validateValue: validate,
  voice1: 'V:1\n',
  voice2: 'V:2\n',
  voice3: 'V:3 bass\n'
};

export default ModelHelper;