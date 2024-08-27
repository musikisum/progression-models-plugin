import { Button, Select } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PlusOutlined } from '@ant-design/icons';
import ModelTemplates from '../model-templates.js';
import uniqueId from '@educandu/educandu/utils/unique-id.js';
import cloneDeep from '@educandu/educandu/utils/clone-deep.js';

function Inspector({ content, updateContent }) {

  const { modelTemplates } = content;
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

  const getSelectOptions = () => {
    const options = ModelTemplates.getAvailableModels.reduce((akku, modelName) => {
      const modelOption = {
        value: modelName,
        label: t(modelName)
      } 
      akku.push(modelOption);
      return akku;
    }, []);
    return options;
  }
  
  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <Button type="primary" icon={<PlusOutlined />} onClick={handleAddModelButtonClick}>
        {t('addModel')}
      </Button>
      <Select
        style={{ width: '200px' }}
        defaultValue="cadence"
        onChange={e => setSelectedModel(e)}
        options={getSelectOptions()}
        />
    </div>
  )
}

export default Inspector;