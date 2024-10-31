import React from 'react';
import { Collapse } from 'antd';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import MarkdownInput from '@educandu/educandu/components/markdown-input.js';

function ModelDescription({ modelIndex, modelTemplates, updateContent }) {  
  
  const { t } = useTranslation('musikisum/educandu-plugin-progression-models');
  const capitalizeFirstLetter = modelName => `${modelName[0].toUpperCase()}${modelName.slice(1)}`; 

  const modelTemplate = modelTemplates[modelIndex];

  const handleTextChanged = event => {
    modelTemplate.customDescription = event.target.value;
    updateContent({ modelTemplates });
  };

  const descriptionCollaps = (<Collapse
    collapsible="icon"
    defaultActiveKey="panel"
    className='descriptionContainer'
    items={[{
      key: 'panel',
      label: (<div className="ItemPanel-header">{t('showDescription')}</div>),
      children: (<MarkdownInput value={!modelTemplate.customDescription ? t(`defaultDescription${capitalizeFirstLetter(modelTemplate.name)}`) : modelTemplate.customDescription} onChange={handleTextChanged} />)
    }]}
    />);
  
  return (
    <div>{ modelTemplate.showDescription ? descriptionCollaps : null }</div>
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
