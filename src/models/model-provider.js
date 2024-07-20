import Cadence from './model-cadence.js';
import CircleOfFifths from './model-circle-of-fifths.js'; 
import ParallelismusUp from './model-parallelismus-up.js';
import ParallelismusDown from './model-parallelismus-down.js';
import FiveSixConsecutive from './model-five-six-consecutive.js';
import UpperFiveModulation from './model-upper-five-modulation.js';
import LowerFiveModulation from './model-lower-five-modulation.js';
import CircleOfFifthsLinear from './model-circle-of-fifths-linear.js';
import ParallelismusDiminished from './model-parallelismus-diminished.js';

const models = {
  cadence: Cadence,
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
}

export default ModelProvider;