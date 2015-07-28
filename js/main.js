var Rows = 10, Cols = 9;
var symbols = [{symbol:'+', percent:18}, {symbol:'-', percent:36}, 
                {symbol:'&#x00D7;', percent:54}, {symbol:'=', percent:95}, 
                {symbol:'/', percent:100}];
var PERCENT_PER_ELEMENT = {number:60, operator:25, equal:15};
var GameInterval;
var Points = 0;
var scoreBoard, highscoreboard;
var nextStone = "", nextStoneBoard = "";
var PERCENT_FOR_NUMBER = 60;
var TIME = 1000;
var TIME_FOR_DELETE_EFFECT = 400;
var GameOn = false;

var gameButton;
var playground, pausescreen, pauseMsg, levelMenu, startLevelScreen;

var LEVELS = [tutorial_levels];
var endless = true, gameAlive = false;

window.onload = function () {
    var i, state;
    playground = document.getElementById('playground');
    pausescreen = document.getElementById('pauseView');
    gameButton = document.getElementById('butStartStop');
    scoreBoard = document.getElementById('scoreboard');
    nextStoneBoard = document.getElementById('nextBrick');
    highscoreboard = document.getElementById('highscore');
    pauseMsg = document.getElementById('msg');
    levelMenu = document.getElementById('level_selection');
    startLevelScreen = document.getElementById('startLevelScreen');
    Points = 0;
    controls.init();
    highscoreboard.innerHTML = storage.getHighscore();
    state = storage.loadGameState();
    levelController.printLevelMenu();
    if(state[6]){
        pauseMsg.innerHTML = 'Pause';
        for(i = 0; i < state[0].length; i++){
            brick.addBrick(state[0][i]);
        }
        Points = state[1];
        nextStone = state[2];
        if(nextStone){
            nextStoneBoard.innerHTML = nextStone.value;
        }
        scoreBoard.innerHTML = Points;
        GameOn = true;
        graphics.draw(brick.getBricks());
        if(state[4]){
            startGame();
        }else{
            levelController.continueLevel(state[5]);
        }
    } else {
        pauseMsg.innerHTML = 'Menu';
    }
};

window.onunload = function () {
    storage.saveGameState(brick.getBricks(), Points, nextStone, GameOn, endless, levelController.getStageAndLevel(),gameAlive);
};

var GameLoop = function (){
    gameLogic();
};  



function startGame(){
    gameAlive = true;
    endless = true;
    pauseMsg.innerHTML = 'Pause';
    if (GameOn === false){
        GameOn = true;
        gameButton.className = gameButton.className.replace('play', '');
        gameButton.className = 'pause';
        playground.style.display = 'inherit';
        pausescreen.style.display = 'none';
        GameInterval = setInterval(GameLoop, TIME);
    } else {
        GameOn = false;
        gameButton.className = gameButton.className.replace('pause', '');
        gameButton.className = 'play';
        playground.style.display = 'none';
        pausescreen.style.display = 'inherit';
        clearInterval(GameInterval);
    }
}

function checkBricks(loop){
    var i = 0, points, result, equations = brick.getEquation(i), positions;
    while(equations){
        points = equationSolver.resolve(equations);
        result = equationSolver.getSolvedEquations();
        if(result){
            Points+=points;
            scoreBoard.innerHTML = Points;
            positions = result[0].concat(equations[0].equal).concat(result[1]);
            graphics.highlightElements(positions);
            clearInterval(GameInterval);
            setTimeout(function() {deleteBricks(positions, 0, loop);}, TIME_FOR_DELETE_EFFECT);
            return true;
        } else {
            i++;
            equations = brick.getEquation(i);
        }
    }
    return false;
}

function deleteTriples(loop){
    var pos = brick.deleteOccurring(3);
    if(pos){
        graphics.highlightElements(pos);
        clearInterval(GameInterval);
        setTimeout(function() {deleteBricks(pos, 1, loop);}, TIME_FOR_DELETE_EFFECT);
        return true;
    }
    return false;
}

var deleteBricks = function (positions, func, loop){
    brick.deleteBricks(positions);
    graphics.draw(brick.getBricks());
    if( func === 0){
        while (checkBricks(loop)){ }
    } else {
        while (deleteTriples()){ }
    }
    GameInterval = setInterval(loop, TIME);
}


function gameLogic(){
    var active = brick.getActiveBrick(), obj;
    if(!active){
        obj = nextStone;
        obj.active = true;
        nextStone = brick.generateBrick(Math.floor(Cols/2),0);
        nextStoneBoard.innerHTML = nextStone.value;
        if(!brick.isPosOccupied(obj.pos)){
            brick.addBrick(obj);
        } else {
            setTimeout(function() {endGame();}, 150);
        }
    } else {
        brick.moveActiveBrick();
    }
    graphics.draw(brick.getBricks());
    if(!checkBricks(GameLoop)){
        deleteTriples(GameLoop);
    }
}

function Restart(){
    storage.saveHighscore(Points);
    highscoreboard.innerHTML = storage.getHighscore();
    Points = 0;
    gameButton.disabled = false;
    scoreBoard.innerHTML = Points;
    brick.deleteAllBricks();
    graphics.draw([]);
    nextStoneBoard.innerHTML = '';
    startGame();
}

function endGame(){
    storage.saveHighscore(Points);
    highscoreboard.innerHTML = storage.getHighscore();
    GameOn = false;
    gameButton.disabled = true;
    clearInterval(GameInterval);
    pauseMsg.innerHTML = 'Game Over';
    playground.style.display = 'none';
    pausescreen.style.display = 'inherit';
    gameAlive = false;
}