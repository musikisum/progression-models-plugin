import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { Button, Collapse, Tooltip } from 'antd';

function ArrowPanel({
  index,
  voiceLabel,
  dragHandleProps,
  isDragged,
  isOtherDragged
}) {
  
  const { t } = useTranslation();

  return (
    <div className={classNames('ArrowPanel', { 'is-dragged': isDragged, 'is-other-dragged': isOtherDragged })} {...dragHandleProps}>
      {voiceLabel.text}
    </div>
  );
}

ArrowPanel.propTypes = {
  canDeleteLastItem: PropTypes.bool,
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
  voiceLabel: PropTypes.object.isRequired
};

ArrowPanel.defaultProps = {
  canDeleteLastItem: false,
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

export default ArrowPanel;
