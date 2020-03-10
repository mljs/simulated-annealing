import acceptableProbability from './acceptableProbability';
import candidateGenerator from './candidateGenerator';
import temperature from './temperature';

/**
 *
 * @param {function} inputs.goalFunction  - Function to be optimized
 * @param {Array<numbers>} inputs.guess - initial values to be evaluated on goalFunction
 * @param {Array<numbers>} inputs.neighbour.upperBound - Maximum values that can take variables
 * @param {Array<numbers>} inputs.neighbour.lowerBound - Minimum values that can take variables
 * @param {number} inputs.maxIterations - Maximum number of itarations
 * @param {number} inputs.quenchingFactor - Value that determine the decay rate of probability to accept a candidate that is not improving the goal function output
 */
export function simulatedAnnealing(inputs) {
  let current = inputs.guess;
  let range = inputs.neighbour.upperBound.map(
    (x, i) => x - inputs.neighbour.lowerBound[i],
  );
  let globalOptimum = inputs.goalFunction(current);
  let optimum;
  let optimumCandidate;
  for (let iteration = 0; iteration < inputs.maxIterations; iteration++) {
    let temp = temperature(inputs.maxIterations, iteration);
    let candidate = candidateGenerator(
      inputs.neighbour,
      range,
      current,
      temp,
      inputs.quenchingFactor,
    );
    let candidateEvaluation = inputs.goalFunction(candidate);
    let df = candidateEvaluation - globalOptimum;
    if (df < 0) {
      current = candidate;
      optimum = candidateEvaluation;
      globalOptimum = optimum;
      optimumCandidate = candidate;
    } else if (
      acceptableProbability(df, temp, inputs.quenchingFactor) > Math.random()
    ) {
      current = candidate;
      optimum = candidateEvaluation;
    }
  }
  return [optimumCandidate, globalOptimum];
}
