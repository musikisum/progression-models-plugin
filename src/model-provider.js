import Cadence from './models/model-cadence.js';
import Lamento from './models/model-lamento.js';
import Fauxbourdon from './models/model-fauxbourdon-down.js';
import InitialCadence from  './models/model-initial-cadence.js'
import CircleOfFifths from './models/model-circle-of-fifths.js'; 
import ParallelismUp from './models/model-parallelism-up.js';
import ParallelismDown from './models/model-parallelism-down.js';
import FiveSixConsecutive from './models/model-five-six-consecutive.js';
import UpperFiveModulation from './models/model-upper-five-modulation.js';
import LowerFiveModulation from './models/model-lower-five-modulation.js';
import CircleOfFifthsLinear from './models/model-circle-of-fifths-linear.js';
import ParallelismDiminuated from './models/model-parallelism-diminuated.js';

const models = {
  cadence: Cadence,
  lamento: Lamento,
  fauxbourdon: Fauxbourdon,
  initialCadence: InitialCadence,
  circleOfFifths: CircleOfFifths,
  parallelismUp: ParallelismUp,
  parallelismDown: ParallelismDown,
  fiveSixConsecutive: FiveSixConsecutive,
  upperFiveModulation: UpperFiveModulation,
  lowerFiveModulation: LowerFiveModulation,
  circleOfFifthsLinear: CircleOfFifthsLinear,
  parallelismDiminuated: ParallelismDiminuated
};

const ModelProvider = { 
  getModel: modelName => models[modelName]
};

export default ModelProvider;
