import joi from 'joi';
import React from 'react';
import { ClockCircleOutlined } from '@ant-design/icons';
import cloneDeep from '@educandu/educandu/utils/clone-deep.js';
import { couldAccessUrlFromRoom } from '@educandu/educandu/utils/source-utils.js';
import GithubFlavoredMarkdown from '@educandu/educandu/common/github-flavored-markdown.js';

class MusicPuzzleInfo {
  static dependencies = [GithubFlavoredMarkdown];

  static typeName = 'musikisum/educandu-plugin-music-puzzle';

  constructor(gfm) {
    this.gfm = gfm;
  }

  getDisplayName(t) {
    return t('musikisum/educandu-plugin-music-puzzle:name');
  }

  getIcon() {
    return <ClockCircleOutlined />;
  }

  async resolveDisplayComponent() {
    return (await import('./music-puzzle-display.js')).default;
  }

  async resolveEditorComponent() {
    return (await import('./music-puzzle-editor.js')).default;
  }

  getDefaultContent() {   
    return  {
      width: 100,
      isTransposible: true,
      transposeValue: 0,
      tempo: 120,
      measure: 'C|',
      stretchLastLine: false,
      measuresPerLine: 6,
      showDescription: false,
      modelTemplates: []
    };
  }
  
  validateContent(content) {
    const schema = joi.object({
      width: joi.number().min(0).max(100).required(),
      isTransposible: joi.boolean(),
      transposeValue: joi.number().max(3).min(-3),
      tempo: joi.number().min(10).max(180).multiple(10).required(),
      measure: joi.string().required(),
      stretchLastLine: joi.boolean(),
      measuresPerLine: joi.number().min(2).max(10).required(),
      showDescription: joi.boolean(),
      modelTemplates: joi.array().required()

    });

    joi.attempt(content, schema, { abortEarly: false, convert: false, noDefaults: true });
  }

  cloneContent(content) {
    return cloneDeep(content);
  }

  redactContent(content, targetRoomId) {
    const redactedContent = cloneDeep(content);

    redactedContent.text = this.gfm.redactCdnResources(
      redactedContent.text,
      url => couldAccessUrlFromRoom(url, targetRoomId) ? url : ''
    );

    return redactedContent;
  }

  getCdnResources(content) {
    return this.gfm.extractCdnResources(content.text);
  }
}

export default MusicPuzzleInfo;
