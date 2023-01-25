/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import styles from "./VideoButton.module.scss";

function VideoButton({ icon, handleClick, tooltip }) {
  return (
    <Tippy arrow={false} content={tooltip} placement="right">
      <div className={styles.videoButton} onClick={() => handleClick()}>
        <img src={icon} alt="" />
      </div>
    </Tippy>
  );
}

export default VideoButton;
