import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PlusOutlined } from '@ant-design/icons';
import ModelTemplates from '../model-templates.js';
import { Button, Select, InputNumber } from 'antd';
import uniqueId from '@educandu/educandu/utils/unique-id.js';
import cloneDeep from '@educandu/educandu/utils/clone-deep.js';

function Inspector({ content, updateContent }) {

  const { modelTemplates, measuresPerLine } = content;
  const [selectedModel, setSelectedModel] = useState('cadence');
  const { t } = useTranslation('musikisum/educandu-plugin-music-puzzle');

  const handleAddModelButtonClick = () => {
    if(!selectedModel) {
      return;
    }
    const modelTemplate = ModelTemplates.getModelTemplate(selectedModel);
    modelTemplate.modelKey = uniqueId.create();
    const newModelTemplates = cloneDeep(modelTemplates);
    newModelTemplates.push(modelTemplate);
    updateContent({ modelTemplates: newModelTemplates });
  };

  const getOptionsForModelSelect = () => {
    const options = ModelTemplates.getAvailableModels.reduce((akku, modelName) => {
      const modelOption = {
        value: modelName,
        label: t(modelName)
      } 
      akku.push(modelOption);
      return akku;
    }, []);
    return options;
  };

  const onMeasureNumberChange = number => {
    updateContent({ measuresPerLine: number });
  };
  
  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <Button className='inspectorElement' type="primary" icon={<PlusOutlined />} onClick={handleAddModelButtonClick}>
        {t('addModel')}
      </Button>
      <Select
        className='inspectorElement'
        style={{ width: '200px'}}
        defaultValue="cadence"
        onChange={e => setSelectedModel(e)}
        options={getOptionsForModelSelect()}
        />
      <InputNumber 
        style={{ width: 60 }}
        min={2} 
        max={10} 
        defaultValue={measuresPerLine}
        onChange={e => onMeasureNumberChange(e)}
        />
    </div> 
  )
}

export default Inspector;