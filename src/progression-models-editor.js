import { Form } from 'antd';
import React, { useId, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Inspector from './components/inspector.js';
import ModelPanel from './components/model-panel.js';
import updateValidation from './update-validation.js';
import Info from '@educandu/educandu/components/info.js';
import { FORM_ITEM_LAYOUT } from '@educandu/educandu/domain/constants.js';
import { sectionEditorProps } from '@educandu/educandu/ui/default-prop-types.js';
import ObjectWidthSlider from '@educandu/educandu/components/object-width-slider.js';
import DragAndDropContainer from '@educandu/educandu/components/drag-and-drop-container.js';
import { swapItemsAt, removeItemAt, moveItem } from '@educandu/educandu/utils/array-utils.js';

export default function ProgressionModelsEditor({ content, onContentChanged }) {

  const { t } = useTranslation('musikisum/educandu-plugin-progression-models');

  const validatedContent = updateValidation.validateContentAfterUpdates(content);
  const { modelTemplates, width } = validatedContent;

  const droppableIdRef = useRef(useId());
  
  const updateContent = newContentValues => {
    onContentChanged({ ...validatedContent, ...newContentValues });
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
        content={validatedContent}
        updateContent={updateContent}
        />)
  }));

  return (
    <div className="EP_Educandu_Progression_Models_Editor">
      <Form labelAlign="left" className='width100'>
        <Form.Item>
          {
            modelTemplates.length === 0 
              ? <div className='noModelContainer'>{t('noModel')}</div> 
              : <DragAndDropContainer
                  droppableId={droppableIdRef.current} 
                  items={dragAndDropItems} 
                  onItemMove={handleItemMove}
                  />
          }
        </Form.Item>
        <Form.Item>
          <Inspector content={validatedContent} updateContent={updateContent} />
        </Form.Item>
        <Form.Item
          className='formItemStyle'
          label={<Info tooltip={t('common:widthInfo')}>{t('common:width')}</Info>}
          {...FORM_ITEM_LAYOUT}
          >
          <ObjectWidthSlider value={width ?? 100} onChange={handleWidthChange} />
        </Form.Item>
      </Form>
    </div>
  );
}

ProgressionModelsEditor.propTypes = {
  ...sectionEditorProps
};
