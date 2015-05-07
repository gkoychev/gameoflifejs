if (typeof module !== 'undefined' && module.exports) {
    Grid = require('./grid');
    module.exports = Life;
}

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


