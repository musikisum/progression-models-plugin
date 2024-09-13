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
L:1/16
K:Dm
V:1
g4- | g4 f8 e4- | e4 d8 c4- | c4 _B4 |
V:2
=B4 | A8 G8 | F8 E8 | D4- DFED
V:3 bass
EFG=B, | ^CA,=B,C DEFA, _B,G,A,B, =CDEG, | A,F,G,A, B,CDF, G,E,F,G, A,=B,CE, | ^F,D,E,F, G,`,
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
      abc: `X:1
%%score [ 1 | 2 ]
L:1/16
M:C
Q:100
K:C
V:1
V:2 bass 
V:1
z Bea z Beg z cef z Gdf | z Gde z Gce z Acd z EBd | z EBc z EAc z FA_B z CGB | z CGA z CFA |
V:2
E,4 E4 A,4 B,4 | C4 E,4 ^F,4 ^G,4 | A,4 C,4 D,4 E,4 | F,4 E,4 |`,
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
