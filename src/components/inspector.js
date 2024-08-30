import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { PlusOutlined } from '@ant-design/icons';
import ModelTemplates from '../model-templates.js';
import { Button, Select, InputNumber, Checkbox } from 'antd';
import uniqueId from '@educandu/educandu/utils/unique-id.js';
import cloneDeep from '@educandu/educandu/utils/clone-deep.js';

function Inspector({ content, updateContent }) {

  const { t } = useTranslation('musikisum/educandu-plugin-music-puzzle');

  const { modelTemplates, measuresPerLine, measure, tempo, stretchLastLine, isTransposible, transposeValue, showDescription } = content;
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

  const onKeyChange = key => {
    updateContent({ transposeValue: key });
  }

  const onTempoChange = number => {
    updateContent({ tempo: number });
  };

  const onMeasureChange = event => {
    updateContent({ measure: event });
  }

  const onNumberOfMaesuresChange = number => {
    updateContent({ measuresPerLine: number });
  };

  const onStretchLastLineChange = event => {
    updateContent({ stretchLastLine: event.target.checked });
  };

  const onShowDescriptionChange = event => {
    updateContent({ showDescription: event.target.checked });
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

  const getOptionsForKeySelect = () => {
    const values = [3, 2, 1, 0, -1, -2, -3];
    const options = values.reduce((akku, value) => {
      const so = {
        label: t(`Q${value}`),
        value: value
      } 
      akku.push(so);
      return akku;
    }, []);
    return options;
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
        style={{ width: 120 }}
        defaultValue={transposeValue}
        disabled={!isTransposible}
        onChange={e => onKeyChange(e)}
        options={getOptionsForKeySelect()}
        />
      <Select
        className='inspectorElement'
        style={{ width: 80 }}
        defaultValue={measure ?? 'C|'}
        onChange={e => onMeasureChange(e)}
        options={getOptionsForMeasureSelect()}
        />
      <InputNumber 
        className='inspectorElement'
        style={{ width: 80 }}
        min={10}
        max={180}
        step={10}
        defaultValue={tempo ?? 120}
        onChange={e => onTempoChange(e)}
        />
      <InputNumber
        className='inspectorElement' 
        style={{ width: 80 }}
        min={2} 
        max={10} 
        defaultValue={measuresPerLine}
        onChange={e => onNumberOfMaesuresChange(e)}
        />
      <Checkbox 
        style={{ minWidth: '100px' }}         
        checked={stretchLastLine} 
        onChange={e => onStretchLastLineChange(e)}
        >
        {t('stretchLastLine')}
      </Checkbox>
      <Checkbox 
        style={{ minWidth: '100px' }}      
        checked={showDescription} 
        onChange={e => onShowDescriptionChange(e)}
        >
        {'push'}
      </Checkbox>
    </div> 
  )
}

export default Inspector;