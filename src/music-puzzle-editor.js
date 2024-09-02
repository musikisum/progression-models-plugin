import { Form } from 'antd';
import React, { useId, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Inspector from './components/inspector.js';
import ModelPanel from './components/model-panel.js';
import Info from '@educandu/educandu/components/info.js';
import { FORM_ITEM_LAYOUT } from '@educandu/educandu/domain/constants.js';
import { sectionEditorProps } from '@educandu/educandu/ui/default-prop-types.js';
import ObjectWidthSlider from '@educandu/educandu/components/object-width-slider.js';
import DragAndDropContainer from '@educandu/educandu/components/drag-and-drop-container.js';
import { swapItemsAt, removeItemAt, moveItem } from '@educandu/educandu/utils/array-utils.js';

export default function MusicPuzzleEditor({ content, onContentChanged }) {

  const { t } = useTranslation('musikisum/educandu-plugin-music-puzzle');

  const { modelTemplates, width } = content;
  const droppableIdRef = useRef(useId());

  const updateContent = newContentValues => {
    onContentChanged({ ...content, ...newContentValues });
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

  const handleWidthChange = value => {
    updateContent({ width: value });
  };

  const dragAndDropItems = modelTemplates.map((modelTemplate, index, arr) => ({
    key: modelTemplate.key,
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
        <Form.Item>
          <DragAndDropContainer
            droppableId={droppableIdRef.current} 
            items={dragAndDropItems} 
            onItemMove={handleItemMove}
            />
        </Form.Item>
        <Form.Item>
          <Inspector content={content} updateContent={updateContent} />
        </Form.Item>
        <Form.Item
          label={<Info tooltip={t('common:widthInfo')}>{t('common:width')}</Info>}
          {...FORM_ITEM_LAYOUT}
          >
          <ObjectWidthSlider value={width ?? 100} onChange={handleWidthChange} />
        </Form.Item>
      </Form>
    </div>
  );
}

MusicPuzzleEditor.propTypes = {
  ...sectionEditorProps
};
