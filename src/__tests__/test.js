import simulatedAnnealing from '../index';
import polinom from '../polinom';
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
let error = simulatedAnnealing(simulatedAnnealingInputs)[1] - (-78.33232965678742);
it('parameterError should be zero for an exact fit', () => {
  expect(error
    ,
  ).toBeCloseTo(0, 3);
});




      