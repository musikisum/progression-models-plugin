import joi from 'joi';
import React from 'react';
import cloneDeep from '@educandu/educandu/utils/clone-deep.js';
import IconComponent from './progression-models-icon.js';
import { PLUGIN_GROUP } from '@educandu/educandu/domain/constants.js';

class ProgressionModelsInfo {

  static typeName = 'musikisum/educandu-plugin-progression-models';
  constructor(gfm) {
    this.gfm = gfm;
  }

  getDisplayName(t) {
    return t('musikisum/educandu-plugin-progression-models:name');
  }

  getIcon() {
    return <IconComponent />;
  }

  getGroups() {
    return [PLUGIN_GROUP.other];
  }

  async resolveDisplayComponent() {
    return (await import('./progression-models-display.js')).default;
  }

  async resolveEditorComponent() {
    return (await import('./progression-models-editor.js')).default;
  }

  getDefaultContent() {   
    return  {
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
    };
  }
  
  validateContent(content) {
    const schema = joi.object({
      width: joi.number().min(0).max(100).required(),
      transposeValue: joi.number().max(3).min(-3),
      tempo: joi.number().min(10).max(180).multiple(10).required(),
      measure: joi.string().required(),
      stretchLastLine: joi.boolean(),
      invertRhythm: joi.boolean(),
      measuresPerLine: joi.number().min(2).max(10).required(),
      showDescription: joi.boolean(),
      hideUpperSystem: joi.boolean(),
      hideLowerSystem: joi.boolean(),
      withTies: joi.boolean(),
      showExample: joi.boolean(),
      example: joi.object({
        name: joi.string().allow(null, ''),
        abc: joi.string().allow(null, '')
      }),
      selectedModel: joi.string(),
      modelTemplates: joi.array().required()
    });

    joi.attempt(content, schema, { abortEarly: false, convert: false, noDefaults: true });
  }

  cloneContent(content) {
    return cloneDeep(content);
  }

  redactContent(content) {
    return cloneDeep(content);
  }

  getCdnResources() {
    return [];
  }
}

export default ProgressionModelsInfo;
