import AbcSnippet from './abc-snippet.js';
import { useTranslation } from 'react-i18next';
import { Form, Button, Dropdown, Space, Radio } from 'antd';
import VoiceSwitch from './components/voice-switch.js';
import React, { useState, useEffect } from 'react';
import { ArrowUpOutlined, ArrowDownOutlined, PlusOutlined } from '@ant-design/icons';
import { sectionEditorProps } from '@educandu/educandu/ui/default-prop-types.js';
import ModelComposition from './model-composition.js'; 
import CircleOfFifths from './models/model-circle-of-fifths.js';
import ModelProvider from './models/model-provider.js';
import ModelHelper from './model-helper.js';
import cloneDeep from '@educandu/educandu/utils/clone-deep.js';

export default function MusicPuzzleEditor({ content, onContentChanged }) {

  const Cadence = ModelProvider.getModel('Cadence'); 

  const { t } = useTranslation('musikisum/educandu-plugin-music-puzzle');
  const { models } = content;

  const defaultVoiceDraggers = [
    {
      key: 'voice1',
      text: t('v1'),
      voiceIndex: 0
    }, {
      key: 'voice2',
      text: t('v2'),
      voiceIndex: 1
    }, {
      key: 'voice3',
      text: t('v3'),
      voiceIndex: 2
    }
  ];

  const modelKeys = Cadence.getModelKeys().reduce((akku, current) =>{
    const obj = {};
    obj.key = current;
    obj.label = t(current);
    akku.push(obj);
    return akku;
  }, []); 
  
  const modelNames = [
    {
      key: 'cadence',
      label: t('cadence')
    },{
      key: 'circleOfFifths',
      label: t('circleOfFifths')
    }
  ]; 

  const [key, setKey] = useState('C');
  const [radioValue, setRadioValue] = useState(0);
  const [voiceDraggers, setvoiceDraggers] = useState(defaultVoiceDraggers);
  const [modelOptions, setModelOptions] = useState(Cadence.getDefaultOptions);
  const [abcResult, setAbcResult] = useState(ModelComposition.abcOutput('C', 'C', 120, '1/2', [CircleOfFifths.getVoices()]));
  
  const menuProps = { items: modelKeys, onClick: event => setKey(event.key) };
  const modelMenuProps = { items: modelNames, onClick: event => setSelectedModel(event.key) };

  const updateContent = newContentValues => {
    onContentChanged({ ...content, ...newContentValues });
  };

  const onRadioChange = e => {    
    setRadioValue(e.target.value);
  };

  const [selectedModel, setSelectedModel] = useState('cadence');

  const handleAddModelButtonClick = e => {
    const modelTemplate = ModelHelper.getModelTemplate(selectedModel);
    const newModels = cloneDeep(models);
    newModels.push(modelTemplate);
    updateContent({ models: newModels});
  }

  console.log(models);

  const onArrowButtonClick = (e, direction) => {
    const opt = { ...modelOptions };
    const voice = radioValue;
    if(direction === 'up') {
      opt.transposeValues[voice] += 1;
    } else {
      opt.transposeValues[voice] -= 1;
    }
    setModelOptions(opt);
    setAbcResult(ModelComposition.abcOutput('C', 'C', 120, '1/2', [Cadence.getVoices(opt)]));
  };

  useEffect(() => {
    const opt = { ...modelOptions };
    opt.key = key;
    setModelOptions(opt);
    setAbcResult(ModelComposition.abcOutput('C', 'C', 120, '1/2', [Cadence.getVoices(opt)]));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEffect(() => {    
    const opt = { ...modelOptions };
    const voiceArrangement = voiceDraggers.reduce((akku, vd) => {
      const result = akku + vd.voiceIndex.toString();
      return result;
    }, '');   
    opt.transposeValues = ModelHelper.updateTransposeValues(voiceArrangement, Cadence);
    opt.voiceArrangement = [voiceDraggers[0].voiceIndex + 1, voiceDraggers[1].voiceIndex + 1, voiceDraggers[2].voiceIndex + 1];
    setModelOptions(opt);
    setAbcResult(ModelComposition.abcOutput('C', 'C', 120, '1/2', [Cadence.getVoices(opt)]));
  }, [voiceDraggers]);

  const renderModel = () => (    
    <div className='container'>
      <div className="left">
        <div className='innerContainer'>
          <div className='item-1'>
            <div className='label'>Tonart</div>
            <Dropdown menu={menuProps} placement="bottomLeft" arrow={{ pointAtCenter: true, }}>
              <div className='buttons'>
                <Button>{key}</Button>                  
              </div>
            </Dropdown>
          </div>
          <div className='item-2'>
            <div className='label'>Transposition (8)</div>
            <div className='buttons'>
              <Button className='button' onClick={(e) => onArrowButtonClick(e, 'up')}><ArrowUpOutlined /></Button>
              <Button className='button' onClick={onArrowButtonClick}><ArrowDownOutlined /></Button>
            </div>
            <Radio.Group onChange={onRadioChange} value={radioValue}>
              <Space direction="vertical">
                <Radio value={0}>{t('os')}</Radio>
                <Radio value={1}>{t('ms')}</Radio>
                <Radio value={2}>{t('us')}</Radio>
              </Space>
            </Radio.Group>
          </div>
          <div className='item-3'>
            <div className='label'>Stimmtausch</div>
            <VoiceSwitch style={{ margin: '16px 0' }} switchButtons={voiceDraggers} setSwitchButtons={setvoiceDraggers} />
          </div>
        </div>
      </div>
      <div className="right">
        <div>
          { abcResult ? <AbcSnippet playableABC={abcResult} /> : null }
        </div>
      </div>
    </div>
  );

  return (
    <div className="EP_Educandu_Example_Editor">
      <Form labelAlign="left" style={{ width: '100%' }}>
        {renderModel()}
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddModelButtonClick}>
          {t('addModel')}
        </Button>
        <Dropdown menu={modelMenuProps} placement="bottomLeft" arrow={{ pointAtCenter: true, }}>
          <div className='buttons'>
            <Button>{t(selectedModel)}</Button>                  
          </div>
        </Dropdown>
      </Form>      
    </div>
  );
}

MusicPuzzleEditor.propTypes = {
  ...sectionEditorProps
};
