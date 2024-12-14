import joi from 'joi';
import { describe, it, expect, beforeEach } from 'vitest';
import ProgressionModelsInfo from './progression-models-info.js';
import { PLUGIN_GROUP } from '@educandu/educandu/domain/constants.js';

describe('ProgressionModelsInfo', () => {
  let progressionModelsInfo;

  beforeEach(() => {
    progressionModelsInfo = new ProgressionModelsInfo();
  });

  describe('getDefaultContent', () => {
    it('should return the default content with the correct structure and values', () => {
      const result = progressionModelsInfo.getDefaultContent();

      expect(result).toEqual({
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
        modelTemplates: []
      });
    });
  });

  describe('validateContent', () => {
    it('should pass valid content', () => {
      const validContent = {
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
        example: { name: '', abc: '' },
        selectedModel: 'cadence',
        modelTemplates: []
      };
      expect(() => progressionModelsInfo.validateContent(validContent)).not.toThrow();
    });

    it('should throw an error for invalid content', () => {
      const invalidContent = {
        width: -1,
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
        example: { name: '', abc: '' },
        selectedModel: 'cadence',
        modelTemplates: []
      };
      expect(() => progressionModelsInfo.validateContent(invalidContent)).toThrowError(joi.ValidationError);
    });
  });

  describe('cloneContent', () => {
    it('should correctly clone the content', () => {
      const content = progressionModelsInfo.getDefaultContent();
      const clonedContent = progressionModelsInfo.cloneContent(content);
      expect(clonedContent).toEqual(content);
      expect(clonedContent).not.toBe(content);
    });
  });

  describe('redactContent', () => {
    it('should correctly redact the content', () => {
      const content = progressionModelsInfo.getDefaultContent();
      const redactedContent = progressionModelsInfo.redactContent(content);
      expect(redactedContent).toEqual(content);
      expect(redactedContent).not.toBe(content);
    });
  });

  describe('getGroups', () => {
    it('should return the correct groups', () => {
      const groups = progressionModelsInfo.getGroups();
      expect(groups).toEqual([PLUGIN_GROUP.mostUsed, PLUGIN_GROUP.other]);
    });
  });

  describe('resolveDisplayComponent and resolveEditorComponent', () => {
    it('should resolve the display component correctly', async () => {
      const component = await progressionModelsInfo.resolveDisplayComponent();
      expect(component).toBeDefined();
    });

    it('should resolve the editor component correctly', async () => {
      const component = await progressionModelsInfo.resolveEditorComponent();
      expect(component).toBeDefined();
    });
  });
});