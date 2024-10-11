import { Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import ModelProvider from './model-provider.js';
import Transposer from './components/transposer.js';
import React, { useEffect, useState } from 'react';
import AbcSnippet from './components/abc-snippet.js';
import ModelComposition from './model-composition.js';
import Markdown from '@educandu/educandu/components/markdown.js';
import { sectionDisplayProps } from '@educandu/educandu/ui/default-prop-types.js';
import Collapse, { COLLAPSIBLE_COLOR } from '@educandu/educandu/components/collapsible.js';

export default function MusicPuzzleDisplay({ content }) {

  const { t } = useTranslation('musikisum/educandu-plugin-progression-models');
  const { Paragraph, Text } = Typography;
  const capitalizeFirstLetter = modelName => `${modelName[0].toUpperCase()}${modelName.slice(1)}`;

  const { 
    modelTemplates, 
    measuresPerLine, 
    measure, 
    tempo, 
    stretchLastLine, 
    transposeValue, 
    showDescription,
    hideUpperSystem, 
    hideLowerSystem,
    example,
    showExample
  } = content;
 
  const [abcResult, setAbcResult] = useState('');
  const [descriptionParts, setDescriptionParts] = useState([]);

  useEffect(() => {
    if(modelTemplates.length > 0) {
      const voices = [];
      const descriptions = [];
      for (let index = 0; index < modelTemplates.length; index += 1) {
        const modelTemplate = modelTemplates[index];
        const voiceModel = ModelProvider.getModel(modelTemplate.name);
        let modelVoices;
        if (hideUpperSystem || hideLowerSystem) {
          modelVoices = voiceModel.getMutedVoices(voiceModel.getVoices(modelTemplate), hideUpperSystem, hideLowerSystem);
        } else {
          modelVoices = voiceModel.getVoices(modelTemplate);
        }
        voices.push(modelVoices);
        const text = modelTemplate.customDescription === ''
          ? t(`defaultDescription${capitalizeFirstLetter(modelTemplate.name)}`)
          : modelTemplate.customDescription; 
        descriptions.push(text);        
      }
      let playableABC = ModelComposition.getModelAbcOutput('C', measure, tempo, voices, measuresPerLine, stretchLastLine);
      if(transposeValue !== 0) {
        playableABC = Transposer.getTransposition(playableABC, transposeValue);
      }
      setAbcResult(playableABC);
      setDescriptionParts(descriptions);
    }    
  }, []);

  return (
    <div className='EP_Educandu_Example_Display'>
      <div className={`u-horizontally-centered u-width-${content.width}`}>
        <div>
          { abcResult ? <AbcSnippet playableABC={abcResult} /> : null }
        </div>
        <div style={{ width: `${example.abc === '' ? '50%' : '100%' }`, margin: 'auto' }}>
          { showExample ? <AbcSnippet playableABC={transposeValue === 0 ? example.abc : Transposer.getTransposition(example.abc, transposeValue)} /> : null }
        </div>
        <div style={{ textAlign: 'center' }}>
          { (modelTemplates.length !== 0) && <Paragraph 
            className='svg-color' 
            copyable={{ text: abcResult,  tooltips: [t('abcCopyTtBefore'), t('abcCopyTtAfter')] }}
            >
            {t('abcCopy')}
          </Paragraph> }
        </div>
        <div className='vSpacer' />
        { descriptionParts.length !== 0 && showDescription
          ? <Collapse collapsible="icon" title={t('descriptionTitle')} defaultActiveKey="panel">
              <Markdown renderAnchors className='u-horizontally-centered u-width-100'>
                {descriptionParts.reduce((akku, description) => !akku ? description : `${akku}\n\n---\n\n${description}`, '')}
              </Markdown>
            </Collapse>
          : null}
      </div>
    </div>
  );
}

MusicPuzzleDisplay.propTypes = {
  ...sectionDisplayProps
};
