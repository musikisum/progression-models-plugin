const initialCadenceExample = {
  modelKey: 'C',
  measure: 'C',
  tempo: 80,
  voices: [
 '',
 '',
 ''
]};

const cadenceExample = {
  modelKey: 'C',
  measure: 'C',
  tempo: 80,
  voices: [
 '',
 '',
 ''
]};

const lamentoExample = {
  modelKey: 'Am',
  measure: 'C',
  tempo: 80,
  voices: [
 '',
 '',
 ''
]};

const fauxbourdonExample = {
  modelKey: 'C',
  measure: 'C',
  tempo: 80,
  voices: [
 '',
 '',
 ''
]};

const circleOfFifthsExample = {
  modelKey: 'C',
  measure: 'C',
  tempo: 80,
  voices: [
 '',
 '',
 ''
]};

const circleOfFifthsLinearExample = {
  modelKey: 'Dm',
  measure: 'C',
  tempo: 80,
  voices: [
 'g- | g f2 e- | e d2 c- | c _B |',
 '=B | A2 G2 | F2 E2 | D- D/4F/4E/4D/4',
 'E/4F/4G/4=B,/4 | ^C/4A,/4=B,/4C/4 D/4E/4F/4A,/4 _B,/4G,/4A,/4B,/4 =C/4D/4E/4G,/4 | A,/4F,/4G,/4A,/4 B,/4C/4D/4F,/4 G,/4E,/4F,/4G,/4 A,/4=B,/4C/4E,/4 | ^F,/4D,/4E,/4F,/4 G,'
]};

const parallelismusUpExample = {
  modelKey: 'C',
  measure: 'C',
  tempo: 80,
  voices: [
 '',
 '',
 ''
]};

const parallelismusDownExample = {
  modelKey: 'C',
  measure: 'C',
  tempo: 80,
  voices: [
 '',
 '',
 ''
]};

const fiveSixConsecutiveExample = {
  modelKey: 'C',
  measure: 'C',
  tempo: 80,
  voices: [
 '',
 '',
 ''
]};

const upperFiveModulationExample = {
  modelKey: 'C',
  measure: 'C',
  tempo: 80,
  voices: [
 '',
 '',
 ''
]};

const lowerFiveModulationExample = {
  modelKey: 'C',
  measure: 'C',
  tempo: 80,
  voices: [
 '',
 '',
 ''
]};

const parallelismusDiminishedExample = {
  modelKey: 'C',
  measure: 'C',
  tempo: 80,
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
