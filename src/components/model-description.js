import { Collapse } from 'antd';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';
import cloneDeep from '@educandu/educandu/utils/clone-deep.js';
import MarkdownInput from '@educandu/educandu/components/markdown-input.js';

const capitalizeFirstLetter = modelName => `${modelName[0].toUpperCase()}${modelName.slice(1)}`; 

function ModelDescription({
  modelIndex,
  modelTemplates,
  updateContent
}) {  
  
  const { t } = useTranslation('musikisum/educandu-plugin-progression-models');

  const modelTemplate = modelTemplates[modelIndex];

  const handleTextChanged = event => {
    modelTemplate.customDescription = event.target.value;
    updateContent({ modelTemplates });
    setText(event.target.value);
  };

  return (
    <div> 
      { modelTemplate.showDescription 
        ? <Collapse collapsible="icon" defaultActiveKey="panel" className='descriptionContainer'>
          <Collapse.Panel
            key="panel"
            header={<div className="ItemPanel-header">{t('showDescription')}</div>}
            >
            <MarkdownInput value={!modelTemplate.customDescription ? t(`defaultDescription${capitalizeFirstLetter(modelTemplate.name)}`) : modelTemplate.customDescription} onChange={handleTextChanged} />
          </Collapse.Panel>
          </Collapse>
        : null }    
    </div>
  );
}
ModelDescription.propTypes = {
  modelIndex: PropTypes.number,
  modelTemplates: PropTypes.array,
  updateContent: PropTypes.func
};

ModelDescription.defaultProps = {
  modelIndex: 0,
  modelTemplates: [],
  updateContent: null
};

export default ModelDescription;
