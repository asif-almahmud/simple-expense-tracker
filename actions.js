import actionTypes from "actionTypes";

export const addPassword = (value) => {
  return {
    type: actionTypes.ADD_PASSWORD,
    payload: value,
  };
};

export const addIncome = (value) => {
  return {
    type: actionTypes.ADD_INCOME,
    payload: value,
  };
};

export const addExpense = (value) => {
  return {
    type: actionTypes.ADD_EXPENSE,
    payload: value,
  };
};

export const addBorrowed = (value) => {
  return {
    type: actionTypes.ADD_BORROWED,
    payload: value,
  };
};

export const addLent = (value) => {
  return {
    type: actionTypes.ADD_LENT,
    payload: value,
  };
};

export const addDonation = (value) => {
  return {
    type: actionTypes.ADD_DONATION,
    payload: value,
  };
};

export const undoTransaction = (value) => {
  return {
    type: actionTypes.UNDO_TRANSACTION,
    payload: value,
  };
};
