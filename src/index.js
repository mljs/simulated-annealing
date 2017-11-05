'use strict';

const Matrix = require('ml-matrix').Matrix;

function simulatedAnnealing(objectiveFunction, options) {
    let {
        initialGuess: params,
        // todo: those values are unused...
        // lowerBound = -5,
        // upperBound = 5,
        maxIterations = 100,
        quenching = 1,
        tolerance = 8e-12
    } = options;

    // initial variables
    var evaluatedFunction = objectiveFunction(params);
    var oldParam = params;

    for (var k = 0; (k < maxIterations) && (tolerance < evaluatedFunction); k++) {
        // constant for step
        var tempInverse = Math.pow(k / maxIterations, quenching);
        var mu = Math.pow(10, tempInverse * 100);

        // step for parameters
        var uniformMatrix = (Matrix.rand(params.rows, params.columns)).multiply(2).add(-1);
        var paramDiff = muInverse(uniformMatrix, mu);

        // next step to evaluate
        var newParam = oldParam.sum(paramDiff);

        // evaluate difference
        var functionDiff = objectiveFunction(newParam) - objectiveFunction(oldParam);
        if (functionDiff < 0) {
            params = newParam;

            if (objectiveFunction(params) < evaluatedFunction) {
                oldParam = params;
                evaluatedFunction = objectiveFunction(oldParam);
            }
        } else {
            var rand = Math.random();
            var stepProbability = -tempInverse * (functionDiff / (Math.abs(evaluatedFunction) * tolerance));
            if (rand < Math.exp(stepProbability)) {
                params = newParam;
            }
        }
    }

    return {
        parameters: oldParam,
        error: evaluatedFunction
    };
}

function muInverse(input, mu) {
    var response = input.clone();
    response.apply((i, j) => {
        this[i][j] = (((Math.pow(1 + mu, Math.abs(this[i][j])) - 1) / mu)) * Math.sign(this[i][j]);
    });
    return response;
}

module.exports = simulatedAnnealing;
