import ModelHelper from './model-helper.js';

export default class UpperFiveModulation {

  static measure = [' | ', ' ', ' | ', ' ', ' | ', ' '];
  static defaultTransposeValue = [0, 0, 0];
  static voicesLength = 6;
  static voices = [[12, 11, 11, 10, 10, 9], [7, 6, 7, 7, 6, 7], [3, 3, 2, 1, 4, 0]];

  static getModelVoices(key, octaves) {
    const localKey = key || 'C';
    const [v1, v2, v3] = octaves || this.defaultTransposeValue;

    const keyObject = this.keys.find(elem => elem.key === localKey);
    const abcVoices = ['', '', ''];

    for (let index = 0; index < this.voicesLength; index += 1) {
      abcVoices[0] += keyObject.accidentals[0][index];
      abcVoices[0] += ModelHelper.transposeOctave(v1, ModelHelper.validateValue(this.voices[0][index] + keyObject.t));
      abcVoices[0] += this.measure[index];

      abcVoices[1] += keyObject.accidentals[1][index];
      abcVoices[1] += ModelHelper.transposeOctave(v2, ModelHelper.validateValue(this.voices[1][index] + keyObject.t));
      abcVoices[1] += this.measure[index];
      
      abcVoices[2] += keyObject.accidentals[2][index];
      abcVoices[2] += ModelHelper.transposeOctave(v3, ModelHelper.validateValue(this.voices[2][index] + keyObject.t));
      abcVoices[2] += this.measure[index];  
    }
    return abcVoices;
  }

  static getEmptyStaff() {
    return ['x | x x | x x | x]', 'x | x x | x x | x]', 'x | x x | x x | x]'];
  }

  static keys = [{
    key: 'C',
    t: 0,
    accidentals: [
      ['', '', '', '', '', ''], 
      ['', '', '', '', '', ''], 
      ['', '', '', '', '', '']
    ]
  },{
    key: 'Dm',
    t: 1,
    accidentals: [
      ['_', '', '', '', '', ''],
      ['', '^', '', '', '^', ''],
      ['', '', '', '', '', '']
    ]
  },{
    key: 'G',
    t: -3,
    accidentals: [
      ['', '', '', '', '', ''],
      ['', '^', '', '', '^', ''],
      ['', '', '', '', '', '']
    ]
  }];
}