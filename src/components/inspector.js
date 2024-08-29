import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PlusOutlined } from '@ant-design/icons';
import ModelTemplates from '../model-templates.js';
import { Button, Select, InputNumber } from 'antd';
import uniqueId from '@educandu/educandu/utils/unique-id.js';
import cloneDeep from '@educandu/educandu/utils/clone-deep.js';

function Inspector({ content, updateContent }) {

  const { modelTemplates, measuresPerLine, measure } = content;
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

  const onMeasureNumberChange = number => {
    updateContent({ measuresPerLine: number });
  };

  const setSelectedMeasure = event => {
    updateContent({ measure: event });
  }

  const getOptionsForModelSelect = () => {
    const options = ModelTemplates.getAvailableModels.reduce((akku, modelName) => {
      const so = {
        value: modelName,
        label: t(modelName)
      } 
      akku.push(so);
      return akku;
    }, []);
    return options;
  };

  const getOptionsForMeasureSelect = () => {
    return [
      {
        value: 'C|',
        label: '2/2'
      },
      {
        value: 'C',
        label: '4/4'
      },
      {
        value: '2/4',
        labe: ' 2/4'
      }
    ];
  }
  
  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <Button 
        className='inspectorElement'
        style={{ width: 180 }}
        type="primary" 
        icon={<PlusOutlined />} 
        onClick={handleAddModelButtonClick}>
        {t('addModel')}
      </Button>
      <Select
        className='inspectorElement'
        style={{ width: 180 }}
        defaultValue="cadence"
        onChange={e => setSelectedModel(e)}
        options={getOptionsForModelSelect()}
        />
      <Select
        className='inspectorElement'
        style={{ width: 80 }}
        defaultValue={measure ?? 'C|'}
        onChange={e => setSelectedMeasure(e)}
        options={getOptionsForMeasureSelect()}
        />
      <InputNumber 
        style={{ width: 80 }}
        min={2} 
        max={10} 
        defaultValue={measuresPerLine}
        onChange={e => onMeasureNumberChange(e)}
        />
    </div> 
  )
}

export default Inspector;