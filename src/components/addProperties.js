import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, InputNumber } from 'antd';
import { useTranslation } from 'react-i18next';

function AddProperties({ index, modelTemplates, cloneDeep, updateContent }) {

  const { t } = useTranslation('musikisum/educandu-plugin-music-puzzle');
  const modelTemplate = modelTemplates[index];
  const addProps = modelTemplate.addProps;

  function addPropValueIsBool(addPropValue) {
    return typeof addPropValue[0] === 'boolean';
  }

  const onChange = (e, propIndex) => {
    const newModelTemplates = cloneDeep(modelTemplates);
    const modelTemplateToUpdate = newModelTemplates[index];
    const keys = Object.keys(modelTemplateToUpdate.addProps);
    const value = typeof e === 'number' ? e : e.target.checked;
    modelTemplateToUpdate.addProps[keys[propIndex]][0] = value;
    newModelTemplates[index] = modelTemplateToUpdate;
    updateContent({ modelTemplates: newModelTemplates });
  };

  // const onInputNumberChange = (number, propIndex) => {
  //   const newModelTemplates = cloneDeep(modelTemplates);
  //   const modelTemplateToUpdate = newModelTemplates[index];
  //   const keys = Object.keys(modelTemplateToUpdate.addProps);
  //   modelTemplateToUpdate.addProps[keys[propIndex]][0] = number;
  //   newModelTemplates[index] = modelTemplateToUpdate;
  //   updateContent({ modelTemplates: newModelTemplates });
  // };

  function getCheck(key, value, propIndex) {
    return (
      <div key={`prop${propIndex}`}>
        <Checkbox 
          className='addPropItem'           
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
      <div key={`prop${propIndex}`} style={{marginTop: '6px'}}>
        <span>{t(key)}</span>
        <InputNumber
          className='addPropItem' 
          min={1} 
          max={value[1]} 
          defaultValue={value[0]} 
          onChange={e => onChange(e, propIndex)}
          />        
      </div>
    );                      
  }

  return (
    <div style={{display: 'block'}}>
      {
        addProps && Object.entries(addProps).map(([key, value], propIndex) => {
          if(addPropValueIsBool(value)) {
            return getCheck(key, value, propIndex);
          }
          return getNumber(key, value, propIndex);
        })
      }
    </div>
  );
}

AddProperties.propTypes = {
  index: PropTypes.number,
  modelTemplates: PropTypes.array,
  cloneDeep: PropTypes.func,
  updateContent: PropTypes.func
};

AddProperties.defaultProps = {
  index: null,
  modelTemplates: [],
  cloneDeep: null,
  updateContent: null
};

export default AddProperties;