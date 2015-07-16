var graphics = (function() {
    return {
        draw: function(elements) {
            var gridCell = document.getElementsByClassName('grid-cell'), i = 0, index= 0;
            for(i = 0; i < gridCell.length; i++){
                gridCell[i].innerHTML = '';
            }
            for (index = 0; index < elements.length; ++index) {
                var item = elements[index];
                if(typeof item.pos !== 'undefined'){
                    var cell = item.pos.y * Cols + item.pos.x;
                    //console.log(cell);
                    var cls = item.cls;
                    if(item.value === symbols[3].symbol){
                        cls += ' equal';
                    }
                    gridCell[cell].innerHTML = '<div class="item ' + cls + '">' + item.value + '</div>';
                }
            }
            return graphics;
        },
        highlightElements: function(positions){
            var i = 0, cellNo, gridCell = document.getElementsByClassName('grid-cell');
            for(i = 0; i < positions.length; i++){
                cellNo = positions[i].y * Cols + positions[i].x;
                gridCell[cellNo].childNodes[0].className += ' destroy';
            }
        }
    };
}());


