var assert = require("assert"),

    Cell = require('../js/cell'),
    Grid = require('../js/grid'),
    Life = require('../js/life');

describe('Cell', function(){
    var cell;

    beforeEach(function(){
        cell = new Cell();
    });

    describe('#new()', function(){
        it('should not be alive', function(){
            assert.equal(false, cell.live);
        })
    });

    describe('#setState(true)', function(){
        it('should be alive', function(){
            cell.setState(true);
            assert.equal(true, cell.live);
        })
    });

    describe('#setState(false)', function(){
        it('should not be alive', function(){
            cell.setState(false);
            assert.equal(false, cell.live);
        })
    });
});


describe('Grid', function(){
    var grid;

    beforeEach(function(){
        grid = new Grid(10, 15);
    });

    describe('#cells array rows', function(){
        it('should be 15', function(){
            assert.equal(15, grid.cells.length);
        })
    });

    describe('#cells array cols', function(){
        it('should be 10', function(){
            assert.equal(10, grid.cells[0].length);
        })
    });

    describe('#fillPoints([[1,3]])', function(){
        it('should set live point at [3][1]', function(){
            grid.fillPoints([[1,3]]);
            assert.equal(true, grid.cells[3][1].live);
        })
    });

    describe('#getCellAt(1,3)', function(){
        it('should return live cell', function(){
            grid.fillPoints([[1,3]]);
            assert.equal(true, grid.getCellAt(1,3).live);
        })
    });

    describe('#countCellNeighbours(1,2)', function(){
        it('should return 1', function(){
            grid.fillPoints([[1,3]]);
            assert.equal(1, grid.countCellNeighbours(1,2));
        })
    });
    //
});