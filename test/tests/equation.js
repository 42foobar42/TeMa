
QUnit.test("veticalEquation1", function(assert) {
    brick.deleteAllBricks();
    addBrick(0,9,4);
    addBrick(0,8,'=');
    addBrick(0,7,4);
    var equations = brick.getEquation(0);
    equationSolver.resolve(equations);
    var result = equationSolver.getSolvedEquations();
    var pos = result[0].concat(equations[0].equal).concat(result[1]);
    brick.deleteBricks(pos);
    assert.ok(0 == brick.getBricks().length, "Passed!");
});

QUnit.test("veticalEquation2", function(assert) {
    brick.deleteAllBricks();
    addBrick(1,9,3);
    addBrick(0,9,3);
    addBrick(2,9,'*');
    addBrick(3,9,1);
    addBrick(4,9,'+');
    addBrick(5,9,6);
    addBrick(6,9,'=');
    addBrick(7,9,9);
    var equations = brick.getEquation(0);
    equationSolver.resolve(equations);
    var result = equationSolver.getSolvedEquations();
    var pos = result[0].concat(equations[0].equal).concat(result[1]);
    brick.deleteBricks(pos);
    assert.ok(1 == brick.getBricks().length, "Passed!");
});

QUnit.test("horizontalEquation1", function(assert) {
    brick.deleteAllBricks();
    addBrick(0,9,7);
    addBrick(0,8,'+');
    addBrick(0,7,7);
    addBrick(0,6,'=');
    addBrick(0,5,1);
    addBrick(0,4,4);
    var equations = brick.getEquation(0);
    equationSolver.resolve(equations);
    var result = equationSolver.getSolvedEquations();
    var pos = result[0].concat(equations[0].equal).concat(result[1]);
        brick.deleteBricks(pos);
    
    assert.ok(0 == brick.getBricks().length, "Passed!");
});


QUnit.test("horizontalEquation2", function(assert) {
    brick.deleteAllBricks();
    addBrick(0,9,'+');
    addBrick(0,8,9);
    addBrick(0,7,'-');
    addBrick(0,6,4);
    addBrick(0,5,'-');
    addBrick(0,4,4);
    addBrick(0,3,'=');
    addBrick(0,2,1);
    var equations = brick.getEquation(0);
    equationSolver.resolve(equations);
    var result = equationSolver.getSolvedEquations();
    var pos = result[0].concat(equations[0].equal).concat(result[1]);
    result.push(equations[0].equal);
    brick.deleteBricks(pos);
    assert.ok(0 == brick.getBricks().length, "Passed!");
});

QUnit.test("horizontalEquation3", function(assert) {
    brick.deleteAllBricks();
    addBrick(0,9,'-');
    addBrick(0,8,2);
    addBrick(0,7,'-');
    addBrick(0,6,5);
    addBrick(0,5,'=');
    addBrick(0,4,'-');
    addBrick(0,3,3);
    addBrick(0,2,'+');
    var equations = brick.getEquation(0);
    var res = equationSolver.resolve(equations);
    //console.log(res);
    var result = equationSolver.getSolvedEquations();
    //console.log(equations[0].equal);
    var pos = result[0].concat(equations[0].equal).concat(result[1]);
    //console.log(pos);
    brick.deleteBricks(pos);
    var bri = brick.getBricks();
    assert.ok(-3 == res, "result correct");
    for(var i  = 0; i < bri.length; i++){
      //console.log(bri[i]);
      if(bri[i].pos.y === 9){
          //console.log(bri[i].value);
          assert.ok('-' === bri[i].value, "correct stone at bottom");
      }
      if(bri[i].pos.y === 8){
          assert.ok('+' === bri[i].value, "correct stone at pos before bottom");
      }
    }
    //assert.ok(-3 == res, "result correct");
});

QUnit.test("SEToNW", function(assert) {
    brick.deleteAllBricks();
    addBrick(2,9,1);
    addBrick(3,9,6);
    addBrick(4,9,8);
    addBrick(2,8,1);
    addBrick(3,8,'=');
    addBrick(4,8,5);
    addBrick(2,7,1);
    addBrick(4,7,1);
    var equations = brick.getEquation(0);
    console.log(equations);
    var res = equationSolver.resolve(equations);
    console.log(res);
    var result = equationSolver.getSolvedEquations();
    var pos = result[0].concat(equations[0].equal).concat(result[1]);
    brick.deleteBricks(pos);
    assert.ok(1 == res, "result correct");
    assert.ok(5 == brick.getBricks().length, "deleted correct amount stones");
});

QUnit.test("NEToSW", function(assert) {
    //console.log('***************currentEquation***********************');
    brick.deleteAllBricks();
    addBrick(2,9,1);
    addBrick(3,9,6);
    addBrick(4,9,8);
    addBrick(2,8,1);
    addBrick(3,8,'=');
    addBrick(4,8,5);
    addBrick(2,7,8);
    addBrick(4,7,3);
    var equations = brick.getEquation(0);
    console.log(equations);
    var res = equationSolver.resolve(equations);
    console.log(res);
    var result = equationSolver.getSolvedEquations();
    var pos = result[0].concat(equations[0].equal).concat(result[1]);
    brick.deleteBricks(pos);
    //console.log('***************currentEquation***********************');
    assert.ok(8 == res, "result correct");
    assert.ok(5 == brick.getBricks().length, "deleted correct amount stones");
});
    

function clearField(){
    var bricks = brick.getBricks();
    for(var i=0; i < bricks.length; i++){
        brick.deleteBricks(bricks[i].pos);
    }
}

function addBrick(x,y,val){
    var obj = brick.generateBrick(x,y);
    obj.value = val;
    delete obj.active;
    brick.addBrick(obj);
}