import React from 'react';
import Calculator from './Calculator/Calculator.jsx';
import Header from './Header/Header.jsx';


export default class App extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <Calculator />
            </div>
        )
    }
}