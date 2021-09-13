import React, { useState, useEffect } from "react";
import classes from "./allHistory.module.scss";
import ArrowUpwardRoundedIcon from "@material-ui/icons/ArrowUpwardRounded";
import ArrowDownwardRoundedIcon from "@material-ui/icons/ArrowDownwardRounded";
import FlagSharpIcon from "@material-ui/icons/FlagSharp";
import EcoIcon from "@material-ui/icons/Eco";
import CheckIcon from "@material-ui/icons/Check";
import actionTypes from "actionTypes";
import { useDispatch } from "react-redux";
import { undoTransaction } from "actions";

const { history_table, undo_transaction } = classes;

const { ADD_INCOME, ADD_EXPENSE, ADD_BORROWED, ADD_LENT, ADD_DONATION } =
  actionTypes;

const AllHistory = ({ historyData }) => {
  const allHistory = [...historyData].reverse();
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
            <h5>Type</h5>
          </th>
          <th style={{ textAlign: "left" }}>
            <h5>Date</h5>
          </th>
          <th style={{ textAlign: "right", paddingRight: "20px" }}>
            <h5>Amount</h5>
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {allHistory.map((data, index) => (
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
              {data.type === ADD_INCOME && <span>Income</span>}
              {data.type === ADD_EXPENSE && <span>Expense</span>}
              {data.type === ADD_BORROWED && <span>Borrowed</span>}
              {data.type === ADD_LENT && <span>Lent</span>}
              {data.type === ADD_DONATION && <span>Donation</span>}
            </td>
            <td>{data.date} </td>
            <td
              style={{
                textAlign: "right",
                paddingRight: "6px",
              }}
            >
              <span>{data.amount}</span>
              {data.type === ADD_INCOME && (
                <span>
                  <ArrowUpwardRoundedIcon
                    style={{
                      fontSize: 12,
                      color: "#7BF700",
                      width: "16px",
                      textAlign: "center",
                      fontWeight: "300",
                    }}
                  />
                </span>
              )}
              {data.type === ADD_EXPENSE && (
                <span>
                  <ArrowDownwardRoundedIcon
                    style={{
                      fontSize: 12,
                      color: "#ff0200",
                      width: "16px",
                      textAlign: "center",
                      fontWeight: "300",
                    }}
                  />
                </span>
              )}
              {data.type === ADD_BORROWED && data.amount >= 0 && (
                <span>
                  <FlagSharpIcon
                    style={{
                      fontSize: 12,
                      color: "black",
                      width: "16px",
                      textAlign: "center",
                      fontWeight: "300",
                    }}
                  />
                </span>
              )}
              {data.type === ADD_BORROWED && data.amount < 0 && (
                <span>
                  <CheckIcon
                    style={{
                      fontSize: 12,
                      color: "red",
                      width: "16px",
                      textAlign: "center",
                      fontWeight: "300",
                    }}
                  />
                </span>
              )}
              {data.type === ADD_LENT && data.amount >= 0 && (
                <span>
                  <FlagSharpIcon
                    style={{
                      fontSize: 12,
                      color: "white",
                      width: "16px",
                      textAlign: "center",
                      fontWeight: "300",
                    }}
                  />
                </span>
              )}
              {data.type === ADD_LENT && data.amount < 0 && (
                <span>
                  <CheckIcon
                    style={{
                      fontSize: 12,
                      color: "#7BF700",
                      width: "16px",
                      textAlign: "center",
                      fontWeight: "300",
                    }}
                  />
                </span>
              )}
              {data.type === ADD_DONATION && (
                <span>
                  <EcoIcon
                    style={{
                      fontSize: 12,
                      color: "green",
                      width: "16px",
                      textAlign: "center",
                      fontWeight: "300",
                    }}
                  />
                </span>
              )}
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

export default AllHistory;
