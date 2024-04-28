/* eslint-disable quote-props */
const numberToName = ['_C,,,', 'C,,,', '^C,,,', '_D,,,', 'D,,,', '^D,,,', '_E,,,', 'E,,,', '^E,,,', '_F,,,', 'F,,,', '^F,,,', '_G,,,', 'G,,,', '^G,,,', '_A,,,', 'A,,,', '^A,,,', '_B,,,', 'B,,,', '^B,,,', '_C,,', 'C,,', '^C,,', '_D,,', 'D,,', '^D,,', '_E,,', 'E,,', '^E,,', '_F,,', 'F,,', '^F,,', '_G,,', 'G,,', '^G,,', '_A,,', 'A,,', '^A,,', '_B,,', 'B,,', '^B,,', '_C,', 'C,', '^C,', '_D,', 'D,', '^D,', '_E,', 'E,', '^E,', '_F,', 'F,', '^F,', '_G,', 'G,', '^G,', '_A,', 'A,', '^A,', '_B,', 'B,', '^B,', '_C', 'C', '^C', '_D', 'D', '^D', '_E', 'E', '^E', '_F', 'F', '^F', '_G', 'G', '^G', '_A', 'A', '^A', '_B', 'B', '^B', '_c', 'c', '^c', '_d', 'd', '^d', '_e', 'e', '^e', '_f', 'f', '^f', '_g', 'g', '^g', '_a', 'a', '^a', '_b', 'b', '^b', '_c\'', 'c\'', '^c\'', '_d\'', 'd\'', '^d\'', '_e\'', 'e\'', '^e\'', '_f\'', 'f\'', '^f\'', '_g\'', 'g\'', '^g\'', '_a\'', 'a\'', '^a\'', '_b\'', 'b\'', '^b\'', '_c\'\'', 'c\'\'', '^c\'\'', '_d\'\'', 'd\'\'', '^d\'\'', '_e\'\'', 'e\'\'', '^e\'\'', '_f\'\'', 'f\'\'', '^f\'\'', '_g\'\'', 'g\'\'', '^g\'\'', '_a\'\'', 'a\'\'', '^a\'\'', '_b\'\'', 'b\'\'', '^b\'', '_c\'\'\'', 'c\'\'\'', '^c\'\'\'', '_d\'\'\'', 'd\'\'\'', '^d\'\'\'', '_e\'\'\'', 'e\'\'\'', '^e\'\'\'', '_f\'\'\'', 'f\'\'\'', '^f\'\'\'', '_g\'\'\'', 'g\'\'\'', '^g\'\'\'', '_a\'\'\'', 'a\'\'\'', '^a\'\'\'', '_b\'\'\'', 'b\'\'\'', '^b\'\'\'', '_c\'\'\'\'', 'c\'\'\'\''];

const rhythmValues = ['2', '4'];

const transposeToneName = (transposeValue, abcVoiceCode) => {
  const undefinedValues = [];
  const valuesPairs = [];
  const parts = abcVoiceCode.split(' ').filter(part => part.trim() !== '');
  const newArr = parts.map(value => {
    if(value === '|') {
      return value;
    }
    const number = value[value.length-1];
    const numberValue = rhythmValues.includes(number) ? number : '';
    let toneName = value;
    if(numberValue) {
      toneName = value.slice(0, value.length-1);
    }
    let modifiedTransposeValue = 0;
    if ((toneName.toLowerCase().indexOf('b') >= 0 || toneName.toLowerCase().indexOf('e') >= 0) && transposeValue !== 0) {
      modifiedTransposeValue = transposeValue + 1;
    } else {
      modifiedTransposeValue = transposeValue;
    }
    const toneNameIndex = numberToName.indexOf(toneName);
    if (toneNameIndex < 0) {
      undefinedValues.push(value);
    }
    const convertedToneName = numberToName[toneNameIndex + modifiedTransposeValue];
    valuesPairs.push([value, convertedToneName + numberValue]);
    return convertedToneName + numberValue;
  });
  // console.log('undefiend Values', undefinedValues);
  console.log(valuesPairs);
  return newArr.join(' ');
};

export default transposeToneName;
