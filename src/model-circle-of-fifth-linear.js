import ModelHelper from './model-helper.js';

export default class CircleOfFifthsLinear {

  static #voices;
  static #measure;
  static #defaultTransposeValue;
  static #voicesLength = 8;
  static #keys = [{
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
      ['', '', '', '', '', '', '^', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '_', '', '', '_', '', '', '']
    ]
  },{
    key: 'G',
    t: 4,
    accidentals: [
      ['', '', '', '', '', '', '^', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '^', '', '', '', '', '']
    ]
  },
  {
    key: 'Gm',
    t: 4,
    accidentals: [
      ['_', '', '', '', '', '', '^', ''],
      ['', '', '', '_', '_', '', '', '_'],
      ['', '_', '', '', '_', '', '', '']
    ]
  }];

  static #init() {
    this.#measure = [' | ', ' ', ' | ', ' ', ' | ', ' ', ' | ', ' '];
    this.#defaultTransposeValue = [0, 0, 0];
    this.#voices = [[9, 9, 8, 8, 7, 7, 6, 7], [4, 3, 3, 2, 2, 1, 1, 2], [0, -2, -1, -3, -2, -4, -3, -7]];
  }

  static getModelVoices(key, octaves, voiceArrangement, lastBassNoteUp) {

    this.#init();

    const localKey = key || 'C';
    lastBassNoteUp && (this.#voices[2][7] = 0);
    const voiceArr = voiceArrangement && voiceArrangement.length ? voiceArrangement : [1, 2, 3];
    const [v1, v2, v3] = octaves && octaves.length ? octaves : this.#defaultTransposeValue;

    const keyObject = this.#keys.find(elem => elem.key === localKey);
    const abcVoices = ['', '', ''];

    for (let index = 0; index < this.#voicesLength; index += 1) {
      abcVoices[voiceArr[0]-1] += keyObject.accidentals[0][index];
      abcVoices[voiceArr[0]-1] += ModelHelper.transposeOctave(v1, ModelHelper.validateValue(this.#voices[0][index] + keyObject.t));
      abcVoices[voiceArr[0]-1] += this.#measure[index];

      abcVoices[voiceArr[1]-1] += keyObject.accidentals[1][index];
      abcVoices[voiceArr[1]-1] += ModelHelper.transposeOctave(v2, ModelHelper.validateValue(this.#voices[1][index] + keyObject.t));
      abcVoices[voiceArr[1]-1] += this.#measure[index];

      abcVoices[voiceArr[2]-1] += keyObject.accidentals[2][index];
      abcVoices[voiceArr[2]-1] += ModelHelper.transposeOctave(v3, ModelHelper.validateValue(this.#voices[2][index] + keyObject.t));
      abcVoices[voiceArr[2]-1] += this.#measure[index];  
    }

    return abcVoices;
  }

  static getEmptyStaff() {
    return ['x | x x | x x | x x | x', 'x | x x | x x | x x | x', 'x | x x | x x | x x | x'];
  }

  static getExample() {
    return ['f- | f e2 d- | -d c d3/2', 'z | B2 A2 | G2 F z/', 'A,/D,/ | G,/F,/G,/C,/ F,/E,/F,/B,,/ | E,/F,//G,// A,/A,,/ D,/E,/,F,/]'];
  }
}