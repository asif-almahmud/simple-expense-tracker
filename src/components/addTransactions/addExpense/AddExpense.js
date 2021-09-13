import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addExpense } from "actions";

import classes from "./addExpense.module.scss";

const { add_expense_container, add_expense_header, input_common, btn_submit } =
  classes;

const AddExpense = () => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const dateRef = useRef(null);
  const dispatch = useDispatch();

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addExpense({ amount, date, description }));
    console.log(date);
    console.log("dateRef.current :", dateRef.current.value);
    console.log(amount);
    console.log(description);
    setAmount("");
    setDescription("");
  };

  useEffect(() => {
    date === "" &&
      (dateRef.current.value = new Date().toISOString().substring(0, 10));
    setDate(dateRef.current.value);
  }, []);

  return (
    <div className={add_expense_container}>
      <h4 className={add_expense_header}>Add Expense</h4>
      <form onSubmit={handleSubmit}>
        <input
          className={input_common}
          type="number"
          step="any"
          value={amount}
          onChange={handleAmountChange}
          placeholder="amount (number)"
          required
        />

        <br />
        <input
          className={input_common}
          type="text"
          value={description}
          onChange={handleDescriptionChange}
          placeholder="where expensed"
        />

        <br />
        <input
          ref={dateRef}
          className={input_common}
          type="date"
          onChange={handleDateChange}
        />

        <br />
        <input className={btn_submit} type="submit" value="Add" />
      </form>
    </div>
  );
};

export default AddExpense;
