import React from 'react';
import "./App.css";
import Grid from './Grid.js';
import BackendInterface from './BackendInterface';

class App extends React.Component{

    numberOfHorizontalNumbers = 12;
    numberOfVerticalNumbers = 12;

    gridWidth = this.numberOfHorizontalNumbers + 1;
    gridHeight = this.numberOfVerticalNumbers + 1;

    backendInterface = new BackendInterface();

    constructor(props) {
      super(props);
      this.state = {grid: new Array(this.gridWidth).fill('').map(() => new Array(this.gridHeight).fill('')), isCompleted: false};
    }
  
    generateGrid(horizontalNumbers, verticalNumbers) {
    
        let newGrid = new Array(this.gridWidth).fill('').map(() => new Array(this.gridHeight).fill(''));

        for (var i = 0; i < this.gridHeight; i++) { 
            for (var j = 0; j < this.gridWidth; j++) {
                if (i===0 && j===0) {
                    newGrid[i][j]="";
                }
                else if (i===0) {
                    newGrid[i][j]=horizontalNumbers[j-1].toString();
                }
                else if (j===0) {
                    newGrid[i][j]=verticalNumbers[i-1].toString();
                }
                else {
                    newGrid[i][j]="";
                }
            }
        }

        return newGrid;
    }

    handleContentChange(xPos, yPos, content) {
      let newGrid = this.state.grid;
  
      newGrid[xPos][yPos] = content.toString();
  
      this.setState({grid: newGrid});
    }
  
    async componentDidMount() {
      const horizontalNumbers = await this.backendInterface.generateArray(this.numberOfHorizontalNumbers);
      
      const verticalNumbers = await this.backendInterface.generateArray(this.numberOfVerticalNumbers);
  
      const newGrid = this.generateGrid(horizontalNumbers, verticalNumbers);

      this.setState({grid: newGrid});
    }

    async componentDidUpdate() {
        const isCompleted = await this.backendInterface.verifyCompletion(this.state.grid);

        console.log(isCompleted);

        if (isCompleted && !this.state.isCompleted) {
            this.setState({isCompleted: true});
        }
    }
  
    render() {
        if (this.state.grid) {   
            return(
                <Grid 
                    grid={this.state.grid}
                    onContentChange={this.handleContentChange.bind(this)}
                />
            )
        }
    } 
  }

  export default App;