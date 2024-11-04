export default class AbcVoiceFactory {

  constructor(modelVoiceObj, measureSign, invertRhythm, hideSystem) {
    this.voice = modelVoiceObj;
    this._initializeProperties(measureSign);
    this.invertRhythm = !!invertRhythm;
    this.hideSystem = !!hideSystem;
    this.measures = this._createMeasures();
  }

  // Initialisize defaultValue, startValue and measureLength (1/4 in C| and 1/8 in other meters)
  _initializeProperties(measureSign) {
    this.measureSign = measureSign;
    switch (measureSign) {    
      case 'C':
        this.defaultValue = 8;
        this.measureLength = 8;
        this.startValue = 6;
        break;
      case '3/2':
        this.defaultValue = 8;
        this.measureLength = 6;
        this.startValue = 4;
        break;
      case '3/4':
        this.defaultValue = 8;
        this.measureLength = 6;
        this.startValue = 4;
        break;
      case '2/4':
        this.defaultValue = 8;
        this.measureLength = 4;
        this.startValue = 2;
        break;
      case '3/8':
      case '6/8':
        this.defaultValue = 16;
        this.measureLength = 6;
        this.startValue = 4;
        break;
      default:
        this.measureSign = 'C|';
        this.defaultValue = 4;
        this.measureLength = 4;
        this.startValue = 2;
        break;
    }
  }

  // Create from an array of toneObjects an Array of measures with toneObejcts
  _createMeasures() {
    const tripleMeters = ['3/2', '3/4', '3/8','6/8'];
    const returnValue = [];
    let tempArr = [];
    let length = this.startValue;
    for (let index = 0; index < this.voice.length; index += 1) {
      const tonObj = this.voice[index];
      tempArr.push(tonObj);
      length += tonObj.length;
      // create a measure unit
      if(length % this.measureLength === 0) {
        if (tripleMeters.includes(this.measureSign)) {           
          if (!this.invertRhythm) {
            // expand the first length of a measure
            tempArr[0].length *= 2;
            length += 2;
          } else {
            // expand the rest of a measure
            // eslint-disable-next-line no-loop-func
            tempArr.forEach((_, tempIndex) => {
              if (tempIndex > 0) {
                tempArr[tempIndex].length *= 2;
              }
            });
            length += 2;        
          }          
        }
        returnValue.push(tempArr.slice());
        tempArr = [];      
      }
      if(index === this.voice.length - 1) {
        returnValue.push(tempArr.slice());
      }  
    }
    if (tripleMeters.includes(this.measureSign)) {
      returnValue[0][0].length = !this.invertRhythm ? returnValue[0][0].length / 2 : returnValue[0][0].length;
      const lmi = returnValue.length - 1;
      returnValue[lmi][0].length *= 2;
    }
    return [...returnValue];
  }

  // Provide a abc octave value from a midi octave number
  _getOctaveSpecifier(octaveNumber) {
    switch (octaveNumber) {
      case 1:
        return ',,,';
      case 2:
        return ',,';
      case 3:
        return ',';
      case 4:
        return '';
      case 5:
        return '\'';
      case 6:
        return '\'\'';
      case 7:
        return '\'\'\'';
      case 8:
        return '\'\'\'\'';
      default:
        // eslint-disable-next-line no-console
        console.log(`The octave value is invalid: ${octaveNumber}.`);
        return '';
    }
  }

  // Create an abc toneSymbol with sign (i.e. '_C', '=C' or '^C') from a fifthValue
  _getToneSymbolFormFifthsValue(number) {
    switch (number) {
      case 14:
        return '^^C'; 
      case 13:
        return '^^F'; 
      case 12:
        return '^B'; 
      case 11:
        return '^E'; 
      case 10:
        return '^A'; 
      case 9:
        return '^D'; 
      case 8:
        return '^G'; 
      case 7:
        return '^C';
      case 6:
        return '^F'; 
      case 5:
        return '=B'; 
      case 4:
        return '=E'; 
      case 3:
        return '=A';
      case 2:
        return '=D'; 
      case 1:
        return '=G'; 
      case 0:
        return '=C'; 
      case -1:
        return '=F';
      case -2:
        return '_B'; 
      case -3:
        return '_E'; 
      case -4:
        return '_A';
      case -5:
        return '_D'; 
      case -6:
        return '_G'; 
      case -7:
        return '_C';
      case -8:
        return '_F';
      default:
        // eslint-disable-next-line no-console
        console.log(`The fifths value ${number} ist out of range`);
        return 0;
    }
  }

  // Remove redundant signs (i.e. _ or ^ or =) in a abc measure 
  // TODO: This function is called here to early
  _removeRedundantSigns(measureAbcToneObjects, index = 0, seen = {}, prefixPattern = /^([=_^]+)?/) {
    if (index >= measureAbcToneObjects.length) {
      return measureAbcToneObjects;
    }
    const currentAbcToneObj = measureAbcToneObjects[index];
    if (seen[currentAbcToneObj]) {
      measureAbcToneObjects[index] = seen[currentAbcToneObj]; // Replace unnecessary repetitions of signs (_,=,^)
    } else {
      seen[currentAbcToneObj] = currentAbcToneObj.replace(prefixPattern, '');
    }
    return this._removeRedundantSigns(measureAbcToneObjects, index + 1, seen, prefixPattern);
  }

  // Provide an array of toneObjects and measure signs (i.e. '|')
  getAbcMeasures() {
    const abcSymbols = [];
    this.measures.forEach(measure => {
      // Building measure groups for all voices with one or more tone objects
      const fifthsValues = [];
      const tempMaesure = [];
      for (let index = 0; index < measure.length; index += 1) {
        const toneObj = measure[index];
        fifthsValues.push(toneObj.fifthsValue);
        if (!toneObj.force) {
          toneObj.force = fifthsValues.some(number => (number + 7 === toneObj.fifthsValue) || (number - 7 === toneObj.fifthsValue));          
        }
        let abcSymbol = !this.hideSystem ? `${this._getToneSymbolFormFifthsValue(toneObj.fifthsValue)}${this._getOctaveSpecifier(toneObj.octave)}${toneObj.length}` : `x${toneObj.length}`;
        if (!toneObj.force && abcSymbol.startsWith('=')) {
          abcSymbol = abcSymbol.slice(1);
        }       
        tempMaesure.push(abcSymbol);
      }
      abcSymbols.push(...this._removeRedundantSigns(tempMaesure));
      abcSymbols.push('|');
    });
    abcSymbols.pop();
    if (this.measureSign === '6/8') {
      let pipeCount = 0;
      return [...abcSymbols.filter(item => {
        if (item === '|') {
          pipeCount += 1;
          return pipeCount % 2 !== 0;
        }
        return true;
      })];
    }
    return abcSymbols;
  }

  // Removes a whitespace after the first occurrence of twice abc symbols with a length of 1
  static removeSingelNoteNotations(abcVoice) {
    return abcVoice.replace(/1 (\S)/g, '1$1');
  }
}
