export default class AbcVoiceFactory {

  constructor(modelVoiceObj, measureSign, invertRhythm) {
    this.voice = modelVoiceObj;
    this._initializeProperties(measureSign);
    this.invertRhythm = !!invertRhythm;
    this.measures = this._createMeasures();
  }

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

  _createMeasures() {
    const returnValue = [];
    let tempArr = [];
    let length = this.startValue;
    for (let index = 0; index < this.voice.length; index += 1) {
      const tonObj = this.voice[index];
      tempArr.push(tonObj)
      length += tonObj.length;
      if(length % this.measureLength === 0) {
        returnValue.push(tempArr.slice());
        tempArr = [];      
      }
      if(index === this.voice.length - 1) {
        returnValue.push(tempArr.slice());
      }    
    }
    return [...returnValue];
  }

  getMeasures() {
    return [...this.measures];
  }

  getAbcMeasures() {
    const abcSymbols = [];
    this.measures.forEach(measure => {
      const fifthsValues = [];
      for (let index = 0; index < measure.length; index += 1) {
        const toneObj = measure[index];
        fifthsValues.push(toneObj.fifthsValue);
        toneObj.force = fifthsValues.some(number => (number + 7 === toneObj.fifthsValue) || (number - 7 === toneObj.fifthsValue));
        let abcSymbol = `${this._getToneSymbolFormFifthsValue(toneObj.fifthsValue)}${this._getOctaveSpecifier(toneObj.octave)}${toneObj.length}`;
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

  static staticMethod() {
    console.log('This is a static method.');
  }
}