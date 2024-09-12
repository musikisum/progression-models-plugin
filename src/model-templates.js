// Avalable voice model names
const getAvailableModels = [
  'initialCadence', 
  'cadence', 
  'circleOfFifths',
  'circleOfFifthsLinear',
  'fauxbourdon',
  'lamento',
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
    example: {
      name: 'initialCadence',
      abc: ``,
      description: ''
    },
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
    example: {
      name: 'cadence',
      abc: ``,
      description: ''
    },
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
    example: {
      name: 'circleOfFifths',
      abc: ``,
      description: ''
    },
    addProps: {
      partLengthValues: [4, 4, false],
      partToBeginValues: [1, 4, false],
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
    example: {
      name: 'circleOfFifthsLinear',
      abc: `X:1
%%score [(1 2) 3]
M:C
Q:1/4=80
L:1/4
K:Dm
V:1
g- | g f2 e- | e d2 c- | c _B |
V:2
=B | A2 G2 | F2 E2 | D- D/4F/4E/4D/4
V:3 bass
E/4F/4G/4=B,/4 | ^C/4A,/4=B,/4C/4 D/4E/4F/4A,/4 _B,/4G,/4A,/4B,/4 =C/4D/4E/4G,/4 | A,/4F,/4G,/4A,/4 B,/4C/4D/4F,/4 G,/4E,/4F,/4G,/4 A,/4=B,/4C/4E,/4 | ^F,/4D,/4E,/4F,/4 G,`,
      description: 'Dieses Beispiel entstammt der Fuge aus der Toccata und Fuge BWV 913, T. 64–66 (mit Auftakt) von Johann Sebastian Bach.' 
    },
    addProps: {
      partLengthValues: [4, 4, false],
      partToBeginValues: [1, 4, false],
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
    example: {
      name: 'fauxbourdon',
      abc: ``,
      description: ''
    },
    addProps: {
      numberOfSections: [3, 3, false],
      syncopation: [false, false],
      chromaticBass: [false, false]
    }
  },
  lamento: {
    key: '',
    name: 'lamento',
    modelKey: 'C',
    transposeValues: [1, 0, -1],
    voiceArrangement: [1, 2, 3],
    radioValue: 0,
    customDescription: '',
    showDescription: false,
    example: {
      name: 'lamento',
      abc: ``,
      description: ''
    },
    addProps: {
      syncopation: [false, false],
      chromatic3: [false, false],
      italianSixth: [false, false],
      chromatic2: [false, false]
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
    example: {
      name: 'fiveSixConsecutive',
      abc: ``,
      description: ''
    },
    addProps: {
      partLengthValues: [6, 6, false],
      partToBeginValues: [1, 6, false],
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
    example: {
      name: 'lowerFiveModulation',
      abc: ``,
      description: ''
    },
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
    example: {
      name: 'upperFiveModulation',
      abc: ``,
      description: ''
    },
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
    example: {
      name: 'parallelismusDiminished',
      abc: ``,
      description: ''
    },
    addProps: {
      numberOfSections: [3, 3, false]
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
    example: {
      name: 'parallelismusDown',
      abc: ``,
      description: ''
    },
    addProps: {
      numberOfSections: [3, 3, false],
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
    example: {
      name: 'parallelismusUp',
      abc: ``,
      description: ''
    },
    addProps: {
      numberOfSections: [3, 3, false],
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
