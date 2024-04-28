import ModelHelper from './model-helper.js';

export default class CircleOfFifths {

  measure = [' | ', ' ', ' | ', ' ', ' | ', ' ', ' | ', ' '];
  defaultTransposeValue = -1;
  v1 = [11, 12, 12, 11, 11, 10, 10, 9];
  v2 = [9, 9, 8, 8, 7, 7, 6, 7];
  v3 = [0, 3, -1, 2, -2, 1, -3, 0];

  getModelVoices(key, octave) {
    let localKey = key;
    let localOctave = octave;
    if(!localKey) {
      localKey = 'C';
    }
    if (localOctave) {
      localOctave = this.defaultTransposeValue;
    }
    const keyObject = this.keys.find(elem => elem.key === localKey);
    let voice1 = '';
    let voice2 = '';
    let voice3 = '';
    for (let index = 0; index < 8; index += 1) {
      voice1 += keyObject.v1[index];
      voice1 += ModelHelper.transposeOctave(localOctave, ModelHelper.validateValue(this.v1[index] + keyObject.t));
      voice1 += this.measure[index];
      voice2 += keyObject.v2[index];
      voice2 += ModelHelper.transposeOctave(localOctave, ModelHelper.validateValue(this.v2[index] + keyObject.t));
      voice2 += this.measure[index];
      voice3 += keyObject.v3[index];
      voice3 += ModelHelper.transposeOctave(localOctave, ModelHelper.validateValue(this.v3[index] + keyObject.t));
      voice3 += this.measure[index];  
    } 
    return [voice1, voice2, voice3];
  }

  keys = [{
    key: 'C',
    t: 0,
    v1: ['', '', '', '', '', '', '', ''],
    v2: ['', '', '', '', '', '', '', ''],
    v3: ['', '', '', '', '', '', '', '']
  },{
    key: 'Dm',
    t: 1,
    v1: ['', '_', '_', '', '', '', '', ''],
    v2: ['', '', '', '', '', '', '^', ''],
    v3: ['', '', '', '', '_', '', '', '']
  },{
    key: 'G',
    t: 4,
    v1: ['', '', '', '', '', '', '', ''],
    v2: ['', '', '', '', '', '', '^', ''],
    v3: ['', '', '^', '', '', '', '', '']
  },
  {
    key: 'Gm',
    t: 4,
    v1: ['', '_', '_', '', '', '', '', '_'],
    v2: ['_', '_', '', '', '', '', '^', ''],
    v3: ['', '', '', '_', '_', '', '', '']
  }];
}