'use strict';

const Matrix = require('ml-matrix');
const Algebra = Matrix.algebra;

function simulatedAnnealing(options) {
    var f = options[0]; // Objective function
    var x0 = options[1]; //Initial guess
    var l = options[2]; // Lower bound
    var u = options[3]; // Upper bound
    if (options.length < 4 || options.length > 7) {
        return 'The function need between 4 to 7 inputs arguments';
    }
    if (options.length < 7) {
        var tolFun = 8E-12;
    } else {
        tolFun = options[6];
    }

    // Tolerance function
    if (options.length < 6) {
        var q = 1;
    } else {
        q = options[5];
    }

    // Quenching factor
    if (options.length < 5) {
        var kmax = 100;
    } else {
        kmax = options[4];
    }

    // Maximun number of iterations
    var x = x0;
    var fx = f(x);
    var xi = x;
    var fi = fx;
    for (var k = 0; k < kmax; k++) {
        var ti = Math.pow(k / kmax, q);
        var mu = Math.pow(10, ti * 100);
        var dx = muInv(Algebra.random(x.rows, x.columns).multiply(2).add(-1), mu).multiply((Algebra.subtract(u, l)));
        var x1 = Algebra.add(x, dx);
        for (var i = 0; i < x1.rows; i++) {
            x1[i][0] = (x1[i][0] < l[i][0] ? l[i][0] : 0) + (l[i][0] <= x1[i][0] && x1[i][0] <= u[i][0] ? x1[i][0] : 0) + (u[i][0] < x1[i][0] ? u[i][0] : 0);
        }

        var fx1 = f(x1);
        var df = Algebra.subtract(fx1, fx);
        for (i = 0; i < df.rows; i++) {
            if (df[i][0] < 0 || Math.random < (Math.exp((-ti * df[i][0]) / (Math.abs(fx[i][0]) + 8E-12) / tolFun))) {
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
