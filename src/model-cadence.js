import ModelHelper from './model-helper.js';

export default class Cadence {

  static #voices;
  static #measure;
  static #defaultTransposeValue;
  static #voicesLength = 4;
  static #keys = [{
    key: 'C',
    t: 0,
    accidentals: [['', '', '', ''], ['', '', '', ''], ['', '', '', '']]
  },{
    key: 'Dm',
    t: 1,
    accidentals: [['', '', '', ''], ['', '', '^', ''], ['', '', '', '']]
  },{
    key: 'G',
    t: 4,
    accidentals: [['', '', '', ''], ['', '', '^', ''], ['', '', '', '']]
  },{
    key: 'Gm',
    t: 4,
    accidentals: [['_', '', '', '_'], ['', '', '^', ''], ['_', '', '', '']]
  },{
    key: 'Am',
    t: -2,
    accidentals: [['', '', '', ''], ['', '', '^', ''], ['', '', '', '']]
  }];

  static #init() {
    this.#measure = [' | ', ' ', ' | ', ' '];
    this.#defaultTransposeValue = [0, 0, 0];
    this.#voices = [[9, 8, 8, 9], [7, 7, 6, 7], [2, 3, 4, 0]];
  }

  static getModelVoices(key, octaves, voiceArrangement, isFinal, begin) {

    this.#init();

    if (isFinal) {
      this.#voices[0] = [9, 8, 8, 7];
    }
    if (begin) {
      console.log(begin);
      this.#voices[2] = [0, 3, 4, 0];
    }    
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
    return ['x | x x | x]', 'x | x x | x]', 'x | x x | x]'];
  }
}