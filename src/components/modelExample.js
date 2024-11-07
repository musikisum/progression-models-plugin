/* eslint-disable react/jsx-closing-tag-location */
import React from 'react';
import PropTypes from 'prop-types';
import AbcSnippet from './abc-snippet.js';
import ModelTemplates from '../model-templates.js';
import InputAndPreview from '@educandu/educandu/components/input-and-preview.js';
import NeverScrollingTextArea from '@educandu/educandu/components/never-scrolling-text-area.js';

function ModelExample({ selectedModel, example, updateContent }) { 

  const handleCurrentAbcCodeChanged = event => {
    const abc = event.target.value ? event.target.value : ModelTemplates.getModelTemplate(selectedModel).example.abc;
    const newExample = {
      name: selectedModel,
      abc
    };
    updateContent({ example: newExample });
  };

  return (
    <div> 
      {selectedModel && selectedModel !== 'default'
        ? <div className='exampleContainer'>
          <InputAndPreview 
            input={<NeverScrollingTextArea minRows={6} value={example.abc} onChange={handleCurrentAbcCodeChanged} />} 
            preview={<AbcSnippet playableABC={example.abc} />} 
            />
        </div>
        : null}
    </div>
  );
}

ModelExample.propTypes = {
  selectedModel: PropTypes.string,
  example: PropTypes.object,
  updateContent: PropTypes.func
};

ModelExample.defaultProps = {
  selectedModel: '',
  example: {
    name: '',
    abc: ''
  },
  updateContent: null
};

export default ModelExample;