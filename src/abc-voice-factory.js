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
    const returnValue = [];
    let tempArr = [];
    let length = this.startValue;
    for (let index = 0; index < this.voice.length; index += 1) {
      const tonObj = this.voice[index];
      tempArr.push(tonObj)
      length += tonObj.length;
      // create a measure unit
      if(length % this.measureLength === 0) {
        if (this.measureSign === '3/4') {           
          if (!this.invertRhythm) {
            // expand the first length of a measure
            tempArr[0].length = tempArr[0].length * 2;
            length += 2;
          } else {
            // expand the rest of a measure
            tempArr.forEach((_, index) => {
              if (index > 0) {
                tempArr[index].length = tempArr[index].length * 2;
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
    if (this.measureSign === '3/4') {
      returnValue[0][0].length = !this.invertRhythm ? returnValue[0][0].length / 2 : returnValue[0][0].length;
      const lmi = returnValue.length - 1
      returnValue[lmi][0].length = returnValue[lmi][0].length * 2;
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

  // Create an abc toneSymbol with sign (i.e. '_C', '=C' or '^C') form a fifthValue
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
      console.log(`The fifths value ${number} ist out of range`);
  }
  }

  // Provide the abc value for a measure an remove redundant signs (i.e. '=')
  _getMeasureAbcCodeFromTonObjectsArray(toneObjArr) {
    return toneObjArr.reduce((accu, toneObj) => {
      let abcSymbol = `${getToneFromFifthsValue(toneObj.fifthsValue)}${_getOctaveSpecifier(toneObj.octave)}${toneObj.length}`;
      if (!toneObj.force && abcSymbol.startsWith('=')) {
        abcSymbol = abcSymbol.slice(1);
      }
      accu.push(abcSymbol);
      return accu;
    }, []);
  }

  // Provide an array of arrays for measure toneObjects 
  getMeasures() {
    return [...this.measures];
  }

  // Provide an array of toneObjects with measure signs (i.e. '|')
  getAbcMeasures() {
    const abcSymbols = [];
    this.measures.forEach(measure => {
      const fifthsValues = [];
      for (let index = 0; index < measure.length; index += 1) {
        const toneObj = measure[index];
        fifthsValues.push(toneObj.fifthsValue);
        toneObj.force = fifthsValues.some(number => (number + 7 === toneObj.fifthsValue) || (number - 7 === toneObj.fifthsValue));
        let abcSymbol = !this.hideSystem ? `${this._getToneSymbolFormFifthsValue(toneObj.fifthsValue)}${this._getOctaveSpecifier(toneObj.octave)}${toneObj.length}` : `x${toneObj.length}`;
        if (!toneObj.force && abcSymbol.startsWith('=')) {
          abcSymbol = abcSymbol.slice(1);
        }
        abcSymbols.push(abcSymbol);
      }
      abcSymbols.push('|');
    });
    abcSymbols.pop()
    return abcSymbols;
  }

  // Removes a whitespace after the first occurrence of twice abc symbols with a length of 1
  static removeSingelNoteNotations(abcVoice) {
    return abcVoice.replace(/1 (\S)/g, '1$1')
  }
}