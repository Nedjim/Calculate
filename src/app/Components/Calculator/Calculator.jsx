import React from 'react';

export default class Calculator extends React.Component {

    constructor(){
        super();
        this.state = {
            displayValue: '0'
        }
    }

    inputDigit(e){
        let digit = e.target.value;
        let currentValue = this.state.displayValue;

        this.setState({
            displayValue: currentValue === '0' ? digit : currentValue + digit
        });
    }

    inputDot(e){
        if(this.state.displayValue.indexOf('.') === -1){
             this.setState({displayValue: this.state.displayValue + '.'});
        }
    }

    inputPercent(){
         let currentValue = parseFloat(this.state.displayValue);

         this.setState({
             displayValue: String(currentValue /100)
         });

    }

    clearDisplay(){
        this.setState({displayValue : '0'});
    }

    toggleSign(){
        let currentValue = this.state.displayValue;
        this.setState({
            displayValue : currentValue.charAt(0) === '-' ? currentValue.substring(1) : '-' + currentValue
        });
    }

    render(){
        return (
            <div id='calculate'>
                <div className='line'>{this.state.displayValue}</div>
                <div className='line'>
                    <button onClick={this.clearDisplay.bind(this)}>AC</button>
                    <button onClick={this.toggleSign.bind(this)}>+/-</button>
                    <button onClick={this.inputPercent.bind(this)}>%</button>
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
                    <button onClick={this.inputDot.bind(this)}>.</button>
                    <button>=</button>
                </div>
            </div>
        )
    }
}