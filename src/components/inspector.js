import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PlusOutlined } from '@ant-design/icons';
import ModelTemplates from '../model-templates.js';
import { Button, Select, InputNumber, Checkbox } from 'antd';
import uniqueId from '@educandu/educandu/utils/unique-id.js';
import cloneDeep from '@educandu/educandu/utils/clone-deep.js';

function Inspector({ content, updateContent }) {

  const { t } = useTranslation('musikisum/educandu-plugin-music-puzzle');

  const { modelTemplates, measuresPerLine, measure, tempo, stretchLastLine } = content;
  const [selectedModel, setSelectedModel] = useState('cadence');

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

  const onTempoNumberChange = number => {
    updateContent({ tempo: number });
  };

  const setSelectedMeasure = event => {
    updateContent({ measure: event });
  }

  const onMeasureNumberChange = number => {
    updateContent({ measuresPerLine: number });
  };

  const onStretchLastLineChange = event => {
    updateContent({ stretchLastLine: event.target.checked });
  };

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
        className='inspectorElement'
        style={{ width: 80 }}
        min={10}
        max={180}
        step={10}
        defaultValue={tempo ?? 120}
        onChange={e => onTempoNumberChange(e)}
        />
      <InputNumber
        className='inspectorElement' 
        style={{ width: 80 }}
        min={2} 
        max={10} 
        defaultValue={measuresPerLine}
        onChange={e => onMeasureNumberChange(e)}
        />
      <Checkbox 
        style={{ minWidth: '100px' }}         
        checked={stretchLastLine} 
        onChange={e => onStretchLastLineChange(e)}
        >
        {t('stretchLastLine')}
      </Checkbox>
    </div> 
  )
}

export default Inspector;