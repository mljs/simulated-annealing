'use strict';

const Matrix = require('ml-matrix');

const defaultOptions = {
    initialGuess: 0,
    lowerBound: -5,
    upperBound: 5,
    maxIterations: 100,
    quenching: 1,
    tolerance: 8E-12,
};
function simulatedAnnealing(objectiveFunction, inputs) {
    inputs = Object.assign({}, defaultOptions, inputs);

    var x = inputs.initialGuess;
    var fx = objectiveFunction(x);
    var xi = x;
    var fi = fx;
    for (var k = 0; k < inputs.maxIterations; k++) {
        var ti = Math.pow(k / inputs.maxIterations, inputs.quenching);
        var mu = Math.pow(10, ti * 100);
        var dx = muInv(Matrix.rand(x.rows, x.columns).multiply(2).add(-1), mu).multiply((inputs.upperBound - inputs.lowerBound));
        var x1 = x.clone().add(dx);
        for (var i = 0; i < x1.rows; i++) {
            x1[i][0] = (x1[i][0] < l[i][0] ? l[i][0] : 0) + (l[i][0] <= x1[i][0] && x1[i][0] <= u[i][0] ? x1[i][0] : 0) + (u[i][0] < x1[i][0] ? u[i][0] : 0);
        }
        var fx1 = objectiveFunction(x1);
        var df = fx1.clone().subtract(fx);
        for (i = 0; i < df.rows; i++) {
            if (df[i][0] < 0 || Math.random < (Math.exp((-ti * df[i][0]) / (Math.abs(fx[i][0]) + 8E-12) / inputs.tolerance))) {
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
