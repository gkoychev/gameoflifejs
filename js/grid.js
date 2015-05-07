if (typeof module !== 'undefined' && module.exports) {
    Cell = require('./cell');
    module.exports = Grid;
}


/* Grid */
function Grid(width, height) {
    this.width = width;
    this.height = height;
    this.cells = [];

    this.init();
}

Grid.prototype.init = function(){
    var y, x;
    for (y=0; y<this.height; y++) {
        this.cells[y] = [];
        for (x=0; x<this.width; x++) {
            this.cells[y][x] = new Cell(x, y);
        }
    }
};

Grid.prototype.getCellAt = function(x, y){
    // "cycle" field
    if (x<0) x = this.width - x;
    if (x>=this.width) x = x % this.width;
    if (y<0) y = this.height - y;
    if (y>=this.height) y = y % this.height;

    var cell = null;
    if (this.cells[y] && this.cells[y][x] instanceof Cell)
        cell = this.cells[y][x];
    return cell;
};

Grid.prototype.fillPoints = function(points){
    points.forEach(function(point) {
        var cell = this.getCellAt(point[0], point[1]);
        if (cell)
            cell.setState(true);
    }.bind(this));
    //console.log(JSON.stringify(this.cells));
};

Grid.prototype.countCellNeighbours = function(x, y){
    var cnt = 0;

    if (this.getCellAt(x-1, y-1).live) cnt++;
    if (this.getCellAt(x, y-1).live) cnt++;
    if (this.getCellAt(x+1, y-1).live) cnt++;
    if (this.getCellAt(x-1, y).live) cnt++;
    if (this.getCellAt(x+1, y).live) cnt++;
    if (this.getCellAt(x-1, y+1).live) cnt++;
    if (this.getCellAt(x, y+1).live) cnt++;
    if (this.getCellAt(x+1, y+1).live) cnt++;

    return cnt;
};

Grid.prototype.nextGen = function(){
    var next = [];

    var y, x;
    for (y=0; y < this.height; y++) {
        next[y] = [];
        for (x=0; x < this.width; x++) {
            var alive = false,
                cell = this.getCellAt(x, y),
                count = this.countCellNeighbours(x, y);
            //

            if (cell.live) {
                alive = count === 2 || count === 3;
            } else {
                alive = count === 3;
            }

            var newCell = new Cell(x, y);
            newCell.setState(alive);
            next[y][x] = newCell;

        }
    }

    this.cells = next;
};


