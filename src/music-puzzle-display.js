import { Input } from 'antd';
import AbcSnippet from './abc-snippet.js';
import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';
import ModelComposition from './model-composition.js';
import ModelProvider from './models/model-provider.js';
import { sectionDisplayProps } from '@educandu/educandu/ui/default-prop-types.js';

export default function MusicPuzzleDisplay({ content }) {

  const { t } = useTranslation('musikisum/educandu-plugin-music-puzzle');
  const capitalizeFirstLetter = modelName => `${modelName[0].toUpperCase()}${modelName.slice(1)}`;

  const { modelTemplates } = content;

  const [abcResult, setAbcResult] = useState(''); 
  const [descriptions, setDescriptions] = useState();

  useEffect(() => {
    if(modelTemplates.length > 0) {
      const voices = [];
      const descriptions = [];
      for (let index = 0; index < modelTemplates.length; index++) {
        const modelTemplate = modelTemplates[index];
        const model = ModelProvider.getModel(modelTemplate.name);
        voices.push(model.getVoices(modelTemplate));
        const text = modelTemplate.customDescription === '' ?
        t(`defaultDescription${capitalizeFirstLetter(modelTemplate.name)}`) :
        modelTemplate.customDescription; 
        descriptions.push(text);        
      }
      const playableABC = ModelComposition.abcOutput('C', 'C', '1/4=120', '1/2', voices, 6);
      setAbcResult(playableABC);
      setDescriptions(descriptions);
    }    
  }, []);

  return (
    <div className='EP_Educandu_Example_Display'>
      <div className={`u-horizontally-centered u-width-${content.width}`}>
        { abcResult && <AbcSnippet playableABC={abcResult} /> }
      </div>
      <div>
        <p>Beschreibung:</p>
        {descriptions && descriptions.join(' || ')}
      </div>
    </div>
  );
}

MusicPuzzleDisplay.propTypes = {
  ...sectionDisplayProps
};
