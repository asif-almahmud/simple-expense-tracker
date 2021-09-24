import { useState, useEffect } from "react";
import Header from "./components/header/Header";
import Feed from "./components/feed/Feed";
import AddTransactions from "./components/addTransactions/main/AddTransactions";
import History from "./components/history/main/History";
import classes from "./app.module.scss";
import Balance from "./components/balance/Balance";
import { useSelector } from "react-redux";
import EnterPassword from "./components/enterPassword/EnterPassword";

const {
  app_container,
  app_header_container,
  app_body_container,
  app_balance_container,
} = classes;

const App = () => {
  const [appHavePassword, setAppHavePassword] = useState(true);
  const [correctPasswordProvided, setCorrectPasswordProvided] = useState(false);

  const appData = useSelector((state) => state);
  localStorage.setItem("appData", JSON.stringify(appData));

  window.addEventListener("load", function () {
    setTimeout(function () {
      // This hides the address bar:
      window.scrollTo(0, 1);
    }, 0);
  });

  useEffect(() => {
    if (appData.password) {
      setAppHavePassword(true);
    } else {
      setAppHavePassword(false);
    }
    return () => localStorage.setItem("appData", JSON.stringify(appData));
  }, []);

  if (appData.password && appHavePassword && correctPasswordProvided === false)
    return (
      <EnterPassword
        appPassword={appData.password}
        setCorrectPasswordProvided={setCorrectPasswordProvided}
      />
    );
  return (
    <div className={app_container}>
      <div className={app_header_container}>
        <Header />
      </div>

      <div className={app_body_container}>
        <Feed />
        <AddTransactions />
        <History />
      </div>
      <div className={app_balance_container}>
        <Balance />
      </div>
    </div>
  );
};

export default App;
