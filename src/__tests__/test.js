import simulatedAnnealing from '..';
import polinom from './polinom';

let simulatedAnnealingInputs = {
  goalFunction : polinom,
  guess : [-3],
  neighbour : {
  lowerBound : [-5] ,
  upperBound : [5],
  },
  maxIterations : 100,
  quenchingFactor : 2
}
let simulatedAnnealingOutputs = simulatedAnnealing(simulatedAnnealingInputs);
