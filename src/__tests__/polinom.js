/**
 * Function that evaluate an array of x to produce y vector values
 * @param {Array<number>} x 
 */
function polinom (x){
    let y = Math.pow(x[0],4) - 16 * Math.pow(x[0],2) - x[0] * 5;
    return y
}