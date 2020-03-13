/**
 * Calcule a temperature value
 * @param {number} maxIteration - Maximum number of iterations
 * @param {*} iteration - Current iteration that is running on the main function
 */
export default function temperature(maxIteration, iteration) {
  let T = maxIteration / (iteration * 0.01 + 1);
  return T;
}
