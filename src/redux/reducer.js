import actionTypes from "actionTypes";

// const data = JSON.parse(localStorage.getItem("appData"));

const initialStore = JSON.parse(localStorage.getItem("appData")) || {
  password: null,
  income: 0,
  expense: 0,
  borrowed: 0,
  lent: 0,
  donation: 0,
  balance: 0,
  transactionNo: 0,
  history: [],
};

const Reducer = (state = initialStore, action) => {
  const historyArray = state.history;

  switch (action.type) {
    case actionTypes.ADD_PASSWORD:
      return {
        ...state,
        password: action.payload.passwordInput,
      };
    case actionTypes.ADD_INCOME:
      historyArray.push({
        ...action.payload,
        type: action.type,
        transactionNo: state.transactionNo + 1,
      });
      return {
        ...state,
        income: parseFloat(state.income) + parseFloat(action.payload.amount),
        balance: parseFloat(state.balance) + parseFloat(action.payload.amount),
        transactionNo: state.transactionNo + 1,
        history: historyArray,
      };
    case actionTypes.ADD_EXPENSE:
      historyArray.push({
        ...action.payload,
        type: action.type,
        transactionNo: state.transactionNo + 1,
      });
      return {
        ...state,
        expense: parseFloat(state.expense) + parseFloat(action.payload.amount),
        balance: parseFloat(state.balance) - parseFloat(action.payload.amount),
        transactionNo: state.transactionNo + 1,
        history: historyArray,
      };
    case actionTypes.ADD_BORROWED:
      historyArray.push({
        ...action.payload,
        type: action.type,
        transactionNo: state.transactionNo + 1,
      });
      return {
        ...state,
        borrowed:
          parseFloat(state.borrowed) + parseFloat(action.payload.amount),
        balance: parseFloat(state.balance) + parseFloat(action.payload.amount),
        transactionNo: state.transactionNo + 1,
        history: historyArray,
      };
    case actionTypes.ADD_LENT:
      historyArray.push({
        ...action.payload,
        type: action.type,
        transactionNo: state.transactionNo + 1,
      });
      return {
        ...state,
        lent: parseFloat(state.lent) + parseFloat(action.payload.amount),
        balance: parseFloat(state.balance) - parseFloat(action.payload.amount),
        transactionNo: state.transactionNo + 1,
        history: historyArray,
      };
    case actionTypes.ADD_DONATION:
      historyArray.push({
        ...action.payload,
        type: action.type,
        transactionNo: state.transactionNo + 1,
      });
      return {
        ...state,
        donation:
          parseFloat(state.donation) + parseFloat(action.payload.amount),
        balance: parseFloat(state.balance) - parseFloat(action.payload.amount),
        transactionNo: state.transactionNo + 1,
        history: historyArray,
      };
    case actionTypes.UNDO_TRANSACTION:
      const transactionType =
        action.payload.type === actionTypes.ADD_INCOME
          ? "income"
          : action.payload.type === actionTypes.ADD_EXPENSE
          ? "expense"
          : action.payload.type === actionTypes.ADD_BORROWED
          ? "borrowed"
          : action.payload.type === actionTypes.ADD_LENT
          ? "lent"
          : action.payload.type === actionTypes.ADD_DONATION
          ? "donation"
          : null;
      console.log(transactionType);
      return {
        ...state,
        [transactionType === "income"
          ? "income"
          : transactionType === "expense"
          ? "expense"
          : transactionType === "borrowed"
          ? "borrowed"
          : transactionType === "lent"
          ? "lent"
          : transactionType === "donation"
          ? "donation"
          : null]:
          parseFloat(state[transactionType]) -
          parseFloat(action.payload.amount),
        balance:
          transactionType === "income"
            ? parseFloat(state.balance) - parseFloat(action.payload.amount)
            : transactionType === "expense"
            ? parseFloat(state.balance) + parseFloat(action.payload.amount)
            : transactionType === "borrowed"
            ? parseFloat(state.balance) - parseFloat(action.payload.amount)
            : transactionType === "lent"
            ? parseFloat(state.balance) + parseFloat(action.payload.amount)
            : transactionType === "donation"
            ? parseFloat(state.balance) + parseFloat(action.payload.amount)
            : null,
        history:
          historyArray.length > 0
            ? historyArray.filter(
                (data) => data.transactionNo !== action.payload.transactionNo
              )
            : [],
      };
    case actionTypes.RESET_PASSWORD:
      return {
        ...state,
        password: null,
      };
    case actionTypes.RESET_HISTORY:
      return {
        ...state,
        history: [],
      };
    case actionTypes.RESET_APP:
      return {
        password: null,
        income: 0,
        expense: 0,
        borrowed: 0,
        lent: 0,
        donation: 0,
        balance: 0,
        transactionNo: 0,
        history: [],
      };
    default:
      return state;
  }
};

export default Reducer;
