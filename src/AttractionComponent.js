import React, { Component, useState } from "react";
import './AttractionComponent.css';

const BASE_URL = 'http://data.fixer.io/api/latest?access_key=5348a729ebda2cff1b4e82f52d4d0376';
class AttractionComponent extends Component {

    constructor() {
        super();
        this.state = { amount: '', convertedAmount: '', amountCurrency: '', convertToCurrency: '' };
        this.handleAmtChange = this.handleAmtChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleCurrChange = this.handleCurrChange.bind(this);
        this.handleConvertCurrChange = this.handleConvertCurrChange.bind(this);
    }

    render() {
        return (
            <>
                <input type="number" className="Input-field" placeholder="Amount" onChange={e => this.handleAmtChange(e)} value={this.state.amount} />&nbsp;
                <input className="input-field" type="text" placeholder="Currency Code" onChange={e => this.handleCurrChange(e)} maxLength="3" />&nbsp;
                <button className="searchBtn" onClick={e => this.handleClick()}>Convert to</button>&nbsp;
                <input type="number" className="input-field" value={this.state.convertedAmount} disabled />&nbsp;
                <input className="input-field" type="text" value={this.state.convertToCurrency} onChange={e => this.handleConvertCurrChange(e)} placeholder="Convert to currency code" />
            </>
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

    handleClick() {
        var amount = this.state.amount;
        var amountCurrency = this.state.amountCurrency;
        var convertToCurrency = this.state.convertToCurrency;
        if (!amount && amount <= 0) {
            alert('Amount should be greater than zero.');
        }
        else if (!amountCurrency) {
            alert('Currency cannot be empty.');
        } else if (!convertToCurrency) {
            alert('Convert to currency cannot be empty.');
        }
        else {
            var url = BASE_URL + '&base=' + amountCurrency + '&symbols=' + convertToCurrency;
            fetch(url).then((response) => response.json()).then(function (data) {
                if (data.success) {
                    console.log(data.rates);
                    this.setState({ convertedAmount: 100 });
                    Object.entries(data.rates).map((key, value) => this.setState({ convertedAmount: amount * key[1] }));
                }
                else if (data.error.code === 201) {
                    console.log('invalid base currency.');
                }
                else if (data.error.code === 202) {
                    console.log('invalid currency code.');
                }
                else if (data.error.code === 105) {
                    console.log('currency not supported.');
                }

            }).catch((error) => console.log(error));
        }
    }
}

export default AttractionComponent;