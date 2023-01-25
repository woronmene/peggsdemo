/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "../../components/Button/Button";
import styles from "./Footer.module.scss";

function Footer({ currentProducts, handleShowToast, savedArray, showToast }) {
  const [disableButton, setDisableButton] = useState(true);

  useEffect(() => {
    if (savedArray.length !== 0) {
      setDisableButton(false);
      console.log(savedArray);
    } else {
      setDisableButton(true);
    }
  }, [savedArray]);

  return (
    <div className={styles.footer}>
      <div className={`${styles.footerWrapper} footerContainer`}>
        <div className={styles.productsSaved}>
          0/{currentProducts.length}{" "}
          <span className={styles.productsSavedText}> Products Saved</span>{" "}
        </div>
        <div className={styles.sendProject}>
          <Button
            size="large"
            label="Send Project"
            btnState={disableButton}
            bgcolor="purple"
            handleClick={() => {
              // setSavedArray([]);
              console.log(savedArray);
              axios
                .post(
                  "https://edekee-backend-staging.herokuapp.com/v1/api/tags/saveVideoTags",
                  savedArray
                )
                .then((res) => {
                  console.log(res);
                });

              if (showToast) {
                setTimeout(() => {
                  handleShowToast("product sent successfully");
                }, 3500);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Footer;
