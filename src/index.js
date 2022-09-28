import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const invoke = window.__TAURI__.invoke;

class Square extends React.Component {

  constructor(props) {
    super(props)
    this.handleChange=this.handleChange.bind(this);
    this.state = {};
    }

  handleChange(e) {
    this.setState({value: e.target.value});
    this.props.onContentChange(this.props.xPosition, this.props.yPosition, this.props.xValue, this.props.yValue, e.target.value);
  }

  isCorrect() {
    return (this.state.value == this.props.xValue * this.props.yValue);
  }

  render() {
    let color = 'grey';
    let content = undefined;
    let isEditable = false;

    if (this.props.xPosition === 0 && this.props.yPosition === 0){
      color = 'grey';
      content = undefined;
      isEditable = false;
    }
    else if (this.props.xPosition === 0) {
      color = 'grey';
      content = this.props.yValue;
      isEditable = false;
    }
    else if (this.props.yPosition === 0) {
      color = 'grey';
      content = this.props.xValue;
      isEditable = false;
    }
    else {
      let isCorrect = this.isCorrect();
      color = isCorrect ? 'green' : 'red';
      isEditable = !isCorrect;
    }

    return( 
      <input 
      className='square' 
      disabled={!isEditable}
      disabledInputStyle={{opacity: 1}}
      value={content} 
      onChange={this.handleChange}
      style={{
        backgroundColor: color
      }}/>
    )  
  }
}


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

// ================================================================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
