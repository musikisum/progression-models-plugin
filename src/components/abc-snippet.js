import React, { useState } from 'react';
import AbcPlayer from '@educandu/educandu/components/abc-player.js';
import AbcNotation from '@educandu/educandu/components/abc-notation.js';

const errorMessage = `X:1
T: Sorry und Entschuldigung, ...
%score [1 2 3 4 5]
M: 3/2
L: 1/2
Q: 1/2=120
K: Em
V:1
"^...beim Erstellen dieses Beispiels ist leider ein Fehler aufgetreten!"B e ^d | e z z | =d z z | z x x
w:Es ist nun nichts, nichts,
V:2
G B A | B z z | B z z | z x x
w:Es ist nun nichts, nichts,
V:3
E E F | E z z | E z z | z x x
w:Es ist nun nichts, nichts,
V:4
[K:treble-8] B B c | B z z | B z z | z x x
w:Es ist nun nichts, nichts,
V:5 bass
E, G, F, | G, z z | "_aus: J. S. Bach, BWV 227, NR. 2, T. 1–4"^G, z z | z x x
w:Es ist nun nichts, nichts,`;

function AbcSnippet({ playableABC }) {
  
  const [lastRenderResult, setLastRenderResult] = useState();
  const abc = playableABC || errorMessage;
  const isPlayable = abc === errorMessage || !!playableABC;
  

  return (
    <div>
      <AbcNotation abcCode={playableABC || errorMessage} onRender={setLastRenderResult} />
      { isPlayable && <AbcPlayer renderResult={lastRenderResult} /> }
    </div>
  );
}

export default AbcSnippet;
