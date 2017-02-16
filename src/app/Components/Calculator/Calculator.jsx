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

    /*-------Affichage des digits sur l'écran------------*/
    inputDigit(e){
        let digit = e.target.value;
        let currentValue = this.state.displayValue;

        //si on a cliqué sur un opérateur juste avant
        //on efface les digit qu'on a écrit avant
        if(this.state.operand){
            this.setState({
                displayValue : digit,
                operand: false
            });
        }
        //sinon on concatène
        else {
            this.setState({
                displayValue: currentValue === '0' ? digit : currentValue + digit
            });
        }
    }

    /*-----------Ajout du point au nombre----------*/
    inputDot(e){
        //si on a cliqué sur un opérateur juste avant
        //on efface et on affiche 0.
        if(this.state.operand){
            this.setState({
                displayValue: '0.',
                operand: false
            });
        }
        //sinon on test si non déjà présent dans la chaîne
        else if(this.state.displayValue.indexOf('.') === -1){
                //si il y en a pas on ajoute le point à la fin du nombre
                this.setState({
                    displayValue: this.state.displayValue + '.',
                });
        }
    }
    /*----------------Pourcentage------------------- */
    inputPercent(){
        //on convertit la chaine en floatant
         let currentValue = parseFloat(this.state.displayValue);

         this.setState({
             //on divise la valeur par 100 et on la convertit en string
             displayValue: String(currentValue /100)
         });
    }

    /*----------------Effacer-------------------------*/
    clearDisplay(){
        this.setState({displayValue : '0'});
    }

    /*--------------Changement de signe-------------- */
    toggleSign(){
        let currentValue = this.state.displayValue;
        //test le premier caractère de la chaine, si il y a un - on retourne la chaine à partir de l'indice 1 sinon on ajoute le -
        this.setState({
            displayValue : currentValue.charAt(0) === '-' ? currentValue.substring(1) : '-' + currentValue
        });
    }

    /*-----------------Opérations--------------------*/
    operation(e){
        let displayValue =  this.state.displayValue;
        let operator = this.state.operator;
        let result = this.state.result;
        let next = parseFloat(displayValue);
        let nextOperator = e.target.value;

        const operations = {
            '+' : (prev, next) => prev + next,
            '-' : (prev, next) => prev - next,
            '*' : (prev, next) => prev * next,
            '/' : (prev, next) => prev / next,
            '=' : (prev, next) => next
        }

        if(result == null) {
            this.setState({
                result : next
            });

        } else if(operator){
            let currentResult = result || 0;
            let computedResult = operations[operator](currentResult, next);

            this.setState({
                result: computedResult,
                displayValue: String(computedResult)
            });
        }

        this.setState({
            operand: true,
            operator: nextOperator
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