import modelTemplates from './model-templates.js';
import cloneDeep from '@educandu/educandu/utils/clone-deep.js';

const updateModelTemplates = dbContentModelTemplates => {
  for (let index = 0; index < dbContentModelTemplates.length; index += 1) {
    const targetTemplate = dbContentModelTemplates[index];
    const sourceTemplate = modelTemplates.getModelTemplate(targetTemplate.name);
    const targetAddProps = targetTemplate.addProps;
    const sourceAddProps = sourceTemplate.addProps;
    for (const key in sourceAddProps) {
      if(!targetAddProps[key]) {
        targetAddProps[key] = sourceAddProps[key];
      }
    }    
  }
  return dbContentModelTemplates;
};

// Validate content after updates (up to v1.4.0)
const validateContentAfterUpdates = dbContent => {
  const clonedContent  = cloneDeep(dbContent);
  const updatedModelTemplates = updateModelTemplates(clonedContent.modelTemplates);
  clonedContent.modelTemplates = updatedModelTemplates;
  return clonedContent;
};

const UpdateValidator = { 
  validateContentAfterUpdates
};

export default UpdateValidator;
