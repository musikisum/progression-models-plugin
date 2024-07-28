import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AbcSnippet from '../abc-snippet.js';
import VoiceSwitch from './voice-switch.js';
import { useTranslation } from 'react-i18next';
import AddProperties from './addProperties.js';
import ModelComposition from '../model-composition.js';
import ModelProvider from '../models/model-provider.js';
import cloneDeep from '@educandu/educandu/utils/clone-deep.js';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { Button, Collapse, Tooltip, Select, Radio, Space, Row, Col, Typography } from 'antd';
import DeleteIcon from '@educandu/educandu/components/icons/general/delete-icon.js';
import MoveUpIcon from '@educandu/educandu/components/icons/general/move-up-icon.js';
import MoveDownIcon from '@educandu/educandu/components/icons/general/move-down-icon.js';
import { confirmDeleteItem } from '@educandu/educandu/components/confirmation-dialogs.js';

const { Text } = Typography;

function ModelPanel({
  index,
  dragHandleProps,
  isDragged,
  isOtherDragged,
  itemsCount,
  canDeleteLastItem,
  extraActionButtons,
  onMoveUp,
  onMoveDown,
  onDelete,
  onExtraActionButtonClick,
  modelTemplates,
  modelTemplate,
  updateContent
}) {

  const { t } = useTranslation('musikisum/educandu-plugin-music-puzzle');
  const header = t(modelTemplate.name);

  const changeModelTemplateKey = (e, index) => {
    const newModelTemplates = cloneDeep(modelTemplates);
    const modelTemplateToUpdate = newModelTemplates[index];
    modelTemplateToUpdate.key = e;
    newModelTemplates[index] = modelTemplateToUpdate;
    updateContent({ modelTemplates: newModelTemplates });
  };

  const onArrowButtonClick = (direction, index) => {
    const newModelTemplates = cloneDeep(modelTemplates);
    const modelTemplateToUpdate = newModelTemplates[index];
    const voice = modelTemplateToUpdate.radioValue;
    if(direction === 'up') {
      modelTemplateToUpdate.transposeValues[voice] += 1;
    } else {
      modelTemplateToUpdate.transposeValues[voice] -= 1;
    }
    newModelTemplates[index] = modelTemplateToUpdate;
    updateContent({ modelTemplates: newModelTemplates });
  };

  const onRadioChange = (e, index) => { 
    const newModelTemplates = cloneDeep(modelTemplates);
    const modelTemplateToUpdate = newModelTemplates[index];
    modelTemplateToUpdate.radioValue = e.target.value;
    newModelTemplates[index] = modelTemplateToUpdate;
    updateContent({ modelTemplates: newModelTemplates }); 
  };

  const renderModel = () => (
    <div className='container' key={index}>
      <div className="left">
        <Row gutter={32} type='flex' justify='space-arround'>
          <Col className='gutter-row'  xs={24} sm={12} md={12} lg={8}>
            <div className='gutter-box'>
            <Text strong style={{display: 'block', marginBottom: '10px'}}>Tonart</Text>
            <Select 
              style={{width: '100px'}}
              defaultValue={modelTemplate.key} 
              options={ModelProvider.getModel(modelTemplate.name).getModelKeys().map(key => ({ value: key, label: key }))}
              onChange={e => changeModelTemplateKey(e, index)}
              />
              <AddProperties index={index} modelTemplates={modelTemplates} cloneDeep={cloneDeep} updateContent={updateContent} />
            </div>
          </Col>
          <Col className='gutter-row' xs={24} sm={12} md={12} lg={8}>
            <div className='gutter-box'>
              <Text strong style={{display: 'block', marginBottom: '10px'}}>Transposition (8)</Text>
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
              <Text strong style={{display: 'block', marginBottom: '10px'}}>Stimmtausch</Text>
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
    </div>);

  const handleActionButtonWrapperClick = (event, actionButton) => {
    if (actionButton.disabled) {
      event.stopPropagation();
    }
  };

  const handleActionButtonClick = (event, actionButton) => {
    event.stopPropagation();

    switch (actionButton.key) {
      case 'moveUp':
        return onMoveUp(index);
      case 'moveDown':
        return onMoveDown(index);
      case 'delete':
        return confirmDeleteItem(t, header, () => onDelete(index));
      default:
        return onExtraActionButtonClick(actionButton.key);
    }
  };

  const actionButtons = [];
  if (onMoveUp) {
    actionButtons.push({
      key: 'moveUp',
      title: null,
      icon: <MoveUpIcon />,
      disabled: index === 0
    });
  }
  if (onMoveDown) {
    actionButtons.push({
      key: 'moveDown',
      title: null,
      icon: <MoveDownIcon />,
      disabled: index === itemsCount - 1
    });
  }
  if (onDelete) {
    const isDeleteDisabled = !canDeleteLastItem && itemsCount <= 1;
    actionButtons.push({
      key: 'delete',
      title: t('common:delete'),
      icon: <DeleteIcon />,
      danger: !isDeleteDisabled,
      disabled: isDeleteDisabled
    });
  }

  actionButtons.push(...extraActionButtons);

  const renderActionButtons = () => {
    if (!actionButtons.length) {
      return null;
    }
    return (
      <div className="ItemPanel-actionButtons">
        {actionButtons.map(actionButton => (
          <div key={actionButton.key} onClick={event => handleActionButtonWrapperClick(event, actionButton)}>
            <Tooltip title={actionButton.title}>
              <Button
                type="text"
                size="small"
                icon={actionButton.icon}
                disabled={actionButton.disabled}
                className={classNames('u-action-button', { 'u-danger-action-button': actionButton.danger })}
                onClick={event => handleActionButtonClick(event, actionButton)}
                />
            </Tooltip>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Collapse collapsible="icon" className={classNames('ItemPanel', { 'is-dragged': isDragged, 'is-other-dragged': isOtherDragged })} defaultActiveKey="panel">
      <Collapse.Panel
        key="panel"
        header={<div {...dragHandleProps} className="ItemPanel-header">{header}</div>}
        extra={renderActionButtons()}
        >
        <div className="ItemPanel-contentWrapper">
          {renderModel()}
        </div>
      </Collapse.Panel>
    </Collapse>
  );
}

ModelPanel.propTypes = {
  canDeleteLastItem: PropTypes.bool,
  extraActionButtons: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    icon: PropTypes.node,
    danger: PropTypes.bool,
    disabled: PropTypes.bool
  })),
  header: PropTypes.string,
  index: PropTypes.number,
  dragHandleProps: PropTypes.object,
  isDragged: PropTypes.bool,
  isOtherDragged: PropTypes.bool,
  itemsCount: PropTypes.number,
  onDelete: PropTypes.func,
  onExtraActionButtonClick: PropTypes.func,
  onMoveDown: PropTypes.func,
  onMoveUp: PropTypes.func
};

ModelPanel.defaultProps = {
  canDeleteLastItem: false,
  extraActionButtons: [],
  header: '',
  index: 0,
  dragHandleProps: null,
  isDragged: false,
  isOtherDragged: false,
  itemsCount: 1,
  onDelete: null,
  onExtraActionButtonClick: () => {},
  onMoveDown: null,
  onMoveUp: null
};

export default ModelPanel;