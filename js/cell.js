if (typeof module !== 'undefined' && module.exports) {
    module.exports = Cell;
}


/* Cell */
function Cell(x, y) {
    this.x = x;
    this.y = y;
    this.live = false;
}

Cell.prototype.setState = function(live){
    this.live = live;
};


