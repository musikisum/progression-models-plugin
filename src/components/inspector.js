/* eslint-disable react/jsx-closing-tag-location */
import PropTypes from 'prop-types';
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
    withTies,
    showExample,
    example,
    invertRhythm,
    modelTemplates
  } = content;

  const [exampleName, setExampleName] = useState(showExample ? example.name : 'default');
  const cancelUpbeat = modelTemplates[0]?.name === 'ariaDiFiorenza';

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
    const tripleMeters = ['3/2', '3/4', '3/8','6/8'];
    const value = invertRhythm && tripleMeters.includes(event);
    updateContent({ measure: event, withTies: false, invertRhythm: value });
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

  const onWithTiesChange = event => {
    updateContent({ withTies: event.target.checked });
  };

  const onInvertRhythmChange = e => {
    updateContent({ invertRhythm: e.target.checked });
  };

  const getOptionsForMeasureSelect = () => {
    return [
      {
        value: 'C|',
        label: '2/2'
      },
      {
        value: '3/2',
        label: '3/2'
      },
      {
        value: 'C',
        label: '4/4'
      },
      {
        value: '2/4',
        label: '2/4'
      },
      {
        value: '3/4',
        label: '3/4'
      },
      {
        value: '3/8',
        label: '3/8'
      },
      {
        value: '6/8',
        label: '6/8'
      },
      {
        value: '1/1',
        label: '1/1'
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
      case 'withTies':
        return `${t('withTiesToolTip')}`;
      case 'cancelUpbeat':
        return `${t('cancelUpbeatToolTip')}`;
      default:
        return '';
    }    
  };
  
  const createExampleSelect = () => {
    return (<div className='inspectorUnit elementWidth'>
      <Tooltip title={showTooltipText('showExampleDescription')}>
        <Select
          className='inspectorSelect'
          defaultValue={exampleName}
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
          <Button 
            className='inspectorElement elementWidth'
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
              value={transposeValue}
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
              value={measure ?? 'C|'}
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
              value={tempo ?? 120}
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
              value={measuresPerLine}
              onChange={e => onNumberOfMaesuresChange(e)}
              />
          </Tooltip>
        </div>
        <div>
          { createExampleSelect() }
        </div>
      </div>
      <div className='inspectorItemContainer pt30'>
        <div className='ui-displayLabel'>
          <Text strong style={{ display: 'block' }}>{t('displayLayout')}</Text>
        </div>
        <Checkbox checked={showDescription} onChange={e => onShowDescriptionChange(e)}>
          <Tooltip title={showTooltipText('showDescription')}><span>{`${t('showDescription')}`}</span></Tooltip>
        </Checkbox>
        <Checkbox checked={stretchLastLine} onChange={e => onStretchLastLineChange(e)}> 
          <Tooltip title={showTooltipText('stretchLastLine')}><span>{`${t('stretchLastLine')}`}</span></Tooltip>
        </Checkbox>        
        <Checkbox checked={hideUpperSystem} onChange={e => onHideSystem(e, 'UPPER')}>
          <Tooltip title={showTooltipText('hideUpperSystem')}><span>{`${t('hideUpperSystem')}`}</span></Tooltip>
        </Checkbox>
        <Checkbox checked={hideLowerSystem} onChange={e => onHideSystem(e, 'LOWER')}>
          <Tooltip title={showTooltipText('hideLowerSystem')}><span>{`${t('hideLowerSystem')}`}</span></Tooltip>
        </Checkbox>
        { (measure === 'C|' || measure === 'C' || measure === '2/4') && (
          <Checkbox checked={withTies} onChange={e => onWithTiesChange(e)}>
            <Tooltip title={showTooltipText('withTies')}><span>&#9833; &#9833; &#129062; &#119134;</span></Tooltip>
          </Checkbox>)}
        { (measure === '3/2' || measure === '3/4' || measure === '3/8') && ( 
          <Checkbox checked={invertRhythm} onChange={e => onInvertRhythmChange(e)}> 
            <Tooltip title={showTooltipText('invertRhythm')}><span>{`${t('invertRhythm')}`}</span></Tooltip>
          </Checkbox>)}
        { (cancelUpbeat
          ? <Text className='iu-first'>
            <Tooltip title={showTooltipText('cancelUpbeat')}><span>{`${t('cancelUpbeat')}`}</span></Tooltip>
          </Text>
          : null)}
      </div>
    </div>
  );
}

Inspector.propTypes = {
  content: PropTypes.shape({
    transposeValue: PropTypes.number,
    tempo: PropTypes.number, 
    measure: PropTypes.string,
    measuresPerLine: PropTypes.number, 
    stretchLastLine: PropTypes.bool, 
    showDescription: PropTypes.bool, 
    hideUpperSystem: PropTypes.bool,
    hideLowerSystem: PropTypes.bool,
    withTies: PropTypes.bool,
    showExample: PropTypes.bool,
    example: PropTypes.shape({
      name: PropTypes.string,
      abc: PropTypes.string
    }),
    invertRhythm: PropTypes.bool,
    modelTemplates: PropTypes.array
  }),
  updateContent: PropTypes.func
};

Inspector.defaultProps = {
  content: {
    transposeValue: 0,
    tempo: 120, 
    measure: 'C|',
    measuresPerLine: 6, 
    stretchLastLine: false, 
    showDescription: false, 
    hideUpperSystem: false,
    hideLowerSystem: false,
    withTies: false,
    showExample: false,
    example: {
      name: '',
      abc: ''
    },
    invertRhythm: false,
    modelTemplates: []
  },
  updateContent: null
};

export default Inspector;