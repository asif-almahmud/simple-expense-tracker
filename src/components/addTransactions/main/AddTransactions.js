import React, { useState } from "react";
import classes from "./addTransactions.module.scss";
import AddIncome from "../addIncome/AddIncome";
import AddExpense from "../addExpense/AddExpense";
import AddBorrowed from "../addBorrowed/AddBorrowed";
import AddLent from "../addLent/AddLent";
import AddDonation from "../addDonation/AddDonation";

const {
  add_transactions_container,
  wrapper,
  add_transactions_types,
  transactions_type,
  transactions_type_active,
  add_transactions_header,
} = classes;

const AddTransactions = () => {
  const [transactionType, setTransactionType] = useState(
    localStorage.getItem("transactionType") || "income"
  );
  return (
    <div className={add_transactions_container}>
      <div className={wrapper}>
        <h5 className={add_transactions_header}>Add New Transaction</h5>
        <div className={add_transactions_types}>
          <div
            className={`${transactions_type}  ${
              transactionType === "income" && transactions_type_active
            }`}
            onClick={() => setTransactionType("income")}
          >
            Income
          </div>

          <div
            className={`${transactions_type} ${
              transactionType === "expense" && transactions_type_active
            }`}
            onClick={() => setTransactionType("expense")}
          >
            Expense
          </div>
          <div
            className={`${transactions_type} ${
              transactionType === "borrowed" && transactions_type_active
            }`}
            onClick={() => setTransactionType("borrowed")}
          >
            Borrowed
          </div>
          <div
            className={`${transactions_type} ${
              transactionType === "lent" && transactions_type_active
            }`}
            onClick={() => setTransactionType("lent")}
          >
            Lent
          </div>
          <div
            className={`${transactions_type} ${
              transactionType === "donation" && transactions_type_active
            }`}
            onClick={() => setTransactionType("donation")}
          >
            Donation
          </div>
        </div>
        <div>
          {transactionType === "income" && <AddIncome />}
          {transactionType === "expense" && <AddExpense />}
          {transactionType === "borrowed" && <AddBorrowed />}
          {transactionType === "lent" && <AddLent />}
          {transactionType === "donation" && <AddDonation />}
        </div>
      </div>
    </div>
  );
};

export default AddTransactions;
