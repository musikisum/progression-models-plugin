import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, InputNumber } from 'antd';
import { useTranslation } from 'react-i18next';

function AddProperties({ index, modelTemplates, cloneDeep, updateContent }) {

  const { t } = useTranslation('musikisum/educandu-plugin-music-puzzle');
  const addProps = modelTemplates[index].addProps;

  function addPropValueIsBool(addPropValue) {
    return !(typeof addPropValue === 'number' && Number.isFinite(addPropValue));
  }

  const onCheckboxChange = (e, propIndex) => {
    const newModelTemplates = cloneDeep(modelTemplates);
    const modelTemplateToUpdate = newModelTemplates[index];
    const keyValuePairs = Object.entries(modelTemplateToUpdate.addProps);
    modelTemplateToUpdate.addProps[keyValuePairs[propIndex][0]] = e.target.checked;
    newModelTemplates[index] = modelTemplateToUpdate;
    updateContent({ modelTemplates: newModelTemplates });
  };

  const onInputNumberChange = (value, propIndex) => {
    const newModelTemplates = cloneDeep(modelTemplates);
    const modelTemplateToUpdate = newModelTemplates[index];
    const keyValuePairs = Object.entries(modelTemplateToUpdate.addProps);
    modelTemplateToUpdate.addProps[keyValuePairs[propIndex][0]] = value;
    console.log(modelTemplateToUpdate);
    newModelTemplates[index] = modelTemplateToUpdate;
    updateContent({ modelTemplates: newModelTemplates });
  };

  function getCheck(key, value, propIndex) {
    return (
      <Checkbox 
        className='addPropItem' 
        key={`prop${propIndex}`} 
        checked={value} 
        onChange={e => onCheckboxChange(e, propIndex)}
        >
        {t(key)}
      </Checkbox>
    );
  }

  function getNumber(key, value, propIndex) {
    return (
      <div key={`prop${propIndex}`}>
        <InputNumber
          style={{ width: '50px', marginRight: '6px' }}            
          className='addPropItem' 
          min={1} 
          max={value} 
          defaultValue={value} 
          onChange={e => onInputNumberChange(e, index, propIndex)}
          />
        <span>{t(key)}</span>
      </div>
    );                      
  }

  return (
    <div>
      {
        Object.entries(addProps).map(([key, value], propIndex) => {
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