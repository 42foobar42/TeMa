var storage = (function() {
    var CONST_HIGHSCORE = "highscore", CONST_BRICKS = "bricks", CONST_SCORE = "score", CONST_NEXTSTONE = "nextStone",
    CONST_GAMEON = "gameOn", CONST_ENDLESS = "endless", CONST_PASSEDLEVELS = 'passedLevels', CONST_STAGELEVEL = 'stageLevel',
    CONST_GAMEALIVE = "gameAlive";
    function checkForStorage(){
        if(typeof(Storage) !== "undefined") {
            return true;
        } else {
            return false;
        }
    }
    return {
        saveHighscore: function(highscore) {
            var lastHighScore = 0;
            if(checkForStorage()){
                lastHighScore = parseInt(localStorage.getItem(CONST_HIGHSCORE)) || 0;
                if(highscore > lastHighScore){
                    lastHighScore = highscore;
                }
                localStorage.setItem(CONST_HIGHSCORE, lastHighScore);
            }
        },
        getHighscore: function(){
            if(checkForStorage()){
                return localStorage.getItem(CONST_HIGHSCORE) || 0;
            }
            return false;
        },
        saveGameState: function(bricks, score, nextStone, gameon, endless, stageLevel, GameAlive){
            if(checkForStorage()){
                localStorage.setItem(CONST_BRICKS, JSON.stringify(bricks));
                localStorage.setItem(CONST_SCORE, score);
                localStorage.setItem(CONST_NEXTSTONE, JSON.stringify(nextStone));
                localStorage.setItem(CONST_GAMEON, gameon);
                localStorage.setItem(CONST_ENDLESS, endless);
                localStorage.setItem(CONST_STAGELEVEL, JSON.stringify(stageLevel));
                localStorage.setItem(CONST_GAMEALIVE, GameAlive);
            }
        },
        loadGameState: function(){
            if(checkForStorage()){
                var state = [];
                state.push(JSON.parse(localStorage.getItem(CONST_BRICKS)));
                state.push(parseInt(localStorage.getItem(CONST_SCORE)));
                state.push(JSON.parse(localStorage.getItem(CONST_NEXTSTONE)));
                state.push(JSON.parse(localStorage.getItem(CONST_GAMEON)));
                state.push(JSON.parse(localStorage.getItem(CONST_ENDLESS)));
                state.push(JSON.parse(localStorage.getItem(CONST_STAGELEVEL)));
                state.push(JSON.parse(localStorage.getItem(CONST_GAMEALIVE)));
                return state;
            }
            return false;
        },
        savePassedLevel: function(stage, level){
            if(checkForStorage()){
                var passedLevels = localStorage.getItem(CONST_PASSEDLEVELS);
                if(passedLevels){
                    passedLevels = JSON.parse(passedLevels);
                    passedLevels.push(stage + "_" + level);
                } else {
                    passedLevels = [stage + "_" + level];
                }
                localStorage.setItem(CONST_PASSEDLEVELS, JSON.stringify(passedLevels));
            }
        },
        isLevelPassed: function (stage, level){
            if(checkForStorage()){
                var Levels = JSON.parse(localStorage.getItem(CONST_PASSEDLEVELS));
                if(Levels && Levels.indexOf(stage+"_"+level) >= 0){
                    return true;
                } else {
                    return false;
                }
            }
        }
    };
}());
