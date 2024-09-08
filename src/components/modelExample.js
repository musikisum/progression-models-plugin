import React from 'react'
import AbcSnippet from "../abc-snippet.js";
import ModelExampleProvider from "../model-example-provider.js";

function ModelExample({ name }) {
  const example = ModelExampleProvider.getModelExample(name);
  return (
    <div> 
      {example.abc && <AbcSnippet playableABC={example.abc} /> }
    </div>
  )
}

export default ModelExample;