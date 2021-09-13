import React from "react";
import { useSelector } from "react-redux";
import classes from "./balance.module.css";

const { balanceContainer } = classes;

const Balance = () => {
  const { balance } = useSelector((state) => state);
  return (
    <div className={balanceContainer}>
      Balance&nbsp;:&nbsp; <span>{balance.toFixed(2)}</span>
    </div>
  );
};

export default Balance;
