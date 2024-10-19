import React from 'react'
import AbcSnippet from "./abc-snippet.js";
import ModelTemplates from '../model-templates.js';
import InputAndPreview from '@educandu/educandu/components/input-and-preview.js';
import NeverScrollingTextArea from '@educandu/educandu/components/never-scrolling-text-area.js';

function ModelExample({ selectedModel, example, updateContent }) { 

  const handleCurrentAbcCodeChanged = event => {
    const abc = !!event.target.value ? event.target.value : ModelTemplates.getModelTemplate(selectedModel).example.abc;
    const newExample = {
      name: selectedModel,
      abc: abc
    };
    updateContent({ example: newExample })
  };

  return (
    <div> 
      {(selectedModel && selectedModel !== 'default') && (
        <InputAndPreview
          input={<NeverScrollingTextArea minRows={6} value={example.abc} onChange={handleCurrentAbcCodeChanged} />}
          preview={<AbcSnippet playableABC={example.abc} />} 
        />
      )}
    </div>
  );
}

export default ModelExample;