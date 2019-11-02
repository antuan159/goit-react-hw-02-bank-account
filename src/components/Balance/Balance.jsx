import React from 'react';
import T from 'prop-types';
import style from './Balance.module.css';

const Balance = ({ expenses, income, balance }) => (
  <section className={style.balance}>
    <span className={style.span}>️{income}$</span>
    <span className={style.span}>️{expenses}$</span>
    <span className={style.span}>Balance: {balance}$</span>
  </section>
);

Balance.propTypes = {
  expenses: T.number,
  income: T.number,
  balance: T.number,
};

Balance.defaultProps = {
  expenses: 0,
  income: 0,
  balance: 0,
};

export default Balance;
