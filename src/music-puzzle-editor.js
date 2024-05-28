import AbcSnippet from './abc-snippet.js';
import { useTranslation } from 'react-i18next';
import { Form, Button, Dropdown, Space, Radio, Switch, Row, Col } from 'antd';
import VoiceSwitch from './components/voice-switch.js';
import { keys, getVoiceDraggers } from './music-puzzle-editor-defaults.js';
import React, { useState, useEffect, useId } from 'react';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { FORM_ITEM_LAYOUT } from '@educandu/educandu/domain/constants.js';
import MarkdownInput from '@educandu/educandu/components/markdown-input.js';
import { sectionEditorProps } from '@educandu/educandu/ui/default-prop-types.js';
import { swapItemsAt, removeItemAt, ensureIsExcluded, moveItem } from '@educandu/educandu/utils/array-utils.js';

import Cadence from './models/model-cadence.js';
import ModelComposition from './model-composition.js'; 
import CircleOfFifthsLinear from './models/model-circle-of-fifths-linear.js';
import CircleOfFifths from './models/model-circle-of-fifths.js';

export default function MusicPuzzleEditor({ content, onContentChanged }) {

  const [voiceDraggers, setvoiceDraggers] = useState(getVoiceDraggers('Stimme')) ;

  const [key, setKey] = useState('C');
  const [radioValue, setRadioValue] = useState(0);
  const [checked, setChecked] = useState([true, true, false]);

  const toggleChecked = (index) => {
    setChecked(prevState => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const menuProps = {
    keys,
    onClick: event => setKey(event.key)
  };

  const { t } = useTranslation('musikisum/educandu-plugin-music-puzzle');
  const { text } = content;

  const updateContent = newContentValues => {
    onContentChanged({ ...content, ...newContentValues });
  };

  const [changedVoices, setChangedVoices] = useState();
  const [abcResult, setAbcResult] = useState(ModelComposition.abcOutput('C', 'C', 120, '1/2', [CircleOfFifths.getVoices()]));

  useEffect(() => {
    const opt = Cadence.getDefaultOptions();
    const [upper, middle, lower] = opt.transposeValues;
    const voiceArrangement = voiceDraggers.reduce((akku, vd) => {
      const result = akku + vd.voiceIndex.toString();
      return result;
    }, '');
    const mapObj = {
      '012': [upper, middle, lower],
      '102': [upper, middle - 1, lower],
      '021': [upper, middle, lower],
      '120': [upper, middle, lower - 1],
      '201': [upper + 1, middle - 1, lower],
      '210': [upper + 1, middle, lower]
    };
    opt.transposeValues = mapObj[voiceArrangement];
    opt.voiceArrangement = [voiceDraggers[0].voiceIndex + 1, voiceDraggers[1].voiceIndex + 1, voiceDraggers[2].voiceIndex + 1];
    setAbcResult(ModelComposition.abcOutput('C', 'C', 120, '1/2', [Cadence.getVoices(opt)]));
  }, [voiceDraggers]);

  const onRadioChange = (e) => {
    setRadioValue(e.target.value);
  };

  return (
    <div className="EP_Educandu_Example_Editor">
      <Form labelAlign="left" style={{ width: '100%' }}>
        <div className="container">
          <div className="row">
            {/* Linke Hälfte: Container mit drei Spalten */}
            <div className="col left">
              <div className="row">
                <div className="col col-3">
                    <div className="box red">
                      <Dropdown menu={menuProps} placement="bottomLeft">
                        <Button>{key}</Button>
                      </Dropdown>  
                    </div>
                </div>
                <div className="col col-6">
                  <div className="box blue">
                    <Space direction="vertical">
                     <Button type="primary" size="small" onClick={() => toggleChecked(0)}>
                      {checked[0] ? 'Violinschlüssel' : 'Bassschlüssel'}
                     </Button>  
                     <Button type="primary" size="small" onClick={() => toggleChecked(1)}>
                      {checked[1] ? 'Violinschlüssel' : 'Bassschlüssel'}
                     </Button>
                     <Button type="primary" size="small" onClick={() => toggleChecked(2)}>
                      {checked[2] ? 'Violinschlüssel' : 'Bassschlüssel'}
                     </Button>  
                    </Space>
                  </div>
                </div>
                <div className="col col-3">
                  <div className="box green">
                    <Radio.Group onChange={onRadioChange} value={radioValue}>
                      <Space direction="vertical">
                        <Radio value={0}>Stimme 1</Radio>
                        <Radio value={1}>Stimme 2</Radio>
                        <Radio value={2}>Stimme 3</Radio>
                      </Space>
                    </Radio.Group>
                  </div>
                </div>
              </div>
            </div>
            {/* Rechte Hälfte: ABC-Anzeige */}
            <div className="col right">
              <div className="box orange">
                { abcResult ? <AbcSnippet playableABC={abcResult} /> : null }
              </div>
            </div>
          </div>
      </div>
    </Form>
  </div>

    // <div className="EP_Educandu_Example_Editor">
    //   <Form labelAlign="left" style={{ width: '100%' }}>
    //     <div style={{ display: 'flex', width: '100% !important' }}>
    //       <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
    //         <Dropdown menu={menuProps} placement="bottomLeft">
    //           <Button>{key}</Button>
    //         </Dropdown>
    //       </div>
    //       <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
    //         <Space direction="vertical">
    //           <Button type="primary" size="small" onClick={toggleChecked}>
    //             {checked ? 'Violinschlüssel' : 'Bassschlüssel'}
    //           </Button>  
    //           <Button type="primary" size="small" onClick={toggleChecked}>
    //             {checked ? 'Violinschlüssel' : 'Bassschlüssel'}
    //           </Button>
    //           <Button type="primary" size="small" onClick={toggleChecked}>
    //             {checked ? 'Violinschlüssel' : 'Bassschlüssel'}
    //           </Button>  
    //         </Space>
    //       </div>
    //       <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
    //         <Radio.Group onChange={onRadioChange} value={radioValue}>
    //           <Space direction="vertical">
    //             <Radio value={0}>Stimme 1</Radio>
    //             <Radio value={1}>Stimme 2</Radio>
    //             <Radio value={2}>Stimme 3</Radio>
    //           </Space>
    //         </Radio.Group>
    //       </div>
    //       <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
    //         <Button style={{ width: 'fit-content' }}><ArrowUpOutlined /></Button>
    //         <Button style={{ width: 'fit-content' }}><ArrowDownOutlined /></Button>
    //       </div>
    //       <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
    //         <VoiceSwitch switchButtons={voiceDraggers} setSwitchButtons={setvoiceDraggers} />
    //       </div>
    //       <div style={{ flexGrow: 4 }}>
    //         { abcResult ? <AbcSnippet playableABC={abcResult} /> : null }
    //       </div>
    //     </div>
    //   </Form>
    // </div>
  );
}

MusicPuzzleEditor.propTypes = {
  ...sectionEditorProps
};
