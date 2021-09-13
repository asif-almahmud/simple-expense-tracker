import React from "react";
import classes from "./lentHistory.module.scss";
import { useDispatch } from "react-redux";
import { undoTransaction } from "actions";

const { history_table, undo_transaction } = classes;

const LentHistory = ({ historyData }) => {
  const lentHistory = [...historyData].reverse();
  const dispatch = useDispatch();

  if (historyData.length < 1) {
    return (
      <div style={{ margin: "10px", marginLeft: "0px" }}>
        No data to display.
      </div>
    );
  }
  return (
    <table className={history_table}>
      <thead>
        <tr>
          <th style={{ textAlign: "left", padding: "2px" }}>
            <h5>Date</h5>
          </th>
          <th style={{ textAlign: "left" }}>
            <h5>Description</h5>
          </th>
          <th style={{ textAlign: "right", paddingRight: "6px" }}>
            <h5>Amount</h5>
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {lentHistory.map((data, index) => (
          <tr
            style={{
              fontWeight: "300",
              fontSize: "12px",
              padding: "2px",
            }}
            key={index}
          >
            <td
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>{data.date}</span>
            </td>
            <td>
              {data.description ? (
                data.description
              ) : (
                <span style={{ marginLeft: "20px" }}>-</span>
              )}
            </td>
            <td
              style={{
                textAlign: "right",
                paddingRight: "6px",
              }}
            >
              <span>{data.amount}</span>
            </td>
            <td
              className={undo_transaction}
              onClick={() =>
                dispatch(
                  undoTransaction({
                    type: data.type,
                    amount: data.amount,
                    transactionNo: data.transactionNo,
                  })
                )
              }
            >
              <span>Undo</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LentHistory;
