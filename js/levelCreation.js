var upcommingElements = [];
var startConfig = [];
var tempStage={ title:'Temp Levels',
                levels:[1],
                1:{}
            };

function makeControls(){
    $( "#Plane" ).click(function() {
        GameOn = false;
        gameButton.className = 'play';
        gameButton.disabled = false;
        pausescreen.style.display = 'none';
        playground.style.display = 'inherit';
        if(upcommingElements.length === 0 && startConfig.length === 0){
            brick.deleteAllBricks();
        } else {
            brick.deleteAllBricks();
            for(var i=0; i < startConfig.length; i++){
                brick.addBrick(startConfig[i]);
            }
        }
        graphics.draw(brick.getBricks());
        gameButton.onclick = function(){ startLevel(); };
    });
    $("input.brickValues").click(function() {
        $( "input.brickValues" ).removeClass( "selected" );
        $(this).addClass("selected");
    });
    $("div.grid-cell").click(function() {
        var brickVal = $(":input.brickValues.selected");
        if(brickVal.length === 1){
            var pos = $(this).data('pos');
            if(brick.isPosOccupied(pos)){
                brick.deleteBricks([pos]);
            } else {
                var localBrick = brick.generateBrick();
                localBrick.pos = pos;
                localBrick.value = brickVal[0].value;
                if(localBrick.value === '*'){
                    console.log("asd");
                    localBrick.value = '&#x00D7;'
                }
                console.log(localBrick);
                if(isNaN(localBrick.value)){
                    localBrick.cls = 'symbol';
                } else {
                    localBrick.cls = 'number';
                }
                brick.addBrick(localBrick);
            }
            startConfig = brick.getBricks();
            graphics.draw(brick.getBricks());
        }
    });
    $("input#addUpcomingBut").click(function() {
        var brickVal = $(":input.brickValues.selected");
        if(brickVal.length === 1){
            console.log(brickVal);
            upcommingElements.push(brickVal[0].value);
            reDrawUpcomming();
        }
    });
    $("input#exportBut").click(function() {
        var string = createLevelData();
        $("#exportString").val(JSON.stringify(string));
    });
}

function startLevel(){
    console.log("Here we go!");
    if(GameOn === false){
        pausescreen.style.display = 'none';
        gameButton.className = 'pause';
        startConfig = brick.getBricks();
        var levelData = createLevelData();
        tempStage['1'] = levelData;
        LEVELS = [tempStage];
        levelController.printLevelMenu();
        GameOn = true;
    } else {
        pausescreen.style.display = 'inherit';
        GameOn = false;
        gameButton.className = 'play';
    }
}

function createLevelData(){
    var obj = {}, i=0;
    obj.startScreen = $("#levelDesc").val();
    obj.startBricks = [];
    for(i =0; i < startConfig.length; i++){
        obj.startBricks.push({x:startConfig[i].pos.x,y:startConfig[i].pos.y, value:startConfig[i].value});
    }
    obj.nextBricks = upcommingElements;
    obj.winningConditions = {score: parseInt($("#scorCondition").val()), bricks:parseInt($("#brickCondition").val())};
    return obj;
}

function reDrawUpcomming(){
    var html = '', i=0;
    for(i=0; i < upcommingElements.length; i++){
        html += '<div class="wrapUpcomming">';
        html += '<div><input type="button" value="<" onclick="MoveUpcomming(' + i + ',\'-\')"></div>';
        html += '<div class="upcommingElement" onclick="removeFromUpcomming(\'' + i + '\')">' + upcommingElements[i] + '</div>';
        html += '<div><input type="button" value=">" onclick="MoveUpcomming(' + i + ',\'+\')"></div>';
        html += '</div>';
    }
    $("div#brickLine").html(html);
}

function MoveUpcomming(index, direction){
    if(direction === '+' && index < upcommingElements.length-1){
        var temp = upcommingElements[index];
        upcommingElements[index] = upcommingElements[index + 1];
        upcommingElements[index + 1] = temp;
    }
    if(direction === '-' && index > 0){
        var temp = upcommingElements[index];
        upcommingElements[index] = upcommingElements[index - 1];
        upcommingElements[index - 1] = temp;
    }
    reDrawUpcomming();
}

function removeFromUpcomming(index){
    upcommingElements.splice(index, 1);
    reDrawUpcomming();
}

function addPosToGridCell(){
    var i=0;
    $("div.grid-cell").each(function() {
        $( this ).data('pos', {x:i % Cols, y:Math.ceil(i / Rows)} );
        i++;
    });
}

$( document ).ready(function() {
    makeControls();
    addPosToGridCell();
});