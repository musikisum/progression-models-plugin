import React from 'react';
import ModelExample from './modelExample.js';
import { useTranslation } from 'react-i18next';
import { PlusOutlined } from '@ant-design/icons';
import ModelTemplates from '../model-templates.js';
import uniqueId from '@educandu/educandu/utils/unique-id.js';
import cloneDeep from '@educandu/educandu/utils/clone-deep.js';
import { Button, Select, InputNumber, Checkbox, Typography, Tooltip, Switch } from 'antd';

function Inspector({ content, updateContent }) {

  const { t } = useTranslation('musikisum/educandu-plugin-music-puzzle');
  const { Text } = Typography;
  const { 
    transposeValue,
    tempo, 
    measure,
    measuresPerLine, 
    stretchLastLine, 
    showDescription, 
    hideUpperSystem,
    hideLowerSystem,
    showExampleAndDescription,
    modelTemplates,
    selectedModel
  } = content;

  const handleAddModelButtonClick = () => {
    if(!selectedModel) {
      return;
    }
    const modelTemplate = cloneDeep(ModelTemplates.getModelTemplate(selectedModel));
    modelTemplate.key = uniqueId.create();
    modelTemplates.push(modelTemplate);
    updateContent({ modelTemplates });
  };

  const onModelSelectionChange = model => {
    // console.log('if:' content.example.name !== model || !!content.example.name)
    const newExample = (content.example.name !== model || !!content.example.name) ? ModelTemplates.getModelTemplate(model).example : content.example;
    updateContent({ selectedModel: model, example: newExample });
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

  const onShowExampleAndDescriptionChange = event => {
    updateContent({ showExampleAndDescription: event });
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

  const showTooltipText = checkboxFor => {
    switch (checkboxFor) {
      case 'stretchLastLine':
        return `${t('stretchLastLineTooltip')}`;
      case 'showDescription':
        return `${t('showDescriptionTooltip')}`;
      case 'hideUpperSystem':
        return `${t('hideUpperSystemTooltip')}`;
      case 'hideLowerSystem':
        return `${t('hideLowerSystemTooltip')}`;
      case 'showExample':
        return `${t('exampleTooltip')} ${t(selectedModel)}.`;
      default:
        return '';
    }    
  };
  
  return (
    <div>
      {showExampleAndDescription ? <ModelExample selectedModel={selectedModel} example={content.example} updateContent={updateContent} /> : null}
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
            defaultValue={selectedModel}
            onChange={onModelSelectionChange}
            options={getOptionsForModelSelect()}
            />
        </div>
        <div className='inspectorUnit'>
          <Text className='iu-first'>Transponieren</Text>
          <Select
            className='inspectorElement'
            style={{ width: 120 }}
            defaultValue={transposeValue}
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
          <Text style={{ display: 'block' }}><Tooltip title={showTooltipText('stretchLastLine')}><span>{`${t('stretchLastLine')}`}</span></Tooltip></Text>
        </div>
        <div className='ui-checkBoxHorizontalLabel'>
          <Checkbox style={{ minWidth: '20px' }} checked={showDescription} onChange={e => onShowDescriptionChange(e)} />
          <Text style={{ display: 'block' }}><Tooltip title={showTooltipText('showDescription')}><span>{`${t('showDescription')}`}</span></Tooltip></Text>
        </div>
        <div className='ui-checkBoxHorizontalLabel'>
          <Checkbox style={{ minWidth: '20px' }} checked={hideUpperSystem} onChange={e => onHideSystem(e, 'UPPER')} />
          <Text style={{ display: 'block' }}><Tooltip title={showTooltipText('hideUpperSystem')}><span>{`${t('hideUpperSystem')}`}</span></Tooltip></Text>
        </div>
        <div className='ui-checkBoxHorizontalLabel'>
          <Checkbox style={{ minWidth: '20px' }} checked={hideLowerSystem} onChange={e => onHideSystem(e, 'LOWER')} />
          <Text style={{ display: 'block' }}><Tooltip title={showTooltipText('hideLowerSystem')}><span>{`${t('hideLowerSystem')}`}</span></Tooltip></Text>
        </div>
        <div style={{ display: 'flex', marginTop: '15px', gap: '6px' }}>
          <Switch 
            style={{ marginTop: '3px' }}
            size="small" 
            checked={showExampleAndDescription}
            onChange={onShowExampleAndDescriptionChange}
            />
          <Text style={{ display: 'block' }}><Tooltip title={showTooltipText('showExample')}><span>{`${t('showExample')}`}</span></Tooltip></Text>
        </div>
      </div>
    </div>
  );
}

export default Inspector;