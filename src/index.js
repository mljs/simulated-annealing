'use strict';

const Matrix = require('ml-matrix');
const Algebra = Matrix.algebra;

const defaultOptions = {
    initialGuess: 5,
    lowerBound: 0,
    upperBound: 10,
    tolerance: 8E-12,
    quenching: 1,
    maxIterations: 100
};

function simulatedAnnealing(objectiveFunction, options) {
    options = Object.assign({}, defaultOptions, options);

    // Maximum number of iterations
    var x = options.initialGuess;
    var fx = objectiveFunction(x);
    var xi = x;
    var fi = fx;
    for (var k = 0; k < options.maxIterations; k++) {
        var ti = Math.pow(k / options.maxIterations, options.quenching);
        var mu = Math.pow(10, ti * 100);
        var dx = muInv(Algebra.random(x.rows, x.columns).multiply(2).add(-1), mu).multiply((Algebra.subtract(options.upperBound, options.lowerBound)));
        var x1 = Algebra.add(x, dx);
        for (var i = 0; i < x1.rows; i++) {
            x1[i][0] = (x1[i][0] < options.lowerBound[i][0] ? options.lowerBound[i][0] : 0) + (options.lowerBound[i][0] <= x1[i][0] && x1[i][0] <= options.upperBound[i][0] ? x1[i][0] : 0) + (options.upperBound[i][0] < x1[i][0] ? options.upperBound[i][0] : 0);
        }

        var fx1 = objectiveFunction(x1);
        var df = Algebra.subtract(fx1, fx);
        for (i = 0; i < df.rows; i++) {
            if (df[i][0] < 0 || Math.random < (Math.exp((-ti * df[i][0]) / (Math.abs(fx[i][0]) + 8E-12) / options.tolerance))) {
                x[i][0] = x1[i][0];
                fx[i][0] = fx1[i][0];
            }
        }
        for (i = 0; i < fx.rows; i++) {
            if (fx[i][0] < fi[i][0]) {
                xi[i][0] = x[i][0];
                fi[i][0] = fx1[i][0];
            }
        }
    }
    return [xi, fi];
}

function muInv(y, mu) {
    var x = Algebra.zeros(y.rows, y.columns);
    for (var i = 0; i < y.rows; i++) {
        x[i][0] = (((Math.pow(1 + mu, Math.abs(y[i][0])) - 1) / mu)) * Math.sign(y[i][0]);
    }
    return x;
}

module.exports = simulatedAnnealing;
