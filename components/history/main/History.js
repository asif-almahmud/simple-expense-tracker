import React, { useState, useEffect } from "react";
import classes from "./history.module.scss";
import AllHistory from "../allHistory/AllHistory";
import IncomeHistory from "../incomeHistory/IncomeHistory";
import ExpenseHistory from "../expenseHistory/ExpenseHistory";
import BorrowedHistory from "../borrowedHistory/BorrowedHistory";
import LentHistory from "../lentHistory/LentHistory";
import DonationHistory from "../donationHistory/DonationHistory";
import { useSelector } from "react-redux";
import actionTypes from "actionTypes";

const {
  history_container,
  history_wrapper,
  history_header,
  transaction_types,
  transaction_type,
  transaction_type_active,
  history_top,
  history_bottom,
} = classes;

const { ADD_INCOME, ADD_EXPENSE, ADD_BORROWED, ADD_LENT, ADD_DONATION } =
  actionTypes;

const History = () => {
  const [transactionType, setTransactionType] = useState("ALL");
  const [historyData, setHistoryData] = useState([]);
  const { history } = useSelector((state) => state);
  console.log("from history :", history);

  useEffect(() => {
    if (transactionType === "ALL") {
      setHistoryData(history);
    } else {
      const filteredData = history.filter(
        (data) => data.type === transactionType
      );

      setHistoryData(filteredData);
    }
  }, [transactionType, history.length]);

  return (
    <div className={history_container}>
      <div className={history_wrapper}>
        <div className={history_top}>
          <h5 className={history_header}>Transaction History</h5>
          <div className={transaction_types}>
            <div
              className={`${transaction_type} ${
                transactionType === "ALL" && transaction_type_active
              }`}
              onClick={() => setTransactionType("ALL")}
            >
              All
            </div>
            <div
              className={`${transaction_type} ${
                transactionType === ADD_INCOME && transaction_type_active
              }`}
              onClick={() => setTransactionType(ADD_INCOME)}
            >
              Income
            </div>
            <div
              className={`${transaction_type} ${
                transactionType === ADD_EXPENSE && transaction_type_active
              }`}
              onClick={() => setTransactionType(ADD_EXPENSE)}
            >
              Expense
            </div>
            <div
              className={`${transaction_type} ${
                transactionType === ADD_BORROWED && transaction_type_active
              }`}
              onClick={() => setTransactionType(ADD_BORROWED)}
            >
              Borrowed
            </div>
            <div
              className={`${transaction_type} ${
                transactionType === ADD_LENT && transaction_type_active
              }`}
              onClick={() => setTransactionType(ADD_LENT)}
            >
              Lent
            </div>
            <div
              className={`${transaction_type} ${
                transactionType === ADD_DONATION && transaction_type_active
              }`}
              onClick={() => setTransactionType(ADD_DONATION)}
            >
              Donation
            </div>
          </div>
        </div>

        <div className={history_bottom}>
          {transactionType === "ALL" && (
            <AllHistory historyData={historyData} />
          )}
          {transactionType === ADD_INCOME && (
            <IncomeHistory historyData={historyData} />
          )}
          {transactionType === ADD_EXPENSE && (
            <ExpenseHistory historyData={historyData} />
          )}
          {transactionType === ADD_BORROWED && (
            <BorrowedHistory historyData={historyData} />
          )}
          {transactionType === ADD_LENT && (
            <LentHistory historyData={historyData} />
          )}
          {transactionType === ADD_DONATION && (
            <DonationHistory historyData={historyData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default History;
