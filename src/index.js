import { getSelectionRange } from '@testing-library/user-event/dist/utils';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const invoke = window.__TAURI__.invoke;

class Square extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      xPosition: props.xPosition,
      yPosition: props.yPosition,

      xValue: props.xValue,
      yValue: props.yValue,

      isCorrect: false
    }
  }

  render() {

    console.log(this.state.xValue, this.state.yValue);

    let color = 'grey';
    let content = null;
    let isEditable = false;

    if (this.state.xPosition === 0 && this.state.yPosition === 0){
      color = 'grey';
      content = null;
      isEditable = false;
    }
    else if (this.state.xPosition === 0) {
      color = 'grey';
      content = this.state.yValue;
      isEditable = false
    }
    else if (this.state.yPosition === 0) {
      color = 'grey';
      content = this.state.xValue;
      isEditable = false;
    }
    else {
      color = this.isCorrect ? 'green' : 'red';
      content = null;
      isEditable = true;
    }

    return (
      <div className='square' contentEditable={isEditable}
      style={{
        backgroundColor: color
      }}>
        {content}
      </div>
      )
    
  }
}


class App extends React.Component{

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    invoke('get_random_array', {arraySize :12})
     .then(horizontalNumbers => this.setState({horizontalNumbers}))
    
    invoke('get_random_array', {arraySize :12})
      .then(verticalNumbers => this.setState({verticalNumbers}))
  }

  render() {

    if (this.state.horizontalNumbers && this.state.verticalNumbers) {
      return(
        <Grid horizontalNumbers={this.state.horizontalNumbers} verticalNumbers={this.state.verticalNumbers}/>
      )
    }
  } 
}


class Grid extends React.Component{

  constructor (props) {
    console.log(props);
    super(props);
    this.state = {horizontalNumbers: props.horizontalNumbers, 
      verticalNumbers: props.verticalNumbers};
  }

  renderSquare(xPos, yPos, xVal, yVal) {
    return (
    < Square 
      xPosition = {xPos}
      yPosition = {yPos}
      xValue = {xVal}
      yValue = {yVal} 
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

  render() {

    const rowLength = this.state.horizontalNumbers.length + 1;
    const columnLength = this.state.verticalNumbers.length + 1;

    const grid =  this.twoDimensionArray(rowLength, columnLength);

    console.log(rowLength);
    console.log(columnLength);

    for (var i = 0; i < rowLength; i++) { 
      for(var j = 0; j < columnLength; j++) {
        grid[i][j] = this.renderSquare(i, j, this.state.horizontalNumbers[i-1], this.state.verticalNumbers[j-1]);
      }
    }

    return(
      <div className = 'grid'>
        {grid}
      </div>
    )
  }
}

// ================================================================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
