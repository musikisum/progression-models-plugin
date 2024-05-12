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
import LowerFiveModulation from './model-lower-five-modulation.js';
import CircleOfFifthsLinear from './model-circle-of-fifth-linear.js';
import ParalelismusDiminished from './model-paralelismus-diminished.js';

const { TextArea } = Input;

const initialValue = () => {
  // const co = Cadence.getDefaultOptions();
  const m1 = Cadence.getVoices();
  const m2 = UpperFiveModulation.getVoices(UpperFiveModulation.getDefaultOptions('G')); 
  const m3 = CircleOfFifths.getVoices();
  const abc = CircleOfFifthsLinear.getDefaultOptions();
  const m4 = CircleOfFifthsLinear.getVoices();
  // const m5 = Cadence.getVoices();
  // const m6 = LowerFiveModulation.getVoices();
  const devOpt = ParalelismusDiminished.getDefaultOptions('G');
  devOpt.transposeValues = [1, 1, -1];
  devOpt.numberOfSections = 1;
  const m7 = ParalelismusDiminished.getVoices(devOpt);
  const m8 = Cadence.getVoices(Cadence.getDefaultOptions('Em'));
  const output = ModelComposition.abcOutput('C', 'C', 120, '1/2', [m4]);
  return output;
};

export default function MusicPuzzleDisplay({ content }) {

  const { t } = useTranslation('musikisum/educandu-plugin-music-puzzle');

  const [showParts, setShowParts] = useState(true);
  const [abcResult, setAbcResult] = useState(initialValue());

  const handleCurrentValueChange = event => {
    // setAbcInput(event.target.value);
  };
  
  const onButtonClick = () => {
    // const co = Cadence.getCadenceDefaultOptions();
    // co.isFinal = true;
    // const cadc = Cadence.getCadenceVoices(co);
    const cof = CircleOfFifthsLinear.getVoices(); 
    // const ufm = UpperFiveModulation.getModelVoices('G', [], []);
    // const cadg = Cadence.getModelVoices('G', [-1, -1, -2], [], false, false);
    const playableABC = ModelComposition.abcOutput('C', 'C', '1/2=80', '1/2', [cof]);
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
