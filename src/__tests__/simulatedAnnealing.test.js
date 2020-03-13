import { simulatedAnnealing } from '../index';
/**
 * Function that evaluate an array of x to produce y vector values
 * @param {Array<number>} x
 */
function polinom(x) {
  let y = Math.pow(x[0], 4) - 16 * Math.pow(x[0], 2) - x[0] * 5;
  return y;
}
let simulatedAnnealingInputs = {
  goalFunction: polinom,
  guess: [-3],
  neighbour: {
    lowerBound: [-5],
    upperBound: [5],
  },
  maxIterations: 2000,
  quenchingFactor: 2,
};
let result = simulatedAnnealing(simulatedAnnealingInputs)
let error = -78.33232965678742 - result.globalOptimum;
test('parameterError should be zero for an exact fit', () => {
  expect(error).toBeCloseTo(0, 2);
});
