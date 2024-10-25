import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import ModelTemplates from '../model-templates.js';
import ModelUtilities from '../model-utilities.js'; 
import ModelRenderFactory from './model-render-factory.js';
import cloneDeep from '@educandu/educandu/utils/clone-deep.js';
import { Button, Collapse, Tooltip, Select, Typography } from 'antd';
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
  content,
  updateContent
}) {

  const { t } = useTranslation('musikisum/educandu-plugin-progression-models');
  const { modelTemplates } = content;
  const modelTemplate = modelTemplates[index];
  const header = t(modelTemplate.name);

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

  const onModelSelectionChange = model => {
    const oldModelTemplate = modelTemplates[index];
    modelTemplates.splice(index, 1);
    const newModelTemplate = cloneDeep(ModelTemplates.getModelTemplate(model));
    newModelTemplate.key = oldModelTemplate.key;
    ModelUtilities.copyMatchingProperties(oldModelTemplate, newModelTemplate);
    modelTemplates.splice(index, 0, newModelTemplate);
    updateContent({ modelTemplates, selectedModel: model });
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

  const createHaeder = () => {
    return (<div className='inspectorUnit'>
      <div style={{ display: 'flex' }}>
        <Text className='iu-first' style={{ marginTop: '6px' }}>{t('selectModel')}</Text>
        <Select
          className='inspectorElement'
          style={{ width: 180, marginLeft: '15px' }}
          defaultValue={header}
          onChange={onModelSelectionChange}
          options={getOptionsForModelSelect()}
          />
      </div>
    </div>);
  };

  return (
    <Collapse collapsible="icon" className={classNames('ItemPanel', { 'is-dragged': isDragged, 'is-other-dragged': isOtherDragged })} defaultActiveKey="panel">
      <Collapse.Panel
        key="panel"
        header={<div {...dragHandleProps} className="ItemPanel-header">{createHaeder(header)}</div>}
        extra={renderActionButtons()}
        >
        <div className="ItemPanel-contentWrapper">
          <ModelRenderFactory 
            index={index} 
            content={content}
            updateContent={updateContent}
            />
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
    disabled: PropTypes.bool,
  })),
  index: PropTypes.number,
  dragHandleProps: PropTypes.object,
  isDragged: PropTypes.bool,
  isOtherDragged: PropTypes.bool,
  itemsCount: PropTypes.number,
  onDelete: PropTypes.func,
  onExtraActionButtonClick: PropTypes.func,
  onMoveDown: PropTypes.func,
  onMoveUp: PropTypes.func,
  content: PropTypes.object,
  updateContent: PropTypes.func
};

ModelPanel.defaultProps = {
  canDeleteLastItem: false,
  extraActionButtons: [],
  index: 0,
  dragHandleProps: null,
  isDragged: false,
  isOtherDragged: false,
  itemsCount: 1,
  onDelete: null,
  onExtraActionButtonClick: () => {},
  onMoveDown: null,
  onMoveUp: null,
  content: null,
  updateContent: null
};

export default ModelPanel;