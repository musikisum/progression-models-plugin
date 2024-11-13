import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AbcPlayer from '@educandu/educandu/components/abc-player.js';
import AbcNotation from '@educandu/educandu/components/abc-notation.js';

function AbcSnippet({ playableABC }) {

  const { t } = useTranslation('musikisum/educandu-plugin-progression-models');

  const musicErrorMessageHead = `X:1\nT:${t('noAbcTextU1')}\nT:${t('noAbcTextU2')}\n`;
  const musicErrorMessage = `%score [1 2 3 4 5 ]
M: 3/2
L: 1/2
Q: 1/2=120
K: Em
V:1
B e ^d | e z z | =d z z | z x x
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
E, G, F, | G, z z | "_J. S. Bach, BWV 227, Nr. 2, T. 1–4"^G, z z | z x x
w:Es ist nun nichts, nichts,`;
  
  const [lastRenderResult, setLastRenderResult] = useState();
  const abc = playableABC === 'X:' || !playableABC ? `${musicErrorMessageHead}${musicErrorMessage}` : playableABC;
  const hasMusic = lastRenderResult?.[0]?.lines.length !== 0;

  return (
    <div>
      <AbcNotation abcCode={abc} onRender={setLastRenderResult} />
      { hasMusic ? <AbcPlayer renderResult={lastRenderResult} /> : null }
    </div>
  );
}

AbcSnippet.propTypes = {
  playableABC: PropTypes.string
};

AbcSnippet.defaultProps = {
  playableABC: ''
};

export default AbcSnippet;
