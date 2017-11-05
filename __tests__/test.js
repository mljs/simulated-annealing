'use strict';

const Matrix = require('ml-matrix').Matrix;
const simulatedAnnealing = require('..');

describe('simulated-annealing test', function () {

    it('Something to test', function () {
        function polynomial(x) {
            return Math.pow(x, 4) - 16 * Math.pow(x, 2) - 5 * x;
        }

        function polynomialMatrix(a) {
            return polynomial(a[0][0]) + polynomial(a[1][0]);
        }

        var response = simulatedAnnealing(polynomialMatrix, {
            initialGuess: new Matrix([[0], [0]]),
            lowerBound: new Matrix([[-5], [-5]]),
            upperBound: new Matrix([[5], [5]]),
            maxIterations: 100,
            quenching: 1,
            tolerance: 1E-09
        });

        expect(response.parameters).toEqual(new Matrix([[0], [0]]));
        expect(response.error).toEqual(0);
    });
});
