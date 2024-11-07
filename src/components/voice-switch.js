import PropTypes from 'prop-types';
import ArrowPanel from './arrow-panel.js';
import React, { useRef, useId } from 'react';
import { useTranslation } from 'react-i18next';
import { moveItem } from '@educandu/educandu/utils/array-utils.js';
import DragAndDropContainer from '@educandu/educandu/components/drag-and-drop-container.js';

function VoiceSwitch({ modelIndex, modelTemplates, updateContent }) {

  const { t } = useTranslation('musikisum/educandu-plugin-progression-models');
  const droppableIdRef = useRef(useId());
  const modelTemplate = modelTemplates[modelIndex];

  const switchButtonsFactory = voiceArrangement => {    
    const switchButtons = voiceArrangement.reduce((akku, current) => {
      const sbItem = {};
      sbItem.key = `voice${current}`;
      sbItem.text = t(`v${current}`);
      sbItem.voiceIndex = current - 1;
      akku.push(sbItem);
      return akku;
    }, []);
    return switchButtons;
  };

  const switchButtons = switchButtonsFactory(modelTemplate.voiceArrangement);

  function renderVoiceLabels({ sb, index, dragHandleProps, isDragged, isOtherDragged }) {
    return (
      <ArrowPanel
        index={index}
        voiceLabel={sb}
        dragHandleProps={dragHandleProps}
        isDragged={isDragged}
        isOtherDragged={isOtherDragged}
        />
    );
  };
  
  const dragAndDropItems = switchButtons.map((sb, index) => ({
    key: sb.key,
    render: ({ dragHandleProps, isDragged, isOtherDragged }) => renderVoiceLabels({ sb, index, dragHandleProps, isDragged, isOtherDragged })
  }));

  const handleItemMove = (fromIndex, toIndex) => {
    const newOrder = moveItem(switchButtons, fromIndex, toIndex);
    modelTemplate.voiceArrangement = [newOrder[0].voiceIndex + 1, newOrder[1].voiceIndex + 1, newOrder[2].voiceIndex + 1];
    modelTemplates[modelIndex] = modelTemplate;
    updateContent({ modelTemplates });
  };

  return (
    <DragAndDropContainer droppableId={droppableIdRef.current} items={dragAndDropItems} onItemMove={handleItemMove}  />
  );
  
}

VoiceSwitch.propTypes = {
  modelIndex: PropTypes.number,
  modelTemplates: PropTypes.array,
  updateContent: PropTypes.func
};

VoiceSwitch.defaultProps = {
  modelIndex: 0,
  modelTemplates: [],
  updateContent: null
};

export default VoiceSwitch;
