import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addDonation } from "actions";

import classes from "./addDonation.module.scss";

const {
  add_donation_container,
  add_donation_header,
  input_common,
  btn_submit,
} = classes;

const AddDonation = () => {
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
    dispatch(addDonation({ amount, date, description }));
    setAmount("");
    setDescription("");
  };

  useEffect(() => {
    date === "" &&
      (dateRef.current.value = new Date().toISOString().substring(0, 10));
    setDate(dateRef.current.value);
  }, []);

  return (
    <div className={add_donation_container}>
      <h4 className={add_donation_header}>Add Donation</h4>
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
          placeholder="donated to"
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

export default AddDonation;
