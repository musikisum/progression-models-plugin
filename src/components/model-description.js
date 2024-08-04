
import React from 'react';
import { Collapse } from 'antd';
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
    <> 
      { modelTemplate.showDescription && <Collapse collapsible="icon" defaultActiveKey="panel">
          <Collapse.Panel
            key="panel"
            header={<div className="ItemPanel-header">{t(modelTemplate.name)}</div>}
            >
            <div className="ItemPanel-contentWrapper">
              { !modelTemplate.customDescription ? 
                  t(`defaultDescription${capitalizeFirstLetter(modelTemplate.name)}`) :
                  modelTemplate.customDescription
              }
            </div>
          </Collapse.Panel>
        </Collapse>
      }
    </> 
  )
}

export default ModelDescription;

