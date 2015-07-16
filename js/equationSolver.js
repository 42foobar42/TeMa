var equationSolver = (function() {
    var PosToDelete = false;
    function calculate(obj){
        var i, d, k, pos, hasSymbol = false, element;
        for(i = 0; i < obj.length; i++){
            var left = getSide(obj[i].left), right = getSide(obj[i].right),
                leftString = getAllResults(obj[i].left), 
                rightString = getAllResults(obj[i].right), 
                resultLeft = [], resultRight= [], result;
            resultLeft = StringCalculation(leftString, 'left');
            resultRight = StringCalculation(rightString, 'right');
            result = compareResults(resultLeft, resultRight);
            if(result){
                PosToDelete = [];
                PosToDelete.push(right.slice(0, result.right).reverse());
                PosToDelete.push(left.slice(left.length - result.left).reverse());
                for(d = 0; d < PosToDelete.length; d++){
                    pos = PosToDelete[d];
                    for(k = 0; k < pos.length; k++){
                        element = brick.getBrick(pos[k]);
                        if(element &&  element.cls === 'symbol' && element.value !== symbols[3].symbol){
                            hasSymbol = true;
                            break;
                        }
                    }
                    if(hasSymbol){
                        break;
                    }
                }
                if (hasSymbol){
                    return result.result;
                }else {
                    return 1;
                }
            } 
        }
        return false;
    }
    function StringCalculation(string, side){
        var result = [];
        while(string.length > 0){
            try {
                result.push({result:math.eval(string), length:string.length});
            }
            catch (err){
            }
            if(side === 'left'){
                string = string.substr(1);
            } else {
                string = string.substr(0, string.length - 1);
            }
        }
        return result;
    }
    function compareResults(left, right){
        var i = 0, d = 0;
        for(i=0;i < left.length;i++){
            for(d=0;d < right.length;d++){
                if(left[i].result === right[d].result){
                    return {result:left[i].result, left:left[i].length, right:right[d].length};
                }
            }
        }
        return false;
    }
    function getAllResults(obj){
        var string = '';
        for(var i = 0; i < obj.length; i++){
            if(obj[i].value === symbols[2].symbol){
                string += '*';
            } else {
                string += obj[i].value;
            }
        }
        return string;
    }
    function getSide(side){
        var positions = [];
        //console.log(side);
        for(var i = 0; i < side.length; i++){
            positions.push(side[i].pos);
        }
        return positions;
    }
    return {
        resolve: function(eqObj){
            PosToDelete = false;
            return calculate(eqObj);
        },
        getSolvedEquations: function(){
            return PosToDelete;
        }
    };
}());
