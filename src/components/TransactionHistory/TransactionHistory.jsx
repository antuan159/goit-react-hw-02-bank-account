import React from 'react';
import T from 'prop-types';
import style from './TransactionHistory.module.css';

const TransactionHistory = ({ hystory }) => (
  <table className={style.transaction}>
    <thead className={style.firstRow}>
      <tr>
        <th className={style.columnTitle}>Transaction</th>
        <th className={style.columnTitle}>Amount</th>
        <th className={style.columnTitle}>Date</th>
      </tr>
    </thead>
    <tbody>
      {hystory.map(item => (
        <tr key={item.id} className={style.row}>
          <td className={style.column}>{item.type}</td>
          <td className={style.column}>{item.amount}$</td>
          <td className={style.column}>{item.date}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

TransactionHistory.propTypes = {
  hystory: T.arrayOf(
    T.shape({
      id: T.string.isRequired,
      type: T.string.isRequired,
      amount: T.number.isRequired,
      date: T.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default TransactionHistory;
