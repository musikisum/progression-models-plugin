import Cadence from './model-cadence.js';
import CircleOfFifths from './model-circle-of-fifths.js'; 
import ParallelismusUp from './model-parallelismus-up.js';
import ParallelismusDown from './model-parallelismus-down.js';
import FiveSixConsecutive from './model-five-six-consecutive.js';
import UpperFiveModulation from './model-upper-five-modulation.js';
import LowerFiveModulation from './model-lower-five-modulation.js';
import CircleOfFifthsLinear from './model-circle-of-fifths-linear.js';
import ParalelismusDiminished from './model-paralelismus-diminished.js';

const models = {
  Cadence,
  CircleOfFifths,
  ParallelismusUp,
  ParallelismusDown,
  FiveSixConsecutive,
  UpperFiveModulation,
  LowerFiveModulation,
  CircleOfFifthsLinear,
  ParalelismusDiminished
};

const ModelProvider = { 
  getModel: modelName => models[modelName]
}

export default ModelProvider;