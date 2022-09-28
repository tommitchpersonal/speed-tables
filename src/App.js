import React from 'react';
import "./App.css";
import Square, {Component} from './Square.js';

const invoke = window.__TAURI__.invoke;

class App extends React.Component{

    constructor(props) {
      super(props);
      this.state = {
      };
    }
  
    generateGrid(horizontalNumbers, verticalNumbers) {
      const rowLength = horizontalNumbers.length + 1;
      const columnLength = verticalNumbers.length + 1;
  
      let grid =  this.twoDimensionArray(rowLength, columnLength);
  
      for (var i = 0; i < rowLength; i++) { 
        for (var j = 0; j < columnLength; j++) {
          grid[i][j]=this.renderSquare(i, j, verticalNumbers[i-1], horizontalNumbers[j-1]);
        }
      }
  
      return(
        {grid}
      );
    }
  
    renderSquare(xPos, yPos, xVal, yVal) {
      return (
      < Square 
        xPosition = {xPos}
        yPosition = {yPos}
        xValue = {xVal}
        yValue = {yVal} 
        onContentChange = {this.handleContentChange.bind(this)}
      />)
    }
  
    updateSquare(xPos, yPos, xVal, yVal, content) {
  
      console.log("updating square: ", content);
  
      return (
        < Square 
          xPosition = {xPos}
          yPosition = {yPos}
          xValue = {xVal}
          yValue = {yVal} 
          content = {content}
          onContentChange = {this.handleContentChange.bind(this)}
        />)
    }
  
    twoDimensionArray(a, b) {
      let arr = [];
    
      // creating two dimensional array
      for (let i = 0; i< a; i++) {
        for(let j = 0; j< b; j++) {
          arr[i] = [];
        }
      }
  
      return arr;
    }
  
    handleContentChange(xPos, yPos, xVal, yVal, content) {
  
      console.log(xPos, yPos, xVal, yVal, content);
      let newGrid = this.state.grid;
  
      newGrid[xPos][yPos] = this.updateSquare(xPos, yPos, xVal, yVal, content);
  
      console.log(newGrid[xPos][yPos]);
      this.setState({grid: newGrid});
      console.log(this.state.grid[xPos][yPos]);
    }
  
    async componentDidMount() {
      const horizontalNumbers = await invoke('get_random_array', {arraySize :12})
      
      const verticalNumbers = await invoke('get_random_array', {arraySize :12})
  
      let grid = this.generateGrid(horizontalNumbers, verticalNumbers);
  
      this.setState(grid);
    }
  
    render() {
  
      if (this.state.grid) {
  
        return(
          <div className='grid'>
            {this.state.grid}
          </div>
        )
      }
    } 
  }

  export default App;