/* eslint-disable react/prop-types */
import React from "react";
import styles from "./Toast.module.scss";

function Toast({ showToast, setShowToast, msg }) {
  if (showToast) {
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  }

  return <div className={`${styles.toast} ${showToast && styles.active}`}>{msg}</div>;
}

export default Toast;
