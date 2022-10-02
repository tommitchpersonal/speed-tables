import React, {Component} from 'react';
import'./Square.css';

class Square extends React.Component {

    constructor(props) {
        super(props)
        this.handleChange=this.handleChange.bind(this);
        this.state = {value: ''};
    }

    handleChange(e) {
        this.setState({value: e.target.value});
        this.props.onContentChange(this.props.xPosition, this.props.yPosition, e.target.value);
    }

    isCorrect() {
        return (this.state.value == this.props.xValue * this.props.yValue && this.state.value != '');
    }

    render() {
        let color = 'grey';
        let content = '';
        let isEditable = false;

        if (this.props.xPosition === 0 && this.props.yPosition === 0){
        color = 'grey';
        content = '';
        isEditable = false;
        }
        else if (this.props.xPosition === 0) {
        color = 'grey';
        content = this.props.content;
        isEditable = false;
        }
        else if (this.props.yPosition === 0) {
        color = 'grey';
        content = this.props.content;
        isEditable = false;
        }
        else {
        let isCorrect = this.isCorrect();
        color = isCorrect ? 'green' : 'red';
        isEditable = !isCorrect;
        content=this.props.content;
        }

        return( 
        <input 
        className='square' 
        disabled={!isEditable}
        value={content} 
        onChange={this.handleChange}
        style={{
            backgroundColor: color
        }}/>
        )  
    }
}

export default Square;
