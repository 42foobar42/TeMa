var Rows = 10;
var Cols = 9;
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

var playground, pausescreen, pauseMsg;


window.onload = function () {
    var i, state;
    playground = document.getElementById('playground');
    pausescreen = document.getElementById('pauseView');
    gameButton = document.getElementById('butStartStop');
    scoreBoard = document.getElementById('scoreboard');
    nextStoneBoard = document.getElementById('nextBrick');
    highscoreboard = document.getElementById('highscore');
    pauseMsg = document.getElementById('msg');
    Points = 0;
    controls.init();
    highscoreboard.innerHTML = storage.getHighscore();
    state = storage.loadGameState();
    if(state[0] && state[2]){
        for(i = 0; i < state[0].length; i++){
            brick.addBrick(state[0][i]);
        }
        Points = state[1];
        nextStone = state[2];
        nextStoneBoard.innerHTML = nextStone.value;
        scoreBoard.innerHTML = Points;
        GameOn = true;
        graphics.draw(brick.getBricks());
        startGame();
    }
};

window.onunload = function () {
    storage.saveGameState(brick.getBricks(), Points, nextStone);
};

var GameLoop = function (){
    gameLogic();
};
    
function startGame(){
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
        pauseMsg.innerHTML = 'Pause';
        clearInterval(GameInterval);
    }
}

function checkBricks(){
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
            setTimeout(function() {deleteBricks(positions, 0);}, TIME_FOR_DELETE_EFFECT);
            return true;
        } else {
            i++;
            equations = brick.getEquation(i);
        }
    }
    return false;
}

function deleteTriples(){
    var pos = brick.deleteOccurring(3);
    if(pos){
        graphics.highlightElements(pos);
        clearInterval(GameInterval);
        setTimeout(function() {deleteBricks(pos, 1);}, TIME_FOR_DELETE_EFFECT);
        return true;
    }
    return false;
}

var deleteBricks = function (positions, func){
    brick.deleteBricks(positions);
    graphics.draw(brick.getBricks());
    if( func === 0){
        while (checkBricks()){ }
    } else {
        while (deleteTriples()){ }
    }
    GameInterval = setInterval(GameLoop, TIME);
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
    if(!checkBricks()){
        deleteTriples();
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
}