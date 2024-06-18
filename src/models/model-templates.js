import Cadence from './model-cadence.js';
import CircleOfFifths from './model-circle-of-fifths.js'; 
import Parallelismus from './model-parallelismus.js';
import FiveSixConsecutive from './model-five-six-consecutive.js';
import UpperFiveModulation from './model-upper-five-modulation.js';
import LowerFiveModulation from './model-lower-five-modulation.js';
import CircleOfFifthsLinear from './model-circle-of-fifths-linear.js';
import ParalelismusDiminished from './model-paralelismus-diminished.js';

const templates = {
  Cadence: Cadence.getDefaultOptions(),
  CircleOfFifths: CircleOfFifths.getDefaultOptions(),
  Parallelismus: Parallelismus.getDefaultOptions(),
  FiveSixConsecutive: FiveSixConsecutive.getDefaultOptions(),
  UpperFiveModulation: UpperFiveModulation.getDefaultOptions(),
  LowerFiveModulation: LowerFiveModulation.getDefaultOptions(),
  CircleOfFifthsLinear: CircleOfFifthsLinear.getDefaultOptions(),
  ParalelismusDiminished: ParalelismusDiminished.getDefaultOptions(),
};

export default function getTemplate(modelName) {
  return templates[modelName];
}