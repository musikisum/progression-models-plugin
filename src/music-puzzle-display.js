import { Input } from 'antd';
import AbcSnippet from './abc-snippet.js';
import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';
import ModelComposition from './model-composition.js';
import ModelProvider from './models/model-provider.js';
import { sectionDisplayProps } from '@educandu/educandu/ui/default-prop-types.js';

export default function MusicPuzzleDisplay({ content }) {

  const { t } = useTranslation('musikisum/educandu-plugin-music-puzzle');
  const { modelTemplates } = content;

  const [abcResult, setAbcResult] = useState(''); 

  useEffect(() => {
    if(modelTemplates.length > 0) {
      const modelVoicesOfModels = modelTemplates.reduce((akku, modelTemplate)  => {
        const model = ModelProvider.getModel(modelTemplate.name);
        const modelVoices = model.getVoices(modelTemplate);
        akku.push(modelVoices);
        return akku;
      }, []);
        const playableABC = ModelComposition.abcOutput('C', 'C', '1/4=120', '1/2', modelVoicesOfModels, 6);
        setAbcResult(playableABC);
    }    
  });

  return (
    <div className='EP_Educandu_Example_Display'>
      <div className={`u-horizontally-centered u-width-${content.width}`}>
        { abcResult && <AbcSnippet playableABC={abcResult} /> }
      </div>
    </div>
  );
}

MusicPuzzleDisplay.propTypes = {
  ...sectionDisplayProps
};
