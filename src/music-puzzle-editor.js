import AbcSnippet from './abc-snippet.js';
import ModelHelper from './model-helper.js';
import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';
import ModelComposition from './model-composition.js'; 
import VoiceSwitch from './components/voice-switch.js';
import ModelProvider from './models/model-provider.js';
import { Form, Button, Space, Radio, Select } from 'antd';
import cloneDeep from '@educandu/educandu/utils/clone-deep.js';
import { sectionEditorProps } from '@educandu/educandu/ui/default-prop-types.js';
import { ArrowUpOutlined, ArrowDownOutlined, PlusOutlined } from '@ant-design/icons';

export default function MusicPuzzleEditor({ content, onContentChanged }) {

  const { t } = useTranslation('musikisum/educandu-plugin-music-puzzle');
  const { modelTemplates } = content;

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

  const [voiceDraggers, setvoiceDraggers] = useState(defaultVoiceDraggers);

  const updateContent = newContentValues => {
    onContentChanged({ ...content, ...newContentValues });
  };

  const changeModelTemplateKey = (e, index) => {
    const newModelTemplates = cloneDeep(modelTemplates);
    const modelTemplateToUpdate = newModelTemplates[index];
    modelTemplateToUpdate.key = e;
    newModelTemplates[index] = modelTemplateToUpdate;
    updateContent({ modelTemplates: newModelTemplates });
  };

  const onRadioChange = (e, index) => { 
    const newModelTemplates = cloneDeep(modelTemplates);
    const modelTemplateToUpdate = newModelTemplates[index];
    modelTemplateToUpdate.radioValue = e.target.value;
    newModelTemplates[index] = modelTemplateToUpdate;
    updateContent({ modelTemplates: newModelTemplates }); 
  };

  const onArrowButtonClick = (direction, index) => {
    const newModelTemplates = cloneDeep(modelTemplates);
    const modelTemplateToUpdate = newModelTemplates[index];
    const voice = modelTemplateToUpdate.radioValue;
    if(direction === 'up') {
      modelTemplateToUpdate.transposeValues[voice] += 1;
    } else {
      modelTemplateToUpdate.transposeValues[voice] -= 1;
    }
    newModelTemplates[index] = modelTemplateToUpdate;
    updateContent({ modelTemplates: newModelTemplates });
  };

  const [selectedModel, setSelectedModel] = useState('cadence');

  const handleAddModelButtonClick = () => {
    const modelTemplate = ModelHelper.getModelTemplate(selectedModel);
    const newModelTemplates = cloneDeep(modelTemplates);
    newModelTemplates.push(modelTemplate);
    updateContent({ modelTemplates: newModelTemplates });
  };

  useEffect(() => {    
    console.log('useEffect for voiceDraggers');
    // const opt = { ...modelOptions };
    // const voiceArrangement = voiceDraggers.reduce((akku, vd) => {
    //   const result = akku + vd.voiceIndex.toString();
    //   return result;
    // }, '');   
    // opt.transposeValues = ModelHelper.updateTransposeValues(voiceArrangement, Cadence);
    // opt.voiceArrangement = [voiceDraggers[0].voiceIndex + 1, voiceDraggers[1].voiceIndex + 1, voiceDraggers[2].voiceIndex + 1];
    // setModelOptions(opt);
    // setAbcResult(ModelComposition.abcOutput('C', 'C', 120, '1/2', [Cadence.getVoices(opt)]));
  }, [voiceDraggers]);

  const renderModel = () => (
    <React.Fragment>
      { modelTemplates.map((modelTemplate, index) => (
        <div className='container' key={index}>
          <div className="left">
            <div className='innerContainer'>
              <div className='item-1'>
                <div className='label'>Tonart</div>
                <Select 
                  style={{ width: '60%' }} 
                  defaultValue={modelTemplate.key} 
                  options={ModelProvider.getModel(modelTemplate.name).getModelKeys().map(key => ({ value: key, label: key }))}
                  onChange={e => changeModelTemplateKey(e, index)}
                  />                   
              </div>
              <div className='item-2'>
                <div className='label'>Transposition (8)</div>
                <div className='buttons'>
                  <Button className='button' onClick={() => onArrowButtonClick('up', index)}><ArrowUpOutlined /></Button>
                  <Button className='button' onClick={() => onArrowButtonClick('down', index)}><ArrowDownOutlined /></Button>
                </div>
                <Radio.Group onChange={e => onRadioChange(e, index)} value={modelTemplate.radioValue}>
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
              <AbcSnippet 
                playableABC={
                  ModelComposition.abcOutput('C', 'C', 120, '1/2', [
                    ModelProvider
                      .getModel(modelTemplate.name)
                      .getVoices(modelTemplate)
                  ])
                }
                />
            </div>
          </div>
        </div>)
      )}
    </React.Fragment>
  );

  return (
    <div className="EP_Educandu_Example_Editor">
      <Form labelAlign="left" style={{ width: '100%' }}>
        {renderModel()}
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAddModelButtonClick}>
            {t('addModel')}
          </Button>
          <Select
            defaultValue="cadence"
            onChange={e => setSelectedModel(e)}
            options={[
              {
                value: 'cadence',
                label: t('cadence')
              },
              {
                value: 'circleOfFifths',
                label: t('circleOfFifths')
              }
            ]}
            />
        </div>
      </Form>      
    </div>
  );
}

MusicPuzzleEditor.propTypes = {
  ...sectionEditorProps
};
