import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { Button, Collapse, Tooltip } from 'antd';
import ModelRenderFactory from './model-render-factory.js';
import DeleteIcon from '@educandu/educandu/components/icons/general/delete-icon.js';
import MoveUpIcon from '@educandu/educandu/components/icons/general/move-up-icon.js';
import MoveDownIcon from '@educandu/educandu/components/icons/general/move-down-icon.js';
import { confirmDeleteItem } from '@educandu/educandu/components/confirmation-dialogs.js';

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

  const { t } = useTranslation('musikisum/educandu-plugin-music-puzzle');
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

  return (
    <Collapse collapsible="icon" className={classNames('ItemPanel', { 'is-dragged': isDragged, 'is-other-dragged': isOtherDragged })} defaultActiveKey="panel">
      <Collapse.Panel
        key="panel"
        header={<div {...dragHandleProps} className="ItemPanel-header">{header}</div>}
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
  onMoveUp: PropTypes.func,
  content: PropTypes.object
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
  onMoveUp: null,
  content: null
};

export default ModelPanel;