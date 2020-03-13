import { simulatedAnnealing } from '../index';
function getErrorFunction(func, data) {
    return (params) => {
        let y = func(params, data.x);
        let errorValue = 0;
        for (let i = 0; i < data.x.length; i++) {
            errorValue += Math.sqrt(Math.pow(y[i] - data.y[i], 2));
        }
        return errorValue;
    }
}

let xMin = -30;
let xMax = 30;
let points = 15;
let range = Math.abs(xMax - xMin);
let step = range/points;
let plot = {
    'x': [],
    'y' : []
}

let lambda = 1;
let w0 = 7;
for(let i = 0 ; i < points; i++){
        plot.x[i] = xMin + (i * step)
        plot.y[i] = lambda/(Math.pow(lambda,2) + (Math.pow((plot.x[i]-w0), 2)))
}
function lorentzian( parameters, xVector){
    let result = [];
    
    for(let i = 0 ; i < xVector.length; i++){
    result[i] = parameters[0]/(Math.pow(parameters[0],2) + (Math.pow((xVector[i]- parameters[1]), 2)))
    }
    return result
}

let errorFunction = getErrorFunction(lorentzian, plot);
let inputs = {
  goalFunction: errorFunction,
  guess: [1.2, 6.8],
  neighbour: {
    lowerBound: [0.8, 6.8],
    upperBound: [1.2, 7.2]
  },
  maxIterations: 2000,
  quenchingFactor: 5,
};

let simulatedAnnealingTest = simulatedAnnealing(inputs);
console.log(simulatedAnnealingTest);
let error = simulatedAnnealingTest.optimumCandidate;
test('parameterError should be zero for an exact fit', () => {
    expect(error).toBeCloseTo(0, 1);
  });

