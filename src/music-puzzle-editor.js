import React from 'react';
import { Form } from 'antd';
import { useTranslation } from 'react-i18next';
import { FORM_ITEM_LAYOUT } from '@educandu/educandu/domain/constants.js';
import MarkdownInput from '@educandu/educandu/components/markdown-input.js';
import { sectionEditorProps } from '@educandu/educandu/ui/default-prop-types.js';

export default function MusicPuzzleEditor({ content, onContentChanged }) {
  const { t } = useTranslation('musikisum/educandu-plugin-music-puzzle');
  const { text } = content;

  const updateContent = newContentValues => {
    onContentChanged({ ...content, ...newContentValues });
  };

  const handleTextChanged = event => {
    updateContent({ text: event.target.value });
  };

  return (
    <div className="EP_Educandu_Example_Editor">
      <Form labelAlign="left">
        <Form.Item label={t('common:text')} {...FORM_ITEM_LAYOUT}>
          <MarkdownInput value={text} onChange={handleTextChanged} renderAnchors />
        </Form.Item>
      </Form>
    </div>
  );
}

MusicPuzzleEditor.propTypes = {
  ...sectionEditorProps
};
