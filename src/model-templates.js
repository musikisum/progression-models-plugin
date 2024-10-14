// Avalable voice model names
const getAvailableModels = [
  'initialCadence', 
  'cadence', 
  'circleOfFifths',
  'circleOfFifthsLinear',
  'fauxbourdon',
  'lamento',
  'fiveSixConsecutive',
  'parallelismDown',
  'parallelismUp',
  'parallelismDiminuated',
  'upperFiveModulation',
  'lowerFiveModulation'
];

// Model templates to create a voice model
const templates = {
  initialCadence: {
    key: '',
    name: 'initialCadence',
    modelKey: 'C',
    transposeValues: [0, 0, 0],
    voiceArrangement: [1, 2, 3],
    radioValue: 0,
    customDescription: '',
    showDescription: false,
    example: {
      name: 'initialCadence',
      abc: `X:1
%%score [1 (2 3)]
L:1/4
M:3/4
Q:50
K:Am
V:1
A | e3/2- e/8f/8e/8d/8 {d} e/>a/ |{e} d2 b- | b/4(c'/4b/4a/4) (b/4a/4^g/4^f/4 e/4d/4c/4B/4) |(B/4d/4c/4B/4){B} A x |
V:2
x | c c c | B B e | e e B | c/>d/ e/>d/ c3/4 x/4 |
V:3
"_J. S. Bach, Mathäus-Passion BWV 244, Teil II, Nr. 58, ›Aus Liebe‹"x | A A A | A A A | ^G G G | A/>B/ c/>B/ A3/4 x/4 |`
},
    addProps: {}
  },
  cadence: {
    key: '',
    name: 'cadence',
    modelKey: 'C',
    transposeValues: [0, 0, 0],
    voiceArrangement: [1, 2, 3],
    radioValue: 0,
    customDescription: '',
    showDescription: false,
    example: {
      name: 'cadence',
      abc: ``
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
    transposeValues: [0, 0, 0],
    voiceArrangement: [1, 2, 3],
    radioValue: 0,
    customDescription: '',
    showDescription: false,
    example: {
      name: 'circleOfFifths',
      abc: `X:1
%%score [(1 2) (3 4)]
Q: 1/4=80
L:1/8
M:C|
K:C
V:1
z g/=f/e/d/c/B/ | AcAF z f/e/d/c/B/A/ | GBGE z e/d/c/B/A/G/  | FAFD z d/c/B/A/G/F/ | E
V:2
E4- | E2 C2 D4- | D2 B,2 C4- | C2 A,2 B,4 | C2
V:3 bass
"_J. S. Bach, Präludium und Fuge C-Dur BWV 545, Fuge T. 96–100"z2 C2 | F,4 z2 B,2 | E,4 z2 A,2 | D,4 z2 G,2 | [G,2 C,,2]`,
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
    transposeValues: [0, 0, 0],
    voiceArrangement: [1, 2, 3],
    radioValue: 0,
    customDescription: '',
    showDescription: false,
    example: {
      name: 'circleOfFifthsLinear',
      abc: `X:1
%%score [(1 2) | 3]
L:1/16
M:C
Q:80
K:Dm
V:1
^f4 | g4 z dgd _e4 z cfc | d4 z B_eB c4 z AdA | BcAc B4 |
V:2
d2c2 | BdBd G4 z cGc F4 | z BFB _E4 z AEA D4- | D4 z2 D2 |
V:3 bass
"_J. S. Bach, Toccata und Fuge d-Moll BWV 913, Fuge T. 43 ff."D2D,2 | G,2A,2B,2G,2 C2B,2A,2F,2 | B,2A,2G,2_E,2 A,2G,2^F,2D,2 | G,2D,2 G,4 |`
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
      abc: ``
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
      abc: ``
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
      abc: ``
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
    transposeValues: [0, 0, 0],
    voiceArrangement: [1, 2, 3],
    radioValue: 0,
    customDescription: '',
    showDescription: false,
    example: {
      name: 'lowerFiveModulation',
      abc: ``
    },
    addProps: {
      changeMode: [false, false]
    }
  },
  upperFiveModulation: {
    key: '',
    name: 'upperFiveModulation',
    modelKey: 'C',
    transposeValues: [0, 0, 0],
    voiceArrangement: [1, 2, 3],
    radioValue: 0,
    customDescription: '',
    showDescription: false,
    example: {
      name: 'upperFiveModulation',
      abc: `X:1
%%score [(1 2) 3]
Q: 1/4=80
L:1/8
M:C|
K:C
V:1
e4 | d3 d cBAd | BdBG
V: 2
ABGA | ^FD G4 ^F2 | G2 D2
V:3 bass
"_J. S. Bach, Präludium und Fuge C-Dur BWV 545, Fuge T. 95 f."C4- | C2 B,2 A,2 D2 |  G,4`
},
    addProps: {
      changeMode: [false, false],
      begin65: [false, false],
      prinner: [false, false]
    }
  },
  parallelismDiminuated: {
    key: '',
    name: 'parallelismDiminuated',
    modelKey: 'C',
    transposeValues: [0, 0, 0],
    voiceArrangement: [1, 2, 3],
    radioValue: 0,
    customDescription: '',
    showDescription: false,
    example: {
      name: 'parallelismDiminuated',
      abc: `X:1
%%score [ 1 | 2 ]
L:1/16
M:C
Q:100
K:C
V:1
z Bea z Beg z cef z Gdf | z Gde z Gce z Acd z EBd | z EBc z EAc z FA_B z CGB | z CGA z CFA |
V:2 bass
"_J. S. Bach, kleines Präludium C-Dur BWV 924, T. 3–6"E,4 E4 A,4 B,4 | C4 E,4 ^F,4 ^G,4 | A,4 C,4 D,4 E,4 | F,4 E,4 |`
},
    addProps: {
      numberOfSections: [4, 4, false],
      confirmation: [true, false]
    }
  },
  parallelismDown: {
    key: '',
    name: 'parallelismDown',
    modelKey: 'C',
    transposeValues: [0, 0, -1],
    voiceArrangement: [1, 2, 3],
    radioValue: 0,
    customDescription: '',
    showDescription: false,
    example: {
      name: 'parallelismDown',
      abc: ``
    },
    addProps: {
      numberOfSections: [3, 3, false],
      syncopation: [false, false]
    }
  },
  parallelismUp: {
    key: '',
    name: 'parallelismUp',
    modelKey: 'C',
    transposeValues: [0, 0, -1],
    voiceArrangement: [1, 2, 3],
    radioValue: 0,
    customDescription: '',
    showDescription: false,
    example: {
      name: 'parallelismUp',
      abc: ``
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
