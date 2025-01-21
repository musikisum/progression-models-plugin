// Avalable voice model names
const getAvailableModels = [
  'cadence', 
  'halfCadence',
  'initialCadence',
  'ariaDiFiorenza',
  'circleOfFifths',
  'circleOfFifthsLinear',
  'circleOfFifthsUp',
  'fonte',
  'lamento',
  'regola',
  'fauxbourdon',
  'fiveSixConsecutive',
  'parallelismDown',
  'parallelismUp',
  'parallelismDiminuated',
  'upperFiveModulation',
  'lowerFiveModulation'
];

const standardKeys = ['E','C#m', 'A', 'F#m', 'D', 'Bm', 'G', 'Em', 'C', 'Am', 'F', 'Dm', 'Bb', 'Gm', 'Eb', 'Cm', 'Ab', 'Fm'];

// Model templates to create a voice model
const templates = {
  ariaDiFiorenza: {
    key: '',
    name: 'ariaDiFiorenza',
    modelKey: 'C',
    availableKeys: standardKeys,
    transposeValues: [0, 0, 0],
    voiceArrangement: [1, 2, 3],
    radioValue: 0,
    customDescription: '',
    showDescription: false,
    example: {
      name: 'ariaDiFiorenza',
      abc: `X:1
%%score 1 [ 2 | 3 ]
Q:1/2=60
L:1/4
M:C|
K:G
V:1
 B, B, A, A, | B, B, D D | E E/c/ (c/B/)(B/A/) | 
A/G/ G D D | E E/>c/ (c/B/)(F/A,/) | B,/>G/D/>B,/ G, x
V:2
 g/>d/B/>G/ d/>A/F/>D/ |{/A} G/>F/ G G/>B/d/>g/ | (g/A/)(A/e/) (e/d/)(d/c/) | 
(c/B/) B g/>d/B/>G/ | (^G/A/) A/>e/ (e/d/)(d/F/) | G z z2
V:3 bass
 G, G, F, F, | E, E, B,, B,, | C, C, D, D, | 
"_W. A. Mozart, Sonate für Klavier und Violine in G-Dur KV 9, 1. Satz, T. 1–6."E,/>B,,/G,,/>E,,/ B,, B,, | C, C, D, D, | G,,/>G,/D,/>B,,/ G,, x 
`
    },
    addProps: {
      isFinal: [false, false],
      isVariation: [false, false],
      short: [false, false]
    },
  },
  initialCadence: {
    key: '',
    name: 'initialCadence',
    modelKey: 'C',
    availableKeys: standardKeys,
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
    addProps: {
      begin65: [false, false],
      schema: [false, false]
    }
  },
  cadence: {
    key: '',
    name: 'cadence',
    modelKey: 'C',
    availableKeys: standardKeys,
    transposeValues: [0, 0, 0],
    voiceArrangement: [1, 2, 3],
    radioValue: 0,
    customDescription: '',
    showDescription: false,
    example: {
      name: 'cadence',
      abc: `X:1
%%score [1 | ( 2 3 )]
L:1/4
M:C
Q:120
K:A
V:1
z F | G2- G/d/c/B/ | A/G/ F z A | B2- B/f/e/d/ |  c/B/ A z c |
^d2- d/a/g/f/ | e/^d/ c z e | f2- f/c'/b/a/ |  g/f/ e |
V:2 bass
z [A,C] | z [F,D] z [^E,G,] | z [F,A,] z [A,E] | z [A,F] z [G,B,] |  z [A,C] z [CG] |
z [CA] z [^B,^D] | z [K:treble][CE] z [EB] | z [Ec] z [^DF] | [K:bass][EG]/[FA]/[GB]/ z/ |
V:3 bass
A,, z | B,, z C, z | F, z C, z | D, z E, z | A, z E, z |
"_W. A. Mozart, Sinfonie A-Dur KV 201, 1. Satz, T. 92–99"F, z G, z | C [K:treble]z G, z | A, z B, z | [K:bass]E,/E,/E,/E,/ |`
    },
    addProps: { 
      isBegin: [false, false],
      isFinal: [false, false],
      isDeceptiv: [false, false]
    }
  },
  halfCadence: {
    key: '',
    name: 'halfCadence',
    modelKey: 'C',
    availableKeys: standardKeys,
    transposeValues: [0, 0, 0],
    voiceArrangement: [1, 2, 3],
    radioValue: 0,
    customDescription: '',
    showDescription: false,
    example: {
      name: 'halfCadence',
      abc: `X:1
%%score [ 1 | 2 ]
Q: 1/4=120
L:1/16
M:C
K:C
V:1
E2FG ABcd edcB AGFE | D2EF GAB^c dABc defg | abc'b agfe fgag fedc | 
B2g2e2c2 d2g2e2c2 |  d4 [Bdg]4 G4 z4 |
V:2 bass
[C,C]4 z4 z4 [C,E,]4 | [F,A,]16 | F,6 G,2 A,6 ^F,2 |
"_W. A. Mozart, Sonate KV 545, 1. Satz, T. 8–12"G,,B,,D,G, G,,C,E,G, G,,B,,D,G, G,,C,E,G, | G,,4 G,4 G,,4 z4 |`
    },
    addProps: {
      hasDd: [true, false],
      isBegin: [false, false]
    }
  },
  circleOfFifths:  {
    key: '',
    name: 'circleOfFifths',
    modelKey: 'C',
    availableKeys: standardKeys,
    transposeValues: [0, 0, 0],
    voiceArrangement: [1, 2, 3],
    radioValue: 0,
    customDescription: '',
    showDescription: false,
    example: {
      name: 'circleOfFifths',
      abc: `X:1
%%score [(1 2) 3 4]
Q: 1/4=80
L:1/8
M:C|
K:C
V:1
z g/f/e/d/c/B/ | AcAF z f/e/d/c/B/A/ | GBGE z e/d/c/B/A/G/  | FAFD z d/c/B/A/G/F/ | E
V:2
E4- | E2 C2 D4- | D2 B,2 C4- | C2 A,2 B,4 | C2
V:3 bass
z2 C2 | F,4 z2 B,2 | E,4 z2 A,2 | D,4 z2 G,2- | G,2
V:4 bass
"_J. S. Bach, Präludium und Fuge C-Dur BWV 545, Fuge T. 96–100"z4 | z8 | z8 | z8 | C,,2`,
    },
    addProps: {
      partLengthValues: [4, 4, false],
      partToBeginValues: [1, 4, false],
      bassReverse: [false, false],
      endWithoutSuspension: [true, false]
    }
  },
  circleOfFifthsUp:  {
    key: '',
    name: 'circleOfFifthsUp',
    modelKey: 'C',
    availableKeys: ['D', 'G', 'C', 'F', 'Bb', 'Eb', 'Ab'],
    transposeValues: [0, 0, 0],
    voiceArrangement: [1, 2, 3],
    radioValue: 0,
    customDescription: '',
    showDescription: false,
    example: {
      name: 'circleOfFifthsUp',
      abc: `X:1
%%score [ 1 | 2 ]
L:1/16
M:C
Q:100
K:C
V:1
z Gce z Gce z Gcd z Bdg | z Adf z Adf z Ade z cea | z Bea z Beg |
V:2 bass
"_J. S. Bach, kleines Präludium C-Dur BWV 924, T. 1–3"C,4 E,4 G,4 G,,4 | D,4 F,4 A,4 A,,4 | E,4 E4 |`,
    },
    addProps: {
      partLengthValues: [4, 4, false],
      syncopation: [true, false],
      endWithoutSuspension: [true, false],
      endWithMajorChord: [false, false]
    }
  },
  circleOfFifthsLinear: {
    key: '',
    name: 'circleOfFifthsLinear',
    modelKey: 'C',
    availableKeys: standardKeys,
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
      lastBassNoteUp: [false, false],
      endWithoutSuspension: [true, false]
    }
  },
  fonte: {
    key: '',
    name: 'fonte',
    modelKey: 'C',
    availableKeys: ['E', 'A', 'D', 'G', 'C', 'F', 'Bb', 'Eb', 'Ab'],
    transposeValues: [0, 0, 0],
    voiceArrangement: [1, 2, 3],
    radioValue: 0,
    customDescription: '',
    showDescription: false,
    example: {
      name: 'fonte',
      abc: `X:1
%%score [ 1 | 2 ]
Q: 1/4=120
L:1/16
M:C
K:C
V:1
BAGA BcBc dede f2A2 | ^G^FEF GAGA BcBc edcB | a16 | 
e12 Td4 | ^cBAB cde^f g4 z4 | (g2e2) z2 !wedge!e2 !wedge!g2(e2d2^c2) | 
d^cde fefg a4 z4 | (f2d2) z2 !wedge!d2 !wedge!f2(d2c2B2) | cBcd edef g4 z2 x2 |
V:2 bass
 G,DB,D G,DB,D G,DB,D =F,DA,D | E,B,^G,B, E,B,G,B, E,B,G,B, E,B,G,B, | A,ECE A,ECE A,ECE A,ECE | 
^G,EB,E G,EB,E G,EB,E G,EB,E | A,E^CE A,ECE A,ECE A,ECE | A,E^CE A,ECE A,ECE A,ECE | 
"_W. A. Mozart, Sonate in C-Dur KV 28, 1. Satz, Durchführung (o. Vl.)"F,DA,D F,DA,D F,DA,D F,DA,D | G,DB,D G,DB,D G,DB,D G,DB,D | E,CG,C E,CG,C E,CG,C E,CG,C |`
    },
    addProps: {
      expanded: [false, false],
      bassReverse: [true, false]
    }
  },
  fauxbourdon: {
    key: '',
    name: 'fauxbourdon',
    modelKey: 'C',
    availableKeys: standardKeys,
    transposeValues: [0, 0, 0],
    voiceArrangement: [1, 2, 3],
    radioValue: 0,
    customDescription: '',
    showDescription: false,
    example: {
      name: 'fauxbourdon',
      abc: `X:1
%%score [( 1 2 ) | 3 ]
L:1/4
M:3/4
Q:80
K:C
V:1
z/ e/ f2- | f/f/ e2- | e/e/ d2- | d/d/ c2- |  c/c/ B2 | c z/ g/a/g/ |
f z/ f/g/f/ | e z/ e/f/e/ |  d z/ d/e/d/ | c z/ c/d/c/ | B z/ B/c/B/ | A z/ A/B/A/ |  G z |
V:2
z z/ c/d/c/ | B z/ B/c/B/ | A z/ A/B/A/ | G z/ G/A/G/ |  F z/ A/G/F/ | E z/ E/F/E/ |
D z/ D/E/D/ | C z/ C/D/C/ |  B, z/ B,/C/B,/ | A,/ G/ ^F2- | F/^F/ E2- | E/E/ ^D2 |  z/ ^D/ E |
V:3 bass
[K: treble] z z/ A/B/A/ | G z/ G/A/G/ | F z/ F/G/F/ | E z/ E/F/E/ |  D z/ F/E/D/ | C/ [K: bass] C/ C,2- |
"_J. S. Bach, Preludium in a-Moll BWV 569, T. 9–21 (Particell)"C,/B,/ B,,2- | B,,/A,/ A,,2- |  A,,/^G,/ ^G,,2 | A,, z/ A,/B,/A,/ | G, z/ G,/A,/G,/ | ^F, z/ F,/G,/F,/ |  E, z |`
    },
    addProps: {
      partLengthValues: [5, 5, false],
      syncopation: [true, false],
      chromaticBass: [false, false]
    }
  },
  lamento: {
    key: '',
    name: 'lamento',
    modelKey: 'Am',
    availableKeys: standardKeys,
    transposeValues: [0, 0, 0],
    voiceArrangement: [1, 2, 3],
    radioValue: 0,
    customDescription: '',
    showDescription: false,
    example: {
      name: 'lamento',
      abc: `X:1
%%score [( 1 2 ) | ( 3 4 )]
L:1/4
M:6/8
Q:3/8=40
K:C
V:1
z/ F/A/ _B3/2- | B/E/G/ A3/2- | A/D/F/ G3/2- | G/A/G/ (F E/ |  F)/F/A/ _B3/2- |
B/E/^G/ A3/2- | A/D/^F/ G3/2- | G/(E/4F/4G/) (F E/ |  D/) F/A/
V:2
z/ F- F/F/G/- | G/ E- E/E/F/- | F/ D- D/D/E/ | [^CE]/ z/ z/ x x/ |  x/ F- F/F/G/- |
G/ E- E/E/F/- | F/ D- D/D/E/ | [^CE]/ x/ x/ x x/ |  F,/ F
V:3 bass
x3 | x3 | x3 | x3/2 A,3/2 |  D,3/2 D,3/2 |
^C,3/2 =C,3/2 | B,,3/2 _B,,3/2 | A,, G,,/ A,,- A,,/ |  D,,3/2
V:4 bass
D, z/ D3/2 | ^C3/2 =C3/2 | B,3/2 _B,3/2 | A,3/2-  A,,3/2 |  D,3/2- D,,3/2 |
"_François Couperin, Pièce de Clavcin, XIX. Ordre, La Muse Plantine "x3 | x3 | x5/2 A,,,/ | x3/2`
    },
    addProps: {
      syncopation: [true, false],
      chromatic3: [false, false],
      italianSixth: [false, false],
      chromatic2: [false, false]
    }
  },
  regola:  {
    key: '',
    name: 'regola',
    modelKey: 'C',
    availableKeys: standardKeys,
    transposeValues: [0, 0, 0],
    voiceArrangement: [1, 2, 3],
    radioValue: 0,
    customDescription: '',
    showDescription: false,
    example: {
      name: 'regola',
      abc: `X:1
%%score [ (1 2) | (3 4) ]
L:1/4
Q:1/4=60
M:C
K:A
V:1
 c | B- B/>c/ A/4c/4F/4G/4 A- | A/4A/4G/4F/4 G G/>G/ A/4B/4B/4A/8B/8 | c2 |
V:2
 A | [^DF]3/2 E/- E- E/4F/4D/ | E E- E3/4 x/4 E | z/4 B/4A/4G/4 A |
V:3 bass
 E | x x/4 B,3/4 C3/2 B,/4A,/4 | B, B,- B,3/4 z/4 z/4 A,/G,/4 | z/ z/4 E,/4 A,/4B,/4E,/4F,/4 |
V:4
 "_J. S. Bach, Allemande aus der Suite in A-Dur BWV 806, T. 4–6 (vereinfachte Partitur),"A,/4C/4F,/4G,/4 | A,/4F,/4^D,/4B,,/4 G, F,2 | E,- E,/4F,/4B,,/4C,/4 =D,/4B,,/4G,,/4E,,/4 C,/B,,/ | A,, x |
`,
    },
    addProps: {
      partLengthValues: [4, 4, false],
      partToBeginValues: [1, 4, false],
      isUpwards: [false, false],
      isVariation: [false, false],
    }
  },
  fiveSixConsecutive: {
    key: '',
    name: 'fiveSixConsecutive',
    modelKey: 'C',
    availableKeys: ['E', 'A', 'D', 'G', 'C', 'F', 'Bb', 'Eb', 'Ab'],
    transposeValues: [0, 0, -1],
    voiceArrangement: [1, 2, 3],
    radioValue: 0,
    customDescription: '',
    showDescription: false,
    example: {
      name: 'fiveSixConsecutive',
      abc: `X:1
%%score [( 1 2 ) | 3 ]
L:1/4
M:3/4
Q:100
K:D
V:1
a =c3/2 c/ | (=c B2) | b d3/2 d/ | (d c2) |  
c' e3/2 e/ | (e d2) | d'/c'/b/a/g/f/ | e
V:2
d A2 | D G2 | e B2 | E A2 | 
f c2 | F B2 | b/a/g/f/e/d/ | c
V:3 bass
F,/E,/F,/D,/E,/F,/ | G,/F,/G,/A,/B,/A,/ | ^G,/F,/G,/E,/F,/G,/ | A,/^G,/A,/B,/C/B,/ | 
"_Arcangelo Corelli, Concerto grosso D-Dur Op. 6, Nr. 4, 3. Satz, T. 9–16 (Concertino)"^A,/^G,/A,/F,/G,/A,/ | B,/^A,/B,/C/D/F,/ | =G, G,,2 | A,,`
    },
    addProps: {
      partLengthValues: [6, 6, false],
      partToBeginValues: [1, 6, false],
      diatonic: [false, false],
      withRootNotes: [false, false]
    }
  },
  lowerFiveModulation: {
    key: '',
    name: 'lowerFiveModulation',
    modelKey: 'C',
    availableKeys: standardKeys,
    transposeValues: [0, 0, 0],
    voiceArrangement: [1, 2, 3],
    radioValue: 0,
    customDescription: '',
    showDescription: false,
    example: {
      name: 'lowerFiveModulation',
      abc: `X:1
%%score [ ( 1 2 ) | ( 3 4 ) ]
L:1/4
M:C
Q:120
K:Eb
V:1
c d/e/ f2- | f2 e/d/e/f/ | d g2 f | =e c f2- |
f2 _e2- | e2 d/c/d/e/ | c f2 e | d B e2- |
e2 _d2- | d c |
V:2
c2- c/=B/c/d/ | =B G c2- | c2 _B2- | B2 A/G/A/B/ |
G c2 B | =A F B2- | B2 _A2- | A2 G/F/G/A/ |
F B2 A | B A |
V:3 bass
x4 | x4 | x4 | x4 |
x4 | x4 | x4 | x4 |
x2 B,2 | E2 |
V:4 bass
A, A,, A, G,/F,/ | G,4- | G,/F,/G,/A,/ G,/F,/=E,/D,/ | C,4- |  
C,/B,,/C,/D,/ C,/B,,/=A,,/G,,/ | F,,4- | F,,/E,/F,/G,/ F,/E,/D,/C,/ | B,,4- | 
"_J. S. Bach, Präludium und Fuge Es-Dur BWV 876, Fuge T. 45–54 f."B,,/A,/B,/C/ B,/A,/G,/F,/ | G, A, |`
    },
    addProps: {
      changeMode: [false, false]
    }
  },
  upperFiveModulation: {
    key: '',
    name: 'upperFiveModulation',
    modelKey: 'C',
    availableKeys: standardKeys,
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
    availableKeys: ['E', 'C#m', 'A', 'F#m', 'D', 'Bm', 'G', 'Em', 'C', 'Am', 'F', 'Dm', 'B', 'Gm', 'Eb'],
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
z cef z Gdf | z Gde z Gce z Acd z EBd | z EBc z EAc z FA_B z CGB | z CGA z CFA |
V:2 bass
"_J. S. Bach, kleines Präludium C-Dur BWV 924, T. 3–6"A,4 B,4 | C4 E,4 ^F,4 ^G,4 | A,4 C,4 D,4 E,4 | F,4 E,4 |`
    },
    addProps: {
      numberOfSections: [4, 4, false],
      confirmation: [true, false],
      endWithoutSuspension: [true, false]
    }
  },
  parallelismDown: {
    key: '',
    name: 'parallelismDown',
    modelKey: 'C',
    availableKeys: standardKeys,
    transposeValues: [0, 0, -1],
    voiceArrangement: [1, 2, 3],
    radioValue: 0,
    customDescription: '',
    showDescription: false,
    example: {
      name: 'parallelismDown',
      abc: `X:1
%%score [( 1 2 ) | 3 ]
L:1/4
M:C
Q:90
K:Gm
V:1
V:2
V:3 bass 
V:1
g/ z/ z/4 d/4c/4B/4 | A- A/4B/4c/4d/4 G- G/4B/4_A/4G/4 | 
F- F/4G/4_A/4B/4 E- E/4G/4F/4E/4 | D- D/4D/4=E/4^F/4 G- G/4B/4A/4G/4 | s^F
V:2
B/4D/4=E/4^F/4 G- | G/4G/4=F/4_E/4 D- D/4B,/4C/4D/4 E- | 
E/4E/4D/4C/4 B,- B,/4G,/4=A,/4=B,/4 C- | C/4C/4B,/4A,/4 G,- G,/4G,/4A,/4B,/4 C/^C/ | D
V:3
G,,/G,/4A,/4 B,/A,/4G,/4 | D/D,/4E,/4 F,/E,/4D,/4 E,,/E,/4F,/4 G,/F,/4E,/4 | 
"_J. S. Bach, Fuge in g-Moll BWV 861 (WtKl I), T. 24–28"B,/B,,/4C,/4 D,/C,/4B,,/4 C,,/C,/4D,/4 E,/D,/4C,/4 | G,/G,,/4A,,/4 B,,/A,,/4G,,/4 E,2 | D,`
    },
    addProps: {
      numberOfSections: [3, 3, false],
      syncopation: [false, false],
      endWithoutSuspension: [true, false],
      chromatic: [false, false]
    }
  },
  parallelismUp: {
    key: '',
    name: 'parallelismUp',
    modelKey: 'C',
    availableKeys: standardKeys,
    transposeValues: [0, 0, 0],
    voiceArrangement: [1, 2, 3],
    radioValue: 0,
    customDescription: '',
    showDescription: false,
    example: {
      name: 'parallelismUp',
      abc: `X:1
%%score [( 1 2 ) | ( 3 4 )]
L:1/4
M:C
Q:50
K:Fm
V:1
z2 g2- | g f b2- | b a d'2- |
d' c'/b/ =a c'- | c' b G/b/g/=e/ |
V:2
"_Grave"f3 =e | a3 g | c'3 b | 
=e2 _e d/c/ | d f =e z |
V:3 bass
z4 | C2 E2- | E A F B | 
G2 C2 | D2 C z |
V:4
F,/G,/A,/F,/ C,/=D,/=E,/C,/ | F,/G,/A,/F,/ E,/F,/G,/E,/ | A,/B,/C/A,/ B,/C/D/B,/ | 
C/B,/A,/G,/ F,/_G,/F,/E,/ | "_G. B- Pergolesi, Stabat Mater P77 (Anfang)"D,/C,/D,/B,,/ C, z |`
    },
    addProps: {
      numberOfSections: [3, 3, false],
      chromatic: [false, false],
      syncopation: [false, false],
      endWithoutSuspension: [true, false]
    }
  }  
};
 
const ModelTemplates = {
  getModelTemplate: modelName => templates[modelName],
  getAvailableModels
};

export default ModelTemplates;
