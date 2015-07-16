var brick = (function() {
    var bricks = [], statistic = { number:0, operator:0, equal:0}, 
        numberCount = { 0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0};
    function findEqual(number){
        var i, counter = 0;
        for(i = bricks.length-1; i >= 0 ; i--){
            if(bricks[i].value === '=' && typeof bricks[i].active === 'undefined'){
                if(counter === number){
                    return bricks[i].pos;
                }
                counter++;
            }
        }
        return false;
    }
    function getEquationsByPos(pos){
        var equations = [];
        equations.push(getHorizontalEq(pos));
        equations.push(getVerticalEq(pos));
        equations.push(getSWToNEEq(pos));
        equations.push(getNWToSEEq(pos));
        return equations;
    }
    function getHorizontalEq(pos){
        var brick = getBrickByPos(pos.x-1, pos.y), element = {right:[], left:[]}, x = pos.x - 1;
        while (x >= 0 && brick.value !== '=' && brick !== false && typeof brick.active === 'undefined') {
            element.left.unshift(JSON.parse(JSON.stringify(brick)));
            x--;
            brick = getBrickByPos(x, pos.y); 
        }
        x = pos.x + 1;
        brick = getBrickByPos(x, pos.y);
        while (x < Cols && brick.value !== '=' && brick !== false && typeof brick.active === 'undefined') {
            element.right.push(JSON.parse(JSON.stringify(brick)));
            x++;
            brick = getBrickByPos(x, pos.y);
        }
        element.equal = pos;
        return element;
    }
    function getVerticalEq(pos){     
        var element = {right:[], left:[]}, brick, y = pos.y-1;
        brick = getBrickByPos(pos.x, y);
        while (y >= 0 && brick.value !== '=' && brick !== false && typeof brick.active === 'undefined') {
            element.right.push(JSON.parse(JSON.stringify(brick)));
            y--;
            brick = getBrickByPos(pos.x, y); 
        }
        y = pos.y+1;
        brick = getBrickByPos(pos.x, y);
        while (y < Rows && brick.value !== '=' && brick !== false && typeof brick.active === 'undefined') {
            element.left.unshift(JSON.parse(JSON.stringify(brick)));
            y++;
            brick = getBrickByPos(pos.x, y);
        }
        element.equal = pos;
        return element;
    }
    function getSWToNEEq(pos){
        var x = pos.x - 1, y = pos.y + 1, element = { right:[], left:[]}, brick;
        brick = getBrickByPos(x, y);
        while (x >= 0 && y < Rows && brick.value !== '=' && brick !== false && typeof brick.active === 'undefined') {
            element.left.unshift(JSON.parse(JSON.stringify(brick)));
            y++;
            x--;
            brick = getBrickByPos(x, y);
        }
        x = pos.x + 1; 
        y = pos.y - 1;
        brick = getBrickByPos(x, y);
        while (y > 0 && x < Cols && brick.value !== '=' && brick !== false && typeof brick.active === 'undefined'){
            element.right.push(JSON.parse(JSON.stringify(brick)));
            y--;
            x++;
            brick = getBrickByPos(x, y);
        }
        element.equal = pos;
        return element;
    }
    function getNWToSEEq(pos){
        var x = pos.x - 1, y = pos.y - 1, element = { right:[], left:[]}, brick;
        brick = getBrickByPos(x, y);
        while (x >= 0 && y >= 0 && brick.value !== '=' && brick !== false && typeof brick.active === 'undefined') {
            element.left.unshift(JSON.parse(JSON.stringify(brick)));
            y--;
            x--;
            brick = getBrickByPos(x, y);
        }
        x = pos.x + 1; 
        y = pos.y + 1;
        brick = getBrickByPos(x, y);
        while (y < Rows && x < Cols && brick.value !== '=' && brick !== false && typeof brick.active === 'undefined'){
            element.right.push(JSON.parse(JSON.stringify(brick)));
            y++;
            x++;
            brick = getBrickByPos(x, y);
        }
        element.equal = pos;
        return element;
    }
    function getBrickByPos(x, y){
        var i;
        for(i = 0; i < bricks.length; i++){
            if(typeof bricks[i].pos !== 'undefined'){
                if(bricks[i].pos.x === x && bricks[i].pos.y === y){
                    return bricks[i];
                }
            }
        }
        return false;
    }
    function moveBricksDown(x,startY){
        for(var i = 0; i < bricks.length; i++){
            if(typeof bricks[i].pos !== 'undefined'){
                if(bricks[i].pos.x === x && bricks[i].pos.y < startY){
                    bricks[i].pos.y++;
                }
            }
        }
    }
    function deleteByPos(pos){
        for(var i = 0; i < bricks.length; i++){
            if(typeof bricks[i].pos !== 'undefined'){
                if(bricks[i].pos.x === pos.x && bricks[i].pos.y === pos.y){
                    if(bricks[i].cls === 'number'){
                        statistic.number--;
                    } else {
                        if(bricks[i].value === symbols[3].symbol){
                            statistic.equal--;
                        } else {
                            statistic.operator--;
                        }
                    }
                    bricks.splice(i, 1);
                    moveBricksDown(pos.x, pos.y);
                    return true;
                }
            }
        }
        return false;
    }
    return {
        generateBrick: function(x, y) {
            var obj = {}, randomNumber, countOfBricks = statistic.equal + statistic.number + statistic.operator, amountNumber = 0, key;
            obj.pos = {};
            obj.pos.x = x;
            obj.pos.y = y;
            for (key in numberCount) {
                amountNumber += numberCount[key];
            }
            if(countOfBricks > 0 && countOfBricks % 3 === 0){
                if((statistic.equal/countOfBricks)*100 < PERCENT_PER_ELEMENT.equal){
                    obj.value = symbols[3].symbol;
                    obj.cls = 'symbol';
                    statistic.equal++;
                } else if((statistic.operator/countOfBricks)*100 < PERCENT_PER_ELEMENT.operator){
                    obj.value = symbols[Math.floor(Math.random() * 3)].symbol;
                    obj.cls = 'symbol';
                    statistic.operator++;
                } else {
                    obj.value = this.generateNumber(amountNumber);
                    obj.cls = 'number';
                }
            } else {
                if((Math.floor(Math.random() * 100)) < PERCENT_FOR_NUMBER){
                    obj.value = this.generateNumber(amountNumber);
                    obj.cls = 'number';
                } else {
                    randomNumber = Math.floor(Math.random() * 100);
                    obj.cls = 'symbol';
                    if(randomNumber < symbols[0].percent){
                        obj.value = symbols[0].symbol;
                        statistic.operator++;
                    } else {
                        if(randomNumber < symbols[1].percent){
                            obj.value = symbols[1].symbol;
                            statistic.operator++;
                        } else {
                            if(randomNumber < symbols[2].percent){
                                obj.value = symbols[2].symbol;
                                statistic.operator++;
                            } else {
                                obj.value = symbols[3].symbol;
                                statistic.equal++;
                            }
                        }
                    }
                }
            }
            return obj;
        },
        getNumberByPercent: function (amount){
            var key;
            for(key in numberCount){
                if(numberCount[key] < (amount/10)){
                    return key;
                }
            }
            return Math.floor(Math.random() * 10);
        },
        generateNumber: function(amountNumber){
            var number;
            number = Math.floor(Math.random() * 10);
            if(amountNumber % 4 === 0){
                number = this.getNumberByPercent(amountNumber);
            }
            numberCount[number]++;
            statistic.number++;
            return number;
        },
        getBricks: function (){
            return bricks;
        },
        getBrick: function (pos){
            return getBrickByPos(pos.x, pos.y);
        },
        addBrick: function (obj){
            bricks.push(obj);
        },
        getEquation: function (no){
            var pos = findEqual(no);
            if(!pos){
                return false;
            }
            return getEquationsByPos(pos);
        },
        deleteBricks: function (postions){
            for(var i = 0; i < postions.length; i++){
                deleteByPos(postions[i]);
            }
        },
        getActiveBrick: function(){
            var i = 0;
            for(i = bricks.length-1; i >= 0 ; i--){
                if(typeof bricks[i].active !== 'undefined'){
                    return bricks[i];
                }
            }
            return false;
        },
        moveActiveBrick: function(){
            var activeBrick = this.getActiveBrick(), i = 0;
            if(activeBrick){
                if(activeBrick.pos.y < Rows - 1 && getBrickByPos(activeBrick.pos.x, activeBrick.pos.y + 1) === false){
                    activeBrick.pos.y++;
                    return true;
                }
                delete activeBrick.active;
            }
            return false;
        },
        isPosOccupied: function(pos){
            if(typeof pos === 'undefined'){
                return false;
            }
            var brick = getBrickByPos(pos.x, pos.y);
            if(brick){
                return true;
            } else {
                return false;
            }
        },
        moveActiveBrickByUser: function(direction){
            var activeBrick = this.getActiveBrick();
            if(activeBrick){
                if(direction === 'left'){
                    if(activeBrick.pos.x > 0 && getBrickByPos(activeBrick.pos.x - 1, activeBrick.pos.y) === false){
                        activeBrick.pos.x--;
                    }
                } else if(direction === 'right'){
                    if(activeBrick.pos.x < Cols-1 && getBrickByPos(activeBrick.pos.x + 1, activeBrick.pos.y) === false){
                        activeBrick.pos.x++;
                    }
                } else if (direction === 'down'){
                    if(activeBrick.pos.y < Rows-1 && getBrickByPos(activeBrick.pos.x, activeBrick.pos.y + 1) === false){
                        activeBrick.pos.y++;
                    }
                }
            }
            graphics.draw(bricks);
        },
        deleteAllBricks: function (){
            bricks = [];
            statistic = { number:0, operator:0, equal:0 };
            numberCount = { 0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0};
        }
    };
}());


