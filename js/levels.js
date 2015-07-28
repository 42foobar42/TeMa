var levelController = (function(win) {
    var nextBricks = [], level, stageID = null, levelID = null;
    function reset(){
        brick.deleteAllBricks();
        gameButton.onclick = function(){levelController.startLevel(); };
        gameButton.disabled = false;
        Points = 0;
        scoreBoard.innerHTML = Points;
        graphics.draw([]);
        nextStoneBoard.innerHTML = '';
        endless = false;
    }
    function setNextStone(obj){
        if (nextBricks.length <= 0){
            return false;
        }
        obj.value = nextBricks.shift();
        if(!isNaN(obj.value)){
            nextStone.cls = 'number';
        } else {
            nextStone.cls = 'symbol';
        }
        return obj;
    }
    return {
        printLevelMenu: function(){
            var i = 0, html = '', d;
            for(i=0; i < LEVELS.length; i++){
                html += '<div class="stage">';
                html += '<h3>' + LEVELS[i].title + '</h3>';
                html += '<div class="levels">';
                for(d=0; d < LEVELS[i].levels.length; d++){
                    html += '<input type="button" value="' + LEVELS[i].levels[d] + '" onclick="levelController.playLevel(\'' + i + '_' + d + '\')"';
                    if(storage.isLevelPassed(i, LEVELS[i].levels[d])){
                        html += ' class="passed"';
                    }
                    html += '>';
                }
                html += '</div>';
                html += '</div>';
            }
            levelMenu.innerHTML = html;
            pausescreen.style.display = 'inherit';
            playground.style.display = 'none';
            startLevelScreen.style.display = 'none';
        },
        playLevel: function (id){
            var levelIDS = id.split("_"), stage, d, localBrick, brickData, html, i=0;
            
            reset();
            stage = LEVELS[levelIDS[0]];
            stageID = levelIDS[0];
            levelID = stage.levels[levelIDS[1]];
            level = stage[levelID];
            for(d = 0; d < level.startBricks.length; d++){
                brickData = level.startBricks[d];
                localBrick = brick.generateBrick(brickData.x, brickData.y);
                localBrick.value = brickData.value;
                if(!isNaN(localBrick.value)){
                    localBrick.cls = 'number';
                } else {
                    localBrick.cls = 'symbol';
                }
                brick.addBrick(localBrick);
            }
            nextBricks = JSON.parse(JSON.stringify(level.nextBricks));
            graphics.draw(brick.getBricks());
            GameOn = false;
            nextStone = brick.generateBrick(Math.floor(Cols/2),0);
            nextStone = setNextStone(nextStone);
            if(typeof level.startScreen !== 'undefined'){
                html = '<div class="leveldesc">' + level.startScreen + '</div>';
                if(typeof level.img !== 'undefined'){
                    html += '<div class="images">';
                    if(level.img.length > 1){
                        html+='<div class="imageButWrap left"><input class="imageBut left" type="button" value="&#60;" onclick="levelController.nextImage(\'-\')"></div>';
                    }
                    for(i=0; i < level.img.length; i++){
                        html+='<img src="js/level/' + level.img[i] + '" class="';
                        if(i > 0){
                            html+= 'hidden';
                        } else {
                            html+= 'shown';
                        }
                        html+=' startScreenImg">';
                    }
                    if(level.img.length > 1){
                        html+='<div class="imageButWrap right"><input class="imageBut" type="button" value="&#62;" onclick="levelController.nextImage(\'+\')"></div>';
                    }
                    html += '</div>';
                }
                html += '<div class="buttons">';
                html += '<input type="button" class="levelButton" value="Start" onclick="levelController.startLevel()">';
                html += '<input type="button" class="levelButton" value="Back" onclick="levelController.printLevelMenu()">';
                html += '</div>';
                startLevelScreen.innerHTML = html;
                startLevelScreen.style.display = 'inherit';
                playground.style.display = 'none';
                pausescreen.style.display = 'none';
            } else {
                this.startLevel();
            }
        },
        startLevel: function (){
            gameAlive = true;
            if (GameOn === false){
                GameOn = true;
                gameButton.className = gameButton.className.replace('play', '');
                gameButton.className = 'pause';
                playground.style.display = 'inherit';
                pausescreen.style.display = 'none';
                startLevelScreen.style.display = 'none';
                GameInterval = setInterval(levelGameLoop, TIME);
            } else {
                GameOn = false;
                gameButton.className = gameButton.className.replace('pause', '');
                gameButton.className = 'play';
                playground.style.display = 'none';
                pausescreen.style.display = 'inherit';
                startLevelScreen.style.display = 'none';
                clearInterval(GameInterval);
            }
        },
        gameLoop: function(){
            var active = brick.getActiveBrick(), obj;
            if(!active){
                obj = nextStone;
                obj.active = true;
                nextStone = brick.generateBrick(Math.floor(Cols/2),0);
                nextStone = setNextStone(nextStone);
                if(nextStone){
                    nextStoneBoard.innerHTML = nextStone.value;
                } else {
                    nextStoneBoard.innerHTML = '';
                }
                if(obj !== false && !brick.isPosOccupied(obj.pos) ){
                    brick.addBrick(obj);
                } else {
                    if(!brick.getActiveBrick()){
                        setTimeout(levelEnd, 150);
                    }
                }
            } else {
                brick.moveActiveBrick();
            }
            graphics.draw(brick.getBricks());
            if(!checkBricks(levelGameLoop)){
                deleteTriples(levelGameLoop);
            }
            return levelController;
        },
        endLevel: function (){
            clearInterval(GameInterval);
            gameButton.disabled = true;
            GameOn = false;
            if(Points >= level.winningConditions.score && brick.getBricks().length <= level.winningConditions.bricks ) {
                pauseMsg.innerHTML = "You won!";
                storage.savePassedLevel(stageID, levelID);
                this.printLevelMenu();
            } else {
                pauseMsg.innerHTML = "You lost!";
            }
            playground.style.display = 'none';
            pausescreen.style.display = 'inherit';
            startLevelScreen.style.display = 'none';
        },
        continueLevel: function(stageAndLevel){
            gameButton.onclick = function(){levelController.startLevel(); };
            gameButton.disabled = false;
            GameOn = false;
            stageID = stageAndLevel[0];
            levelID = stageAndLevel[1];
            level = LEVELS[stageID][levelID];
        },
        getStageAndLevel: function (){
            return [stageID, levelID];
        },
        nextImage: function(direction){
            var images = document.getElementsByClassName('startScreenImg'), i=0;
            for(i=0; i < images.length; i++){
                if(images[i].className.indexOf('shown') >= 0){
                    images[i].className = images[i].className.replace('shown', 'hidden');
                    if(direction === '+'){
                        if(i === images.length - 1){
                            i = 0;
                        } else {
                            i++;
                        }
                    } else if(direction === '-'){
                        if(i===0){
                            i = images.length - 1;
                        } else {
                            i--;
                        }
                    }
                    images[i].className = images[i].className.replace('hidden', 'shown');
                    return ;
                }
            }
            console.log(direction);
        }
    };
}(window));

var levelGameLoop = function (){
    levelController.gameLoop();
}

var levelEnd = function (){
    levelController.endLevel();
    gameAlive = false;
}