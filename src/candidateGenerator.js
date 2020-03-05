/**
 * Generate a new candidate
 * @param {{lowerBound: Array<number>, upperBound: Array<number>} } neighbour - Upper and lower bound to each variable
 * @param {number} range - Range where each value will cahnge
 * @param {Array<number>} current - Current variables values from which a new candidate will be generated
 * @param {number} T - value that is used to decide if new candidate is acceptable or not  
 * @param {number} quienching - value that determine the decay rate of temperature. At high temperature almost every candidate is accepted, at low values, only good ones.  
 */

export default function candidateGenerator(neighbour,range, current, T, quienching){
    
    let dx = [], infoToTest = { mu : undefined , yList : [], dx:undefined , parameters : undefined };
    let newCandidate = []
    let mu = Math.pow(10, 10 * (Math.pow((1 / T), quienching)));
    for (let i = 0; i < current.length; i++) {
        let y = Math.random() * (range) + neighbour.lowerBound[i];
        infoToTest.yList[i] = y;
        dx[i] = y  * Math.exp(-quienching/ T) 
        newCandidate[i] = current[i] + dx[i];
        newCandidate[i] = (newCandidate[i] < neighbour.lowerBound[i] ? neighbour.lowerBound[i] + (neighbour.lowerBound[i] - newCandidate)  : 0) + (neighbour.lowerBound[i] <= newCandidate[i] && newCandidate[i] <= neighbour.upperBound[i] ? newCandidate[i] : 0) + (neighbour.upperBound[i] < newCandidate[i] ? neighbour.upperBound[i] - (newCandidate[i] - neighbour.upperBound[i]) : 0);
    } 
    infoToTest.mu = mu;
    infoToTest.dx = dx;
    infoToTest.parameters = newCandidate;
    return [newCandidate, infoToTest];
}