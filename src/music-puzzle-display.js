import { Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';
import Markdown from '@educandu/educandu/components/markdown.js';
import { sectionDisplayProps } from '@educandu/educandu/ui/default-prop-types.js';

import AbcNotation from '@educandu/educandu/components/abc-notation.js';
import AbcPlayer from '@educandu/educandu/components/abc-player.js';

const menuett = `X:1
Q:120
%score [1 2]
L:1/8
M:3/4
V:1
c3/2c'/2 c'4 | (3 bag g4 | G3/2f/2 f4 | (3 edc c4 | e2 eg^fa | gd d3^d | ecBAG^F | ^F4 G2 |]
V:2 bass
z2 E,2 C,2 | z2 B,2 G,2 | z2 B,2 G,2 | z2 C2 C,2 | z2 C2 C2 | z2 B,2 B,2 | C2 D2 D,2 | G,2 D,2 G,,2 |]`;

export default function MusicPuzzleDisplay({ content }) {

  const [lastRenderResult, setLastRenderResult] = useState(null);
  const [abcInput, setAbcInput] = useState(menuett);
  const { t } = useTranslation('musikisum/educandu-plugin-music-puzzle');

  const handleCurrentValueChange = event => {
    setAbcInput(event.target.value);
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
            <Input
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
