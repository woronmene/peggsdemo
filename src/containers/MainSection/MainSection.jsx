/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/media-has-caption */
import React, { useState, useEffect } from "react";

import VideoButton from "../../components/VideoButton/VideoButton";
import Button from "../../components/Button/Button";
import styles from "./MainSection.module.scss";

function MainSection({
  currentVideo,
  currentProduct,
  getLocation,
  saveProduct,
  handleShowToast,
  showTag,
  setShowTag,
  xValue,
  yValue,
  savedArray,
  detailsArray,
  setIsModalOpen,
}) {
  const [content, setContent] = useState("selectedProducts");
  const [clickable, setClickable] = useState(true);
  const [noOfProgressBars, setNoOfProgressBars] = useState(0);
  const [progressBarWidth, setProgressBarWidth] = useState(0);
  const [forceUpdate, setForceUpdate] = useState(true);
  const [isPortrait, setIsPortrait] = useState(true);
  const [aspectRatioValue, setAspectRatioValue] = useState("");
  // const [showTag, setShowTag] = useState(false);

  const videoContainerPortraitStyles = { height: "100%", aspectRatio: aspectRatioValue };
  const videoContainerLandscapeStyles = { width: "100%", aspectRatio: aspectRatioValue };

  const handleForceUpdate = () => {
    setForceUpdate(!forceUpdate);
  };
  console.log(JSON.stringify(savedArray));

  useEffect(() => {
    document.getElementById("currentVideo").playbackRate = 0.5;
  }, []);

  useEffect(() => {
    const current = document.getElementById("currentVideo");
    current.addEventListener("canplay", () => {
      setNoOfProgressBars(Math.ceil(current.duration * 2));

      setProgressBarWidth(100 / Math.ceil(current.duration * 2));
      // console.log(Math.ceil(current.duration * 2));
      // Array(Math.ceil(current.duration * 2))
      //   .fill(0)
      //   .map((num, index) => {
      //     console.log(index);
      //   });
      // // console.log(Math.ceil(current.duration * 2));
      // // console.log(current.duration);
      // console.log(noOfProgressBars);
    });
    console.log(currentVideo);
  }, [currentVideo]);

  const setPlayBack = () => {
    document.getElementById("currentVideo").playbackRate = 0.5;
    const videoReference = document.getElementById("currentVideo");

    const { videoHeight } = videoReference;
    // setCurrentVideoHeight(videoHeight);
    const { videoWidth } = videoReference;
    // setCurrentVideoWidth(videoWidth);
    if (videoHeight > videoWidth) {
      setIsPortrait(true);
      setAspectRatioValue(`1/${videoHeight / videoWidth}`);
    } else {
      setIsPortrait(false);
      setAspectRatioValue(`${videoWidth / videoHeight}/1`);
      // console.log(`${(videoWidth / videoHeight).toFixed(2)}/1`);
      // console.log(videoContainerPortraitStyles);
    }
  };

  const handlePlay = () => {
    const video = document.getElementById("currentVideo");
    video.play();
    // console.log("play");
    setShowTag(false);
  };
  const handleRestart = () => {
    const video = document.getElementById("currentVideo");
    video.currentTime = 0;
    video.pause();
    setShowTag(false);
    handleForceUpdate();

    // console.log("play");
  };
  const handleGetLocation = (e) => {
    if (clickable) {
      getLocation(e);
      setShowTag(true);
      // console.log(xValue, yValue);
    }
  };

  // get video length in seconds
  // multiply by 2 -- this is number of progress bars
  // divide by 100 - this is length of progress bars

  return (
    <div className={styles.mainSection}>
      <div className={styles.top}>
        <div className={styles.topLeft}>
          {/* <video src="./assets/videos/pexel7.mp4" /> */}
          <div className={styles.progress}>
            {Array(noOfProgressBars)
              .fill(0)
              .map((num, index) => {
                // console.log(index);
                const currentVid = document.getElementById("currentVideo");
                return (
                  <div
                    className={`${styles.progressBar} `}
                    style={{ width: `calc(${progressBarWidth}% - 3px)` }}
                    onClick={() => {
                      currentVid.currentTime = index * 0.5;
                      handleForceUpdate();
                    }}
                  >
                    <div
                      className={`${styles.bar}  ${
                        currentVid.currentTime >= index * 0.5 && styles.active
                      }`}
                    />
                  </div>
                );
              })}
          </div>
          <div
            className={styles.videoContainer}
            style={isPortrait ? videoContainerPortraitStyles : videoContainerLandscapeStyles}
            onClick={handleGetLocation}
          >
            {showTag && (
              <div className={styles.tag} style={{ top: `${yValue}%`, left: `${xValue}%` }} />
            )}
            <video
              // src="/assets/video-2.mp4"
              src={currentVideo}
              id="currentVideo"
              muted
              style={{ aspectRatio: aspectRatioValue }}
              // preload="auto"
              onPause={() => {
                setClickable(true);
              }}
              onPlay={() => {
                setClickable(false);
                setTimeout(() => {
                  document.getElementById("currentVideo").pause();
                }, 500);
              }}
              onCanPlay={() => {
                // console.log("video can play");
                setPlayBack();
              }}
            />
          </div>
        </div>
        <div className={styles.topRight}>
          <VideoButton
            icon="./assets/icons/restart.svg"
            handleClick={handleRestart}
            tooltip="restart"
          />

          <VideoButton icon="./assets/icons/play.svg" handleClick={handlePlay} tooltip="play" />
          <VideoButton icon="./assets/icons/delete.svg" tooltip="delete" />
          <VideoButton
            icon="./assets/icons/preview.svg"
            tooltip="preview"
            handleClick={() => {
              if (savedArray.length === 0) {
                handleShowToast("no tags yet");
              } else {
                setIsModalOpen(true);
              }
            }}
          />
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.bottomLeft}>
          <div className={styles.header}>
            <p
              className={`${styles.headerTab} ${content === "selectedProducts" && styles.active}`}
              onClick={() => setContent("selectedProducts")}
            >
              Selected product
            </p>
            <p
              className={`${styles.headerTab} ${content === "previewJson" && styles.active}`}
              onClick={() => setContent("previewJson")}
            >
              Preview Json
            </p>
          </div>
          <div className={styles.body}>
            {content === "selectedProducts" ? (
              <div className={styles.selectedProductSection}>
                <div className={styles.left}>
                  <div
                    className={styles.productImage}
                    style={{
                      backgroundImage: `url(${currentProduct?.product_picture})`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                  />
                  <p className={styles.productName}>{currentProduct?.name}</p>
                </div>
                <div className={styles.right}>
                  <Button
                    size="large"
                    label="Save Product"
                    bgcolor="white"
                    handleClick={() => {
                      if (detailsArray.length === 0) {
                        handleShowToast("No tags yet");
                      } else {
                        setShowTag(false);
                        saveProduct();
                        handleShowToast("Product saved");
                      }
                    }}
                  />
                </div>
              </div>
            ) : (
              <div className={styles.previewJson}>
                <code>{JSON.stringify(savedArray)}</code>
              </div>
            )}
          </div>
        </div>
        <div className={styles.bottomRight}>{/* right */}</div>
      </div>
    </div>
  );
}

export default MainSection;
