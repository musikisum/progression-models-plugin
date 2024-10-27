import { Typography, Divider } from 'antd';
import { useTranslation } from 'react-i18next';
import ModelProvider from './model-provider.js';
import React, { useEffect, useState } from 'react';
import Transposer from './components/transposer.js';
import AbcSnippet from './components/abc-snippet.js';
import ModelComposition from './model-composition.js';
import Markdown from '@educandu/educandu/components/markdown.js';
import { sectionDisplayProps } from '@educandu/educandu/ui/default-prop-types.js';
import Collapse, { COLLAPSIBLE_COLOR } from '@educandu/educandu/components/collapsible.js';

export default function MusicPuzzleDisplay({ content }) {

  const { t } = useTranslation('musikisum/educandu-plugin-progression-models');
  const { Paragraph } = Typography;
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
    invertRhythm,
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
        const modelObj = ModelProvider.getModel(modelTemplate.name).getVoices(modelTemplate);
        voices.push(modelObj);
        const text = modelTemplate.customDescription === ''
          ? t(`defaultDescription${capitalizeFirstLetter(modelTemplate.name)}`)
          : modelTemplate.customDescription;           
        descriptions.push(!descriptions.includes(text) ? text : `zum Satzmodell ${t(modelTemplate.name)} s.o.`); // TODO übersetzen       
      }
      let playableABC = ModelComposition.getCompositionAbcOutput('C', measure, tempo, voices, measuresPerLine, stretchLastLine, invertRhythm, hideUpperSystem, hideLowerSystem);
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
        <div style={{ textAlign: 'center' }}>
          { (modelTemplates.length !== 0) && <Paragraph 
            className='svg-color' 
            copyable={{ text: abcResult,  tooltips: [t('abcCopyTtBefore'), t('abcCopyTtAfter')] }}
            >
            {t('abcCopy')}
          </Paragraph> }
        </div>
        { showExample && <Divider orientation="right" plain>
          {`${t('showExampleDescription')}: ${t(example.name)}`}
          </Divider> 
        }
        <div style={{ width: `${example.abc === '' ? '50%' : '100%' }`, margin: 'auto' }}>
          { showExample && <AbcSnippet playableABC={ example.abc } /> }
        </div>
        <div style={{ textAlign: 'center' }}>
          { showExample && <Paragraph 
            className='svg-color' 
            copyable={{ text: example.abc,  tooltips: [t('abcCopyTtBefore'), t('abcCopyTtAfter')] }}
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
