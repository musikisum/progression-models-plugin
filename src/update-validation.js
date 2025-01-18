import modelTemplates from './model-templates.js';
import cloneDeep from '@educandu/educandu/utils/clone-deep.js';
import ProgressionModelsInfo from './progression-models-info.js';

// Update model templates with new properties
const updateModelTemplates = dbContentModelTemplates => {
  return dbContentModelTemplates.map(dbClonedContentTemplate => {
    const newTemplate = modelTemplates.getModelTemplate(dbClonedContentTemplate.name);

    // Delete obsolete props from dbClonedContentTemplate addProps
    dbClonedContentTemplate.addProps = Object.keys(dbClonedContentTemplate.addProps)
      .filter(key => key in newTemplate.addProps)
      .reduce((updatedProps, key) => {
        updatedProps[key] = dbClonedContentTemplate.addProps[key];
        return updatedProps;
      }, {});

    // Merge dbClonedContentTemplate addProps with new addProps
    dbClonedContentTemplate.addProps = {
      ...dbClonedContentTemplate.addProps,
      ...Object.keys(newTemplate.addProps)
        .filter(key => !(key in dbClonedContentTemplate.addProps))
        .reduce((newProps, key) => {
          newProps[key] = newTemplate.addProps[key];
          return newProps;
        }, {})
    };

    return dbClonedContentTemplate;
  });
};

// Validate content after updates
const validateContentAfterUpdates = dbContent => {
  const updatedContent = new ProgressionModelsInfo().getDefaultContent();
  const dbClonedContent  = cloneDeep(dbContent);
  for (const key in updatedContent) {
    if (key !== 'modelTemplates') {
      if (!Object.hasOwn(dbClonedContent, key)) {
        dbClonedContent[key] = updatedContent[key];
      }
    }
  }
  for (const key in dbClonedContent) {
    if (key !== 'modelTemplates') {
      if (!Object.hasOwn(updatedContent, key)) {
        delete dbClonedContent[key];
      }
    }
  }
  const updatedModelTemplates = updateModelTemplates(dbClonedContent.modelTemplates);
  dbClonedContent.modelTemplates = updatedModelTemplates;
  return dbClonedContent;
};

const UpdateValidator = { 
  validateContentAfterUpdates
};

export default UpdateValidator;
