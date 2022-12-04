import React, { useState, useEffect } from "react";
import classes from "./header.module.scss";
import SettingsIcon from "@material-ui/icons/Settings";
import { useDispatch } from "react-redux";
import actionTypes from "actionTypes";
import SetPassword from "./setPassword/SetPassword";
import { useSelector } from "react-redux";

const { RESET_PASSWORD, RESET_HISTORY, RESET_APP } = actionTypes;

const {
  header_container,
  settings_container,
  button_anim,
  button_anim_return,
  ul_display_none,
  hide_ul,
  show_ul,
  back_drop,
  modal_common,
  modal_header,
  modal_body,
  modal_footer,
} = classes;

const Header = () => {
  const [pageLoad, setPageLoad] = useState(true);
  const [buttonAnim, setButtonAnim] = useState(false);
  const [showUl, setShowUl] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalSetPassword, setShowModalSetPassword] = useState(false);
  const [showModalResetPassword, setShowModalResetPassword] = useState(false);
  const [showModalResetHistory, setShowModalResetHistory] = useState(false);
  const [showModalResetApp, setShowModalResetApp] = useState(false);

  const { password } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <div className={header_container}>
      <header>Expense Tracker</header>

      <div
        className={settings_container}
        onBlur={() => {
          setTimeout(() => {
            setButtonAnim(false);
            setShowUl(false);
          }, 300);
        }}
      >
        <button
          onClick={() => {
            setPageLoad(false);
            setButtonAnim(() => !buttonAnim);
            setShowUl(() => !showUl);
          }}
          className={
            pageLoad ? null : buttonAnim ? button_anim : button_anim_return
          }
        >
          <SettingsIcon style={{ fontSize: 24 }} />
        </button>

        <ul className={pageLoad ? ul_display_none : showUl ? show_ul : hide_ul}>
          {password ? (
            <li
              onClick={() => {
                setButtonAnim(() => !buttonAnim);
                setShowUl(() => !showUl);
                setShowModal(true);
                setShowModalResetPassword(true);
                setShowModalSetPassword(false);
                setShowModalResetHistory(false);
                setShowModalResetApp(false);
              }}
            >
              Reset Password
            </li>
          ) : (
            <li
              onClick={() => {
                setButtonAnim(() => !buttonAnim);
                setShowUl(() => !showUl);
                setShowModal(true);
                setShowModalResetPassword(false);
                setShowModalSetPassword(true);
                setShowModalResetHistory(false);
                setShowModalResetApp(false);
              }}
            >
              Set Password
            </li>
          )}
          <li
            onClick={() => {
              setButtonAnim(() => !buttonAnim);
              setShowUl(() => !showUl);
              setShowModal(true);
              setShowModalResetPassword(false);
              setShowModalSetPassword(false);
              setShowModalResetHistory(true);
              setShowModalResetApp(false);
            }}
          >
            Reset History
          </li>
          <li
            onClick={() => {
              setButtonAnim(() => !buttonAnim);
              setShowUl(() => !showUl);
              setShowModal(true);
              setShowModalResetPassword(false);
              setShowModalSetPassword(false);
              setShowModalResetHistory(false);
              setShowModalResetApp(true);
            }}
          >
            Reset App
          </li>
        </ul>
        {showModal && (
          <div className={back_drop} onClick={() => setShowModal(false)}></div>
        )}

        {/* Reset Password Modal */}
        {showModal && showModalResetPassword && (
          <div className={modal_common}>
            {/* <h2 className={modal_header}>
              Wait ! After this action anyone can enter this app without
              password
            </h2> */}
            <h2 className={modal_header}>
              Are you sure You want to reset password?
            </h2>
            <div className={modal_footer}>
              <span onClick={() => setShowModal(false)}>Cancel</span>
              <span
                onClick={() => {
                  dispatch({ type: RESET_PASSWORD });
                  setShowModal(false);
                }}
              >
                Yes
              </span>
            </div>
          </div>
        )}

        {/* Set Password Modal */}
        {showModal && showModalSetPassword && (
          <div className={modal_common}>
            <SetPassword setShowModal={setShowModal} />
          </div>
        )}

        {/* Reset History Modal */}
        {showModal && showModalResetHistory && (
          <div className={modal_common}>
            {/* <h2 className={modal_header}>
              Wait ! This action will delete all the history
            </h2> */}
            <h2 className={modal_header}>
              Are you sure You want to delete all the history?
            </h2>
            <div className={modal_footer}>
              <span onClick={() => setShowModal(false)}>Cancel</span>
              <span
                onClick={() => {
                  dispatch({ type: RESET_HISTORY });
                  setShowModal(false);
                }}
              >
                Yes
              </span>
            </div>
          </div>
        )}

        {/* Reset App Modal */}
        {showModal && showModalResetApp && (
          <div className={modal_common}>
            {/* <h2 className={modal_header}>
              Wait ! This action will reset your password and all other app data
            </h2> */}
            <h2 className={modal_header}>
              Are you sure You want to delete all the app data?
            </h2>
            <div className={modal_footer}>
              <span onClick={() => setShowModal(false)}>Cancel</span>
              <span
                onClick={() => {
                  dispatch({ type: RESET_APP });
                  setShowModal(false);
                }}
              >
                Yes
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
