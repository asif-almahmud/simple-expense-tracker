import React, { useState } from "react";
import classes from "./setPassword.module.scss";
import { addPassword } from "actions";
import { useDispatch } from "react-redux";

const {
  set_password_form,
  password_input_common,
  password_submit,
  set_password_modal_container,
} = classes;

const SetPassword = ({ setShowModal }) => {
  const [passwordInput, setPasswordInput] = useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
  const [typingMistake, setTypingMistake] = useState(false);
  const [success, setSuccess] = useState(false);

  const dispatch = useDispatch();

  const handlePasswordInputChange = (e) => {
    setPasswordInput(e.target.value);
    setTypingMistake(false);
  };

  const handleConfirmPasswordInputChange = (e) => {
    setConfirmPasswordInput(e.target.value);
    setTypingMistake(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwordInput === confirmPasswordInput) {
      dispatch(addPassword({ passwordInput }));
      setSuccess(true);
      setTimeout(() => {
        setShowModal(false);
        setSuccess(false);
        setPasswordInput("");
        setConfirmPasswordInput("");
      }, 1000);
    } else {
      setTypingMistake(true);
      setPasswordInput("");
      setConfirmPasswordInput("");
    }
  };

  return (
    <div className={set_password_modal_container}>
      {!success ? (
        <form className={set_password_form} onSubmit={handleSubmit}>
          <h3 style={{ margin: "15px" }}>Set Password</h3>

          {typingMistake && (
            <div
              style={{
                margin: "15px",
                color: "orange",
              }}
            >
              Typing mistake detected while confirming password. Please set
              password again.
            </div>
          )}

          <input
            type="password"
            placeholder="Password"
            className={password_input_common}
            value={passwordInput}
            onChange={handlePasswordInputChange}
            minLength="4"
            required
            autoFocus
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className={password_input_common}
            value={confirmPasswordInput}
            onChange={handleConfirmPasswordInputChange}
            minLength="4"
            required
          />

          <input type="submit" value="Submit" className={password_submit} />
        </form>
      ) : (
        <div>Your password was set successfully</div>
      )}
    </div>
  );
};

export default SetPassword;
