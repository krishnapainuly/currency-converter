import React, { Component } from "react";
import './CurrencyExchangeComponent.css';


const BASE_URL = '//data.fixer.io/api/latest?access_key=5348a729ebda2cff1b4e82f52d4d0376';
class CurrencyExchangeComponent extends Component {


    constructor() {
        super();
        this.state = { amount: '', convertedAmount: '', amountCurrency: '', convertToCurrency: '', error: '' };
        this.handleAmtChange = this.handleAmtChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleCurrChange = this.handleCurrChange.bind(this);
        this.handleConvertCurrChange = this.handleConvertCurrChange.bind(this);
    }

    render() {
        return (
            <div className="Currency-exchange">
                <label className="Error-message">{this.state.error}</label><br />
                <input type="number" placeholder="Amount" onChange={e => this.handleAmtChange(e)} value={this.state.amount} />&nbsp;
                <input type="text" placeholder="Currency Code" onChange={e => this.handleCurrChange(e)} maxLength="3" />&nbsp;<br></br><br></br>
                <button onClick={e => this.handleClick(e)}>Convert to</button>&nbsp;<br></br><br></br>
                <input type="number" value={this.state.convertedAmount} disabled />&nbsp;
                <input type="text" value={this.state.convertToCurrency} onChange={e => this.handleConvertCurrChange(e)} placeholder="Convert to currency code" />
            </div>
        );
    }

    handleAmtChange(e) {
        this.setState({ amount: e.target.value })
    }

    handleCurrChange(e) {
        this.setState({ amountCurrency: e.target.value })
    }

    handleConvertCurrChange(e) {
        this.setState({ convertToCurrency: e.target.value })
    }

    handleClick(event) {
        var amount = this.state.amount;
        var amountCurrency = this.state.amountCurrency;
        var convertToCurrency = this.state.convertToCurrency;
        var convertedAmount = '';
        if (!amount || parseInt(amount) <= 0) {
            this.setState({ error: 'Amount should be greater than zero.' });
        }
        else if (!amountCurrency) {
            this.setState({ error: 'Currency code cannot be empty.' });
            console.log('Currency cannot be empty.');
        } else if (!convertToCurrency) {
            this.setState({ error: 'Convert to currency code cannot be empty.' });
            console.log('Convert to currency cannot be empty.');
        }
        else {
            var url = BASE_URL + '&base=' + amountCurrency + '&symbols=' + convertToCurrency;
            fetch(url).then((response) => response.json()).then(function (data) {
                if (data.success) {
                    if (Object.keys(data.rates)[0] === convertToCurrency.toUpperCase()) {
                        convertedAmount = data.rates[Object.keys(data.rates)[0]] * amount;
                        this.setState({ convertedAmount: convertedAmount.toFixed(2), error: '' });
                    }
                } else if (data.error.code === 201) {
                    this.setState({ error: 'Invalid currency code to be exchanged.' })
                    console.log('Invalid currency code to be exchanged.');
                }
                else if (data.error.code === 202) {
                    this.setState({ error: 'Invalid convert to currency code.' })
                    console.log('Invalid convert to currency code.');
                }
                else if (data.error.code === 105) {
                    console.log(data);
                    this.setState({ error: 'Currency conversion not supported.' })
                    console.log('Currency conversion not supported.');
                }

            }.bind(this)).catch((error) => console.log(error));
        }
    }
}

export default CurrencyExchangeComponent;
