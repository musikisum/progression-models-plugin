import React, { useState } from 'react';
import AbcSnippet from './abc-snippet.js';
import ModelHelper from './model-helper.js';
import { useTranslation } from 'react-i18next';
import ModelComposition from './model-composition.js'; 
import VoiceSwitch from './components/voice-switch.js';
import ModelProvider from './models/model-provider.js';
import cloneDeep from '@educandu/educandu/utils/clone-deep.js';
import { Form, Button, Space, Radio, Select, Checkbox } from 'antd';
import { sectionEditorProps } from '@educandu/educandu/ui/default-prop-types.js';
import { ArrowUpOutlined, ArrowDownOutlined, PlusOutlined } from '@ant-design/icons';

export default function MusicPuzzleEditor({ content, onContentChanged }) {

  const { t } = useTranslation('musikisum/educandu-plugin-music-puzzle');
  const { modelTemplates } = content;

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

  const onCheckboxChange = (e, index, propIndex) => {
    const newModelTemplates = cloneDeep(modelTemplates);
    const modelTemplateToUpdate = newModelTemplates[index];
    const keyValuePairs = Object.entries(modelTemplateToUpdate.addProps);
    modelTemplateToUpdate.addProps[keyValuePairs[propIndex][0]] = e.target.checked;
    newModelTemplates[index] = modelTemplateToUpdate;
    updateContent({ modelTemplates: newModelTemplates });
  }

  const [selectedModel, setSelectedModel] = useState('cadence');

  const handleAddModelButtonClick = () => {
    if(!selectedModel) {
      return;
    }
    const modelTemplate = ModelHelper.getModelTemplate(selectedModel);
    const newModelTemplates = cloneDeep(modelTemplates);
    newModelTemplates.push(modelTemplate);
    updateContent({ modelTemplates: newModelTemplates });
  };

  const renderModel = () => (
    <React.Fragment>
      { modelTemplates.map((modelTemplate, index) => (
        <div className='container' key={index}>
          <div className="left">
            <div className='innerContainer'>
              <div className='item-1'>
                <div className='label'>Tonart</div>
                <Select 
                  defaultValue={modelTemplate.key} 
                  options={ModelProvider.getModel(modelTemplate.name).getModelKeys().map(key => ({ value: key, label: key }))}
                  onChange={e => changeModelTemplateKey(e, index)}
                  />
                <div>
                  { modelTemplate?.addProps ? (
                      Object.entries(modelTemplate.addProps).map(([key, value], propIndex) => (
                        <Checkbox className='addPropItem' key={`prop${propIndex}`} checked={value} onChange={e => onCheckboxChange(e, index, propIndex)}>
                          {t(key)}
                        </Checkbox>
                      ))
                    ) : (null)                  
                  }
                </div>                  
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
                <VoiceSwitch style={{ margin: '16px 0' }} modelIndex={index} modelTemplates={modelTemplates} updateContent={updateContent} />
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
              },
              {
                value: 'circleOfFifthsLinear',
                label: t('circleOfFifthsLinear')
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
