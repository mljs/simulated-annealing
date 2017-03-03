'use strict';

const Matrix = require('ml-matrix');

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
function simulatedAnnealing(options) {
    var objetiveFunction = options[0];
    var initialGuess = options[1];
    var lowerBound = options[2];
    var upperBound = options[3];
    if (options.length < 4 || options.length > 7) {
        return 'The function need between 4 to 7 inputs arguments';
    }
    if (options.length < 7) {
        var toleranceFunction = 8E-12;
    }
    else {
        toleranceFunction = options[6];
    }
    if (options.length < 6) {
        var quenchingFactor = 1;
    }
    else {
        quenchingFactor = options[5];
    }
    if (options.length < 5) {
        var iterationsNumber = 100;
    }
    else {
        iterationsNumber = options[4];
    }
    var x = initialGuess;
    var fx = initialGuess(x);
    var xi = x;
    var fi = fx;
    for (var k = 0; k < options.maxIterations; k++) {
        var ti = Math.pow(k / options.maxIterations, options.quenching);
        var mu = Math.pow(10, ti * 100);
        var dx = muInv(Matrix.rand(x.rows, x.columns).multiply(2).add(-1), mu).multiply((options.upperBound - options.lowerBound));
        var x1 = x.add(dx);
        for (var i = 0; i < x1.rows; i++) {
            x1[i][0] = (x1[i][0] < l[i][0] ? l[i][0] : 0) + (l[i][0] <= x1[i][0] && x1[i][0] <= u[i][0] ? x1[i][0] : 0) + (u[i][0] < x1[i][0] ? u[i][0] : 0);
        }

        var fx1 = objectiveFunction(x1);
        var df = fx1.subtract(fx);
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
    var x = Matrix.zeros(y.rows, y.columns);
    for (var i = 0; i < y.rows; i++) {
        x[i][0] = (((Math.pow(1 + mu, Math.abs(y[i][0])) - 1) / mu)) * Math.sign(y[i][0]);
    }
    return x;
}

module.exports = simulatedAnnealing;
