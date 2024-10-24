import React, { useState } from 'react';
import ModelExample from './modelExample.js';
import { useTranslation } from 'react-i18next';
import { PlusOutlined } from '@ant-design/icons';
import ModelTemplates from '../model-templates.js';
import uniqueId from '@educandu/educandu/utils/unique-id.js';
import cloneDeep from '@educandu/educandu/utils/clone-deep.js';
import { Button, Select, InputNumber, Checkbox, Typography, Tooltip } from 'antd';

function Inspector({ content, updateContent }) {

  const { t } = useTranslation('musikisum/educandu-plugin-progression-models');
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
    showExample,
    example,
    invertRhythm,
    modelTemplates 
  } = content;

  const [exampleName, setExampleName] = useState(showExample ? example.name : 'default');

  const handleAddModelButtonClick = () => {
    const modelTemplate = cloneDeep(ModelTemplates.getModelTemplate('cadence'));
    modelTemplate.key = uniqueId.create();
    modelTemplates.push(modelTemplate);
    updateContent({ modelTemplates, selectedModel: 'cadence' });
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

  const onExampleSelectionChange = model => {
    if (model && model !== 'default') {
      setExampleName(model);
      const exampleTemplate = cloneDeep(ModelTemplates.getModelTemplate(model));
      updateContent({ example: exampleTemplate.example, showExample: true });
    } else {
      const defaultExample = { name: '', abc: '' };
      updateContent({ example: defaultExample, showExample: false });
    }
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

  const onInvertRhythmChange = e => {
    updateContent({ invertRhythm: e.target.checked });
  } 

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
        value: '3/4',
        label: '3/4'
      },
      {
        value: '2/4',
        label: '2/4'
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

  const getOptionsForExampleSelect = () => {
    const options = ModelTemplates.getAvailableModels.reduce((akku, modelName) => {
      const so = {
        value: modelName,
        label: t(modelName)
      }; 
      akku.push(so);
      return akku;
    }, []);
    const defaultSo = {
      value: 'default',
      label: t('modelNameSelect')
    }; 
    options.splice(0, 0, defaultSo);
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
      case 'showExampleDescription':
        return `${t('exampleTooltip')} ${showExample ? t(example.name) : t('noExample')}.`;
      case 'measurePerLine':
        return `${t('measurePerLineToolTip')}`;
      case 'tempo':
        return `${t('tempoToolTip')}`;
      case 'measure':
        return `${t('measureToolTip')}`;
      case 'transpose':
        return `${t('transposeToolTip')}`;
      case 'invertRhythm':
        return `${t('invertRhythmToolTip')}`;
      default:
        return '';
    }    
  };
  
  const createExampleSelect = () => {
    return (<div className='inspectorUnit'>
      <span className='iu-first'>&nbsp;</span>
      <Tooltip title={showTooltipText('showExampleDescription')}>
        <Select
          className='inspectorElement'
          defaultValue={exampleName}
          style={{ width: 180, marginLeft: '15px' }}
          onChange={onExampleSelectionChange}
          options={getOptionsForExampleSelect()}
          />      
      </Tooltip>
    </div>);
  };

  return (
    <div>
      {showExample ? <ModelExample selectedModel={exampleName} example={content.example} updateContent={updateContent} /> : null}
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
          <Text className='iu-first'>{t('transposeToolTip')}</Text>
          <Tooltip title={showTooltipText('transpose')}>
            <Select
              className='inspectorElement'
              style={{ width: 120 }}
              defaultValue={transposeValue}
              onChange={e => onTransposeValueChange(e)}
              options={getOptionsForKeySelect()}
              />
          </Tooltip>
        </div>
        <div className='inspectorUnit'>
          <Text className='iu-first'>{t('measureToolTip')}</Text>
          <Tooltip title={showTooltipText('measure')}>
            <Select
              className='inspectorElement'
              style={{ width: 80 }}
              defaultValue={measure ?? 'C|'}
              onChange={e => onMeasureChange(e)}
              options={getOptionsForMeasureSelect()}
              />
          </Tooltip>
        </div>
        <div className='inspectorUnit'>
          <Text className='iu-first'>
          <span>{`${t('tempoToolTip')}`}</span>
          </Text>
          <Tooltip title={showTooltipText('tempo')}>
            <InputNumber 
              className='inspectorElement'
              style={{ width: 80 }}
              min={10}
              max={180}
              step={10}
              defaultValue={tempo ?? 120}
              onChange={e => onTempoChange(e)}
              />
          </Tooltip>
        </div>
        <div className='inspectorUnit'>          
          <Text className='iu-first'>
            <span>{`${t('measurePerLineToolTip')}`}</span>
          </Text>
          <Tooltip title={showTooltipText('measurePerLine')}>
            <InputNumber
              className='inspectorElement' 
              style={{ width: 80 }}
              min={2} 
              max={10} 
              defaultValue={measuresPerLine}
              onChange={e => onNumberOfMaesuresChange(e)}
              />
          </Tooltip>
        </div>
        <div style={{ marginTop: '15px' }}>
          { createExampleSelect() }
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
        { measure === '3/4' && <div className='ui-checkBoxHorizontalLabel'>
          <Checkbox style={{ minWidth: '20px' }} checked={invertRhythm} onChange={e => onInvertRhythmChange(e)} /> 
          <Text style={{ display: 'block' }}><Tooltip title={showTooltipText('invertRhythm')}><span>{`${t('invertRhythm')}`}</span></Tooltip></Text>
        </div> }
      </div>
    </div>
  );
}

export default Inspector;