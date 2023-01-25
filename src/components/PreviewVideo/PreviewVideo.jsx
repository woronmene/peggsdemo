/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/media-has-caption */
import React, { useState, useRef } from "react";
import Modal from "../../containers/Modal/Modal";
import styles from "./PreviewVideo.module.scss";
import Tag from "../Tag/Tag";
import showTag from "../../utils/showTag";

function PreviewVideo({ savedArray, isModalOpen, setIsModalOpen, currentVideo }) {
  const [tagArray, setTagArray] = useState();
  const [isPortrait, setIsPortrait] = useState(true);
  const [aspectRatioValue, setAspectRatioValue] = useState("");
  // const [currentVideoHeight, setCurrentVideoHeight] = useState("");
  // const [currentVideoWidth, setCurrentVideoWidth] = useState("");

  //   const handlePlay = () => {};
  // console.log(currentVideo);
  const videoRef = useRef(null);

  const videoContainerPortraitStyles = { height: "100%", aspectRatio: aspectRatioValue };
  const videoContainerLandscapeStyles = { width: "100%", aspectRatio: aspectRatioValue };

  const getDimensions = () => {
    // console.log(videoRef.videoHeight);
    const videoReference = document.getElementById("previewVideo");
    // console.log(videoReference.videoHeight, videoReference.videoWidth);
    const { videoHeight } = videoReference;
    // setCurrentVideoHeight(videoHeight);
    const { videoWidth } = videoReference;
    // setCurrentVideoWidth(videoWidth);
    if (videoHeight > videoWidth) {
      setIsPortrait(true);
      setAspectRatioValue(`1/${videoHeight / videoWidth}`);
      // console.log(`1/${(videoHeight / videoWidth).toFixed(2)}`);
    } else {
      setIsPortrait(false);
      setAspectRatioValue(`${videoWidth / videoHeight}/1`);
      // console.log(`${(videoWidth / videoHeight).toFixed(2)}/1`);
      // console.log(videoContainerPortraitStyles);
    }
  };
  const handlePlay = () => {
    setTagArray([]);
  };

  const handleShowTag = (e) => {
    const tags = showTag(e.target.currentTime, savedArray);
    console.log(tags);
    setTagArray(tags);
  };
  return (
    <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
      <div className={styles.previewVideo}>
        <div
          className={styles.videoContainer}
          style={isPortrait ? videoContainerPortraitStyles : videoContainerLandscapeStyles}
        >
          {" "}
          <video
            src={currentVideo}
            autoPlay
            muted
            controls
            loop
            id="previewVideo"
            style={{ aspectRatio: aspectRatioValue }}
            ref={videoRef}
            onCanPlay={() => getDimensions()}
            onPlay={() => {
              handlePlay();
            }}
            onPause={(e) => {
              handleShowTag(e);
            }}
          />
          {tagArray &&
            tagArray.map((tag) => (
              // console.log(tag);

              // const coordinates = getCoordinates(
              //   tag.boundingBoxHeight,
              //   tag.boundingBoxWidth,
              //   tag.boundingBoxLeft,
              //   tag.boundingBoxTop,
              //   576,
              //   1280
              // );
              // console.log(coordinates);
              // console.log(`this is called ${x} times`);

              <Tag
                key={tag.x * tag.y}
                leftPos={tag.x * 100}
                topPos={tag.y * 100}
                // leftPos={coordinates.x}
                // topPos={coordinates.y}
                id={tag.product_id}
                title={tag.label.slice(0, 10)}
                price={tag.price}
              />
            ))}
        </div>
      </div>
    </Modal>
  );
}

export default PreviewVideo;
