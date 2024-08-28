import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AbcSnippet from '../abc-snippet.js';
import VoiceSwitch from './voice-switch.js';
import { useTranslation } from 'react-i18next';
import ModelProperties from './model-properties.js';
import ModelDescription from './model-description.js';
import ModelComposition from '../model-composition.js';
import ModelProvider from '../models/model-provider.js';
import cloneDeep from '@educandu/educandu/utils/clone-deep.js';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { Button, Select, Radio, Space, Row, Col, Typography, Checkbox } from 'antd';

const { Text } = Typography;

export default function ModelRenderFactory({ index, modelTemplates, modelTemplate, updateContent }) {

  const { t } = useTranslation('musikisum/educandu-plugin-music-puzzle');

  const changeModelTemplateKey = e => {
    const newModelTemplates = cloneDeep(modelTemplates);
    newModelTemplates[index].key = e;
    updateContent({ modelTemplates: newModelTemplates });
  };

  const onArrowButtonClick = direction => {
    const newModelTemplates = cloneDeep(modelTemplates);
    const voice = newModelTemplates[index].radioValue;
    if(direction === 'up') {
      newModelTemplates[index].transposeValues[voice] += 1;
    } else {
      newModelTemplates[index].transposeValues[voice] -= 1;
    }
    updateContent({ modelTemplates: newModelTemplates });
  };

  const onRadioChange = e => { 
    const newModelTemplates = cloneDeep(modelTemplates);
    newModelTemplates[index].radioValue = e.target.value;
    updateContent({ modelTemplates: newModelTemplates }); 
  };

  const onShowDescriptionChange = e => {
    const newModelTemplates = cloneDeep(modelTemplates);
    newModelTemplates[index].showDescription = e.target.checked;
    updateContent({ modelTemplates: newModelTemplates });
  };  
  
  return (
    <div>
      <div className='container' key={index}>
        <div className="left">
          <Row gutter={32} type='flex' justify='space-arround'>
            <Col className='gutter-row' xs={24} sm={12} md={12} lg={8}>
              <div className='gutter-box'>
                <Text strong style={{ display: 'block', marginBottom: '10px' }}>{t('key')}</Text>
                <Select 
                  style={{ minWidth: '100px' }}
                  defaultValue={modelTemplate.key} 
                  options={ModelProvider.getModel(modelTemplate.name).getModelKeys().map(key => ({ value: key, label: t(key) }))}
                  onChange={e => changeModelTemplateKey(e, index)}
                  />
                <ModelProperties index={index} modelTemplates={modelTemplates} cloneDeep={cloneDeep} updateContent={updateContent} />
                <Checkbox 
                  className='addPropItem'           
                  checked={modelTemplate.showDescription} 
                  onChange={e => onShowDescriptionChange(e, index)}
                  >
                  {t('showDescription')}
                </Checkbox>
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
                <Text strong style={{ display: 'block', marginBottom: '10px' }}>{t('ve')}</Text>
                <div className='dadLabel'>Bitte ziehen ...</div>
                <VoiceSwitch style={{ margin: '16px 0' }} modelIndex={index} modelTemplates={modelTemplates} updateContent={updateContent} />
              </div>
            </Col> 
          </Row>
        </div>
        <div className="right">
          <div>
            <AbcSnippet 
              playableABC={
                ModelComposition.abcOutput('C', 'C', 120, '1/2', [
                  ModelProvider
                    .getModel(modelTemplate.name)
                    .getVoices(modelTemplate)
                ])
              }
              />
          </div>
        </div>      
      </div>
      <ModelDescription modelIndex={index} modelTemplates={modelTemplates} updateContent={updateContent} />
    </div>
  );
}

ModelRenderFactory.propTypes = {
  index: PropTypes.number,
  modelTemplates: PropTypes.array,
  modelTemplate: PropTypes.object,
  updateContent: PropTypes.func
};

ModelRenderFactory.defaultProps = {
  index: 0,
  modelTemplates: [],
  updateContent: null,
  modelTemplate: { name: null }
};