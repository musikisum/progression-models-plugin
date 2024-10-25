import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function ArrowPanel({
  voiceLabel,
  dragHandleProps,
  isDragged,
  isOtherDragged
}) {

  return (
    <div className={classNames('ArrowPanel', { 'is-dragged': isDragged, 'is-other-dragged': isOtherDragged })} {...dragHandleProps}>
      {voiceLabel.text}
    </div>
  );
}

ArrowPanel.propTypes = {
  voiceLabel: PropTypes.object.isRequired,
  dragHandleProps: PropTypes.object,
  isDragged: PropTypes.bool,
  isOtherDragged: PropTypes.bool
};

ArrowPanel.defaultProps = {
  dragHandleProps: null,
  isDragged: false,
  isOtherDragged: false,
};

export default ArrowPanel;
