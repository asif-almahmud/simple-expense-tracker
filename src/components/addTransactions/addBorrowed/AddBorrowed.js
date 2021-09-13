import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addBorrowed } from "actions";

import classes from "./addBorrowed.module.scss";

const {
  add_borrowed_container,
  add_borrowed_header,
  input_common,
  btn_submit,
} = classes;

const AddBorrowed = () => {
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
    dispatch(addBorrowed({ amount, date, description }));
    setAmount("");
    setDescription("");
  };

  useEffect(() => {
    date === "" &&
      (dateRef.current.value = new Date().toISOString().substring(0, 10));
    setDate(dateRef.current.value);
  }, []);

  return (
    <div className={add_borrowed_container}>
      <h4 className={add_borrowed_header}>Add Borrowed</h4>
      <form onSubmit={handleSubmit}>
        <input
          className={input_common}
          type="number"
          step="any"
          value={amount}
          onChange={handleAmountChange}
          placeholder="amount (use '-' for returning)"
          required
        />

        <br />
        <input
          className={input_common}
          type="text"
          value={description}
          onChange={handleDescriptionChange}
          placeholder="borrowed from or returned to"
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

export default AddBorrowed;
