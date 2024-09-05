import Cadence from './models/model-cadence.js';
import Lamento from './models/model-lamento.js';
import Fauxbourdon from './models/model-fauxbourdon-down.js';
import InitialCadence from  './models/model-initial-cadence.js'
import CircleOfFifths from './models/model-circle-of-fifths.js'; 
import ParallelismusUp from './models/model-parallelismus-up.js';
import ParallelismusDown from './models/model-parallelismus-down.js';
import FiveSixConsecutive from './models/model-five-six-consecutive.js';
import UpperFiveModulation from './models/model-upper-five-modulation.js';
import LowerFiveModulation from './models/model-lower-five-modulation.js';
import CircleOfFifthsLinear from './models/model-circle-of-fifths-linear.js';
import ParallelismusDiminished from './models/model-parallelismus-diminished.js';

const models = {
  cadence: Cadence,
  lamento: Lamento,
  fauxbourdon: Fauxbourdon,
  initialCadence: InitialCadence,
  circleOfFifths: CircleOfFifths,
  parallelismusUp: ParallelismusUp,
  parallelismusDown: ParallelismusDown,
  fiveSixConsecutive: FiveSixConsecutive,
  upperFiveModulation: UpperFiveModulation,
  lowerFiveModulation: LowerFiveModulation,
  circleOfFifthsLinear: CircleOfFifthsLinear,
  parallelismusDiminished: ParallelismusDiminished
};

const ModelProvider = { 
  getModel: modelName => models[modelName]
};

export default ModelProvider;
