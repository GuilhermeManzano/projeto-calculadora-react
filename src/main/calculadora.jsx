import React, { Component } from 'react'
import './calculadora.css'

import Button from '../components/button'
import Display from '../components/display'

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}

export default class Calculator extends Component {

    state = { ...initialState }

    constructor(props) {
        super(props)
        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
    }

    //Limpa o visor
    clearMemory() {
        this.setState({ ...initialState })
    }

    setOperation(operation) {
        // Add um valor e, quando clicado em um operador, vai limpar o visor e permitir que seja
        // add um novo valor no display.
        if (this.state.current === 0) {
            this.setState({ operation, current: 1, clearDisplay: true })
        } else {
            // Caso seja clicado o = ele ira efetuar a operaçao desejada
            const equals = operation === '='
            const currentOperation = this.state.operation

            const values = [...this.state.values]
            try {
                values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)
            } catch (e) {
                values[0] = this.state.values[0]
            }
            values[1] = 0

            // Realiza o calculo da operaçao desejada e, caso o usuario clique em =, ira ]
            // fazer a operaçao de fato.
            this.setState({
                displayValue: values[0],
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay: !equals,
                values
            })
        }
    }

    addDigit(n) {
        //Verfica se já existe um . sendo exibido no visor e não permite que o usuario insira
        // um novo . (pois não existe nenhum numero que precisa de dois .)
        if (n === '.' && this.state.displayValue.includes('.')) {
            return  this.current = 0
        }

        //caso seja add um novo numero, o numero 0 irá sair e mostrar apenas o novo numero
        const clearDisplay = this.state.displayValue === '0'
            || this.state.clearDisplay
        const currentValue = clearDisplay ? '' : this.state.displayValue
        const displayValue = currentValue + n
        this.setState({ displayValue, clearDisplay: false })

        // Caso um numero seja adicionado, irá guardar este valor no array chamado values e, apos
        // clicar no simbolo de operaçao, vai salvar este valor na memoria e permitir que seja add 
        // um novo valor, para que seja feito o calculo.
        if (n !== '.') {
            const i = this.state.current
            const newValue = parseFloat(displayValue)
            const values = [...this.state.values]
            values[i] = newValue
            this.setState({ values })
        }
    }

    render() {
        return (
            <div className="calculator">
                <Display value={this.state.displayValue} />
                <Button label="AC" click={this.clearMemory} triple />
                <Button label="/" click={this.setOperation} operation />
                <Button label="7" click={this.addDigit} />
                <Button label="8" click={this.addDigit} />
                <Button label="9" click={this.addDigit} />
                <Button label="*" click={this.setOperation} operation />
                <Button label="4" click={this.addDigit} />
                <Button label="5" click={this.addDigit} />
                <Button label="6" click={this.addDigit} />
                <Button label="-" click={this.setOperation} operation />
                <Button label="1" click={this.addDigit} />
                <Button label="2" click={this.addDigit} />
                <Button label="3" click={this.addDigit} />
                <Button label="+" click={this.setOperation} operation />
                <Button label="0" click={this.addDigit} double />
                <Button label="." click={this.addDigit} />
                <Button label="=" click={this.setOperation} operation />

            </div>
        )
    }
}