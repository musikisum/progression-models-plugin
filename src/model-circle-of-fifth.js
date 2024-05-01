import ModelHelper from './model-helper.js';

export default class CircleOfFifths {

  static measure = [' | ', ' ', ' | ', ' ', ' | ', ' ', ' | ', ' '];
  static defaultTransposeValue = [0, 0, 0];
  static voicesLength = 8;
  static voices = [[11, 12, 12, 11, 11, 10, 10, 9], [9, 9, 8, 8, 7, 7, 6, 7], [0, 3, -1, 2, -2, 1, -3, 0]];

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
    return ['x | x x | x x | x x | x', 'x | x x | x x | x x | x', 'x | x x | x x | x x | x'];
  }

  static getExample() {
    return ['f- | f e2 d- | -d c d3/2', 'z | B2 A2 | G2 F z/', 'A,/D,/ | G,/F,/G,/C,/ F,/E,/F,/B,,/ | E,/F,//G,// A,/A,,/ D,/E,/,F,/]'];
  }

  static keys = [{
    key: 'C',
    t: 0,
    accidentals: [
      ['', '', '', '', '', '', '', ''], 
      ['', '', '', '', '', '', '', ''], 
      ['', '', '', '', '', '', '', '']
    ]
  },{
    key: 'Dm',
    t: 1,
    accidentals: [
      ['', '_', '_', '', '', '', '', ''],
      ['', '', '', '', '', '', '^', ''],
      ['', '', '', '', '_', '', '', '']
    ]
  },{
    key: 'G',
    t: 4,
    accidentals: [
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '^', ''],
      ['', '', '^', '', '', '', '', '']
    ]
  },
  {
    key: 'Gm',
    t: 4,
    accidentals: [
      ['', '_', '_', '', '', '', '', '_'],
      ['_', '_', '', '', '', '', '^', ''],
      ['', '', '', '_', '_', '', '', '']
    ]
  }];
}