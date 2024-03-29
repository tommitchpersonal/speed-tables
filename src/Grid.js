import React from 'react';
import Square from './Square.js';

class Grid extends React.Component {
    
    constructor(props) {
        super(props);
    }

    renderSquare(xPos, yPos, xVal, yVal, content) {
        return (
            < Square 
                xPosition = {xPos}
                yPosition = {yPos}
                key = {xPos + " " + yPos}
                xValue = {xVal}
                yValue = {yVal} 
                content = {content}
                onContentChange = {this.props.onContentChange}
            />
        );
    }

    render() {
        let squares = [];

        for (var i = 0; i < this.props.grid.length; i++) {
            for (var j = 0; j < this.props.grid[i].length; j++) {
                const square = this.renderSquare(i, j, this.props.grid[i][0], this.props.grid[0][j], this.props.grid[i][j]);
                squares.push(square);
            };
        };

        return (
            <div className='grid'>
                {squares.map(square => square)}
            </div>
        );
    }
}

export default Grid;