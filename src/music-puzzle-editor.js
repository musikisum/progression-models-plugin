import { Form, Button, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { PlusOutlined } from '@ant-design/icons';
import ModelTemplates from './model-templates.js';
import ModelPanel from './components/model-panel.js';
import React, { useState, useId, useRef } from 'react';
import uniqueId from '@educandu/educandu/utils/unique-id.js';
import cloneDeep from '@educandu/educandu/utils/clone-deep.js';
import { sectionEditorProps } from '@educandu/educandu/ui/default-prop-types.js';
import DragAndDropContainer from '@educandu/educandu/components/drag-and-drop-container.js';
import { swapItemsAt, removeItemAt, moveItem } from '@educandu/educandu/utils/array-utils.js';

export default function MusicPuzzleEditor({ content, onContentChanged }) {

  const { t } = useTranslation('musikisum/educandu-plugin-music-puzzle');
  const { modelTemplates } = content;
  const droppableIdRef = useRef(useId());

  const updateContent = newContentValues => {
    onContentChanged({ ...content, ...newContentValues });
  };

  const [selectedModel, setSelectedModel] = useState('cadence');

  const handleAddModelButtonClick = () => {
    if(!selectedModel) {
      return;
    }
    const modelTemplate = ModelTemplates.getModelTemplate(selectedModel);
    modelTemplate.modelKey = uniqueId.create();
    const newModelTemplates = cloneDeep(modelTemplates);
    newModelTemplates.push(modelTemplate);
    updateContent({ modelTemplates: newModelTemplates });
  };

  const handleItemMove = (fromIndex, toIndex) => {
    const newModelTemplates = moveItem(modelTemplates, fromIndex, toIndex);
    updateContent({ modelTemplates: newModelTemplates });
  };

  const handleDeleteModel = index => {
    const newModelTemplates = removeItemAt(modelTemplates, index);
    updateContent({ modelTemplates: newModelTemplates });
  };

  const handleMoveModelUp = index => {
    const newModelTemplates = swapItemsAt(modelTemplates, index, index - 1);
    updateContent({ modelTemplates: newModelTemplates });
  };

  const handleMoveModelDown = index => {
    const newModelTemplates = swapItemsAt(modelTemplates, index, index + 1);
    updateContent({ modelTemplates: newModelTemplates });
  };

  const dragAndDropItems = modelTemplates.map((modelTemplate, index, arr) => ({
    key: modelTemplate.modelKey,
    render: ({ dragHandleProps, isDragged, isOtherDragged }) => 
      (<ModelPanel 
        index={index}
        dragHandleProps={dragHandleProps}
        isDragged={isDragged} 
        isOtherDragged={isOtherDragged} 
        itemsCount={arr.length}
        canDeleteLastItem
        onMoveUp={handleMoveModelUp}
        onMoveDown={handleMoveModelDown}
        onDelete={handleDeleteModel}
        modelTemplates={modelTemplates}
        modelTemplate={modelTemplate}
        updateContent={updateContent}  
        />)
  }));

  return (
    <div className="EP_Educandu_Example_Editor">
      <Form labelAlign="left" style={{ width: '100%' }}>
        <DragAndDropContainer
          droppableId={droppableIdRef.current} 
          items={dragAndDropItems} 
          onItemMove={handleItemMove}
          />
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAddModelButtonClick}>
            {t('addModel')}
          </Button>
          <Select
            style={{ width: '200px' }}
            defaultValue="cadence"
            onChange={e => setSelectedModel(e)}
            options={[
              {
                value: 'cadence',
                label: t('cadence')
              },
              {
                value: 'circleOfFifths',
                label: t('circleOfFifths')
              },
              {
                value: 'circleOfFifthsLinear',
                label: t('circleOfFifthsLinear')
              },
              {
                value: 'fiveSixConsecutive',
                label: t('fiveSixConsecutive')
              },
              {
                value: 'parallelismusDiminished',
                label: t('parallelismusDiminished')
              },
              {
                value: 'parallelismusDown',
                label: t('parallelismusDown')
              },
              {
                value: 'parallelismusUp',
                label: t('parallelismusUp')
              },
              {
                value: 'upperFiveModulation',
                label: t('upperFiveModulation')
              },
              {
                value: 'lowerFiveModulation',
                label: t('lowerFiveModulation')
              }
            ]}
            />
        </div>
      </Form>      
    </div>
  );
}

MusicPuzzleEditor.propTypes = {
  ...sectionEditorProps
};
