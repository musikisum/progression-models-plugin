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
  
  const { t } = useTranslation('musikisum/educandu-plugin-music-puzzle');

  const modelTemplate = modelTemplates[modelIndex];

  const [text, setText] = useState();

  useEffect(() => {
    const modelDescription = !modelTemplate.customDescription 
      ? t(`defaultDescription${capitalizeFirstLetter(modelTemplate.name)}`)
      : modelTemplate.customDescription;
    setText(modelDescription);
  }, []); 

  const handleTextChanged = event => {
    const newModelTemplates = cloneDeep(modelTemplates);
    newModelTemplates[modelIndex].customDescription = event.target.value;;
    updateContent({ modelTemplates: newModelTemplates });
    setText(event.target.value);
  };

  return (<div> 
    { modelTemplate.showDescription 
      ? <Collapse collapsible="icon" defaultActiveKey="panel" className='descriptionContainer'>
        <Collapse.Panel
          key="panel"
          header={<div className="ItemPanel-header">{t('showDescription')}</div>}
          >
          <MarkdownInput value={text} onChange={handleTextChanged} />
        </Collapse.Panel>
        </Collapse>
      : null }    
  </div>);
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
