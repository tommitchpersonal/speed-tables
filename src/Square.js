import React from 'react';
import'./Square.css';
import BackendInterface from './BackendInterface';

class Square extends React.Component {

    backendInterface = new BackendInterface();

    constructor(props) {
        super(props)
        this.handleChange=this.handleChange.bind(this);
        this.state = {value: '', answerCorrect: false};
    }

    handleChange(e) {
        this.setState({value: e.target.value});
        this.props.onContentChange(this.props.xPosition, this.props.yPosition, e.target.value);
    }

    async componentDidUpdate() {

        let isCorrect = await this.backendInterface.isCorrect(this.state.value, this.props.xValue.toString(), this.props.yValue.toString())

        if (isCorrect && !this.state.answerCorrect) {
            this.setState({answerCorrect: true});
        }
    }

    render() {
        let color = 'grey';
        let isEditable = false;

        if (this.props.xPosition === 0 && this.props.yPosition === 0){
        color = 'grey';
        isEditable = false;
        }
        else if (this.props.xPosition === 0) {
        color = 'grey';
        isEditable = false;
        }
        else if (this.props.yPosition === 0) {
        color = 'grey';
        isEditable = false;
        }
        else {
        color = this.state.answerCorrect ? 'green' : 'red';
        isEditable = !this.state.answerCorrect;
        }

        return( 
        <input 
        className='square' 
        disabled={!isEditable}
        value={this.props.content} 
        onChange={this.handleChange}
        style={{
            backgroundColor: color
        }}/>
        )  
    }
}

export default Square;
