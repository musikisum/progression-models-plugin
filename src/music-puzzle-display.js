import { Form, Input, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';
import uniqueId from '@educandu/educandu/utils/unique-id.js';
import Markdown from '@educandu/educandu/components/markdown.js';
import { sectionDisplayProps } from '@educandu/educandu/ui/default-prop-types.js';
import { metaS, initialCadence, circleOfFifths, one2FifthModulation, finalCadence } from './phraseModels.js';
import { metaM, menuet1, menuet2, menuet3, menuet4 } from './menuets.js';

import AbcSnippet from './abc-snippet.js';
import AbcNotation from '@educandu/educandu/components/abc-notation.js';
import AbcPlayer from '@educandu/educandu/components/abc-player.js';

const { TextArea } = Input;

export default function MusicPuzzleDisplay({ content }) {
  // const testMenuet = metaM + menuet1['v1'] + menuet1['v2'];
  // const [abcInput, setAbcInput] = useState(testMenuet);
  const { t } = useTranslation('musikisum/educandu-plugin-music-puzzle');

  const compArr = [initialCadence, circleOfFifths, one2FifthModulation, finalCadence];
  const [showParts, setShowParts] = useState(true);
  const [abcResult, setAbcResult] = useState(null);

  const handleCurrentValueChange = event => {
    // setAbcInput(event.target.value);
  };

  const onButtonClick = event => {
    setShowParts(!showParts);
    let voice1 = '';
    let voice2 = '';
    let voice3 = '';
    compArr.forEach(model => {
      voice1 += model['V:1'] + ' ';
      voice2 += model['V:2'] + ' ';
      voice3 += model['V:3 bass'] + ' ';
    });
    let playableABC = metaS + '\n';
    playableABC += 'V:1\n' + voice1 + '\n';
    playableABC += 'V:2\n' + voice2 + '\n';
    playableABC += 'V:3 bass\n' + voice3 + '\n'; 
    console.log(playableABC);
    setAbcResult(playableABC);
  };

  useEffect(() => {}, []);

  return (
    <div className='EP_Educandu_Example_Display'>
      <div className={`u-horizontally-centered u-width-${content.width}`}>
        <Markdown renderAnchors>{content.text}</Markdown>
        {/* <Form layout='vertical'>
          <Form.Item label={t('label')}>
            <TextArea value={abcInput} maxLength={100} onChange={handleCurrentValueChange} />
          </Form.Item>
        </Form> */}
        {showParts 
          ? compArr.map(model => <AbcSnippet key={uniqueId.create()} meta={metaS} snippet={model} />) 
          : <AbcSnippet key={uniqueId.create()} abcString={abcResult} />}
        <Button onClick={onButtonClick}>Drückdrauf Junge ...</Button>
        {/* {abcInput ? (
          <div>
            <AbcNotation abcCode={abcInput} onRender={setLastRenderResult} />
            <AbcPlayer renderResult={lastRenderResult} />
          </div>
        ) : null} */}
      </div>
    </div>
  );
}

MusicPuzzleDisplay.propTypes = {
  ...sectionDisplayProps
};
