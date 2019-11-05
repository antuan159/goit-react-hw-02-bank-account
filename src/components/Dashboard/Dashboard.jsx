import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import storage from '../services/storage';
import Controls from '../Controls';
import Balance from '../Balance';
import TransactionHistory from '../TransactionHistory';

export default class Dashboard extends Component {
  static propTypes = {
    transactions: PropTypes.arrayOf(PropTypes.object),
    balance: PropTypes.number,
  };

  static defaultProps = {
    transactions: [],
    balance: 0,
  };

  state = {
    transactions: this.props.transactions,
    balance: this.props.balance,
  };

  historyBalance = {
    expenses: 0,
    income: 0,
    balance: 0,
  };

  componentDidMount() {
    const loadTransactions = storage.get('transactions');
    if (loadTransactions) {
      this.onBalanceOrWithdraw(
        loadTransactions.transactions,
        loadTransactions.balance,
      );
      this.setState(() => ({
        transactions: loadTransactions.transactions,
        balance: loadTransactions.balance,
      }));
    }
  }

  componentDidUpdate(prevState) {
    const { transactions, balance } = this.state;

    if (prevState.transaction !== transactions) {
      storage.set('transactions', { transactions, balance });
    }
  }

  notifyBalance = () => toast('Введите сумму для проведения операции!');

  notifyNotBalance = () =>
    toast('На счету недостаточно средств для проведения операции!');
    
  notifyNegativeBalance = () =>
    toast('Введён отрицательный баланс попробуйте снова');

  createTransaction = (amount, type) => {
    if(amount<0){
      this.notifyNegativeBalance();
      return null;
    }
    if (amount === 0) {
      this.notifyBalance();
      return null;
    }

    if (type === 'expenses') {
      if (amount > this.state.balance) {
        this.notifyNotBalance();
        return null;
      }
    }

    return {
      id: shortid.generate(),
      type,
      amount: Number(amount),
      date: new Date(Date.now()).toLocaleString(),
    };
  };

  handleDeposit = obj => {
    const tmpTransaction = this.createTransaction(obj, 'income');
    if (tmpTransaction) {
      this.processTransaction(tmpTransaction, tmpTransaction.amount);
    }
  };

  handleWithdraw = obj => {
    const tmpTransaction = this.createTransaction(obj, 'expenses');
    if (tmpTransaction) {
      this.processTransaction(tmpTransaction, -tmpTransaction.amount);
    }
  };

  processTransaction = (transaction, amount) => {
    const { transactions, balance } = this.state;
    const newTransactions = [...transactions, transaction];
    const newBalance = balance + amount;
    this.onBalanceOrWithdraw(newTransactions, newBalance);

    this.setState(() => ({
      transactions: newTransactions,
      balance: newBalance,
    }));
  };

  onBalanceOrWithdraw = (transactions, bal) => {
    this.historyBalance = transactions.reduce(
      (acc, curent) => {
        return {
          ...acc,
          [curent.type]: curent.amount + acc[curent.type],
        };
      },
      { expenses: 0, income: 0, balance: bal },
    );
  };

  render() {
    const { transactions } = this.state;
    const { expenses, income, balance } = this.historyBalance;
    return (
      <div className="dashboard">
        <Controls
          onDeposit={this.handleDeposit}
          onWithdraw={this.handleWithdraw}
        />
        <Balance expenses={expenses} income={income} balance={balance} />
        {transactions.length > 0 && (
          <TransactionHistory hystory={transactions} />
        )}
        <ToastContainer />
      </div>
    );
  }
}
