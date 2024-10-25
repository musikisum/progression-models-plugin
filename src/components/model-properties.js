import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, InputNumber } from 'antd';
import { useTranslation } from 'react-i18next';

function ModelProperties({ index, modelTemplates, updateContent }) {

  const { t } = useTranslation('musikisum/educandu-plugin-progression-models');
  const modelTemplate = modelTemplates[index];
  const addProps = modelTemplate.addProps;

  const onChange = (e, propIndex) => {
    const keys = Object.keys(modelTemplate.addProps);
    const value = typeof e === 'number' ? e : e.target.checked;
    modelTemplate.addProps[keys[propIndex]][0] = value;
    updateContent({ modelTemplates });
  };

  function getCheck(key, value, propIndex) {
    return (
      <div key={`prop${propIndex}`}>
        <Checkbox 
          className='modelPropItem'  
          style={{ minWidth: '100px' }}         
          checked={value[0]} 
          disabled={value[1]}
          onChange={e => onChange(e, propIndex)}
          >
          {t(key)}
        </Checkbox>
      </div>
    );
  }

  function getNumber(key, value, propIndex) {
    return (
      <div key={`prop${propIndex}`} style={{ marginTop: '6px' }}>
        <span>{t(key)}</span>
        <InputNumber
          className='modelPropItem' 
          style={{ minWidth: '100px' }}
          min={1}
          max={value[1]} 
          defaultValue={value[0]}
          disabled={value[2]} 
          onChange={e => onChange(e, propIndex)}
          />        
      </div>
    );                      
  }

  return (
    <div style={{ display: 'block' }}>
      {
        addProps
          ? Object.entries(addProps).map(([key, value], propIndex) => {
            if(typeof value[0] === 'boolean') {
              return getCheck(key, value, propIndex);
            }
            return getNumber(key, value, propIndex);
          })
          : null
      }
    </div>
  );
}

ModelProperties.propTypes = {
  index: PropTypes.number,
  modelTemplates: PropTypes.array,
  updateContent: PropTypes.func
};

ModelProperties.defaultProps = {
  index: null,
  modelTemplates: [],
  updateContent: null
};

export default ModelProperties;