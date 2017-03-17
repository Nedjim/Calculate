import React from 'react';

export default class Calculator extends React.Component {

    constructor(){
        super();
        this.state = {
            displayValue: '0',   
            operand : false,     
            operator: null,      
            result: null        
        }
    }

    inputDigit(e){
        let digit = e.target.value;
        let currentValue = this.state.displayValue;

        if(this.state.operand){
            this.setState({
                displayValue : digit,
                operand: false
            });
        }
        else {
            this.setState({
                displayValue: currentValue === '0' ? digit : currentValue + digit
            });
        }
    }

    inputDot(e){
        if(this.state.operand){
            this.setState({
                displayValue: '0.',
                operand: false
            });
        }
        else if(this.state.displayValue.indexOf('.') === -1){
                this.setState({
                    displayValue: this.state.displayValue + '.',
                });
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

    operation(e){

        let displayValue =  this.state.displayValue;
        let next = parseFloat(this.state.displayValue);
        let currentOperator = e.target.value;
        let operator = this.state.operator;
        let result = this.state.result;

        const operations = {
            '+' : (prev, next) => prev + next,
            '-' : (prev, next) => prev - next,
            'x' : (prev, next) => (prev * next),
            '/' : (prev, next) => prev / next,
            '=' : (prev, next) => next
        }
      
        if(result == null) {
            this.setState({
                result : next
            });
        } else if(operator){
            let prev = result || 0;
            let computedResult = operations[operator](prev, next);

            this.setState({
                result: computedResult,
                displayValue: String(computedResult)
            });
        }

        this.setState({
            operand: true,
            operator: currentOperator //
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
                    <button onClick={this.operation.bind(this)} value='/'>/</button>
                </div>
                <div className='line'>
                    <button onClick={this.inputDigit.bind(this)} value='7'>7</button>
                    <button onClick={this.inputDigit.bind(this)} value='8'>8</button>
                    <button onClick={this.inputDigit.bind(this)} value='9'>9</button>
                    <button onClick={this.operation.bind(this)} value='x'>X</button>
                </div>
                <div className='line'>
                    <button onClick={this.inputDigit.bind(this)} value='4'>4</button>
                    <button onClick={this.inputDigit.bind(this)} value='5'>5</button>
                    <button onClick={this.inputDigit.bind(this)} value='6'>6</button>
                    <button onClick={this.operation.bind(this)} value='-'>-</button>
                </div>
                <div className='line'>
                    <button onClick={this.inputDigit.bind(this)} value='1'>1</button>
                    <button onClick={this.inputDigit.bind(this)} value='2'>2</button>
                    <button onClick={this.inputDigit.bind(this)} value='3'>3</button>
                    <button onClick={this.operation.bind(this)} value='+'>+</button>
                </div>
                <div className='line'>
                    <button onClick={this.inputDigit.bind(this)} value='0'>0</button>
                    <button onClick={this.inputDot.bind(this)}>.</button>
                    <button onClick={this.operation.bind(this)} value='='>=</button>
                </div>
            </div>
        )
    }
}