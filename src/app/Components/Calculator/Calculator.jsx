import React from 'react';

export default class Calculator extends React.Component {
    render(){
        return (
            <div id='calculate'>
                <div className='line'>
                    0
                </div>
                <div className='line'>
                    <div>AC</div>
                    <div>+/-</div>
                    <div>%</div>
                    <div>/</div>
                </div>
                <div className='line'>
                    <div>7</div>
                    <div>8</div>
                    <div>9</div>
                    <div>X</div>
                </div>
                <div className='line'>
                    <div>4</div>
                    <div>5</div>
                    <div>6</div>
                    <div>-</div>
                </div>
                <div className='line'>
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>+</div>
                </div>
                <div className='line'>
                    <div>0</div>
                    <div>-</div>
                    <div>=</div>
                </div>
            </div>
        )
    }
}