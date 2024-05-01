import { Input, Button } from 'antd';
import Cadence from './model-cadence.js';
import AbcSnippet from './abc-snippet.js';
import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';
import ModelComposition from './model-composition.js'; 
import CircleOfFifths from './model-circle-of-fifth.js'; 
import Markdown from '@educandu/educandu/components/markdown.js';
import { sectionDisplayProps } from '@educandu/educandu/ui/default-prop-types.js';
import UpperFiveModulation from './model-upper-five-modulation.js';

const { TextArea } = Input;

const initialValue = () => {
  const test = Cadence.getModelVoices('C', -1);
  return ModelComposition.abcOutput('C', 'C', [test]);
};

export default function MusicPuzzleDisplay({ content }) {

  const { t } = useTranslation('musikisum/educandu-plugin-music-puzzle');

  const [showParts, setShowParts] = useState(true);
  const [abcResult, setAbcResult] = useState(initialValue());

  const handleCurrentValueChange = event => {
    // setAbcInput(event.target.value);
  };
  
  const onButtonClick = () => {
    const cadc = Cadence.getModelVoices('C', -1);
    const cof = CircleOfFifths.getModelVoices('C', -1);
    const ufm = UpperFiveModulation.getModelVoices('G', 0);
    const cadg = Cadence.getModelVoices('G', -1);
    const playableABC = ModelComposition.abcOutput('C', 'C', [cadc, cof, ufm, cadg], 6);
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
