import { Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';
import Markdown from '@educandu/educandu/components/markdown.js';
import { sectionDisplayProps } from '@educandu/educandu/ui/default-prop-types.js';
import { metaS, initialCadence, circleOfFifths, one2FifthModulation, finalCadence } from './phraseModels.js';
import { metaM,  menuet1, menuet2, menuet3, menuet4 } from './menuets.js';

import AbcNotation from '@educandu/educandu/components/abc-notation.js';
import AbcPlayer from '@educandu/educandu/components/abc-player.js';

const { TextArea } = Input;

export default function MusicPuzzleDisplay({ content }) {

  const testMenuet = metaM + menuet1['v1'] + menuet1['v2']; 

  const [lastRenderResult, setLastRenderResult] = useState(null);
  const [abcInput, setAbcInput] = useState(testMenuet);
  const { t } = useTranslation('musikisum/educandu-plugin-music-puzzle');

  const handleCurrentValueChange = event => {
    // setAbcInput(event.target.value);
  };

  useEffect(() => {
   
  }, []);

  return (
    <div className="EP_Educandu_Example_Display">
      <div className={`u-horizontally-centered u-width-${content.width}`}>
        <Markdown renderAnchors>
          {content.text}
        </Markdown>
        <Form layout="vertical">
          <Form.Item label={t('label')}>
            <TextArea
              value={abcInput}
              maxLength={100}
              onChange={handleCurrentValueChange}
              />
          </Form.Item>
        </Form>
        {abcInput
          ? <div>
            <AbcNotation abcCode={abcInput} onRender={setLastRenderResult} />
            <AbcPlayer renderResult={lastRenderResult} />
          </div>
          : null }
      </div>
    </div>
  );
}

MusicPuzzleDisplay.propTypes = {
  ...sectionDisplayProps
};
