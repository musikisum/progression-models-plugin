import React, { useState } from 'react';
import AbcPlayer from '@educandu/educandu/components/abc-player.js';
import AbcNotation from '@educandu/educandu/components/abc-notation.js';

function AbcSnippet({ playableABC }) {
  
  const [lastRenderResult, setLastRenderResult] = useState();

  return (
    <div>
      <AbcNotation abcCode={playableABC} onRender={setLastRenderResult} />
      <AbcPlayer renderResult={lastRenderResult} />
    </div>
  );
}

export default AbcSnippet;
