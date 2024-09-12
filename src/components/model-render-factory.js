import React from 'react';
import PropTypes from 'prop-types';
import AbcSnippet from './abc-snippet.js';
import VoiceSwitch from './voice-switch.js';
import { useTranslation } from 'react-i18next';
import ModelProvider from '../model-provider.js';
import ModelProperties from './model-properties.js';
import ModelDescription from './model-description.js';
import ModelComposition from '../model-composition.js';
import cloneDeep from '@educandu/educandu/utils/clone-deep.js';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { Button, Select, Radio, Space, Row, Col, Typography, Switch } from 'antd';

const { Paragraph, Text } = Typography;

export default function ModelRenderFactory({ 
  index, 
  content, 
  updateContent 
}) {
  const {
    modelTemplates,
    hideUpperSystem, 
    hideLowerSystem, 
  } = content;
  
  const modelTemplate = modelTemplates[index];
  const { t } = useTranslation('musikisum/educandu-plugin-music-puzzle');

  const changeModelTemplateKey = e => {
    modelTemplates[index].modelKey = e;
    const transposible = e === 'C' || e === 'Am';
    if(index !== 0) {
      updateContent({ modelTemplates: modelTemplates });
    } else {
      updateContent({ modelTemplates: modelTemplates, isTransposible: transposible });
    }
  };

  const onArrowButtonClick = direction => {
    const voice = modelTemplates[index].radioValue;
    if(direction === 'up') {
      modelTemplates[index].transposeValues[voice] += 1;
    } else {
      modelTemplates[index].transposeValues[voice] -= 1;
    }
    updateContent({ modelTemplates: modelTemplates });
  };

  const onRadioChange = e => { 
    modelTemplates[index].radioValue = e.target.value;
    updateContent({ modelTemplates: modelTemplates }); 
  };

  const onShowDescriptionChange = e => {
    modelTemplates[index].showDescription = e;
    updateContent({ modelTemplates: modelTemplates });
  };

  const getPlayableAbcVoices = () => {
    const voiceModel = ModelProvider.getModel(modelTemplate.name);    
    let modelVoices;
    if (!hideUpperSystem && !hideLowerSystem) {
      modelVoices = voiceModel.getVoices(modelTemplate);
    } else {
      modelVoices = voiceModel.getMutedVoices(voiceModel.getVoices(modelTemplate), hideUpperSystem, hideLowerSystem);
    }
    return ModelComposition.abcOutput('C', 'C|', 120, [modelVoices]);
  }

  return (
    <div>
      <div className='container' key={index}>        
        <div className="right">
          <div>
            <Paragraph 
              className='svg-color' 
              copyable={{ text: getPlayableAbcVoices(),  tooltips: [t('abcCopyTtBevore'), t('abcCopyTtAfter')] }}
              >
              {t('abcCopy')}
            </Paragraph>
          </div>
          <div>
            <AbcSnippet playableABC={getPlayableAbcVoices()} />
          </div>
        </div>
        <div className="left">
          <Row gutter={32} type='flex' justify='space-arround'>
            <Col className='gutter-row' xs={24} sm={12} md={12} lg={8}>
              <div className='gutter-box'>
                <Text strong style={{ display: 'block', marginBottom: '10px' }}>{t('modelKey')}</Text>
                <Select 
                  style={{ minWidth: '100px' }}
                  defaultValue={modelTemplate.modelKey} 
                  options={ModelProvider.getModel(modelTemplate.name).getModelKeys().map(modelKey => ({ value: modelKey, label: t(modelKey) }))}
                  onChange={e => changeModelTemplateKey(e, index)}
                  />
                <ModelProperties index={index} modelTemplates={modelTemplates} cloneDeep={cloneDeep} updateContent={updateContent} />
                <div style={{ display: 'flex', marginTop: '15px', gap: '6px' }}>
                  <Switch 
                    size="small" 
                    checked={modelTemplate.showDescription}
                    onChange={onShowDescriptionChange}
                    />
                    <div style={{marginTop: '-4px'}}>{t('showDescription')}</div>             
                </div>
              </div>
            </Col>
            <Col className='gutter-row' xs={24} sm={12} md={12} lg={8}>
              <div className='gutter-box'>
                <Text strong style={{ display: 'block', marginBottom: '10px' }}>Transposition (8)</Text>
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
            </Col>             
            <Col className='gutter-row' xs={24} sm={12} md={12} lg={8}>
              <div className='gutter-box'>
                <Text strong style={{ display: 'block', marginBottom: '15px' }}>{t('ve')}</Text>
                <div className='dadLabel'>{t('dragAndDrop')}</div>
                <VoiceSwitch style={{ margin: '16px 0' }} modelIndex={index} modelTemplates={modelTemplates} updateContent={updateContent} />
              </div>
            </Col> 
          </Row>
        </div>   
      </div>
      <ModelDescription modelIndex={index} modelTemplates={modelTemplates} updateContent={updateContent} />
    </div>
  );
}

ModelRenderFactory.propTypes = {
  index: PropTypes.number,
  content: PropTypes.object,
  updateContent: PropTypes.func
};

ModelRenderFactory.defaultProps = {
  index: 0,
  content: null,
  updateContent: null,
};
