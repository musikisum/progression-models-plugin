const initialCadenceExample = {
  modelKey: 'C',
  measure: 'C',
  tempo: 80,
  description: '',
  voices: [
 '',
 '',
 ''
]};

const cadenceExample = {
  modelKey: 'C',
  measure: 'C',
  tempo: 80,
  description: '',
  voices: [
 '',
 '',
 ''
]};

const lamentoExample = {
  description: '',
  abc: [
    '',
    '',
    '',
    ''
  ].join()
};

const fauxbourdonExample = {
  modelKey: 'C',
  measure: 'C',
  tempo: 80,
  description: '',
  voices: [
 '',
 '',
 ''
]};

const circleOfFifthsExample = {
  modelKey: 'C',
  measure: 'C',
  tempo: 80,
  description: '',
  voices: [
 '',
 '',
 ''
]};

const circleOfFifthsLinearExample = {
  description: 'Dieses Beispiel entstammt der Fuge aus der Toccata und Fuge BWV 913, T. 64–66 (mit Auftakt) von Johann Sebastian Bach.',
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
E/4F/4G/4=B,/4 | ^C/4A,/4=B,/4C/4 D/4E/4F/4A,/4 _B,/4G,/4A,/4B,/4 =C/4D/4E/4G,/4 | A,/4F,/4G,/4A,/4 B,/4C/4D/4F,/4 G,/4E,/4F,/4G,/4 A,/4=B,/4C/4E,/4 | ^F,/4D,/4E,/4F,/4 G,`
};

const parallelismusUpExample = {
  modelKey: 'C',
  measure: 'C',
  tempo: 80,
  description: '',
  voices: [
 '',
 '',
 ''
]};

const parallelismusDownExample = {
  modelKey: 'C',
  measure: 'C',
  tempo: 80,
  description: '',
  voices: [
 '',
 '',
 ''
]};

const fiveSixConsecutiveExample = {
  modelKey: 'C',
  measure: 'C',
  tempo: 80,
  description: '',
  voices: [
 '',
 '',
 ''
]};

const upperFiveModulationExample = {
  modelKey: 'C',
  measure: 'C',
  tempo: 80,
  description: '',
  voices: [
 '',
 '',
 ''
]};

const lowerFiveModulationExample = {
  modelKey: 'C',
  measure: 'C',
  tempo: 80,
  description: '',
  voices: [
 '',
 '',
 ''
]};

const parallelismusDiminishedExample = {
  modelKey: 'C',
  measure: 'C',
  tempo: 80,
  description: '',
  voices: [
 '',
 '',
 ''
]};

const models = {
  cadence: cadenceExample,
  lamento: lamentoExample,
  fauxbourdon: fauxbourdonExample, 
  initialCadence: initialCadenceExample,
  circleOfFifths: circleOfFifthsExample,
  parallelismusUp: parallelismusUpExample,
  parallelismusDown: parallelismusDownExample,
  fiveSixConsecutive: fiveSixConsecutiveExample,
  upperFiveModulation: upperFiveModulationExample,
  lowerFiveModulation: lowerFiveModulationExample,
  circleOfFifthsLinear: circleOfFifthsLinearExample,
  parallelismusDiminished: parallelismusDiminishedExample
};

const ModelExampleProvider = { 
  getModelExample: modelName => models[modelName]
};

export default ModelExampleProvider;
