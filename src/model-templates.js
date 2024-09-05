// Avalable voice model names
const getAvailableModels = [
  'initialCadence', 
  'cadence', 
  'circleOfFifths',
  'circleOfFifthsLinear',
  'fauxbourdon',
  'fiveSixConsecutive',
  'parallelismusDown',
  'parallelismusUp',
  'parallelismusDiminished',
  'upperFiveModulation',
  'lowerFiveModulation'
];

// Model templates to create a voice model
const templates = {
  initialCadence: {
    key: '',
    name: 'initialCadence',
    modelKey: 'C',
    transposeValues: [1, 1, 0],
    voiceArrangement: [1, 2, 3],
    radioValue: 0,
    customDescription: '',
    showDescription: false,
    addProps: {}
  },
  cadence: {
    key: '',
    name: 'cadence',
    modelKey: 'C',
    transposeValues: [0, 0, -1],
    voiceArrangement: [1, 2, 3],
    radioValue: 0,
    customDescription: '',
    showDescription: false,
    addProps: { 
      isBegin: [false, false],
      isFinal: [false, false],
      isDeceptiv: [false, false]
    }
  },
  circleOfFifths:  {
    key: '',
    name: 'circleOfFifths',
    modelKey: 'C',
    transposeValues: [1, 1, 0],
    voiceArrangement: [1, 2, 3],
    radioValue: 0,
    customDescription: '',
    showDescription: false,
    addProps: {
      partLengthValues: [4, 4],
      partToBeginValues: [1, 4],
      bassReverse: [false, false]
    }
  },
  circleOfFifthsLinear: {
    key: '',
    name: 'circleOfFifthsLinear',
    modelKey: 'C',
    transposeValues: [0, 0, -1],
    voiceArrangement: [1, 2, 3],
    radioValue: 0,
    customDescription: '',
    showDescription: false,
    addProps: {
      partLengthValues: [4, 4],
      partToBeginValues: [1, 4],
      lastBassNoteUp: [false, false]
    }
  },
  fauxbourdon: {
    key: '',
    name: 'fauxbourdon',
    modelKey: 'C',
    transposeValues: [1, 0, -1],
    voiceArrangement: [1, 2, 3],
    radioValue: 0,
    customDescription: '',
    showDescription: false,
    addProps: {
      numberOfSections: [3, 3],
      syncopation: [false, false],
      chromaticBass: [false, false]
    }
  },
  fiveSixConsecutive: {
    key: '',
    name: 'fiveSixConsecutive',
    modelKey: 'C',
    transposeValues: [0, 0, -1],
    voiceArrangement: [1, 2, 3],
    radioValue: 0,
    customDescription: '',
    showDescription: false,
    addProps: {
      partLengthValues: [6, 6],
      partToBeginValues: [1, 6],
      diatonic: [false, false]
    }
  },
  lowerFiveModulation: {
    key: '',
    name: 'lowerFiveModulation',
    modelKey: 'C',
    transposeValues: [0, 0, -1],
    voiceArrangement: [1, 2, 3],
    radioValue: 0,
    customDescription: '',
    showDescription: false,
    addProps: {
      changeMode: [false, false]
    }
  },
  upperFiveModulation: {
    key: '',
    name: 'upperFiveModulation',
    modelKey: 'C',
    transposeValues: [0, 0, -1],
    voiceArrangement: [1, 2, 3],
    radioValue: 0,
    customDescription: '',
    showDescription: false,
    addProps: {
      changeMode: [false, false],
      begin65: [false, false],
      prinner: [false, false]
    }
  },
  parallelismusDiminished: {
    key: '',
    name: 'parallelismusDiminished',
    modelKey: 'C',
    transposeValues: [0, 0, -1],
    voiceArrangement: [1, 2, 3],
    radioValue: 0,
    customDescription: '',
    showDescription: false,
    addProps: {
      numberOfSections: [3, 3]
    }
  },
  parallelismusDown: {
    key: '',
    name: 'parallelismusDown',
    modelKey: 'C',
    transposeValues: [0, 0, -1],
    voiceArrangement: [1, 2, 3],
    radioValue: 0,
    customDescription: '',
    showDescription: false,
    addProps: {
      numberOfSections: [3, 3],
      syncopation: [false, false]
    }
  },
  parallelismusUp: {
    key: '',
    name: 'parallelismusUp',
    modelKey: 'C',
    transposeValues: [0, 0, -1],
    voiceArrangement: [1, 2, 3],
    radioValue: 0,
    customDescription: '',
    showDescription: false,
    addProps: {
      numberOfSections: [3, 3],
      chromatic: [false, false],
      syncopation: [false, false]
    }
  }  
}
 
const ModelTemplates = {
  getModelTemplate: modelName => templates[modelName],
  getAvailableModels
};

export default ModelTemplates;
