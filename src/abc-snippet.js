import numberToName from './transposer.js';
import React, { useEffect, useState } from 'react';
import AbcPlayer from '@educandu/educandu/components/abc-player.js';
import AbcNotation from '@educandu/educandu/components/abc-notation.js';

function AbcSnippet({ meta, snippet, abcString }) {
  let playableABC = '';
  if (!abcString) {
    if (!meta || !snippet) {
      return <div>Es ist ein Fehler aufgetreten ...</div>;
    }
    playableABC = meta + '\n';
    const keys = Object.keys(snippet);
    keys.forEach(key => {
      playableABC += key + '\n' + snippet[key];
      playableABC += '\n';
    });
  } else {
    playableABC = abcString;
  }

  const [lastRenderResult, setLastRenderResult] = useState(null);

  return (
    <div>
      <AbcNotation abcCode={playableABC} onRender={setLastRenderResult} />
      <AbcPlayer renderResult={lastRenderResult} />
    </div>
  );
}

export default AbcSnippet;
