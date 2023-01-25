/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useRef } from "react";
import Button from "../../components/Button/Button";
import styles from "./VideoGallery.module.scss";

function VideoGallery({
  currentVideo,
  changeVideo,
  // changeProducts,
  videos,
  setDetailsArray,
  setSavedArray,
  setShowTag,
}) {
  const [content, setContent] = useState("taggedVideos");
  const inputRef = useRef(null);

  const handleClick = () => {
    // console.log(fileInputRef);
    inputRef.current.click();
    // const inputelement = document.getElementById("inputEl");
    // inputelement.click();
    // console.log(inputelement.current);
  };
  const handleFileChange = (event) => {
    // Get the selected file
    const file = event.target.files[0];
    console.log(file.size / 1024 / 1024);
    console.log(file);
    // setVideoName(file.name);
    // setVideoFile(file);

    // Create a URL for the file
    const fileUrl = URL.createObjectURL(file);
    changeVideo(fileUrl);

    // Display the video
    // setVideoUrl(fileUrl);
  };

  return (
    <div className={styles.videoGallery}>
      <div className={styles.header}>
        <p
          className={`${styles.headerTab} ${content === "untaggedVideos" && styles.active}`}
          onClick={() => setContent("untaggedVideos")}
        >
          Untagged Videos
        </p>
        <p
          className={`${styles.headerTab} ${content === "taggedVideos" && styles.active}`}
          onClick={() => setContent("taggedVideos")}
        >
          Tagged Videos
        </p>
      </div>
      <div className={styles.body}>
        {content === "untaggedVideos" ? (
          <div className={styles.videoSection}>
            {/* <video src="./assets/videos/pexel1.mp4" onClick={()=>{
              changeVideo("./assets/videos/pexel1.mp4" )
            }}/>
            <video src="./assets/videos/pexel2.mp4" />
            <video src="./assets/videos/pexel3.mp4" />
            <video src="./assets/videos/pexel4.mp4" />
            <video src="./assets/videos/pexel5.mp4" />
            <video src="./assets/videos/pexel6.mp4" />
            <video src="./assets/videos/pexel9.mp4" />
            <video src="./assets/videos/pexel2.mp4" /> */}

            {videos &&
              videos.map((video) => (
                <video
                  src={video.video_url}
                  key={video.id}
                  preload="auto"
                  className={`${currentVideo.video_url === video.video_url && styles.active}`}
                  onClick={() => {
                    changeVideo(video);
                    // changeProducts(video.product);
                    setShowTag(false);
                    setDetailsArray([]);
                    setSavedArray([]);
                  }}
                />
              ))}
          </div>
        ) : (
          <div className={styles.videoSection}>
            <Button
              size="large"
              label="Upload Video"
              // btnState={disableButton}
              bgcolor="purple"
              handleClick={() => {
                handleClick();
                // ("product sent successfully");
              }}
            />
          </div>
        )}
      </div>
      <input
        style={{ display: "none" }}
        type="file"
        accept="video/*"
        ref={inputRef}
        onChange={(e) => handleFileChange(e)}
      />
      {/* <div>gallery</div> */}
    </div>
  );
}

export default VideoGallery;
