/**
 * Define a value of probability
 * @param {number} functionDelta - This value measure the difference between the current and the best candidate variable evaluated on the aim function (function that we need optimize).
 * @param {*} temperature  - Value that decreases in each iteration causing the probability to decrease as well.
 * @param {*} quenchingFactor - constant value that determine the decay rate of probability.
 */

 
export default function acceptableProbability(functionDelta, temperature, quenchingFactor){
    let probability = Math.exp( - ( functionDelta * quenchingFactor ) / (temperature)); 
    return probability
}