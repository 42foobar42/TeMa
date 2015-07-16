var controls = (function(win) {
    var map = {
        39: 'right', // Right
        40: 'down', // Down
        37: 'left', // Left
        76: 'right', // Vim right
        74: 'down', // Vim down
        72: 'left', // Vim left
        68: 'right', // D
        83: 'down', // S
        65: 'left'  // A
      }, startX, startY, touched, CONST_PXTOSIDE = 50, CONST_PXTODOWN = 50;
    function keyboard(){
        win.addEventListener("keydown", function (event) {            
            if(typeof map[event.keyCode] !== 'undefined'){
                if([32, 37, 38, 39, 40].indexOf(event.keyCode) > -1) {
                    event.preventDefault();
                }
                if(GameOn){
                    brick.moveActiveBrickByUser(map[event.keyCode]);
                }
            }
        });
    }
    function touchpad(){
        win.addEventListener('touchstart', function(e){
            var touchobj = e.changedTouches[0];
            startX = touchobj.pageX;
            startY = touchobj.pageY;
            if(e.target.tagName.toUpperCase() !== 'INPUT' && e.target.tagName.toUpperCase() !== 'P'){
                e.preventDefault();
            }
        });
        
        win.addEventListener('touchmove', function(e){
            var touchobj = e.changedTouches[0];
            var distX = touchobj.pageX - startX;
            var distY = touchobj.pageY - startY;
            if(GameOn){
                if(distX >= CONST_PXTOSIDE && distY < CONST_PXTODOWN/2){
                    startX = touchobj.pageX;
                    brick.moveActiveBrickByUser('right');
                }
                if(distX <= -CONST_PXTOSIDE && distY < CONST_PXTODOWN/2 ){
                    startX = touchobj.pageX;
                    brick.moveActiveBrickByUser('left');
                }
                if(distY > CONST_PXTODOWN){
                    startY = touchobj.pageY;
                    brick.moveActiveBrickByUser('down');
                }
            }
            if(e.target.tagName.toUpperCase() !== 'P'){
                e.preventDefault();
            }
        });
        
        win.addEventListener('touchend', function(e){
            
        });
    }
    return {
        init: function(){
            keyboard();
            touchpad();
        }
    };
}(window));