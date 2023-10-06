//Helper functions
const addAsterisks = (expr) => {
    for(let i = 0; i < expr.length-1; i++) {

        //Coefficient
        let first = expr.substring(i, i+1);
        let second = expr.substring(i+1, i+2);
        if(first.match(/[0-9]+/) && !(second.match(/[0-9]+/))) {
            if( second != ")" && 
                second != " " && 
                !second.match(/^\+|-|\*|\/|=|>|<|>=|<=|&|\||%|!|\^|\|\$/)) {
                //console.log("Coefficient at: " + i);
                expr = expr.substring(0, i+1) + "*" + expr.substring(i+1);
            }
        }
        
    }
    return expr;
}
const addExponents = (expr) => {
    for(let i = 0; i < expr.length-1; i++) {

        let current = expr.substring(i, i+1);
        if(current.match(/\^/)) {
           //console.log(i);

           let base = "";
           for(let j = i; j > 0; j--) {
                if(j === 1) {
                    base = expr.substring(j-1, i);
                    break;
                }
                else if(expr.substring(j-1, j) == " " || 
                        expr.substring(j-1, j).match(/\(/)) {
                    base = expr.substring(j, i);
                    break;
                }
           }
           let exp = expr.substring(i+1);;
           let endOfExp = 0;
           for(let j = i; j < expr.length; j++) {
                if(expr.substring(j, j+1) === " ") {
                    exp = expr.substring(i+1, j);
                    endOfExp = j+1;
                    break;
                }
                
           }
           
           let replacement = ` Math.pow(${base}, ${exp})`;
        //    console.log("1: " + expr.substring(0, i-base.length));
        //    console.log("2: " + replacement);
        //    console.log("3: " + expr.substring(i + exp.length));
           expr = expr.substring(0, i-base.length) + replacement + expr.substring(i + 1 + exp.length);
           
        }
        
    }
    return expr;
}
const exprToEvalString = (expr) => {
    expr = addAsterisks(expr);
    expr = addExponents(expr)
    return expr;
}
const stringToFunction = (string) => {
    const y = (x) => {
        let newString = string;
        for(let i = 0; i < string.length; i++) {
            if(string.substring(i, i+1) === "x") {
                newString = string.substring(0, i) + x + string.substring(i+1);
            }
        }
        return eval(newString);
    }
    return y;
}

//Main function
const exprToFunction = (expr) => {
    let string = exprToEvalString(expr);
    return stringToFunction(string);
}

module.exports = { exprToFunction };








