import { Form, Button, Dropdown, Space } from 'antd';
import React, { useState, useEffect } from 'react';
import AbcSnippet from './abc-snippet.js';
import { useTranslation } from 'react-i18next';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { FORM_ITEM_LAYOUT } from '@educandu/educandu/domain/constants.js';
import MarkdownInput from '@educandu/educandu/components/markdown-input.js';
import { sectionEditorProps } from '@educandu/educandu/ui/default-prop-types.js';

const items = [
  {
    key: 'C',
    label: 'C-Dur (C)'
  },
  {
    key: 'Dm',
    label: 'd-Moll (Dm)'
  },
  {
    key: 'Em',
    label: 'e-Moll (Em)'
  },
  {
    key: 'F',
    label: 'F-Dur (F)'
  },
  {
    key: 'G',
    label: 'G-Dur (G)'
  },
  {
    key: 'Am',
    label: 'a-Moll (Am)'
  },
];

import Cadence from './model-cadence.js';
import ModelComposition from './model-composition.js'; 

export default function MusicPuzzleEditor({ content, onContentChanged }) {

  const [key, setKey] = useState('C');
  const menuProps = {
    items,
    onClick: event => setKey(event.key)
  };

  const { t } = useTranslation('musikisum/educandu-plugin-music-puzzle');
  const { text } = content;

  const updateContent = newContentValues => {
    onContentChanged({ ...content, ...newContentValues });
  };

  const [changedVoices, setChangedVoices] = useState();
  const [abcResult, setAbcResult] = useState(ModelComposition.abcOutput('C', 'C', 120, '1/2', [Cadence.getVoices()]));

  useEffect(() => {
    setAbcResult(ModelComposition.abcOutput('C', 'C', 60, '1/2', [Cadence.getVoices()]));
  }, [changedVoices]);

  return (
    <div className="EP_Educandu_Example_Editor">
      <Form labelAlign="left" style={{ width: '100%' }}>
        <div style={{ display: 'flex', width: '100% !important' }}>
          <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <Dropdown menu={menuProps} placement="bottomLeft">
              <Button>{key}</Button>
            </Dropdown>
          </div>
          <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <Button style={{ width: 'fit-content' }}><ArrowUpOutlined /></Button>
            <Button style={{ width: 'fit-content' }}><ArrowDownOutlined /></Button>
          </div>
          <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <Button style={{ width: 'fit-content' }}><ArrowUpOutlined /></Button>
            <Button style={{ width: 'fit-content' }}><ArrowDownOutlined /></Button>
          </div>
          <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <Button style={{ width: 'fit-content' }}><ArrowUpOutlined /></Button>
            <Button style={{ width: 'fit-content' }}><ArrowDownOutlined /></Button>
          </div>
          <div style={{ flexGrow: 4 }}>
            { abcResult ? <AbcSnippet playableABC={abcResult} /> : null }
          </div>
        </div>
      </Form>
    </div>
  );
}

MusicPuzzleEditor.propTypes = {
  ...sectionEditorProps
};
