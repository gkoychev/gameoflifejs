(function(scope, document) {

    /* Cell */
    function Cell(x, y) {
        this.x = x;
        this.y = y;
        this.live = false;
    }

    Cell.prototype.setState = function(live){
        this.live = live;
    };



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



    /* Life Canvas */
    function Life(options){
        this.canvasId = options.canvasId || 'life';
        this.cellSize = options.cellSize || 8;
        this.gridWidth = options.gridWidth || 40;
        this.gridHeight = options.gridHeight || 30;
        this.runInterval = options.runInterval || 80;
        this.initialPoints = options.initialPoints || [];
        this.pointColor = options.pointColor || '#4679bd';
        this.pointBorderColor = options.pointBorderColor || '#eeeeee';

        this.initCanvas();

        this.grid = new Grid(this.gridWidth, this.gridHeight);
        this.grid.fillPoints(this.initialPoints);

        this.render();
    }

    Life.prototype.initCanvas = function(){
        this.canvas = document.getElementById(this.canvasId);
        this.canvas.width = this.cellSize * this.gridWidth;
        this.canvas.height = this.cellSize * this.gridHeight;
        this.canvas.getContext('2d').strokeStyle = this.pointBorderColor;
        this.canvas.getContext('2d').fillStyle = this.pointColor;
    };

    Life.prototype.render = function(){
        var y, x;
        var that = this,
            ctx = this.canvas.getContext('2d');

        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (y=0; y < this.gridHeight; y++) {
            for (x=0; x < this.gridWidth; x++) {
                var cell = this.grid.getCellAt(x, y);
                ctx.beginPath();
                ctx.rect(x * that.cellSize, y * that.cellSize, that.cellSize, that.cellSize);
                if (cell.live) {
                    ctx.fill();
                } else {
                    ctx.stroke();
                }
            }
        }
    };

    Life.prototype.run = function(){
        this.runTimer = setInterval(function() {

            this.grid.nextGen();
            this.render();

        }.bind(this), this.runInterval);
    };

    Life.prototype.stop = function(){
        clearInterval(this.runTimer);
    };

    //expose Life to global scope
    scope.Life = Life;

}(window, document));



//run it
new Life({
    canvasId: 'life',
    cellSize: 10,
    initialPoints: [
        // Gosper glider gun
        [1, 5],[1, 6],[2, 5],[2, 6],[11, 5],[11, 6],[11, 7],[12, 4],[12, 8],[13, 3],[13, 9],[14, 3],[14, 9],[15, 6],[16, 4],[16, 8],[17, 5],[17, 6],[17, 7],[18, 6],[21, 3],[21, 4],[21, 5],[22, 3],[22, 4],[22, 5],[23, 2],[23, 6],[25, 1],[25, 2],[25, 6],[25, 7],[35, 3],[35, 4],[36, 3],[36, 4]
    ]

}).run();
