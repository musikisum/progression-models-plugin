import { Input, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import Markdown from '@educandu/educandu/components/markdown.js';
import { sectionDisplayProps } from '@educandu/educandu/ui/default-prop-types.js';

const { TextArea } = Input;

export default function MusicPuzzleDisplay({ content }) {

  const { t } = useTranslation('musikisum/educandu-plugin-music-puzzle');

  const [abcResult, setAbcResult] = useState('');

  const handleCurrentValueChange = event => {
    // setAbcInput(event.target.value);
  };
  
  const onButtonClick = () => {
    // const playableABC = ModelComposition.abcOutput('C', 'C', '1/2=80', '1/2', []);
    // setAbcResult(playableABC);
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
        {/* <AbcSnippet playableABC={abcResult} /> */}
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
