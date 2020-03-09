import simulatedAnnealing from 'simulatedAnnealing';

import { singleGaussian } from './singleGaussian';
import simulatedAnnealing from '.';

/**
 * Fits a set of points to a gaussian bell. Returns the mean of the peak, the std and the height of the signal.
 * @param data,[y]
 * @returns {*[]}
 */
export function optimizeSingleGaussian(xy, peak, opts = {}) {
  let t = xy[0];
  let yData = xy[1];
  let maxY = Math.max(...yData);
  yData.forEach((x, i, arr) => (arr[i] /= maxY));
  let dt = Math.abs(t[0] - t[1]);
  let pInit = new Float64Array([peak.x, 1, peak.width]);
  let pMin = new Float64Array([peak.x - dt, 0.75, peak.width / 4]);
  let pMax = new Float64Array([peak.x + dt, 1.25, peak.width * 4]);

  let data = {
    x: t,
    y: yData,
  };
  let saOptions = {
  goalFunction : singleGaussian,
  guess : pInitial,
  neighbour : {
  lowerBound : pMin ,
  upperBound : pMax,
  },
  maxIterations : 100,
  quenchingFactor : 2
}

  opts = Object.assign({}, opts, saOptions);
  let pFit = simulatedAnnealing(data, singleGaussian, opts);
  console.log({
    parameters: [
      pFit[0].parameterValues[0],
      pFit[0].parameterValues[1] * maxY,
      pFit[0].parameterValues[2],
    ],
    error: Math.pow(pFit[1], 2) - Math.pow(-78.33214986285881, 2),
  })
  return {
    parameters: [
      pFit[0].parameterValues[0],
      pFit[0].parameterValues[1] * maxY,
      pFit[0].parameterValues[2],
    ],
    error:?,
  };
}