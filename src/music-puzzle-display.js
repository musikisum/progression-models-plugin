import { Input, Button } from 'antd';
import Cadence from './models/model-cadence.js';
import AbcSnippet from './abc-snippet.js';
import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';
import ModelComposition from './model-composition.js'; 
import CircleOfFifths from './models/model-circle-of-fifths.js'; 
import Markdown from '@educandu/educandu/components/markdown.js';
import FiveSixConsecutive from './models/model-five-six-consecutive.js';
import UpperFiveModulation from './models/model-upper-five-modulation.js';
import LowerFiveModulation from './models/model-lower-five-modulation.js';
import CircleOfFifthsLinear from './models/model-circle-of-fifths-linear.js';
import ParalelismusDiminished from './models/model-paralelismus-diminished.js';
import { sectionDisplayProps } from '@educandu/educandu/ui/default-prop-types.js';

const { TextArea } = Input;

const initialValue = () => {
  const co = Cadence.getDefaultOptions('Bb');
  co.transposeValues = [0, 0, -1];
  co.isFinal = true;
  const m1 = Cadence.getVoices(co);
  const m2do = UpperFiveModulation.getDefaultOptions();
  const m2 = UpperFiveModulation.getVoices(m2do);
  const test1 = CircleOfFifths.getDefaultOptions('C');
  const m3 = CircleOfFifths.getVoices(test1);
  // const m4 = CircleOfFifthsLinear.getVoices();
  // const m6gdf = LowerFiveModulation.getDefaultOptions('Fm');
  // m6gdf.changeMode = true;
  // const m6 = LowerFiveModulation.getVoices(m6gdf);
  const zick = ParalelismusDiminished.getDefaultOptions('F#m');
  zick.numberOfSections = 3;
  const m7 = ParalelismusDiminished.getVoices(zick);
  // const m8opt = Cadence.getDefaultOptions('F');
  // m8opt.transposeValues = [-1, -1, -1];
  // const m8 = Cadence.getVoices(m8opt);
  const m8Opt = FiveSixConsecutive.getDefaultOptions('C');
  m8Opt.partLength = 6;
  m8Opt.partToBegin = 4;
  const m8 = FiveSixConsecutive.getVoices(m8Opt); 
  const output = ModelComposition.abcOutput('C', 'C', 120, '1/2', [m8, m1]);
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
