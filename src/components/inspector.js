import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PlusOutlined } from '@ant-design/icons';
import ModelTemplates from '../model-templates.js';
import uniqueId from '@educandu/educandu/utils/unique-id.js';
import cloneDeep from '@educandu/educandu/utils/clone-deep.js';
import ModelExampleProvider from '../model-example-provider.js';
import { Button, Select, InputNumber, Checkbox, Typography } from 'antd';

function Inspector({ content, updateContent }) {

  const { t } = useTranslation('musikisum/educandu-plugin-music-puzzle');
  const { Text } = Typography;
  const { 
    isTransposible, 
    transposeValue,
    tempo, 
    measure,
    measuresPerLine, 
    stretchLastLine, 
    showDescription, 
    hideUpperSystem,
    hideLowerSystem,
    showExample,
    modelTemplates 
  } = content;
  const [selectedModel, setSelectedModel] = useState('cadence');

  const handleAddModelButtonClick = () => {
    if(!selectedModel) {
      return;
    }
    const modelTemplate = cloneDeep(ModelTemplates.getModelTemplate(selectedModel));
    modelTemplate.key = uniqueId.create();
    modelTemplates.push(modelTemplate);
    updateContent({ modelTemplates });
  };

  const onTransposeValueChange = value => {
    updateContent({ transposeValue: value });
  };

  const onTempoChange = number => {
    updateContent({ tempo: number });
  };

  const onMeasureChange = event => {
    updateContent({ measure: event });
  };

  const onNumberOfMaesuresChange = number => {
    updateContent({ measuresPerLine: number });
  };

  const onStretchLastLineChange = event => {
    updateContent({ stretchLastLine: event.target.checked });
  };

  const onShowDescriptionChange = event => {
    updateContent({ showDescription: event.target.checked });
  };

  const onHideSystem = (event, direction) => {
    switch (direction) {
      case 'UPPER':
        updateContent({ hideUpperSystem: event.target.checked });
        break;
      case 'LOWER':
        updateContent({ hideLowerSystem: event.target.checked });
        break;
      default:
        break;
    }
  };

  const onShowExampleChange = event => {
    updateContent({ showExample: event.target.checked });
  };

  const getOptionsForModelSelect = () => {
    const options = ModelTemplates.getAvailableModels.reduce((akku, modelName) => {
      const so = {
        value: modelName,
        label: t(modelName)
      }; 
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
  };

  const getOptionsForKeySelect = () => {
    const values = [3, 2, 1, 0, -1, -2, -3];
    const options = values.reduce((akku, value) => {
      const so = {
        label: t(`Q${value}`),
        value
      }; 
      akku.push(so);
      return akku;
    }, []);
    return options;
  };
  
  return (
    <div>
      <div className='inspectorItemContainer'>
        <div className='inspectorUnit'>
          <span className='iu-first'>&nbsp;</span>
          <Button 
            className='inspectorElement'
            style={{ width: 180 }}
            type="primary" 
            icon={<PlusOutlined />} 
            onClick={handleAddModelButtonClick}
            >
            {t('addModel')}
          </Button>
        </div>
        <div className='inspectorUnit'>
          <Text className='iu-first'>Modell auswählen</Text>
          <Select
            className='inspectorElement'
            style={{ width: 180 }}
            defaultValue="cadence"
            onChange={e => setSelectedModel(e)}
            options={getOptionsForModelSelect()}
            />
        </div>
        <div className='inspectorUnit'>
          <Text className='iu-first'>Transponieren</Text>
          <Select
            className='inspectorElement'
            style={{ width: 120 }}
            defaultValue={transposeValue}
            disabled={!isTransposible}
            onChange={e => onTransposeValueChange(e)}
            options={getOptionsForKeySelect()}
            />
        </div>
        <div className='inspectorUnit'>
          <Text className='iu-first'>Taktart</Text>
          <Select
            className='inspectorElement'
            style={{ width: 80 }}
            defaultValue={measure ?? 'C|'}
            onChange={e => onMeasureChange(e)}
            options={getOptionsForMeasureSelect()}
            />
        </div>
        <div className='inspectorUnit'>
          <Text className='iu-first'>Tempo</Text>
          <InputNumber 
            className='inspectorElement'
            style={{ width: 80 }}
            min={10}
            max={180}
            step={10}
            defaultValue={tempo ?? 120}
            onChange={e => onTempoChange(e)}
            />
        </div>
        <div className='inspectorUnit'>
          <Text className='iu-first'>Takte / Zeile</Text>
          <InputNumber
            className='inspectorElement' 
            style={{ width: 80 }}
            min={2} 
            max={10} 
            defaultValue={measuresPerLine}
            onChange={e => onNumberOfMaesuresChange(e)}
            />
        </div>
      </div>
      <div className='inspectorItemContainer'>
        <div className='ui-displayLabel'>
          <Text strong style={{ display: 'block' }}>{t('displayLayout')}</Text>
        </div>
        <div className='ui-checkBoxHorizontalLabel'>
          <Checkbox style={{ minWidth: '20px' }} checked={stretchLastLine} onChange={e => onStretchLastLineChange(e)} /> 
          <Text style={{ display: 'block' }}>{t('stretchLastLine')}</Text>
        </div>
        <div className='ui-checkBoxHorizontalLabel'>
          <Checkbox style={{ minWidth: '20px' }} checked={showDescription} onChange={e => onShowDescriptionChange(e)} />
          <Text style={{ display: 'block' }}>{t('showDescription')}</Text>
        </div>
        <div className='ui-checkBoxHorizontalLabel'>
          <Checkbox style={{ minWidth: '20px' }} checked={hideUpperSystem} onChange={e => onHideSystem(e, 'UPPER')} />
          <Text style={{ display: 'block' }}>{t('hideUpperSystem')}</Text>
        </div>
        <div className='ui-checkBoxHorizontalLabel'>
          <Checkbox style={{ minWidth: '20px' }} checked={hideLowerSystem} onChange={e => onHideSystem(e, 'LOWER')} />
          <Text style={{ display: 'block' }}>{t('hideLowerSystem')}</Text>
        </div>
        <div className='ui-checkBoxHorizontalLabel'>
          <Checkbox style={{ minWidth: '20px' }} checked={showExample} onChange={e => onShowExampleChange(e)} />
          <Text style={{ display: 'block' }}>{t('showExample')}</Text>
        </div>        
      </div>
    </div>
  );
}

export default Inspector;