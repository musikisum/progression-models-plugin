import React from 'react';
import { Typography, Divider } from 'antd';
import { useTranslation } from 'react-i18next';
import ModelProvider from './model-provider.js';
import Transposer from './components/transposer.js';
import AbcSnippet from './components/abc-snippet.js';
import ModelComposition from './model-composition.js';
import Markdown from '@educandu/educandu/components/markdown.js';
import Collapse from '@educandu/educandu/components/collapsible.js';
import { sectionDisplayProps } from '@educandu/educandu/ui/default-prop-types.js';

export default function MusicPuzzleDisplay({ content }) {

  const { t } = useTranslation('musikisum/educandu-plugin-progression-models');
  const { Paragraph } = Typography;
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
    withTies,
    showExample
  } = content;
 
  const capitalizeFirstLetter = modelName => `${modelName[0].toUpperCase()}${modelName.slice(1)}`;

  const voices = [];
  const descriptions = [];

  for (let index = 0; index < modelTemplates.length; index += 1) {
    const modelTemplate = modelTemplates[index];
    const modelObj = ModelProvider.getModel(modelTemplate.name).getVoices(modelTemplate);
    voices.push(modelObj);
    const text = modelTemplate.customDescription === ''
      ? t(`defaultDescription${capitalizeFirstLetter(modelTemplate.name)}`)
      : modelTemplate.customDescription;           
    descriptions.push(
      !descriptions.includes(text) ? text : `${t('descriptionRepeatHead')} ***${t(modelTemplate.name)}*** ${t('descriptionRepeatTail')}`
    );       
  }

  const getPlayableABC = () => {
    let playableABC = null;
    if (voices.length) {
      playableABC = ModelComposition.getCompositionAbcOutput('C',
        measure, 
        tempo, 
        voices, 
        measuresPerLine, 
        stretchLastLine, 
        invertRhythm, 
        hideUpperSystem, 
        hideLowerSystem,
        withTies
      );
      if(transposeValue !== 0) {
        playableABC = Transposer.getTransposition(playableABC, transposeValue);
      }      
    }
    return playableABC;
  };
  
  const getDescription = () => {
    if (descriptions.length) {
      return descriptions.reduce((akku, modelDescription) => !akku ? modelDescription : `${akku}\n\n---\n\n${modelDescription}`, '');      
    }    
    return null;    
  };

  const getParagraph = value => {
    return <Paragraph className='svg-color' copyable={{ text: value, tooltips: [t('abcCopyTtBefore'), t('abcCopyTtAfter')] }}>{t('abcCopy')}</Paragraph>;
  };
  
  const abcResult = getPlayableABC();
  const description = getDescription();
  const markdownElem = <Markdown renderAnchors className='u-horizontally-centered u-width-100'>{description}</Markdown>;

  return (
    <div className='EP_Educandu_Progression_Models_Display'>
      <div className={`u-horizontally-centered u-width-${content.width}`}>
        <div>
          <AbcSnippet playableABC={abcResult} />
        </div>
        <div style={{ textAlign: 'center' }}>
          { (modelTemplates.length !== 0) && getParagraph(abcResult) }
        </div>
        { showExample ? <Divider orientation="right" plain>{`${t('showExampleDescription')}: ${t(example.name)}`}</Divider> : null }
        <div style={{ width: `${example.abc === '' ? '50%' : '100%' }`, margin: 'auto' }}>
          { showExample ? <AbcSnippet playableABC={example.abc} /> : null }
          { showExample ? getParagraph(example.abc) : null }
        </div>
        <div className='vSpacer' />
        { description && showDescription
          ? <Collapse collapsible="icon" title={t('descriptionTitle')} defaultActiveKey="panel">{ markdownElem }</Collapse> 
          : null }
      </div>
    </div>
  );
}

MusicPuzzleDisplay.propTypes = {
  ...sectionDisplayProps
};
