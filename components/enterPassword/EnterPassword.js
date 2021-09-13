import React, { useState, useEffect } from "react";
import classes from "./enterPassword.module.scss";
import actionTypes from "actionTypes";
import { useSelector, useDispatch } from "react-redux";

const {
  set_password_form,
  password_input_common,
  password_submit,
  enter_password_container,
} = classes;

const EnterPassword = ({ appPassword, setCorrectPasswordProvided }) => {
  const [passwordInput, setPasswordInput] = useState("");
  const [warning, setWarning] = useState(false);
  const [showHints, setShowHints] = useState(false);

  const appData = useSelector((state) => state);
  const dispatch = useDispatch();

  const handlePasswordInputChange = (e) => {
    setPasswordInput(e.target.value);
    setWarning(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setWarning(false);
    setShowHints(false);
    setTimeout(() => {
      if (passwordInput === appPassword) {
        setPasswordInput("");
        setCorrectPasswordProvided(true);
      } else {
        setWarning(true);
      }
    }, 300);
  };

  useEffect(() => {}, []);

  return (
    <div className={enter_password_container}>
      <form className={set_password_form} onSubmit={handleSubmit}>
        <div
          style={{
            opacity: warning ? "1" : "0",
            margin: "15px",
            color: "orange",
            transition: "opacity 0.3s ease-in",
          }}
        >
          Wrong Password , try Again
        </div>

        {/* <div style={{ margin: "15px" }}>Wrong Password try Again</div> */}
        <h3 style={{ margin: "15px" }}>Enter Password</h3>

        <input
          type="password"
          placeholder="Password"
          className={password_input_common}
          value={passwordInput}
          onChange={handlePasswordInputChange}
          required
          autoFocus
        />
        <input type="submit" value="Submit" className={password_submit} />

        <div
          style={{
            opacity: warning ? "1" : "0",
            marginTop: "10px",
            transition: "opacity 0.3s ease-in",
          }}
        >
          <span
            onClick={() => setShowHints(!showHints)}
            style={{
              fontSize: "10px",
              borderBottom: "1px solid white",
              margin: "15px",
              cursor: "pointer",
            }}
          >
            See Hints
          </span>

          <span
            style={{
              fontFamily: "Roboto",
              fontSize: "12px",
            }}
          >
            or,
          </span>
          <span
            style={{
              fontSize: "10px",
              borderBottom: "1px solid white",
              margin: "15px",
              cursor: "pointer",
            }}
            onClick={() => {
              setTimeout(() => {
                setPasswordInput("");
                setWarning(false);
                if (
                  window.confirm("This action will delete all the app data")
                ) {
                  dispatch({ type: actionTypes.RESET_APP });
                  window.location.reload();
                } else {
                  return null;
                }
              }, 300);
            }}
          >
            Reset App
          </span>
          <br />

          <div
            style={{
              opacity: showHints ? "1" : "0",
              fontFamily: "Roboto",
              fontSize: "12px",
              margin: "15px",
              transition: "opacity 0.3s ease-in",
            }}
          >
            Hints - first 2 chars : {appData.password?.slice(0, 2)} , password
            length : {appData.password?.length}
          </div>
        </div>
      </form>
    </div>
  );
};

export default EnterPassword;
