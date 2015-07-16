var storage = (function() {
    var CONST_HIGHSCORE = "highscore", CONST_BRICKS = "bricks", CONST_SCORE = "score", CONST_NEXTSTONE = "nextStone";
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
        saveGameState: function(bricks, score, nextStone){
            if(checkForStorage()){
                localStorage.setItem(CONST_BRICKS, JSON.stringify(bricks));
                localStorage.setItem(CONST_SCORE, score);
                localStorage.setItem(CONST_NEXTSTONE, JSON.stringify(nextStone));
            }
        },
        loadGameState: function(){
            if(checkForStorage()){
                var state = [];
                state.push(JSON.parse(localStorage.getItem(CONST_BRICKS)));
                state.push(parseInt(localStorage.getItem(CONST_SCORE)));
                state.push(JSON.parse(localStorage.getItem(CONST_NEXTSTONE)));
                return state;
            }
            return false;
        }
    };
}());
