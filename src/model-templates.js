// Model templates to create a voice model
const templates = {
  initialCadence: {
    modelKey: '',
    name: 'initialCadence',
    key: 'C',
    transposeValues: [1, 1, 0],
    voiceArrangement: [1, 2, 3],
    radioValue: 0,
    customDescription: "",
    showDescription: false,
    addProps: {}
  },
  cadence: {
    modelKey: '',
    name: 'cadence',
    key: 'C',
    transposeValues: [0, 0, -1],
    voiceArrangement: [1, 2, 3],
    radioValue: 0,
    customDescription: "",
    showDescription: false,
    addProps: { 
      isBegin: [false, false],
      isFinal: [false, false],
      isDeceptiv: [false, false]
    }
  },
  circleOfFifths:  {
    modelKey: '',
    name: 'circleOfFifths',
    key: 'C',
    transposeValues: [0, 0, 0],
    voiceArrangement: [1, 2, 3],
    radioValue: 0,
    customDescription: "",
    showDescription: false,
    addProps: {
      partLengthValues: [4, 4],
      partToBeginValues: [1, 4]
    }
  },
  circleOfFifthsLinear: {
    modelKey: '',
    name: 'circleOfFifthsLinear',
    key: 'C',
    transposeValues: [0, 0, 0],
    voiceArrangement: [1, 2, 3],
    radioValue: 0,
    customDescription: "",
    showDescription: false,
    addProps: {
      lastBassNoteUp: [false, false],
      partLengthValues: [4, 4],
      partToBeginValues: [1, 4]
    }
  },
  fauxbourdon: {
    modelKey: '',
    name: 'fauxbourdon',
    key: 'C',
    transposeValues: [1, 0, -1],
    voiceArrangement: [1, 2, 3],
    radioValue: 0,
    customDescription: "",
    showDescription: false,
    addProps: {
      numberOfSections: [3, 3],
      syncopation: [false, false],
      chromaticBass: [false, false]
    }
  },
  fiveSixConsecutive: {
    modelKey: '',
    name: 'fiveSixConsecutive',
    key: 'C',
    transposeValues: [0, 0, -1],
    voiceArrangement: [1, 2, 3],
    radioValue: 0,
    customDescription: "",
    showDescription: false,
    addProps: {
      partLengthValues: [6, 6],
      partToBeginValues: [1, 6],
      diatonic: [false, false]
    }
  },
  lowerFiveModulation: {
    modelKey: '',
    name: 'lowerFiveModulation',
    key: 'C',
    transposeValues: [0, 0, -1],
    voiceArrangement: [1, 2, 3],
    radioValue: 0,
    customDescription: "",
    showDescription: false,
    addProps: {
      changeMode: [false, false]
    }
  },
  upperFiveModulation: {
    modelKey: '',
    name: 'upperFiveModulation',
    key: 'C',
    transposeValues: [0, 0, -1],
    voiceArrangement: [1, 2, 3],
    radioValue: 0,
    customDescription: "",
    showDescription: false,
    addProps: {
      changeMode: [false, false],
      begin65: [false, false],
      prinner: [false, false]
    }
  },
  parallelismusDiminished: {
    modelKey: '',
    name: 'parallelismusDiminished',
    key: 'C',
    transposeValues: [0, 0, -1],
    voiceArrangement: [1, 2, 3],
    radioValue: 0,
    customDescription: "",
    showDescription: false,
    addProps: {
      numberOfSections: [3, 3]
    }
  },
  parallelismusDown: {
    modelKey: '',
    name: 'parallelismusDown',
    key: 'C',
    transposeValues: [0, 0, -1],
    voiceArrangement: [1, 2, 3],
    radioValue: 0,
    customDescription: "",
    showDescription: false,
    addProps: {
      numberOfSections: [3, 3],
      syncopation: [false, false]
    }
  },
  parallelismusUp: {
    modelKey: '',
    name: 'parallelismusUp',
    key: 'C',
    transposeValues: [0, 0, -1],
    voiceArrangement: [1, 2, 3],
    radioValue: 0,
    customDescription: "",
    showDescription: false,
    addProps: {
      numberOfSections: [3, 3],
      chromatic: [false, false],
      syncopation: [false, false]
    }
  }  
}
 
const ModelTemplates = {
  getModelTemplate: modelName => templates[modelName]
};

export default ModelTemplates;