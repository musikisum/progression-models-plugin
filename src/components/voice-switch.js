import { Button } from 'antd';
import ItemPanel from './item-panel.js';
import React, { useState, useRef, useId } from 'react';
import DragAndDropContainer from '@educandu/educandu/components/drag-and-drop-container.js';
import { moveItem } from '@educandu/educandu/utils/array-utils.js';

function VoiceSwitch({ switchButtons, setSwitchButtons }) {

  const droppableIdRef = useRef(useId());

  function renderVoiceLabels({ voiceLabel, index, dragHandleProps, isDragged, isOtherDragged }) {
    return (
      <ItemPanel
        index={index}
        voiceLabel={voiceLabel}
        dragHandleProps={dragHandleProps}
        isDragged={isDragged}
        isOtherDragged={isOtherDragged}
        />
    );
  };
  
  const dragAndDropItems = switchButtons.map((voiceLabel, index) => ({
    key: voiceLabel.key,
    render: ({ dragHandleProps, isDragged, isOtherDragged }) => renderVoiceLabels({ voiceLabel, index, dragHandleProps, isDragged, isOtherDragged })
  }));

  const handleItemMove = (fromIndex, toIndex) => {
    setSwitchButtons(moveItem(switchButtons, fromIndex, toIndex));
  };

  return (
    <DragAndDropContainer droppableId={droppableIdRef.current} items={dragAndDropItems} onItemMove={handleItemMove}  />
  );
  
}

export default VoiceSwitch;