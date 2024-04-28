import { Input, Button } from 'antd';
import Cadence from './model-cadence.js';
import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';
import ModelComposition from './model-composition.js'; 
import CircleOfFifths from './model-circle-of-fifth.js'; 
import Markdown from '@educandu/educandu/components/markdown.js';
import { sectionDisplayProps } from '@educandu/educandu/ui/default-prop-types.js';

import AbcSnippet from './abc-snippet.js';
import ModelHelper from './model-helper.js';

const { TextArea } = Input;

const initialValue = () => {
  const cadence = new Cadence;
  const voices = cadence.getModelVoices('C', -1); 
  const abcOutput = ModelComposition.abcOutput(voices, null);
  return abcOutput;
};

export default function MusicPuzzleDisplay({ content }) {

  const { t } = useTranslation('musikisum/educandu-plugin-music-puzzle');

  const [showParts, setShowParts] = useState(true);
  const [abcResult, setAbcResult] = useState(initialValue());

  const handleCurrentValueChange = event => {
    // setAbcInput(event.target.value);
  };
  
  const onButtonClick = () => {
    const barsPerLine = null;

    const cof = new CircleOfFifths;
    const cofVoices = cof.getModelVoices('C', -1);

    const cadence = new Cadence;
    const cadVoices = cadence.getModelVoices('C', -1);
    const combi = ModelComposition.addVoice(cofVoices, cadVoices);

    const playableABC = ModelComposition.abcOutput(combi, barsPerLine);
    setAbcResult(playableABC);
  };

  // useEffect(() => {}, []);

  return (
    <div className='EP_Educandu_Example_Display'>
      <div className={`u-horizontally-centered u-width-${content.width}`}>
        <Markdown renderAnchors>{content.text}</Markdown>
        {/* <Form layout='vertical'>
          <Form.Item label={t('label')}>
            <TextArea value={abcInput} maxLength={100} onChange={handleCurrentValueChange} />
          </Form.Item>
        </Form> */}
        <AbcSnippet playableABC={abcResult} />
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
