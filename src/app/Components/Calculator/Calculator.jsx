import React from 'react';

export default class Calculator extends React.Component {

    constructor(){
        super();
        this.state = {
            displayValue: '0'
        }
    }

    inputDigit(e){
        let digit = parseInt(e.target.value);
        let currentValue = this.state.displayValue;
        this.setState({
            displayValue: parseInt(currentValue) === 0 ? digit : currentValue + e.target.value
        });
    }

    render(){
        return (
            <div id='calculate'>
                <div className='line'>{this.state.displayValue}</div>
                <div className='line'>
                    <button>AC</button>
                    <button>+/-</button>
                    <button>%</button>
                    <button>/</button>
                </div>
                <div className='line'>
                    <button onClick={this.inputDigit.bind(this)} value='7'>7</button>
                    <button onClick={this.inputDigit.bind(this)} value='8'>8</button>
                    <button onClick={this.inputDigit.bind(this)} value='9'>9</button>
                    <button>X</button>
                </div>
                <div className='line'>
                    <button onClick={this.inputDigit.bind(this)} value='4'>4</button>
                    <button onClick={this.inputDigit.bind(this)} value='5'>5</button>
                    <button onClick={this.inputDigit.bind(this)} value='6'>6</button>
                    <button>-</button>
                </div>
                <div className='line'>
                    <button onClick={this.inputDigit.bind(this)} value='1'>1</button>
                    <button onClick={this.inputDigit.bind(this)} value='2'>2</button>
                    <button onClick={this.inputDigit.bind(this)} value='3'>3</button>
                    <button>+</button>
                </div>
                <div className='line'>
                    <button onClick={this.inputDigit.bind(this)} value='0'>0</button>
                    <button>-</button>
                    <button>=</button>
                </div>
            </div>
        )
    }
}