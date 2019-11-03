import React, { Component } from 'react';
import PropTypes from 'prop-types';

import style from './Controls.module.css';

export default class Controls extends Component {
  static propTypes = {
    onDeposit: PropTypes.func.isRequired,
    onWithdraw: PropTypes.func.isRequired,
  };

  state = {
    amount: 0,
  };

  handleChangeInput = e => {
    const { value } = e.currentTarget;
    if (value < 0) return;
    this.setState({
      amount: value,
    });
  };

  hendleDeposit = () => {
    this.props.onDeposit(this.state.amount);
    this.setState({ amount: 0 });
  };

  hendleWithdraw = () => {
    this.props.onWithdraw(this.state.amount);
    this.setState({ amount: 0 });
  };

  render() {
    const { amount } = this.state;
    return (
      <section className={style.controls}>
        <input
          className={style.input}
          type="number"
          name="amount"
          value={amount===0? '' : amount}
          onChange={this.handleChangeInput}
        />
        <button
          className={style.button}
          type="button"
          onClick={this.hendleDeposit}
        >
          Deposit
        </button>
        <button
          className={style.button}
          type="button"
          onClick={this.hendleWithdraw}
        >
          Withdraw
        </button>
      </section>
    );
  }
}
