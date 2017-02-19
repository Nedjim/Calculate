import React from 'react';

export default class Calculator extends React.Component {

    /*----------------Constructeur----------------------*/
    constructor(){
        super();
        this.state = {
            displayValue: '0',   //valeur afficher à l'écran
            operand : false,     //opération en cours ou pas
            operator: null,      //opérateur
            result: null         //resultat
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
        // valeur actuel en chaîne de caractère
        let displayValue =  this.state.displayValue;
        // valeur actuel en flottant
        let next = parseFloat(this.state.displayValue);
        // operateur choisit
        let currentOperator = e.target.value;
        // opérateur stocké dans le state
        let operator = this.state.operator;
        // resultat actuel
        let result = this.state.result;

        /*--------------Gestion des calcules---------- */
        /*-------------------------------------------- */
        const operations = {
            //prev = première valeur
            //next = deuxieme valeur
            '+' : (prev, next) => prev + next,
            '-' : (prev, next) => prev - next,
            'x' : (prev, next) => (prev * next),
            '/' : (prev, next) => prev / next,
            '=' : (prev, next) => next
        }
        /*---------------------------------------------*/
        /*-------------------TEST----------------------*/
        if(result == null) {
            //si le resultat est à null, on passe la valeur en cours au result
            this.setState({
                result : next
            });

            //si on a pas choisi d'opérateur avant
        } else if(operator){
            //le resultat courant prend la valeur du result
            let prev = result || 0;
            // opération
            let computedResult = operations[operator](prev, next);

            this.setState({
                //on récupère la valeur de retour de l'opération
                result: computedResult,
                //on convertit la valeur du résultat en string pour l'afficher
                displayValue: String(computedResult)
            });
        }

        this.setState({
            //on indique qu'on a une opération on cours et on récupère la valeur de l'opérateur
            operand: true,
            operator: currentOperator //
        });
    }

    /*--------------------------------RENDER----------------------------------------*/
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