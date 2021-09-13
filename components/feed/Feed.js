import React from "react";
import { useSelector } from "react-redux";
import classes from "./feed.module.scss";

const {
  feed_container,
  feed_wrapper,
  feed_transaction_types,
  feed_transaction_type,
} = classes;

const Feed = () => {
  const { income, expense, borrowed, lent, donation } = useSelector(
    (state) => state
  );
  return (
    <div className={feed_container}>
      <div className={feed_wrapper}>
        <div className={feed_transaction_types}>
          <div className={feed_transaction_type}>
            Income <span>{income.toFixed(2)}</span>
          </div>
          <div className={feed_transaction_type}>
            Expense <span>{expense.toFixed(2)}</span>
          </div>
          <div className={feed_transaction_type}>
            Borrowed <span>{borrowed.toFixed(2)}</span>
          </div>
          <div className={feed_transaction_type}>
            Lent <span>{lent.toFixed(2)}</span>
          </div>
          <div className={feed_transaction_type}>
            Donation <span>{donation.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
