'use strict';

const Matrix = require('ml-matrix');
const simulatedAnnealing = require('..');

describe('simulated-annealing test', function () {

    it('Something to test', function () {
        function polynomial(x) {
            return Math.pow(x, 4) - 16 * Math.pow(x, 2) - 5 * x;
        }

        function polynomialMatrix(a) {
            var y = polynomial(a[0][0]) + polynomial(a[1][0]);
            }
            return y;
        }

        var response = simulatedAnnealing(polynomialMatrix, {
            initialGuess: new Matrix([[0], [0]]),
            lowerBound: -5,
            upperBound: 5,
            maxIterations: 100,
            quenching: 1,
            tolerance: 1E-09
        });

        response.parameters.should.be.deepEqual(new Matrix([[0], [0]]));
        response.error.should.be.deepEqual(new Matrix([[0], [0]]));
    });
});
