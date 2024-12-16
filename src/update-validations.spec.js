import updateValidation from './update-validation.js';
import { describe, it, expect, beforeEach } from 'vitest';

describe('updateValidationTests', () => {
  let updateValidationTests;
  let dbContent;

  beforeEach(() => {
    updateValidationTests = updateValidation;
    dbContent = {
      width: 70,
      transposeValue: 0,
      tempo: 120,
      measure: 'C|',
      invertRhythm: false,
      measuresPerLine: 6,
      stretchLastLine: false,
      showDescription: false,
      hideUpperSystem: false,
      hideLowerSystem: false,
      withTies: false,
      showExample: false,
      example: {
        name: '',
        abc: ''
      },
      selectedModel: 'cadence',
      modelTemplates: [{
        key: '',
        name: 'initialCadence',
        modelKey: 'C',
        availableKeys: ['E','C#m', 'A', 'F#m', 'D', 'Bm', 'G', 'Em', 'C', 'Am', 'F', 'Dm', 'Bb', 'Gm', 'Eb', 'Cm', 'Ab', 'Fm'],
        transposeValues: [0, 0, 0],
        voiceArrangement: [1, 2, 3],
        radioValue: 0,
        customDescription: '',
        showDescription: false,
        example: {
          name: 'initialCadence',
          abc: `X:1
        %%score [1 (2 3)]
        L:1/4
        M:3/4
        Q:50
        K:Am
        V:1
        A | e3/2- e/8f/8e/8d/8 {d} e/>a/ |{e} d2 b- | b/4(c'/4b/4a/4) (b/4a/4^g/4^f/4 e/4d/4c/4B/4) |(B/4d/4c/4B/4){B} A x |
        V:2
        x | c c c | B B e | e e B | c/>d/ e/>d/ c3/4 x/4 |
        V:3
        "_J. S. Bach, Mathäus-Passion BWV 244, Teil II, Nr. 58, ›Aus Liebe‹"x | A A A | A A A | ^G G G | A/>B/ c/>B/ A3/4 x/4 |`
        },
        addProps: {
          begin65: [false, false]
        }
      }]
    };
  });

  describe('should pass with updated content', () => {
    it('should return the default content with template property update', () => {
      const result = updateValidationTests.validateContentAfterUpdates(dbContent);
      const schemaAddProp = result.modelTemplates[0].addProps.schema;
      expect(schemaAddProp).toStrictEqual([false, false]);
    });
  });
});
