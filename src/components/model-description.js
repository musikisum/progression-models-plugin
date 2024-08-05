
import React from 'react';
import { Collapse } from 'antd';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const capitalizeFirstLetter = modelName => `${modelName[0].toUpperCase()}${modelName.slice(1)}`; 

function ModelDescription({
  modelIndex,
  modelTemplates,
  updateContent
}) {  
  const { t } = useTranslation('musikisum/educandu-plugin-music-puzzle');
  const modelTemplate = modelTemplates[modelIndex];
  return (
    <React.Fragment> 
      { modelTemplate.showDescription ? 
        <Collapse collapsible="icon" defaultActiveKey="panel" className='descriptionContainer'>
          <Collapse.Panel
            key="panel"
            header={<div className="ItemPanel-header">{t('showDescription')}</div>}
            >
            <div className="ItemPanel-contentWrapper">
              { !modelTemplate.customDescription 
                ? t(`defaultDescription${capitalizeFirstLetter(modelTemplate.name)}`)
                : modelTemplate.customDescription}
            </div>
          </Collapse.Panel>
        </Collapse> : null}
    </React.Fragment> 
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

