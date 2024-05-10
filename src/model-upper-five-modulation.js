import ModelHelper from './model-helper.js';

export default class UpperFiveModulation {

  static #voices;
  static #measure;
  static #defaultTransposeValue;
  static #voicesLength = 6;
  static #keys = [{
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

  static #init() {
    this.#defaultTransposeValue = [0, 0, 0];
    this.#measure = [' | ', ' ', ' | ', ' ', ' | ', ' '];
    this.#voices = [[12, 11, 11, 10, 10, 9], [7, 6, 7, 7, 6, 7], [3, 3, 2, 1, 4, 0]];
  }

  static getModelVoices(key, octaves, voiceArrangement) {

    this.#init();

    const localKey = key || 'C';
    const [v1, v2, v3] = octaves && octaves.length ? octaves : this.#defaultTransposeValue;
    const voiceArr = voiceArrangement && voiceArrangement.length ? voiceArrangement : [1, 2, 3];

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
    return ['x | x x | x x | x]', 'x | x x | x x | x]', 'x | x x | x x | x]'];
  }
}